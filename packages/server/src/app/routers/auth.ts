import { Router } from 'express';
import { signup } from '../controllers/auth';

export default (router: Router) => {
    router.post('/auth/register', signup);
};
