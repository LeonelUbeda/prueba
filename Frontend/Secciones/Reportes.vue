<template>
    <div id="container">
        <div id="titulo">
            <h2 >Reportes</h2>
        </div>
        <tr class="flex center blanco" style="margin-bottom: 25px;">
                <td class="space"><h2>Movimiento de lotes:</h2></td>
                <td class="space">
                    Filtrar por: Vejez: <DropSelector :titles="['1 Día', '1 Semana', '1 Mes', '1 Año', 'Todo']" :values="['second', 'week', 'month', 'year', 'none']" @input="actualizarMov" v-model="filtroFecha" />
                </td>
                <td class="space">
                    Producto:  <SearchForeingInput @input="actualizarMov" v-model="filtroSKU" :tabla="'producto'" :seccion="'productos'" :identificador="'sku'" :orden="['nombre', 'sku']" :texts="{nombre: {titulo: 'Nombre'}, sku: {titulo: 'SKU'}}" :buscarPor="'nombre'"></SearchForeingInput>
                    <span @click="borrar">Borrar</span>
                </td>
                
                </tr>
        <table id="tabla" class="blanco">
                
                <tr>
                    <td>Lotes ingresados: {{ingresados}}</td>
                    <td>Lotes sacados: {{sacados}}</td>
                    <td>Lotes eliminados: {{eliminados}}</td>
                </tr>
            </table>

        <div id="search" v-show="!editMode">
            <SearchBar v-on:SendSearchData="buscar"></SearchBar>
            <DropSelector :titles="['SKU', 'Usuario']" :values="['sku', 'user']" v-model="tipo" ></DropSelector>
        </div>
        
        <div class="table-container">
                <Table class="text-center"
                :tabla="'movimientos'"
                :orden="movimientosOrden" 
                :texts="movimientosTexts"
                :body="movimientos.body"
                @page="page"
                >
                </Table>
        </div>

    </div>
</template>


<script>
import SearchBar from '../Components/SearchBar.vue'
import axios from 'axios'
import Table from '../Components/Table.vue'
import Alertar from '../Utilidades/Alertas.js'
import DropSelector from '../Components/MicroComponents/DropSelector.vue'
import SearchForeingInput from '../Components/MicroComponents/SearchForeignInput.vue';

export default {
    data: () => {
        return{
            movimientosTexts: {
                id: {
                    titulo: 'ID'
                },
                user: {
                    titulo: 'Usuario'
                },
                fecha: {
                    titulo: "Fecha"
                },
                tipo: {
                    titulo: "Tipo"
                },
                SKU: {
                    titulo: "SKU"
                },
                cantidad: {
                    titulo: "Cantidad"
                }
            },
            movimientosOrden: ['user','fecha', 'SKU', 'cantidad', 'tipo','id'],
            movimientos: {},
            busqueda: '',
            movimientosPage: 0,
            editarInfo: {},
            editMode: false,
            tipo: '',
            filtroSKU: '',
            filtroFecha: 'second',
            ingresados:0,
            sacados:0,
            eliminados:0, 
        }
    },
     components: {
        Table,
        SearchBar,
        DropSelector,
        SearchForeingInput
    },
    methods: {
        buscar: function(value){
            const info = {
                tabla: 'movimientos',
                busqueda: value,
                pagina: this.movimientosPage,
                tipo: this.tipo
            }
            axios.post('/movimientos/buscar', info)
            .then((response) => {
                console.log(response)
                this.movimientos = response.data;
            })
            .catch(() => {console.log('ERROR')})
        },
        borrar: function() {
            this.filtroSKU = '';
            this.actualizarMov();
        },
        actualizarMov: function() {
             const info = {
                filtroSKU: this.filtroSKU,
                filtroFecha: this.filtroFecha
            }
            axios.post('/movimientos/sumas', info)
            .then((response) => {
                console.log(response)
                this.sacados = response.data.sacados || 0;
                this.ingresados = response.data.ingresados || 0;
                this.eliminados = response.data.eliminados || 0;
            })
            .catch(() => {console.log('ERROR')})

        },
        getMovimientos: function(){
            const info = {
                tabla: 'movimientos',
                busqueda: this.busqueda,
                pagina: this.movimientosPage,
                tipo: 'id'
            }
            axios.post('/movimientos/buscar', info)
            .then((response) => {
                console.log(response)
                this.movimientos = response.data;
            })
            .catch(() => {console.log('ERROR')})
        },
        page: function(res) {
            let page = this[`movimientosPage`];
            switch (res.accion) {
                case 'primera':
                    this[`movimientosPage`] = 0;
                    break;
                case 'anterior':
                    this[`movimientosPage`] = (page - 1 < 0 ? 0 : page - 1 );
                    break;
                case 'siguiente':
                    this[`movimientosPage`] = (page + 1 > this.movimientos.count ? this.movimientos.count : page + 1 );
                    break;
                case 'ultima' :
                    this[`movimientosPage`] = this.movimientos.count;
                    break;
            }
            axios.post('/movimientos/buscar/', {tabla: 'movimientos', busqueda: this.busqueda, tipo: this.tipo, pagina: this[`movimientosPage`] })
            .then((response) => {
                this.movimientos = response.data;
            })
        },
        
    },
    created(){
        this.getMovimientos()
    }
    
        
    
}
</script>


<style scoped>

.flex{
    display: flex;
    width: 100%;

}
.space{
    padding: 0 20px;;
}
.center{
    align-items: center;
    justify-content: center;
}

#tabla{
    width: 70%;
    text-align: center;
    margin-bottom: 25px;
}

.blanco{
    color: white;
    
}

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
