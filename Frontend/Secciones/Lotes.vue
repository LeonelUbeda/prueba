<template>
    <div id="container">
        <div id="titulo">
            <h2 >Lotes</h2>
        </div>
        <div id="search" v-show="!editMode">
            <SearchBar v-on:SendSearchData="buscar"></SearchBar>
            <!--DropSelector :titles="['Nombre', 'SKU', 'Marca', 'Subcategoria']" :values="['nombre', 'sku', 'for_ID_marca', 'for_ID_subcategoria']" v-model="tipo" ></DropSelector-->
            <DropSelector :titles="['SKU', 'Producto', 'Almacen', 'ID']" :values="['sku', 'for_sku', 'for_ID_almacen', 'id']" v-model="tipo" ></DropSelector>
            <AddBtn @add="add" v-if="this.$store.state.Permissions.lotes > 2"></AddBtn>
        </div>
        
        <div class="table-container">
                <Table class="text-center"
                :tabla="'lotes'"
                :orden="lotesOrden" 
                :texts="lotesTexts"
                :body="lotes.body"
                @clicked="borrar"
                @page="page"
                v-if="!editMode"
                >
                </Table>
        </div>

        <div id="editor-container">
            <LotesEditor
            :edit="editarInfo" 
            :action="action" 
            v-if="editMode" 
            @added="added"
            >   
            </LotesEditor>
        </div>
    </div>
</template>


<script>
import SearchBar from '../Components/SearchBar.vue'
import axios from 'axios'
import Table from '../Components/Table.vue'
import LotesEditor from '../Components/LotesEditor.vue'
import AddBtn from '../Components/AddBtn.vue'
import Alertar from '../Utilidades/Alertas.js'
import DropSelector from '../Components/MicroComponents/DropSelector.vue'
export default {
    data: () => {
        return{
            lotesTexts: {
                id: {
                    titulo: 'ID'
                },
                sku:{
                    titulo: 'SKU'
                },
                cantidad: {
                    titulo: 'Cantidad'
                },
                almacen__nombre: {
                    titulo: 'Almacen'
                },
                producto__nombre: {
                    titulo: 'Producto'
                },
                costo: {
                    titulo: 'Precio C$'
                }
            },
            lotesOrden: ['sku','producto__nombre','almacen__nombre', 'cantidad','id',],
            lotes: {},
            busqueda: '',
            lotesPage: 0,
            editarInfo: {},
            editMode: false,
            tipo: '',
            action: 'anadir'
        }
    },
     components: {
        Table,
        LotesEditor,
        AddBtn,
        SearchBar,
        DropSelector
    },
    methods: {
        borrar: function(value){

            if(this.$store.state.Permissions.lotes > 4){
                const Query = {
                    tabla: 'lotes',
                    id: value.elemento.id
                }
                Alertar.DeleteElement('/clasificacion/eliminar', Query)
                .then(() => {console.log('Eliminado')})
            }
        },
        buscar: function(value){
            const info = {
                tabla: 'lotes',
                busqueda: value,
                pagina: this.lotesPage,
                tipo: this.tipo
            }
            axios.post('/lotes/buscar', info)
            .then((response) => {
                console.log(response)
                this.lotes = response.data;
            })
            .catch(() => {console.log('ERROR')})
        },
        getLotes: function(){
            const info = {
                tabla: 'lotes',
                busqueda: this.busqueda,
                pagina: this.lotesPage,
                tipo: 'id'
            }
            axios.post('/lotes/buscar', info)
            .then((response) => {
                console.log(response)
                this.lotes = response.data;
            })
            .catch(() => {console.log('ERROR')})
        },
        added: function(value){
            value ? this.getLotes() : null;
            this.editMode = false
        },
        add: function(){
            this.editMode = true;
        },
        page: function(res) {
            let page = this[`lotesPage`];
            switch (res.accion) {
                case 'primera':
                    this[`lotesPage`] = 0;
                    break;
                case 'anterior':
                    this[`lotesPage`] = (page - 1 < 0 ? 0 : page - 1 );
                    break;
                case 'siguiente':
                    this[`lotesPage`] = (page + 1 > this.lotes.count ? this.lotes.count : page + 1 );
                    break;
                case 'ultima' :
                    this[`lotesPage`] = this.lotes.count;
                    break;
            }
            axios.post('/lotes/buscar/', {tabla: 'lotes', busqueda: this.busqueda, tipo: this.tipo, pagina: this[`lotesPage`] })
            .then((response) => {
                this.lotes = response.data;
            })
        },
        editar: function(value){
            this.action = 'editar'
            this.editarInfo  = value
            this.editMode = true;
        },
        
    },
    created(){
        this.getLotes()
    }
    
        
    
}
</script>


<style scoped>
.text-center{
    text-align: center;
}

Table{
    text-align: center !important;
}
#search{
    width: 80%;
    display: flex;
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
.table-container{
    width: 80%;
}
#editor-container{
    width: 100%
}
#container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
