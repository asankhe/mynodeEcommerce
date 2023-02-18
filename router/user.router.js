import express from 'express'

import {getUser,getSingleUser, addUser, deteleUser, updateUser, Signup, login} from '../controller/user.controller';

const urouter = express.Router();

urouter.get('/get-user', getUser)
urouter.get('/get-user/:user_id', getSingleUser)
urouter.get('/get-single-user/:user_id',getSingleUser)
urouter.post('/add-user',addUser)
urouter.delete('/deleted-user/:user_id',deteleUser)
urouter.patch('/update-user/:user_id',updateUser)

urouter.post('/sign-up',Signup)
urouter.post('/login',login)

export default urouter;