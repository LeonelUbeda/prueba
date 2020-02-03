<template>
    <div class="overlay" @click.self="enviar">
        <div class="box" >
            
            <SearchBar @SendSearchData="Buscar" />
        
            <Table class="margin-tables"
                    :tabla="tabla"
                    :orden="orden"
                    :texts="texts"
                    :body="body.body" 
                    @clicked="enviar"
                    @page="page" 
                    />
            <input type="button" class="btn red" value="Regresar" @click="enviar"/>
        </div>
    </div>
</template>



<script>
/* 
    <SearchForeign v-if="forshow" :tabla="this.fortabla" :seccion="this.seccion" @SendForeign="forUpdate"/>
    Para usar este component, le tenes que pasar el nombre de la tabla en la que se va a buscar
    y la seccion de donde se va a sacar la info (del backend, para la ruta /seccion/buscar)
    Va a emitir un evento SendForeign Key con el valor del id
*/

import axios from 'axios';
import SearchBar  from './SearchBar.vue';
import Table from './Table.vue';
export default {
    data: () => {
        return{
            body: [],
            pagina: 0,
            busqueda: ''
        }
    },
    props: { 
        tabla: String,
        seccion: String,
        orden: {
            type: Array,
            default: () => ['nombre','id']
        },
        texts: {
            type: Object,
            default: () => { return {
                id: {
                    titulo: 'ID',
                },
                nombre: {
                    titulo: 'Nombre',
                }}
            }
        }
    },
    components: {
        SearchBar,
        Table,
    },
    methods: {
        Buscar:async function(value){
            
            let busqueda = value == undefined ? '': value ;
            this.busqueda = busqueda;
            const tipo = 'nombre';
           
            
            await axios.post(`/${this.seccion}/buscar/`, {tabla: this.tabla, busqueda: this.busqueda, tipo: tipo, pagina: this.pagina })
            .then((response) => {

                this.body = response.data;
            })
        },
        page: async function(res) {
            switch (res.accion) {
                case 'primera':
                    this.pagina = 0;
                    break;
                case 'anterior':
                    this.pagina = (this.pagina - 1 < 0 ? 0 : this.pagina - 1 );
                    break;
                case 'siguiente':
                    this.pagina = (this.pagina + 1 > this.body.count ? this.body.count : this.pagina + 1 );
                    break;
                case 'ultima' :
                    this.pagina = this.body.count;
                    break;
            }
            const tipo = 'nombre';

            await axios.post('/clasificacion/buscar/', {tabla: res.tabla, busqueda: this.busqueda, tipo: tipo, pagina: this.pagina })
            .then((response) => {
                this.body = response.data;
            })
        },
        enviar( contenido ) {
            let res = -1;
            if ( contenido.hasOwnProperty('elemento') ) {
                res = contenido.elemento.id;
            }

            this.$emit('SendForeign', res )
        }
    },
    created(){
        this.Buscar();
    },
    computed: {
        formatearTitulo () {
            return this.tabla.toLowerCase()
            .split('_')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        }
    }
}

</script>

<style scoped>



table{
    -webkit-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    border-collapse: collapse;
    width: 100%;
}
table td, table th {
    height: 30px;
    padding: 8px;
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
    cursor: pointer;
}
table tbody tr:hover td{ background-color: #323b4e ; transition: .2s}
table tbody tr td{transition: .5s}

div .box{
    /*border: 1px solid #555861;*/
    width: 500px;
    display: flex;
    position: relative;
    top: -100px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #232730;
    background-color: #222831;
    padding: 15px 30px;
    border-radius: 10px;
    height: auto;
    color: white !important;
}
div .box > * {
    margin: 10px 0;
}
div .overlay {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;
    background-color: rgba(0,0,0,0.8);
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
}



.btn{
    background-color: #6a7cab !important;
    color: white;
    margin: 15px 10px;
    padding: 8px 20px;
    border: 0;
    outline: 0;
    border-radius: 10px;
}
.red{
    background-color: #e66f66 !important;
}
</style>
