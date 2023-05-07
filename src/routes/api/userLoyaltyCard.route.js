const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userLoyaltyCardValidation = require('../../validations/userLoyaltyCard.validation');
const userLoyaltyCardController = require('../../controllers/userLoyaltyCard.controller');

const router = express.Router();

router
  .route('/LoyaltyCard/:loyaltyCardId')
  .post(auth(), validate(), userLoyaltyCardController.createUserLoyaltyCard)
  .get(auth(), validate(userLoyaltyCardValidation.getAllByLoyaltyCardId), userLoyaltyCardController.getAllByLoyaltyCardId);

router
  .route('/:id')
  .get(auth(), validate(userLoyaltyCardValidation.getUserLoyaltyCardByID), userLoyaltyCardController.getUserLoyaltyCardByID)
  .put(auth(), validate(userLoyaltyCardValidation.updateUserLoyaltyCard), userLoyaltyCardController.updateUserLoyaltyCard)
  .delete(
    auth(),
    validate(userLoyaltyCardValidation.deleteUserLoyaltyCard),
    userLoyaltyCardController.deleteUserLoyaltyCard
  );

router.route('/LoyaltyCard/:loyaltyCardId/GetCount').get(auth(), validate(), userLoyaltyCardController.getLoyaltyCount);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: UserLoyaltyCard
 *   description: User Loyalty Card management and retrieval
 */

/**
 * @swagger
 * /userLoyaltyCard/{loyaltyCardId}:
 *   post:
 *     summary: Create a User Loyalty Card
 *     description: Create a User Loyalty Card.
 *     parameters:
 *      - in: path
 *        name: loyaltyCardId
 *        schema:
 *          type: integer
 *     tags: [UserLoyaltyCard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserLoyaltyCard'
 *
 *   get:
 *     summary: Get all loyalty cards
 *     description: Only can retrieve all loyalty cards for specific user.
 *     tags: [UserLoyaltyCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: loyaltyCardId
 *         schema:
 *          type: integer
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
 *                     $ref: '#/components/schemas/UserLoyaltyCard'
 *                 page:
 *                   type: integer
 *                   userLoyaltyCard: 1
 *                 limit:
 *                   type: integer
 *                   userLoyaltyCard: 10
 *                 totalPages:
 *                   type: integer
 *                   userLoyaltyCard: 1
 *                 totalResults:
 *                   type: integer
 *                   userLoyaltyCard: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /userLoyaltyCard/{id}:
 *   get:
 *     summary: Get a userLoyaltyCard
 *     description: Logged in users can fetch userLoyaltyCard.
 *     tags: [UserLoyaltyCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User Loyalty Card id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserLoyaltyCard'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update a userLoyaltyCard
 *     description: Logged in users can update userLoyaltyCard
 *     tags: [UserLoyaltyCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User Loyalty Card id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserLoyaltyCard'
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
 *     summary: Delete a userLoyaltyCard
 *     description: Logged in users can delete userLoyaltyCard
 *     tags: [UserLoyaltyCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User Loyalty Card id
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
