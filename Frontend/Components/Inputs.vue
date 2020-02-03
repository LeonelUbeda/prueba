<template>
    <div class="input-container">
    
            <div id="title">
                <h2>{{ boolDefault ? 'Editar elemento ' + formatearTitulo : 'Agregar elemento a ' + formatearTitulo }}</h2>
            </div>
                <form id="form">
                    <table>
                        <thead>
                            <tr>
                                <th v-if="boolDefault">
                                    ID
                                </th>
                                <th v-for="llave of schemaLlaves" :key="llave">
                                    {{texts[llave].input}}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td v-if="boolDefault">
                                    <input class="input-default" :value="valores.id" disabled />
                                </td>
                                <td v-for="llave of schemaLlaves" :key="llave">
                                    <div class="element-container">
                                        <input class="input-default" v-if="schema[llave].tipo == 'int'" @blur="validarInt(llave)" :class="{'error': errores[llave] != '' }" type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                                        <input class="input-default" v-else-if="schema[llave].tipo == 'moneda'" @blur="validarMoneda(llave)" :class="{'error': errores[llave] != '' }" type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                                        <input class="input-default" v-else-if="schema[llave].tipo == 'date'"  :class="{'error': errores[llave] != '' }" type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                                        <input class="input-default" v-else-if="schema[llave].tipo == 'varchar'"  :class="{'error': errores[llave] != '' }" type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                                        <input class="input-default" v-else-if="schema[llave].tipo == 'boolean'"  :class="{'error': errores[llave] != '' }" type='checkbox' v-model="valores[llave]" />
                                        <span :key="errores[llave]" :class="{ 'hide' : errores[llave] == '', 'error' : errores[llave] != '' }">{{errores[llave]}}</span>
                                     
                                        <SearchBtn id="busqueda" v-if="schema[llave].hasOwnProperty('foranea')"  @search="forSearch(llave)" />
                             
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </form>
                <SearchForeign v-if="forshow" :tabla="this.fortabla" :seccion="this.seccion" @SendForeign="forUpdate" />
                    <div class="btn-container">
                        <button class="btn red" @click="cancel($event)">Cancelar</button>
                        <button class="btn" @click="confirmar($event)">Guardar</button>
                        <button class="btn red" @click="borrar($event)" v-if="boolDefault">Borrar</button>
                    </div>
            
        
    </div>
</template>



<script>

import Swal from 'sweetalert2';
import axios from 'axios'
import SearchBtn from './SearchBtn.vue';
import SearchForeign from './SearchForeign.vue';
import Alertas from '../Utilidades/Alertas'

