
<template>
<div id="container">
    <h1>Bienvenido {{nombre}}</h1>
    <h2 v-show="this.$store.state.Permissions.lotes > 1" id="alertas">Alertas</h2>
    <div v-if="alertaCantidad.length == 0 && alertaVencimiento.length == 0 && this.$store.state.Permissions.lotes > 1">
        No hay alertas
    </div>
    <div v-else>
                <Table v-if="alertaVencimiento.length != 0 && this.$store.state.Permissions.lotes > 1"
                        class="text-center"
                    :tabla="'Productos_por_vencerse'"
                    :orden="vencimientoOrden" 
                    :texts="vencimientoTexts"
                    :body="alertaVencimiento"
                    @clicked="editar"
                    :pagina="false"
                    />
        <Table v-if="alertaCantidad.length != 0 && this.$store.state.Permissions.lotes > 1"
                    class="text-center"
                    :tabla="'Productos_por_agotarse'"
                    :orden="cantidadOrden" 
                    :texts="cantidadTexts"
                    :body="alertaCantidad"
                    @clicked="editar"
                    :pagina="false"
                    />

    </div>
</div>
</template>



<script>
import $ from 'jquery'
import axios from 'axios';
import Table from '../Components/Table.vue'
import Velocity from 'velocity-animate'
import velocity from 'velocity-ui-pack'
export default {
    data: () => {
        return{
            nombre: '',
            alertaCantidad: [],
            alertaVencimiento: [],
            cantidadTexts : {
                producto: {
                    titulo: 'SKU'
                },
                nombre: {
                    titulo: 'Nombre'
                },
                cantidad: {
                    titulo: 'Cantidad en inventario'
                },
                minimo_stock: {
                    titulo: 'Cantidad crítica'
                }
            },
            cantidadOrden : ['producto','nombre','cantidad','minimo_stock'],
            vencimientoTexts: {
                id_lotes: {
                    titulo: 'ID del lote'
                },
                fecha_caducidad: {
                    titulo: 'Fecha de caducidad'
                },
                nombre: {
                    titulo: 'Nombre del producto'
                }
            },
            vencimientoOrden: ['id_lotes','nombre','fecha_caducidad']
        }
    },
    components: {
        Table
    },
    methods: {
        toggle(elemento){
            Velocity($(`#${elemento}`),{ height: 0 , opacity: 0 , display: block})
        },
        toggle2(elemento){
            Velocity($(`#${elemento}`),{ height: 200 , opacity: 1, display: none })
        },
        editar() {
        },
        getAlertas() {
            axios.post('/getalertas')
            .then((response) => {

                this.alertaCantidad = response.data[0];
                this.alertaVencimiento = response.data[1];
                console.log(this.alertaVencimiento.length);
            
            })
        }
    },
    created () {
        this.getAlertas();   
    },
    mounted() {
        this.nombre = this.$store.state.User.name
    }
}
</script>

<style scoped>
#contenedor{
    overflow: hidden;
}

.slide-enter-active, .slide-leave-active  {
  transition: all .6s ease;
}
.slide-enter, .slide-leave-to{
  transform: translateY(-100%);
  opacity: 0;
}
    #cuadro{
        background-color: red;
        width: 100%;
        height: 200px;
       
    }
    
    div{
        margin: 50px auto 0 auto;
    }
    h1{
        text-align: center;
        color: white;
    }
    #container{
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
