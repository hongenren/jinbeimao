
var con = Vue.component('motaikuang',{
	template:`
			<div id="out" v-if="isa">
				<h1>{{tit}}</h1>		
			</div>
	`,
	data:function(){
		return{	
		tit:'登录成功',
		isa:true,
		shijian:2000
	}
	}
})

function motai(){
	let diaoyong=new con({
		el:document.createElement("div"),
	
	})
	document.body.appendChild(diaoyong.$el)
	setTimeout(function(){
		diaoyong.isa=false
	},diaoyong.shijian)
	
	
	
}