/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */

const SMSClient = require('./../index')

const express=require('express');
const mongodb=require('mongodb').MongoClient;
const db_str="mongodb://localhost:27017/zhengzhou";

var bodyParser = require('body-parser');
const app=express();


app.all('*',function(req,res,next){
	res.header('Access-Control-Allow-Origin',"*");
	res.header('Access-Control-Allow-Header',"X-Requested-With");
	res.header('Access-Control-Allow-Methods',"PUT,POST,GET,DELETE,OPTIONS");
//	res.header('Content-Type','application/x-www-form-urlencoded');
	next();
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIJF7NwR9vWXob'
const secretAccessKey = 'BXJMPaZdambG0d20QPzlahKnRchhdu'



//在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
const queueName = 'Alicom-Queue-1092397003988387-'

//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

//短信回执报告
smsClient.receiveMsg(0, queueName).then(function (res) {
    //消息体需要base64解码
    let {code, body}=res
    if (code === 200) {
        //处理消息体,messagebody
//      console.log(body)
    }
}, function (err) {
//  console.log(err)
})

//短信上行报告
smsClient.receiveMsg(1, queueName).then(function (res) {
    //消息体需要base64解码
    let {code, body}=res
    if (code === 200) {
        //处理消息体,messagebody
//      console.log(body)
    }
}, function (err) {
//  console.log(err)
})


//查询短信发送详情
smsClient.queryDetail({
    PhoneNumber: '1500000000',
    SendDate: '20170731',
    PageSize: '10',
    CurrentPage: "1"
}).then(function (res) {
    let {Code, SmsSendDetailDTOs}=res
    if (Code === 'OK') {
        //处理发送详情内容
        // console.log(SmsSendDetailDTOs)
    }
}, function (err) {
    //处理错误
    // console.log(err)
})







//发送短信

function send(phonenum,yzm){
smsClient.sendSMS({
    PhoneNumbers: phonenum,
    SignName: '',
    TemplateCode: 'SMS_137415267',
    TemplateParam: `{"code":${yzm}}`
}).then(function (res) {
    let {Code}=res
    if (Code === 'OK') {
        //处理返回参数
//      console.log(res)
    }
}, function (err) {
//  console.log(err)
})
}

var yzmcode;
function suiji(){
	yzmcode=Math.floor(Math.random()*10000)
	return yzmcode;
}




app.post('/register',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var id=req.query.id;
    var phone=req.query.phone;
    var pass=req.query.pass;
    console.log(req.query)

	if(id==1){
		suiji()
		console.log(yzmcode)
		// send(phone,yzmcode)
	}else{
        var yzm=req.query.sjyzm;
        console.log(yzm)
		var pass=req.query.pass;
		if(yzm==yzmcode){
            // console.log(req.query)
			mongodb.connect(db_str,(err,database)=>{
				database.collection('info',(err,coll)=>{
                    coll.find({phone:phone}).toArray((err,data)=>{
                        if(data.length>0){
                            res.send('2')
                            // 已经注册过
                        }else{
                            coll.save({phone:phone,pass:pass},()=>{

                                res.send('1')
                                // 注册成功
                            })
                        }
                        database.close()
                    })

				})
			})
		}else{
            res.send('3')
            //验证码错误
		}


	}
})




app.post('/sjhdl',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    var phone=req.query.phone;
    var pass=req.query.pass;
    console.log(req.query)
    mongodb.connect(db_str,(err,database)=>{
        database.collection('info',(err,coll)=>{
            coll.find(req.query).toArray((err,data)=>{
                console.log(data)
                if(data.length>0){
                    res.send('1')
                    //登录成功
                }else{
                    res.send('2')
                    // 密码错误
                }
                database.close()
            })
        })
    })
})
app.post('/yzmdl',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    var phone=req.query.phone;
    var id=req.query.id;
    console.log(req.query)
    if(id==1){
        suiji()
		console.log(yzmcode)
		send(phone,yzmcode)
    }else{
        var yzm=req.query.sjyzm;
        var phone=req.query.phone;
        if(yzm==yzmcode){
            mongodb.connect(db_str,(err,database)=>{
                database.collection('info',(err,coll)=>{
                    coll.find({phone:phone}).toArray((err,data)=>{
                        if(data.length>0){
                            res.send('1')
                            // 登录成功
                        }else{
                            res.send("2")
                            // 手机号码不正确
                        }
                        database.close()
                    })
                })
            })
        }else{
            res.send("3")
            // 手机验证码不正确
        }

    }

})

app.get('/shouye',(req,res)=>{

    mongodb.connect(db_str,(err,database)=>{
        database.collection('shuju',(err,coll)=>{
            coll.find({}).toArray((err,data)=>{

                if(data.length>0){
                    res.send(data)
                    database.close()
                }
            })
        })
    })



})
app.get('/detail',(req,res)=>{
    console.log(req.query)
    mongodb.connect(db_str,(err,database)=>{
        database.collection('shuju',(err,coll)=>{
            coll.find({id:req.query.id}).toArray((err,data)=>{
                res.send(data)
                database.close()
            })
        })
    })
})

app.get('/goumai',(req,res)=>{
    // console.log(req.query)
    // console.log("aa")
    mongodb.connect(db_str,(err,database)=>{
        database.collection('shuju',(err,coll)=>{
            coll.find({id:req.query.id}).toArray((err,data)=>{
                res.send(data)
                database.close()
            })
        })
    })
})


app.get('/gouma',(req,res)=>{
    console.log(req.query)
    console.log("aa")
    mongodb.connect(db_str,(err,database)=>{
        database.collection('goumai',(err,coll)=>{
            coll.save(req.query)
           database.close()
        })
    })
})

app.get('/wode',(req,res)=>{
    console.log(req.query)
    mongodb.connect(db_str,(err,database)=>{
        database.collection('info',(err,coll)=>{
            coll.find({phone:req.query.phone}).toArray((err,data)=>{
                res.send(data)
                database.close()
            })
        })
    })
})


app.get('/gmjl',(req,res)=>{
    // console.log(req.query)
    // console.log("aa")
    mongodb.connect(db_str,(err,database)=>{
        database.collection('goumai',(err,coll)=>{
            coll.find({}).toArray((err,data)=>{
                res.send(data)
                database.close()
            })
        })
    })
})

app.listen(3000)
