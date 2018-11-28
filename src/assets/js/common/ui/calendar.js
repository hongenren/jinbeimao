/** 
 * 用途:日历
 * 作者:小马
 * 日期：2018/8/14
 * @import base.common.js 

 * 	@target			   			object		(必填)		最外层容器						
 *	@title						null		(非必填)		日历标题	
 *	@tabList					array		(非必填)		事务列表
 *	@date						Date		(非必填)		时间信息
 * 		--@format				String		(非必填)		时间格式
 *		--@select				Date		(非必填)		默认起始时间	
 *		--@min					Date		(非必填)		可选最小时间	
 *		--@max		 			Date		(非必填)		可选最大时间	
 *  @affairCheckCallback		function	(非必填)		事务过滤回调
 *	@selectYearCallback			function	(非必填)		选择月份后回调
 *	@switchMonthCallback		function	(非必填)		选择年份后回调
 *	@callback:function			function	(非必填)		日历生成后回调
 */
;(function(M,window){
	M.ui.define('calendar',function(){
		function Calendar(ops,args){
			this.ops=ops;
			this.init(args);
		};
		Calendar.prototype={
			constructor:Calendar,
			init:function(args){
				this.creat(args);
				return this;
			},
			creat:function(args){
				this.index = 0;
				this.key='date|'.split('|');
				this.id = Math.random().toString(36).substr(2);
				this.disClassName = 'disable';//全局样式
				this.distance=225;//内容盒子高度
				this.choseNewYear = '';//选择年份临时存储
				this.choseYearBox = this.creatElement('g-calendar-box');
				this.choseMonthBox = this.creatElement('g-calendar-warp hide');
				this.prev = this.creatElement('g-calendar-fast-btn prev');
				this.next = this.creatElement('g-calendar-fast-btn next');
				this.affairText = ["0","1"];
				this.lastWeek = null;
				if(this.ops.date.systemTime!=null){
					this.today = M.formatDate(this.getDateInfo(new Date(this.ops.date.systemTime)).year)+'-'+M.formatDate(this.getDateInfo(new Date(this.ops.date.systemTime)).month)+'-'+M.formatDate(this.getDateInfo(new Date(this.ops.date.systemTime)).day);
				}else{
					this.today = M.formatDate(this.getDateInfo().year)+'-'+M.formatDate(this.getDateInfo().month)+'-'+M.formatDate(this.getDateInfo().day);
				}
				if(this.ops.date.select!=null){
					//全局时间缓存，各接口枢纽。
					this.cacheDate=new Date(this.ops.date.select);
				}else if(this.ops.date.systemTime!=null){
					this.cacheDate=new Date(this.ops.date.systemTime);
				}else{
					this.cacheDate=new Date();
				}
				this.Title = this.creatTitle();
				this.table = this.creatTable();
				this.ops.target.html(this.Title+this.table);
				this.Title = M(this.Title)
				this.ops.target.append(this.choseMonthBox.append(this.choseYearBox));
				this.refreshAffair();
				this.addEven();
				// if((new Date()).getDate() > this.lastWeek){
				// 	M('.next-month',this.ops.target).trigger('click');
				// }
				M.isFunction(this.ops.callback)&&this.ops.callback(this,this.affairText);
			},
			addEven:function(){
				M('.next-month',this.ops.target).off('click').on('click',{content:this},this.nextMonth)
				M('.prev-month',this.ops.target).off('click').on('click',{content:this},this.prevMonth);
				M('.calender-tab',this.ops.trager).off('click').on('click',{content:this},this.tab);
				M('.date',this.ops.trager).off('click').on('click',{content:this},this.fastQueryMonth);
				$("body *:not('.date')").on('click',{content:this},this.calenderHide);
			},
			calenderHide:function(e){
				var _this = e.data.content;
				_this.choseMonthBox.addClass('hide');
				_this.choseYearBox.children().remove();
				_this.choseNewYear = '';
				M('.date',_this.ops.trager).off('click').on('click',{content:_this},_this.fastQueryMonth);
			},
			fastQueryMonth:function(e){
				e.stopPropagation(); 
				var _this = e.data.content,
					that = this,	
					list =_this.getDateInfo(_this.cacheDate),
					name = '_month',
					data=_this.creatMonth(0,list),
					title =_this.creatElement('calender-chose-year');
					title.append('<i>'+list.year+'</i>');
					_this.addPanel(list,name,title,data.arr,0,function(ele){
						M(that).off('click');
						ele.title.off('click').on('click',{context:_this,list:list},_this.fastQueryYear);
						ele.box.find('li').on('click',{context:this,list:list},this.selectMonth);
						M.isFunction(_this.ops.selectMonthCallback)&&_this.ops.selectMonthCallback();
					})
					e.stopPropagation(); 
			},
			selectMonth:function(e){
				e.stopPropagation();
				var _this = e.data.context,
					list = e.data.list,
				 	newMonth =M.formatDate(M(this).attr('index')),
					newYear = list.year;
					if(_this.choseNewYear !=''){
						_this.cacheDate =new Date(_this.choseNewYear+'-'+newMonth+'-01');
					}else{
						_this.cacheDate =new Date(newYear+'-'+newMonth+'-01');
					}
					_this.choseMonthBox.addClass('hide');
					_this.choseYearBox.children().remove();
					_this.refreshBody(_this.index);
					_this.refreshAffair();
					_this.choseNewYear = '';
					M('.date',_this.ops.trager).off('click').on('click',{content:_this},_this.fastQueryMonth);
			},
			fastQueryYear:function(e){
				e.stopPropagation();
				var t = '',_this = e.data.context;
				if(_this.choseNewYear !=''){
					t =new Date(_this.choseNewYear+'-'+(_this.cacheDate.getMonth()+1)+'-01');
				}else{
					t = _this.cacheDate
				}
				var target=M(this),
					_this=e.data.context,
					index=0,
					list=_this.getDateInfo(t),
					data=_this.creatYear(index,list),
					title =_this.creatElement('calender-chose-year disable');
					title.append('<i>'+(data.arr)[0].value+'-'+(data.arr)[(data.arr).length-1].value+'</i>');
					_this.addPanel(list,'_year',title,data.arr,1,function(ele){
					_this.disabled(data.arr)
					if(!ele.prev){
						ele.prev=_this.prev;
						ele.main.append(ele.prev);
					};
					if(!ele.next){
						ele.next=_this.next;
						ele.main.append(ele.next);
					};
					ele.box.find('li.change').on('click',{context:this,list:e.data.list,main:ele.main},this.selectYear);
					ele.prev.bind('click',{context:this,list:list,index:index},this.getPrevYear);
					ele.next.bind('click',{context:_this,list:list,index:index},this.getNextYear);
				});
			},
			selectYear:function(e){
				e.stopPropagation();
				M(this).addClass('selected').siblings().removeClass('selected');
				var _this = e.data.context;
				_this.choseNewYear = M(this).attr('index');
				M('.calender-chose-year i').text(_this.choseNewYear);
				_this.choseYearBox.animate({top:(-_this.distance*0)},200,'easeOutQuad',function(){
					M('.g-calendar-fast',_this.ops.target).last().remove()
//					e.data.main.remove()
				});
			},
			getPrevYear:function(e){
				e.stopPropagation();
				var that=e.data.context,list=e.data.list,index=e.data.index;
				if(!e.data.animate){
					e.data.animate=true;
					list._year.start-=12;
					var data=that.creatYear(index,list),box=that.creatBox(data.arr);
					list._year.title.find('i')[0].innerHTML=(data.arr)[0].value+'-'+(data.arr)[(data.arr).length-1].value;
					that.disabled(data.arr)
					list._year.panel.prepend(box).css({left:-189}).animate({left:0},200,'easeOutQuad',function(){
						list._year.box.remove();
						list._year.box=box;
						list._year.box.find('li.change').on('click',{context:that},that.selectYear);
						delete e.data.animate;
					});
				};
			},
			getNextYear:function(e){
				e.stopPropagation();
				var that=e.data.context,list=e.data.list,index=e.data.index;
				if(!e.data.animate){
					e.data.animate=true;
					list._year.start+=12;
					var data=that.creatYear(index,list),box=that.creatBox(data.arr);
					list._year.title.find('i')[0].innerHTML=(data.arr)[0].value+'-'+(data.arr)[(data.arr).length-1].value;
					that.disabled(data.arr)
					list._year.panel.append(box).animate({left:-189},200,'easeOutQuad',function(){
						list._year.panel[0].style.left=0+'px';
						list._year.box.remove();
						list._year.box=box;
						list._year.box.find('li.change').on('click',{context:that},that.selectYear);
						delete e.data.animate;
					});
				};
			},
			addPanel:function(list,name,title,data,type,fn){
				var that=this,warp=this.getPanel(title);
				list[name]=list[name]||{};
				list[name].box=that.creatBox(data),
				list[name].main=warp.box;
				list[name].panel=warp.panel;
				list[name].title = title;
				warp.panel.append(list[name].box);
				this.choseMonthBox.removeClass('hide');
				that.choseYearBox.append(warp.box).animate({top:(-that.distance*type)},200,'easeOutQuad',function(){
					delete warp;
					fn&&fn.call(that,list[name]);
				});
			},
			getPanel:function(title){
				var box=this.creatElement('g-calendar-fast'),
				inner=this.creatElement('g-calendar-inner'),
				panel=this.creatElement('g-calendar-panel');
				inner.append(panel);
				box.append(title).append(inner);
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
						value:M.formatDate(i)+'月',
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
			creatYear:function(index,list){
				var date = '',arr = [];
				if(this.choseNewYear !=''){
					 date=this.getDateInfo(new Date(this.choseNewYear+'-'+M.formatDate(this.cacheDate.getMonth()+1)+'-01'));
				}else{
					 date=this.getDateInfo(this.cacheDate);
				}
//				var date=this.getDateInfo(this.cacheDate),arr=[],_this = this;
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
			getExecInfo:function(data,type){
				var param=this.format()[type],o={};
				for(var i in param.get){
					var exec=param.get[i].r.exec(param.format);
					o[i]=Number(data.substr(exec.index,param.get[i].s&&exec[0].length==2?4:exec[0].length));
				};
				return o;
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
					}
				};
			},
			creatElement:function(name){
				return M(M.creatlabel(),{
					'class':name
				});	
			},
			creatList:function(data){
				for(var i=0,str='';i<data.length;i++){
					str+=M.template.resolve(this.renderList(),{className:(data[i].selected?'selected':'')+(data[i].disabled?String.fromCharCode(32).concat(this.disClassName):String.fromCharCode(32).concat('change'))+(data[i].week?String.fromCharCode(32).concat('weekend'):''),id:data[i].id,value:data[i].value,index:data[i].index,type:data[i].type});
				};	
				return str;
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
			prevMonth:function(e){
				e.stopPropagation();
				var _this = e.data.content;
				_this.index --;
				_this.refreshBody(_this.index);
				_this.refreshAffair();
				M.isFunction(_this.ops.switchMonthCallback)&&_this.ops.switchMonthCallback(_this);
			},
			nextMonth:function(e){
				e.stopPropagation();
				var _this = e.data.content;
				_this.index ++;
				_this.refreshBody(_this.index);
				_this.refreshAffair();
				M.isFunction(_this.ops.switchMonthCallback)&&_this.ops.switchMonthCallback(_this);
			},
			tab:function(e){
				e.stopPropagation();
				var _this = e.data.content;
				if(M(this).index() === 0){
					_this.index = 0;
					if(_this.ops.date.systemTime !=null){
						_this.cacheDate=new Date(_this.ops.date.systemTime);
					}else{
						_this.cacheDate = new Date();
					}
					_this.refreshBody(_this.index);
				}else if(M(this).hasClass('active')){
					M(this).removeClass('active');
                    M(this).siblings().not(':first').addClass('active');
					_this.affairText.splice(M.inArray(M(this).attr('status'),_this.affairText),1);
				}else{
					M(this).addClass('active');
                    M(this).siblings().not(':first').removeClass('active');
					_this.affairText.push(M(this).attr('status'));
				}
//				if(M(this).hasClass('active')){
//					M(this).removeClass('active')
//					_this.affairText = '';
//				}else{
//					M(this).addClass('active');
//					_this.affairText = M(this).attr('name');
//				}
//				if(_this.affairText === 'Today'){
//					_this.index = 0;
//					_this.cacheDate = new Date();
//					_this.refreshBody(_this.index);
//				}
//				M(this).addClass('active').siblings().removeClass('active');
//				_this.affairText = M(this).attr('name');
				M.isFunction(_this.ops.affairCheckCallback)&&_this.ops.affairCheckCallback(_this,_this.affairText,_this.cacheDate);
			},
			refreshBody:function(index){
				var d = this.creatDay(index),_this = this;
				_this.refreshTitle(d)
				M('.tbody',this.ops.target).html('')
//				setTimeout(function(){
					M('.tbody',_this.ops.target).html(_this.creatBody(d));
					M.isFunction(_this.ops.affairCheckCallback)&&_this.ops.affairCheckCallback(_this,_this.affairText,_this.cacheDate);
//				},200)
			},
			refreshTitle:function(date){
				M('.ui-workbench-calendar-date .date').html(M.formatDate(date.year)+'年'+M.formatDate(date.month)+'月')
			},
			refreshAffair:function(){
//				if((this.getDateInfo(this.cacheDate).year) === (this.getDateInfo().year) && (this.getDateInfo(this.cacheDate).month) === (this.getDateInfo().month) && !M(".calender-tab:gt(0)").hasClass('active')){
//					M(".calender-tab:lt(1)").addClass('active').siblings().removeClass('active');
//				}else{
//					M(".calender-tab:lt(1)").removeClass('active');
//				}
			},
			creatTitle:function(){
				return M.renderHTML({
					proto:{
						class:'ui-workbench-calendar-head'
					},
					html:M.renderHTML({
						proto:{
							class:'title'
						},
						html:this.ops.title
					})+this.tabList() + this.titleTime()
				})
			},
			creatTable:function(){
				return M.renderHTML({
					proto:{
						class:'ui-workbench-calendar-content'
					},
					html:M.renderHTML({
						name:'table',
						html:this.creatHead() + 
						M.renderHTML({
							name:'tbody',
							proto:{
								class:'tbody'
							},
							html:this.creatBody(this.creatDay(this.index))
						})
					})
				})
			},
			creatHead:function(){
				return M.renderHTML({
					name:'thead',
					html:M.renderHTML({
						name:'tr',
						html:this.creatWeek()
					})
				})
			},
			creatBody:function(data){
				var _this = this, list = data.list,newList =[],str='';//list.splice(0,7);
				for(var i=0;i<6;i++){
					newList.push(list.splice(0,7))
				}
				for(var j=0;j<6;j++){
					str += M.renderHTML({
						name:'tr',
						proto:{
							class:''
						},
						html:_this.renderDay(newList[j])
					})
				}
				return str
				
			},
			renderDay:function(list){
				var _this = this;
				for(var i=0,str='';i<list.length;i++){
					var todayClass = list[i].id === _this.today ? 'ui-today' : '';
					str += M.renderHTML({
						name:'td',
						proto:{
							date:list[i].id ? list[i].id : ''
						},
						html:M.renderHTML({
							proto:{
								class:list[i].disabled ? 'ui-workbench-widget ui-other-month '+todayClass+'' : 'ui-workbench-widget '+todayClass+''
							},
							html:M.renderHTML({
								proto:{
									class:'ui-day-number'
								},
								html:list[i].value
							})
						})
					})
				}
				return str;
			},
			creatWeek:function(){
				for(var i=0,arr=['一','二','三','四','五','六','日'],str='';i<arr.length;i++){
					str+=M.template.resolve(this.renderWeek(),{className:i==0||i==arr.length-1?'weekend':'normal',value:arr[i]});
				};	
				return str;
			},
			renderWeek:function(){
				return M.renderHTML({
					name:'th',
					proto:{
						'class':'{{className}}'
					},
					html:'{{value}}'
				});
			},
			tabList:function(){
				var str = '',list = this.ops.tabList;
				for(var i=0; i<list.length;i++){
					var className = (i===0? 'today':'' || i===1? 'active':'');
					// str += '<li status="'+(i===0?'':i-1)+'" class="calender-tab '+className+'">'+list[i]+'</li>';
                    str += '<li status="'+(i===0?'':i-1)+'" title="'+(i === 0? '今日':'')+'" class="calender-tab '+className+'">'+(i===0? '<i class="iconfont">&#xe61b;</i>' : list[i])+'</li>';
//					calender-tab
				}
				return M.renderHTML({
					proto:{
						class:'ui-workbench-calendar-tab'
					},
					html:str
				})
			},
			titleTime:function(){
				var date = this.getDateInfo(this.cacheDate);
				return M.renderHTML({
					proto:{
						class:'ui-workbench-calendar-date'
					},
					html:M.renderHTML({
						name:'span',
						proto:{
							class:'icon-arrow prev-month'
						},
						html:M.renderHTML({
							name:'i',
							proto:{
								class:'iconfont'
							},
							html:'&#xe606;'
						})
					})+M.renderHTML({
						name:'span',
						proto:{
							class:'date'
						},
						html:M.formatDate(date.year)+'年'+M.formatDate(date.month)+'月'
					})+M.renderHTML({
						name:'span',
						proto:{
							class:'icon-arrow next-month'
						},
						html:M.renderHTML({
							name:'i',
							proto:{
								class:'iconfont'
							},
							html:'&#xe604;'
						})
					})
				})+M.renderHTML({
					proto:{
						class:'clear'
					}
				})
			},
			creatDay:function(index){
				var date=this.getDateInfo(this.cacheDate),
					current=this.getSection(date,index),
					prev=this.getSection(date,index-1),
					arr=[];
					if(current.week === 0){
						current.week = 7
					}
				for(var j=1;j<current.week;j++){
					arr.push({
						value:prev.length-current.week+j+1,
						disabled:true,
						index:j-1,
						id:M.formatDate(prev.year)+'-'+M.formatDate(prev.month)+'-'+M.formatDate(prev.length-current.week+j+1),	
						type:index.toString()
					});
				};
				for(var i=1;i<=current.length;i++){
					arr.push({
						value:i,
						week:(i+current.week)%7==0||(i+current.week)%7==1,
						index:current.week+i-2,
						type:index.toString(),
						id:M.formatDate(current.year)+'-'+M.formatDate(current.month)+'-'+M.formatDate(i)
					});
				};
				for(var z=1;z<=42-current.length-current.week+1;z++){
					var d = new Date(current.year+'-'+(current.month+1)+'-'+M.formatDate(z));
					arr.push({
						value:z,
						disabled:true,
						index:current.length+current.week-2+z,
						type:index.toString(),
						id:M.formatDate((d).getFullYear())+'-'+M.formatDate((d).getMonth()+1)+'-'+M.formatDate(z)
					});
				};
				this.lastWeek = current.length - (7-(42-current.length-current.week+1)%7);
				this.index = 0;
				this.cacheDate = new Date(''+M.formatDate(current.year)+'-'+M.formatDate(current.month)+'-01');
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
			disabled:function(data){
				if(data[0].value <= this.ops.date.min && data[(data.length-1)].value >= this.ops.date.max){
					this.prev.addClass('hide')
					this.next.addClass('hide')
				}else if(data[0].value <= this.ops.date.min){
					this.prev.addClass('hide')
					this.next.removeClass('hide')
				}else if(data[(data.length-1)].value >= this.ops.date.max){
					this.prev.removeClass('hide')
					this.next.addClass('hide')
				}else{
					this.prev.removeClass('hide')
					this.next.removeClass('hide')
				}
			},
			getMonthLen:function(year,month){
				var nextMonth=new Date(year,month,1);
				nextMonth.setHours(nextMonth.getHours()-3);
				return nextMonth.getDate(); 
			},
			getFirstDay:function(year,month){
				return new Date(year,month-1,1).getDay();
			}
		};
		return {
			defaults:{
				target:null,
				title:'本月兑付',
				tabList:['Today','待兑','已兑'],
				date:{
					format:'YYYY-MM-DD',
					systemTime:null,
					select:null, 
					min:'2000',
					max:'2020' 
				},
				affairCheckCallback:function(){},
				selectMonthCallback:function(){},
				selectYearCallback:function(){},
				switchMonthCallback:function(){},
				callback:function(){}
			},
			init:function(ops){
				return new Calendar(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery||window.Zepto||window.xQuery,window);