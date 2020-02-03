<template>
<div id="container-pe">
    <div id="title">
        <h2 class="white">{{action == 'editar' ? `Editar Elemento `: 'Añadir Elemento'}}</h2>
    </div>
    <div id="title-btn">
        <button @click="out" class="btn">Salir</button>
        
        <button class="btn red" v-if="action == 'editar' && this.$store.state.Permissions.productos > 4"  @click="deleteElement"> Borrar </button>
    </div>
    <div id="product-container">
        <div id="general-info" class="bg">
            <div class="titulo-container">
                <h4> Detalles generales</h4>
            </div>
            <div class="inputs-container">
                <div class="input-group">
                    <label for="nombre">*Nombre del producto</label>
                    <input id="nombre" type="text" class="input-default" v-model="nombre" required>
                    
                </div>
                <div class="group-two-container input-group">
                    <div class="group-two">
                        <label for="nombre">*Marca</label>
                        <SearchForeingInput v-model="marca" :tabla="'marca'" :seccion="'clasificacion'"></SearchForeingInput>
                    </div>
                    <div class="group-two">
                        <label for="nombre">*Subcategoria</label>
                        <!--SearchForeign :tabla="'categoria'" :seccion="'clasificacion'" > </SearchForeign-->
                        <SearchForeingInput v-model="subcategoria" :tabla="'subcategoria'" :seccion="'clasificacion'"></SearchForeingInput>
                        <!--input type="text" v-model="subcategoria" class="input-default input-group-two"-->
                    </div>
                </div>
                <div class="group-two-container input-group">
                    <div class="group-two">
                    <label for="nombre"><h3>Perecedero?</h3></label>
                    <ToggleBtn v-model="perecedero" :labels="{checked: 'Si', unchecked: 'No'}" :width="90" :height="30" :font-size="15"></ToggleBtn>
                    
                    </div>
                    <div class="group-two" v-show="perecedero">
                        <label for="nombre"><h3>Avisar Dias antes del vencimiento</h3></label>
                        <IntInput v-model="minimoDia"></IntInput>      
                    </div>
                </div>
                <div class="input-group">
                    <label for="nombre">Descripción del producto</label>
                    <textarea class="textarea" v-model="descripcion" id="text-area" name=""  cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>
        <div id="specific-info">
            <div id="precio-container" class="bg flex column align">
                <div class="titulo-container">
                    <h4>Información de precio</h4>
                </div>
                <div class="inputs-container">
                    <div class="input-group">
                        <label for="nombre"><h3>*Margen de ganancia</h3></label>
                        <!--span id="number-sign">C$</span-->
                        <PercentInput v-model="margen" :maxlength="6"></PercentInput>      
                    </div>
                    <div class="input-group">
                        <label for="nombre"><h3>Impuesto</h3></label>
                        <PercentInput v-model="impuesto" :maxlength="6"> </PercentInput>
                    </div>
                    
                </div>
            </div>
            <div id="vigilar" class="bg flex column align padding-abajo">
                <div class="titulo-container">
                    <h4>Notificaciones</h4>
                </div>
                <div class="inputs-container">
                    <div class="input-group">
                        <label for="nombre"><h3>Vigilar este producto?</h3></label>
                        <ToggleBtn v-model="vigilar" :labels="{checked: 'Si', unchecked: 'No'}" :width="90" :height="30" :font-size="15"></ToggleBtn>
                    </div>
                    <div class="input-group" v-show="vigilar == true">
                        <label for="nombre"><h3>Minimo en stock para alertar</h3></label> 
                        <IntInput v-model="minimoStock"></IntInput>     
                    </div>
                    
                </div>
            </div>
        
        </div>
    </div>
    <div class="flex">
    <button @click="send" class="btn">Guardar</button>
    

    </div>
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
            minimoStock: '0',
            minimoDia: '0',
            nombre: '',
            descripcion: '',
            marca: '',
            impuesto: 0, 
            subcategoria: '',
            margen: 0,
            vigilar: false,
            perecedero: false,
            sku: '',
            diasAntesVencimiento: 0,
        }
    },
    components: {
        IntInput,
        ToggleBtn,
        CurrencyInput,
        PercentInput,
        SearchForeign,
        Dropdown,
        SearchForeingInput
    }, methods: {
        out: function(){
            this.$emit('added', false)
        },
        send: function(){
            const sendInfo = {
                nombre:         this.nombre,
                descripcion:    this.descripcion,
                marca:          this.marca,
                subcategoria:   this.subcategoria,
                impuesto:       this.impuesto,
                margen:         this.margen,
                vigilar:        this.vigilar,
                minimoStock:    this.minimoStock,
                perecedero:     this.perecedero,
                sku:            this.sku,
                dias_antes_vencimiento: this.minimoDia
                

            }
            console.log(sendInfo);
            
            if(
                // Validaciones de los inputs
                (this.vigilar === true && this.minimoStock == '') ||
                (this.nombre === '')                              ||
                (!typeof this.marca == 'number')                  ||
                (this.marca == '')                                ||
                (this.subcategoria == '')                           
                ){
                Alertas.ErrorMsg()
                return null
            }
            let url = this.action == 'anadir' ?  '/productos/nuevo' :  '/productos/editar';
            
            Alertas.ToSend( url , sendInfo)
            .then(() => this.$emit('added' , true))
            
            
            //axios.post(`/productos/nuevo`, sendInfo)
            //.then(console.log('ENVIADO'))
        },
        editar: function(){
            if(this.action == 'editar'){
                let {ID_marca, ID_subcategoria, descripcion, nombre,margen_ganancia, porcentaje_impuestos, sku, vigilar, dias_antes_vencimiento, minimo_stock, perecedero } = this.edit.elemento;
                this.nombre =       nombre;
                this.descripcion =  descripcion;
                this.marca =        ID_marca.toString();
                this.subcategoria = ID_subcategoria.toString();
                this.impuesto =     porcentaje_impuestos;
                this.margen =       margen_ganancia;
                this.vigilar =      vigilar === 1? true : false;
                this.minimoStock =  minimo_stock.toString();
                this.minimoDia =    dias_antes_vencimiento.toString();
                this.sku =          sku;
                this.perecedero =   perecedero === 1? true : false
            }else{
                console.log('nel')
            }
        },
        deleteElement: function(){
            let sku = this.sku;
            
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
