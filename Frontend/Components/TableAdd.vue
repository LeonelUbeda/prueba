<template>
    <form action="/roles/add" method="POST">
    <h2  style="text-align: center; color: white;">{{action == 'add' ? 'Añadir Rol' : `Editar rol ${titulo}`}}</h2>

        <table>
            <thead>
                <tr>
                    <th :key="titulos" v-for="titulos of titles">{{titulos}}</th> <!-- Imprime los titulos que le pasas   -->
                </tr>
            </thead>
            <tbody><!-- *****  Probablemente sea muchos comentarios, pero es para luego no olvidarme de que hice ***** -->  

                    <tr v-for="(elemento, index_body) of body" :key="index_body"> <!-- Hace un ciclo por los elementos del body, osea las secciones, ejemplo: -->  
                        <td >{{elemento}}</td>                    <!-- Clasificacion, Lotes, Productos -->

                        <td v-for="(titulo, index) of filterSection" :key="index"> <!-- Hace un ciclo por cada elemento del arreglo title -->
                            <div class="input-container">                           <!-- menos el elemento 'Seccion'. La variable index es un contador -->
                                <!--  ** INPUT **
                                    1- value es igual a index + 1 porque index empieza por 0 y el valor minimo tiene que ser 1.
                                    2- id lo utilizo para referenciarlo en el label for.
                                    3- v-model: inputs es un objeto que se le añaden propiedades segun el valor actual del elemento, ejemplo : inputs.clasificacion.
                                    4- Utilizando v-model no es necesario utilizar checked, puesto que inicializo todos los elementos del objeto inputs a 1 
                                        y eso matchea con el value del input .
                                 -->
                                <input type="radio" 
                                :name="elemento"  
                                :value="index + 1"
                                :id="elemento + '_' + index"
                                v-model="inputs[index_body]"
                                >
                                <!-- 
                                    1- class lo utilizo para seleccionarlo y darle estilos segun el elemento y el valor de index. Mas info en la funcion handleClick. 
                                       Ejemplo: Clasificacion_1 , Clasificacion_2, Clasificacion_3
                                    2- La funcion handleClick es la logica para los estilos de los botones. Recibe el elemento actual y el valor del index. Ejemplo:  Clasificacion y 1
                                 -->  
                                <label class="border"   
                                :for="elemento + '_' + index"
                                :class="[elemento + '_' + index , {selected: ((inputs[index_body] > index) && (index !== 0))} , {red: ((inputs[index_body] == 5) && (index == 4))}]">   
                                    <div v-if="((inputs[index_body] > index) && (index !== 0)) || (inputs[index_body] == index+1)">Si</div>  <!-- Esto es para que el texto de la columna Ninguno, se vea como 'seleccionado' -->
                                    <div v-else>NO</div>
                                </label>
                            </div>
                        </td>
                    </tr>
            </tbody>
        </table>
        <div id="btn-container">
            <label for="name-input" id="name-label" style="">Nombre del rol</label>
            <input type="text" id="name-input" name="Nombre" v-model="nombre" class="input-default" required>
            <input type="submit" @click="send($event)" class="btn-default" value="Enviar">
            <input type="submit" @click="cancel($event)" class="btn-default red" value="Cancelar">
            <input type="submit" @click="eliminar($event)" v-if="this.$store.state.Permissions.productos > 4" class="btn-default red" value="Eliminar">
        </div>
    </form>
</template>



<script>

