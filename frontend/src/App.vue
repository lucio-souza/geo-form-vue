<script>
export default{
    name:'App',
    data() {
        return {
            nome:'',
            email:'',
            idade:'',
            localizacao:{
                type:'Point',
                coordinates:[-21321321312,432432321]
            },
            verify:false,
            msg:''
        }
    },
    methods: {
        fetchData(){
            const Pessoa={
                nome:this.nome,
                email:this.email,
                idade:this.idade,
                localizacao:this.localizacao
            }
            fetch('http://localhost:3000/user',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Pessoa)
            }).then(response=>{
                this.verify=true;
                this.msg='deu certo'
                console.log('deu certo');
                
            }).catch(e=>{
                this.verify=true
                this.msg='deu errado'
                console.log(e);
                
            })
        }
    }
}
</script>
<template>
    <div class='container'>
        <h1>Formulario</h1>
        <input type='text' v-model="nome" placeholder="digite seu nome" >
        <input type='text' v-model="email" placeholder="digite seu email">
        <input type='text' v-model="idade" placeholder="digite sua idade">
        <button @click="fetchData">enviar</button>
        <p v-if="verify">{{ msg }}</p>
    </div>
</template>

<style>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
}
input{
    margin-top: 10px;
    margin-bottom: 10px;
    width: 400px;
    height: 25px;
    border-radius: 20px;
    border: black solid 1px;
}
</style>

