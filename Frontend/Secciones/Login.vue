<template>
    
<div class="formulario-contenedor">
    <h3 v-show="error">Error</h3>
    <form v-on:submit.prevent="send" action="/login" method="POST">
        <h1>Iniciar Sesión</h1>
        <input type="text" v-model="user" placeholder="Usuario" required>
        <input type="password" v-model="pass" name="pass" placeholder="Contraseña" required>
        <input type="submit">
    </form>
</div>

</template>


<script>

import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    data: () => {
        return{
            user: '',
            pass: '',
            error: false
        }
    },

    methods: {
        send: function(){
            axios.post('/login', {user: this.user, pass: this.pass })
           .then((response) => {
                if(response.status == 200){
                    let permissions = response.data.permissions
                    let user = response.data.user;

                    this.$store.state.User = user
                    this.$store.state.Permissions = permissions;
                    this.$store.state.IsLogged = true
                    //window.location.href = '/'
                    this.$router.push({name: 'inicio'})
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error!',
        
                    })
                }
            })
            .catch((response) => {
                Swal.fire({
                    type: 'error',
                    title: '¡Error!',
                    text: 'Usuario o contraseña incorrecta'
                });
            })
        },
    }
}
</script>



<style scoped>
h3{color: white;}
.formulario-contenedor{
    width: 100%;
    height: 100vh;
    background-color:#232730;
    display: flex;
    justify-content: center;
    align-items: center;
}
h1{color: white; text-align: center;}   

*{margin:0}

form { width: 350px; display: flex; justify-content: center; align-items: center; flex-direction: column;}

input{
    margin-top: 50px;
    width: 100%;
    outline: 0;
    padding-left: 20px;
    margin-right: 20px;
    margin-left: 0;
    border-radius: 30px;
    
    background-color: rgba(0, 0, 0, 0);
    height: 30px !important;
    color: #cacaca;
    
    border: 2px solid #555861;
}

input::placeholder{color: rgb(11, 180, 214); }

input[type='submit']{ width: 50%; background-color: #7e3a35 !important; border: 0 ; padding:0}
</style>
