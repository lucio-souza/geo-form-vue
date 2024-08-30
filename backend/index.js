import express from 'express';
import router from './src/routes/userRouter.js'
import cors from 'cors';

let corsOptions = {
    origin: ['http://localhost:8080']
  };
const app=express();

app.use(express.json());
app.use(cors(corsOptions))
app.use('/user',router);

app.listen('3000',()=>{
    console.log('conexao bem sucedida');
})