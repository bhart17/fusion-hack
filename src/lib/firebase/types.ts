import type { Timestamp, DocumentReference, CollectionReference } from 'firebase/firestore';

type UserDoc = {
	dob: Timestamp;
	donatedprojects: Array<DocumentReference>;
	email: string;
	name: string;
	username: string;
	hostprojects: Array<DocumentReference>;
	followers: Array<DocumentReference>;
	following: Array<DocumentReference>;
	image: string;
    watching: Array<DocumentReference>;
};

type ProjectDoc = {
	title: string;
	description: string;
	active: boolean;
	host: Array<DocumentReference>;
	uploaded: Timestamp;
	donatedobj: CollectionReference;
	neededobj: CollectionReference;
};

type DonatedObjs = {
	amount: Number;
	name: string;
	user: DocumentReference;
};

type NeededObjects = {
	name: string;
	amount: Number;
};

export type { UserDoc };
