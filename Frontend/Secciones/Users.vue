<template>
    <div id="container">
        <div id="titulo">
            <h2 >Usuarios</h2>
        </div>
        <div id="search-container">

            <SearchBar v-on:SendSearchData="buscar"></SearchBar>

            <input type="radio" id="usuarios" name="menu" value="usuarios" @click="cambioSeccion" v-model="Selected" checked>
            <input type="radio" id="roles" name="menu" value="roles" @click="cambioSeccion" v-model="Selected">

            <div id="seccion-btn">
                <label for="usuarios">
                    <div class="boton-seccion" @click="cambioSeccion" v-bind:class="{btnactive: Selected == 'usuarios' || Selected == 'addUsuarios'}">Usuarios</div>
                </label>
                <label for="roles">
                    <div class="boton-seccion" @click="cambioSeccion" v-bind:class="{btnactive: Selected == 'roles'}">Roles</div>
                </label>
                <AddBtn @add="add" :class="[{blocked: Selected !== 'roles' && Selected !== 'usuarios'}]" ></AddBtn>
            </div>
        </div>
        <transition name="slide-fade">
            <div class="table-container" v-if="Selected == 'addUsuarios' || Selected == 'editarUsuarios'">
                <Inputs
                :seccion="'usuarios'" 
                :texts="usuariosTexts"
                :schema="usuariosSchema" 
                :default="InputData" 
                :pagina="false"
                :boolDefault="boolDefault"
                @added="FinishAdd"/>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="table-container" v-if="Selected == 'usuarios' || Selected == 'addUsuarios'">
                <Table class="margin-tables text-center"
                :tabla="'Usuarios'"
                :orden="usuariosOrden" 
                :texts="usuariosTexts"
                :body="usuarios.body"
                :pagina="false"
                @clicked="editar"
                ></Table>
            </div>
        </transition>    
        <transition name="slide-fade">
            <div class="table-container" v-if="false">
                <Table class="margin-tables text-center"
                :tabla="'Roles'"
                :orden="rolesOrden" 
                :texts="rolesTexts"
                :body="roles.body"
                :pagina="false"
                @clicked="editRoles"
                ></Table>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="table-container" v-if="Selected == 'roles'">
                <TableColors
                :orden="rolesOrden" 
                :texts="rolesTexts"
                :body="roles.body"
                @clicked="editRoles"
                >
                </TableColors> 
            </div>
        </transition>    
        <transition name="slide-fade">
            <div id="add-container" v-if="Selected == 'addRoles' || Selected == 'editRoles'">
                <TableAdd 
                :titles="AddTableTitle"
                :action="actionRoles"
                :body="AddTableTexts"
                :defaultValues="EditValues"
                :editInfo="EditRolesInfo"
                @finish="RolesEnd"
                
                >
                </TableAdd>
            </div>
        </transition>

    </div>
</template>

<script>
import TableColors from '../Components/TableColors.vue'
import TableAdd from '../Components/TableAdd.vue'
import AddBtn from '../Components/AddBtn.vue'
import SearchBar from '../Components/SearchBar.vue'
import Table from '../Components/Table.vue'
import Inputs from '../Components/Inputs.vue'
import axios from 'axios'

