<template>
    <div class="form-add">
        <div class="form-title-add">
            <h3>Añadir Subcategoria</h3>
        </div>
        <div class="form-container">
            <form id="formulario-subcategoria" action="/clasificacion/subcategoria" method="POST">
                <input type="text" class="hidden-input" name="seccion" value="subcategoria">
                <div class="group-input-one">
                    <p>Nombre</p>
                    <input type="text" class="input-default border-color" name="nombre">
                </div>
                <div class="group-input-one">
                    <p>ID Categoria</p>
                    <input type="text" class="input-default border-color" name="categoria">
                </div>
                <div class="group-input-button">
                    <input type="submit" class="input-submit enviar-btn">
                    <input type="submit" class="input-submit cancelar-btn"  value="Cancelar">
                </div>
            </form>
        </div>
    </div> 

</template>

<script>
export default {
    
}
</script>


<style scoped>
.group-input-one{
    padding: 5px 30px;
}
.group-input-one p{
    padding-left: 10px;
}
.form-add p{ margin:0 ; padding: 10px 0 10px 0; color: white;}
#main-add, #main-delete{ width: 90%}
.form-add{background-color: #2a3141; width: 100%}
.form-add form{
    padding: 10px 0;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.form-add form > div{
    width: 100%;
}

.input-default{
    width: 70%;
    outline: 0;
    margin-right: 20px;
    margin-left: 0;
    border-radius: 30px;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0);
    height: 30px !important;
    color: #cacaca;
}

</style>
