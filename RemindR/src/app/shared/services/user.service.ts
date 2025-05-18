import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { Subscriptions } from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null,
    subscriptions: Subscriptions[],
    stats: {
      total: number
    }
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            subscriptions: [],
            stats: { total: 0 }
          });
        }

        return from(this.fetchUserWithSubscriptions(authUser.uid));
      })
    );
  }

  private async fetchUserWithSubscriptions(userId: string): Promise<{
    user: User | null,
    subscriptions: Subscriptions[],
    stats: {
      total: number
    }
  }> {
    try {
      // Felhasználó adatainak lekérése
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return {
          user: null,
          subscriptions: [],
          stats: { total: 0 }
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      if (!user.subscriptions || user.subscriptions.length === 0) {
        return {
          user,
          subscriptions: [],
          stats: { total: 0 }
        };
      }

      // Feladatok lekérése a Tasks kollekcióból
      const tasksCollection = collection(this.firestore, 'Subscriptions');
      const q = query(tasksCollection, where('id', 'in', user.subscriptions));
      const tasksSnapshot = await getDocs(q);

      const subscriptions: Subscriptions[] = [];
      tasksSnapshot.forEach(doc => {
        subscriptions.push({ ...doc.data(), id: doc.id } as Subscriptions);
      });

      // Statisztikák kiszámítása
      const total = subscriptions.length;

      return {
        user,
        subscriptions,
        stats: {
          total
        }
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null,
        subscriptions: [],
        stats: { total: 0 }
      };
    }
  }
}
