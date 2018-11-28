/**
 * 
 * 公共头部
 * @import common/fx.common.js
 *
 */
;
(function(M, window) {
	M.ui.define('head', function() {
		function Head(ops) {
			this.ops = ops;
			this.creat();
		}

		Head.prototype = {
			constructor: Head,
			creat: function() {
				this.resolve();
				return null;
			},
			resolve: function() {
				var str = M.renderHTML({
					proto:{
						'class':'ui-topbar'
					},
					html:M.renderHTML({
						proto:{
							'class':'ui-topbar-logo'	
						},
						html:M.renderHTML({
							name:'img',
							proto:{
								'src':'res/images/logo-easternpay.png'
							}
						})
					})+M.renderHTML({
						proto:{
							'class':'ui-topbar-user'
						},
						html:M.renderHTML({
							name:'span',
							html:'部门：技术中心'
						})+M.renderHTML({
							proto:{
								'class':'mar-left-20 inline-block ui-head-dropdown'
							},
							html:M.renderHTML({
								name:'span',
								html:'操作员：何颖'+M.renderHTML({
									name:'i',
									proto:{
										'class':'iconfont font12 mar-left-5'
									},
									html:'&#xe636;'
								})
							})+M.renderHTML({
								name:'ul',
								proto:{
									'class':'ui-head-dropdown-box'
								},
								html:M.renderHTML({
									name:'li',
									html:M.renderHTML({
										name:'a',
										proto:{
											'href':'login.html'
										},
										html:'注销登陆'
									})
								})
							})
						})
					})+M.renderHTML({
						proto:{
							'class':'clear'
						}
					})
				})+M.renderHTML({
					proto:{
						'class':'ui-topmenu'
					},
					html:M.renderHTML({
						proto:{
							'class':'ui-topmenu-list'
						},
						html:M.renderHTML({
							name:'ul',
							html:M.renderHTML({
								name:'li',
								html:M.renderHTML({
									name:'a',
									proto:{
										'href':'index.html'
									},
									html:'工作台'
								})
							})+M.renderHTML({
								name:'li',
								html:M.renderHTML({
									name:'a',
									proto:{
										'href':'resouse.html'
									},
									html:'资源库'
								})
							})+M.renderHTML({
								name:'li',
								html:M.renderHTML({
									name:'a',
									proto:{
										'href':'internal-control.html'
									},
									html:'内控管理'
								})
							})+M.renderHTML({
								name:'li',
								html:M.renderHTML({
									name:'a',
									proto:{
										'href':'List-management.html'
									},
									html:'名单管理'
								})
							})+M.renderHTML({
								name:'li',
								html:M.renderHTML({
									name:'a',
									proto:{
										'href':'mall-management.html'
									},
									html:'商城商户管理'
								})
							})+M.renderHTML({
								name:'li',
								html:M.renderHTML({
									name:'a',
									proto:{
										'href':'channel-management.html'
									},
									html:'风险交易监控'
								})
							})+M.renderHTML({
								name:'li',
								html:M.renderHTML({
									name:'a',
									proto:{
										'href':'reserve-fund-search.html'
									},
									html:'报表管理'
								})
							})+M.renderHTML({
								name:'li',
								html:M.renderHTML({
									name:'a',
									proto:{
										'href':'operator-management.html'
									},
									html:'系统管理'
								})
							})+M.renderHTML({
								proto:{
									'class':'clear'
								}
							})
						})
					})+M.renderHTML({
						proto:{
							'class':'ui-topmenu-more'
						},
						html:M.renderHTML({
							proto:{
								'class':' ui-head-dropdown'
							},
							html:M.renderHTML({
								name:'a',
								proto:{
									'href':'javascript:;'
								},
								html:M.renderHTML({
									name:'span',
									html:'更多快捷方式'
								})+M.renderHTML({
									name:'i',
									proto:{
										'class':'iconfont ui-dropdown-icon'
									},
									html:'&#xe636;'
								})
							})+M.renderHTML({
								name:'ul',
								proto:{
									'class':'ui-head-dropdown-box'
								},
								html:M.renderHTML({
										name:'li',
										html:M.renderHTML({
											name:'a',
											proto:{
												'href':'javascript:;'
											},
											html:'风险风险交易监控'
										})
									})+M.renderHTML({
										name:'li',
										html:M.renderHTML({
											name:'a',
											proto:{
												'href':'javascript:;'
											},
											html:'风险交易监控'
										})
									})+M.renderHTML({
										name:'li',
										html:M.renderHTML({
											name:'a',
											proto:{
												'href':'javascript:;'
											},
											html:'快捷菜单'
										})
									})+M.renderHTML({
										name:'li',
										html:M.renderHTML({
											name:'a',
											proto:{
												'href':'javascript:;'
											},
											html:'风险交易监控'
										})
									})
							})
						})
					})
				})
				document.getElementById('head').innerHTML = str;
				var list = this.ops.index;
				if(this.ops.index){
					for(var i=0;i<list.length;i++){
						if(M.isNumeric(list[i])){
							M('.ui-topmenu-list ul li').eq(i).children('a').addClass('active');
						}
					}
				};
				M('.ui-head-dropdown').off('click').on('click',function(){
					M(this).children('.ui-head-dropdown-box').show();
				})
				M('.ui-head-dropdown').off('mouseleave').on('mouseleave',function(){
					M(this).children('.ui-head-dropdown-box').hide();
				})
				
			}
		};
		return {
			defaults: {
				index: [null, null, null]
			},
			init: function(ops, context) {
				return new Head(M.extend(true, {}, ops));
			}
		};
	});
})(window.jQuery, window);