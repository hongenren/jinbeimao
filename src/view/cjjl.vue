<template>
    <div class="cjjl">
        <h1>出借记录</h1>

    </div>
</template>

<script>
export default {
    name:'cjjl',
    data(){
        return{

        }
    },
     mounted(){

        var _this=this
        console.log(this.$route.params.id)
        axios('http://localhost:3000/goumai',{
            method:'get',
            headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
					    }
        }).then(function(data){
                console.log((data.data)[0])
                var data=(data.data)[0]
                _this.detail=data
            })

    }

}
</script>

<style scoped="">

</style>
