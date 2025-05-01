import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface Subscriptions {
  id: number;
  name: string;
  online: boolean;
  endDate: string;
  repetitive: boolean;
  picture?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor() { }

  subscriptions: Subscriptions[] = [
    {
      id: 1,
      picture: 'assets/images/netflix.png',
      name: 'Netflix',
      online: true,
      endDate: '2025.06.12',
      repetitive: true,
    },
    {
      id: 2,
      picture: 'assets/images/profilpic.jpg',
      name: 'Személyi igazolvány',
      online: false,
      endDate: '2028.01.10',
      repetitive: false,
    },
    {
      id: 3,
      picture: 'assets/images/mav.jpg',
      name: 'Országbérlet',
      online: true,
      endDate: '2025.04.20',
      repetitive: true,
    },
    {
      id: 4,
      picture: 'assets/images/hbo.jpg',
      name: 'HBO',
      online: true,
      endDate: '2025.05.02',
      repetitive: true,
    },
    {
      id: 1,
      picture: 'assets/images/netflix.png',
      name: 'Netflix',
      online: true,
      endDate: '2025.06.12',
      repetitive: true,
    },
    {
      id: 2,
      picture: 'assets/images/profilpic.jpg',
      name: 'Személyi igazolvány',
      online: false,
      endDate: '2028.01.10',
      repetitive: false,
    },
    {
      id: 3,
      picture: 'assets/images/mav.jpg',
      name: 'Országbérlet',
      online: true,
      endDate: '2025.04.20',
      repetitive: true,
    },
    {
      id: 4,
      picture: 'assets/images/hbo.jpg',
      name: 'HBO',
      online: true,
      endDate: '2025.05.02',
      repetitive: true,
    },
    {
      id: 1,
      picture: 'assets/images/netflix.png',
      name: 'Netflix',
      online: true,
      endDate: '2025.06.12',
      repetitive: true,
    },
    {
      id: 2,
      picture: 'assets/images/profilpic.jpg',
      name: 'Személyi igazolvány',
      online: false,
      endDate: '2028.01.10',
      repetitive: false,
    },
    {
      id: 3,
      picture: 'assets/images/mav.jpg',
      name: 'Országbérlet',
      online: true,
      endDate: '2025.04.20',
      repetitive: true,
    },
    {
      id: 4,
      picture: 'assets/images/hbo.jpg',
      name: 'HBO',
      online: true,
      endDate: '2025.05.02',
      repetitive: true,
    }
  ]

  private subscriptionsSubject = new BehaviorSubject<Subscriptions[]>(this.subscriptions);

  getAllSubscriptions(): Observable<Subscriptions[]> {
    return this.subscriptionsSubject.asObservable();
  }

  addSubscription(task: Omit<Subscriptions, 'id'>): Promise<Subscriptions> {
    return new Promise((resolve) => {
      const newId = this.subscriptions.length > 0
        ? Math.max(...this.subscriptions.map(t => t.id)) + 1
        : 1;

      const newTask: Subscriptions = {
        ...task,
        id: newId,
        picture: 'assets/images/netflix.png'
      };

      this.subscriptions.push(newTask);

      this.subscriptionsSubject.next([...this.subscriptions]);

      setTimeout(() => {
        resolve(newTask);
      }, 1000);
    });
  }
}
