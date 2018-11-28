/** 
 * 日历
 * created by mr.x on 16/05/24.
 * @import common/fx.common.js 
 *
 * @target                    object        		(必须)触发源					          									默认 null
 * --@date					  object
 * --''format''     	  	  string      			(必须)显示格式																默认 YYYY-MM-DD ⇒ YYYY/MM/DD  YYYYMMDD  YYYY年MM月DD日 
 * --''select''     	  	  string      			(可选)指定当前日期,格式需要与format保持一致									默认 null    
 * --''min''     	  	  	  string		      	(可选)最小日期,格式需要与format保持一致,支持now相当于当前日期					默认 null   ⇒ now  
 * --''max''     	 	  	  string      			(可选)最大日期,格式需要与format保持一致,支持now相当于当前日期					默认 null   ⇒ now
 * --''interval''     	  	  number      			(可选)距离指定当前日期N天(最大28),指定当前日期会根据这个天数改变,select存在则无效	默认 0 
 * --@time					  object
 * --''format''     	  	  string      			(可选)显示格式																默认 hh:mm:ss ⇒ hh:mm:ss  hh时mm分ss秒 
 * --''select''     	  	  string      			(可选)指定当前时间,格式需要与format保持一致									默认 null    
 * --''min''     	  	  	  string		      	(可选)最小时间,格式需要与format保持一致,支持now相当于当前时间					默认 null	 ⇒ now 
 * --''max''     	 	  	  string      			(可选)最大时间,格式需要与format保持一致,支持now相当于当前时间					默认 null	 ⇒ now  
 * --''enabled''     	  	  boolean      			(可选)是否展示时间选择														默认 true    
 * @number    	  	  	  	  number      			(必须)级联个数	,最多为5个													默认 2
 * @skip    	  	  	  	  array      			(可选)快捷限制选择区域,格式需要与format保持一致									默认 []
 * @together    	  	  	  boolean      			(可选)是否可以同时选择开始和结束日期,为true时fast->false,auto->false			默认 false 
 * @separator    	  	  	  string      			(可选)和together一块使用,开始日期和结束日期连接符								默认 ~ 
 * @toggle    	  	  	  	  number      			(必须)单次左右切换月份个数,最大不超过级联个数									默认 2
 * @weekend    	  	  	  	  boolean      			(可选)是否写入星期															默认 false
 * @auto    	  	  	  	  boolean      			(可选)是否初始化自动赋值	,和selected搭配使用,仅	together=false生效				默认 false
 * @fast    	  	  	  	  boolean      			(可选)是否可快速选择月份年份,为true则number强制变为1							默认 false
 * --@tool     	  		  						
 * --''clear''     	  	  	  boolean      			(可选)是否显示清除按钮														默认 true   
 * --''today''     	  	      boolean      			(可选)是否显示快速定位今天按钮												默认 true   
 * --@relative				  object
 * --''type''     	  	  	  string      			(可选)联动类型																默认 null ⇒ 'stop'结束日期  'start'开始日期 
 * --''point''     	  	 	  object      			(可选)联动日历对象															默认 null    
 * @callback                  function            	(可选)初始化完成回调
 * @choose                    function            	(可选)选择完成回调
 */
