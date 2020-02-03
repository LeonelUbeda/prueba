<template>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th :key="llaves" v-for="llaves of orden">{{texts[llaves].titulo}}</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="contenido.id" v-for="contenido of body" @click="send(contenido)">
                   
                    <td :key="items" v-for="(items, index) in orden">
                        <div class="color-container">
                            <div v-if="index == 0">{{contenido[items]}}</div>
                            <div v-else-if="contenido[items] === 'Ninguno'" class="color ninguno"></div>
                            <div v-if="contenido[items] === 'Leer' || contenido[items] === 'Escribir' || contenido[items] === 'Actualizar' || contenido[items] === 'Eliminar'" class="color leer"></div>
                            <div v-if="contenido[items] === 'Escribir' || contenido[items] === 'Actualizar' || contenido[items] === 'Eliminar'" class="color insertar"></div>
                            <div v-if="contenido[items] === 'Actualizar' || contenido[items] === 'Eliminar'" class="color actualizar"></div>
                            <div v-if="contenido[items] === 'Eliminar'" class="color eliminar"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<style scoped>
.color-container{
    display: flex;
    min-width: 150px;
    text-align: center;
    border-radius: 4px;
}
.color{
    width: 100%;
    height: 30px;
    
}
.eliminar{
    background-color: #E8545F;
}

.actualizar{
    background-color: #5151E0;
    background-color: #99CFFF;
    background-color: #52E2E2;
    
}

.insertar{
    background-color: #6CDDDD;
    background-color: #59CE96;
    background-color: #48B77F;
}

.leer{
    background-color: #5298D1;
    background-color: #4681AA;
}


.ninguno{
    background-color: #E5F4E4;
    background-color: #444A4F;
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
    padding: 8px 10px;
}
table td{
    background-color: #2a3141;
    color:#dedfe0;
    font-weight: 300 !important;
    border-left: 0;
    border-right: 0;
    cursor: pointer;
}

</style>


<script>
export default {
    props: {
        body: Array,
        orden: Array,
        texts: Object
    },
    methods: {
        send: function(value){
            console.log(value)
            this.$emit('clicked', value)
        }
    }
}
</script>
