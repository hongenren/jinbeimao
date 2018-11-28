/** 
 * 三级城市弹出选择控件
 * created by mr.x on 16/05/06.
 * @import common/fx.common.js     
 *
 * @target		               	object              (必须)事件源			     						默认 null
 * @single		               	boolean             (可选)是否只获取最终城市			     				默认 false
 * @tab		               		function            (可选)级联切换完成回调
 * @callback               		function            (可选)选择成功完成回调
 */
;(function(M,window){
	M.ui.define('cityQuery',function(){
		function cityQuery(ops,args){
			this.ops=ops;
			this.init(args);
		};
		cityQuery.prototype={
			constructor:cityQuery,
			init:function(args){
				console.log(M.Font.close_empty)
				if(!this.ops.target.length) return;
				this.targetElement=this.ops.target;
				this.valueElement=M('input[name='+this.targetElement[0].getAttribute("for")+']');
				this.status=false;
				this.name_arr=[''];
				this.id_arr=[''];
				this._space=['provice','city','area','zone'];
				delete this.ops.target;
				this.targetElement.bind('click',function(){
					M(document.getElementsByClassName('g-pop-container')).hide();
					if(this.container){
						this.container.show();
						this.size();
					}else{
						this.exec(args);
					};
					return false;
				}.bind(this));
				return this;
			},
			exec:function(args){
				this.container=this.creatContainer();
				this.content=this.creatContent();
				this.main=this.creatMain();
				this.close=this.creatClose();
				this.tabInner=this.creatTabInner();
				this.tabBox=this.creatTabBox();
				this.loading=this.creatLoad();
				this.empty=this.creatNull(args);
				this.provice=this.creatTab();
				this.tabInner.append(this.provice);
				this.tabBox.append(this.tabInner);
				this.main.append(this.loading).append(this.empty);
				this.content.append(this.tabBox).append(this.main).append(this.close);
				this.container.append(this.content);
				M(document.body).append(this.container);
				this.creat(args);
				delete this.tabBox;
				delete this.content;
				this.size();
				M(window).bind('resize',function(e){
					this.size();	
				}.bind(this));
				M(document).bind('click',{context:this},this.hide);
				this.close.bind('click',{context:this},this.hide);
				this.container.stopPropagation();
			},
			size:function(){
				var o=M(window),
					width=this.targetElement.outerWidth(true),
					height=this.targetElement.outerHeight(true),
					offsetLeft=this.targetElement.offset().left,
					offsetTop=this.targetElement.offset().top,
					scrollLeft=o.scrollLeft(),
					scrollTop=o.scrollTop(),
					targetWidth=this.container.width(),
					targetHeight=this.container.height(),
					innerWidth=o.width(),
					innerHeight=o.height(),
					name=['left-top','right-top','left-bottom','right-bottom'],
					index;	
				if(offsetTop-scrollTop+height+targetHeight<=innerHeight){
					index=offsetLeft-scrollLeft+width+targetWidth<=innerWidth?0:1;
				}else{
					index=offsetLeft-scrollLeft+width+targetWidth<=innerWidth?2:3;	
				};
				this.container[0].className='g-pop-container'.concat(String.fromCharCode(32)).concat(name[index]);
				this.container.css({
					0:{left:offsetLeft,top:offsetTop+height},
					1:{left:offsetLeft-targetWidth+width,top:offsetTop+height},
					2:{left:offsetLeft,top:offsetTop-targetHeight},
					3:{left:offsetLeft-targetWidth+width,top:offsetTop-targetHeight}	
				}[index]);
			},
			creat:function(args){
				this.get(function(data){
					var value=this.valueElement[0].value,name=this.targetElement[0].value;
					this.show(data,'_'+this._space[0],0,args);
					if(value.length){
						value=value.split('|');
						name=name.split(String.fromCharCode(32));
						this.auto(data,name,value,0,args);
					}else{
						this.change();
					};
				});
			},
			auto:function(data,name,value,index,args){
				if(data[value[index]]){
					this.name_arr[index]=name[index];
					this.id_arr[index]=value[index];	
					if(data[value[index]].l){
						this.depand(name[index],value[index],this._space[index],this._space[index+1],args,data,index);
						this.auto(data[value[index]].l,name,value,index+1,args);	
					}else{
						this[this._space[index]][0].innerHTML=this.setTabValue(name[index]);
						this.change();	
						this.status=true;
					};
				}else{
					this.change();
				};	
			},
			show:function(data,name,type,args){
				this[name]=this.creatItem(this.resolve(data));
				this.main.append(this[name]);
				this[name].show();
				this.size();
				this.addEvent(name,type,data,args);	
			},
			addEvent:function(name,type,data,args){
				this[name].find(document.getElementsByClassName('g-pop-piel')).bind('click',{context:this,type:type,list:data,args:args},this.select);
				this[name.substring(1)].bind('click',{context:this,type:type,args:args},this.tab);	
			},
			select:function(e){
				var that=e.data.context,
					type=e.data.type,
					data=e.data.list,
					args=e.data.args,
					uid=this.getAttribute('uid'),
					name=this.innerHTML;
				that.depand(name,uid,that._space[type],that._space[type+1],args,data,type);
			},
			depand:function(name,uid,_id,_sid,args,data,type){
				this[_id][0].innerHTML=this.setTabValue(name);
				this.name_arr[type]=name;
				this.id_arr[type]=uid;
				if(data[uid]&&data[uid].l){
					this[_id].removeClass('current');
					this[_sid]=this.creatTab();
					this.tabInner.append(this[_sid]);
					this['_'+_id].hide();
					this.show(data[uid].l,'_'+_sid,type+1,args);
					this.change();
					M.isFunction(this.ops.tab)&&this.ops.tab.apply(this,args);	
				}else{
					this.change();
					this.hide();
					this.status=true;
					M.isFunction(this.ops.callback)&&this.ops.callback.apply(this,args);	
				};
			},
			tab:function(e){
				var target=M(this),that=e.data.context,type=e.data.type,args=e.data.args;
				if(!/current/g.test(this.className)){
					target.addClass('current').siblings().removeClass('current');
					_space(that,type,that._space);
					that.change();
					that.status=false;
					M.isFunction(that.ops.tab)&&that.ops.tab.apply(that,args);	
				};	
				function _space(that,j,m){
					that['_'+m[j]].show();
					for(var i=j+1;i<m.length;i++){
						if(that['_'+m[i]]){
							that[m[i]].remove();
							that['_'+m[i]].remove();
							delete that[m[i]];
							delete that['_'+m[i]];
							that.name_arr.splice(j+1,1);
							that.id_arr.splice(j+1,1);
						};
					};	
				};
			},
			change:function(){
				this.targetElement.val(!this.ops.single?this.name_arr.join(String.fromCharCode(32)):this.name_arr[this.name_arr.length-1]);
				this.valueElement.val(!this.ops.single?this.id_arr.join('|'):this.id_arr[this.id_arr.length-1]);	
			},
			resolve:function(data){
				var str='';
				for(var i in data){
					str+=M.template.resolve(this.render(),{name:data[i].n,value:i});
				};
				return M.renderHTML({
					name:'ul',
					html:str
				});
			},
			get:function(fn){
				M.ui.ajax.init({
					url:M.getNormalPath('cityQueryData.json',4),
					isload:false,
					type:'get',
					//delay:300,
					beforeSend:function(){
						this.empty.hide();
						this.loading.show();
					},
					success:function(data){
						this.loading.hide();
						delete this.loading;
						delete this.empty;
						fn.call(this,data);
					},
					error:function(msg){
						this.empty.show();
						this.loading.hide();
					}
				},this);	
			},
			hide:function(e){
				(e?e.data.context:this).container.hide();	
			},
			dismiss:function(){
				this.container.remove();
				this.destroy();		
			},
			render:function(){
				return '<li><a href="javascript:;" title="{{name}}" uid="{{value}}" class="g-pop-piel">{{name}}</a></li>';	
			},
			creatTab:function(){
				return M(M.creatlabel('li'),{
					'class':'current',
					html:this.setTabValue('请选择')
				});
			},
			setTabValue:function(value){
				return value+M.renderHTML({
					name:'i',
					proto:{
						'class':'iconfont'
					},
					html:M.Font.arrow_down_empty
				});
			},
			creatContainer:function(){
				return M(M.creatlabel(),{
					'class':'g-pop-container',
					id:'g-pop-'+M.now(),
					css:{
						width:375,
						zIndex:M.now()	
					},
					html:M.renderHTML({
						proto:{
							'class':'g-pop-shadow'
						}
					})
				});	
			},
			creatItem:function(str){
				return M(M.creatlabel(),{
					'class':'g-pop-item hide',
					html:str	
				});	
			},
			creatTabInner:function(){
				return M(M.creatlabel('ul'));	
			},
			creatTabBox:function(){
				return M(M.creatlabel(),{
					'class':'g-pop-tab'
				});	
			},
			creatMain:function(){
				return M(M.creatlabel(),{
					'class':'g-pop-main'
				});	
			},
			creatContent:function(){
				return M(M.creatlabel(),{
					'class':'g-pop-content pad-10'
				});	
			},
			creatClose:function(){
				return M(M.creatlabel(),{
					'class':'iconfont g-pop-close',
					html:M.Font.close_empty
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
			creatNull:function(args){
				var reload=M(M.creatlabel('a'),{
					'class':'red',
					href:'javascript:;',
					html:'点击重试',
					click:function(){
						this.creat(args);
					}.bind(this)
				}),
				txt=M(M.creatlabel('p'),{
					html:'加载失败,'
				}).append(reload);
				return M(M.creatlabel(),{
					'class':'g-pop-load hide'
				}).append(txt);
			},
			destroy:function(){
				delete this;	
			}	
		};
		return {
			defaults:{
				target:null,
				single:false,
				src:{
					loading:'load.gif'
				},
				tab:function(){},
				callback:function(){}
			},	
			init:function(ops){
				return new cityQuery(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);