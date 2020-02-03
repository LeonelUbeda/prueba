<template>
    <div>
        <table>
            <caption>{{ formatearTitulo }}</caption>
            <thead>
                <tr>
                    <th :key="llaves" v-for="llaves of orden">{{texts[llaves].titulo}}</th>
                </tr>
            </thead>    
            <tbody>
                <tr :key="contenido.id" v-for="contenido of body" @click="respuesta(contenido)">
                    <td :key="items" v-for="items in orden">{{contenido[items]}}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="pagina" class="controls">
            <span @click="page('primera')">Primera P&aacute;gina</span>
            <span @click="page('anterior')">P&aacute;gina Anterior</span>
            <span @click="page('siguiente')">Siguiente P&aacute;gina</span>
            <span @click="page('ultima')">&Uacute;ltima P&aacute;gina</span>
        </div>
    </div>
</template>



<script>
export default {
    props: { 
        tabla: String,
        body: Array,
        orden: Array,
        texts: Object,
        pagina: {
            type: Boolean,
            default: true,
        }

    },
    methods: {
        respuesta( contenido ) {
            const res = {
                elemento: contenido,
                tabla: this.tabla
            }
            this.$emit('clicked', res )
        },
        page( val ) {
            const res = {
                tabla: this.tabla,
                accion: val
            }
            this.$emit('page', res);
        }
    },
    created(){
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
caption{
    color: white;
    font-size: 1.5em;
    
}
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
div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

div.controls {
    color: white;
    flex-direction: row;
    background-color: #252c3d;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 5px;
    
}
div.controls span {
    padding: 5px;
    transition: 0.5s;
    cursor: pointer;
    border-radius: 8px;
}

div.controls span:hover {
    background-color: #3d4864;
}
</style>




