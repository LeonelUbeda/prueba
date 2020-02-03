<template>
    <input type="text" id="busqueda-dinamica" v-on:keyup.enter="enviar" class="bg-dark border-color" placeholder="Buscar..." v-model="busqueda"> 
</template>



<script>
export default {
    data: () => {
        return{
            busqueda: ''
        }
    },
    methods: {
        enviar: function(event) {
            this.$emit('SendSearchData', this.busqueda)
        }
    }
}
</script>



<style scoped>

input{
    outline: 0;
    width: 100%;
    height:30px;
    color: white;
    border: 2px solid #555861;
    background-color: #232730;
    border-radius: 30px;
    padding-left: 20px;
}
input::placeholder{
    color: #4b5976;
    color: #66789e;
   
}

</style>

