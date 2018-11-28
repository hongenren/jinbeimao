/** 
 * 幻灯片
 * created by mr.x on 16/06/06.
 * @import common/fx.common.js     
 *
 * @container		            object              (必须)对象源			     						默认 null
 * @effect		               	string              (必须)切换过程效果				     				默认 fade ⇒ moveX  moveY
 * @event		               	string              (必须)事件类型					     				默认 mouseover ⇒ click  
 * @index		               	number              (必须)初始化显示索引					     		默认 0  
 * @auto		               	number              (可选)自动播放间隔周期					     		默认 3000  
 * @callback               		function            (可选)单次切换完成回调
 */
;(function(M,window){
	M.ui.define('slider',function(){
		function Slider(ops,args){
			this.ops=ops;
			this.init(args);
		};
		Slider.prototype={
			constructor:Slider,
			init:function(args){
				if(!this.ops.container.length) return;
				this.creat(args);
				return this;
			},
			creat:function(){
				this.content=this.ops.container.children();
				this.list=this.content.children();
				this.length=this.list.length;
				if(this.length<=1) return;
				this.width=this.content.width();
				this.height=this.content.height();
				this.ops.index=Math.min(Math.max(0,this.ops.index),this.length-1);
				this.spot=this.creatElement('mt-picture-spot');	
				for(var i=0;i<this.length;i++){
					this.spot.append(this.creatSpot(i==this.ops.index?'current':'',i+1));
				};
				this.setStyle(this.ops.effect);
				this.resolve();
				this.ops.container.append(this.spot);
				delete this.spot;
				//delete this.content;
				M.isNumeric(this.ops.auto)&&this.auto();
			},
			setStyle:function(type){
				this.content.css({
					
				});
			},
			setIndex:function(e){
					
			},
			resolve:function(){
				
			},
			
			
			creatElement:function(name){
				return M(M.creatlabel(),{
					'class':name
				});	
			},
			creatSpot:function(name,text){
				return M(M.creatlabel('span'),{
					'class':name,
					html:text
				}).bind(this.ops.event,{context:this,index:text-1},this.setIndex);		
			},
			destroy:function(){
				delete this;	
			}	
		};
		return {
			defaults:{
				container:null,
				effect:'fade',
				event:'mouseover',
				index:0,
				auto:3000,
				callback:function(){}
			},	
			init:function(ops){
				return new Slider(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);