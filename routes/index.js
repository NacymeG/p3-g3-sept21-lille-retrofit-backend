const authRouter = require('./auth');
const teamRoutes = require('./team');
const localisationRoutes = require('./localisation');
const homeRoutes = require('./home');
const carsRoutes = require('./cars');

const setupRoutes = (app) => {
  app.use('/auth', authRouter);
  app.use('/team', teamRoutes);
  app.use('/home', homeRoutes);
  app.use('/localisation', localisationRoutes);
  app.use('/cars', carsRoutes);
};

module.exports = {
  setupRoutes,
};
