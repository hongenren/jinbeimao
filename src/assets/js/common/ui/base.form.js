/** 
 * 用途:表单数据
 * 作者:谢力 QQ：843926058
 * 日期：2016/11/09
 * @import common/fx.common.js  common/bsteel.base.js  common/bsteel.validate.js  
 *
 * @blur		                boolean             (可选)是否失去焦点验证格式							默认 false
 * @content		               	object              (必须)表单外壳对象			     					默认 null
 * @define		               	object              (可选)自定义正则别名集合			     				默认 null
 * @blur		               	boolean             (可选)是否启动失去焦点验证			     			默认 false
 * --@render     	  		  						
 * --''enabled''     	  	    boolean      		(可选)是否需要先渲染表单数据							默认 false   
 * --''data''     	  	        object      		(可选)渲染数据对象									默认 null   
 * --''content''		        object              (可选)渲染数据和盒子			     				默认 null
 * @callback               		function            (可选)初始化完成回调
 * @error               		function            (可选)当验证格式失败回调
 */
;(function(M,window){
	M.ui.define('form',function(){
		function Form(ops,args){
			this.ops=ops;
			this.args=args;
			this.init();
		};
		Form.prototype={
			constructor:Form,
			init:function(){
				if(!this.ops.content.length) return;
				this.regexp=M.extend(M.ui.validate.init().regexp(),{IDcard:true,card:true,again:true});
				this.form=this.formToObject(this.ops.content);
				this.data=this.fetchData(this.ops.render.data||{});
				if(this.ops.render.enabled){
					this.ops.render.content[0].innerHTML=M.template.resolve(this.ops.render.content[0].innerHTML,this.data);
					this.form=this.formToObject(this.ops.content);
				};
				this.ops.blur&&this.addValid();
				M.isFunction(this.ops.callback)&&this.ops.callback.apply(this,this.args);
				return this;
			},
			formToObject:function(content){
				for(var i=0,o={},form=content.find('input,textarea,select');i<form.length;i++){
					if(form[i].name){
						if(o[form[i].name]){
							if(!M.isArray(o[form[i].name].list)){
								o[form[i].name]={
									name:o[form[i].name].getAttribute('_list'),
									nodeName:o[form[i].name].nodeName.toLowerCase(),
									type:o[form[i].name].type,
									list:[o[form[i].name]]
								};
							};
							o[form[i].name].list.push(form[i]);
						}else{
							if(form[i].nodeName.toLowerCase().match(/^select$/g)){
								o[form[i].name]={
									name:form[i].getAttribute('_list'),	
									nodeName:form[i].nodeName.toLowerCase(),
									list:form[i],
									type:'select'
								};	
							}else{
								o[form[i].name]=form[i];		
							};	
						};
					};
				};
				return o;
			},
			addValid:function(){
				for(var name in this.form){	
					if(!/^(file|hidden|radio|checkbox|select)$/g.test(this.form[name].type)){
						M(M.isPlainObject(this.form[name])?this.form[name].list:this.form[name]).bind('blur',{context:this},this.fetchBlur);	
					};
				};
			},
			fetchBlur:function(e){
				var that=e.data.context;
				if(!!!this.getAttribute('readonly')){
					//this.value.length?that.fetchValid(this):that.setState(this,2);	
					that.fetchValid(this);
				};
			},
			fetchValidList:function(fn,context){
				for(var name in this.form){
					if(!this.form[name].list&&!this.fetchValid(this.form[name])){
						M('html').animate({scrollTop:130},300,'swing');
						return false;
					};
				};
				//this.data=this.refreshData();
				fn&&fn.apply(context||this,[].slice.call(arguments,2));
				return true;
			},
			showError:function(msg){
				M.ui.waiting.creat({status:false,text:msg,warp:this.ops.content,time:500});	
			},
			setState:function(element,state){
				var target=M(element),box=target.parents().eq(1),name={
					0:['true','error'],
					1:['error','true'],
					2:['error','true']
				}[state];
				if(state==2){
					target.removeClass(name[0]).removeClass(name[1]);
				}else{
					target.removeClass(name[0]).addClass(name[1]);	
				};
			},
			fetchValid:function(element){
				var that=this,reg=element.getAttribute('valtype'),minLength=element.getAttribute('minlength'),maxLength=element.getAttribute('maxlength'),
					error=element.getAttribute('error'),length=element.getAttribute('length'),define=element.getAttribute('define'),
					decimal=element.getAttribute('decimal'),unMust=/true/g.test(element.getAttribute('unMust'));
				if((unMust&&element.value.length)||!unMust){
					if(reg&&!this.durRegExp(this.regexp,reg.split('|'))&&M.isRegExp(new RegExp(reg,'g'))){
						if(!element.value.match(new RegExp(reg,'g'))){
							this.setState(element,0);
							//this.showError(error);
							M.isFunction(this.ops.error)&&this.ops.error.apply(element,[error].concat(this.args));
							return false;
						};	
					};
					if(define&&(define=define.split('|'))&&this.ops.define){
						for(var i=0,state=0;i<define.length;i++){
							if(this.ops.define[define[i]]){
								if(element.value.match(this.ops.define[define[i]])){
									state=1;
									break;
								};	
							};	
						};
						if(!state){
							this.setState(element,0);
							//this.showError(error);
							M.isFunction(this.ops.error)&&this.ops.error.apply(element,[error].concat(this.args));
							return false;
						};
					}else if(reg){
						if(!M.ui.validate.init({
							container:element,
							type:reg,
							number:decimal,
							error:function(msg){
								that.setState(element,0);
								//that.showError(msg);
								M.isFunction(that.ops.error)&&that.ops.error.apply(element,[msg].concat(that.args));
							}
						}).status){
							return false;
						};	
					};
					if(length){
						if(element.value.length!=Number(length)){
							this.setState(element,0);
							//this.showError(error);
							M.isFunction(this.ops.error)&&this.ops.error.apply(element,['必须'+length+'位长度'].concat(this.args));
							return false;
						};
					}else{
						if(minLength&&element.value.length<Number(minLength)){
							this.setState(element,0);
							//this.showError(error);
							M.isFunction(this.ops.error)&&this.ops.error.apply(element,['小于最小'+minLength+'位长度'].concat(this.args));
							return false;
						};
						if(maxLength&&element.value.length>Number(maxLength)){
							this.setState(element,0);
							//this.showError(error);
							M.isFunction(this.ops.error)&&this.ops.error.apply(element,['大于最大'+error+'位长度'].concat(this.args));
							return false;
						};
					};
				};	
				this.setState(element,1);
				M.isFunction(this.ops.success)&&this.ops.success.apply(element,this.args);	
				return true;
			},
			durRegExp:function(obj,list){
				for(var i=0;i<list.length;i++){
					if(obj[list[i]]){
						return true;
					};
				};
				return false;
			},
			fetchData:function(data){
				for(var name in this.form){
					if(data[name]!=undefined){
						var nodeName=this.form[name].nodeName.toLowerCase(),type=this.form[name].type,_name=this.form[name].name;
						if(data[_name]!=undefined){
							if(/^(radio|checkbox)$/g.test(type)){
								data[_name]=M.isArray(data[_name])?data[_name]:data[_name].split(',');
								for(var i=0;i<this.form[name].list.length;i++){
									this.form[name].list[i].value=data[_name][i];
									data[name]=M.isArray(data[name])?data[name]:data[name].split(',');
									for(var j=0;j<data[name].length;j++){
										if(data[_name][i].toString()==data[name][j].toString()){
											this.form[name].list[i].setAttribute('checked','checked');
											break;
										};
									};
								};	
							}else if(nodeName.match(/^select$/g)){
								for(var i=0,str='',tmp=this.renderOption();i<data[_name].length;i++){
									for(var j in data[_name][i]){
										str+=M.template.resolve(tmp,{
											name:j,
											value:data[_name][i][j]	
										});	
									};
								};
								this.form[name].list.innerHTML=str;	
								for(var i=0;i<this.form[name].list.length;i++){
									if(this.form[name].list[i].value==data[name]){
										this.form[name].list[i].setAttribute('selected','selected');
									};	
								};
							};	
						}else{
							this.form[name].value=data[name];	
						};
					}else{
						data[name]='';	
					};
				};
				return data;
			},
			refreshData:function(){
				for(var name in this.form){
					if(M.isPlainObject(this.form[name])){
						if(this.form[name].list){
							for(var i=0,arr=[];i<this.form[name].list.length;i++){
								if(/^(radio|checkbox|select)$/.test(this.form[name].type)){
									if(this.form[name].list[i].checked||this.form[name].list[i].selected){
										arr.push(this.form[name].list[i].value);
									};
								}else{
									arr.push(this.form[name].list[i].value);
								};
							};
							this.data[name]=arr.join(',');
						};
					}else{
						this.data[name]=this.form[name].value;	
					};
				};	
				return this.data;
			},
			renderOption:function(){
				return '<option value="{{value}}">{{name}}</option>';
			},
			destroy:function(){
				delete this;	
			}	
		};
		return {
			defaults:{
				content:null,
				blur:false,
				render:{
					enabled:false,
					content:null,
					data:null	
				},
				define:null,
				callback:function(){},
				success:function(){},
				error:function(){}
			},	
			init:function(ops){
				return new Form(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);