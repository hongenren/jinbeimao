/** 
 * 用途:带自动检索下拉控件
 * 日期：2018/5/16 小马
 * @import common/fx.common.js   common/ui/fx.scroll.js    
 *
 * @target		               	object              (必须)事件源			     						默认 null
 * @tip		               		boolean             (可选)是否展示右边标记			     				默认 false
 * @isClick		               	boolean             (可选)是否点击即触发			     				默认 false
 * @data                  		object              (可选)已知数据     								默认 null 
 * @param                  		object              (可选)ajax请求参数     							默认 null 
 * @url                    		string              (可选)Ajax请求地址     							默认 null
 * @callback               		function            (可选)选择成功完成回调
 */
;(function(M,window){
	M.ui.define('fuzzyQuery',function(){
		function FuzzyQuery(ops,args){
			this.ops=ops;
			this.init(args);
		};
		FuzzyQuery.prototype={
			constructor:FuzzyQuery,
			init:function(args){
				if(!this.ops.target.length) return;
				this.targetElement=this.ops.target;
				delete this.ops.target;
				this.targetElement.bind('click',function(){
					if(this.search){
						this.search.show();
						if(this.boxul){
							this.boxul.hide();
						}
					}else{
						this.exec(args);
					}
					return false;
				}.bind(this));
			},
			select:function(e){
				var that=e.data.context,args=e.data.args;
				that.name=this.innerHTML.replace(/\<(.*)\>/g,'');
				that.value=this.getAttribute('uid');
				that.change();
				that.hide();
				M.isFunction(that.ops.callback)&&that.ops.callback.apply(that,args);
			},
			change:function(){
				this.targetElement.text(this.name);
				this.hiddenInput.val(this.value);
				this.searchInput.val(this.name)
			},
			exec: function(args){
				this.search =this.creatSearch();
				this.inputBox = this.creatInputBox(); 
				this.searchInput = this.creatInput();
				this.hiddenInput = this.creatHiddenInput();
				
				this.allInput = this.searchInput.after(this.hiddenInput)
				this.search.append(this.inputBox.append(this.allInput));
				this.targetElement.after(this.search)
				this.addEvent(args);
				M(document).bind('click',{context:this},this.hide);
			},
			creat: function(e){
				var that = e.data.context,args = e.data.args;
				if(that.searchInput[0].value.length>=0){
					if(that.boxul){
						that.boxul.show();
						that.getList(args);
					}else{
						that.creatList();
					};
				}else{
					that.hide();
				};
				return false;
			},
			getList: function(args){
				this.get(function(data){
					this.loading.hide();
					this.empty.hide();
					if(data.length){
						this.resolve(data,args);
					}else{
						this.ul[0].innerHTML='';
						this.empty.show().html(this.setNull(this.searchInput[0].value,1));
					};
				});
			},
			creatList: function(){
				this.boxul = this.creatBoxul();
				this.loading=this.creatLoad();
				this.ul = this.creatUl();
				this.empty=this.creatNull();
				this.search.append(this.boxul.append(this.ul).append(this.loading)).append(this.empty)
				this.getList();
			},
			resolve:function(data,args){
				for(var i=0,str='';i<data.length;i++){
					str+=M.template.resolve(this.ops.tip?this.renderItemTip():this.renderItem(),{name:data[i].n,value:data[i].c,tip:data[i].s});
				};
				this.ul[0].innerHTML=str;
				if(!this.scroll){
					this.scroll=M.ui.scroll.init({
						scrollbar:{
							place:true,
							style:{
								marginLeft:0,
								marginRight:0,
								marginTop:0,
								marginBottom:0,
								size:3
							}	
						},
						container:this.boxul
					});
				}else{
					this.scroll.refresh();	
					this.scroll.scrollTop();
				};
				this.addEventLi(args);
			},
			addEvent:function(args){
				this.searchInput.bind('click',{context:this,args:args},this.creat);
				this.searchInput.bind('keyup',{context:this,args:args},this.creat);
			},
			addEventLi: function(args){
				this.ul.children().bind('click',{context:this,args:args},this.select);
			},
			renderItem:function(){
				return '<li class="{{className}}" uid="{{value}}">{{name}}</li>';	
			},
			renderItemTip:function(){
				return '<li class="{{className}}" uid="{{value}}">{{name}}<i class="tip">{{tip}}</i></li>';	
			},
			get:function(fn){
				if(this.ops.data){
					var value=this.searchInput[0].value.toLowerCase(),re=/^[\u4e00-\u9fa5]+$/g.test(value);
					for(var i=0,arr=[];i<this.ops.data.length;i++){
						if((re?this.ops.data[i].n:this.ops.data[i].s).substr(0,1).toLowerCase()==value.substr(0,1)){
							if((re?this.ops.data[i].n:this.ops.data[i].s).toLowerCase().indexOf(value)!=-1){
								arr.push(this.ops.data[i]);	
							};
						};
					};
					fn.call(this,arr);
				}else{
					M.ui.ajax.init({
						url:this.ops.url,
						data:M.extend({key:this.searchInput[0].value},this.ops.param),
						isload:false,
						type:'get',
						beforeSend:function(){
							this.empty.hide();
							this.loading.hide();
						},
						success:function(data){
							var types = {},newList = [],keyw = [];
							var text = this.searchInput[0].value;
							data.forEach(function(item){
								if(item.n.indexOf(text)>-1){
									newList.push(item)
								}
							})
							fn.call(this,newList);
						},
						error:function(msg){
							this.empty.show().html(this.setNull(msg,0));
							this.loading.hide();
						}
					},this);		
				};
			},
			
			creatSearch:function(){
				return M(M.creatlabel('div'),{
						'class':'g-input-select-dropdown',
						id:'g-pop-'+M.now(),
						css:{
							zIndex:M.now()
						}
					})
			},
			creatInputBox: function(){
				return M(M.creatlabel('div'),{
						'class':'g-input-chosen-search',
					})
			},
			creatInput: function(){
				return M(M.creatlabel('input'),{
						'class':'col-xs-12 js-search',
						'type':'text',
						'for':'fuzzyQuery'
					})
			},
			creatHiddenInput:function(){
				return M(M.creatlabel('input'),{
						'type':'hidden',
						'name':'fuzzyQuery'
					})
			},
			creatBoxul:function(){
				return M(M.creatlabel('div'),{
					'class':'g-fuzzy-content'
				})
			},
			creatUl:function(){
				return M(M.creatlabel('ul'),{})
			},
			creatLoad:function(){
				return M(M.creatlabel(),{
					'class':'g-pop-load',
					html:M.renderHTML({
						name:'img',
						proto:{
							src:M.getNormalPath(this.ops.src.loading,1,1)	
						}
					})
				});
			},
			creatNull:function(){
				return M(M.creatlabel(),{
					'class':'g-pop-null hide'
				})
			},
			setNull:function(text,status){
				return status?'没有查询到'+(text.length?'“'+M.renderHTML({
					name:'i',
					proto:{
						'class':'orange'	
					},
					html:text
				})+'”的':'')+'相关数据':text;	
			},
			hide:function(e){
				(e?e.data.context:this).search.hide();	
			}
		};
		return {
			defaults:{
				target:null,
				url:null,
				param:null,
				data:null,
				tip:false,
				isClick:false,
				src:{
					loading:'load.gif'
				},
				callback:function(){}
			},	
			init:function(ops){
				return new FuzzyQuery(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);