export default {
    props: {
        schema: Object,
        default: Object,
        texts: Object,
        seccion: String,
        boolDefault: {
            type: Boolean,
            default: false
        }
       
    },
    data: () => {
        return{
            Schema: {},
            valores: {},
            errores: {},
            forkey: '',
            forshow: false,
            fortabla: '',
        }
    },
    components: {
        SearchBtn,
        SearchForeign
    },
    methods: {
        obtenerLlaves () {
             return this.schemaLlaves;
        },
        cancel(e){
            e.preventDefault();
            this.$emit('added', false)
        },
        forSearch(llave) {
            this.forkey = llave;
            this.fortabla = this.schema[llave].foranea;
            this.forshow = true;
        },
        forUpdate(e) {

            this.forshow = false;
            if ( e != -1 ) {
                this.valores[this.forkey] = e;
            }

        },
        borrar(e){
            const req = Object.assign({}, this.valores );
            req.tabla = this.default.tabla;
            Alertas.DeleteElement( `/${this.seccion}/eliminar`, req)
            .then(()=>this.$emit('added', true))
            .catch(() => this.$emit('added', false))
            
        },
        confirmar(e) {
            e.preventDefault();
            let errors = false;
            for( const item in this.errores ) {
                
                if( this.errores[item].length ) errors = true;
            }

            const req = Object.assign({}, this.valores );
                        req.tabla= this.default.tabla;
            const url = this.boolDefault ? `${this.seccion}/editar` : `${this.seccion}/nuevo`;
            
            if (errors) {
                Swal.fire({
                    type: 'error',
                    title: 'Error!',
                    text: '¡Hay campos con valores no válidos!'
                })
            } 
            else {
                Swal.fire({
                    title: '¿Está seguro?',
                    text: "¿Desea ingresar los datos?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true,
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        return axios({
                                method: 'post',
                                url: url,
                                headers: {}, 
                                data: {
                                    query: req, 
                                }
                            })
                        .then(response => {
                            if (response.status !== 200) {
                                throw new Error(response.statusText)
                            }
                            return true;
                        })
                        .catch(error => {
                            Swal.showValidationMessage(
                            `Ocurrió un problema. Verifique sus datos e inténtelo más tarde`
                            )
                            return false;
                        })  
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {

                    if (result.value) {
                        Swal.fire(
                        '¡Éxito!',
                        `Se ${ this.boolDefault ? 'editó' : 'añadió'} exitosamente.`,
                        'success'
                        )
                        .then(()=>this.$emit('added', true));
                        
                    }
                })
                
            }
        },
        validarInt(llave) {
            const val = this.valores[llave];
            if( isNaN(val) ) {
                
                this.errores[llave] = 'No es un número válido ';
                this.$forceUpdate();
            }
            else if ( val < 0 ) {
                this.errores[llave] = 'No puede ser negativo';
                this.$forceUpdate();
            }
            else {
                const string = val.toString(),
                    regExp = new RegExp(`^\\d*$`);
            
            
                if ( !string.match(regExp) ){
                    this.errores[llave] = 'No es un entero';
                    this.$forceUpdate();
                }
                else {
                    this.errores[llave] = '';
                    this.$forceUpdate();
                }
            }
        },
        validarMoneda(llave) {
            const val = this.valores[llave];

            if( isNaN(val) ) {
                this.errores[llave] = 'No es un número valido ';
                this.$forceUpdate();
            }
            else if ( val < 0 ) {
                this.errores[llave] = 'No puede ser negativo';
                this.$forceUpdate();
            }
            else {
                const string = val.toString(),
                    regExp = new RegExp(`^\\d*(\\.\\d{1,2})?$`);
            
            
                if ( !string.match(regExp) ){
                    this.errores[llave] =  `No es un monto válido, 2 decimales máx.`;
                    this.$forceUpdate();

                }
                else {
                    this.errores[llave] = '';
                    this.$forceUpdate();
                }
            }
        }
    },
    computed: {
        formatearTitulo () {
            return this.default.tabla.toLowerCase()
            .split('_')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        
        },
        schemaLlaves() {

            const llaves = Object.keys( this.schema );

            return llaves.filter( llave => llave !=='id' && llave !== this.schema.id );
        },

    },
    created() {
        const llaves = this.obtenerLlaves();
        console.log(this.texts)

        for( let llave of llaves ) {
            this.boolDefault ? this.valores[llave] = this.default.elemento[llave] : this.valores[llave] = '';
            this.errores[llave] = '';
        }
        if (this.boolDefault) this.valores.id = this.default.elemento.id; 
        
    }
}

</script>


<style scoped>
#busqueda{
    position: absolute;
    height: 20px;
    width: 20px;
    margin-top: 8px;
    margin-left: 70px ;
}

.element-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
    box-sizing: border-box;

}

.btn-container{
    justify-content: center;
    display: flex;
    margin-bottom: 5px;
}

.input-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #2a3141;
    margin-bottom: 15px;
}

h2{
    color: white;
    margin: 0
}
#title{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    background-color: #4b5976;
}
h3{
    margin-top: 0;
    margin-bottom: 10px;
    margin-left: 10px;
}
#form-container{
    width: 500px;
}
.blocked {
    cursor:not-allowed
}

.input-default{
    border: 2px solid #555861;
    width: 100%;
    outline: 0;
    border-radius: 15px;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0);
    height: 30px !important;
    color: #cacaca;
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

form{
    display: flex;
    align-items: center;
}
table{
    -webkit-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    border-collapse: collapse;
    width: 90%;
}
table td, table th {
    height: 30px;
    padding: 0 20px;
    text-align: start;
}


table th{

    color:#dedfe0;
}
td{
    background-color: #2a3141;
    color:#dedfe0;
    font-weight: 300 !important;
    border-left: 0;
    border-right: 0;

}

input.error {
    border-color: red;
}

span.error {
    color: red;
}

div{
    width: 100%;
}
</style>

