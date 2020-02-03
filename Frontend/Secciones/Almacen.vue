<template>
    <div id="container">
        <div id="titulo">
            <h2 >Almacen</h2>
        </div>
        <div id="search-container">
            <SearchBar v-on:SendSearchData="Buscar"></SearchBar>
            <AddBtn @add="add" ></AddBtn>
        </div>
        <div id="table-container">
            <transition name="slide-fade">
                <Inputs v-if="editMode"
                :seccion="'clasificacion'"
                :texts="almacenTexts" 
                :schema="almacenSchema" 
                :default="editarInfo" 
                :boolDefault="true"
                @added="added" 
                />
            </transition>  
            <transition name="slide-fade">
                <Inputs v-if="addMode"
                :seccion="'clasificacion'"
                :texts="almacenTexts" 
                :schema="almacenSchema" 
                :default="editarInfo" 
                :boolDefault="false"
                @added="added" 
                />
            </transition>  
                <div id="wrapper">
                    <Table class="text-center"
                    :tabla="'almacen'"
                    :orden="almacenOrden" 
                    :texts="almacenTexts"
                    :body="almacen.body"
                    @clicked="editar"
                    :pagina="false"
                    >
                    </Table>
                </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import Table from '../Components/Table.vue';
import Inputs from '../Components/Inputs.vue';
import SearchBar  from '../Components/SearchBar.vue';
import AddBtn from '../Components/AddBtn.vue';

export default {
    data: () => {
        return{
            almacenTexts: {
                nombre: {
                    titulo: 'Nombre',
                    input: 'Nombre'
                },
                id: {
                    titulo: 'ID',
                    input: 'ID'
                },
                ID_almacen : {
                    input: 'ID'
                }
            },
            almacenOrden: ['nombre','id'],
            almacenSchema: {},
            almacen: {},
            almacenPage: 0,
            editMode: false,
            addMode: false,
            editarInfo: {}
        }
    },
     components: {
        Table,
        Inputs,
        SearchBar,
        AddBtn
    },
    methods: {
        add: function(){
            this.editMode = false;
            this.addMode = true; 
        },
        added: function(value){
            this.editMode = false;
            this.addMode = false;
            if(value != false) {
                this.getAlmacen();
            }
        },
        editar: function(value){
            this.editMode = true;
            this.editarInfo  = value
        },
        Buscar:async function(value){
            await axios.post('/almacen/buscar', {busqueda: value })
            .then((response) => {
                this.almacen = response.data.almacen;
            })
        },
        getAlmacen:  function(){
            axios.get('/almacen/info')
            .then((response) => {

                this.almacen = response.data.almacen;
                this.almacenSchema = response.data.schema.almacen;
            
            })
        },
    },
    created(){
        this.editarInfo.tabla = 'almacen'
        this.editarInfo.elemento = undefined;
        this.getAlmacen()
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
    /*background-color: #2E2A3D;
    background-color: #467E85;
    background-color: #1E5666;
    background-color: #375C7D;*/
    border-bottom: solid 0.5px #6c7c84;
    width: 90%;
}

#titulo h2{
    margin-left: 40px;
}
    Table{
        margin-bottom: 25px !important;
    }


    #container{
        align-items: center;
        display: flex;
        flex-direction: column;
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
    #search-container{
        display: flex;
        width: 90%;
        margin: 20px 0
    }
    #seccion-btn{
        display:flex;
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

    #table-container {
        width: 60%;
    }
    input[type="radio"]{
        display: none;
    }
    
    *{color: white}
    #table-container{
        width: 90%
    }
    .margin-tables{margin-bottom: 30px;}
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
