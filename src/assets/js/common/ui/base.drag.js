/** 
 * 用途:拖拽控件
 * 作者:谢力 QQ：843926058
 * 日期：2016/11/07
 * @import common/fx.common.js  
 *
 * @target                     	object              (必须)拖拽对象										默认 null
 * @container	               	object              (必须)拖拽内容			     						默认 null
 * @warp              			object              (必须)相对区域  		 							默认 window
 * @callback               		function            (可选)拖拽成功完成回调
 */
;(function(M,window){
	M.ui.define('drag',function(){
		function Drag(ops,args){
			this.ops=ops;
			this.init(args);
		};
		Drag.prototype={
			constructor:Drag,
			init:function(args){
				if(!this.ops.target.length) return;
				!M.browser.touch&&this.ops.target.css({cursor:'move'}).bind(this.event[0],{context:this,args:args},this.creat).children().preventDefault(this.event[0]);	
				return this;
			},
			event:function(){
				//return M.browser.touch?['touchstart','touchmove','touchend']:['mousedown','mousemove','mouseup'];	
				return ['mousedown','mousemove','mouseup'];
			}(),
			creat:function(e){
				e.stopPropagation();
				M(document.body).css({webkitUserSelect:'none',mozUserSelect:'none',oUserSelect:'none',userSelect:'none'});
				var that=e.data.context,touch=M.browser.touch?e.originalEvent.touches[0]:e;
				that.left=parseFloat(that.ops.container.css('marginLeft'));
				that.top=parseFloat(that.ops.container.css('marginTop'));
				that.startX=touch.pageX;
				that.startY=touch.pageY;
				M(document).bind(that.event[1],{context:that,args:e.data.args},that.move);
				M(document).bind(that.event[2],{context:that,args:e.data.args},that.up);
				!M.browser.touch&&M(document).bind({
					'selectstart':that.start,
					'selectable':'on'
				});
			},
			move:function(e){
				e.stopPropagation();
				var that=e.data.context,touch=M.browser.touch?e.originalEvent.touches[0]:e;
				that.ops.container.css({marginLeft:that.left+touch.pageX-that.startX,marginTop:that.top+touch.pageY-that.startY});
			},
			up:function(e){
				var that=e.data.context,touch=M.browser.touch?e.originalEvent.touches[0]:e;
				if(!M.browser.touch){
					M(document.body).css({webkitUserSelect:'text',mozUserSelect:'text',oUserSelect:'text',userSelect:'text'});
					M(document).bind('selectable','off').unbind(e.data.context.event[1]).unbind(e.data.context.event[2]);	
				};
				M.isFunction(e.data.context.ops.callback)&&e.data.context.ops.callback.apply(e.data.context,[touch.pageX-that.startX,touch.pageY-that.startY].concat(e.data.args));
				delete that.left;
				delete that.top;
				delete that.startX;
				delete that.startY;
			},
			start:function(){
				return false;	
			},
			destroy:function(){
				delete this;	
			}	
		};
		return {
			defaults:{
				target:null,
				container:null,
				warp:null,
				callback:function(){}
			},	
			init:function(ops){
				return new Drag(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);