export default {
    data: () => {
        return{
            AddTableTitle: ['Seccion','Ninguno', 'Leer' , 'Escribir', 'Actualizar', 'Borrar'],
            AddTableTexts: ['Clasificacion', 'Lotes', 'Productos', 'Reportes'],
            EditRolesInfo: [], 
            actionRoles: 'add',
            EditValues: {},
            ShowAdd: false,
            boolDefault: false,
            Selected: 'usuarios',
            usuarios: [],
            InputData: {},
            usuariosSchema: {},
            usuariosPage: 0,
            usuariosOrden : [ 'name', 'roles__nombre' ],
            usuariosTexts: {
                name: {
                    titulo: 'Usuario',
                    input: 'Nombre de Usuario:'
                },
                roles__nombre: {
                    titulo: 'Rol',
                },
                ID_rol: {
                    input: 'Rol del usuario'
                },
                user: {
                    input: 'Usuario para Login'
                },
                pass: {
                    input: 'Contraseña'
                }
            },
            roles: [],
            rolesPage: 0,
            rolesOrden: ['nombre','clasificacion', 'lotes', 'productos', 'reportes'],
            rolesTexts: {
                nombre: {
                    titulo: 'Rol',

                },
                clasificacion: {
                    titulo: 'Clasificacion',
                    
                },
                lotes: {
                    titulo: 'Lotes',
                },
                productos: {
                    titulo: 'Productos',
                    
                },
                reportes: {
                    titulo: 'Reportes',
                    
                }
            },
            busqueda: 0
        }
    },
    methods: {
        RolesEnd: function(changes){
            if(changes){
                this.getRoles()
            }

            this.Selected = 'roles'
        },
        cambioSeccion(){
            this.actionRoles = 'add'
        },
        buscar: function(){

        },
        editar: function(value){
            this.InputData = value;
            this.boolDefault = true;
            this.Selected = 'editarUsuarios';
        
        },
        FinishAdd: function(cambio){
            
            this.getUsers()
            this.Selected = 'usuarios'
            
            
        },
        add: function(){
            switch (this.Selected) {
                case 'roles':
                    this.actionRoles = 'add'
                    this.Selected = 'addRoles'
                    break;
                case 'usuarios':
                    this.boolDefault = false;
                    this.Selected = 'addUsuarios'
                default:
                    
                    break;
            }
        }, 
        page: async function(res) {
            let page = this[`${res.tabla}Page`];
            switch (res.accion) {
                case 'primera':
                    this[`${res.tabla}Page`] = 0;
                    break;
                case 'anterior':
                    this[`${res.tabla}Page`] = (page - 1 < 0 ? 0 : page - 1 );
                    break;
                case 'siguiente':
                    this[`${res.tabla}Page`] = (page + 1 > this[res.tabla].count ? this[res.tabla].count : page + 1 );
                    break;
                case 'ultima' :
                    this[`${res.tabla}Page`] = this[res.tabla].count;
                    break;
            }

            await axios.post('/usuarios/buscar/', {tabla: res.tabla, busqueda: this.busqueda, tipo: this.tipo, pagina: this[`${res.tabla}Page`] })
            .then((response) => {
                this[res.tabla] = response.data;
            })
        },
        editRoles: function(value){
            this.EditValues = value;
            this.actionRoles = 'edit'
            this.Selected = 'editRoles'
        },
        getUsers(){
            axios.get('/getusers')
            .then((response) => {
                let {users, schema} = JSON.parse(response.data)
                this.usuarios = users;
                console.log("SCHEMA",schema.usuarios)
                this.usuariosSchema = schema.usuarios
                
            })
            .catch((error) => {
                console.log(error)
            })
        },
        getRoles(){
            axios.get('/getroles')
            .then((response) => {
                response = response.data;
                return response
            })
            .then((response) => {
                this.roles = response

            })
        }
        
    },
    created(){
        this.InputData.tabla = 'usuarios';
        this.InputData.elemento = undefined;
        this.getUsers()
        this.getRoles()
    },
    components : {
        SearchBar,
        AddBtn,
        Table,
        TableAdd,
        TableColors,
        Inputs
    }

}
</script>


<style scoped>
#titulo{
    margin-bottom: 30px;
    color: white;
    display: flex;
    height: 60px;
    align-items: center;

    border-bottom: solid 0.5px #6c7c84;
    width: 90%;
}

#titulo h2{
    margin-left: 40px;
}
    .blocked{
        cursor:not-allowed
    }


    h1{
        color: white;
    }
    #search-container{
        display: flex;
        width: 90%;
        margin: 20px 0
    }
    #container{
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    .boton-seccion{
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #dedfe0;
                                                                                                                                                
        width: auto;
        padding-left:10px;
        padding-right: 10px;
        margin: 0 5px;
        height: 36px;
        background: #3a4560;
        border-radius: 10px;
        cursor: pointer;
    }
    .text-center{ text-align: center;}
    #seccion-btn{
        display:flex;
    }
    input[type="radio"]{
        display: none;
    }
    .table-container{
        width: 90%
    }
    #add-container{
        width: 90%;
    }


    .btnactive{
        background: #6a7cab;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
