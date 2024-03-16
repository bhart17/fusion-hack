import { app } from '$lib/firebase/server/app';
import { getAuth } from 'firebase-admin/auth';

export const auth = getAuth(app);
