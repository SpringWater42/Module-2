// routes/signup.js
import express from 'express';
import SignupController from '../controller/signupController.js';

const router = express.Router();
const signupController = new SignupController();

router.post('/signup', signupController.signup.bind(signupController));

export default router;
