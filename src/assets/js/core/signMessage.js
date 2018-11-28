/**
 * 验签 2018-8-11
 *
 *
 * @sign			            function 				签名方法
 * @verify                     function            	验签
 */
;
(function (M, window) {
    define('signMessage', function () {
        //初始化
        // $(document).ready(function () {
        //     var config = {
        //         //product
        //         //"license" : "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",
        //         //test
        //         "license" : "MIIFawYJKoZIhvcNAQcCoIIFXDCCBVgCAQExDjAMBggqgRzPVQGDEQUAMIGxBgkqhkiG9w0BBwGggaMEgaB7Iklzc3VlciI6IigoLipPPeWkqeWogeivmuS/oea1i+ivleezu+e7ny4qKXsxfSkiLCJ2ZXJzaW9uIjoiMS4wLjAuMSIsInNvZnRWZXJzaW9uIjoiMy4xLjAuMCIsIm5vdGFmdGVyIjoiMjAyNS0wOC0wNyIsIm5vdGJlZm9yZSI6IjIwMTUtMDgtMDciLCJub0FsZXJ0IjoidHJ1ZSJ9oIIDRDCCA0AwggLloAMCAQICFF8lnNrMgrt+8wWzAHuLjsm9+bXyMAwGCCqBHM9VAYN1BQAwVTEmMCQGA1UEAwwd5aSp6K+a5a6J5L+h5rWL6K+VU00y55So5oi3Q0ExDjAMBgNVBAsMBVRPUENBMQ4wDAYDVQQKDAVUT1BDQTELMAkGA1UEBhMCQ04wHhcNMTQwOTI2MDc0NjA4WhcNMTUwOTI2MDc0NjA4WjAxMRgwFgYDVQQDDA9TaWduRVNBMjAxNDA5MjcxFTATBgNVBAoMDOWkqeivmuWuieS/oTBZMBMGByqGSM49AgEGCCqBHM9VAYItA0IABJYWeFLmIy9mTud+ai0LBeLoxhgnO6HcQGbsQhl4fveJzoVx0Cyzt/xvWY5y7l3qAwd59AbI+Im6Ftl/wAOShYmjggGzMIIBrzAJBgNVHRMEAjAAMAsGA1UdDwQEAwIGwDCBigYIKwYBBQUHAQEEfjB8MHoGCCsGAQUFBzAChm5odHRwOi8vWW91cl9TZXJ2ZXJfTmFtZTpQb3J0L1RvcENBL3VzZXJFbnJvbGwvY2FDZXJ0P2NlcnRTZXJpYWxOdW1iZXI9NUE0N0VDRjEwNTgwNEE1QzZBNUIyMjkyOUI3NURGMERGQkMwRDc5NjBXBgNVHS4EUDBOMEygSqBIhkZQb3J0L1RvcENBL3B1YmxpYy9pdHJ1c2NybD9DQT01QTQ3RUNGMTA1ODA0QTVDNkE1QjIyOTI5Qjc1REYwREZCQzBENzk2MG8GA1UdHwRoMGYwZKBioGCGXmh0dHA6Ly9Zb3VyX1NlcnZlcl9OYW1lOlBvcnQvVG9wQ0EvcHVibGljL2l0cnVzY3JsP0NBPTVBNDdFQ0YxMDU4MDRBNUM2QTVCMjI5MjlCNzVERjBERkJDMEQ3OTYwHwYDVR0jBBgwFoAUPYnGR8txhbDZO9ZIsInZ5/7v2tkwHQYDVR0OBBYEFEs77X+HgoaHoBKSsS7mACXYtREAMAwGCCqBHM9VAYN1BQADRwAwRAIgvbTXF8yNH5jsbG6r7XL5LEupJd8l8x9akz8rhO5XYYICIOg+hxn5F44N5+waqG+1Dbs6m9xiID83VkHnmptdMoR7MYIBRTCCAUECAQEwbTBVMSYwJAYDVQQDDB3lpKnor5rlronkv6HmtYvor5VTTTLnlKjmiLdDQTEOMAwGA1UECwwFVE9QQ0ExDjAMBgNVBAoMBVRPUENBMQswCQYDVQQGEwJDTgIUXyWc2syCu37zBbMAe4uOyb35tfIwDAYIKoEcz1UBgxEFAKBpMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE1MDgwNzE3MzAyM1owLwYJKoZIhvcNAQkEMSIEIBJeyebFtFcougN8kN5ifp/xrvvpdpJHPpvMi7oR2OSzMAwGCCqBHM9VAYItBQAERjBEAiD+AQLvSOXePUd9WHU5k8G3erod8GhQodK+GkEbvHh0vgIg4LEj7wpevBgJ88qrf/5HNTAeQP482Jb33xoGPFuj2Mw=",
        //         exportKeyAble : false,
        //         disableExeUrl : true
        //     };
        //     try{
        //         TCA.config(config);
        //         initCertList();
        //         return ;
        //     }catch(e){
        //         if (e instanceof TCACErr) {
        //             alert("没有检测到证书助手，请下载并安装证书助手！");
        //         } else {
        //             alert("Here is Error !!!");
        //         }
        //     }
        // });
        //初始化证书列表
        function initCertList(){
//            try{
                var certs = CertStore.listAllCerts();

                if(certs.size()>0){
                    for(var i = 0;i<certs.size();i++){
                        var cert = certs.get(i);
                        var sn = cert.serialNumber();
                        var cn = getCNFromSubject(cert);
                        addOption(cert.serialNumber(),cn);
                    }
                }else{
                	
                	throw "certs is null";
                    //$("#CertList").append("<option value='0'>查询结果为空</option>");
                }
//            } catch (e) {
//                if (e instanceof TCACErr) {
//                    alert(e.toStr());
//                } else {
////                     alert("Here is Error !!!initCertList"+e);
//                }
//            }
        }

        // 从Certificate对象中获取CN
        // cert : Certificate对象
        function getCNFromSubject(cert) {
            try {
                var t = cert.subject().match(/(S(?!N)|L|O(?!U)|OU|SN|CN|E)=([^=]+)(?=, |$)/g);
                for (var i = 0; i < t.length; i++) {
                    if (t[i].indexOf("CN=") === 0)
                        return t[i].substr(3, t[i].length);
                }
                return null;
            } catch (e) {
                if (e instanceof TCACErr) {
                    alert(e.toStr());
                } else {
                    // alert("Here is Error !!!");
                }
            }
        }

        function addOption(oValue,oName){
            var sid = document.getElementById("CertList");
            var myOption = document.createElement("option");
            sid.appendChild(myOption);
            myOption.text = oName;
            myOption.value = oValue;
        }

        // 返回Certificate对象
        function getSelectedCert() {
            // debugger;
            try {
                var certs = CertStore.listAllCerts(); // 此处可能会有性能问题
                var selectedCertSN = $("[id=CertList]").attr("value");
                var r = certs.bySerialnumber(selectedCertSN);
                return r.get(0);
            } catch (e) {
                if (e instanceof TCACErr) {
                    alert(e.toStr());
                } else {
                    return M.ui.waiting.creat({
                        status:false,
                        time:1000,
                        text:"没有找到证书",
                        hide:false
                    });
                }
            }
        }

        //签名方法
        function sign() {
            // debugger;
            try {
                var toSign = $("#txtToSign").val();
                var cert = getSelectedCert();
                var P7 = cert.signMessage(toSign,false);
                $("#Signature").text(P7);
            } catch (e) {
                if (e instanceof TCACErr) {
                    alert(e.toStr());
                } else {
                    // alert("Here is Error !!!");
                }
            }
        }

        // 验签
        function verify(callback) {
            // try {
            //     debugger;
                var b64 = $("#Signature").val();
                var p7 = new Pkcs7(b64);
                var cert = p7.verify($("#txtToSign").val());
                if (cert != null) {
                    // 验签通过
                    // var str = "验签通过, 证书信息 : \n";
                    // str += "Subject : " + cert.subject() + "\n";// + "\n";
                    // str += "Issuer  : " + cert.issuer() + "\n";// + "\n";
                    // str += "SN      : " + cert.serialNumber() + "\n";// + "\n";
                    // alert(str);
                    callback();
                } else {
                    // 失败
                    // alert('验签失败');
                }
            // } catch (e) {
            //     if (e instanceof TCACErr) {
            //         return alert(e.toStr());
            //     } else {
            //         return alert("Here is Error !!!");
            //     }
            // }
        }
        /***************************************************************************
         * 返回与Windows平台下Crypto Shell Extensions证书查看证书兼容的16进制证书序列号 <br />
         * 注：序列号实际是一个大的整数，在Windows平台下为了避免出现负数，当二进制数的首位为1时（16进制首位大于等于8），Crypto Shell
         * Extensions自动给16进制数前加了“00”。
         * @param serialNumber: ICA系统（java API）的16进制证书序列号
         * @return String 16进制的Windows平台证书序列号
         */
        function getIEValidSerialNumber(serialNumber) {
            if (serialNumber == null)
                return null;
            if (serialNumber.length == 0) {
                return serialNumber;
            } else {
                serialNumber = serialNumber.toLowerCase();
                if (serialNumber.length%2 == 1) {
                    serialNumber = "0" + serialNumber;
                }
                var firstWord = serialNumber.substring(0, 1);
                var firstNumber = 0;
                try {
                    firstNumber = parseInt(firstWord, 16);
                } catch (e) {
                    return serialNumber;
                }
                if (firstNumber >= 8) {
                    return "00" + serialNumber;
                } else {
                    return serialNumber;
                }
            }
        }

        return {
            sign: sign,
            verify: verify,
            init: function (callback, that) {
                var config = {
                    "license" : $.interfacePath.license,
                    exportKeyAble : false,
                    disableExeUrl : true
                };
                try{
                    if (that.signStatus === 0) {
                        TCA.config(config);
                        that.signStatus = 1;
                        initCertList();
                        that.signStatus = 2;
                        callback();
                        return ;
                    }else if (that.signStatus === 1) {
                        initCertList();
                        that.signStatus = 2;
                        callback();
                        return ;
                    }else if (that.signStatus === 2) {
                        callback();
                        return ;
                    }
                }catch(e){
                    if (e instanceof TCACErr) {
                        return M.ui.status.init({
                            position: 'fixed',
                            html: '没有检测到证书助手，请下载并安装证书助手！<a class="g-block g-text-center" download="" href="'+ $.interfacePath.server+'ftb-web/template/res/data/eastpaytools.exe' +'">点击此处下载<a/>',
                            callback: function() {
                                console.log('callback')
                            },
                            close: function () {

                            }
                        });
                    } else if(e == 'certs is null'){
                        return M.ui.status.init({
                            position: 'fixed',
                            html: '请插入u-key并安装驱动程序<a class="g-block g-text-center" download="" href="'+ $.interfacePath.server+'ftb-web/template/res/data/eastpaydrive.zip' +'">点击此处下载<a/>',
                            callback: function() {
                                console.log('callback')
                            },
                            close: function () {

                            }
                        });
                    }
                }
            }
        }

    })


})(window.jQuery, window);