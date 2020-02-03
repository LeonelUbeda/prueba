<template>
        <img id="add" v-on:click="click" src="/img/buscar.svg" >
</template>


<style>
    img{
        width: 15px;
        height: 15px;
        cursor: pointer;
        margin-left: 15px;
        fill: rgb(209, 209, 209);
    }
</style>



<script>
export default {
    methods: {
        click: function(event) {
            this.$emit('search')
        }
    }
}
</script>

