var own = {
	getHref: function(key) { //获取地址拦？后面的vue值  //  $.getHref('name')
		var str = window.location.href;
		str = str.substring(str.indexOf('?') + 1);
		var end = false;

		var arrHref = str.split('&');
		for(var i = 0; i < arrHref.length; i++) {
			var chilrenArr = arrHref[i].split('=');
			if(chilrenArr[0] == key) {
				end = chilrenArr[1];
				break;
			}
		}
		return end;
	},
	dataTime: function(timeStr){
		//shijianchuo是整数，否则要parseInt转换
		function add0(m){
			return m<10?('0'+m):m; 
		}
		var time = new Date(timeStr);
		var y = time.getFullYear();
		var m = time.getMonth()+1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		var s = time.getSeconds();
		return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
	},
	save: function(key, value) {
    	localStorage.setItem(key, JSON.stringify(value))
	},
	fetch: function(key) {
	    return JSON.parse(localStorage.getItem(key)) || {}
	},
	removeKey: function(key){
		localStorage.removeItem(key);//删除名称为“key”的信息
	},
	cssTransform: function(el,attr,val){
		if(!el.transform){
			el.transform = {};
		}
		if(arguments.length>2) {
			el.transform[attr] = val;
			var sVal = "";
			for(var s in el.transform){
				switch(s) {
					case "rotate":
					case "skewX":
					case "skewY":
						sVal +=s+"("+el.transform[s]+"deg) ";
						break;
					case "translateX":
					case "translateY":
						sVal +=s+"("+el.transform[s]+"px) ";
						break;
					case "scaleX":
					case "scaleY":
					case "scale":
						sVal +=s+"("+el.transform[s]+") ";
						break;	
				}
				el.style.WebkitTransform = el.style.transform = sVal;
			}
		} else {
			val  = el.transform[attr];
			if(typeof val == "undefined" ) {
				if(attr == "scale" || attr == "scaleX" || attr == "scaleY"  ) {
					val = 1;
				} else {
					val = 0;
				}
			}
			return val;
		}
	},
	addClass: function(obj,className){
		if(obj.className=='')
		{
			obj.className=className;
		}
		else{
			var arr2=obj.className.split(' ');
			var cun=this.arrIndexOf(arr2,className);
			
			if(cun == -1){
				obj.className +=' '+className;
			}
			
		}
	},
	removeClass: function(obj,className){
		if(obj.className != '')
		{
			var arr2=obj.className.split(' ');
			var cun=this.arrIndexOf(arr2,className);
			if(cun != -1){
				arr2.splice(cun,1);
				obj.className=arr2.join(' ');
			}
		}
	},
	arrIndexOf: function(arr,v)
	{
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i]==v)
			{
				return i;
			}
		}
		return -1;
	},
	logout:function (){
		void localStorage.clear();
//		localStorage.removeItem('userInfo');
		M.cookie.setCookie('login','',-1);
		loginOutUrl=$.interfacePath.logoutUrl;
		redirectUrl=encodeURIComponent($.interfacePath.loginUrl);
		window.location.href=loginOutUrl+"?loginType=mixLogin&redirectUrl="+redirectUrl;
	},
	mscroll: function(wrap,callBack) {
		var _this=this;
		var child = wrap.children[0]; 
		var startPoint = 0;
		var startY = 0;
		var minY = wrap.clientHeight - child.offsetHeight;
		var step = 1;
		var lastY = 0; 
		var lastTime = 0;
		var lastDis = 0;
		var lastTimeDis = 1;
		var isMove = true;
		var isFirst = true;
		var Tween = {
			easeOut: function(t, b, c, d){
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			backOut: function(t, b, c, d, s){
				if (typeof s == 'undefined') {
					s = 1.70158;  
				}
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			} 
		};
		this.cssTransform(child,"translateZ",0.01);
		wrap.addEventListener(
			'touchstart', 
			function(e) {
				clearInterval(child.scroll);
				if(callBack&&callBack.start){
					callBack.start();
				}
				startPoint = {pageY:e.changedTouches[0].pageY,pageX:e.changedTouches[0].pageX};
				startY = _this.cssTransform(child,"translateY");
				step = 1;
				lastY = startPoint.pageY;
				lastTime = new Date().getTime();
				lastDis = 0;
				lastTimeDis = 1;
				isMove = true;
				isFirst = true;
			}
		);
		wrap.addEventListener(
			'touchmove', 
			function(e) {
				if(!isMove) {
					return ;
				}
				var nowPoint = e.changedTouches[0];
				var disX = nowPoint.pageX - startPoint.pageX;
				var disY = nowPoint.pageY - startPoint.pageY;
				if(isFirst) {
					isFirst = false;
					if(Math.abs(disY) < Math.abs(disX)) {
						isMove = false;
						return ;
					}
				}
				var t = startY + disY;
				var nowTime = new Date().getTime();
				if(t > 0) {
					step = 1-t / wrap.clientHeight; 
					t = parseInt(t*step);
				}
				if(t < minY) {
					var over = minY - t; 
					step = 1-over / wrap.clientHeight;
					over = parseInt(over*step);
					t = minY - over;
				}
				lastDis = nowPoint.pageY - lastY; 
				lastTimeDis = nowTime - lastTime; 
				lastY = nowPoint.pageY;
				lastTime = nowTime;
				_this.cssTransform(child,"translateY",t);
				if(callBack&&callBack.in){
					callBack.in();
				}
			}
		);
		wrap.addEventListener(
			'touchend', 
			function (){
				var speed = (lastDis/lastTimeDis)*120; 
				speed = isNaN(speed)?0:speed;
				var t = _this.cssTransform(child,"translateY");
				var target = t + speed; 
				var type = "easeOut";
				var time = Math.abs(speed*.9);
				time = time<300?300:time;
				if(target > 0) {
					target = 0;
					type ="backOut";
				}
				if(target < minY) {
					target = minY;
					type ="backOut";
				}
				move(target,time,type);
			}
		);
		function move(target,time,type) {
			var t = 0;
			var b = _this.cssTransform(child,"translateY");
			var c = target - b;
			var d = Math.ceil(time/20);
			clearInterval(child.scroll);
			child.scroll = setInterval(
				function() {
					t++;
					if(t > d) {
						clearInterval(child.scroll);
						if(callBack&&callBack.over){
							callBack.over();
						}
					} else {
						var top = Tween[type](t,b,c,d);
						_this.cssTransform(child,"translateY",top);
						if(callBack&&callBack.in){
							callBack.in();
						}
					}
				},20
			);
		};
		
	}
}

