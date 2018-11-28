;
(function(M, window) {
	M.ui.define('upload', function() {
		function Upload(ops,args) {
			this.ops=ops;
			this.init(args);
		};
		Upload.prototype = {
			constructor: Upload,
			init:function(args){
				this.ops.container.unbind('change').bind('change',{context:this},this.uploadFlie)
			},
			uploadFlie:function(e){
				var that=e.data.context,args=e.data.args;
				var _file = $(this);
			    var fileSize = 0,Size=0; 
			    var filetypes =that.ops.fileType; 
			    var filemaxsize = 1024*1024*2;//2M 
			    var filepath = _file.val(); 
			    if(filepath){ 
			    	var myExplorer = that.getExplorer();
			    	if(myExplorer == 'ie'){
			            var img = new Image();
			               img.src = filepath;
			               fileSize = img.fileSize > 0?img.fileSize:500;
			        }else{
			            fileSize = $(this)[0].files[0].size || $(this)[0].files[0].fileSize;
			        }
			        if(fileSize>filemaxsize || fileSize <= 0){
			            if(fileSize>filemaxsize){
			                alert('文件大小不能超过2M');
			            }
			            return false;
			        }
			        if (fileSize > 1024 * 1024){
		            	Size = ' ('+(Math.round(fileSize * 100 / (1024 * 1024)) / 100).toString() + 'MB)';
		        	}else{
		            	Size = ' ('+(Math.round(fileSize * 100 / 1024) / 100).toString() + 'KB)';
		        	}
			        var pathArr = that.getFilePath(filepath);
			        if(filetypes && filetypes.length>0){ 
			            if($.inArray(pathArr['fileExt'].toLowerCase(),filetypes) < 0){ 
			            	alert('上传的文件类型不是正确的文件类型')
			                return false; 
			            } else{
			            	if(that.ops.showFilesize==1){
			            		_file.next().find('.g-file-name').html('<i class="iconfont">&#xe743;</i>'+pathArr.file+Size)
			            	}else{
			            		_file.next().find('.g-file-name').html('<i class="iconfont">&#xe743;</i>'+pathArr.file)
			            	}
			            }
			        } 
			        M.isFunction(that.ops.callback)&&that.ops.callback.apply(that,args);
			    }else{ 
			        return false; 
			    } 
			},
			getFilePath:function(filePath){// 获取文件名称后缀 、不带后缀
				var path = [];
			    var pos = filePath.lastIndexOf('.');
			    var index=filePath.lastIndexOf("\\"); 
			    path['fileExt'] = filePath.substring(pos);   //获取后缀
			    path['fileName'] = filePath.substring(0,pos);//获取文件名，不带后缀
			    path['file'] = filePath.substring(index+1,filePath.length);
			    return path;
			},
			getObjectURL:function(target){//获取选择的文件的路径
				var url = null;
			    if (window.navigator.userAgent.indexOf("MSIE")>=1){  
			        target.select();  
			         url = document.selection.createRange().text;  
			    } else {
			        var file = $(target)[0].files[0];
			        if (window.createObjectURL != undefined) {
			            url = window.createObjectURL(file)
			        } else if (window.URL != undefined) {
			            url = window.URL.createObjectURL(file)
			        } else if (window.webkitURL != undefined) {
			            url = window.webkitURL.createObjectURL(file)
			        }
			    }
			    return url;
			},
			getExplorer:function(){//检查是什么浏览器
				var explorer = window.navigator.userAgent ;
			    if (explorer.indexOf("MSIE") >= 0) {//ie 
			        return "ie";
			    }else if (explorer.indexOf("Firefox") >= 0) {//firefox
			        return "Firefox"; 
			    }else if(explorer.indexOf("Chrome") >= 0){//Chrome
			        return "Chrome";
			    }else if(explorer.indexOf("Opera") >= 0){//Opera
			        return "Opera";
			    }else if(explorer.indexOf("Safari") >= 0){//Safari
			        return "Safari";
			    }
			},
		};
		return {
			defaults:{
				container:M('input[type="file"]'),
				showFilesize:true,
				fileType:[".jpg",".gif",".png",".bmp"],
				callback:function(that){}
			},	
			init:function(ops){
				return new Upload(M.extend(true,{},this.defaults,ops),[].slice.call(arguments,1));
			}
		};
	});
})(window.jQuery, window);