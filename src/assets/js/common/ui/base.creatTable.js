/** 
 * 用途:表格自动生成
 * 作者:小马
 * 日期：2018/5/10
 * @import base.common.js 
 * @import base.scroll.js
 *
 * @wrapper	               		$object             (必选)最外层容器
 * @headText					[]					(必选)表头信息 		
 * @data						[]					(必选)数据
 * @prevEdit					Boolean				(选填)第一列是否有操作 							默认 false
 * @lastEdit					Boolean				(选填)最后一列是否有操作 							默认 false
 * @scroll						Boolean 			(选填)是否使用滚动条								默认false	
 * @key							[]					(必选)循环数据时，与表头对应的key	
 * @tableStyle					Number				(选填)表格风格 									默认4， (1：td边框+隔行变色，2：无隔行变色、td无边框，3：隔行变色+td边框，4：隔行变色、td无边框，5：table无边框+隔行变色)		
 * @allCheckCallback			Function			(选填)全选或全取消后回调	
 * @creatButton				Function			(必选)当lastEdit为true时有效，生成对应操作按钮
 * @buttonCallback				Function			(选填)操作按钮点击后回调函数
 */
;(function(M,window){
	M.ui.define('creatTable',function(){
		function CreatTable(ops,args){
			this.ops=ops;
			this.init(args);
		};
		CreatTable.prototype={
			constructor:CreatTable,
			init:function(args){
				this.creat(args);
				return this;
			},
			creat:function(args){
				this.ops.wrapper.html('')
				this.ops.wrapper.css({
					'height':this.ops.scroll.enable&&this.ops.scroll.direction=== 'x' ? this.ops.wrapperMaxHeight+'px' : (this.ops.wrapperMaxHeight+this.ops.headerHeight)+'px'
				}).html(M.renderHTML({
					name:'img',
					proto: {
						src:'../base/images/loading.gif',
						style:{
							'position': 'absolute',
							'width':'30px',
							'height':'30px',
							'left': '50%',
							'top': '50%'
						}
					}
				}))
				var data = this.ops.data,that = this;
				if(data !=''){
					setTimeout(function(){
						if(that.ops.scroll.enable){
							if(that.ops.scroll.direction === 'x'){
								that.ops.wrapper.html(M(that.creatHead()).append(that.creatBody()))
								that.creatScroll(that,that.ops.wrapper)
							}else{
								that.ops.wrapper.html(that.creatHead()+that.creatBodyBox())
								that.creatScroll(that,M('#'+that.scrollId))
							}
							M.isFunction(that.ops.callback)&&that.ops.callback(that);
						}
						that.addEvent(that);
					},500)
				}else{
					this.ops.wrapper.css('height','220px').html(M.renderHTML({
						name:'span',
						proto:{
							'class':'g-font14',
							style:{
								'position': 'absolute',
								'width':'100px',
								'height':'30px',
								'left': '50%',
								'top': '50%'
							}
						},
						html:'暂无数据'
					}))
				}
			},
			addEvent:function(that){
				M('#'+this.id).find('input.js-all-check').off('click').on('click',function(){
						that.allCheck.call(this,that)
				})
				var obj =  that.ops.scroll.enable&&that.ops.scroll.direction==='x' ? M('#'+this.id) : that.ops.scroll.enable&&that.ops.scroll.direction==='y' ? M('#'+this.scrollId) : '';
				obj.find('input.js-check').next().off('click').on('click',function(){
					if(M(this).prev().attr('checked')){
						M(this).prev().attr('checked', false)
					}else{
						M(this).prev().attr('checked', true)
					}
				})
				obj.find('a').off('click').on('click',function(){
					M.isFunction(that.ops.buttonCallback)&&that.ops.buttonCallback(M(this), that);
					//滚动条自适应
					if(that.scroll){
						that.scroll.refresh()
					}
				})
			},
			creatHead: function(){
				this.id='g-table-'+M.now();
				var styles = this.ops.tableStyle;
				this.tabHead = M.renderHTML({
						name: 'table',
						proto:{
							'id':this.id,
							'class':styles ===1 ? 'g-table g-table-border' : styles === 2 ? 'g-table g-table-border g-table-border-bottom' : styles ===3? 'g-table g-table-border g-table-bg' : styles === 4 ? 'g-table g-table-border g-table-border-bottom g-table-bg' : styles === 5 ? 'g-table g-table-border-bottom g-table-bg' :styles === 6 ? 'g-table-sm g-table g-table-border g-table-border-bottom g-table-bg' : ''	
						},
						html:M.renderHTML({
							name:'thead',
							proto:{
								'class':''
							},
							html: M.renderHTML({
								name: 'tr',
								proto: {
									'class': ''
								},
								html: (this.creatHeadTd(this.ops.headText))
							})
						})
				   })
				return this.tabHead
			},
			creatHeadTd: function(headData){
				var str = '',oldWidth = this.ops.headWidth,nwew = [];
				if(this.ops.headWidth.length > this.ops.headText.length){
					nwew = this.ops.prevEdit ? this.ops.headWidth.slice(1) : this.ops.headWidth;
					this.ops.lastEdit ? nwew.splice(nwew.length-1,1) : nwew;
				}else{
					nwew = this.ops.headWidth
				}
				str += this.ops.prevEdit ? M.renderHTML({
							name:'th',
							proto:{
								'class':'',
								'width':oldWidth[0]+'%'
							},
							html:M.renderHTML({
								name: 'label',
								proto:{
									'class':'middle'
								},
								html: this.creatAllCheckBox()
							})
						}):''
				for (var i = 0; i < headData.length; i++) {
					str += M.renderHTML({
								name:'th',
								proto:{
									'class' : '',
									'width': nwew!='' ? nwew[i]+'%' : ''
								},
								html: headData[i]
							}) 
				}
				str += this.ops.lastEdit ? M.renderHTML({
								name: 'th',
								proto: {
									'class':'',
									'width':oldWidth[oldWidth.length-1]+'%'
								},
								html:'操作'
							}) : ''
				return str;
			},
			creatBody: function(){
				this.tbody = M.renderHTML({
							name: 'tbody',
							proto: {
								'class':''
							},
							html: this.creatBodyTr(this.ops.data)
						})
				return this.tbody
			},
			creatBodyBox:function(){
				this.scrollId = 'scroll-'+M.now();
				var styles = this.ops.tableStyle;
				this.bodyBox = M.renderHTML({
					proto:{
						'id':this.scrollId,
						'style':{
							'position':'relative',
							'max-height':this.ops.wrapperMaxHeight+'px',
							'overflow': 'hidden',
							'width':'100%'
						}
					},
					html:M.renderHTML({
						name:'table',
						proto:{
							'class':styles ===1 ? 'g-table g-table-border' : styles === 2 ? 'g-table g-table-border g-table-border-bottom' : styles ===3? 'g-table g-table-border g-table-bg' : styles === 4 ? 'g-table g-table-border g-table-border-bottom g-table-bg' : styles === 5 ? 'g-table g-table-border-bottom g-table-bg' : styles === 6 ? 'g-table-sm g-table g-table-border g-table-border-bottom g-table-bg' : ''
						},
						html:this.creatBody()
					})
				})
				return this.bodyBox
			},
			creatBodyTr: function(data){
				for (var i = 0, str = ''; i < data.length; i++) {
					str += M.renderHTML({
						name: 'tr',
						proto:{
							'class': ''
						},
						html: (this.creatBodyTd(data[i]))
					})
				}
				return str;
			},
			creatBodyTd: function(data){
				var arr = this.ops.key,str = '',status = data.status,
				oldWidth = this.ops.headWidth,nwew = [];
				if(this.ops.headWidth.length > this.ops.headText.length){
					nwew = this.ops.prevEdit ? this.ops.headWidth.slice(1) : this.ops.headWidth;
					this.ops.lastEdit ? nwew.splice(nwew.length-1,1) : nwew;
				}else{
					nwew = this.ops.headWidth
				}
				str += this.ops.prevEdit ? M.renderHTML({
						name:'td',
						proto: {
							'width':oldWidth[0]+'%',
							'class':'g-text-center'
						},
						html:this.creatCheckBox()
					}) : '';
				for (var i = 0; i < arr.length; i++) {
					if(typeof arr[i] === 'object' && arr[i].textOverflow){
						str += M.renderHTML({
							name:'td',
							proto:{
								'width': nwew!='' ? nwew[i]+'%' : '',
								'class':arr[i].className
							},
							html:M.renderHTML({
								proto:{
									'class':"g-table-nowrap",
									'title':data[arr[i].name]
								},
								html:data[arr[i].name]
							})
						})
					}else if(typeof arr[i] === 'object' && !arr[i].textOverflow){
						str += M.renderHTML({
							name:'td',
							proto:{
								'width': nwew!='' ? nwew[i]+'%' : '',
								'class':arr[i].className
							},
							html:data[arr[i].name]
						})
					}else{
						str += M.renderHTML({
							name:'td',
							proto:{
								'width': nwew!='' ? nwew[i]+'%' : '',
								'class':"g-text-center"
							},
							html:data[arr[i]]
						})
					}
					
				}
				str += this.ops.lastEdit ? M.renderHTML({
						name:'td',
						proto: {
							'width':oldWidth[oldWidth.length-1]+'%',
							'class':'g-text-center'
						},
						html:this.ops.lastEdit ? this.ops.creatButton(data.status) :''
					}) : '';
				return str;
			},
			creatAllCheckBox: function(){
				return M.renderHTML({
						name:'input',
						proto:{
							'class':'g-form-check js-all-check',
							'type':'checkbox'
						}
						})+M.renderHTML({
							name:'span',
							proto: {
								'class':'g-form-lbl'
							}
						})
			},
			creatCheckBox: function(){
				return M.renderHTML({
						name:'input',
						proto:{
							'class':'g-form-check js-check',
							'type':'checkbox'
						}
						})+M.renderHTML({
							name:'span',
							proto: {
								'class':'g-form-lbl'
							}
						})
			},
			allCheck: function(that){
				var inputs = that.ops.scroll.enable&&that.ops.scroll.direction==='x' ? M('#'+that.id).find('.js-check') :  that.ops.scroll.enable&&that.ops.scroll.direction==='y'? M('#'+that.scrollId).find('.js-check') :'';
				if(M(this).attr('checked')){
					for(var i=0; i<inputs.length; i++){
						M(inputs[i]).attr('checked',true)
					}
				}else{
					for(var i=0; i<inputs.length; i++){
						M(inputs[i]).attr('checked',false)
					}
				}
				M.isFunction(that.ops.allCheckCallback)&&that.ops.allCheckCallback(inputs);
			},
			creatScroll:function(that,obj){
				that.scroll = M.ui.scroll.init({
					scrollbar:{
						enabled:true,
						place:true,
						style:{
							marginLeft:0,
							marginRight:0,
							marginTop:0,
							marginBottom:0,
							size:5
						}	
					},
					direction:this.ops.scroll.direction,
					container:obj,
					mousewheel:true,
					mouseWheelSpeed:20,
					callback:function(){},
					onScroll:function(){},
					resize:function(){}
				})
			}
		};
		return {
			defaults:{
				wrapper:null,
				headText: [],
				data: {},
				wrapperMaxHeight:300,
				headerHeight:40,
				prevEdit: false,
				scroll: {
					enable: false,
					direction: 'x'
				},
				lastEdit: false,
				key: [],
				tableStyle:4,
				headWidth:[],
				creatButton: function(status){},
				allCheckCallback: function(){},
				buttonCallback: function(o){},
				callback:function(){}
			},	
			init:function(ops){
				return new CreatTable(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);