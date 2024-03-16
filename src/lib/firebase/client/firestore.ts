import { app } from '$lib/firebase/client/app';
import {
	QueryDocumentSnapshot,
	collection,
	getFirestore,
	type DocumentData,
	Timestamp
} from 'firebase/firestore';

import type { UserDoc } from '$lib/firebase/types';

const firestoreRef = getFirestore(app);

const converter = <T>() => ({
	toFirestore: (data: T) => data,
	fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T
});

const collectionRef = <T extends DocumentData>(collectionPath: string) =>
	collection(firestoreRef, collectionPath).withConverter(converter<T>());

export const firestore = {
	ref: firestoreRef,
	users: collectionRef<UserDoc>('users')
};
