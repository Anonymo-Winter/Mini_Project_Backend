import express from 'express';
import { createIssue } from '../controllers/issue.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';


const issueRouter = express.Router();

issueRouter.post('/',verifyToken,createIssue)



export default issueRouter;