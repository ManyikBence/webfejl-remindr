import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "remindr-web-c9996", appId: "1:747113477717:web:5741e465781641b194c6dc", storageBucket: "remindr-web-c9996.firebasestorage.app", apiKey: "AIzaSyAMpYS5ez-kcrLRNjD_DqQHpedwkZr-mPc", authDomain: "remindr-web-c9996.firebaseapp.com", messagingSenderId: "747113477717" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
