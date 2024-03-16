import { initializeApp, type FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
	apiKey: 'AIzaSyBZqXhpX9u1yDaNHYxaKbaeo2xIq0o_xlU',
	authDomain: 'fusion-hack.firebaseapp.com',
	projectId: 'fusion-hack',
	storageBucket: 'fusion-hack.appspot.com',
	messagingSenderId: '756068511580',
	appId: '1:756068511580:web:2a8c965e912612c31c9b99'
} as const;

export const app = initializeApp(firebaseConfig);
