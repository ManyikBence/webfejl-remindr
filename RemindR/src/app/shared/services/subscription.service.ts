import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, orderBy, getDoc, where } from '@angular/fire/firestore';
import { Observable, from, switchMap, map, of, take, firstValueFrom } from 'rxjs';
import { Subscriptions } from '../models/subscription';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private readonly SUBSCRIPTIONS_COLLECTION = 'Subscriptions';
  private readonly USERS_COLLECTION = 'Users';

  constructor(
    private authService: AuthService,
    private firestore: Firestore
  ) { }

  private formatDateToString(date: Date | string): string {
    if (typeof date === 'string') {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return new Date().toISOString().split('T')[0];
      }
      return date.includes('T') ? date.split('T')[0] : date;
    }
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  }

  // CREATE
  async addSubscription(subscription: Omit<Subscriptions, 'id'>): Promise<Subscriptions> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const subscriptionsCollection = collection(this.firestore, this.SUBSCRIPTIONS_COLLECTION);

      const subscriptionToSave = {
        ...subscription,
        endDate: this.formatDateToString(subscription.endDate as string)
      };

      const docRef = await addDoc(subscriptionsCollection, subscriptionToSave);
      const subscriptionId = docRef.id;

      await updateDoc(docRef, { id: subscriptionId });

      const newSubscription = {
        ...subscriptionToSave,
        id: subscriptionId
      } as Subscriptions;

      // Felhasználó subscriptions tömbjének frissítése
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        const subscriptions = userData.subscriptions || [];
        subscriptions.push(subscriptionId);
        await updateDoc(userDocRef, { subscriptions });
      }

      return newSubscription;
    } catch (error) {
      throw error;
    }
  }

  // READ
  getAllSubscriptions(): Observable<Subscriptions[]> {
    return this.authService.currentUser.pipe(
      switchMap(async user => {
        if (!user) {
          return of([]);
        }
        try {
          const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
          const userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            return of([]);
          }
          const userData = userDoc.data() as User;
          const subscriptionIds = userData.subscriptions || [];
          if (subscriptionIds.length === 0) {
            return of([]);
          }

          const subscriptionsCollection = collection(this.firestore, this.SUBSCRIPTIONS_COLLECTION);
          const subscriptions: Subscriptions[] = [];
          const batchSize = 10;

          for (let i = 0; i < subscriptionIds.length; i += batchSize) {
            const batch = subscriptionIds.slice(i, i + batchSize);
            const q = query(subscriptionsCollection, where('__name__', 'in', batch));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
              subscriptions.push({ ...doc.data(), id: doc.id } as Subscriptions);
            });
          }

          return of(subscriptions.sort((a, b) => {
            return a.endDate.localeCompare(b.endDate);
          }));
        } catch (error) {
          return of([]);
        }
      }),
      switchMap(subscriptions => subscriptions)
    );
  }

  async getSubscriptionById(subscriptionId: string): Promise<Subscriptions | null> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        return null;
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        return null;
      }
      const userData = userDoc.data() as User;
      if (!userData.subscriptions || !userData.subscriptions.includes(subscriptionId)) {
        return null;
      }

      const subscriptionDocRef = doc(this.firestore, this.SUBSCRIPTIONS_COLLECTION, subscriptionId);
      const subscriptionSnapshot = await getDoc(subscriptionDocRef);
      if (subscriptionSnapshot.exists()) {
        return { ...subscriptionSnapshot.data(), id: subscriptionId } as Subscriptions;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  // UPDATE
  async updateSubscription(subscriptionId: string, updatedData: Partial<Subscriptions>): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      const userData = userDoc.data() as User;
      if (!userData.subscriptions || !userData.subscriptions.includes(subscriptionId)) {
        throw new Error('Task does not belong to the user');
      }

      const dataToUpdate: any = { ...updatedData };
      if (dataToUpdate.endDate) {
        dataToUpdate.endDate = this.formatDateToString(dataToUpdate.endDate as any);
      }

      const subscriptionDocRef = doc(this.firestore, this.SUBSCRIPTIONS_COLLECTION, subscriptionId);
      return updateDoc(subscriptionDocRef, dataToUpdate);
    } catch (error) {
      throw error;
    }
  }

  // DELETE
  async deleteSubscription(subscriptionId: string): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      const userData = userDoc.data() as User;
      if (!userData.subscriptions || !userData.subscriptions.includes(subscriptionId)) {
        throw new Error('Task does not belong to the user');
      }

      const subscriptionDocRef = doc(this.firestore, this.SUBSCRIPTIONS_COLLECTION, subscriptionId);
      await deleteDoc(subscriptionDocRef);

      const updatedSubscriptions = userData.subscriptions.filter(id => id !== subscriptionId);
      return updateDoc(userDocRef, { subscriptions: updatedSubscriptions });
    } catch (error) {
      throw error;
    }
  }

  // ÖSSZETETT LEKÉRDEZÉSEK
  getOnlineSubscriptions(): Observable<Subscriptions[]> {
    return this.getAllSubscriptions().pipe(
      map(subs => subs.filter(sub => sub.online))
    );
  }

  getRepetitiveSubscriptions(): Observable<Subscriptions[]> {
    return this.getAllSubscriptions().pipe(
      map(subs => subs.filter(sub => sub.repetitive))
    );
  }
}