import axios from 'axios'
import Swal from 'sweetalert2'
import Alertar from '../Utilidades/Alertas.js'
export default {
    props: {
        titles: Array,
        body: Array,
        defaultValues: Object, // Para cuando se va a editar
        action: String, // add o edit

        // [0]  nombre del rol
        // [1]  id de rol
    },
    data: function(){
        return{
            inputs: [],
            titulo: '',
            nombre: '',
            id: ''
            
        }
    },
    created: function(){
        // Inicializar los elementos en 0
        if(this.action === 'add'){
            console.log('Modo añadir')
            this.body.forEach((hola, index) => {
                this.inputs[index] = '1';
            })
            
        }else if(this.action === 'edit'){  
            this.destructureInfo()           
        }else{
            console.log('Escriba bien')
        }
    },
    methods: {
        eliminar: function(e){
            e.preventDefault()
            let id = this.id
            Alertar.DeleteElement('/clasificacion/eliminar', {tabla: 'roles', id: id})
            .then(() => this.$emit('finish', true))
            .catch(() => this.$emit('finish', false))
        },
        textToNumberRoles:function(element) {
            switch (element) {
                case 'Ninguno':
                    return 1;
                    break;
                case 'Leer':
                    return 2;
                    break;
                case 'Escribir':
                    return 3;
                    break;
                case 'Actualizar':
                    return 4;
                    break;
                case 'Eliminar':
                    return 5;
                    break;
                default:
                    return element
                    break;
            }
        },

        destructureInfo: function(){


            // +------------------+-------------------+---------+------+----------+------------+--------+------------------------+
            // |                  | Este es titulos ↓ |         |      |          |            |        |                        |
            // +------------------+-------------------+---------+------+----------+------------+--------+------------------------+
            // |                  | Seccion           | Ninguno | Leer | Escribir | Actualizar | Borrar |                        |
            // | ContadorText = 0 | Clasificacion     | ####    | #### | ####     | ####       | ####   | <- Input[ContadorText] |
            // | ContadorText = 1 | Lotes             | ####    | #### | ####     | ####       | ####   | <- Input[ContadorText] |
            // | ContadorText = 2 | Productos         | ####    | #### | ####     | ####       | ####   | <- Input[ContadorText] |
            // | ContadorText = 3 | Reportes          | ####    | #### | ####     | ####       | ####   | <- Input[ContadorText] |
            // +------------------+-------------------+---------+------+----------+------------+--------+------------------------+   
            let elemento = this.defaultValues;
            console.log(this.defaultValues)
            let elementoTemporal = Object.assign({}, elemento)
            this.titulo = 
            this.nombre = elemento.nombre;

            this.id = elementoTemporal.id;
            //Elimino las propiedades que no me interesan
            delete elementoTemporal.nombre;
            delete elementoTemporal.id;
            delete elementoTemporal.administrador;

            let Titulos = this.body; // =  ['Clasificacion', 'Lotes', 'Productos', 'Reportes', 'Usuarios']
            for(const value in elementoTemporal){ //  Iteracion en el objeto recibido del elemento el cual se dio click
                let contadorText = 0; // Contador para saber la posicion actual del arreglo Titulos
                for(let titulo in Titulos){

                    if(value == Titulos[contadorText].toLowerCase()){ // La propiedad y el titulo son iguales...

                        this.inputs[contadorText] = this.textToNumberRoles(elementoTemporal[value]) //  Se asigna el valor numerico del elemento al arreglo 
                        break; // Ya que matcheo, se sale del ciclo                         //  inputs segun la posicion segun el valor de contadorText       

                    }

                    contadorText++;
                }
                   
            }                
            
        },
        send(event){

            event.preventDefault()
            let toSend = {
                data:       this.inputs,
                info: {
                    nombre: this.nombre,
                    id:     this.id
                }
            }
            if(this.nombre == ''){
                Alertar.ErrorMsg()
                return null;
            }

            Swal.fire({
                title: '¿Está seguro?',
                text: "¿Desea ingresar los datos?",
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return axios.post(`/roles/${this.action}`, toSend)
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error(response.statusText)
                        }
                        return true;
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                        `Ocurrió un problema. Verifique sus datos e inténtelo más tarde`
                        )
                        return false;
                    })  
                },
                allowOutsideClick: () => !Swal.isLoading()
            })
            .then((result) => {

                if (result.value) {
                    Swal.fire(
                    '¡Éxito!',
                    `Se ${ this.action == 'edit' ? 'editó' : 'añadió'} exitosamente.`,
                    'success'
                    )
                    .then(() => {
                        axios.post('/resetroles', {id: this.id})
                    })
                    .then(()=>this.$emit('finish' , true));
                    
                }
            })
        },
        cancel: function(event){
            event.preventDefault();
            this.$emit('finish', false)
        }
    }
    ,
    computed: {
        filterSection: function(){
            return this.titles.filter(function(title){
                if(title !== 'Seccion'){
                    return title
                }
            })
        }
    }
    
}
</script>


<style scoped>
.blocked{
    cursor:not-allowed
}

#btn-container{
    display: flex;
    justify-content: center;
    margin-top: 40px;
}

.btn-default{
    border: 2px solid #555861;
    width: auto;
    outline: 0;
    min-width: 130px;
    margin-right: 20px;
    margin-left: 0;
    padding: 7px 20px 7px 20px;
    border: 0;
    border-radius: 10px;
    background-color: #6a7cab;
    height: 40px !important;
    color: white;
    cursor: pointer
}
#name-label{
    color: white;
    display: flex;
    align-items: center;
    margin-right: 15px;
    font-size: 20px;
    padding-bottom: 5px;
}

.input-container{
    display: flex;
    width: 150px;
    justify-content: center;
    margin: 0 auto 0 auto;
    border-radius: 20px;
}
.input-default{
    border: 2px solid #555861;
    width: 200px;
    min-width: 400px;
    outline: 0;
    margin-right: 20px;
    margin-left: 0;
    border-radius: 30px;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0);
    height: 30px !important;
    color: #cacaca;
    color: white;
}

.input-container p {
    margin: 0
}
.input-container div{
    width: 100px;
    padding: 10px 8px 10px 8px
}

input[type="radio"]{display: none }
label{
    cursor: pointer;
}

.danger{
    background-color: #4b5976;
}

.selected{
    background-color: #85BDA6;
    color: white;
    transition: 1s;
}

input:checked + label {
    transition: 1s;
    
    background-color: rgb(104, 149, 167);
    background-color: #85BDA6;
    color: white;
    /*box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);*/
    border-color: #4B9DEA;
    z-index: 1;
}

.input-no-selected{
    background-color: #4b5976;
}

input + label{
    transition: 1s;
    background-color: #4b5976;
}

.red { 
    background-color: #e66f66 !important;
}
.border {
    border-radius: 6px;
   
}
.border-right {
    border-radius: 0 6px 6px 0;
    border-left: none;
}


table{
    -webkit-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    border-collapse: collapse;
    width: 100%;
    text-align: center;
}


table td, table th {
    height: 30px;
    padding: 8px;
}

table tbody td{
    height: 60px;
}
table th{
    background-color: #4b5976;
    color:#dedfe0;
}
table td{
    background-color: #2a3141;
    color:#dedfe0;
    font-weight: 300 !important;
    border-left: 0;
    border-right: 0;

    
}
table th{
    width: 50px;
}



</style>
