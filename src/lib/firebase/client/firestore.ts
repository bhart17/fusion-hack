import { app } from '$lib/firebase/client/app';
import {
	QueryDocumentSnapshot,
	collection,
	getFirestore,
	type DocumentData,
	Timestamp
} from 'firebase/firestore';

type UserDoc = {
	username: string;
	name: string;
	bio: string;
	photoUrl: string;
	likedPosts: string[];
	createdTime: Timestamp;
};

type PostDoc = {
	user: string;
	photoUrl: string;
	likes: number;
	time: Timestamp;
	title: string;
	description: string;
};

const firestoreRef = getFirestore(app);

const converter = <T>() => ({
	toFirestore: (data: T) => data,
	fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T
});

const collectionRef = <T extends DocumentData>(collectionPath: string) =>
	collection(firestoreRef, collectionPath).withConverter(converter<T>());

export const firestore = {
	ref: firestoreRef,
	users: collectionRef<UserDoc>('users'),
	posts: collectionRef<PostDoc>('posts')
};
