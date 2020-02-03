
<template>
    <input class="input-default" :class="[{'error-input': this.error  }, {'green' : displayValue.length >= 1 && !this.error}]" type='text' v-model="displayValue" :maxlength="longitud"/>
   </template>


<script>
/*
    <search-foreign-input 
    v-model="xd" el v-model
    buscarPor="id" el campo que va usarse para la busqueda
    identificador="nombre" el id de la tabla
    tabla="subcategoria"  nombre de la tabla
    seccion="clasificacion"  la secccion de donde va a salir la tabla
    :orden="subcategoriaOrden" el orden de los campos
    :texts="subcategoriaTexts" los textos de la tabla
    />

*/

export default {
    props: {
        value: String,
        longitud: {
            type: Number,
            default: 40
        }
    },
    
    data: function() {
        return {
            error: false,
        }
    },
    methods: {
        validate() {
            if( isNaN(this.value) ) {
                this.$emit('error', 'No es un número válido ' );
                this.error = true;
            }
            else if ( this.value < 0 ) {
                this.$emit('error',  'No puede ser negativo');
                 this.error = true;
            }
            else {
                  const  regExp = new RegExp(`^\\d*$`);
            
            
                if ( !this.value.match(regExp) ){
                    this.$emit('error', 'No es un entero');
                    this.error = true;
                }
                else {
                    this.$emit('error', '');
                    this.error = false;
                }
            }
        }
    },
    computed: {
        displayValue: {
            get: function() {
               this.validate();
                return this.value;
                
            },
            set: function(modifiedValue) {
                
                this.validate();
                
                this.$emit('input', modifiedValue)
            }
        }
    }
}
</script>


<style scoped>

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
.error-input {
    border:red 2px solid !important;
}

.green{
    border: #48B77F 2px solid !important
}
</style>
