import { app } from '$lib/firebase/client/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage(app);

export const uploadFile = async (file: File, path: string) => {
	const snapshot = await uploadBytes(ref(storage, path), file);
	return getDownloadURL(snapshot.ref);
};
