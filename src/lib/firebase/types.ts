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
	host: string;
	uploaded: number;
	items: { name: string; amount: number; needed: boolean }[];
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
