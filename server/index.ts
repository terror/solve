import express from 'express';
import path from 'path';

import userRouter from './src/routes/users';
import problemRouter from './src/routes/problems';
import workspaceRouter from './src/routes/workspaces';
import templateRouter from './src/routes/templates';

const app = express();
const port = process.env.PORT || 5000;

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
