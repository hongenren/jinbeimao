/** 
 * 用途:等待框|状态提示框
 * 作者:谢力 QQ：843926058
 * 日期：2016/11/07
 * @import common/fx.common.js 
 *
 * @id                     		string              (可选)对象id										默认 null
 * @warp	               		object              (可选)被包裹容器			     					默认 null
 * @position               		string              (必须)定位方式      	   		 					默认 fixed ⇒ fixed/absolute
 * @offsetLeft             		number              (可选)手工调整左偏移 	  		 					默认 0 
 * @offsetTop              		number              (可选)手工调整上偏移 	  		 					默认 0
 * @status                 		boolean             (必须)状态									  	默认 loading ⇒ loading/true/false/tip
 * @hide                 		boolean             (必须)是否不保持独立								默认 true
 * @src							string				(必须)所需图片路径	
 * @time                   		number              (可选)自动消失时间        		 					默认 null
 * @text                  		string              (可选)文本      		  		 					默认 null
 * @callback               		function            (可选)关闭之后回调
 */
;(function(M,window){
	M.ui.define('waiting',function(){
		function Waiting(ops){
			this.ops=ops;
		};
		Waiting.prototype={
			constructor:Waiting,
			creat:function(args){
				this.ops.warp&&(this.ops.position='absolute');
				this.creatNode(args);
				return this;
			},
			creatNode:function(args){
				var icon={'true':M.Font.check_fill_lighter,'false':M.Font.error_fill_circle,'tip':M.Font.error_fill_circle}[this.ops.status.toString()];
				this.container=M(M.creatlabel(),{
					'class':'mt-master-container mt-waiting-master'.concat(!this.ops.hide?' alone':''),
					id:this.ops.id||'mt-loading-'+M.now(),
					css:{
						position:'absolute',
						background:'none',
						zIndex:M.now()
					}
				});
				this.content=M(M.creatlabel(),{
					'class':'g-waiting-content '+this.ops.status.toString(),
					css:{
						position:this.ops.position	
					}
				});
				if(icon){
					this.content.html(M.renderHTML({
						name:'i',
						proto:{
							'class':'iconfont middle'
						},
						html:icon
					})+this.ops.text);
					this.resolve(icon,this,args);
				}else{
					M.ui.loadImage.init({
						pic:M.getNormalPath(this.ops.src.loading,1),
						onComplete:function(that){
							that.content.css({
								background:'url('+M.getNormalPath(that.ops.src.inner,1)+') repeat'
							}).html(M.renderHTML({
								name:'img',
								proto:{
									src:this[0],
									width:50,
									height:50
								}
							}));
							that.resolve(icon,that,args);
						}
					},this);
					
					/*this.content.css({
						background:'url('+M.getNormalPath(this.ops.src.inner)+') repeat'
					}).append(this.renderLoading());
					this.resolve(icon,this,args);*/
				};
			},
			resolve:function(icon,that,args){
				(this.ops.warp||M(document.body)).append(this.container.append(this.content));
				var width=this.content.outerWidth(true),height=this.content.outerHeight(true),top=30;
				if(icon){
					this.content.css({
						marginLeft:this.ops.offsetLeft-0.5*width,
						marginTop:this.ops.offsetTop-0.5*height-30
					}).animate({marginTop:this.ops.offsetTop-0.5*height,opacity:1},300,function(){
						that.dismiss(args,1,that.ops.offsetTop-0.5*height+30);		
					});	
				}else{
					this.dismiss(args,0);	
				};	
			},
			dismiss:function(args,type,top){
				M.isNumeric(this.ops.time)&&M.delay(this.ops.time,function(){
					this.remove(this,args,type,top);	
				},this);
			},
			cancel:function(){
				this.ops.hide=true;
				this.container.removeClass('alone').remove();
			},
			remove:function(that,args,type,top){
				if(M.isObject(that)){
					if(type){
						that.content.animate({marginTop:top,opacity:0},300,function(){
							that.container.remove();
							that.destroy(that);
							M.isFunction(that.ops.callback)&&that.ops.callback.apply(that,args);
						});	
					}else{
						that.container.remove();
						that.destroy(that);
						M.isFunction(that.ops.callback)&&that.ops.callback.apply(that,args);	
					};	
				}else{
					M('.mt-waiting-master').not('.alone').remove();
				};
			},
			renderLoading:function(){
				var className=['mt-loading-spinner','mt-spinner-container','mt-spinner-circle','mt-loading-inner'];
				for(var str='',i=0,name=['one','two','three'];i<name.length;i++){
					for(var stp='',j=1;j<=4;j++){
						stp+=M.renderHTML({
							proto:{'class':className[2]+j,style:{backgroundColor:'#76c377'}}
						});
					};
					str+=M.renderHTML({
						proto:{'class':className[1]+' '+name[i]},
						html:stp
					});
				};
				return M(M.creatlabel(),{
					'class':className[3],
					html:M.renderHTML({
						proto:{'class':className[0]},
						html:str
					})
				});
			},
			destroy:function(that){
				delete that;	
			}	
		};
		return {
			defaults:{
				id:null,
				warp:null,
				position:'fixed',
				offsetLeft:0,
				offsetTop:0,
				status:'loading',
				time:null,
				text:null,
				hide:true,
				src:{
					inner:'piel_black_1_1_alpha_2.png',
					loading:'loading.gif'
				},
				callback:function(){}
			},	
			creat:function(ops){
				return new Waiting(M.extend(true,{},this.defaults,ops)).creat([].slice.call(arguments,1));
			},
			dismiss:function(that,args,type){
				new Waiting().remove(that,args,type);
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);