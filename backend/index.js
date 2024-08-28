import express from 'express';
import router from './src/routes/userRouter.js'
import cors from 'cors';

let corsOptions = {
    origin: ['http://127.0.0.1:5500']
  };
const app=express();

app.use(express.json());
app.use('/user',router);

app.listen('3000',()=>{
    console.log('conexao bem sucedida');
})