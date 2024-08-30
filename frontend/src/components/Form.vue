<script>
export default{
    name:'App',
    data() {
        return {
            nome:'',
            email:'',
            idade:'',
            verify:false,
            msg:'',
            status:'',
            class:'',
            lat:'',
            lng:''
        }
    },
    methods: {
        fetchData(){
            const Pessoa={
                nome:this.nome,
                email:this.email,
                idade:this.idade,
                localizacao:{
                    type:'Point',
                    coordinates:[this.lat,this.lng]
                }
            }
            console.log(Pessoa.localizacao.coordinates[0])
            fetch('http://localhost:3000/user',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Pessoa)
            }).then(response=>{
                this.verify=true;
                this.status=response.status;
                console.log(this.status);
                
            }).catch(e=>{
                this.verify=true;
                this.status=response.status;
                console.log(e);
            })
        }
    },
    watch:{
        verify(){
            this.msg=this.status===201?'deu certo':'deu errado';
            this.class=this.status===201?'sucess':'error';
        }
    },
    mounted() {    
        const map = L.map('map', {
            center: [-6.887698002563706, -38.56015173326553],
            zoom: 15,
            minZoom: 14,
            maxZoom: 16
        });

        const marker = L.marker([-6.887698002563706, -38.56015173326553], {
            draggable: true,
        }).addTo(map);

        map.locate();

        map.on('locationfound', e => {
            marker.setLatLng(e.latlng);
            map.setView(e.latlng);
            this.lat = marker.getLatLng().lat;
            this.lng = marker.getLatLng().lng;
        });

        map.on('click', l => {
            marker.setLatLng(l.latlng);
            map.setView(l.latlng);
            this.lat = marker.getLatLng().lat;
            this.lng = marker.getLatLng().lng;
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }   
}
</script>
<template>
    <div class='container'>
        <div id="map"></div>
        
        <form @submit.prevent="fetchData" id="form">
            <h1>Formulario</h1>
            <input type='text' v-model="nome" placeholder="digite seu nome" >
            <input type='text' v-model="email" placeholder="digite seu email">
            <input type='number' v-model="idade" placeholder="digite sua idade">
            <button>enviar</button>
        <p v-if="verify" :class="class">{{ msg }}</p>
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
    box-sizing: border-box;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 400px;
    height: 25px;
    border-radius: 20px;
    border: black solid 1px;
    padding: 10px;
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
.sucess{
    margin-top: 10px;
    color:#28a745;
}
.error{
    margin-top: 10px;
    color:#dc3545;
}
</style>