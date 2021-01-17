import express from 'express';
import path from 'path';
import * as admin from 'firebase-admin';

import dotenv from 'dotenv';
dotenv.config();

import userRouter from './src/routes/users';
import problemRouter from './src/routes/problems';
import workspaceRouter from './src/routes/workspaces';
import templateRouter from './src/routes/templates';

const app = express();
const port = process.env.PORT || 5000;

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

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/build')));

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

app.use('/api/users', userRouter);
app.use('/api/problems', problemRouter);
app.use('/api/workspaces', workspaceRouter);
app.use('/api/templates', templateRouter);

app.get('*', function (_, response) {
    response.sendFile(
        path.resolve(__dirname, '../../client/build', 'index.html')
    );
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export { db, admin };
