


<template>

    <div id="container">
        <div id="sidebar" v-show="this.$store.state.IsLogged">
            <Sidebar></Sidebar> 
        </div>
        <div id="content">
            <transition name="slide-fade">
            <router-view></router-view>
            </transition>
        </div>


    </div>
    
</template>


<script>


import Sidebar from './Components/Layout/Sidebar.vue'

export default {
    
    data: () => {
        return {
        }
    },
    components: {
        Sidebar
    }

}

</script>


<style scoped>

    #container{
        overflow-x: hidden ;
        display: flex;
        width: 100%;
        font-family: 'Raleway', sans-serif;
    }
    #content{
        width: calc(100% - 190px);
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: #232730;
        
    }
    #sidebar{
        background-color: #4a5864;
        
        width: 190px;
  
        height: 100%;
        
        background-color: #4a5864;
    }
</style>
