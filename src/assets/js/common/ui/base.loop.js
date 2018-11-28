/** 
 * 上下左右-循环/不循环-切换插件
 * @import common/fx.common.js  
 *
 * @container		            object              (必须)盒子原生对象			     					默认 null
 * @loop		               	boolean             (可选)是否循环					     				默认 false
 * @number		               	number              (可选)显示区域个数			     					默认 1
 * @roll                  		number              (可选)单次切换个数     							默认 1 
 * @className                  	string              (可选)禁止类名	     								默认 'disabled' 
 * @speed                    	number              (可选)切换缓冲速度     							默认 null
 * @callback               		function            (可选)切换完成之后回调
 */
;(function(M,window){
	M.ui.define('loop',function(){
		function Loop(ops,args){
			this.ops=ops;
			this.init(args);
		};
		Loop.prototype={
			constructor:Loop,
			init:function(args){
				if(this.ops.container==null) return;
				var list=this.ops.container.children();
				this.prev=M(list[0]);
				this.next=M(list[list.length-1]);
				this.content=M(list[1].children[0]);
				this.length=list[1].children[0].children.length;
				this.index=0;
				this.distance=M(list[1].children[0].children[0])[{x:'outerWidth',y:'outerHeight'}[this.ops.direction]](true);
				if(this.length<=this.ops.number){
					this.ops.loop=false;
				};
				delete this.ops.container;
				this.disable();
				this.length>this.ops.number&&this.addEvent(args);
				return this;
			},
			disable:function(){
				if(!this.ops.loop){
					if(this.length<=this.ops.number){
						this.prev.addClass(this.ops.className);
						this.next.addClass(this.ops.className);
					}else{
						if(this.index==this.length-this.ops.number){
							this.prev.removeClass(this.ops.className);
							this.next.addClass(this.ops.className);
						}else if(this.index==0){
							this.prev.addClass(this.ops.className);
							this.next.removeClass(this.ops.className);
						}else{
							this.prev.removeClass(this.ops.className);
							this.next.removeClass(this.ops.className);
						};	
					};	
				} else {
					
				}
			},
			addEvent:function(args){
				this.prev.bind('click',{context:this,args:args},this.movePrev);
				this.next.bind('click',{context:this,args:args},this.moveNext);	
			},
			movePrev:function(e){
				var target=M(this),that=e.data.context;
				if(!target.hasClass(that.ops.className)){
					if(that.ops.loop){
						that.content.css({
							x:{left:-that.distance*that.ops.roll},
							y:{top:-that.distance*that.ops.roll}
						}[that.ops.direction]).children().slice(that.length-that.ops.roll).prependTo(that.content);
						that.resolve(that,e.data.args,0,function(){
							that.content.css({
								x:{left:0},
								y:{top:0}
							}[that.ops.direction]);
						});
					}else{
						that.index-=that.ops.roll;	
						that.index=Math.max(that.index,0);	
						that.resolve(that,e.data.args,that.distance*that.index);
					};
				};
			},
			moveNext:function(e){
				var target=M(this),that=e.data.context;
				if(!target.hasClass(that.ops.className)){
					if(that.ops.loop){
						that.resolve(that,e.data.args,that.distance*that.ops.roll,function(){
							that.content.css({
								x:{left:0},
								y:{top:0}
							}[that.ops.direction]).children().slice(0,that.ops.roll).appendTo(that.content);
						});		
					}else{
						that.index+=that.ops.roll;	
						that.index=Math.min(that.index,that.length-that.ops.number);
						that.resolve(that,e.data.args,that.distance*that.index);		
					};
				};
			},
			resolve:function(that,args,distance,fn){
				that.content.stop(true,false).animate({
					x:{left:-distance},
					y:{top:-distance}
				}[that.ops.direction],that.ops.speed,function(){
					that.disable();
					M.isFunction(fn)&&fn.call(that);
					M.isFunction(that.ops.callback)&&that.ops.callback.apply(that,args);
				});
			},
			destroy:function(){
				delete this;	
			}	
		};
		return {
			defaults:{
				loop:false,
				number:1,
				roll:1,
				direction:'x',
				container:null,
				className:'disabled',
				speed:500,
				callback:function(){}
			},	
			init:function(ops){
				return new Loop(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);