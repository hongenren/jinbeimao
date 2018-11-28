/**
 * 用途:公共库 作者:谢力 QQ：843926058 日期：2016/11/05
 * 
 * @import core/jquery-1.7.2.min.js
 */
;(function(M,window){
	M.extend({
		server:function(){// 服务器环境
		    return {
				0   : '', // 生产
				1   : '', // 测试
				2   : '',  // 开发
				888 : ''   // 本地
			}[888]/*
					 * [/\(updebug\s(\d+)\)/g.exec(navigator.userAgent.toLowerCase())[1]];//(updebug
					 * 888)
					 */
		}(),
		path:'', // 测试服务器地址
		interfacePath:function(){
			// var server= 'http://testbao.ouyeelf.com/';
            var server= '';  //  localhost
			var casUrl= '';  // 测试
			var capUrl= '';
			var loginUrl = '';
			var loginTransfer = '';
			var serviceUrl = '';
			var serviceUploadUrl = '';
			var finServer = '';
			var assetsUpload = '';
			var license = '';
			var hrefStr = window.location.href;
			if(hrefStr.indexOf('localhost')!=-1){    // 本地
				server= 'http://testbao.ouyeelf.com/'; 
				casUrl= 'http://uatcas.ouyeelf.com/cas/'; 
				capUrl= 'http://uatcap.ouyeelf.com/cap/';
                loginUrl = server+'ftb-web/template/basic/login.html';
				loginTransfer = server+'ftb-web/template/basic/loginTransfer.html';
				serviceUrl = 'http://testbao.ouyeelf.com/api/';
				serviceUploadUrl = 'http://testbao.ouyeelf.com/zuul/api/';
				finServer = 'http://uatrz.shdongchan.com/oyrz_finance_web/';
				assetsUpload = 'http://10.60.36.160:8008/zuul/api/assets/t/uploadFile';
				license = 'MIIFawYJKoZIhvcNAQcCoIIFXDCCBVgCAQExDjAMBggqgRzPVQGDEQUAMIGxBgkqhkiG9w0BBwGggaMEgaB7Iklzc3VlciI6IigoLipPPeWkqeWogeivmuS/oea1i+ivleezu+e7ny4qKXsxfSkiLCJ2ZXJzaW9uIjoiMS4wLjAuMSIsInNvZnRWZXJzaW9uIjoiMy4xLjAuMCIsIm5vdGFmdGVyIjoiMjAyNS0wOC0wNyIsIm5vdGJlZm9yZSI6IjIwMTUtMDgtMDciLCJub0FsZXJ0IjoidHJ1ZSJ9oIIDRDCCA0AwggLloAMCAQICFF8lnNrMgrt+8wWzAHuLjsm9+bXyMAwGCCqBHM9VAYN1BQAwVTEmMCQGA1UEAwwd5aSp6K+a5a6J5L+h5rWL6K+VU00y55So5oi3Q0ExDjAMBgNVBAsMBVRPUENBMQ4wDAYDVQQKDAVUT1BDQTELMAkGA1UEBhMCQ04wHhcNMTQwOTI2MDc0NjA4WhcNMTUwOTI2MDc0NjA4WjAxMRgwFgYDVQQDDA9TaWduRVNBMjAxNDA5MjcxFTATBgNVBAoMDOWkqeivmuWuieS/oTBZMBMGByqGSM49AgEGCCqBHM9VAYItA0IABJYWeFLmIy9mTud+ai0LBeLoxhgnO6HcQGbsQhl4fveJzoVx0Cyzt/xvWY5y7l3qAwd59AbI+Im6Ftl/wAOShYmjggGzMIIBrzAJBgNVHRMEAjAAMAsGA1UdDwQEAwIGwDCBigYIKwYBBQUHAQEEfjB8MHoGCCsGAQUFBzAChm5odHRwOi8vWW91cl9TZXJ2ZXJfTmFtZTpQb3J0L1RvcENBL3VzZXJFbnJvbGwvY2FDZXJ0P2NlcnRTZXJpYWxOdW1iZXI9NUE0N0VDRjEwNTgwNEE1QzZBNUIyMjkyOUI3NURGMERGQkMwRDc5NjBXBgNVHS4EUDBOMEygSqBIhkZQb3J0L1RvcENBL3B1YmxpYy9pdHJ1c2NybD9DQT01QTQ3RUNGMTA1ODA0QTVDNkE1QjIyOTI5Qjc1REYwREZCQzBENzk2MG8GA1UdHwRoMGYwZKBioGCGXmh0dHA6Ly9Zb3VyX1NlcnZlcl9OYW1lOlBvcnQvVG9wQ0EvcHVibGljL2l0cnVzY3JsP0NBPTVBNDdFQ0YxMDU4MDRBNUM2QTVCMjI5MjlCNzVERjBERkJDMEQ3OTYwHwYDVR0jBBgwFoAUPYnGR8txhbDZO9ZIsInZ5/7v2tkwHQYDVR0OBBYEFEs77X+HgoaHoBKSsS7mACXYtREAMAwGCCqBHM9VAYN1BQADRwAwRAIgvbTXF8yNH5jsbG6r7XL5LEupJd8l8x9akz8rhO5XYYICIOg+hxn5F44N5+waqG+1Dbs6m9xiID83VkHnmptdMoR7MYIBRTCCAUECAQEwbTBVMSYwJAYDVQQDDB3lpKnor5rlronkv6HmtYvor5VTTTLnlKjmiLdDQTEOMAwGA1UECwwFVE9QQ0ExDjAMBgNVBAoMBVRPUENBMQswCQYDVQQGEwJDTgIUXyWc2syCu37zBbMAe4uOyb35tfIwDAYIKoEcz1UBgxEFAKBpMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE1MDgwNzE3MzAyM1owLwYJKoZIhvcNAQkEMSIEIBJeyebFtFcougN8kN5ifp/xrvvpdpJHPpvMi7oR2OSzMAwGCCqBHM9VAYItBQAERjBEAiD+AQLvSOXePUd9WHU5k8G3erod8GhQodK+GkEbvHh0vgIg4LEj7wpevBgJ88qrf/5HNTAeQP482Jb33xoGPFuj2Mw=';
			}else if(hrefStr.indexOf('http://testbao.ouyeelf.com/')!=-1){   // 测试
				server= 'http://testbao.ouyeelf.com/'; 
				casUrl= 'http://uatcas.ouyeelf.com/cas/';  
				capUrl= 'http://uatcap.ouyeelf.com/cap/';
                loginUrl = server+'ftb-web/template/basic/login.html';
				loginTransfer = server+'ftb-web/template/basic/loginTransfer.html';
				serviceUrl = 'http://testbao.ouyeelf.com/api/';
				serviceUploadUrl = 'http://testbao.ouyeelf.com/zuul/api/';
				finServer = 'http://uatrz.shdongchan.com/oyrz_finance_web/';
				assetsUpload = 'http://10.60.36.160:8008/zuul/api/assets/t/uploadFile';
				license = 'MIIFawYJKoZIhvcNAQcCoIIFXDCCBVgCAQExDjAMBggqgRzPVQGDEQUAMIGxBgkqhkiG9w0BBwGggaMEgaB7Iklzc3VlciI6IigoLipPPeWkqeWogeivmuS/oea1i+ivleezu+e7ny4qKXsxfSkiLCJ2ZXJzaW9uIjoiMS4wLjAuMSIsInNvZnRWZXJzaW9uIjoiMy4xLjAuMCIsIm5vdGFmdGVyIjoiMjAyNS0wOC0wNyIsIm5vdGJlZm9yZSI6IjIwMTUtMDgtMDciLCJub0FsZXJ0IjoidHJ1ZSJ9oIIDRDCCA0AwggLloAMCAQICFF8lnNrMgrt+8wWzAHuLjsm9+bXyMAwGCCqBHM9VAYN1BQAwVTEmMCQGA1UEAwwd5aSp6K+a5a6J5L+h5rWL6K+VU00y55So5oi3Q0ExDjAMBgNVBAsMBVRPUENBMQ4wDAYDVQQKDAVUT1BDQTELMAkGA1UEBhMCQ04wHhcNMTQwOTI2MDc0NjA4WhcNMTUwOTI2MDc0NjA4WjAxMRgwFgYDVQQDDA9TaWduRVNBMjAxNDA5MjcxFTATBgNVBAoMDOWkqeivmuWuieS/oTBZMBMGByqGSM49AgEGCCqBHM9VAYItA0IABJYWeFLmIy9mTud+ai0LBeLoxhgnO6HcQGbsQhl4fveJzoVx0Cyzt/xvWY5y7l3qAwd59AbI+Im6Ftl/wAOShYmjggGzMIIBrzAJBgNVHRMEAjAAMAsGA1UdDwQEAwIGwDCBigYIKwYBBQUHAQEEfjB8MHoGCCsGAQUFBzAChm5odHRwOi8vWW91cl9TZXJ2ZXJfTmFtZTpQb3J0L1RvcENBL3VzZXJFbnJvbGwvY2FDZXJ0P2NlcnRTZXJpYWxOdW1iZXI9NUE0N0VDRjEwNTgwNEE1QzZBNUIyMjkyOUI3NURGMERGQkMwRDc5NjBXBgNVHS4EUDBOMEygSqBIhkZQb3J0L1RvcENBL3B1YmxpYy9pdHJ1c2NybD9DQT01QTQ3RUNGMTA1ODA0QTVDNkE1QjIyOTI5Qjc1REYwREZCQzBENzk2MG8GA1UdHwRoMGYwZKBioGCGXmh0dHA6Ly9Zb3VyX1NlcnZlcl9OYW1lOlBvcnQvVG9wQ0EvcHVibGljL2l0cnVzY3JsP0NBPTVBNDdFQ0YxMDU4MDRBNUM2QTVCMjI5MjlCNzVERjBERkJDMEQ3OTYwHwYDVR0jBBgwFoAUPYnGR8txhbDZO9ZIsInZ5/7v2tkwHQYDVR0OBBYEFEs77X+HgoaHoBKSsS7mACXYtREAMAwGCCqBHM9VAYN1BQADRwAwRAIgvbTXF8yNH5jsbG6r7XL5LEupJd8l8x9akz8rhO5XYYICIOg+hxn5F44N5+waqG+1Dbs6m9xiID83VkHnmptdMoR7MYIBRTCCAUECAQEwbTBVMSYwJAYDVQQDDB3lpKnor5rlronkv6HmtYvor5VTTTLnlKjmiLdDQTEOMAwGA1UECwwFVE9QQ0ExDjAMBgNVBAoMBVRPUENBMQswCQYDVQQGEwJDTgIUXyWc2syCu37zBbMAe4uOyb35tfIwDAYIKoEcz1UBgxEFAKBpMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE1MDgwNzE3MzAyM1owLwYJKoZIhvcNAQkEMSIEIBJeyebFtFcougN8kN5ifp/xrvvpdpJHPpvMi7oR2OSzMAwGCCqBHM9VAYItBQAERjBEAiD+AQLvSOXePUd9WHU5k8G3erod8GhQodK+GkEbvHh0vgIg4LEj7wpevBgJ88qrf/5HNTAeQP482Jb33xoGPFuj2Mw=';
			}else if(hrefStr.indexOf('http://tongbao.ouyeelf.com')!=-1){   // 正式
				server= 'http://tongbao.ouyeelf.com/'; 
				casUrl= 'http://cas.ouyeelf.com/cas/';  
				capUrl= 'http://member.ouyeelf.com/cap/';
                loginUrl = server+'ftb-web/template/basic/login.html';
				loginTransfer = server+'ftb-web/template/basic/loginTransfer.html';
				serviceUrl = 'http://tongbao.ouyeelf.com/api/';
				serviceUploadUrl = 'http://tongbao.ouyeelf.com/zuul/api/';
				finServer = 'http://rz.ouyeelf.com/oyrz_finance_web/';
				assetsUpload = 'http://tongbao.ouyeelf.com/zuul/api/assets/t/uploadFile';
				license = 'MIIFawYJKoZIhvcNAQcCoIIFXDCCBVgCAQExDjAMBggqgRzPVQGDEQUAMIGxBgkqhkiG9w0BBwGggaMEgaB7Iklzc3VlciI6IigoLipPPeWkqeWogeivmuS/oea1i+ivleezu+e7ny4qKXsxfSkiLCJ2ZXJzaW9uIjoiMS4wLjAuMSIsInNvZnRWZXJzaW9uIjoiMy4xLjAuMCIsIm5vdGFmdGVyIjoiMjAyNS0wOC0wNyIsIm5vdGJlZm9yZSI6IjIwMTUtMDgtMDciLCJub0FsZXJ0IjoidHJ1ZSJ9oIIDRDCCA0AwggLloAMCAQICFF8lnNrMgrt+8wWzAHuLjsm9+bXyMAwGCCqBHM9VAYN1BQAwVTEmMCQGA1UEAwwd5aSp6K+a5a6J5L+h5rWL6K+VU00y55So5oi3Q0ExDjAMBgNVBAsMBVRPUENBMQ4wDAYDVQQKDAVUT1BDQTELMAkGA1UEBhMCQ04wHhcNMTQwOTI2MDc0NjA4WhcNMTUwOTI2MDc0NjA4WjAxMRgwFgYDVQQDDA9TaWduRVNBMjAxNDA5MjcxFTATBgNVBAoMDOWkqeivmuWuieS/oTBZMBMGByqGSM49AgEGCCqBHM9VAYItA0IABJYWeFLmIy9mTud+ai0LBeLoxhgnO6HcQGbsQhl4fveJzoVx0Cyzt/xvWY5y7l3qAwd59AbI+Im6Ftl/wAOShYmjggGzMIIBrzAJBgNVHRMEAjAAMAsGA1UdDwQEAwIGwDCBigYIKwYBBQUHAQEEfjB8MHoGCCsGAQUFBzAChm5odHRwOi8vWW91cl9TZXJ2ZXJfTmFtZTpQb3J0L1RvcENBL3VzZXJFbnJvbGwvY2FDZXJ0P2NlcnRTZXJpYWxOdW1iZXI9NUE0N0VDRjEwNTgwNEE1QzZBNUIyMjkyOUI3NURGMERGQkMwRDc5NjBXBgNVHS4EUDBOMEygSqBIhkZQb3J0L1RvcENBL3B1YmxpYy9pdHJ1c2NybD9DQT01QTQ3RUNGMTA1ODA0QTVDNkE1QjIyOTI5Qjc1REYwREZCQzBENzk2MG8GA1UdHwRoMGYwZKBioGCGXmh0dHA6Ly9Zb3VyX1NlcnZlcl9OYW1lOlBvcnQvVG9wQ0EvcHVibGljL2l0cnVzY3JsP0NBPTVBNDdFQ0YxMDU4MDRBNUM2QTVCMjI5MjlCNzVERjBERkJDMEQ3OTYwHwYDVR0jBBgwFoAUPYnGR8txhbDZO9ZIsInZ5/7v2tkwHQYDVR0OBBYEFEs77X+HgoaHoBKSsS7mACXYtREAMAwGCCqBHM9VAYN1BQADRwAwRAIgvbTXF8yNH5jsbG6r7XL5LEupJd8l8x9akz8rhO5XYYICIOg+hxn5F44N5+waqG+1Dbs6m9xiID83VkHnmptdMoR7MYIBRTCCAUECAQEwbTBVMSYwJAYDVQQDDB3lpKnor5rlronkv6HmtYvor5VTTTLnlKjmiLdDQTEOMAwGA1UECwwFVE9QQ0ExDjAMBgNVBAoMBVRPUENBMQswCQYDVQQGEwJDTgIUXyWc2syCu37zBbMAe4uOyb35tfIwDAYIKoEcz1UBgxEFAKBpMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE1MDgwNzE3MzAyM1owLwYJKoZIhvcNAQkEMSIEIBJeyebFtFcougN8kN5ifp/xrvvpdpJHPpvMi7oR2OSzMAwGCCqBHM9VAYItBQAERjBEAiD+AQLvSOXePUd9WHU5k8G3erod8GhQodK+GkEbvHh0vgIg4LEj7wpevBgJ88qrf/5HNTAeQP482Jb33xoGPFuj2Mw=';
//				license = 'MIIGBAYJKoZIhvcNAQcCoIIF9TCCBfECAQExDjAMBggqgRzPVQGDEQUAMIIBSQYJKoZIhvcNAQcBoIIBOgSCATZ7Iklzc3VlciI6IigoKC4qQ049RWFzdGVybnBheSBDQS4qKXwoLipPVT1DQSBDZW50ZXIuKil8KC4qTz1FYXN0ZXJucGF5LiopfCguKkM9Q04uKikpezR9fCgoLipDTj1FYXN0ZXJucGF5IENBLiopfCguKk9VPeS6p+WTgeacjeWKoemDqC4qKXwoLipPPeS4nOaWueS7mOmAmuS/oeaBr+aKgOacr+aciemZkOWFrOWPuC4qKXwoLipDPUNOLiopKXs0fSkiLCJ2ZXJzaW9uIjoiMS4wLjAuMSIsInNvZnRWZXJzaW9uIjoiMy4xLjAuMCIsIm5vdGFmdGVyIjoiMjA2Ni0xMS0xMCIsIm5vdGJlZm9yZSI6IjIwMTYtMTEtMTAiLCJub0FsZXJ0IjoidHJ1ZSJ9oIIDRDCCA0AwggLloAMCAQICFF8lnNrMgrt+8wWzAHuLjsm9+bXyMAwGCCqBHM9VAYN1BQAwVTEmMCQGA1UEAwwd5aSp6K+a5a6J5L+h5rWL6K+VU00y55So5oi3Q0ExDjAMBgNVBAsMBVRPUENBMQ4wDAYDVQQKDAVUT1BDQTELMAkGA1UEBhMCQ04wHhcNMTQwOTI2MDc0NjA4WhcNMTUwOTI2MDc0NjA4WjAxMRgwFgYDVQQDDA9TaWduRVNBMjAxNDA5MjcxFTATBgNVBAoMDOWkqeivmuWuieS/oTBZMBMGByqGSM49AgEGCCqBHM9VAYItA0IABJYWeFLmIy9mTud+ai0LBeLoxhgnO6HcQGbsQhl4fveJzoVx0Cyzt/xvWY5y7l3qAwd59AbI+Im6Ftl/wAOShYmjggGzMIIBrzAJBgNVHRMEAjAAMAsGA1UdDwQEAwIGwDCBigYIKwYBBQUHAQEEfjB8MHoGCCsGAQUFBzAChm5odHRwOi8vWW91cl9TZXJ2ZXJfTmFtZTpQb3J0L1RvcENBL3VzZXJFbnJvbGwvY2FDZXJ0P2NlcnRTZXJpYWxOdW1iZXI9NUE0N0VDRjEwNTgwNEE1QzZBNUIyMjkyOUI3NURGMERGQkMwRDc5NjBXBgNVHS4EUDBOMEygSqBIhkZQb3J0L1RvcENBL3B1YmxpYy9pdHJ1c2NybD9DQT01QTQ3RUNGMTA1ODA0QTVDNkE1QjIyOTI5Qjc1REYwREZCQzBENzk2MG8GA1UdHwRoMGYwZKBioGCGXmh0dHA6Ly9Zb3VyX1NlcnZlcl9OYW1lOlBvcnQvVG9wQ0EvcHVibGljL2l0cnVzY3JsP0NBPTVBNDdFQ0YxMDU4MDRBNUM2QTVCMjI5MjlCNzVERjBERkJDMEQ3OTYwHwYDVR0jBBgwFoAUPYnGR8txhbDZO9ZIsInZ5/7v2tkwHQYDVR0OBBYEFEs77X+HgoaHoBKSsS7mACXYtREAMAwGCCqBHM9VAYN1BQADRwAwRAIgvbTXF8yNH5jsbG6r7XL5LEupJd8l8x9akz8rhO5XYYICIOg+hxn5F44N5+waqG+1Dbs6m9xiID83VkHnmptdMoR7MYIBRTCCAUECAQEwbTBVMSYwJAYDVQQDDB3lpKnor5rlronkv6HmtYvor5VTTTLnlKjmiLdDQTEOMAwGA1UECwwFVE9QQ0ExDjAMBgNVBAoMBVRPUENBMQswCQYDVQQGEwJDTgIUXyWc2syCu37zBbMAe4uOyb35tfIwDAYIKoEcz1UBgxEFAKBpMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE0MTExMTE1MzIyMVowLwYJKoZIhvcNAQkEMSIEIL1us15H+d6Hw73Ty0cQZpr/mXZs+PouVe27U6NVJ7+RMAwGCCqBHM9VAYItBQAERjBEAiCllcCaJtT9Fhjl4ZLoX3EU4aEibUi/E3+jxZj11/NhWwIgvhDRrJiMhZGuW6v9rhBtAMsOW++s+Km6W36wD4BJLWg=';
			}

			return {
				server: server,
				bill:  serviceUrl+'bill/',
				assets:serviceUrl+'assets/',
				assetsUpload:assetsUpload,
				basic: serviceUrl+'basic/',
                privilege: serviceUrl+'privilege/',
				financing: finServer,
				license: license,
				
				//登录、退出相关
				casUrl:casUrl,
				capUrl:capUrl,
				forgetPwd:capUrl+'company/forgetPassword?sysCode=RZ',//忘记密码
				capRegUrl:capUrl+'company/noMenu/returncompanyReg?sysCode=RZ',//注册页面
				loginUrl:server+'ftb-web/template/basic/login.html',//登录页面
				loginTransfer:loginTransfer,//登录转发页面
				logoutUrl:capUrl+'logoutcall.jsp',//退出登录地址
				remoteLogin:casUrl+'remoteLogin?service='+encodeURIComponent(loginTransfer)+'%3Fsyscode%3DRZ%26originalTargetUri%3D%252Fmain%252FhomePageLogin.do',
				singleLogin:casUrl+'remoteLogin?service='+encodeURIComponent(loginTransfer)+'%3Fsyscode%3DRZ%26originalTargetUri%3D%252Fmain%252FhomePageLogin.do&remoteLoginPage='+encodeURIComponent(loginUrl),
				verificationUrl:casUrl+'getCaptchaImage?d='
			}
		}(),
		isString:function(obj){// 是否字符串
			return this.type(obj)==='string';
		},
		isBoolean:function(obj){// 是否boolean
			return this.type(obj)==='boolean';
		},
		isDate:function(obj){ // 是否日期
			return this.type(obj)==='date';
		},
		isRegExp:function(obj){// 是否正则
			return this.type(obj)==='regexp';
		},
		isObject:function(obj){// 是否普通对象
			return this.type(obj)==='object';
		},
		context:function(fn,context){
			return this.isFunction(fn)?fn.apply(context||this,[].slice.call(arguments,2)):fn;
		},
		delay:function(time,callback){// 延迟
			return this.isNumeric(time)&&this.context(function(that,args){
				setTimeout(function(){
					callback&&callback.apply(that||this,args);	
				},time);	
			},null,arguments[2],[].slice.call(arguments,3));
		},
		setNumberPoint:function(number,n){// 保留n位小数,默认2位
			return this.isString(number)?number:this.isNumeric(number)?(Math.round(number*Math.pow(10,n||2))*Math.pow(0.1,n||2)).toFixed(n||2):number;
		},
		getArraySum:function(obj,s){// 数组求和(递加|递减)
			return this.isArray(obj)&&obj.length>0?eval(obj.join({1:String.fromCharCode(43),'-1':String.fromCharCode(45)}[s||1])):obj;	
		},
		JsonToString:function(obj){// json to string
			return this.isPlainObject(obj)?JSON.stringify(obj):obj;
		},
		StringToJson:function(obj){// string to json
			if(this.isString(obj)){
				try{  
					return JSON.parse(obj);
				}catch(e){   
					return obj;  
				}; 	
			}else{
				return obj;
			};
		},
        //获取url中的参数
        getUrlParam:function(num) {
        	var reg = new RegExp("(^|&)" + num + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        	if (r != null) return unescape(r[2]); return null; //返回参数值
    	},
      	TimeDifference:function (date1,date2) {
			var _dt1 = new Date(date1);
			var _dt2 = new Date(date2);
			var dt1 = _dt1.getTime();
			var dt2 = _dt2.getTime();

            var days = (parseInt(Math.abs(dt1 - dt2) / 1000 / 60 / 60 / 24));
			if (_dt1.getFullYear() === _dt2.getFullYear() && _dt1.getMonth() === _dt2.getMonth() && _dt1.getDate() === _dt2.getDate() ) {
                return "剩0天";
			}

			if(dt1<dt2){
				return "已逾期";
			}else{
                return "剩"+days+"天";
			}
    	},
        aTimeDifference:function (date1,date2) {
            var _dt1 = new Date(date1);
            var _dt2 = new Date(date2);
            var dt1 = _dt1.getTime();
            var dt2 = _dt2.getTime();

            var days = (parseInt(Math.abs(dt1 - dt2) / 1000 / 60 / 60 / 24));
            if (_dt1.getFullYear() === _dt2.getFullYear() && _dt1.getMonth() === _dt2.getMonth() && _dt1.getDate() === _dt2.getDate() ) {
                return "剩0天";
            }

            if(dt1<dt2){
                return "";
            }else{
                return days;
            }
        },
        workbenchTimeDiff:function (date1,date2) {
            var _dt1 = new Date(date1);
            var _dt2 = new Date(date2);
            var dt1 = _dt1.getTime();
            var dt2 = _dt2.getTime();

            var days = (parseInt(Math.abs(dt1 - dt2) / 1000 / 60 / 60 / 24)+1);
            if (_dt1.getFullYear() === _dt2.getFullYear() && _dt1.getMonth() === _dt2.getMonth() && _dt1.getDate() === _dt2.getDate() ) {
                return "剩0天";
            }

            if(dt1<dt2){
                return "已逾期";
            }else{
                return "剩"+days+"天";
            }
        },
        currentDate:function(){
            var now = new Date();
            var year = now.getFullYear();
            var month =(now.getMonth() + 1).toString();
            var day = (now.getDate()).toString();
            if (month.length == 1) {
                month = "0" + month;
            }
            if (day.length == 1) {
                day = "0" + day;
            }
            var dateTime = year +"-"+ month +"-"+  day;
            return dateTime;
		},
        amount: function (number, decimals, dec_point, thousands_sep) {// 格式化人民币
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function (n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.ceil(n * k) / k;
                };

            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            while (re.test(s[0])) {
                s[0] = s[0].replace(re, "$1" + sep + "$2");
            }

            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
        timetrans: function (date) {// 格式化日期
            {
                var date = new Date(date);
                var YY = date.getFullYear() + '-';
                var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return YY + MM + DD;
            }
        },
        timetrans_cn: function (date) {// 格式化日期 年月日
            {
                var date = new Date(date);
                var YY = date.getFullYear() + '年';
                var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
                var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())+ '日';
                var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return YY + MM + DD;
            }
        },
        //flag: days 传入类型按30天计算一个月
        //dataInfo  传入 月份
        getDateScope: function(flag,AddDayCount) {
           if(flag=="days"){
             var dd = new Date();
             dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
             var y = dd.getFullYear();
             var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
             var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
             return y+"-"+m+"-"+d;
           } else {
           //Todo 自然月计算逻辑
           }
        },
        GetDateStr: function (AddDayCount) {

		},
        ajaxFn: function(options) {// 封装ajax

            if (localStorage.userInfo){
            	var auth = own.fetch('userInfo').token;
            }

		//	 var auth = "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJjYmEwZTgzZmYzNTE0ODZjYmFlZDc4YTU1ZDE0MzdmZSIsImlhdCI6MTUzMzcxOTA1MSwic3ViIjoiRjEwMDUwMzNDMSIsImRhdGEiOnsiYnVzaW5lc3NDcmVkaXRObyI6IiIsIm9wZXJhdGVJZCI6IkYxMDA1MDMzQzEiLCJjdXN0b21lcklkIjoiRjEwMDUwMzMiLCJ0YXhOdW0iOiI0MzQ2NjQ0Njc1NDU1NCIsIm9wZXJhdGVOYW1lIjoi5oi05qKmIiwidXNlclJvbGUiOlsiUjEwIl0sImN1c3RvbWVyTmFtZSI6Iui_kOmSoue9kea1i-ivlei0puWPtyJ9LCJleHAiOjE1MzM3MjA4NTF9.ceMvUvn_CgDjSy1U6EIHrBSv3SgxM9tGN-DECtXDRIFSZ7JwVUH2cGA_HJynKwH9f8eZfe9iumpG2LkacoJbbA"

            var defaults = {
                url: '',
                isReach: true,
                data: {},
                type: 'POST',
                noBomb:true,
                async:true,
                contentType: 'application/json',
                beforeSend: function(XMLHttpRequest) {

                    if(auth && typeof auth !== 'undefined') {
                        XMLHttpRequest.setRequestHeader('Authorization', auth);
                    }else{
                        var targetUrl = window.location.href;
                        own.save('targetUrl', targetUrl);
                        window.location.href = M.interfacePath.singleLogin;
					}


                },
                success: function() {

                },
                error: function() {

                }
            };

            var settings = {};
            settings = M.extend(settings, defaults, options);

            	// 判断ie 做数据跨域
                if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0") {

                    // 新建 input隐藏域
                    var timestamp = Date.parse(new Date());
                    var idOne = 'input' + timestamp;
                    var Minput1 = M('<input type="hidden" id="' + idOne + '" value=' + JSON.stringify(settings.data) + ' />'); // data
                    M('body').append(Minput1);

                    var Minput2 = M('<input type="hidden" id="input' + timestamp + '_url" value="' + settings.url + '" />'); // url
																																// //3
																																// token=auth
																																// type=method
                    M('body').append(Minput2);

                    // var
					// sur=settings.url+"/ryplat/helper/cross?containerId=''?";

                    var sur = settings.url.substring(0, settings.url.indexOf('.com') + 4); // url

                    strUrl = '?token=' + auth + '&method=' + settings.type + '&containerId=' + idOne;

                    var urlZong = settings.url + '/ryplat/helper/cross' + strUrl;

                    // 新建iframe
                    var Miframe = M('<iframe id="iframe" src="' + urlZong + '" style="display:none;" >');
                    M('body').append(Miframe);

                }

                var jsonData = null;

                if(typeof options.data == 'string' || settings.type.toLowerCase() == 'get') {
                    jsonData = options.data;
                } else {
                    jsonData = JSON.stringify(settings.data);
                }

                M.ajax({
                    url: settings.url,
                    data: jsonData,
                    type: settings.type,
                    contentType: settings.contentType,
                    async:settings.async,
                    beforeSend: settings.beforeSend,
                    success: function(data, status, xhr) {
                        var jsonResData = null;
                         if (typeof data == 'string') {
                                    try {
                                        jsonResData=JSON.parse(data);
                                    } catch(e) {
                                         jsonResData = data;
                                    }
                                }
                         else {
                            jsonResData = data;
                        }
                        if(jsonResData.code == "TK07"){
                            return window.location.href='../basic/userAgreement.html';
                        }else if(jsonResData.code == "RY00"){
                            return window.location.href='../basic/500.html';
                        }else if(xhr.status == 404){
                            return window.location.href='../basic/404.html';
                        }else if(xhr.status == 500){
                            return window.location.href= '../basic/500.html';
                        }
                        if(settings.noBomb && M('#tken1').length<1 && M('#tken2').length<1){
                            if(!jsonResData.success && jsonResData.code){
                                if(jsonResData.code.indexOf('TK')>=0){
                                    var codeStr=jsonResData.code;
                                    var cod=Number(codeStr.substring(codeStr.indexOf('TK')+2));

                                    if(cod<5){  // 登录超时
                                    	// /own.logout();
//                                    	localStorage.removeItem("userInfo");
//                                    	window.location.href=M.interfacePath.server+"/ftb-web/template/basic/login.html";
                                        return window.location.href = M.interfacePath.singleLogin;
                                    }
                                    else if(cod==5){
                                    	// own.logout();
//                                        window.location.href=M.interfacePath.server+"/ftb-web/template/basic/login.html";
                                        return window.location.href = M.interfacePath.singleLogin;
                                    }
                                    else if(cod==6 || cod==7){  // 无权限
                                    	//Todo 这里需要调整，无权限应该是跳转到无权限页面
                                        return window.location.href='../basic/500.html';
                                    }
                                }
                            }
                        }

                    var auth = xhr.getResponseHeader("Authorization");

                    if(auth && window.localStorage) {
                    	 var userInfo = own.fetch('userInfo');
                         userInfo["token"] = auth;
                         // 存token
                         own.save('userInfo', userInfo);

//                    	var tempKey = 'userInfo';
//                        window.localStorage.setItem(tempKey, JSON.stringify(userInfo));
                    }

                    if(M('#tken1').length<1 && M('#tken2').length<1){
                        settings.success(data, status);
                    }

                },
                error: function(data) {

                    settings.error(data);
                },
                complete: function() {

                }
            });
        },

		formatDate:function(number){// 格式化数字
			return this.isNumeric(number)?number<10?'0'+number:number:number;
		},
		getWeekend:function(date){// 获取星期
			return '星期'+['日','一','二','三','四','五','六'][(this.isDate(date)?date:new Date()).getDay()];
		},
		getArrayIndex:function(arr,value){// 匹配数组中value对应索引
			arr=arr.toString();
			return arr.indexOf(value)>=0?arr.replace(new RegExp('((^|,)'+value+'(,|$))','gi'),'$2@$3').replace(/[^,@]/g,'').indexOf('@'):-1;
		},
		arrayToJson:function(arr,obj){// 数组转对象
			if(M.isArray(arr)&&arr.length){
				obj=M.isObject(obj)?obj:{};
				for(var i=0;i<arr.length;i++){
					if(obj[arr[i].name]){
						if(!M.isArray(obj[arr[i].name])){
							obj[arr[i].name]=[obj[arr[i].name]];
						};
						obj[arr[i].name].push(arr[i].value);
					}else{
						obj[arr[i].name]=arr[i].value;
					};
				};
				return obj;
			};
			return arr;
		},
		getFormatTellphone:function(s){// 格式化手机号码
			s=s.toString();
			return s.substr(0,3)+String.fromCharCode(32)+s.substr(3,4)+String.fromCharCode(32)+s.substring(7);
		},
		getFormatNumber:function(s,n){// 格式化数字
										// 例如['13,234,234.89','9,872,980','8,872.10']
			if(this.isNumeric(s)){
				 s+='';
				 s.indexOf('.')==-1&&parseFloat(s.replace(/[^\d\.-]/g,'')).toFixed(n||2);
				 var l=s.split('.')[0].split('').reverse();
				 for(var i=0,t='';i<l.length;i++){
					t+=l[i]+((i+1)%3==0&&(i+1)!=l.length?',':'');
				 };
				 return t.split('').reverse().join('')+(s.indexOf('.')==-1?'.'+new Array((n||2)+1).join('0'):Number('0.'+s.split('.')[1]).toFixed(n||2).toString().substring(1));
			};
			return s;
		},
		getChineseNumberOld:function(number){// 金额转大写
			if(this.isNumeric(number)){
				var AA=['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'],
					BB=['','拾','佰','仟','万','亿','圆',''],
					CC=['角', '分', '厘'];
				var a =number.toString().replace(/(^0*)/g, '').split('.'), k = 0, re = '';
				for(var i=a[0].length-1;i>=0;i--){
					switch(k){
						case 0 : re = BB[7] + re; break;
						case 4 : !new RegExp('0{4}\\d{'+ (a[0].length-i-1) +'}M').test(a[0])&&(re = BB[4] + re); break;
						case 8 : re = BB[5] + re; BB[7] = BB[5]; k = 0; break;
					};
					if(k%4 == 2 && a[0].charAt(i)=='0' && a[0].charAt(i+2) != '0') re = AA[0] + re;
					if(a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k%4] + re; k++;
				};
				if(a.length>1){
					re+=BB[6];
					for(var i=0;i<a[1].length;i++){
						if(a[1].length >=2 && a[1].charAt(0) !== '0' && a[1].charAt(1) !== '0') {
                            re+= AA[a[1].charAt(i)]+CC[i];
						}else if (a[1].length == 1 && a[1].charAt(0) !== '0') {
                            re+= AA[a[1].charAt(i)]+CC[i]+'整';
						}
						if(i==2) break;
					};
                    if(a[1].charAt(0) !== '0' && a[1].charAt(1) == '0') {
                        re+= AA[a[1].charAt(0)]+CC[0]+'整';
                    }
                    if(a[1].charAt(0) == '0' && a[1].charAt(1) > 0) {
                        re+= AA[a[1].charAt(1)]+CC[1];
                    }
                    if(a[1].charAt(0) == '0' && a[1].charAt(1) == '0') {
                        re+='整';
                    }
                    if(a[1].length == 1 && a[1].charAt(0) == '0') {
                        re+='整';
                    }
				}else{
					re+='圆整';
				};
				return re;
			};
			return number;
		},
        getChineseNumber: function(n){
			var fraction = ['角', '分'];
			var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
			var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
			var head = n < 0? '欠': '';
			n = Math.abs(n);

			var s = '';

			for (var i = 0; i < fraction.length; i++)
			{
				s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
			}
			s = s || '整';
			n = Math.floor(n);

			for (var i = 0; i < unit[0].length && n > 0; i++)
			{
				var p = '';
				for (var j = 0; j < unit[1].length && n > 0; j++)
				{
					p = digit[n % 10] + unit[1][j] + p;
					n = Math.floor(n / 10);
				}
				s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
			}
			return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    	},
		getFormatCard:function(card,m){// 格式化银行卡号 @card卡号 string @m 分割位，默认为4
			if(this.isString(card)){
				m=this.isNumeric(m)?m:4;
				for(var i=0,str='';i<card.length;i+=m){
					str+=card.substr(i,m-1)+card.charAt(i+m-1).concat(String.fromCharCode(32));
				};
				return this.trim(str);
			};
			return card;
		},
		formatPanCard:function(pan,m){// 隐藏银行卡号|手机号
			if(this.isString(pan)&&(pan=this.trim(pan)).length>=11){
				m=this.isNumeric(m)?m:4;
				return pan.substr(0,m).concat(new Array(pan.length-2-m).join(String.fromCharCode(42))).concat(pan.slice(-4));
			};
			return pan;
		},
		browser:function(n){// 浏览器信息
			var u=n.userAgent,app=n.appVersion;
			return {
				touch:('ontouchstart' in window)||window.DocumentTouch&&document instanceof DocumentTouch,// 是否支持touch事件
				isInstalledApp:/youragent/g.test(u.toLowerCase()),
				isWeixin:/micromessenger/g.test(u.toLowerCase()),
				isIOS:/iphone|ipad|ipod/g.test(u.toLowerCase()),
				versions:{
					trident:u.indexOf('Trident') > -1, // IE内核
					ie:u.indexOf('Trident')>-1&&((Object.hasOwnProperty.call(window,'ActiveXObject')&&!window.ActiveXObject)||parseInt(u.toLowerCase().match(/msie ([\d.]+)/)[1])),// ie版本(>=ie11为true)
					presto:u.indexOf('Presto') > -1, // opera内核
					webKit:u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
					gecko:u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
					mobile:!!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), // 是否为移动终端
					ios:!!u.match(/(i[^;]+;(U;)? CPU.+Mac OS X)/), // ios终端
					android:u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
					iPhone:u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
					iPod:u.indexOf('iPod') > -1 , // 是否iPod
					iPad:u.indexOf('iPad') > -1, // 是否iPad
					webApp:u.indexOf('Safari') == -1 // 是否web应该程序，没有头部与底部
				},
				language:(n.browserLanguage||n.language).toLowerCase()
			};
		}(navigator),
		deParam:function(str){// url to json
			str=str||location.search.substr(1);
			var pairs=str.split('&'),obj={},pair,i;
			for(i in pairs){
				if(pairs[i]==='') continue;
				pair=pairs[i].split('=');
				obj[decodeURIComponent(pair[0])]=decodeURIComponent(pair[1]);
			};
			return obj;
		},
		getNormalPath:function(param,type,cate){// 获取绝对路径
			var m={1:window.bsteel.path.public+'base',2:window.bsteel.path.assets+'res'}[cate||2],s={1:'/images/',2:'/js/',3:'/css/',4:'/data/',5:'/tpl/'}[type||1];
// var
// m={1:'res',2:'../base'}[router||2],s={1:'/images/',2:'/js/',3:'/css/',4:'/data/',5:'/'}[type||1];
// var
// m={1:window.bsteel.path.public+'res',2:window.bsteel.path.assets+'res'}[cate||2],s={1:'/images/',2:'/js/',3:'/css/',4:'/data/',5:'/'}[type||1];
			if(this.isString(param)){
				return this.server+m+s+param;
			};
			if(this.isArray(param)&&param.length>0){
				for(var i=0,str=[];i<param.length;i++){
					str.push(this.server+m+s+param[i]);
				};
				return str;
			};
			return param;
		},
		creatObj:function(name,value){// 创建简单对象
			var o={};
			o[name]=value;
			return o;
		},
		creatlabel:function(s){// 创建<div>
			return String.fromCharCode(60)+(s||'div')+String.fromCharCode(62);
		},
		renderHTML:function(param){// 创建dom outerHTML
			var m=param.name||'div',
				k=/(img)|(input)/g.test(m),
				c=function(s){
					return s.replace(/[A-Z]/g,function(a,b){
						return '-'+a.toLowerCase();
					});
				},
				get=function(obj,type){
					if(M.isPlainObject(obj)){
						var str='',s=[{a:'="',b:'"',c:' '},{a:':',b:';',c:''}][type];
						for(var name in obj){
							str+=s.c+c(name)+s.a+(M.isPlainObject(obj[name])?arguments.callee(obj[name],1):obj[name])+s.b;
						};
						return str;
					};
					return '';
				};
			return this.creatlabel(m+get(param.proto,0))+(M.isFunction(param.html)?param.html():(param.html||''))+(k?'':this.creatlabel('/'+m));
		},
		creatElement:function(label,props){
			return M(this.creatNode(label,props));
		},
		creatNodeHTML:function(label,props){
			return this.creatNode(label,props).outerHTML;
		},
		creatNode:function(label,props){
			return this.element.creat(label,props);
		},

		/* 创建dom */
		element:{
			exec:function(str){
				return str.replace(/[A-Z]/g,function(a,b){
					return String.fromCharCode(45).concat(a.toLowerCase());
				});
			},
			replace:function(str){
				return str.replace(/-[a-z]/g,function(a){
					return a.slice(-1).toUpperCase();
				});
			},
			get:function(element){
				return element.currentStyle?element.currentStyle:window.getComputedStyle(element,null);
			},
			unit:function(name,value){
				return /^\d+%$/g.test(value)?'':/^\d+px$/g.test(this.get(document.body)[this.exec(name)])?'px':'';
			},
			creat:function(label,props){
				var element=document.createElement(M.isString(label)?label.toLowerCase():'div'),isIE=M.browser.versions.ie==7;
				for(var i in props){
					if(typeof props[i]=='object'){
						var str='';
						for(var name in props[i]){
							str+=this.exec(name)+':'+props[i][name]+';'
						};
						if(isIE){
							if(/^css$/g.test(i)){
								str=str.split(';');
								for(var j=0,stm=[];j<str.length-1;j++){
									var arr=str[j].split(':');
									stm.push({name:this.replace(arr[0]),value:arr[1]});
								};
								for(j=0;j<stm.length;j++){
									element.style[stm[j].name]=stm[j].value;
								};
							}else{
								element.setAttribute(i,str);
							};
						}else{
							element.setAttribute(/^css$/g.test(i)?'style':i,str);
						};
					}else{
						if(/html/g.test(i)){
							if(/input|textarea|radio|checkbox/g.test(label)){
								element.setAttribute('value',props[i]);
							}else{
								element.innerHTML=props[i];
							};
						}else{
							if(isIE){
								var type=/class/g.test(i)?'className':i;
								if(element[type]==undefined){
									element.setAttribute(i,props[i]);
								}else{
									element[type]=props[i];
								};
							}else{
								element.setAttribute(i,props[i]);
							};
						};
					};
				};
				return element;
			}
		},

		/* 简单模板 */
		template:{
			init:function(data,fn,context,id){
				var controller=document.getElementById(id||'template-controller');
				controller.innerHTML=this.resolve(controller.innerHTML,data);
				M.isFunction(fn)&&fn.apply(context||this,[].slice.call(arguments,4));
			},
			resolve:function(template,data){
				var key;
				for(key in data){
					if(M.isObject(data[key])||M.isArray(data[key])){
						continue;
					};
					template=this.replace(template,key,data[key]!=undefined?data[key].toString():'');
				};
				return template;
			},
			replace:function(template,key,value){
				return template.replace(new RegExp('{{\\s*'+key+'\\s*}}','ig'),value);
			}
		},

		/* 操作查询url字符串 */
		query:function(key){
			var href=window.location.search,reg=new RegExp('(^|&)'+key+'=([^&]*)(&|$)','i');
			if(href.length){
				href=href.substr(1).match(reg);
				if(!href){
					return null;
				};
				return unescape(href[2]);
			}else{
				return null;
			};
		},

		/* localStorage操作 */
		localStorage:{
			get:function(name){
				var value;
				try{
					value=localStorage.getItem(name);
				}catch(e){
				};
				value==null&&(value=M.cookie.read(name));
				return M.StringToJson(value);
			},
			set:function(name,value){
				value=M.JsonToString(value);
				try{
					localStorage.setItem(name,value);
				}catch(e){
					M.cookie.set(name,value,{expires:365});
				};
				return value;
			},
			clear:function(name){
				M.isString(name)?function(){
					try{
						localStorage.removeItem(name);
					}catch(e){
						M.cookie.clear(name);
					};
				}():function(){
					try{
						localStorage.clear();
					}catch(e){
					};	
				}();
			}
		},

		/**
		 * 设置cookie
		 * 
		 * @name string (必须)名字
		 * @value string (必须)值 **对象options** ''expires'' number (可选)有效期（天）
		 *        ''path'' string (可选)路径 ''domain'' string (可选)cookie ''secure''
		 *        boolean (可选)是否安全协议https 默认false
		 */
		cookie:{
			get:function(){// 获取
				return document.cookie;	
			},
			set:function(name,value,param){// 设置
				var str='',param=param||{};
				if(param.expires!=undefined&&M.isNumeric(param.expires)){
					var d=new Date();
					d.setTime(d.getTime()+param.expires*24*60*60*1000);
					str+=';expires='+d.toUTCString();
				}; 
				M.isString(param.path)&&(str+=';path='+param.path);
				M.isString(param.domain)&&(str+=';domain='+param.domain);
				str+=';'+((M.isBoolean(param.secure)&&param.secure)?true:false);
				document.cookie=name+'='+encodeURIComponent(value)+str;
			},
			read:function(name){// 读
				var cookie=this.get();
				if(cookie.length>0){
					name+='=';
					var list=cookie.split(';');
					for(var i=0;i<list.length;i++){
						var c=M.trim(list[i]);
						if(c.indexOf(name)!=-1){
							return decodeURIComponent(c.substring(name.length,c.length));
						}else{
							if(i==list.length-1){
								return null;
							};
						};
					};
				}else{
					return null;	
				};
			},
			clear:function(name){// 清除
				this.set(name,null,{expires:-1});	
			},
			setCookie: function(key, value, t) {
				if(t) {
					var oDate = new Date();
					oDate.setDate(oDate.getDate() + t);
					document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString() + ";path=/";
				} else {
					document.cookie = key + '=' + value + ";path=/";
				}

			}
		},
		
		ui:{
			define:function(){
				return M.define.apply(this,arguments);
			},

			/**
			 * 缓存图片
			 * 
			 * @pic string|array (必须)图片 默认[]
			 * @time number (可选)延迟时间 默认0
			 * @onProgress function (可选)单张图片缓存成功回调
			 * @onComplete function (可选)全部图片缓存成功回调
			 */
			loadImage:{
				defaults:{
					pic:[],
					time:0,
					onProgress:function(){},
					onComplete:function(){}
				},
				init:function(ops){
					ops=M.extend(true,{},this.defaults,ops);
					M.isString(ops.pic)&&(ops.pic=[ops.pic]);
					this.creat(ops,[].slice.call(arguments,1));
				},
				creat:function(ops,args){
					(M.isArray(ops.pic)&&ops.pic.length>0)?this.load(0,ops,args):ops.onComplete.apply(ops.pic,args);
				},
				load:function(index,ops,args){
					M.delay(ops.time,function(){
						var img=new Image();
						M(img).load(function(){	
							M.isFunction(ops.onProgress)&&ops.onProgress.apply([ops.pic[index]],[index+1,ops.pic.length].concat(args));
							(++index)<ops.pic.length?this.load(index,ops,args):M.isFunction(ops.onComplete)&&ops.onComplete.apply(ops.pic,args);	
						}.bind(this)).attr('src',ops.pic[index]);
					},this);
				}
			},
			
			/**
			 * 图片懒加载
			 * 
			 * @warp object (必须)被包裹容器 默认document
			 * @isBind boolean (可选)是否绑定滚动事件 默认true
			 */
			lazyload:{
				defaults:{
					warp:null,
					isBind:true	
				},
				init:function(ops){
					ops=M.extend(true,{},this.defaults,ops);
					ops.warp=ops.warp||M('.lazy-propfix-piel');
					var list=[];
					M('img',ops.warp).each(function(){
						list.push({target:this,status:false});	
					});
					this.exec(ops,list);
					ops.isBind&&M(ops.warp).bind('scroll',function(){
						this.exec(ops,list);	
					}.bind(this));
					return M.extend(true,{},this,{defaults:ops});
				},
				exec:function(ops,list){
					M.delay(50,function(){
						var o=M(ops.warp),x_oSize=o.width(),y_oSize=o.height();
						for(var i=0;i<list.length;i++){
							if(list[i].status){
								continue;
							};
							var target=M(list[i].target),
								pic=target.attr('original'),
								x_offset=target.offset().left,
								x_distance=o.scrollLeft(),
								x_size=target.width(),
								y_offset=target.offset().top,
								y_distance=o.scrollTop(),
								o_x_offset=target.offset().left,
								o_y_offset=target.offset().top,
								y_size=target.height();
							if((x_offset>=o_x_offset+x_distance-x_size&&x_offset<x_oSize+x_distance+o_x_offset)&&(y_offset>=o_y_offset+y_distance-y_size&&y_offset<y_oSize+y_distance+o_y_offset)){
								M.ui.loadImage.init({
									pic:pic,
									onComplete:function(that,i){
										list[i].status=true;
										that.css({display:'none'}).attr('src',this[0]).addClass('lazy-propfix-img').removeAttr('original').fadeIn();
									}
								},target,i);
							};
						};
					},this);
				}
			},
			/**
			 * 等待框|状态提示框
			 * 
			 * @id string (可选)对象id
			 * @warp object (可选)被包裹容器 默认null
			 * @position number (必须)定位方式 默认1 ⇒ 1-fixed/2-absolute
			 * @masterBackground string (必须)覆盖层背景颜色 默认rgba(0,0,0,0)
			 * @innerBackground string (必须)背景框背景颜色 默认rgba(0,0,0,.5)
			 * @spinnerColor string (必须)等待动画颜色 默认rgba(255,255,255,.5)
			 * @offsetLeft number (可选)手工调整左偏移 默认0
			 * @offsetTop number (可选)手工调整上偏移 默认0
			 * @tip boolean (可选)是否开启纯文字提醒 默认false
			 * @status boolean (必须)状态(只有tip为false才生效) 默认null
			 * @time number (可选)自动消失时间 默认null
			 * @text string (可选)文本 默认null
			 * @callback function (可选)关闭之后回调
			 */
			waiting:{	
				defaults:{
					warp:null,
					position:1,
					masterBackground:'rgba(0,0,0,0)',
					innerBackground:'rgba(0,0,0,.6)',
					spinnerColor:'rgba(255,255,255,.5)',
					offsetLeft:0,
					offsetTop:0,
					status:null,
					tip:false,
					time:null,
					text:null,
					ico:['ico_true.png','ico_error.png'],
					callback:function(){}
				},
				creat:function(ops){
					ops=M.extend(true,{},this.defaults,{id:'mt-loading-'+M.now()},ops);
					ops.warp&&(ops.position=2);
					ops.container=this.creatNode(ops);
					M.isNumeric(ops.time)&&M.delay(ops.time,function(){
						this.dismiss(ops);	
					},this);
					return M.extend(true,{},this,{defaults:ops});
				},
				creatNode:function(param){
					var position={1:'fixed',2:'absolute'},
						o=M(M.creatlabel(),{
							id:param.id,
							'class':'mt-master-container mt-waiting-master in',
							css:{
								opacity:1,
								position:position[param.position],
								background:param.masterBackground,
								height:param.position==2&&(param.warp?param.warp.outerHeight(true):M(document).height()),
								zIndex:M.now()
							}	
						}),
						inner=M(M.creatlabel(),{
							'class':'mt-loading-container'+(param.tip?' mt-loading-slider':''),
							css:{
								opacity:1,
								background:param.innerBackground,
								marginLeft:param.offsetLeft,
								marginTop:param.offsetTop
							},
							html:M.isString(param.text)&&M.renderHTML({
								proto:{'class':'mt-loading-info'},
								html:param.text
							})
						}),
						appendNode=function(){
							(param.warp||M(document.body)).append(o.append(inner));
							param.delay=parseInt(parseFloat(inner.css('WebkitAnimationDuration')||inner.css('animationDuration'))*1000);
						};
					if(param.tip){
						M.isString(param.text)&&appendNode();
					}else{
						if(param.status==null){
							inner.prepend(this.renderLoading(param.spinnerColor));
							appendNode();
						}else if(M.isBoolean(param.status)){
							M(M.creatlabel('img'),{
								'class':'mt-loading-status',
								src:M.getNormalPath('base/'+(param.status?param.ico[0]:param.ico[1]))	
							}).load(function(){	
								inner.prepend(M(this));
								appendNode();
							});
						};
					};
					return o;
				},
				renderLoading:function(color){
					var className=['mt-loading-spinner','mt-spinner-container','mt-spinner-circle','mt-loading-inner'];
					for(var str='',i=0,name=['one','two','three'];i<name.length;i++){
						for(var stp='',j=1;j<=4;j++){
							stp+=M.renderHTML({
								proto:{'class':className[2]+j,style:{backgroundColor:color}}
							});
						};
						str+=M.renderHTML({
							proto:{'class':className[1]+' '+name[i]},
							html:stp
						});
					};
					return M(M.creatlabel(),{
						'class':className[3],
						html:M.renderHTML({proto:{'class':className[0]},html:str})
					});
				},
				dismiss:function(param){
					if(param){
						param.container.addClass('out');
						M.delay(param.delay,function(){
							param.container.remove();
							M.isFunction(param.callback)&&param.callback.call(this,param);
						},this);
					}else{
						M('.mt-waiting-master').remove();
					};
				}
			},
			/**
			 * ajax请求
			 * 
			 * @data object (可选)请求参数 默认null
			 * @url string (必须)请求地址 默认null
			 * @type string (必须)请求方式 默认get
			 * @dataType boolean (必须)请求数据类型 默认json
			 * @timeout number (可选)请求超时时间 默认10000毫秒
			 * @delay number (可选)延迟失败回调处理时间 默认0
			 * @times number (可选)请求失败后重新连续请求次数 默认0
			 * @isload boolean (可选)请求之前是否显示loading 默认true
			 * @enabled boolean (可选)是否渲染失败映射 默认false
			 * @container object (可选)展示失败映射,仅当enabled为true生效 默认null
			 * @button boolean (可选)展示失败映射按钮,仅当enabled为true生效 默认false
			 * @event boolean (可选)是否绑定重新加载事件 默认true
			 * @beforeSend function (可选)请求之前回调
			 * @success function (可选)请求成功回调
			 * @error function (可选)请求失败或超时回调
			 * @context object (可选)上下文指定
			 */
			ajax:{
				defaults:{
					data:null,
					url:null,
					type:'POST',
					dataType:'json',
					timeout:10000,
					times:0,
					delay:0,
					isload:true,
					render:{
						enabled:false,
						container:null,
						reload:true,
						event:true
					},
					beforeSend:function(){},
					success:function(){},
					error:function(){}
				},	
				init:function(ops,context){
					ops=M.extend(true,{},this.defaults,ops);
					ops.status=true;
					this.creat(0,ops.isload,ops,context,[].slice.call(arguments,2));
					return M.extend(true,{},this,{defaults:ops});
				},
				creat:function(index,status,ops,context,args){
					M.ajaxFn({
						data:M.extend({},ops.data),
						url:ops.url,
						type:ops.type,
						dataType:ops.dataType,
                        contentType: "application/json",
                        context:this,
						timeout:ops.timeout,
						jsonpCallback:ops.jsonpCallback,
						traditional:true,
						beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", own.fetch('userInfo').token);
							if(index==0){
								if(status){
									M.ui.waiting.dismiss();
									M.delay(300,function(){
										ops.status&&M.ui.waiting.creat();
									});
								};
								M.isFunction(ops.beforeSend)&&ops.beforeSend.apply(context||this,args);
							};
						},
						success:function(data){
							M.delay(ops.delay,function(){
								ops.status=false;
								status&&M.ui.waiting.dismiss();
								if(!!!data){
									M.isFunction(ops.error)&&ops.error.apply(context||this,['没有数据'].concat(args));	
								}else{
									M.isFunction(ops.success)&&ops.success.apply(context||this,[data].concat(args));	
								};	
							},this);
						},
						complete:function(XMLHttpRequest,status){
							M.delay(ops.delay,function(){
								ops.status=false;
								if(status!='success'){
									if(index<ops.times){
										this.creat(++index,status,ops,context,args);	
									}else{
										M.ui.waiting.dismiss();
										M.isFunction(ops.error)&&ops.error.apply(context||this,[{error:'请求失败',timeout:'请求超时',parsererror:'数据格式错误'}[status]||'请求失败'].concat(args));
									};
								};
								M.delay(500,function(){
									ops.status&&M.ui.waiting.dismiss();
								});
								XMLHttpRequest.abort();
							},this);
						}
					});	
				}
			},
			
			/* 滚到顶部 */
			scrollTop:function(content){
				var top=M(M.creatlabel('a'),{
					href:'javascript:;',
					'class':'mt-scroll-top iconfont',
					html:M.Font?M.Font.return_top_empty:'&#xe63c;',
					click:function(){
						(content||M('html,body')).animate({scrollTop:0},500,'swing');
					}
				});
				(content||M(document.body)).append(top);
				(content||M(window)).bind('scroll',function(){
					M(this).scrollTop()>5?top.fadeIn():top.fadeOut();	
				});
			},
			
			/* 文件上传 */
			upload:{
				init:function(ops){
					this.creat(ops.element,function(){
						this.compile(ops);	
					});
				},
				compile:function(ops){
					this.form.ajaxForm({
						url:M.path+'img_upload',　
				　　　 	type:'post',　　  
				　　　 	dataType:'json',　
						context:this,　　
						success:function(data){
							this.remove(ops);
							if(M.isObject(data)&&data.status==0){
								ops.callback&&ops.callback.call(ops.context||this,this.getHost()+data.returnData.img_url,ops);
							}else{
								M.ui.waiting.creat({status:false,text:M.isObject(data)?data.msg:'服务器出了点小问题！',time:500,warp:ops.content||null});		
							};
						},
						error:function(data){
							this.remove(ops);
							M.ui.waiting.creat({status:false,text:data.statusText,time:500,warp:ops.content||null});		
						}　　　　	
					}).submit();	
				},
				creat:function(element,fn){
					this.fileElement=M(element).next();
					this.form=M.creatElement('form',{
						method:'post',
						'class':'hide',
						enctype:'multipart/form-data'
					}).append(element);
					M(document.body).append(this.form);
					fn&&fn.call(this);
				},
				getHost:function(){
					var hostname=window.location.hostname,port=window.location.port;
					if(hostname.indexOf('http')==-1){
						hostname='http://'+hostname;
					};
					hostname=M.path;
					return host=(!port.length||port==null)?hostname:hostname +':'+port;;
				},
				remove:function(ops){
					this.fileElement.before(ops.element);
					delete this.fileElement;
					this.form.remove();
					delete this.form;
				}	
			},
			
			/* 移动端横屏提示 */
			rotate:{
				status:true,
				container:null,
				init:function(callback,context){
					this.creat(callback,context,[].slice.call(arguments,2));
					window.orientation!=undefined&&('onorientationchange' in window)&&window.addEventListener('orientationchange',function(args){
						this.exec(callback,context,args);
					}.bind(this,[].slice.call(arguments,2)),false);
				},
				creat:function(callback,context,args){
					var image=M(M.creatlabel('img'),{src:M.getNormalPath('base/rotate.png')}),that=this;
					this.container=M.creatElement(null,{
						'class':'mt-vspromp-container',
						css:{
							zIndex:M.now()
						},
						html:M.creatNodeHTML(null,{
							'class':'mt-vspromp-content',
							html:M.creatNodeHTML(null,{
								'class':'mt-vspromp-pic',
								html:image[0].outerHTML
							})+M.creatNodeHTML(null,{
								'class':'mt-vspromp-text',
								html:'为了更好的体验，请将手机/平板横过来'
							})	
						})	
					});
					image.load(function(){
						M(document.body).append(that.container);
						that.exec(callback,context,args);	
					});	
				},
				exec:function(callback,context,args){
					if(window.orientation==90||window.orientation==-90){
						this.container.hide();
						if(this.status){
							this.status=false;
							M.isFunction(callback)&&callback.apply(context||this,args);
						};
					}else if(window.orientation==180||window.orientation==0){
						this.container.show().css(zIndex,M.now());
					}else{
						M.isFunction(callback)&&callback.apply(context||this,args);
					};	
				}
			}
			
		},
		
		/**
		 * 定义组件
		 * 
		 * @name string (必须)组件名称
		 * @value object|function (可选)组件内容
		 */
		define:function(name,value){
			if(M.isString(name)){
				M.extend(this,M.creatObj(name,M.isFunction(value)?value.call(this):value));	
			};
			return M;
		},

		/* 阻止默认事件及冒泡 */
		tools:{
			preventDefault:function(e){
				e.preventDefault();
			},
			stopPropagation:function(e){
				e.stopPropagation();
			}
		},
        downloadFileXhr : function(path,fileName){
			if(fileName == null || fileName == '' || fileName == 'null'){
				var str = path;
                var obj=str.lastIndexOf("/");
                fileName = str.substr(obj+1);
			}
            fileName = encodeURI(encodeURI(fileName));
            path = encodeURI(path);
            var url = M.interfacePath.assets + 't/downloadFile?path='+path+'&fileName='+fileName;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);    // 也可以使用POST方式，根据接口
            xhr.responseType = "blob";  // 返回类型blob
            xhr.setRequestHeader('Authorization', own.fetch('userInfo').token);

            // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
            xhr.onload = function () {
                // 请求完成
                if (this.status === 200) {
                    // 返回200
                    var blob = this.response;
                    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                    if (userAgent.indexOf("Trident") > -1 || userAgent.indexOf("Edge") > -1) { // IE
                    	return window.navigator.msSaveBlob(blob, decodeURI(decodeURI(fileName)));
                    }

                    // var reader = new FileReader();
                    // reader.readAsDataURL(blob);  // 转换为base64，可以直接放入a表情href
                    // reader.onload = function (e) {
                        // 转换完成，创建一个a标签用于下载
                        var a = document.createElement('a');
                        a.download = decodeURI(decodeURI(fileName));
                        a.href = window.URL.createObjectURL(blob);
                        $("body").append(a);  // 修复firefox中无法触发click
                        a.click();
                        $(a).remove();
                    // }
                }
            };
            // 发送ajax请求
            xhr.send()
        },
        downloadFileXhrImg : function(path,fileName,imgObj){
            if(fileName == null || fileName == '' || fileName == 'null'){
                var str = path;
                var obj=str.lastIndexOf("/");
                fileName = str.substr(obj+1);
            }
            fileName = encodeURI(encodeURI(fileName));
            path = encodeURI(path);
            var url = M.interfacePath.assets + 't/downloadFile?path='+path+'&fileName='+fileName;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);    // 也可以使用POST方式，根据接口
            xhr.responseType = "blob";  // 返回类型blob
            xhr.setRequestHeader('Authorization', own.fetch('userInfo').token);

            // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
            xhr.onload = function () {
                // 请求完成
                if (this.status === 200) {
                    // 返回200
                    var blob = this.response;
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);  // 转换为base64，可以直接放入a表情href
                    reader.onload = function (e) {
                    // 转换完成，创建一个a标签用于下载
                        imgObj.attr('src', this.result)
                    }
                }
            };
            // 发送ajax请求
            xhr.send()
        }

    });
	
	
	M.fn.extend({
		preventDefault:function(type){
			this.bind(type||'click',M.tools.preventDefault);
			return this;
		},
		stopPropagation:function(type){
			this.bind(type||'click',M.tools.stopPropagation);
			return this;
		},
		release:function(type){
			this.unbind(type||'click',M.tools.preventDefault);
			return this;
		}
	});
	
	if(!Function.prototype.bind){
		Function.prototype.bind=function(oThis){
			if(!M.isFunction(this)){
				M.error('Function.prototype.bind - 非方法');
				return ;
			};
			var aArgs=Array.prototype.slice.call(arguments,1),
				fToBind=this, 
				fNOP=function(){},
				fBound=function(){
				 	return fToBind.apply(this instanceof fNOP && oThis ? this : oThis , aArgs.concat(Array.prototype.slice.call(arguments)));
				};
			fNOP.prototype=this.prototype;
			fBound.prototype=new fNOP();
			return fBound;
		};
	};
	
	if(!document.getElementsByClassName){
		document.getElementsByClassName=function(className,element){
			var children=(element||document).getElementsByTagName('*'),elements=[];
			for(var i=0;i<children.length;i++){
				var child=children[i],classNames=child.className.split(' ');
				for(var j=0;j<classNames.length;j++){
					if(classNames[j]==className){ 
						elements.push(child);
						break;
					};
				};
			}; 
			return elements;
		};
	};
	
	M(document).bind('keydown',function(e){
		if(e.keyCode==13) return false;	
	});
	
	// M.browser.versions.iPad&&M.ui.rotate.init();
	if(document.getElementById('_loginout_')){
		document.getElementById('_loginout_').onclick=function(){
			M.cookie.read('name')&&M.cookie.clear('name');
			M.cookie.read('user')&&M.cookie.clear('user');
			M.goLogin();
		};
	};
	
	M.checkLogin=function(){
		if((M.cookie.read('name')+'')=='null'||(M.cookie.read('user')+'')=='null'){
			M.goLogin(1);
		}else{
			var username=document.getElementById('_user_name_');
			if(username){
				username.innerHTML=decodeURIComponent(M.cookie.read('name'));	
			};
		};		
	};
	
	M.goLogin=function(state){
		var search='';
		if(state){
			search=window.location.search;
			search+=(search.length?'&':'?')+'url='+window.location.href.split('?')[0];	
		};
		window.location=M.server+'100_login.html'+search;	
	};
	
	M.checkParam=function(context){
		if(!M.isPlainObject(context)){
			M.ui.waiting.creat({status:false,text:'参数错误，请传入context',time:500});		
			return false;	
		};
		for(var i=0,args=[].slice.call(arguments,1);i<args.length;i++){
			var value=M.query.getItem(args[i]);
			if(!value){
				return window.history.go(-1);
			};
			context[args[i]]=decodeURIComponent(value);	
		};
		return true;
	};

})(window.jQuery,window);