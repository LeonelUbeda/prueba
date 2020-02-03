<template>
    <div id="container">
        <div id="titulo">
            <h2 >Clasificacion</h2>
        </div>
        <input type="radio" id="all" name="menu" value="todo" v-model="Selected">
        <input type="radio" id="marca" name="menu" value="marca" v-model="Selected">
        <input type="radio" id="categoria" name="menu" value="categoria" v-model="Selected">
        <input type="radio" id="subcategoria" name="menu" value="subcategoria" v-model="Selected">

        <div id="search-container">

            <SearchBar v-on:SendSearchData="Buscar"></SearchBar>
            <DropSelector :titles="['Nombre', 'ID', 'Categoria',]" :values="['nombre', 'id', 'ID_categoria']" v-model="tipo" ></DropSelector>
            <div id="seccion-btn">
                <label for="all">
                    <div class="boton-seccion" @click="cambioSeccion" :class="{btnactive: Selected =='todo'}">Todos</div>
                </label>
                <label for="marca">
                    <div class="boton-seccion" @click="cambioSeccion" :class="{btnactive: Selected =='marca' || Selected == 'anadirmarca' }">Marca</div>
                </label>
                <label for="categoria">
                    <div class="boton-seccion" @click="cambioSeccion" :class="{btnactive: Selected =='categoria' || Selected == 'anadircategoria'}">Categoria</div>
                </label>
                <label for="subcategoria">
                    <div class="boton-seccion" @click="cambioSeccion" :class="{btnactive: Selected =='subcategoria' || Selected == 'anadirsubcategoria'}">Subcategoria</div>
                </label>
                <AddBtn @add="add" v-if="this.$store.state.Permissions.clasificacion > 2" :seleccion="Selected"></AddBtn>
            </div>
        </div>
        <div id="table-container">
            <!-- Este se encarga de input editar. Le manda la seccion, el schema y texts (texts son las cosas de
                titulo y el label de los inputs), los valores default, y en este caso porque es editar tenes quInputDatae poner
                boolDefault como true. El text y el schema los agarra segun el objeto InputData de la data. InputData
                tiene .tabla para la tabla y .elemento que es el elemento del editar. Eso lo manda la tabla.
              -->
            <transition name="slide-fade">
                <Inputs v-if="Selected == 'anadirmarca' || Selected == 'anadircategoria' || Selected == 'anadirsubcategoria'" 
                :seccion="'clasificacion'" 
                :texts="this[`${InputData.tabla}Texts`]" 
                :schema="schema[InputData.tabla]" 
                :default="InputData" 
                :boolDefault="false"
                @added="added" />
            </transition>
            <!-- Este se encarga de input editar. Le manda la seccion, el schema y texts (texts son las cosas de
                titulo y el label de los inputs), los valores default, y en este caso porque es editar tenes que poner
                boolDefault como true. El text y el schema los agarra segun el objeto InputData de la data. InputData
                tiene .tabla para la tabla y .elemento que es el elemento del editar. Eso lo manda la tabla.
              -->
            <transition name="slide-fade">
                <Inputs v-if="Selected == 'editar'" 
                :seccion="'clasificacion'" 
                :texts="this[`${InputData.tabla}Texts`]" 
                :schema="schema[InputData.tabla]" 
                :default="InputData" 
                :boolDefault="true"
                @added="added" />
            </transition>


            <EmptyMsg v-show="Show"></EmptyMsg>
            <div id="wrapper">
                <!-- PAGE: tenes que poner el @page. Tambien cambiar el :body a que usen el .body -->
                <transition name="slide-fade">
                    <Table class="margin-tables"
                    :tabla="'marca'"
                    :orden="marcaOrden" 
                    :texts="marcaTexts"
                    :body="marca.body"
                    @clicked="editar"
                    @page="page" aa
                    v-if="(Selected == 'marca' || Selected == 'todo') || (Selected == 'anadirmarca' )"
                    ></Table>
                </transition>  
            </div>

            
            <transition name="slide-fade">

                <Table class="margin-tables"
                :tabla="'categoria'"
                :orden="categoriaOrden" 
                :texts="categoriaTexts"
                :body="categoria.body"
                @clicked="editar" 
                @page="page"
                v-if="( Selected == 'categoria' || Selected == 'todo' ) || (Selected == 'anadircategoria' )"
                ></Table>
            </transition>

            <transition name="slide-fade">
                
                <Table class="margin-tables"
                :tabla="'subcategoria'"
                :orden="subcategoriaOrden"
                :texts="subcategoriaTexts"
                :body="subcategoria.body" 
                @clicked="editar" 
                @page="page"
                v-if="(Selected == 'subcategoria' || Selected == 'todo') || (Selected == 'anadirsubcategoria')"
                ></Table>

            </transition>

            

        </div>

    </div>
    
