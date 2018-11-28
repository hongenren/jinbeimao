/** 
 * 用途:进度条
 * 作者:小马
 * 日期：2018/5/10
 * @import base.common.js 
 * @target			object				(必选)外层容器
 * @percent			number				(必选)进度
 * @barWidth		number				(非必选)总长度	
 * @barStyle		string				(非必选)进度条风格  
 * ---barSize		string				(非必选)进度条大小		默认 空 (ui-progress-mini)
 * ---barRadius		string				(非必填)进度条是否圆角	默认ui-progress-radius
 * ---barTagging	boolean				(非必填)是否有数字标注	默认true					
 * ---barBg			string				(非必选)进度条颜色		 默认 ui-progress-blue (ui-progress-green,ui-progress-orange,ui-progress-red)
 * @callback		function			(非必填)进度完成后回调
 * 
 */
;(function(){
	M.ui.define('progressBar',function(){
		function ProgressBar(ops,args){
			this.ops=ops;
			this.init(args);
		};
		ProgressBar.prototype={
			constructor:ProgressBar,
			versions:'1.0.0',
			init:function(args){
				if(!this.ops.target.length) return;
				this.ops.barWidth === '' ? this.ops.barWidth = this.ops.target.width() : this.ops.target.css('width',this.ops.barWidth+'px');
				this.ops.target.addClass('ui-progress '+this.ops.barStyle.barSize+' '+this.ops.barStyle.barRadius+'');
				this.creatDom();
				this.percent();
			},
			creatDom:function(){
				this.bar = this.creatBar();
				this.barTagging = this.creatbarTagging();
				this.ops.barStyle.barTagging ? this.ops.target.append(this.bar.append(this.barTagging)) : this.ops.target.append(this.bar);
			},
			creatBar:function(){
				return M(M.creatlabel('div'),{'class':'ui-progress-bar '+this.ops.barStyle.barBg+''});
			},
			creatbarTagging:function(){
				return M(M.creatlabel('span'),{'class':'ui-progress-text'});
			},
			percent:function(){
				this.ops.barWidth = this.ops.target.width() === this.ops.barWidth ? this.ops.barWidth : this.ops.target.width();
				var that = this,level = this.ops.percent,w = that.ops.barWidth * level / 100;
				if (level > 100) {
	                level = 100;
	            }
				that.bar.animate({ width: w }, {
                    duration: that.ops.speed,
                    step: function (currentWidth) {
                    	that.bar.css('overflow','');
                        var percent = parseInt(currentWidth / that.ops.barWidth * 100);
                        if (isNaN(percent))
                            percent = 0;
                        	that.barTagging.html(percent + '%');
                    },
                    complete:function(){
                    	M.isFunction(that.ops.callback)&&that.ops.callback(that);
                    }
                });
			},
			refresh:function(){
				this.percent()
			}
		}
		return {
			defaults:{
				target:null,
				percent:0,
				speed:1000,
				barStyle:{
					barSize:'',
					barRadius:'ui-progress-radius',
					barTagging:true,
					barBg:'ui-progress-blue'
				},
				barWidth:'',
				callback:function(){}
			},	
			init:function(ops){
				return new ProgressBar(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		}
	})
})(window.jQuery||window.Zepto||window.xQuery,window)
