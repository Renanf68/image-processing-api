// import path from 'path';
import express from 'express';
import routes from './routes';

// scripts that should be available
// test
// node dist/index (on serve?)

const app = express();
const port = 3000;

// app.use(express.static(path.join(__dirname, 'src/assets')));
app.use(express.static('dist'));
app.use('/api', routes);

app.listen(port, () =>
  console.log(`server started at http://localhost:${port}!`)
);

export default app;
