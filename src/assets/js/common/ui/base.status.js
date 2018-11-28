/** 
 * 提示框控件
 * created by mr.x on 16/04/15.
 * @import common/fx.common.js 
 *
 * @id                     		string              (可选)对象id										默认 null
 * @drag	               		boolean             (可选)是否允许拖拽			     					默认 true
 * @html              			string              (可选)内容  		 								默认 null 
 * @title              			string              (可选)标题,支持html标签 	  		 				默认 系统提示
 * @position               		string              (必须)定位方式      	   		 					默认 fixed ⇒ fixed/absolute
 * @status              		boolean             (可选)icon状态			  		 				默认 null
 * @is_close_button	            boolean             (可选)是否允许关闭按钮			     				默认 false
 * @time                   		number              (可选)自动消失时间        		 					默认 null
 * --@button			  	  	object				
 * --''href''     	  		  	string      		(可选)按钮链接										默认 null    
 * --''html''     	  		  	string      		(可选)按钮文字,支持html标签							默认 '关闭'  
 * --''callback''     	  		function      		(可选)点击回调								
 * @close               		function            (可选)关闭之后回调
 */
;(function(M,window){
	M.ui.define('status',function(){
		function Status(ops,args){
			this.ops=ops;
			this.init(args);
		};
		Status.prototype={
			constructor:Status,
			init:function(args){
				this.creat(args);
				return this;
			},
			creat:function(args){
				this.titleHeight=M.isString(this.ops.title)?51:0;
				this.innerHeight=M(window).height();
				this.scrollTop=/absolute/g.test(this.ops.position)?M(window).scrollTop():0;
				this.icon={'true':M.Font.check_fill_lighter,'false':M.Font.close_fill}[this.ops.status+''];
				this.container=M(M.creatlabel(),{
					'class':'g-master-container g-status-master',
					id:this.ops.id||'g-status-'+M.now(),
					css:{
						opacity:0,
						height:M(document).height(),
						position:'absolute',
						zIndex:M.now()
					}	
				});
				this.content=M(M.creatlabel(),{
					'class':'g-master-content',
					css:{
						position:this.ops.position	
					}
				});
				if(M.isString(this.ops.title)){
					this.title=this.renderTitle();
					this.content.append(this.title);
					if(this.ops.drag){
						M.ui.drag.init({target:this.title,container:this.content});
					};
				};
				if(this.ops.is_close_button){
					this.close=this.renderClose();
					this.content.append(this.close);
					this.close.bind('click',{context:this,args:args},this.clear);
				};
				this.body=this.renderBody();
				this.button=this.renderButton();
				this.button.bind('click',{context:this,args:args},this.submit);
				this.body.append(this.button);
				this.content.append(this.body);
				M(document.body).append(this.container.append(this.content));
				this.resolve(args);
			},
			resolve:function(args){
				var that=this,width=Math.max(350,this.content.outerWidth(true)),height=this.content.outerHeight(true);
				this.container.fadeTo(300,1);
				this.content.css({
					left:'50%',
					opacity:0,
					marginLeft:-0.5*width,
					width:width,
					top:(this.innerHeight-this.titleHeight-height)*0.5+this.scrollTop,
					marginTop:-30,
					"box-sizing":"content-box"
				}).animate({marginTop:0,opacity:1},300,function(){
					delete that.titleHeight;
					delete that.body;
					delete that.scrollTop;
					delete that.innerHeight;
					delete that.icon;
					delete that.title;
					that.dismiss(args);		
				});	
			},
			dismiss:function(args){
				M.isNumeric(this.ops.time)&&M.delay(this.ops.time,function(){
					this.remove(this,args);	
				},this);
			},
			remove:function(that,args){
				this.content.animate({top:this.content.position().top+30,opacity:0},300,function(){
					that.container.remove();
					M.isFunction(that.ops.close)&&that.ops.close.apply(that,args);
					that.destroy(that);
				});	
				that.container.fadeOut(300);
			},
			submit:function(e){
				var that=e.data.context,args=e.data.args;
				M.isFunction(that.ops.button.callback)&&that.ops.button.callback.apply(that,args);
				that.ops.button.href==null&&that.remove(that,args);		
			},
			clear:function(e){
				var that=e.data.context;
				that.remove(that,e.data.args);
				return false;	
			},
			renderBody:function(){
				return M(M.creatlabel(),{
					'class':'g-master-body clear g-text-center pad-bottom-20',
					html:M.renderHTML({
						proto:{
							'class':'g-status-content'
						},
						html:(this.icon?this.renderIcon():'')+this.ops.html
					})
				});	
			},
			renderIcon:function(){
				return M.renderHTML({
					name:'em',
					proto:{
						'class':'iconfont g-status-icon middle '+this.ops.status.toString()
					},
					html:this.icon
				});	
			},
			renderButton:function(){
				return M(M.creatlabel('a'),{
					'class':'g-status-submit',
					href:this.ops.button.href||'javascript:;',
					html:this.ops.button.html
				});	
			},
			renderClose:function(){
				return M(M.creatlabel(),{
					'class':'g-master-close'
				});	
			},
			renderTitle:function(){
				return M(M.creatlabel(),{
					'class':'g-master-head',
					html:M.renderHTML({
						proto:{
							'class':'title'
						},
						html:this.ops.title
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
				drag:true,
				title:'系统提示',
				position:'fixed',
				html:null,
				status:null,
				time:null,
				is_close_button:false,
				button:{
					href:null,
					html:'关闭',
					callback:function(){}
				},
				close:function(){}
			},	
			init:function(ops){
				return new Status(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);