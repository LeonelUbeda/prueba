<template>
<div id="container-pe">
    <div id="title">
        <h2 class="white">{{action == 'editar' ? `Editar Elemento `: 'Añadir Elemento'}}</h2>
    </div>
    <div id="title-btn">
        <button @click="out" class="btn">Salir</button>
        
    </div>
    <div id="product-container">
        <div id="general-info" class="bg">
            <div class="titulo-container">
                <h4> Detalles generales</h4>
            </div>
            <div class="inputs-container">
                <div class="group-two-container input-group">
                    <div class="group-two">
                        <label for="nombre">*SKU</label>
                        <SearchForeingInput @input="SearchPerecederoSKU" v-model="sku" :tabla="'producto'" :seccion="'productos'" :identificador="'sku'" :orden="['nombre', 'sku']" :texts="{nombre: {titulo: 'Nombre'}, sku: {titulo: 'SKU'}}" :buscarPor="'nombre'"></SearchForeingInput>
                    </div>
                    <div class="group-two">
                        <label for="nombre">*Cantidad</label>
                        <IntInput v-model="cantidad"></IntInput>
                        
                    </div>
                </div>

                
                <div class="input-group">
                    <label for="nombre">*Valor de Lotes</label>
                    <CurrencyInput v-model="valor"></CurrencyInput>
                </div>
                    
                
                <div class="input-group" v-if="perecedero">
                    <label for="nombre"><h3>Vencimiento</h3></label>
                    <!--span id="number-sign">C$</span-->
                    <input type="date" v-model="fechaVencimiento">
                </div>
            </div>
        </div>
        <div id="specific-info">
            <div id="precio-container" class="bg flex column align">
                <div class="titulo-container">
                    <h4>Información de localizacion</h4>
                </div>
                <div class="inputs-container">
                    <div class="input-group">
                        <label for="nombre"><h3>*Almacen</h3></label>
                        <!--span id="number-sign">C$</span-->
                        <SearchForeingInput v-model="almacen" :tabla="'almacen'" :seccion="'almacen'"></SearchForeingInput>    
                    </div>
                    <div class="input-group">
                        <label for="nombre"><h3>Pasillo</h3></label>
                        <input v-model="pasillo" maxlength="20" class="input-default">
                    </div>
                    <div class="input-group">
                        <label for="nombre"><h3>Estante</h3></label>
                        <input v-model="estante" maxlength="20" class="input-default">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex">
        <button @click="send" class="btn">Guardar</button>
    </div>-
</div>
    
</template>
<script>
import IntInput from './MicroComponents/IntInput.vue'
import ToggleBtn from './MicroComponents/Button.vue'
import axios from 'axios'
import Dropdown from './MicroComponents/Dropdown.vue'
import CurrencyInput from './MicroComponents/CurrencyInput.vue'
import PercentInput from './MicroComponents/PercentInput.vue'
import SearchForeign from './SearchForeign.vue'
import SearchForeingInput from './MicroComponents/SearchForeignInput.vue'
import Alertas from '../Utilidades/Alertas'

