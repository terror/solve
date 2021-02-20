import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

const params = {
    type: process.env.TYPE,
    projectId: process.env.PROJECT_ID,
    privateKeyId: process.env.PROJECT_KEY_ID,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL,
    clientId: process.env.CLIENT_ID,
    authUri: process.env.AUTH_ID,
    tokenUri: process.env.TOKEN_URI,
    authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
    clientC509CertUrl: process.env.CLIENT_X509_CERT_URL,
};

// Initialize firebase
admin.initializeApp({
    credential: admin.credential.cert(params),
});

const db = admin.firestore();

export { admin, db };
