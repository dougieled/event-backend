const express = require('express');
const healthController = require('../../controllers/health.controller');

const router = express.Router();

router.get('', healthController.healthCheck);

module.exports = router;

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get health check
 *     description: Gets health check of service
 *     tags: [Health]

 *     responses:
 *       "200":
 *         description: OK

 */
