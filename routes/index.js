const authRouter = require('./auth');
const teamRoutes = require('./team');
const localisationRoutes = require('./localisation');
const newsRoutes = require('./news');
const carsRoutes = require('./cars');
const orderRoutes = require('./order');

const setupRoutes = (app) => {
  app.use('/auth', authRouter);
  app.use('/team', teamRoutes);
  app.use('/news', newsRoutes);
  app.use('/localisation', localisationRoutes);
  app.use('/cars', carsRoutes);
  app.use('/order', orderRoutes);
};

module.exports = {
  setupRoutes,
};
