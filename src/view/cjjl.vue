<template>
    <div class="cjjl">
        <h1>出借记录</h1>

    </div>
    <div>
        你是黑奥拉夫焦磷酸钠个拉萨改变吗， 水电费来看你，是的佛您好地方，三经官动府
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
