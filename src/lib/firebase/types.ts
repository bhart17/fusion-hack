import type { Timestamp, DocumentReference, CollectionReference } from 'firebase/firestore';

type UserDoc = {
	donatedprojects: Array<string>;
	email: string;
	name: string;
	username: string;
	hostprojects: Array<string>;
	followers: Array<string>;
	following: Array<string>;
	image: string;
	watching: Array<string>;
};

type ProjectDoc = {
	title: string;
	description: string;
	active: boolean;
	host: Array<string>;
	uploaded: number;
	donatedobj: CollectionReference;
	neededobj: CollectionReference;
	image: string;
};

type DonatedObjs = {
	amount: number;
	name: string;
	user: string;
};

type NeededObjects = {
	name: string;
	amount: number;
};

export type { UserDoc, ProjectDoc, DonatedObjs, NeededObjects };
