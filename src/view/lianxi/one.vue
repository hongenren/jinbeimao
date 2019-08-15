<template>
<div>
<div>
<button @click="onAdd">添加</button>
</div>
<div v-for="(item,i) of items" :key="i">
xiala{{i}} <input type="text" v-model="items[i]"><span @click="del(i)">删除</span>
</div>

{{this.items}}
</div>
</template>

<script>
export default {
data() {
return {
items: []
}
},
methods: {
onAdd() {
this.items.push('')
},
del (i) {
this.items.splice(i,1)
}
}
}
</script>