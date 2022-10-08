import express from 'express';
import images from './api/images';

// instructions
// https://github.com/udacity/cd0292-building-a-server-project-starter

const routes = express.Router();

routes.get('/', (req, res) => {
  res.sendStatus(200);
});

routes.use('/images', images);

export default routes;
