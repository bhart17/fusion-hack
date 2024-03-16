import { app } from '$lib/firebase/server/app';
import { getStorage } from 'firebase-admin/storage';

export const bucket = getStorage(app).bucket();

// export const uploadFile = async (file: File, path: string) => {
//     await bucket.file(path).save(await fileToBuffer(file));

// }

// export const fileToBuffer = async (file: File): Promise<Buffer> => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//             resolve(Buffer.from(reader.result as ArrayBuffer));
//         };
//         reader.onerror = reject;
//         reader.readAsArrayBuffer(file);
//     });
// }
