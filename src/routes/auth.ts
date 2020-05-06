import {Router} from 'express';

const router:Router = Router();

import {signin,signup,profiles} from '../controllers/controlerAuth';

router.post('/signup',signup);
router.post('/signin',signin);

router.get('/profiles',profiles);



export default router;