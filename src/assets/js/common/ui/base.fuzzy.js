/** 
 * 用途:模糊搜索控件
 * 日期：2018/5/16
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
	M.ui.define('fuzzy',function(){
		function Fuzzy(ops,args){
			this.ops=ops;
			this.init(args);
		};
		Fuzzy.prototype={
			constructor:Fuzzy,
			init:function(args){
				if(!this.ops.target.length) return;
				this.targetElement=this.ops.target;
				this.valueElement=M('input[name='+this.targetElement[0].getAttribute("for")+']');
				delete this.ops.target;
				this.targetElement.bind('keyup',function(){
                    M(document.getElementsByClassName('g-pop-container')).hide();
                    var value = this.targetElement[0].value;
                    var cArr = value.match(/([\u0391-\uffe5])/ig); // 返回中文的字符
                    if(cArr && cArr.length>=4){
                        if(this.container){
                            this.container.show();
                            this.creat(args);
                        }else{
                            this.exec(args);
                        };
                    }else{
                        this.hide();
                    };
					return false;
				}.bind(this));
				if(this.ops.isClick){
					this.targetElement.bind('click',function(){
						M(document.getElementsByClassName('g-pop-container')).hide();
						if(this.container){
							this.container.show();
							this.creat(args);
						}else{
							this.exec(args);
						};
						return false;
					}.bind(this));	
				};
				return this;
			},
			exec:function(args){
				this.container=this.creatContainer();
				this.content=this.creatContent();
				this.main=this.creatMain();
				this.loading=this.creatLoad();
				this.empty=this.creatNull();
				this.content.append(this.main).append(this.loading);
				this.container.append(this.content).append(this.empty);
				this.targetElement.after(this.container)
//				M(document.body).append(this.container);
				this.creat(args);
				this.size();
				M(window).bind('resize',function(e){
					this.size();	
				}.bind(this));
				M(document).bind('click',{context:this},this.hide);
				this.container.stopPropagation();
			},
			size:function(){
				var o=M(window),
					height=this.targetElement.outerHeight(true),
					offsetLeft=this.targetElement.offset().left,
					offsetTop=this.targetElement.offset().top,
					scrollTop=o.scrollTop(),
					targetHeight=this.container.height(),
					innerHeight=o.height(),
					outerHeight=M(document.body).height(),
					name=['left-top','left-bottom'],
					index;	
//				index=offsetTop+height+targetHeight<=outerHeight?0:1;
//				this.container.css({
//					0:{left:offsetLeft,top:offsetTop+height},
//					1:{left:offsetLeft,top:offsetTop-targetHeight}
//				}[index]);
			},
			creat:function(args){
				this.get(function(data){
					this.loading.hide();
					this.empty.hide();
					if(data.length){
						this.resolve(data,args);
					}else{
						this.main[0].innerHTML='';
						this.empty.show().html(this.setNull(this.targetElement[0].value,1));
					};
					this.size();
				});
			},
			addEvent:function(args){
				this.main.children().bind('click',{context:this,args:args},this.select);
			},
			select:function(e){
				var that=e.data.context,args=e.data.args;
				that.name=this.innerHTML.replace(/\<(.*)\>/g,'');
				that.value=this.getAttribute('uid');
				that.taxNum=this.getAttribute('taxNum');
				that.change();
				that.hide();
				M.isFunction(that.ops.callback)&&that.ops.callback.apply(that,args);
			},
			change:function(){
				this.targetElement.val(this.name);
				this.valueElement.val(this.value);
			},
			resolve:function(data,args){
				for(var i=0,str='';i<data.length;i++){
					str+=M.template.resolve(this.ops.tip?this.renderItemTip():this.renderItem(),{name:data[i].chineseFullName,value:data[i].comId,tax:data[i].taxNum,tip:data[i].s,className:i==0?'active':''});
				};
				this.main[0].innerHTML=str;
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
						container:this.content
					});
				}else{
					this.scroll.refresh();	
					this.scroll.scrollTop();
				};
				this.addEvent(args);
			},
			get:function(fn){
				if(this.ops.data){
					var value=this.targetElement[0].value.toLowerCase(),re=/^[\u4e00-\u9fa5]+$/g.test(value);
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
						data:M.extend({}, this.ops.param, { "chineseFullName": this.targetElement[0].value }),
						isload:false,
						type:'post',
                        dataType: 'json',
						beforeSend:function(){
							this.empty.hide();
							this.loading.hide();
						},
						success:function(res){
							if (res.success) {
                                $('.g-fuzzy-content').show();
                                var types = {},newList = [];
                                var text = this.targetElement[0].value
                                res.data.forEach(function(item){
                                    if(item.chineseFullName.indexOf(text)>-1){
                                        newList.push(item)
                                    }
                                })
                                fn.call(this,newList);
							} else {
                                $('.g-fuzzy-content').hide();
                                this.empty.show().html(this.setNull(this.targetElement[0].value,1));
							}
						},
						error:function(msg){
							this.empty.show().html(this.setNull(msg,0));
							this.loading.hide();
							this.size();
						}
					},this);		
				};
			},
			hide:function(e){
				if ((e?e.data.context:this).container) {
                    (e?e.data.context:this).container.hide();
                }

			},
			renderItem:function(){
				return '<li class="{{className}}" uid="{{value}}" taxNum="{{tax}}">{{name}}</li>';
			},
			renderItemTip:function(){
				return '<li class="{{className}}" uid="{{value}}">{{name}}<i class="tip">{{tip}}</i></li>';
			},
			creatContainer:function(){
				return M(M.creatlabel(),{
					'class':'g-input-select-dropdown',
					id:'g-pop-'+M.now(),
					css:{
						zIndex:M.now(),
					    'width': '100%',
					    'border': '1px solid #d5d5d5',
					    'border-top': 0,
					    'position': 'absolute',
					    'top': '100%',
					    'padding':'10px',
						'background':'#fff'
//						width:this.targetElement.outerWidth(true)	
					}
				});	
			},
			creatMain:function(){
				return M(M.creatlabel('ul'),{
					'class':'g-pop-fuzzy'
				});	
			},
			creatContent:function(){
				return M(M.creatlabel(),{
					'class':'g-fuzzy-content'
				});	
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
			destroy:function(){
				delete this;	
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
				return new Fuzzy(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);