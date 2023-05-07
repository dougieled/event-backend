const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const loyaltyCardValidation = require('../../validations/loyaltyCard.validation');
const loyaltyCardController = require('../../controllers/loyaltyCard.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(loyaltyCardValidation.createLoyaltyCard), loyaltyCardController.createLoyaltyCard)
  .get(auth(), validate(loyaltyCardValidation.getLoyaltyCards), loyaltyCardController.getAllLoyaltyCards);

router
  .route('/:id')
  .get(auth(), validate(loyaltyCardValidation.getLoyaltyCardByID), loyaltyCardController.getLoyaltyCardByID)
  .put(auth(), validate(loyaltyCardValidation.updateLoyaltyCard), loyaltyCardController.updateLoyaltyCard)
  .delete(auth(), validate(loyaltyCardValidation.deleteLoyaltyCard), loyaltyCardController.deleteLoyaltyCard);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: LoyaltyCard
 *   description: Loyalty Card management and retrieval
 */

/**
 * @swagger
 * /loyaltyCard:
 *   post:
 *     summary: Create a Loyalty Card
 *     description: Create a Loyalty Card.
 *     tags: [LoyaltyCard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - rewardCount
 *               - active
 *               - companyId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               rewardCount:
 *                 type: number
 *               type:
 *                 type: string
 *               companyId:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/LoyaltyCard'
 *
 *   get:
 *     summary: Get all loyalty cards
 *     description: Only can retrieve all loyalty cards for specific user.
 *     tags: [LoyaltyCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of loyalty cards
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LoyaltyCard'
 *                 page:
 *                   type: integer
 *                   loyaltyCard: 1
 *                 limit:
 *                   type: integer
 *                   loyaltyCard: 10
 *                 totalPages:
 *                   type: integer
 *                   loyaltyCard: 1
 *                 totalResults:
 *                   type: integer
 *                   loyaltyCard: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /loyaltyCard/{id}:
 *   get:
 *     summary: Get a loyaltyCard
 *     description: Logged in users can fetch loyaltyCard.
 *     tags: [LoyaltyCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Loyalty Card id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/LoyaltyCard'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update a loyaltyCard
 *     description: Logged in users can update loyaltyCard
 *     tags: [LoyaltyCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Loyalty Card id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               name:
 *                 type: string
 *               rewardCount:
 *                 type: number
 *               active:
 *                 type: boolean
 *               type:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/LoyaltyCard'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a loyaltyCard
 *     description: Logged in users can delete loyaltyCard
 *     tags: [LoyaltyCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Loyalty Card id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
