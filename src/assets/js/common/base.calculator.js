;(function(M,window){
	M.extend({
		arithmeticAdd:function(num1,num2,n){// 两个浮点数求和  
			var r1,r2,m;  
	        try{  
	            r1 = num1.toString().split('.')[1].length;  
	        }catch(e){  
	            r1 = 0;  
	        }  
	        try{  
	            r2=num2.toString().split(".")[1].length;  
	        }catch(e){  
	            r2=0;  
	        }  
	        m=Math.pow(10,Math.max(r1,r2));  
	        return (n==undefined)?Math.round(num1*m+num2*m)/m:(Math.round(num1*m+num2*m)/m).toFixed(n); 		
		},
		arithmeticSub:function(num1,num2,n){// 两个浮点数求差
			var r1,r2,m;  
	        try{  
	            r1 = num1.toString().split('.')[1].length;  
	        }catch(e){  
	            r1 = 0;  
	        }  
	        try{  
	            r2=num2.toString().split(".")[1].length;  
	        }catch(e){  
	            r2=0;  
	        }  
	        m=Math.pow(10,Math.max(r1,r2));  
	        return (n==undefined)?(Math.round(num1*m-num2*m)/m):(Math.round(num1*m-num2*m)/m).toFixed(n); 		
		},
		arithmeticDiv:function(num1,num2,n){  //两数相除
	        var t1,t2,r1,r2;  
	        try{  
	            t1 = num1.toString().split('.')[1].length;  
	        }catch(e){  
	            t1 = 0;  
	        }  
	        try{  
	            t2=num2.toString().split(".")[1].length;  
	        }catch(e){  
	           t2=0;  
	        }  
	        r1=Number(num1.toString().replace(".",""));  
	        r2=Number(num2.toString().replace(".",""));  
	       	var result =  (n==undefined)?M.arithmeticTim((r1/r2),Math.pow(10,t2-t1)):M.arithmeticTim((r1/r2),Math.pow(10,t2-t1),n)
	       	return result
    	},
    	arithmeticTim : function (num1, num2,n) {   //两数相乘
		  	var t1,t2,r1,r2; 
		  	try{  
		    	t1 = num1.toString().split('.')[1].length;  
		  	}  
		 	catch (e) {  
		 		t1 = 0;  
		 	}
		 	try {
		    	t2 = num2.toString().split('.')[1].length;  
		 	}catch (e) {  
		 		t2 = 0;
		  	}  
	  	 	r1=Number(num1.toString().replace(".",""));  
	        r2=Number(num2.toString().replace(".",""));  
	 		return (n==undefined)?(r1*r2) / Math.pow(10, t1+t2):((r1*r2) / Math.pow(10, t1+t2)).toFixed(n);  
		},
	});
})(window.jQuery,window);