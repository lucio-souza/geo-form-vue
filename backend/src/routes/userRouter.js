import express from 'express'
import { createUser,updateUser,deleteUser,findUsers,findUserById } from '../controller/userController.js';

const router=express.Router();

router.post('/', createUser);
router.get('/', findUsers);
router.get('/:id', findUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;