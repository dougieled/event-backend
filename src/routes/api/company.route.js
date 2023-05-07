const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const companyValidation = require('../../validations/company.validation');
const companyController = require('../../controllers/company.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(companyValidation.createCompany), companyController.createCompany)
  .get(auth(), validate(companyValidation.getCompanies), companyController.getAllCompanies);

router
  .route('/:id')
  .get(auth(), validate(companyValidation.getCompanyByID), companyController.getCompanyByID)
  .put(auth(), validate(companyValidation.updateCompany), companyController.updateCompany)
  .delete(auth(), validate(companyValidation.deleteCompany), companyController.deleteCompany);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company management and retrieval
 */

/**
 * @swagger
 * /company:
 *   post:
 *     summary: Create a Company
 *     description: Create a Company.
 *     tags: [Company]
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Company'
 *
 *   get:
 *     summary: Get all companies
 *     description: Only can retrieve all companies for specific user.
 *     tags: [Company]
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
 *         description: Maximum number of companies
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
 *                     $ref: '#/components/schemas/Company'
 *                 page:
 *                   type: integer
 *                   company: 1
 *                 limit:
 *                   type: integer
 *                   company: 10
 *                 totalPages:
 *                   type: integer
 *                   company: 1
 *                 totalResults:
 *                   type: integer
 *                   company: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /company/{id}:
 *   get:
 *     summary: Get a company
 *     description: Logged in users can fetch company.
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Company'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update a company
 *     description: Logged in users can update company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Company'
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
 *     summary: Delete a company
 *     description: Logged in users can delete company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
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
