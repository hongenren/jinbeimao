/**
 * 公共菜单
 * @import common/fx.common.js
 *
 * @index                     array        			(必须)高亮展示					          	默认 [null,null] 对应下标值为对应级别菜单
 * @refreshDOM			      function 				(可选)展开收拢后回调
 * @callback                  function            	(可选)初始化完成回调
 */
;
(function(M, window) {
    M.ui.define('menu', function() {
        function Menu(ops) {
            this.ops = ops;
            this.creat();
        }

        Menu.prototype = {
            constructor: Menu,
            creat: function() {
                if (this.ops.menu.length) {
                    this.resolve();
                    return this;
                }
                return null;
            },
            resolve: function() {
                var o = M('.ui-menu');
                var i = 0;
                var str = '';
                var len = this.ops.menu.length;
                for (; i < len; i++) {
                    str += this.render(this.ops.menu[i], i);
                };
                var that=this;
                that.menuInfo(that,str,o);
            },
            menuInfo: function(that,str,o){
                var strsub='<div class="ui-menu-content"><div class="ui-menu-main">'+str+'</div></div>'
                o.append(strsub);
                if (M.isNumeric(that.ops.index[0]) && that.ops.index[0] >= 0 && that.ops.index[0] <= that.ops.menu.length - 1) {
                    if (M.isNumeric(that.ops.index[1])) {
                        var current = M('.ui-menu-item').eq(that.ops.index[0]);
                        current.addClass('active').find('.ui-menu-detail li').eq(that.ops.index[1]).addClass('active');
                    }
                }
                that.menuShow();
                $('.ui-menu-item').unbind('click').bind('click',this.showLi);
                M.isFunction(that.ops.callback) && that.ops.callback.call(that);
            },
            showLi:function(){
                if($(this).find('.ui-menu-detail').is(':hidden')){
                    $(this).addClass('open').siblings().removeClass('open')
                    $(this).find('.ui-menu-detail').stop().slideDown().siblings().find('.ui-menu-arrow').html('&#xe636;');
                    $(this).siblings().find('.ui-menu-detail').stop().slideUp().siblings().find('.ui-menu-arrow').html('&#xe604;');
                }else{
                    $(this).removeClass('open');
                    $(this).find('.ui-menu-detail').stop().slideUp().siblings().find('.ui-menu-arrow').html('&#xe604;');
                }
            },
            menuShow:function(){
                if($('.ui-menu').hasClass('ui-menu-bg')){
                    $(this).css('width','200px');
                    M('.ui-menu-item').each(function(){
                        if($(this).hasClass('active')){
                            $(this).addClass('open').siblings().removeClass('open')
                            $(this).find('.ui-menu-detail').stop().slideDown().siblings().find('.ui-menu-arrow').html('&#xe636;');
                            $(this).siblings().find('.ui-menu-detail').stop().slideUp().siblings().find('.ui-menu-arrow').html('&#xe604;');
                        }else{
                            $(this).removeClass('open');
                            $(this).find('.ui-menu-detail').stop().slideUp().siblings().find('.ui-menu-arrow').html('&#xe604;');
                        }
                    });
                }else{
                    $('.ui-menu').hover(
                        function(){
                            $('.ui-menu').stop().animate({'width':'200px'},300)
                        },
                        function(){
                            $('.ui-menu').stop().animate({'width':'50px'},200)
                            $('.ui-menu-item .ui-menu-detail').hide().siblings().find('.ui-menu-arrow').html('&#xe604;');
                        }
                    )
                };

            },
            render: function(data, i) {
                return M.renderHTML({
                    name:'li',
                    proto:{
                        'class':'ui-menu-item'
                    },
                    html:M.renderHTML({
                        name:'a',
                        proto:{
                            'class':'ui-menu-first',
                            'href':('sub' in data) ? 'javascript:;' : data.href
                        },
                        html:M.renderHTML({
                            name:'i',
                            proto:{
                                'class':'iconfont ui-menu-icon '+data.fontsize+''
                            },
                            html:data.icon
                        })+M.renderHTML({
                            name:'span',
                            proto:{
                                'class':'text'
                            },
                            html:data.name
                        })+(('sub' in data) ? M.renderHTML({
                            name:'i',
                            proto:{
                                'class':'iconfont font14 ui-menu-arrow'
                            },
                            html:'&#xe604;'
                        }) : '')
                    })+(('sub' in data) ? this.renderSub(data.sub) : '')
                })
            },
            renderSub: function(data) {
                for (var i = 0, str = ''; i < data.length; i++) {
                    str += M.renderHTML({
                        name:'li',
                        html:M.renderHTML({
                            name:'a',
                            proto:{
                                'href':('sub' in data) ? 'javascript:;' : data[i].href
                            },
                            html: data[i].name
                        })
                    });
                }

                return M.renderHTML({
                    name:'ul',
                    proto:{
                        'class':'ui-menu-detail'
                    },
                    html:str
                });
            },
            destroy: function() {
                delete this;
            }
        };
        return {
            defaults: {
                index: own.fetch('menu').index || [],
                callback: function() {},
                url:null
            },
            saveIndex: function(){
                var subIndex = $(this).parent().children('li').index($(this));
                var menuIndex = $('.ui-menu-item').index($(this).parent().parent());
                var index = [menuIndex, subIndex];
                if(own.fetch('menu')) {
                    var localMenu = own.fetch('menu');
                    localMenu.index = index;
                    own.save('menu', localMenu);
                }
            },
            passedMenu: function (arr) {
                var passedMenu = []
                for (var i=0;i<arr.length;i++) {
                    var menuOne = arr[i];
                    if (menuOne.hidden !== true) {
                        if (menuOne.sub.length > 0) {
                            var SubMenu = [];
                            for (var k=0;k<menuOne.sub.length; k++) {
                                var sub = menuOne.sub[k];
                                if (sub.hidden !== true) {
                                    SubMenu.push(sub)
                                }
                            }
                            menuOne.sub = SubMenu;
                            passedMenu.push(menuOne);
                        }else {
                            passedMenu.push(menuOne);
                        }
                    }
                }
                return {
                    menu: passedMenu
                };
            },
            init: function(ops, context) {
                $(document).on('click', '.ui-menu-detail li', this.saveIndex);
                var that = this;
                var menuData=localStorage.getItem('menu');
                if(menuData){
                    return new Menu(M.extend(true, {}, JSON.parse(menuData), ops, this.defaults));
                }else{
                    M.ajaxFn({
                        // url:ops.url,
                        url: M.interfacePath.privilege+'/t/rms/getMenuListByMemberForRf',
                        type:'post',
                        data:{
                            memberId: own.fetch('userInfo').comId,
                            userId: own.fetch('userInfo').userId
                        },
                        success:function(res){
                            console.log(res);
                            var data = res.data;
                            //根据后台返回 hidden 属性过滤菜单
                            var passedMenu = that.passedMenu(data.menu);
                            // console.log(passedMenu);
                            if(passedMenu.menu.length>0){
                                localStorage.setItem('menu', JSON.stringify(passedMenu));
                            }
                            return new Menu(M.extend(true, {}, passedMenu, ops, this.defaults));
                        }
                    })
                }
            }
        };
    });
})(window.jQuery, window);