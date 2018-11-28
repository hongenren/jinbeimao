/** 
 * 用途:滚动条控件
 * 作者:谢力 QQ：843926058
 * 日期：2016/11/07
 * @import common/fx.common.js  
 *
 * @scrollbar        		               								
 * ''enabled''   			  	boolean      			(可选)是否显示滚动块								默认 true 
 * ''place''   			  	  	boolean      			(可选)滚动块是否占据空间								默认 false 
 * ''className''   			  	string      			(可选)滚动块class									默认 null 
 * --@style 				  	object       
 * --''marginLeft''     	 	number      			(必须)滚动块左边距									默认 10px 
 * --''marginRight''    	  	number      			(必须)滚动块右边距									默认 10px 
 * --''marginTop''     	  	  	number      			(必须)滚动块上边距									默认 10px 
 * --''marginBottom''    		number      			(必须)滚动块下边距									默认 10px 
 * --''size''    			  	number			     	(必须)滚动块宽/高									默认 5px	
 * @resize                 		boolean	        		(可选)是否根据窗口改变重置				          	默认 true
 * @container                 	object	        		(必须)被包裹容器				          			默认 null
 * @direction                	string              	(可选)移动方向,水平或垂直        					默认 y轴
 * @mousewheel                	boolean              	(可选)是否支持鼠标滑轮事件     						默认 false
 * @mouseWheelSpeed           	number              	(可选)鼠标滑轮转动速度,mousewheel为true生效     		默认 200px
 * @offset		              	number              	(可选)初始化内容块位置     							默认 0px							
 * @callback                  	function            	(可选)初始化完成回调
 * @onScroll                  	function            	(可选)缓冲移动结束回调
 */
