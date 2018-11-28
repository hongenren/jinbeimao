/** 
 * 时间选择器
 * created by mr.x on 16/06/01.
 * @import common/fx.common.js 
 *
 * @target   				  		object        			(必须)触发源					          					默认 null
 * @format    	  	  	  	  		string      			(可选)显示格式												默认 hh:mm:ss ⇒ hh时mm分ss秒
 * @auto    	  	  	  	 		boolean      			(可选)是否初始化自动赋值										默认 false
 * --@hour/@minute/@second    		object
 * --''select''     	  	  		number      			(可选)指定时间												默认 null    
 * --''min''     	  	  	  		number		      		(可选)最小时间												默认 0  
 * --''max''     	 	  	 		number      			(可选)最大时间												默认 23/59
 * --''interval''     	  	 		number      			(可选)间隔												默认 1 
 * --''data''     	 	 	  		array      				(可选)自定义数据											默认 null    
 * --''skip''     	 	  	 		array      				(可选)需要屏蔽数据											默认 []    
 * @callback                  		function            	(可选)初始化完成回调
 * @choose                    		function            	(可选)选择完成回调
 */
;(function(M,window){
	M.ui.define('time',function(){
		function Time(ops,args){
			this.ops=ops;
			this.init(args);
		};
		Time.prototype={
			constructor:Time,
			versions:'1.0.0',
			init:function(args){
				if(!this.ops.target.length) return;
				this.args=args;
				this.key='hour|minute|second'.split('|');
				this.disClassName='disabled';
				this.getAuto(function(){
					this.ops.auto&&this.set();
					this.ops.target.bind('click',function(){
						M(document.getElementsByClassName('mt-pop-container')).hide();
						if(this.container){
							this.container.show();
							this.size();
						}else{
							this.create();
						};
						return false;
					}.bind(this));
					M.isFunction(this.ops.callback)&&this.ops.callback.apply(this,this.args);
				});
				return this;
			},
			getDateInfo:function(date){
				date=date||new Date();
				return {
					year:date.getFullYear(),
					month:date.getMonth()+1,
					day:date.getDate(),
					hour:date.getHours(),
					minute:date.getMinutes(),
					second:date.getSeconds()
				};
			},
			getNewDate:function(Y,M,D,h,m,s){
				return new Date(Y,M-1,D,h,m,s);	
			},
			putArray:function(arr){
				var a={},b=[],c=[],j;
				for(var i=0;i<arr.length;i++){
					M.isNumeric(arr[i])&&!a[arr[i]]&&(a[arr[i]]=arr[i]);
				};
				for(j in a){
					b.push(a[j]);
				};
				b=b.sort(function(m,n){
					return m-n;	
				});
				for(j=0;j<b.length;j++){
					parseInt(b[j])>=0&&c.push(parseInt(b[j]));
				};
				return c;
			},
			setIndex:function(a,b){
				if(a<=b[0]){
					return {
						index:0,
						value:b[0]	
					};
				}else if(a>b[b.length-1]){
					return {
						index:b.length-1,
						value:b[b.length-1]	
					};
				}else{
					for(var i=0;i<b.length;i++){
						if(a>b[i]&&a<b[i+1]){
							if(a-b[i]>b[i+1]-a){
								return {
									index:i+1,
									value:b[i+1]	
								};
							}else{
								return {
									index:i,
									value:b[i]	
								};	
							};
						};
					};
				};
			},
			getAuto:function(fn){
				for(var i=0,max={hour:23,minute:59,second:59},info=this.getDateInfo();i<this.key.length;i++){
					this.ops[this.key[i]].min=Math.max(0,this.ops[this.key[i]].min);
					this.ops[this.key[i]].max=Math.min(max[this.key[i]],this.ops[this.key[i]].max);
					if(this.ops[this.key[i]].skip.length){
						this.ops[this.key[i]].skip=this.putArray(this.ops[this.key[i]].skip);
					};
					if(!M.isArray(this.ops[this.key[i]].data)){
						this.ops[this.key[i]].data=[];
						var j=this.ops[this.key[i]].min,m=Math.max(1,this.ops[this.key[i]].interval);
						while(j<=this.ops[this.key[i]].max){
							if(M.getArrayIndex(this.ops[this.key[i]].skip,j)<0){
								this.ops[this.key[i]].data.push(j);	
							};
							j+=m;
						};
					};
					this.get(this.key[i],this.ops[this.key[i]].select||info[this.key[i]]);
				};
				this.compile();
				fn.call(this);	
			},
			create:function(){
				this.container=this.creatContainer();
				this.main=this.creatElement('mt-pop-content');
				this.content=this.creatElement('mt-picker-main');
				this.main.append(this.content);
				this.creatItem();
				this.container.append(this.main);
				M(document.body).append(this.container);
				this.size();
				M(window).bind('resize',function(e){
					this.size();	
				}.bind(this));
				M(document).bind('click',{context:this},this.hide);
				this.container.stopPropagation();
				delete this.main;
			},
			creatItem:function(){
				this.list={};
				for(var i=0,info=this.getDateInfo();i<this.key.length;i++){
					this.list[this.key[i]]=this.list[this.key[i]]||{};
					this.list[this.key[i]].main=this.creatElement('mt-picker-item');
					this.list[this.key[i]].prev=this.creatElement('mt-picker-button prev').html(this.renderIcon(M.Font.arrow_up_empty));
					this.list[this.key[i]].next=this.creatElement('mt-picker-button next').html(this.renderIcon(M.Font.arrow_down_empty));
					this.list[this.key[i]].box=this.creatElement('mt-picker-box');
					this.list[this.key[i]].input=this.creatInput(M.formatDate(this.ops[this.key[i]].select));
					if(this.ops[this.key[i]].data.length<=1){
						this.list[this.key[i]].prev[0].className=this.list[this.key[i]].prev[0].className.concat(String.fromCharCode(32)).concat(this.disClassName);
						this.list[this.key[i]].next[0].className=this.list[this.key[i]].next[0].className.concat(String.fromCharCode(32)).concat(this.disClassName);
						this.list[this.key[i]].input[0].className=this.list[this.key[i]].input[0].className.concat(this.disClassName);
						this.list[this.key[i]].input[0].disabled=true;
					};
					this.list[this.key[i]].box.append(this.list[this.key[i]].input);
					this.list[this.key[i]].main.append(this.list[this.key[i]].prev);
					this.list[this.key[i]].main.append(this.list[this.key[i]].box);
					this.list[this.key[i]].main.append(this.list[this.key[i]].next);
					this.content.append(this.list[this.key[i]].main);
					if(i!=this.key.length-1){
						this.content.append(this.creatElement('mt-picker-separator').html('：'));
					};
					delete this.list[this.key[i]].box;
					delete this.list[this.key[i]].main;	
					this.disabled(this.key[i]);
					this.list[this.key[i]].prev.bind('click',{context:this,type:this.key[i]},this.prevTime);
					this.list[this.key[i]].next.bind('click',{context:this,type:this.key[i]},this.nextTime);
					this.list[this.key[i]].input.bind('blur',{context:this,type:this.key[i]},this.blurTime);
				};	
			},
			prevTime:function(e){
				if(!/disabled/g.test(this.className)){
					var that=e.data.context,type=e.data.type;
					that.ops[type].index--;
					that.changeTime(type);
				};	
			},
			nextTime:function(e){
				if(!/disabled/g.test(this.className)){
					var that=e.data.context,type=e.data.type;
					that.ops[type].index++;
					that.changeTime(type);
				};	
			},
			changeTime:function(type){
				this.ops[type].select=this.ops[type].data[this.ops[type].index];
				this.disabled(type);
				this.compile();
				this.set();
				this.list[type].input[0].value=M.formatDate(this.ops[type].select);
			},
			blurTime:function(e){
				var that=e.data.context,type=e.data.type;	
				if(/^[0-9]\d*$/.test(this.value)){
					that.get(type,Number(this.value));
					that.changeTime(type);
				}else{
					this.value=M.formatDate(that.ops[type].select);
				};
			},
			disabled:function(type){
				if(this.ops[type].index==0){
					this.list[type].prev.addClass(this.disClassName);
					this.list[type].next.removeClass(this.disClassName);
				}else if(this.ops[type].index==this.ops[type].data.length-1){
					this.list[type].next.addClass(this.disClassName);
					this.list[type].prev.removeClass(this.disClassName);
				}else{
					this.list[type].prev.removeClass(this.disClassName);
					this.list[type].next.removeClass(this.disClassName);
				};	
			},
			set:function(){
				this.ops.target[0].value=this.ops.select;
				M.isFunction(this.ops.choose)&&this.ops.choose.apply(this,this.args);
			},
			compile:function(){
				var format=this.format();
				this.ops.select=format.str;
				for(var i=0;i<this.key.length;i++){
					this.ops.select=this.replace(this.ops.select,this.ops[this.key[i]].select,format.get[this.key[i]]);
				};	
			},
			get:function(type,value){
				if(this.ops[type].data.length){
					var index=M.getArrayIndex(this.ops[type].data,value);
					if(index<0){
						var info=this.setIndex(value,this.ops[type].data);
						this.ops[type].index=info.index;
						this.ops[type].select=info.value;
					}else{
						this.ops[type].index=index;
						this.ops[type].select=value;
					};
				}else{
					this.ops[type].index=-1;
					this.ops[type].select=value;
				};	
			},
			format:function(){
				return {
					str:M.trim(this.ops.format),
					get:{
						hour:/h+/g,
						minute:/m+/g,
						second:/s+/g
					}
				};
			},
			replace:function(str,value,reg){
				return str.replace(reg.exec(str)[0],function(a,b,c){
					return M.formatDate(value.toString());
				});
			},
			size:function(){
				var o=M(window),
					width=this.ops.target.outerWidth(true),
					height=this.ops.target.outerHeight(true),
					offsetLeft=this.ops.target.offset().left,
					offsetTop=this.ops.target.offset().top,
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
				this.container[0].className='mt-pop-container'.concat(String.fromCharCode(32)).concat(name[index]);
				this.container.css({
					0:{left:offsetLeft,top:offsetTop+height},
					1:{left:offsetLeft-targetWidth+width,top:offsetTop+height},
					2:{left:offsetLeft,top:offsetTop-targetHeight},
					3:{left:offsetLeft-targetWidth+width,top:offsetTop-targetHeight}	
				}[index]);
			},
			creatInput:function(value){
				return M(M.creatlabel('input'),{
					type:'text',
					autocomplete:'off',
					value:value,
					valtype:'positiveInteger'
				});
			},
			renderIcon:function(text){
				return M.renderHTML({
					name:'i',
					proto:{
						'class':'iconfont'
					},
					html:text
				});	
			},
			creatElement:function(name){
				return M(M.creatlabel(),{
					'class':name
				});	
			},
			creatContainer:function(){
				return M(M.creatlabel(),{
					'class':'mt-pop-container',
					id:'mt-time-'+M.now(),
					css:{
						zIndex:M.now()	
					},
					html:M.renderHTML({
						proto:{
							'class':'mt-pop-shadow'
						}
					})
				});	
			},
			hide:function(e){
				(e?e.data.context:this).container.hide();	
			},
			destroy:function(that){
				delete that;	
			}	
		};
		return {
			defaults:{
				target:null,
				format:'hh:mm:ss',
				auto:false, 
				hour:{
					interval:1,
					min:0,
					max:23,
					data:null,
					select:null,
					skip:[]	
				},
				minute:{
					interval:1,
					min:0,
					max:59,
					data:null,
					select:null,
					skip:[]	
				},
				second:{
					interval:1,
					min:0,
					max:59,
					data:null,
					select:null,
					skip:[]	
				},
				callback:function(){},
				choose:function(){}
			},	
			init:function(ops){
				return new Time(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);