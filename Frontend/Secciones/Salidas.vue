<template>
    <div id="container">
        <div id="titulo">
            <h2 >Salidas</h2>
        </div>
        <div id="element-container" class="bg">
            <div class="titulo-container">
                    <h4>Salida de inventario</h4>
            </div>
            <div class="inputs-container">
                
                <div class="group-two-container input-group">
                    <div class="group-two">
                        <label for="nombre">SKU</label>
                        <SearchForeignInput  v-model="sku" :tabla="'producto'" 
                        :seccion="'productos'" 
                        :identificador="'sku'" :orden="['nombre', 'sku']" 
                        :texts="{nombre: {titulo: 'Nombre'}, sku: {titulo: 'SKU'}}" 
                        :buscarPor="'nombre'">
                        </SearchForeignInput>
                    </div>
                    <div class="group-two">
                        <label for="nombre">Cantidad de elementos a sacar</label>
                        <!--SearchForeign :tabla="'categoria'" :seccion="'clasificacion'" > </SearchForeign-->
                        <input type="text" class="input-default" v-model="cantidad">
                        <!--input type="text" v-model="subcategoria" class="input-default input-group-two"-->
                    </div>
                </div>
                <button @click="enviar">Confirmar</button>
            </div>
        </div>
        <div id="contenedor-mensajes">
            <div class="mensajes" v-for="(elemento, index) of ids" :key="elemento">
                Se han extraido {{sacados[index]}} items del lote ID:{{elemento}}, y quedan {{restante[index]}}
            </div>
        </div>

    </div>
</template>



<script>
import SearchForeignInput from '../Components/MicroComponents/SearchForeignInput.vue'
import axios from 'axios'
import swal from 'sweetalert2'
import Alertas from '../Utilidades/Alertas'
export default {
    data: () => {
        return{
            sku: '',
            cantidad: '',
            restante: [],
            sacados: [],
            ids: [],
            body: ''
        }
    },
    methods: {
        enviar: async function(){
            if(this.cantidad.toString() < 0){
                Alertas.ErrorMsg()
                
            }else{
                Alertas.ToSendCustom('/salida/sacar', {sku: this.sku, cantidad: this.cantidad}, "Error, está intentando sacar mas producto que el existente",  "Acción ejecutada correctamente")
                .then((response) => {
                    console.log(response)
                    let {cantidad, ids, sacados} = response.data;
                    this.restante = cantidad;
                    this.sacados = sacados;
                    this.ids = ids;
                })
                .catch((error) => console.log(error))
                }
            
        },
        
    },
    components: {
        SearchForeignInput
    }
} // Mandar SKU y cantidad    Y si funciona, me retorna un objeto con dos arreglos la primera se llama IDS == Cantidad
</script>


<style scoped>
.mensajes{
    color: white;
    width: 100%;
    margin-top: 30px;
    background-color: #6c7c84;
    padding: 20px 0;
    display: flex;
    justify-content: center;
}

#contenedor-mensajes{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    
}
.inputs-container{
    width: 80%;

}
#titulo{
    margin-bottom: 30px;
    color: white;
    display: flex;
    height: 60px;
    align-items: center;

    border-bottom: solid 0.5px #6c7c84;
    width: 90%;
}
#titulo h2{margin: 0;}
.group-two-container{
    display: flex;
    justify-content: space-between;
}
.group-two{
    width: 47%;
    
}
.input-group{
    margin-top: 40px;
    width: 100%
}
#container{
    width: 100%;
    display: flex; 
    flex-direction: column;
    align-items: center;
    height: auto;
    padding-bottom: 50px;;
}
.bg{
    background-color: #2a3141
}
.titulo-container{
    font-size: 20px;
    background-color: #4b5976;
    width: 100%;
    display: flex;
    height: 50px;;
    align-items: center;
    border-radius: 7px 7px 0 0;

}

.titulo-container h4{
    margin: 0;
    margin-left: 20px;
}

#element-container{
    color: white;
    width: 70%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
}
.input-default{
    box-sizing: border-box;
    border: 2px solid #747885;
    width: 100%;
    outline: 0;
    border-radius: 10px;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0);
    height: 40px !important;
    color: #cacaca;
}

</style>
