<script>
import { map } from 'leaflet';

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
            msg:'',
            status:''
        }
    },
    methods: {
        fetchData(){
            this.verify=true;
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
                this.status=response.status;
                console.log('deu certo');
                
            }).catch(e=>{
                this.msg='deu errado';
                console.log(e);
                
            })
        }
    },
    watch:{
        verify(){
            return this.status===200?this.msg='deu certo':this.msg='deu errado';
        }
    },
    mounted() {    
        let map = L.map('map', {
            center: [-6.887698002563706, -38.56015173326553],
            zoom: 15,
            minZoom: 14,
            maxZoom: 16
        });

        let marker = L.marker([-6.887698002563706, -38.56015173326553], {
            draggable: true,
        }).addTo(map);

        map.locate();

        map.on('locationfound', e => {
            marker.setLatLng(e.latlng);
            map.setView(e.latlng);
        });


        map.on('click', l => {
            marker.setLatLng(l.latlng);
            map.setView(l.latlng);
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
            },
}
</script>
<template>
    <div class='container'>
        <div id="map"></div>
        
        <form @submit.prevent="fetchData" id="form">
            <h1>Formulario</h1>
            <input type='text' v-model="nome" placeholder="digite seu nome" >
            <input type='text' v-model="email" placeholder="digite seu email">
            <input type='text' v-model="idade" placeholder="digite sua idade">
            <button>enviar</button>
        <p v-if="verify">{{ msg }}</p>
    </form>
    </div>
</template>

<style>
#map{
    height: 250px;
    width: 300px;
}
.container{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin:100px;
}
#form{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left:150px ;
}
#form h1{
    margin-bottom: 30px;
}
input{
    margin-top: 10px;
    margin-bottom: 10px;
    width: 400px;
    height: 25px;
    border-radius: 20px;
    border: black solid 1px;
}
#form button{
    font-size: 17px;
    margin-top:20px;
    border-radius: 20px;
    background-color: dodgerblue;
    color: aliceblue;
    border:none;
    width: 100px;
    height: 30px;
    cursor: pointer;
}
#form button:hover{
    background-color: rgb(24, 108, 192);
}
#form button:active{
    background-color: dodgerblue;
}
</style>

