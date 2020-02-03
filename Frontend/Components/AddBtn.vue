<template>
        <img id="add" v-on:click="click" src="/img/mas.svg" >
</template>


<style>
    img{
        width: 40px;
        height: 40px;
        cursor: pointer;
        margin-left: 15px;
    }
</style>



<script>
export default {
    methods: {
        click: function(event) {
            this.$emit('add')
        }
    }
}
</script>