</template>

<script>
import 'babel-polyfill';
import DropSelector from '../Components/MicroComponents/DropSelector.vue'
import axios from 'axios';
import Table from '../Components/Table.vue';
import SearchBar  from '../Components/SearchBar.vue';
import EmptyMsg from '../Components/EmptyMsg.vue'
import Inputs from '../Components/Inputs.vue';
import AddBtn from '../Components/AddBtn.vue';


export default {
    
    data: () => {
        return{
            Show: false,
            Selected : 'todo',
            //InputData. Esto va a tener un .tabla de la tabla que se va a usar y un .elemento que va a ser para los valores predeterminados
            InputData: {},
            SearchData: '',
            tipo: 'aaaaaaaaa',
            categoria: [],
            subcategoria: [],
            marca: [],
            schema: {},
            //En los texts se pone titulo de la tabla y el label de los inputs
            marcaTexts: {
                nombre: {
                    titulo: 'Marca',
                    input: 'Nombre de marca:'
                },
                id: {
                    titulo: 'ID',
                    input: 'ID:'
                }
            },
            categoriaTexts: {
                nombre: {
                    titulo: 'Categoría',
                    input: 'Nombre de categoría:'
                },
                id: {
                    titulo: 'ID',
                    input: 'ID:'
                },
            },
            subcategoriaTexts: {
                ID_categoria: {
                    input: 'Categoría:'
                },
                categoria__nombre: {
                    titulo: 'Categoría'
                },
                nombre: {
                    titulo : 'Subcategoría',
                    input: 'Nombre de subcategoría:'
                },
                id: {
                    titulo: 'ID',
                    input: 'ID:'
                },
            },
            marcaOrden : [ 'nombre', 'id' ],
            categoriaOrden: [ 'nombre', 'id' ],
            subcategoriaOrden: [ 'nombre', 'categoria__nombre', 'id' ],
            //PAGE: inicializar las variables page
            marcaPage: 0,
            categoriaPage: 0,
            subcategoriaPage: 0,
            busqueda: ''
        }
    },
    components: {
        Table,
        SearchBar,
        EmptyMsg,
        Inputs,
        AddBtn,
        DropSelector
    },
    created(){
        this.actualizar()
    },
    methods: {
        //En el add, si esta selected una seccion, esa seccion se vuelve la tabla del inputData.
        add: function(value) {
            if (this.Selected !== 'todo' && this.Selected !== 'anadir' && this.Selected !== 'editar') {
                this.InputData.tabla = this.Selected;
                this.InputData.elemento = undefined;
                this.Selected = `anadir${this.Selected}`;

            }
        },
        added: function(cambio) {
            cambio ? this.actualizar(): null;
            this.Selected = 'todo'
            console.log(cambio)
            
        },
        cambioSeccion: function(){
            this.Show = false;
            this.actualizar()
        },
        editar: function(value){
            if(this.$store.state.Permissions.clasificacion > 4){
                this.InputData = value;
                this.Selected = 'editar';
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

            await axios.post('/clasificacion/buscar/', {tabla: res.tabla, busqueda: this.busqueda, tipo: this.tipo, pagina: this[`${res.tabla}Page`] })
            .then((response) => {
                this[res.tabla] = response.data;
            })
        },
        actualizar:async function(){
            await axios.get('/clasificacion/info')
            .then((response) => {
                let {schema, categoria, subcategoria, marca} = response.data;
                this.marca = marca;
                this.categoria = categoria;
                this.subcategoria = subcategoria;
                this.schema = schema;
               
            })
        },
        Buscar:async function(value){
            let busqueda = value;
            //PAGE: Tenes que poner esta wea para que se paginen las busquedas
            this.busqueda = value;
            console.log(this.Selected);
            if(this.Selected !== 'subcategoria' && this.tipo == 'ID_categoria'){
                this.tipo = 'nombre'
            }
            await axios.post('/clasificacion/buscar/', {tabla: this.Selected, busqueda: busqueda, tipo: this.tipo })
            .then((response) => {
                if(this.Selected == 'todo'){
                    console.log(response);
                    const {categoria, subcategoria, marca} = response.data;
                    categoria.length == 0 && subcategoria.length == 0 && marca.length == 0 ? this.Show = true : this.Show = false;
                    this.marca = marca;
                    this.categoria = categoria;
                    this.subcategoria = subcategoria;
                }else{
                    response.data.length == 0 ? this.Show = true : this.Show = false;
                    console.log(response);
                    this[this.Selected] = response.data
                }
            })
        },
    }
}
</script>

<style scoped>
.btnactive{
    background: #6a7cab !important;
}
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
    input[type="radio"]{
        display: none;
    }
    *{color: white}
    #table-container{
        width: 90%
    }
    .margin-tables{margin-bottom: 30px;}
</style>
