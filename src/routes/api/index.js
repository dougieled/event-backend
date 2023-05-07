const express = require('express');
const authRoute = require('./auth.route');
const exampleRoute = require('./example.route');
const companyRoute = require('./company.route');
const loyaltyCardRoute = require('./loyaltyCard.route');
const userLoyaltyCardRoute = require('./userLoyaltyCard.route');
const healthRoute = require('./health.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/examples',
    route: exampleRoute,
  },
  {
    path: '/company',
    route: companyRoute,
  },
  {
    path: '/loyalty-card',
    route: loyaltyCardRoute,
  },
  {
    path: '/user-loyalty-card',
    route: userLoyaltyCardRoute,
  },
  {
    path: '/health',
    route: healthRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
