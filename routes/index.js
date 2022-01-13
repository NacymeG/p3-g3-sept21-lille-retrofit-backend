const authRouter = require('./auth');
const teamRoutes = require('./team');
const homeRoutes = require('./home');
const carsRoutes = require('./cars');

const setupRoutes = (app) => {
  app.use('/auth', authRouter);
  app.use('/team', teamRoutes);
  app.use('/home', homeRoutes);
  app.use('/cars', carsRoutes);
};

module.exports = {
  setupRoutes,
};
