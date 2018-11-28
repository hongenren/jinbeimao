/** 
 * 用途:公共静态方法，公共静态变量
 * 日期：2018/5/16
 * @import common/bsteel.common.js  
 */
M.define('static',{
	_id:function(id){
		return document.getElementById(id);
	},
	_class:function(name){
		return document.getElementsByClassName(name);
	},
	_object:function(element){
		return element;
	},
	data:{
		//公共自定义正则 
		FORM_VALID_REGEXP:{
			_number:/\d+/g,
			_letter:/^[a-z]+$/g
		}
	},
	init:function(ops){
		this.node=this.node||{};
		this.ops=M.extend(this.ops,ops);
		return this;
	},
	reduce:function(){
			
	},
	add:function(arr,fn,context){
		for(var i=0;i<arr.length;i++){
			if(this.node[arr[i].name]){
				delete this.node[arr[i].name];
			};
			this.node[arr[i].name]=M(this['_'+arr[i].type](arr[i].value));
			if(arr[i].event){
				if(this.node[arr[i].name]._callback){
					delete this.node[arr[i].name]._callback;
				};
				this.node[arr[i].name]._callback=M.isArray(arr[i].event)?arr[i].event:[arr[i].event];
				this.addEvent(this.node[arr[i].name]);	
			};
		};
		fn&&fn.call(context||this);
	},
	addEvent:function(element,type,fn,args){
		if(element._callback){
			for(var i=0;i<element._callback.length;i++){
				if(M.isFunction(element._callback[i].callback)){
					if(type){
						if(type==element._callback[i].type){
							this.setEvent(element,element._callback[i].type,fn||element._callback[i].callback,args||element._callback[i].args);
							return;
						};
					}else{
						this.setEvent(element,element._callback[i].type,element._callback[i].callback,element._callback[i].args);
					};
				};
			};
		}else{
			if(type&&fn){
				element._callback=element._callback||[];	
				element._callback.push({
					type:type,
					args:args,
					callback:fn	
				});
				var i=element._callback.length-1;
				this.setEvent(element,element._callback[i].type,element._callback[i].callback,element._callback[i].args);
			};	
		};	
	},
	setEvent:function(element,type,callback,args){
		element.bind(type,function(e){
			this._e=e;
			callback.apply(this,args);
		});	
	},
	unbind:function(element,type,fn){
		if(element._callback&&element._callback.length){
			for(var i=0;i<element._callback.length;i++){
				if(M.isFunction(element._callback[i].callback)){
					if(type){
						if(type==element._callback[i].type){
							element.unbind(element._callback[i].type);
							fn&&fn.call(this,element);
							return;	
						};
					}else{
						element.unbind(element._callback[i].type);
					};
				};
			};
		};
		fn&&fn.call(this,element);
	},
	bind:function(element,type,callback,args){
		this.unbind(element,type,function(element){
			this.addEvent(element,type,callback,args);	
		});
	},
	exec:function(ops){
		return M.extend(true,{
			url:null,
			data:{},
			type:'post',
			isLoad:true,
			content:null,  //isLoad为true时,装loading框的盒子
			left:0,
			top:0,
			dataType:'json',
			timeout:1000,
			jsonpCallback:null,
			loading:this.renderLoad(),
			error:{
				html:null,  //具体错误信息  可选
				el_content:null,  //渲染错误信息显示 jQuery dom  必填
				key:null,  //更改错误状态显示key名  可选
				el_reload_id:null  //错误期间重新加载按钮 dom-id  可选
			},
			beforeSend:function(){},
			success:function(data){},
			fail:function(msg){}
		},ops);
	},
	resolve:function(ops,key){
		ops=this.exec(ops);
		M.ui.ajax.init({
			url:ops.url, 
			data:ops.data,
			type:ops.type,
			isload:false,
			dataType:ops.dataType,
			timeout:ops.timeout,
			context:ops.context,
			jsonpCallback:ops.jsonpCallback,
			beforeSend:function(){
				ops.status=true;
				if(ops.isLoad){
					M.delay(300,function(){
						if(ops.status){
							ops.waiting=M.ui.waiting.creat({warp:ops.content,offsetLeft:ops.left,offsetTop:ops.top});	
						};
					},this);
				};
				ops.beforeSend&&ops.beforeSend.call(ops.context||this);
			},
			success:function(data){
				ops.status=false;
				if(ops.waiting){
					M.ui.waiting.dismiss(ops.waiting);
					delete ops.waiting;
				};
				M.isFunction(ops.success)&&ops.success.call(ops.context||this,data);	
				/*if(ops.dataType.match(/text|html/g)){
					M.isFunction(ops.success)&&ops.success.call(ops.context||this,data);	
				}else{
					if(data.state!=undefined){
						if(data.state==1){
							if(key){
								if(data.returnData){
									if(data.returnData[key]&&M.isArray(data.returnData[key])&&data.returnData[key].length){
										M.isFunction(ops.success)&&ops.success.call(ops.context||this,data.returnData||data);
									}else{
										this.toFail(this,ops,'没有数据',null,key);
									};
								}else{
									M.isFunction(ops.success)&&ops.success.call(ops.context||this,data.returnData||data);
								};
							}else{
								M.isFunction(ops.success)&&ops.success.call(ops.context||this,data.returnData||data);	
							};
						}else{
							if(data.state==999201){//未登录
								M.goLogin(1);//弹出登录-跳转登录页面
							}else{
								this.toFail(this,ops,data.msg,1,key);
							};
						};
					}else{
						M.isFunction(ops.success)&&ops.success.call(ops.context||this,data);	
					};
				};*/
			},
			error:function(msg){
				ops.status=false;
				this.toFail(this,ops,msg,1,key);
			}
		},this);		
	},
	toFail:function(that,ops,msg,type,key){
		if(ops.waiting){
			M.ui.waiting.dismiss(ops.waiting);
			delete ops.waiting;
		};
		if(!!!ops.error.el_content){
			M.ui.waiting.creat({status:false,text:msg,time:500,offsetLeft:ops.left||0,offsetTop:ops.top||0,warp:ops.content});		
		}else{
			if(ops.error.html){
				ops.error._html=ops.error.html;	
				if(ops.error.key){
					ops.error.html=M.template.resolve(ops.error._html,M.creatObj(ops.error.key,msg));
				};
			};
			ops.error.el_content.html(ops.error.html||that.renderNull(msg,type));
			(that._id(ops.error.el_reload_id)?M(that._id(ops.error.el_reload_id)):ops.error.el_content.find('a._reload')).click(function(){
				ops.error.el_content.html(ops.loading);
				that.resolve(ops,key);
			});	
		};
		M.isFunction(ops.fail)&&ops.fail.call(ops.context||that,msg);	
	},
	error:function(msg){
		throw new Error(msg);		
	},
	renderLoad:function(){
		return M.creatNodeHTML('span',{
			'class':'mt-master-loading',
			html:'加载中'
		});
	},
	renderNull:function(msg,state){
		return '<div class="mt-master-error">\
			<img src="'+M.getNormalPath("base/dialog_error.png",null,1)+'" class="mt-master-show" />\
			<p>'+msg+(!!state?'，<a href="javascript:;" class="_reload">点击重新加载</a>':'')+'</p>\
		</div>';	
	}
});