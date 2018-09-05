<template>
    <div class="row">
        <div id="home" class="col-sm-12 text-center">
            <div class="background">
                <h1>欢迎大家品尝💕</h1>
                <h2>这里有你非常喜欢的Pizza🍕🍕🍕</h2>
                <button @click="goToMenu" class="btn btn-success">Let's Order!</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            goToMenu(){
                this.$router.push({name:'menuLink'})
            }
        }
    }
</script>
<style>
    #home{
        background: url(../../src/assets/home.jpg);
        height: 110vh;
        padding: 10%;
    }
    h1,h2{
        margin: 6%;
    }
    button{
        background-color: green;
    }
    .background{
        background:#eee;
        opacity: 0.7;
        max-width: 70vw;
        margin: 0 auto;
        padding: 20px 0;
    }
</style>

