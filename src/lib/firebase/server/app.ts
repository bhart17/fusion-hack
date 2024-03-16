import { initializeApp, cert } from 'firebase-admin/app';
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private';

export const app = initializeApp({
	credential: cert({
		projectId: FB_PROJECT_ID,
		clientEmail: FB_CLIENT_EMAIL,
		privateKey: FB_PRIVATE_KEY
	})
});
