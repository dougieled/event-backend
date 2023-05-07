const express = require('express');
const multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const transactionValidation = require('../../validations/transaction.validation');
const transactionController = require('../../controllers/transaction.controller');

const upload = multer({ dest: 'tmp/csv/' });

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(transactionValidation.createTransaction), transactionController.createTransaction)
  .get(auth(), validate(transactionValidation.getTransactions), transactionController.getAllMyTransactions);

router
  .route('/:id')
  .get(auth(), validate(transactionValidation.getTransaction), transactionController.getTransaction)
  .patch(auth(), validate(transactionValidation.updateTransaction), transactionController.updateTransaction)
  .delete(auth(), validate(transactionValidation.deleteTransaction), transactionController.deleteTransaction);

router
  .route('/my-transactions/month')
  .get(auth(), validate(transactionValidation.getTransactions), transactionController.getAllMyTransactionsByMonth);

router
  .route('/my-transactions/week')
  .get(auth(), validate(transactionValidation.getTransactions), transactionController.getAllMyTransactionsByWeek);

router
  .route('/my-transactions/date')
  .get(auth(), validate(transactionValidation.getTransactions), transactionController.getAllMyTransactionsByDate);

router.route('/reset-transactions').post(auth(), validate(), transactionController.resetMyTransactions);
router.route('/batch-upload').post(auth(), validate(), upload.single('file'), transactionController.batchUpload);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management and retrieval
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a Transaction
 *     description: Creates transactions.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - timestamp
 *               - description
 *               - amount
 *               - nativeCurrency
 *               - isDeposit
 *               - userId
 *             properties:
 *               timestamp:
 *                 type: string
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               nativeCurrency:
 *                 type: string
 *               isDeposit:
 *                 type: boolean
 *               userId:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transaction'
 *
 *   get:
 *     summary: Get all transactions
 *     description: Only can retrieve all transactions for specific user.
 *     tags: [Transactions]
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
 *         description: Maximum number of transactions
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
 *                     $ref: '#/components/schemas/Transaction'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get a transaction
 *     description: Logged in users can fetch transactions.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transaction'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a transaction
 *     description: Logged in users can update transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timestamp:
 *                 type: string
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               nativeCurrency:
 *                 type: string
 *               isDeposit:
 *                 type: boolean
 *               userId:
 *                 type: number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transaction'
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
 *     summary: Delete a transaction
 *     description: Logged in users can delete transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction id
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

/**
 * @swagger
 * /transactions/reset-transactions:
 *   post:
 *     summary: Reset transaction
 *     description: Logged in users can reset their transactions.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transaction'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /transactions/batch-upload:
 *   post:
 *     summary: Batch upload multiple transactions from a csv
 *     description: Logged in users can batch upload transactions via CSV.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *        multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *            file:
 *              type: string
 *              format: binary
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */
/**
 * @swagger
 * /transactions/my-transactions/month:
 *   get:
 *     summary: Get all my transactions by Month
 *     description: Gets all of users Transactions by Month
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: monthDate
 *         schema:
 *           type: Date
 *         description: Date Month YYYY-MM-DD
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
 *                     $ref: '#/components/schemas/Transaction'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /transactions/my-transactions/week:
 *   get:
 *     summary: Get all my transactions by Week
 *     description: Gets all of users Transactions by Week
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: Date
 *         description: Date Start YYYY-MM-DD
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: Date
 *         description: Date End YYYY-MM-DD
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
 *                     $ref: '#/components/schemas/Transaction'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /transactions/my-transactions/date:
 *   get:
 *     summary: Get all my transactions by Date
 *     description: Gets all of users Transactions by Date
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: Date
 *         description: Date YYYY-MM-DD
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
 *                     $ref: '#/components/schemas/Transaction'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
