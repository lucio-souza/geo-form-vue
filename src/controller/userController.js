import User from "../model/User.js";

const createUser=async(req,res)=>{
    try{
    const user=await User.create(req.body);
    res.status(201).json(user);
    }catch(e){
        res.status(404).send("error ao criar usuario")
    }
}
const findUsers=async(req,res)=>{
    try{
        const users=await User.findAll();
        res.json(users)
    }catch(e){
        console.log(e);
    }
}
const findUserById=async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.id);
        res.status(201).json(user);
    } catch (error) {
        res.status(404).json({error:"usuario não existe"})
    }
}
const updateUser=async(req,res)=>{
    const {nome,idade,localizacao}=req.body;
    try {
        const user=await User.findByPk(req.params.id);
        user.nome=nome;
        user.idade=idade;
        user.localizacao=localizacao;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error:"erro ao atualizar usuario"})
    }
}
const deleteUser=async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.id);
        await user.destroy(user);
        await findUsers(req,res);
    } catch (error) {
        res.status(404).json({erro:"usuario inexistente"});
    }
}

export {createUser,findUsers,findUserById,updateUser,deleteUser};