export default {
    props: {
        action: String,
        edit: Object
    },
    data: function(){
        return{
            cantidad: '1',
            valor: 0,
            almacen: '',
            pasillo: '',
            estante: '',
            perecedero: false,
            fechaVencimiento: '', 
            sku: ''
        }
    },
    components: {
        IntInput,
        ToggleBtn,
        CurrencyInput,
        PercentInput,
        SearchForeign,
        Dropdown,
        SearchForeingInput,

    }, methods: {
        SearchPerecederoSKU: function(value){
            console.log('SKU', value)
            axios.post('/productos/sku', {sku: value})
            .then((response) => {this.perecedero = response.data.perecedero})
            .catch(error => console.log(error))
        },
        out: function(){
            this.$emit('added', false)
        },
        send: function(){
            const x = new Date()
            const sendInfo = {
                cantidad:       this.cantidad,
                valor:          this.valor,
                almacen:        this.almacen,
                pasillo:        this.pasillo,
                estante:        this.estante,
                perecedero:     this.perecedero,
                fecha_caducidad:this.fechaVencimiento,
                fecha_ingreso:  `${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}`,
                sku: this.sku
            }
            
            if(
                // Validaciones de los inputs
                (this.perecedero == true && this.fechaVencimiento == '') ||
                (this.almacen === '')                                    ||
                (this.sku == '')                                         ||
                (this.cantidad.toString() < 1)                                                         
                ){
                Alertas.ErrorMsg()
                return null
            }
            let url = this.action == 'anadir' ?  '/lotes/nuevo' :  '/lotes/editar';

            Alertas.ToSend( url , sendInfo)
            .then(() => this.$emit('added' , true))
            .catch(() => console.log('BUH >C'))
            
            //axios.post(`/productos/nuevo`, sendInfo)
            //.then(console.log('ENVIADO'))
        },
        editar: function(){
            if(this.action == 'editar'){
                let {valor, almacen, pasillo, estante, perecedero, fecha_caducidad, fecha_ingreso, sku} = this.edit.elemento;
                this.valor = valor;
                this.almacen = almacen;
                this.pasillo = pasillo,
                this.estante = estante
                this.perecedero = perecedero;
                this.fechaVencimiento = fecha_caducidad;
                this.sku = sku;
            }else{
                console.log('nel')
            }
        },
        deleteElement: function(){
            let sku = this.sku;
            console.log(sku)
            Alertas.DeleteElement('/productos/eliminar', this.sku)
            .then(() => this.$emit('added' , true))
            
        }
    },
    created(){
        this.editar()
    }
}
</script>


<style scoped>
#title-btn{
    display: flex;
    justify-content: space-between;
    width: 80%;
}

#title{
    display: flex;
    width: 80%;
    justify-content: center;
}
#vigilar{
    margin-top: 30px;
}

.padding-abajo{
    padding-bottom: 50px;
}

#container-pe{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 100%;
}
.radio-label{
    min-width: 100px;
    background: #cacaca
}

input[type=radio]{
    display: ;
}
input[type="radio"]:checked + label div{
   
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input[type="number"]{
    
    padding-left: 40px;
}
#number-sign{
    font-size: 20px;
    margin-top: 9px;
    margin-left: 10px;
    position: absolute;
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


.align{
    align-items: center; 
}

#precio-container{
    padding-bottom: 50px;
    border-radius: 10px;
}
.flex{
    display: flex;
}
.column{
    flex-direction: column;
}
.center{
    justify-content: center;
}

.bg{
    transition: 2s;
    background-color: #657786;
    background-color: #243447;
    background-color: #100E17;
    background-color: #2a3141;
    background-color: #3c4f65;
    background-color: #3c4f65;
    background-color: #2a3141;
}

#specific-info{
    
    width: 35%;
    height: auto;
  
}

.btn{
    background-color: #6a7cab ;
    color: white;
    margin: 15px 10px;
    padding: 8px 30px;
    min-width: 110px;
    border: 0;
    outline: 0;
    border-radius: 10px;
}

.red{
    background-color: #e66f66;
}
#proveedor-container{
    
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 200px;;
    
}

#general-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    
   
    width: 60%;
    height: auto;
    padding-bottom: 30px;

    
}

#product-container{
    margin-top: 0px;
    width: 80%;
    color: white;
    display: flex;
    justify-content: space-between;
    
}

.textarea{
    box-sizing: border-box;
    resize:none;
    border-radius: 5px;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0);
    color: #cacaca;
    width: 100%
}

.input-default{
    box-sizing: border-box;
    border: 2px solid #747885;
    width: 100%;
    min-width: ;
    outline: 0;
    border-radius: 10px;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0);
    height: 40px !important;
    color: #cacaca;
}
.inputs-container{
    width: 80%;

}
.white{
    color: white;
}
.input-group{
    margin-top: 40px;
    width: 100%
}
.group-two-container{
    display: flex;
    justify-content: space-between;
}
.group-two{
    width: 47%;
    
}
.input-group-two{
    width: 100%
}



</style>
