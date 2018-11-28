/** 
 * 用途:tab切换
 * 作者:谢力 QQ：843926058
 * 日期：2016/11/09
 * @import common/fx.common.js  
 *
 * @index                     	boolean             (可选)默认显示第几个								默认 0
 * @target                     	object              (必须)拖拽对象										默认 null
 * @panel		               	object              (必须)拖拽内容			     						默认 null
 * @event		               	string              (必须)切换事件			     						默认 click
 * @url               			string              (可选)Ajax请求地址       	   		 				默认 null
 * @data             			object              (可选)ajax请求参数  	  		 					默认 null
 * @callback               		function            (可选)切换成功完成回调
 * @error               		function            (可选)当有ajax请求时，请求失败回调
 */
;(function(M,window){
	M.ui.define('tab',function(){
		function Tab(ops,args){
			this.ops=ops;
			this.init(args);
		};
		Tab.prototype={
			constructor:Tab,
			init:function(args){
				if(!this.ops.button.length||!this.ops.panel.length) return;
				this.base=M.static.init();
				this.ops.button.each(function(index){
					this.setAttribute('_index_',index);	
				});
				this.index=this.ops.index;
				this.exec();
				M(document).on(this.ops.event,this.ops.button,{context:this},this.tab);
				return this;
			},
			tab:function(e){
				var target=this,that=e.data.context;
				that.index=this.getAttribute('_index_');
				that.exec();
			},
			exec:function(){
				if(this.ops.url){
					this.compile();
					this.base.resolve({
						url:this.ops.url,
						data:M.extend(this.ops.data,{_type:this.index}),
						isLoad:true,
						content:this.ops.panel.eq(this.index),
						dataType:'text',
						context:this,
						error:{
							el_content:this.ops.panel.eq(this.index)
						},
						success:function(data){
							this.ops.callback&&this.ops.callback.call(this,data);
						},
						fail:function(msg){
							this.ops.error&&this.ops.error.call(this,msg);
						}	
					});
				}else{
					this.compile(this.ops.callback);	
				};	
			},
			compile:function(fn){
				this.ops.button.removeClass(this.ops.currentClass).eq(this.index).addClass(this.ops.currentClass);
				this.ops.panel.hide().eq(this.index).show();
				fn&&fn.call(this);
			},
			destroy:function(){
				delete this;	
			}	
		};
		return {
			defaults:{
				index:0,
				button:null,
				panel:null,
				event:'click',
				currentClass:'current',
				url:null,
				data:null,
				callback:function(){},
				error:function(){}
			},	
			init:function(ops){
				return new Tab(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);