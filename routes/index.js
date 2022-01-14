const authRouter = require('./auth');
const teamRoutes = require('./team');
const homeRoutes = require('./home');

const setupRoutes = (app) => {
  app.use('/auth', authRouter);
  app.use('/team', teamRoutes);
  app.use('/home', homeRoutes);
};

module.exports = {
  setupRoutes,
};
