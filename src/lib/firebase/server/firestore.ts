import { app } from '$lib/firebase/server/app';
import {
	QueryDocumentSnapshot,
	initializeFirestore,
	type DocumentData
} from 'firebase-admin/firestore';
import type { UserDoc, ProjectDoc } from '$lib/firebase/types';

const firestoreRef = initializeFirestore(app);

const converter = <T>() => ({
	toFirestore: (data: T) => data,
	fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T
});

const collectionRef = <T extends DocumentData>(collectionPath: string) =>
	firestoreRef.collection(collectionPath).withConverter(converter<T>());

export const firestore = {
	ref: firestoreRef,
	users: collectionRef<UserDoc>('users'),
	projects: collectionRef<ProjectDoc>('projects')
};