;(function(M,window){
	M.ui.define('scroll',function(){
		function Scroll(ops,args){
			this.ops=ops;
			this.init(args);
		};
		Scroll.prototype={
			constructor:Scroll,
			init:function(args){
				if(!this.ops.container.length) return;
				this.creat(args);
				return this;
			},
			creat:function(args){
				this.ops.content=this.ops.container.children().eq(0);
				this.ops.content.css({position:'relative'});
				this.refresh(args);
				this.ops.mousewheel&&this.ops.container.bind('mousewheel',{context:this,args:args},this.mouse);
				this.ops.resize&&M(window).bind('resize',function(e){
					this.refresh(args);	
				}.bind(this));
				M.isFunction(this.ops.callback)&&this.ops.callback.apply(this,args);
			},
			refresh:function(args){
				this.outerDistance={x:this.ops.container.width(),y:this.ops.container.height()}[this.ops.direction];
				this.innerDistance={x:this.ops.content.outerWidth(true),y:this.ops.content.outerHeight(true)}[this.ops.direction];
				this.maxScrollDistance=Math.max(0,this.innerDistance-this.outerDistance);
				this.ops.offset=Math.min(this.ops.offset,this.maxScrollDistance);
				if(this.maxScrollDistance==0){
					if(this.ops.dragger){
						this.ops.dragger.remove();
						this.ops.bar.remove();
						delete this.ops.dragger;
						delete this.ops.bar;
						delete this.scrollBarSize;
						delete this.maxScrollBarDistance;
						this.ops.scrollbar.place&&this.ops.content.css({
							x:{marginBottom:0,left:0},
							y:{marginRight:0,top:0}
						}[this.ops.direction]);
					};
				}else{
					this.ops.mousewheel&&this.ops.container.bind('mousewheel',{context:this,args:args},this.mouse);
					if(this.ops.scrollbar.enabled){
						if(!this.ops.dragger){
							this.ops.dragger=M(M.creatlabel(),{
								'class':'g-scroll-dragger',
								css:{
									x:{left:this.ops.scrollbar.style.marginLeft,right:this.ops.scrollbar.style.marginRight,bottom:this.ops.scrollbar.style.marginBottom,height:this.ops.scrollbar.style.size},
									y:{top:this.ops.scrollbar.style.marginTop,bottom:this.ops.scrollbar.style.marginBottom,right:this.ops.scrollbar.style.marginRight,width:this.ops.scrollbar.style.size}	
								}[this.ops.direction]	
							});
							this.ops.bar=M(M.creatlabel(),{
								'class':'g-scroll-bar',
								css:{
									x:{left:0,top:0,bottom:0},
									y:{left:0,top:0,right:0}	
								}[this.ops.direction]	
							});
							this.ops.dragger.append(this.ops.bar).appendTo(this.ops.container);
							this.ops.scrollbar.className!=null&&this.ops.dragger.addClass(this.ops.scrollbar.className);
							if(this.ops.scrollbar.place){
								this.ops.content.css({
									x:{marginBottom:this.ops.scrollbar.style.marginTop+this.ops.scrollbar.style.marginBottom+this.ops.scrollbar.style.size},
									y:{marginRight:this.ops.scrollbar.style.marginLeft+this.ops.scrollbar.style.marginRight+this.ops.scrollbar.style.size}
								}[this.ops.direction]);
							};
							if(!M.browser.touch){
								this.ops.bar.bind('mousedown',{context:this,args:args},this.down).stopPropagation('click');
								this.ops.dragger.bind('click',{context:this,args:args},this.drag);
							};
						};
						this.scrollBarSize=parseInt(this.outerDistance*(this.outerDistance-{
							x:this.ops.scrollbar.style.marginLeft+this.ops.scrollbar.style.marginRight,
							y:this.ops.scrollbar.style.marginTop+this.ops.scrollbar.style.marginBottom
						}[this.ops.direction])/this.innerDistance);
						this.maxScrollBarDistance=this.outerDistance-{
							x:this.ops.scrollbar.style.marginLeft+this.ops.scrollbar.style.marginRight,
							y:this.ops.scrollbar.style.marginTop+this.ops.scrollbar.style.marginBottom
						}[this.ops.direction]-this.scrollBarSize;
						this.ops.bar.css({
							x:{width:this.scrollBarSize},
							y:{height:this.scrollBarSize}
						}[this.ops.direction]);
					};	
				};
				this.setBar();
				this.setContent(this,args,this.ops.offset==0?null:1);
			},
			event:function(){
				return M.browser.touch?['touchstart','touchmove','touchend']:['mousedown','mousemove','mouseup'];	
			}(),
			down:function(e){
				var target=M(this),that=e.data.context;
				that.ops.dragger.addClass('hover');
				that.ops.bar.addClass('in');
				that.oldPos=target.position()[{x:'left',y:'top'}[that.ops.direction]];
				that.currentPos=e[{x:'pageX',y:'pageY'}[that.ops.direction]];
				M(document.body).css({cursor:'pointer',webkitUserSelect:'none',mozUserSelect:'none',oUserSelect:'none',userSelect:'none'});
				M(document).bind(that.event[1],{context:that,args:e.data.args},that.move);
				M(document).bind(that.event[2],{context:that,args:e.data.args},that.up);
				M(document).bind({
					'selectstart':that.start,
					'selectable':'on'
				});
			},
			move:function(e){
				var that=e.data.context,distance=Math.min(Math.max(0,e[{x:'pageX',y:'pageY'}[that.ops.direction]]-that.currentPos+that.oldPos),that.maxScrollBarDistance)
				that.ops.offset=Math.max(0,Math.min(parseInt(distance*that.maxScrollDistance/that.maxScrollBarDistance),that.maxScrollDistance));
				that.setBar(distance);
				that.setContent(that,e.data.args);
			},
			up:function(e){
				var that=e.data.context;
				that.ops.dragger.removeClass('hover');
				that.ops.bar.removeClass('in');
				delete that.oldPos;
				delete that.currentPos;
				M(document.body).css({cursor:'auto',webkitUserSelect:'text',mozUserSelect:'text',oUserSelect:'text',userSelect:'text'});
				M(document).bind('selectable','off').unbind(e.data.context.event[1]).unbind(e.data.context.event[2]);	
			},
			drag:function(e){
				var that=e.data.context,
					target=M(this),
					oldPos=target.position()[{x:'left',y:'top'}[that.ops.direction]],
					offsetPos=target.offset()[{x:'left',y:'top'}[that.ops.direction]],
					currentPos=e[{x:'pageX',y:'pageY'}[that.ops.direction]],
					distance=currentPos-offsetPos+oldPos-that.scrollBarSize;
				that.ops.offset=Math.max(0,Math.min(parseInt(distance*that.maxScrollDistance/that.maxScrollBarDistance),that.maxScrollDistance));
				that.setBar(distance);
				that.setContent(that,e.data.args);
			},
			mouse:function(e,delta){
				var that=e.data.context;
				if(that.maxScrollDistance==0){
					that.ops.container.unbind('mousewheel')
					return false;
				}
				e.preventDefault();
				if(delta < 0){
					that.ops.offset+=that.ops.mouseWheelSpeed;
				}else{
					that.ops.offset-=that.ops.mouseWheelSpeed
				}
//				switch(delta){
//					case -1 : that.ops.offset+=that.ops.mouseWheelSpeed; break;
//					case  1 : that.ops.offset-=that.ops.mouseWheelSpeed; break;	
//					default : break;		
//				};
				that.ops.offset=Math.max(0,Math.min(that.ops.offset,that.maxScrollDistance));
				that.setBar();
				that.setContent(that,e.data.args);
				return false;
			},
			scrollTo:function(value,args){
				if(M.isNumeric(value)){
					this.ops.offset=value;
					this.setBar();	
					this.setContent(this,args,1);
				};
			},
			scrollTop:function(args){
				this.scrollTo(0,args);
			},
			scrollBotttom:function(args){
				this.scrollTo(this.maxScrollDistance,args);
			},
			clear:function(){
				this.ops.scrollbar.place&&this.ops.content.css({
					x:{marginBottom:0,left:0},
					y:{marginRight:0,top:0}
				}[this.ops.direction]);
				if(this.ops.dragger){
					this.ops.dragger.remove();
					this.ops.bar.remove();
					delete this.ops.dragger;
					delete this.ops.bar;
					delete this.scrollBarSize;
					delete this.maxScrollBarDistance;
				};
			},
			setBar:function(value){
				if(this.ops.bar){
					var distance=M.isNumeric(value)?value:parseInt(this.ops.offset*this.maxScrollBarDistance/this.maxScrollDistance);
					this.ops.bar.css({
						x:{left:distance},
						y:{top:distance}
					}[this.ops.direction]);	
				};	
			},
			setContent:function(that,args,time){
				this.ops.content.stop().animate({
					x:{left:-this.ops.offset},
					y:{top:-this.ops.offset}
				}[this.ops.direction],time||300,'linear',function(){
					M.isFunction(that.ops.onScroll)&&that.ops.onScroll.apply(that,args);
				});	
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
				scrollbar:{
					enabled:true,
					place:false,
					className:null,
					style:{
						marginLeft:10,
						marginRight:10,
						marginTop:10,
						marginBottom:10,
						size:5
					}	
				},
				resize:true,
				container:null,
				direction:'y',
				mousewheel:true,
				mouseWheelSpeed:30,
				offset:0,
				callback:function(){},
				onScroll:function(){}
			},	
			init:function(ops){
				return new Scroll(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);