;(function(M,window){
	M.ui.define('calendar',function(){
		function Calendar(ops,args){
			this.ops=ops;
			this.init(args);
		};
		Calendar.prototype={
			constructor:Calendar,
			versions:'2.0.0',
			init:function(args){
				if(!this.ops.target.length) return;
				this.args=args;
				this.ops.interval=Math.min(this.ops.interval,28);
				this.ops.number=Math.min(this.ops.number,5);
				if(this.ops.together){
					this.ops.fast=false;
				};
				if(this.ops.fast){
					this.ops.number=1;	
				};
				this.ops.toggle=Math.min(this.ops.number,this.ops.toggle);
				this.id=Math.random().toString(36).substr(2);
				this.disClassName='disabled';
				this.distance=183;
				this.key='date|time|select|min|max|year|month|day|hour|minute|second'.split('|');
				this.getAuto(function(){
					this.ops.auto&&!this.ops.together&&this.setValue();
					this.ops.target.bind('click',function(){
						M(document.getElementsByClassName('g-pop-container')).hide();
						if(this.container){
							if(!this.ops.together){
								this.cacheDate=this.getDateMill(this.ops.date.select,this.ops.time.select);
							}else{
								if(this.ops.date.start){
									var start=this.getExecInfo(this.ops.date.start,this.key[0]),cache=this.getDateInfo(this.cacheDate);
									this.cacheDate=this.getNewDate(start.year,start.month,start.day,cache.hour,cache.minute,cache.second);	
								};
							};
							this.creatItem();
							this.disabled();
							if(this.ops.together){
								this.autoChange();
							}else{
								for(var i=0;i<this.list.length;i++){
									this.list[i]._month&&delete this.list[i]._month;
									this.list[i]._year&&delete this.list[i]._year;
								};
							};
							this.tip&&this.tip.hide();
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
			getAuto:function(fn){
				var date=this.getDateInfo(),m_date,min_date,max_date;
				if(!this.ops.date.select){
					this.compile(this.key[0],1,date.year,date.month,date.day+this.ops.date.interval,date.hour,date.minute,date.second);
				};
				if(!this.ops.time.select){
					this.compile(this.key[1],1,date.year,date.month,date.day+this.ops.date.interval,date.hour,date.minute,date.second);
				};
				if(!this.cacheDefault){
					this.cacheDefault={
						date:this.ops.date.select,
						time:this.ops.time.select
					};
				};
				m_date=this.getDateInfo(this.getDateMill(this.ops.date.select,this.ops.time.select));
				if(!this.ops.date.min){
					min_date=this.getDateInfo(this.getNewDate(m_date.year-100,m_date.month,m_date.day+this.ops.date.interval,m_date.hour,m_date.minute,m_date.second));
					this.compile(this.key[0],2,min_date.year,min_date.month,min_date.day,min_date.hour,min_date.minute,min_date.second);
				}else if(/now/g.test(this.ops.date.min)){
					this.compile(this.key[0],2,date.year,date.month,date.day,date.hour,date.minute,date.second);
				};
				if(!this.ops.date.max){
					max_date=this.getDateInfo(this.getNewDate(m_date.year+100,m_date.month,m_date.day+this.ops.date.interval,m_date.hour,m_date.minute,m_date.second));
					this.compile(this.key[0],3,max_date.year,max_date.month,max_date.day,max_date.hour,max_date.minute,max_date.second);
				}else if(/now/g.test(this.ops.date.max)){
					this.compile(this.key[0],3,date.year,date.month,date.day,date.hour,date.minute,date.second);
				};
				if(!this.ops.time.min){
					min_date=this.getDateInfo(this.getNewDate(m_date.year-100,m_date.month,m_date.day+this.ops.date.interval,0,0,0))
					this.compile(this.key[1],2,min_date.year,min_date.month,min_date.day,min_date.hour,min_date.minute,min_date.second);
				}else if(/now/g.test(this.ops.time.min)){
					this.compile(this.key[1],2,date.year,date.month,date.day,date.hour,date.minute,date.second);
				};
				if(!this.ops.time.max){
					max_date=this.getDateInfo(this.getNewDate(m_date.year+100,m_date.month,m_date.day+this.ops.date.interval,23,59,59))
					this.compile(this.key[1],3,max_date.year,max_date.month,max_date.day,max_date.hour,max_date.minute,max_date.second);
				}else if(/now/g.test(this.ops.time.max)){
					this.compile(this.key[1],3,date.year,date.month,date.day,date.hour,date.minute,date.second);
				};
				this.pass();
				if(!this.cacheDate){
					this.cacheDate=this.getDateMill(this.ops.date.select,this.ops.time.select);
				};
				if(this.ops.together||this.getDateMill(this.ops.date.min,this.ops.time.min).getTime()>this.getNewDate(date.year,date.month,date.day,date.hour,date.minute,date.second).getTime()){
					this.ops.tool.today=false;
				};
				date=min_date=max_date=null;
				fn.call(this);
			},
			getDateMill:function(date,time){
				var date=this.getExecInfo(date,this.key[0]),time=this.getExecInfo(time,this.key[1]);
				return this.getNewDate(date.year,date.month,date.day,time.hour,time.minute,time.second);
			},
			pass:function(){
				var current=this.getDateMill(this.ops.date.select,this.ops.time.select).getTime(),
					min=this.getDateMill(this.ops.date.min,this.ops.time.select).getTime(),
					max=this.getDateMill(this.ops.date.max,this.ops.time.select).getTime();
				var date=this.getDateInfo(new Date(Math.min(max,Math.max(current,min))));
				this.compile(this.key[0],1,date.year,date.month,date.day,date.hour,date.minute,date.second);
				this.compile(this.key[1],1,date.year,date.month,date.day,date.hour,date.minute,date.second);
			},
			getExecInfo:function(data,type){
				var param=this.format()[type],o={};
				for(var i in param.get){
					var exec=param.get[i].r.exec(param.format);
					o[i]=Number(data.substr(exec.index,param.get[i].s&&exec[0].length==2?4:exec[0].length));
				};
				return o;
			},
			compile:function(name,type,year,month,day,hour,minute,second){
				this.ops[name][{1:this.key[2],2:this.key[3],3:this.key[4]}[type]]=this.ops[name].format;
				this.set(name,{1:this.key[2],2:this.key[3],3:this.key[4]}[type],{
					date:{
						year:year,
						month:month,
						day:day	
					},
					time:{
						hour:hour,
						minute:minute,
						second:second	
					}
				}[name]);	
			},
			set:function(type,name,param){
				var data=this.format()[type];
				this.ops[type][name]=data.format;
				for(var i in data.get){
					this.ops[type][name]=this.replace(this.ops[type][name]||data.format,param[i],data.get[i]);
				};
			},
			format:function(){
				return {
					date:{
						format:M.trim(this.ops.date.format),
						get:{
							year:{r:/Y+/g,s:1},
							month:{r:/M+/g,s:0},
							day:{r:/D+/g,s:0}
						}
					},
					time:{
						format:M.trim(this.ops.time.format),
						get:{
							hour:{r:/h+/g,s:0},
							minute:{r:/m+/g,s:0},
							second:{r:/s+/g,s:0}
						}
					}	
				};
			},
			replace:function(str,value,reg){
				return str.replace(reg.r.exec(str)[0],function(a,b,c){
					return M.formatDate(value.toString()).substr(reg.s?a.length==4?0:2:0);
				});
			},
			getDateInfo:function(date){
				date=date||new Date();
				return {
					year:date.getFullYear(),
					month:date.getMonth()+1,
					day:date.getDate(),
					hour:date.getHours(),
					minute:date.getMinutes(),
					second:date.getSeconds(),
					weekend:date.getDay()	
				};
			},
			getNewDate:function(Y,M,D,h,m,s){
				return new Date(Y,M-1,D,h,m,s);	
			},
			getMonthLen:function(year,month){
				var nextMonth=new Date(year,month,1);
				nextMonth.setHours(nextMonth.getHours()-3);
				return nextMonth.getDate(); 
			},
			getFirstDay:function(year,month){
				return new Date(year,month-1,1).getDay();
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
				this.container[0].className='g-pop-container'.concat(String.fromCharCode(32)).concat(name[index]);
				this.container.css({
					0:{left:offsetLeft,top:offsetTop+height},
					1:{left:offsetLeft-targetWidth+width,top:offsetTop+height},
					2:{left:offsetLeft,top:offsetTop-targetHeight},
					3:{left:offsetLeft-targetWidth+width,top:offsetTop-targetHeight}	
				}[index]);
			},
			create:function(){
				this.container=this.creatContainer();
				this.content=this.creatContent();
				this.prev=this.creatMonthButton(1);
				this.next=this.creatMonthButton(2);
				this.group=this.creatElement('g-calendar-group');
				this.main=this.creatElement('relative pad-bottom-5');
				this.group.append(this.main);
				this.creatItem();
				if(this.ops.time.enabled||this.ops.tool.clear||this.ops.tool.today){
					this.button=this.creatElement('g-calendar-button');
					if(this.ops.tool.clear){
						this.clear=M(M.creatlabel('a'),{
							'class':'btn',
							href:'javascript:;',
							html:'清空'
						});	
						this.button.append(this.clear);
						this.clear.bind('click',{context:this},this.clearValue);
					};
					if(this.ops.tool.today){
						this.today=M(M.creatlabel('a'),{
							'class':'btn',
							href:'javascript:;',
							html:'今天'
						});	
						this.button.append(this.today);
						this.today.bind('click',{context:this},this.goToday);
					};
					if(this.ops.time.enabled){
						this.time=this.creatElement('g-calendar-time');
						this.tip=M(M.creatlabel('span'),{
							'class':'g-calendar-time-tip'.concat(String.fromCharCode(32)).concat(this.ops.number==1?'y':'x'),
							html:this.renderTip()
						});	
						this.creatTime(function(hour,minute,second){
							this.time.append(hour);
							this.time.append(this.creatSeparator());
							this.time.append(minute);
							this.time.append(this.creatSeparator());
							this.time.append(second);
							this.time.append(this.tip);
						});
						this.button.append(this.time);
					};
					this.main.after(this.button);
				};
				this.content.append(this.prev).append(this.next).append(this.group);
				this.container.append(this.content).hide();
				M(document.body).append(this.container);
				this.disabled();
				this.size();
				M(window).bind('resize',function(e){
					this.size();	
				}.bind(this));
				M(document).bind('click',{context:this},this.hide);
				this.container.show().stopPropagation();
				this.prev.bind('click',{type:-this.ops.toggle,context:this},this.change);
				this.next.bind('click',{type:this.ops.toggle,context:this},this.change);
				this.ops.time.enabled&&this.setEvent();		
				delete this.group;
				delete this.content;
				delete this.button;
				delete this.time;
				delete this.clear;
				//delete this.today;
			},
			setEvent:function(){
				var name=this.key.slice(8,11);
				for(var i=0;i<name.length;i++){
					//this[name[i]].main.bind('mouseover',{context:this,type:name[i]},this.showTime);
					//this[name[i]].main.bind('mouseout',{context:this,type:name[i]},this.fadeTime);
					if(!this[name[i]].scroll){
						this[name[i]].scroll=M.ui.scroll.init({
							scrollbar:{
								className:'g-calendar-time-scroll',
								style:{
									marginLeft:0,
									marginRight:0,
									marginTop:5,
									marginBottom:5,
									size:3
								}	
							},
							resize:false,
							container:this[name[i]].warp,
							mouseWheelSpeed:20,
							callback:function(that){
								that[name[i]].inner.addClass('hide');
								delete that[name[i]].main;
								delete that[name[i]].warp;
								this.ops.content.children().children().bind('click',{context:that,type:name[i]},that.selectTime);
							}
						},this);	
					};	
				};
			},
			showTime:function(e){
				var that=e.data.context,type=e.data.type;	
				that[type].inner.show().addClass('in');
			},
			fadeTime:function(e){
				var that=e.data.context,type=e.data.type;	
				that[type].inner.addClass('out');
				M.delay(310,function(){
					that[type].inner.removeClass('out').removeClass('in').hide();	
				});
			},
			selectTime:function(e){
				if(!/selected/g.test(this.className)){
					var target=M(this),that=e.data.context,type=e.data.type,value=Number(this.innerHTML),data=that.getDateInfo(that.cacheDate);
					that[type].text[0].innerHTML=M.formatDate(value);
					that[type].inner.hide();
					target.addClass('selected').parent().siblings().children().removeClass('selected');
					data[type]=value;
					that.set(that.key[1],that.key[2],{
						hour:data.hour,
						minute:data.minute,
						second:data.second	
					});	
					that.cacheDate=that.getNewDate(data.year,data.month,data.day,data.hour,data.minute,data.second);	
					that.ops.auto&&that.setValue();
					M.delay(300,function(){
						that[type].inner[0].removeAttribute('style');	
					});
				};
			},
			creatTime:function(fn){
				var data=this.getDateInfo(this.cacheDate);
				for(var i=0,name=this.key.slice(8,11),number={hour:24,minute:60,second:60};i<name.length;i++){
					this[name[i]]=this[name[i]]||{};
					this[name[i]].main=this.creatElement('g-calendar-time-item');
					this[name[i]].text=M(M.creatlabel('em'),{
						'class':'number',
						html:M.formatDate(data[name[i]])
					});
					this[name[i]].inner=this.creatElement('g-calendar-time-box'.concat(String.fromCharCode(32)).concat(name[i]));
					this[name[i]].inner.append(M(M.creatlabel('i'),{
						'class':'iconfont',
						html:M.Font.arrow_down_fill
					}));
					this[name[i]].box=this.creatElement('box');
					this[name[i]].warp=this.creatElement('inner').html(this.getTimeInner(number[name[i]],name[i],data[name[i]]));
					this[name[i]].box.append(this[name[i]].warp);
					this[name[i]].inner.append(this[name[i]].box);
					this[name[i]].main.append(this[name[i]].text);
					this[name[i]].main.append(this[name[i]].inner);
					delete this[name[i]].box;
				};
				fn.call(this,this.hour.main,this.minute.main,this.second.main);
			},
			getTimeInner:function(n,name,c){
				for(var i=0,str='';i<n;i++){
					str+=M.template.resolve(this.renderTime(),{value:M.formatDate(i),className:i==c?'selected':'',id:this.id+'_'+name+'_'+M.formatDate(i)});
				};	
				return M.renderHTML({
					name:'ul',
					html:str
				});
			},
			clearValue:function(e){
				var that=e.data.context,time=that.getExecInfo(that.cacheDefault.time,that.key[1]);
				that.ops.date.select=that.cacheDefault.date;
				that.ops.time.select=that.cacheDefault.time;
				delete that.cacheDate;
				that.ops.date.start&&delete that.ops.date.start;
				that.ops.date.stop&&delete that.ops.date.stop;
				that.reset(time);
				that.getAuto(function(){
					that.ops.target[0].value='';
					that.hide();
					M.isFunction(that.ops.choose)&&that.ops.choose.apply(that,that.args);
				});
				/*if(that.ops.relative.type&&/stop/g.test(that.ops.relative.type)&&that.ops.relative.type.point){
					that.ops.relative.type.point
				};*/
			},
			goToday:function(e){
				var that=e.data.context,current=that.getDateInfo();
				that.set(that.key[0],that.key[2],{
					year:current.year,
					month:current.month,
					day:current.day	
				});	
				that.set(that.key[1],that.key[2],{
					hour:current.hour,
					minute:current.minute,
					second:current.second	
				});	
				that.reset({
					hour:current.hour,
					minute:current.minute,
					second:current.second	
				});
				that.cacheDate=that.getDateMill(that.ops.date.select,that.ops.time.select);
				that.setValue();
				that.hide();
			},
			reset:function(time){
				if(this.ops.time.enabled){
					var name=this.key.slice(8,11);
					for(var i=0;i<name.length;i++){
						var ele=document.getElementById(this.id+'_'+name[i]+'_'+M.formatDate(time[name[i]]));
						this[name[i]].text[0].innerHTML=M.formatDate(time[name[i]]);
						this[name[i]].scroll.ops.content.children().children().removeClass('selected');
						ele.className=ele.className.concat(String.fromCharCode(32)).concat('selected');
					};
				};
			},
			setValue:function(status){
				if(this.ops.together){
					var start=this.ops.date.start,stop=this.ops.date.stop;
					if(this.ops.time.enabled){
						start+=String.fromCharCode(32).concat(this.ops.time.select);
						stop+=String.fromCharCode(32).concat(this.ops.time.select);
					};
					if(this.ops.weekend){
						var first=this.getExecInfo(start,this.key[0]),last=this.getExecInfo(stop,this.key[0]);
						start+=String.fromCharCode(32).concat(M.getWeekend(this.getNewDate(first.year,first.month,first.day,0,0,0)));	
						stop+=String.fromCharCode(32).concat(M.getWeekend(this.getNewDate(last.year,last.month,last.day,0,0,0)));	
					};
					this.ops.target[0].value=start.concat(String.fromCharCode(32)).concat(this.ops.separator).concat(String.fromCharCode(32)).concat(stop);
				}else{
					var str=this.ops.date.select;
					if(this.ops.time.enabled){
						str+=String.fromCharCode(32).concat(this.ops.time.select);
					};
					if(this.ops.weekend){
						str+=String.fromCharCode(32).concat(M.getWeekend(this.cacheDate));	
					};
					this.ops.target[0].value=str;
					!status&&this.ops.relative.type&&this.setPoint({start:'setStart',stop:'setStop'}[this.ops.relative.type]);
				};
				M.isFunction(this.ops.choose)&&this.ops.choose.apply(this,this.args);
			},
			setPoint:function(type){
				type&&this[type](this.ops.relative.point);
			},
			setStart:function(data){
				if(data){
					data.ops.date.max=this.ops.date.select;
					//data.ops.time.max=this.ops.time.select;
				};
			},
			setStop:function(data){
				if(data){
					data.ops.date.min=this.ops.date.select;
					//data.ops.time.min=this.ops.time.select;
					if(this.cacheDate.getTime()>=data.cacheDate.getTime()){
						var cache=this.getDateInfo(this.cacheDate);
						data.pass();
						data.set(data.key[0],data.key[2],{
							year:cache.year,
							month:cache.month,
							day:cache.day+data.ops.date.interval	
						});	
						data.cacheDate=data.getDateMill(data.ops.date.select,data.ops.time.select);
						data.setValue(true);
						data.cacheDefault={
							date:data.ops.date.select,
							time:data.ops.time.select
						};
						if(data.ops.together||data.getDateMill(data.ops.date.min,data.ops.time.min).getTime()>new Date().getTime()){
							if(data.today){
								data.today.hide();
							}else{
								data.ops.tool.today=false;
							};
						};
					};
				};
			},
			change:function(e){
				if(!/disabled/g.test(this.className)){
					var that=e.data.context,number=e.data.type,date=that.getSection(that.getDateInfo(that.cacheDate),number);
					that.cacheDate=that.getNewDate(date.year,date.month,date.day,date.hour,date.minute,date.second);
					that.creatItem();
					that.disabled();
					that.ops.together&&that.autoChange();
				};
				return false;	
			},
			quickMonth:function(e){
				var target=M(this),
					that=e.data.context,
					index=Number(this.getAttribute('uid')),
					list=that.list[index],
					data=that.creatMonth(index,list);
				that.addPanel(list,'_'.concat(that.key[6]),M.template.resolve(that.renderTitle(1),{value:data.year}),data.arr,1,function(ele){
					target.unbind('click').bind('click',{context:this},this.quickYear);
					ele.box.find('li').bind('click',{context:this,list:list,index:index},this.selectMonth);
				});
			},
			creatMonth:function(index,list){
				var date=this.getDateInfo(this.cacheDate),arr=[];
				date=this.getDateInfo(this.getNewDate(date.year,date.month+index,date.day,date.hour,date.minute,date.second));
				var min=this.getExecInfo(this.ops.date.min,this.key[0]),
					max=this.getExecInfo(this.ops.date.max,this.key[0]),
					first=this.getNewDate(min.year,min.month,1,0,0,0).getTime(),
					last=this.getNewDate(max.year,max.month,1,0,0,0).getTime();
				for(var i=1;i<=12;i++){
					var current=this.getNewDate(date.year,i,1,0,0,0).getTime();
					arr.push({
						value:i+'月',
						index:i,
						selected:i==date.month,
						disabled:current<=last&&current>=first?false:true,
						type:index.toString()	
					});
				};
				return {
					year:date.year,
					arr:arr		
				};
			},
			quickYear:function(e){
				var target=M(this),
					that=e.data.context,
					index=Number(this.getAttribute('uid')),
					list=that.list[index],
					data=that.creatYear(index,list);
				that.addPanel(list,'_'.concat(that.key[5]),M.template.resolve(that.renderTitle(1),{value:list._year.start+'-'+(list._year.start+11)}),data.arr,2,function(ele){
					target.unbind('click').addClass(that.disClassName);
					if(!ele.prev){
						ele.prev=that.creatElement('g-calendar-fast-btn prev');
						ele.main.append(ele.prev);
					};
					if(!ele.next){
						ele.next=that.creatElement('g-calendar-fast-btn next');
						ele.main.append(ele.next);
					};
					that.addSelectYear(list,data,index);
					ele.prev.bind('click',{context:this,list:list,index:index},this.getPrevYear);
					ele.next.bind('click',{context:this,list:list,index:index},this.getNextYear);
				});
			},
			getPrevYear:function(e){
				var that=e.data.context,list=e.data.list,index=e.data.index;
				if(!e.data.animate){
					e.data.animate=true;
					list._year.start-=12;
					var data=that.creatYear(index,list),box=that.creatBox(data.arr);
					list.title[0].innerHTML=M.template.resolve(that.renderTitle(1),{value:list._year.start+'-'+(list._year.start+11)});
					list._year.panel.prepend(box).css({left:-that.distance}).animate({left:0},200,'easeOutQuad',function(){
						list._year.box.remove();
						list._year.box=box;
						that.addSelectYear(list,data,index);
						delete e.data.animate;
					});
				};
			},
			getNextYear:function(e){
				var that=e.data.context,list=e.data.list,index=e.data.index;
				if(!e.data.animate){
					e.data.animate=true;
					list._year.start+=12;
					var data=that.creatYear(index,list),box=that.creatBox(data.arr);
					list.title[0].innerHTML=M.template.resolve(that.renderTitle(1),{value:list._year.start+'-'+(list._year.start+11)});
					list._year.panel.append(box).animate({left:-that.distance},200,'easeOutQuad',function(){
						list._year.panel[0].style.left=0+'px';
						list._year.box.remove();
						list._year.box=box;
						that.addSelectYear(list,data,index);
						delete e.data.animate;
					});
				};
			},
			addSelectYear:function(list,data,index){
				this.addMoveDisable(list._year,data.min,data.max);
				list._year.box.find('li').bind('click',{context:this,list:list,index:index},this.selectYear);
			},
			addMoveDisable:function(ele,min,max){
				var element=function(id,year){
					return document.getElementById(id+'_'+M.formatDate(year));		
				};
				element(this.id,min)?ele.prev.addClass(this.disClassName):ele.prev.removeClass(this.disClassName);
				element(this.id,max)?ele.next.addClass(this.disClassName):ele.next.removeClass(this.disClassName);
			},
			selectYear:function(e){
				if(!/disabled/g.test(this.className)){
					var that=e.data.context,
						list=e.data.list,
						index=e.data.index,
						date=that.getDateInfo(that.cacheDate),
						year=Number(this.innerHTML);
					that.cacheDate=that.getNewDate(year,date.month-index,date.day,date.hour,date.minute,date.second);
					list.year=year;
					var data=that.creatMonth(index,list),box=that.creatBox(data.arr);
					list._month.box.after(box);
					list._month.box.remove();
					list.title[0].innerHTML=M.template.resolve(that.renderTitle(1),{value:year});
					list.warp.animate({top:-that.distance},200,'easeOutQuad',function(){
						list._year.main.remove();
						delete list._year;
						list._month.box=box;
						list.title.removeClass(that.disClassName).unbind('click').bind('click',{context:that},that.quickYear);
						list._month.box.find('li').bind('click',{context:that,list:list,index:index},that.selectMonth);
					});
				};	
			},
			selectMonth:function(e){
				if(!/disabled/g.test(this.className)){
					var that=e.data.context,
						list=e.data.list,
						index=e.data.index,
						date=that.getDateInfo(that.cacheDate),
						month=Number(this.getAttribute('index'));
					list.month=month;
					that.cacheDate=that.getNewDate(date.year,month,date.day,date.hour,date.minute,date.second);
					list.title[0].innerHTML=M.template.resolve(that.renderTitle(1),{value:date.year})+M.template.resolve(that.renderTitle(2),{value:M.formatDate(month)});
					list.warp.find('ul').html(that.creatList(that.creatDay(index).list));
					list.warp.animate({top:0},200,'easeOutQuad',function(){
						list._month.main.remove();
						delete list._month;
						list.title.unbind('click').bind('click',{context:that},that.quickMonth);
						list.warp.find('li').bind('click',{context:that},that.selectDay);
						that.disabled();
					});
				};	
			},
			selectDay:function(e){
				if(!/disabled/g.test(this.className)){
					var that=e.data.context,date=that.getElementDate(this),cache=that.getDateInfo(that.cacheDate);
					if(that.ops.together){
						if(that.ops.date.start&&that.ops.date.stop&&/selected/g.test(this.className)){
							return;
						};
						if(!that.ops.date.start){
							that.set(that.key[0],'start',{
								year:date.year,
								month:date.month,
								day:date.day	
							});	
							that.cacheDate=that.getDateMill(that.ops.date.start,that.ops.time.select);
						}else{
							if(that.betElementDate(date,that.getExecInfo(that.ops.date.start,that.key[0]))){
								that.clearOldClass(that.ops.date.start);
								that.set(that.key[0],'start',{
									year:date.year,
									month:date.month,
									day:date.day	
								});	
								if(that.ops.date.stop){
									that.cacheDate=that.getDateMill(that.ops.date.start,that.ops.time.select);
									that.setValue();
									that.addHighElement(that.getExecInfo(that.ops.date.stop,that.key[0]),true);
									that.hide();
								};
							}else{
								that.clearOldClass(that.ops.date.stop);
								that.set(that.key[0],'stop',{
									year:date.year,
									month:date.month,
									day:date.day	
								});
								that.cacheDate=that.getDateMill(that.ops.date.start,that.ops.time.select);
								that.setValue();
								that.addHighElement(that.getExecInfo(that.ops.date.stop,that.key[0]),true);
								that.hide();
							};
						};
						this.className=this.className.concat(String.fromCharCode(32)).concat('selected');
					}else{
						that.set(that.key[0],that.key[2],{
							year:date.year,
							month:date.month,
							day:date.day	
						});	
						that.set(that.key[1],that.key[2],{
							hour:cache.hour,
							minute:cache.minute,
							second:cache.second	
						});	
						that.cacheDate=that.getDateMill(that.ops.date.select,that.ops.time.select);
						that.setValue();
						that.hide();
					};	
				};
				return false;	
			},
			clearOldClass:function(date,status){
				if(date){
					var data=this.getExecInfo(date,this.key[0]),ele=this.getElement(data.year,data.month,data.day);
					if(ele){
						ele.className=status?ele.className.concat(String.fromCharCode(32)).concat('selected'):ele.className.replace(/selected/g,'');
					};
				};	
			},
			addHighElement:function(stop,clear){
				var start=this.getExecInfo(this.ops.date.start,this.key[0]),
					first=this.getElementInfo(start),
					last=this.getElementInfo(stop),
					ele=function(target){
						return M(target.parentNode.children);	
					},
					add=function(m,that){
						for(var i=m;i<that.ops.number;i++){
							if(i==last.type){
								ele(last.element).slice(that.list[i].start,last.index+that.list[i].start).not('.disabled').addClass('changed');
								break;
							}else{
								that.list[i].warp.find('li').not('.disabled').addClass('changed');
							};
						};
					};
				clear&&this.overChange();
				if(first.element){
					if(first.type==last.type){
						ele(first.element).slice(first.index+this.list[first.type].start,this.list[first.type].start+last.index).not('.disabled').addClass('changed');	
					}else{
						ele(first.element).slice(first.index+this.list[first.type].start,this.list[first.type].start+this.list[first.type].length).not('.disabled').addClass('changed');	
						add(first.type+1,this);
					};
				}else{
					if(this.betElementDate(start,{year:this.list[0].year,month:this.list[0].month,day:1})&&this.betElementDate({year:this.list[0].year,month:this.list[0].month,day:1},stop)){
						add(0,this);
					};
				};
			},
			autoChange:function(){
				this.ops.date.start&&this.clearOldClass(this.ops.date.start,true);
				this.ops.date.stop&&this.addHighElement(this.getExecInfo(this.ops.date.stop,this.key[0]),true);
			},
			overChange:function(){
				for(var i=0;i<this.ops.number;i++){
					this.list[i].warp.find('li').removeClass('changed').removeClass('selected');
				};
				this.ops.date.start&&this.clearOldClass(this.ops.date.start,true);
				this.ops.date.stop&&this.clearOldClass(this.ops.date.stop,true);
			},
			togetherDay:function(e){
				var that=e.data.context;
				if(that.ops.date.start&&!that.ops.date.stop){
					that.overChange();
					if(!/disabled/g.test(this.className)){
						var date=that.getElementDate(this);
						if(!that.betElementDate(date,that.getExecInfo(that.ops.date.start,that.key[0]))){
							that.addHighElement(date);
							this.className=this.className.concat(String.fromCharCode(32)).concat('selected');
						};
					};
				};
			},
			getElementDate:function(target){
				var day=Number(target.innerHTML),type=Number(target.getAttribute('type'));
				return {
					year:this.list[type].year,
					month:this.list[type].month,
					day:day	
				};
			},
			betElementDate:function(d,m){
				return this.getNewDate(d.year,d.month,d.day,0,0,0).getTime()<=this.getNewDate(m.year,m.month,m.day,0,0,0).getTime();
			},
			getElementInfo:function(date){
				var element=this.getElement(date.year,date.month,date.day);
				return {
					element:element,
					index:element?Number(element.innerHTML):null,
					type:element?Number(element.getAttribute('type')):null	
				};	
			},
			creatYear:function(index,list){
				var date=this.getDateInfo(this.cacheDate),arr=[];
				date=this.getDateInfo(this.getNewDate(date.year,date.month+index,date.day,date.hour,date.minute,date.second));
				var min=this.getExecInfo(this.ops.date.min,this.key[0]),
					max=this.getExecInfo(this.ops.date.max,this.key[0]),
					first=this.getNewDate(min.year,1,1,0,0,0).getTime(),
					last=this.getNewDate(max.year,1,1,0,0,0).getTime();
				list._year=list._year||{};
				list._year.start=list._year.start||date.year-5;
				for(var i=list._year.start;i<list._year.start+12;i++){
					var current=this.getNewDate(i,1,1,0,0,0).getTime();
					arr.push({
						value:i,
						index:i,
						id:this.id+'_'+i,
						selected:i==date.year,
						disabled:current<=last&&current>=first?false:true,
						type:index.toString()	
					});
				};
				return {
					min:min.year,
					max:max.year,
					arr:arr	
				};
			},
			addPanel:function(list,name,title,data,type,fn){
				var that=this,warp=this.getPanel();
				list[name]=list[name]||{};
				list[name].box=that.creatBox(data),
				list[name].main=warp.box;
				list[name].panel=warp.panel;
				warp.panel.append(list[name].box);
				list.title[0].innerHTML=title;
				list.warp.append(warp.box).animate({top:-that.distance*type},200,'easeOutQuad',function(){
					delete warp;
					fn&&fn.call(that,list[name]);
				});
				that.prev.addClass(that.disClassName);
				that.next.addClass(that.disClassName);
			},
			getPanel:function(){
				var box=this.creatElement('g-calendar-fast'),
					inner=this.creatElement('g-calendar-inner');
					panel=this.creatElement('g-calendar-panel');
				inner.append(panel);
				box.append(inner);
				return {
					box:box,
					panel:panel	
				};	
			},
			creatBox:function(data){
				return this.creatElement('box').html(M.renderHTML({
					name:'ul',
					html:this.creatList(data)
				}));
			},
			creatWeek:function(){
				for(var i=0,arr=['日','一','二','三','四','五','六'],str='';i<arr.length;i++){
					str+=M.template.resolve(this.renderWeek(),{className:i==0||i==arr.length-1?'weekend':'normal',value:arr[i]});
				};	
				return M.renderHTML({
					proto:{
						'class':'g-calendar-week'
					},
					html:str
				});
			},
			creatList:function(data){
				for(var i=0,str='';i<data.length;i++){
					str+=M.template.resolve(this.renderList(),{className:(data[i].selected?'selected':'')+(data[i].disabled?String.fromCharCode(32).concat(this.disClassName):String.fromCharCode(32).concat('change'))+(data[i].week?String.fromCharCode(32).concat('weekend'):''),id:data[i].id,value:data[i].value,index:data[i].index,type:data[i].type});
				};	
				return str;
			},
			creatItem:function(){
				this.list=[];
				this.main[0].innerHTML='';
				for(var i=0,str='';i<this.ops.number;i++){
					this.list[i]=this.list[i]||{};
					this.creatInner(i);
					this.list[i].group=this.creatElement('g-calendar-item').append(this.list[i].head).append(this.list[i].body);	
					this.main.append(this.list[i].group);
					delete this.list[i].head;
					delete this.list[i].body;
					delete this.list[i].group;
					this.list[i].warp.find('li').bind('click',{context:this},this.selectDay);	
					this.list[i].warp.find('li').bind('hover',{context:this},this.togetherDay);	
					if(this.ops.fast){
						this.list[i].title.bind('click',{context:this},this.quickMonth);	
					};
				};	
				this.main.append(this.creatElement('clear'));
			},
			disabled:function(){
				var now=this.getDateInfo(),
					current=this.getDateInfo(this.getDateMill(this.ops.date.select,this.ops.time.select)),
					min=this.getDateInfo(this.getDateMill(this.ops.date.min,this.ops.time.min)),
					max=this.getDateInfo(this.getDateMill(this.ops.date.max,this.ops.time.max)),
					select=this.getElement(current.year,current.month,current.day),
					today=this.getElement(now.year,now.month,now.day),
					first=this.getElement(min.year,min.month,min.day),
					last=this.getElement(max.year,max.month,max.day);
				if(today){
					today.className=today.className.concat(String.fromCharCode(32)).concat('now');
				};
				if(select&&!this.ops.together){
					select.className=select.className.concat(String.fromCharCode(32)).concat('selected');
				};
				if(first){
					for(var i=0;i<Number(first.getAttribute('type'));i++){
						this.list[i].warp.find('li').addClass(this.disClassName);
					};
					M(first.parentNode.children).slice(0,Number(first.getAttribute('index'))-1).addClass(this.disClassName);
					this.prev.addClass(this.disClassName);
				}else{
					this.prev.removeClass(this.disClassName);
				};
				if(last){
					for(var j=Number(last.getAttribute('type'))+1;j<this.ops.number;j++){
						this.list[j].warp.find('li').addClass(this.disClassName);
					};
					M(last.parentNode.children).slice(Number(last.getAttribute('index'))).addClass(this.disClassName);
					this.next.addClass(this.disClassName);
				}else{
					this.next.removeClass(this.disClassName);
				};
				if(this.ops.skip.length){
					for(i=0;i<this.ops.skip.length;i++){
						var skip=this.getDateInfo(this.getDateMill(this.ops.skip[i],this.ops.time.select)),
							none=this.getElement(skip.year,skip.month,skip.day);
						if(none){
							none.className=none.className.concat(String.fromCharCode(32)).concat(this.disClassName);
						};
					};
				};
				i=j=null;
			},
			getElement:function(year,month,day){
				return document.getElementById(this.id+'_'+M.formatDate(year)+'-'+M.formatDate(month)+'-'+M.formatDate(day));	
			},
			creatInner:function(index){
				var data=this.creatDay(index);
				this.list[index].length=data.length;
				this.list[index].start=data.start;
				this.list[index].year=data.year;
				this.list[index].month=data.month;
				this.list[index].head=this.creatHead(this.ops.number==1?'first last':index==0?'first':index==this.ops.number-1?'last':'');
				this.list[index].title=this.creatTitle(index,this.ops.fast?'':this.disClassName,data.year,M.formatDate(data.month));
				this.list[index].head.append(this.list[index].title);
				this.list[index].body=this.creatElement('g-calendar-body');
				this.list[index].warp=this.creatWarp(M.formatDate(data.month),this.creatList(data.list));
				this.list[index].body.append(this.list[index].warp);
			},
			creatDay:function(index){
				var date=this.getDateInfo(this.cacheDate),
					current=this.getSection(date,index),
					prev=this.getSection(date,index-1),
					arr=[];
				for(var j=1;j<=current.week;j++){
					arr.push({
						value:prev.length-current.week+j,
						disabled:true,
						index:j,
						type:index.toString()
					});
				};
				for(var i=1;i<=current.length;i++){
					arr.push({
						value:i,
						week:(i+current.week)%7==0||(i+current.week)%7==1,
						index:current.week+i,
						type:index.toString(),
						id:this.id+'_'+M.formatDate(current.year)+'-'+M.formatDate(current.month)+'-'+M.formatDate(i)
					});
				};
				for(var z=1;z<=42-current.length-current.week;z++){
					arr.push({
						value:z,
						disabled:true,
						index:current.length+current.week+z,
						type:index.toString()
					});
				};
				return {
					year:current.year,
					month:current.month,
					length:current.length,
					start:current.week,
					list:arr	
				};	
			},
			getSection:function(data,number){
				var date=this.getDateInfo(this.getNewDate(data.year,data.month+number,1,0,0,0));
				return {
					year:date.year,
					month:date.month,
					day:date.day,
					hour:data.hour,
					minute:data.minute,
					second:data.second,
					length:this.getMonthLen(date.year,date.month),
					week:this.getFirstDay(date.year,date.month)
				};
			},
			renderTime:function(){
				return M.renderHTML({
					name:'li',
					html:M.renderHTML({
						name:'a',
						proto:{
							id:'{{id}}',
							href:'javascript:;',
							'class':'{{className}}'
						},
						html:'{{value}}'
					})
				});	
			},
			renderTip:function(){
				return M.renderHTML({
					name:'i',
					proto:{
						'class':'iconfont c1 hide'	
					},
					html:M.Font.arrow_left_fill
				})+M.renderHTML({
					name:'i',
					proto:{
						'class':'iconfont c2 hide'	
					},
					html:M.Font.arrow_up_fill
				})+'这里可以更改时间喔';
			},
			renderDay:function(){
				return M.renderHTML({
					proto:{
						'class':'g-calendar-day'
					},
					html:M.renderHTML({
						proto:{
							'class':'g-calendar-overs'
						},
						html:'{{month}}'
					})+M.renderHTML({
						name:'ul',
						proto:{
							'class':'g-calendar-number'
						},
						html:'{{list}}'
					})
				});
			},
			renderTitle:function(type){
				return M.renderHTML({
					name:'i',
					html:'{{value}}'+{1:'年',2:'月'}[type]
				});
			},
			renderList:function(){
				return M.renderHTML({
					name:'li',
					proto:{
						id:'{{id}}',
						index:'{{index}}',
						type:'{{type}}',
						'class':'{{className}}'
					},
					html:'{{value}}'
				});
			},
			renderWeek:function(){
				return M.renderHTML({
					name:'span',
					proto:{
						'class':'{{className}}'
					},
					html:'{{value}}'
				});
			},
			creatSeparator:function(){
				return M(M.creatlabel('span'),{
					'class':'g-calendar-time-separator',
					html:'：'
				});		
			},
			creatWarp:function(month,list){
				return M(M.creatlabel(),{
					'class':'g-calendar-warp',
					html:M.renderHTML({
						proto:{
							'class':'g-calendar-main'
						},
						html:this.creatWeek()+M.template.resolve(this.renderDay(),{month:month,list:list})
					})
				});	
			},
			creatTitle:function(index,name,year,month){
				return M(M.creatlabel('a'),{
					'class':name,
					href:'javascript:;',
					uid:index,
					html:M.template.resolve(this.renderTitle(1),{value:year})+M.template.resolve(this.renderTitle(2),{value:month})
				});	
			},
			creatHead:function(name){
				return M(M.creatlabel(),{
					'class':'g-calendar-head'.concat(String.fromCharCode(32)).concat(name)
				});	
			},
			creatElement:function(name){
				return M(M.creatlabel(),{
					'class':name
				});	
			},
			creatMonthButton:function(type){
				return M(M.creatlabel(),{
					'class':'g-calendar-month-btn '+{1:'prev',2:'next'}[type],
					title:{1:'上一月',2:'下一月'}[type],
					html:M.renderHTML({
						name:'i'
					})
				});	
			},
			creatContainer:function(){
				return M(M.creatlabel(),{
					'class':'g-pop-container',
					id:'g-calendar-'+M.now(),
					css:{
						zIndex:M.now()	
					},
					html:M.renderHTML({
						proto:{
							'class':'g-pop-shadow'
						}
					})
				});	
			},
			creatContent:function(){
				return M(M.creatlabel(),{
					'class':'g-pop-content',
					css:{
						width:this.ops.number*(this.distance+20)
					}
				});	
			},
			hide:function(e){
				(e?e.data.context:this).container.hide();	
			},
			dismiss:function(){
				this.container.remove();
				this.destroy();		
			},
			destroy:function(that){
				delete that;	
			}	
		};
		return {
			defaults:{
				target:null,
				date:{
					format:'YYYY-MM-DD',
					select:null, 
					interval:0,  
					min:null,
					max:null 
				},
				time:{
					enabled:true,
					format:'hh:mm:ss', 
					select:null,  
					min:null, 
					max:null
				},
				number:2,  
				skip:[], 
				toggle:2,
				weekend:false, 
				auto:false,
				fast:false, 
				together:false, 
				separator:'~', 
				tool:{
					clear:true, 
					today:true	
				},
				relative:{
					type:null,
					point:null
				},
				callback:function(){},
				choose:function(){}
			},	
			init:function(ops){
				return new Calendar(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);