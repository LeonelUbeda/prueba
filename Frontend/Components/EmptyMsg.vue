<template>
    <div class="mensaje">
        {{titulo}}
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            titulo: 'No se ha encontrado ningun elemento'
        }
    }
}
</script>



<style scoped>
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        background-color:  rgb(230, 111, 102);
    }
</style>

