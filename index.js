import express from 'express';
import router from './src/routes/userRouter.js'

const app=express();

app.use(express.json());
app.use('/user',router);

app.listen('3000',()=>{
    console.log('conexao bem sucedida');
})