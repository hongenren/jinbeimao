;
(function(M, window) {
	M.ui.define('navbar', function() {
		function Navbar(ops,args) {
			this.ops=ops;
			this.init(args);
		}
		Navbar.prototype = {
			constructor: Navbar,
			init:function(args){
				this.resolve();
			},
			resolve: function() {
				var O=$('.g-breadcrumb');
				var str,h=$(".g-menu-item.active .g-menu-sub .active a");
				str='<ul>\
						<li>\
							<a href="../../Financing-file/mys-index.html"><i class="iconfont">&#xe648;</i> 工作台</a>\
						</li>\
						<li><i class="iconfont">&#xe605;</i></li>\
						<li>'
				str+=$(".g-menu-item.active ul").length>0?'<a "href=javascript:;" class="g-nohover">'+$(".g-menu-item.active .g-menu-text").text()+'</a></li>':'<a "href='+$(".g-menu-item.active .g-menu-dropdown")[0].href+' class="active">'+$(".g-menu-item.active .g-menu-text").text()+'</a></li>';
				str+=$(".g-menu-item.active ul").length>0?'<li><i class="iconfont">&#xe605;</i></li><li><a href="'+h[0].href+'" class="active">'+h.text().slice(1)+'</a></li></ul>':'</ul>';
				O.append(str);
			}
		};
		return {
			defaults:{
			},	
			init:function(ops){
				return new Navbar(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery, window);