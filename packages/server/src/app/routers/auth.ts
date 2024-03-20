import { Router } from 'express';
import { loginUser, signup } from '../controllers/auth';

export default (router: Router) => {
    router.post('/auth/register', signup);
    router.post('/auth/login', loginUser);
};
