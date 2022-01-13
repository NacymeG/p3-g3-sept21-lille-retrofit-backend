const authRouter = require('./auth');
const teamRoutes = require('./team');
const localisationRoutes = require('./localisation');
const homeRoutes = require('./home');

const setupRoutes = (app) => {
  app.use('/auth', authRouter);
  app.use('/team', teamRoutes);
  app.use('/home', homeRoutes);
  app.use('/localisation', localisationRoutes);
};

module.exports = {
  setupRoutes,
};
