//我是用自己模拟的数据，先给大家贴出来
var data_info = [
    [114.502461,38.045474,"网站名称：市住房公积金;网站ip:192.168.1.100;网站URL:www.aaa.com;",30],
    [120.153576,29.287459,"网站名称：浙江省嘉兴市中学<br>网站ip:192.168.1.100<br>网站URL:www.ccc.com",91],
    [120.750865,30.762653,"网站名称：嘉兴经济技术开发区人力资源网",80],
    [121.428599,28.661378,"网站名称：嘉兴315维权网<br>网站ip:192.168.1.100<br>网站URL:www.jdin.com",20],
    [120.153576,30.287459,"网站名称：嘉兴旅游",80],
    [120.205170,30.25720,"网站名称：嘉兴市青少年宫",92],
    [120.753576,30.687459,"网站名称：嘉兴市公共交通总局",55],
    [120.750865,30.762653,"网站名称：嘉兴福利彩票",35],
    [119.750865,29.762653,"网站名称：嘉兴电视台",15],
    [120.750865,30.762653,"网站名称：市委老干部局",95]
]

// 百度地图API功能
map = new BMap.Map("allmap");
map.centerAndZoom(new BMap.Point(112.750865,30.762653), 3);
var opts = {
 width : 250,     // 信息窗口宽度
height: 90,     // 信息窗口高度
title : "网站信息" , // 信息窗口标题
enableMessage:true//设置允许信息窗发送短息
};
var  mapStyle ={
 features: ["road", "building","water","land"],//隐藏地图上的poi
}
map.setMapStyle(mapStyle);

//处理模拟的数据
for(var i=0;i<data_info.length;i++){
 // var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
 var content = data_info[i][2];
 // console.log(series_data);
 var pt = new BMap.Point(data_info[i][0],data_info[i][1]);
 var myIcon = new BMap.Icon("images/1.png", new BMap.Size(30,30));
 var myIcon1 = new BMap.Icon("images/2.png", new BMap.Size(30,30));
 var myIcon2 = new BMap.Icon("images/3.png", new BMap.Size(30,30));

 if(data_info[i][3] <= 60){
     var marker2 = new BMap.Marker(pt,{icon:myIcon2});
     map.addOverlay(marker2);
     marker2.setAnimation(BMAP_ANIMATION_BOUNCE);
 }else if(data_info[i][3] >= 60 && data_info[i][3] < 80){
     var marker2 = new BMap.Marker(pt,{icon:myIcon});
     map.addOverlay(marker2);
 }else if(data_info[i][3] >= 80 && data_info[i][3] <= 100){
     var marker2 = new BMap.Marker(pt,{icon:myIcon1});
     map.addOverlay(marker2);
 }
//  addClickHandler(series_data1,series_data2,content,marker2);
}

function addClickHandler(data,data2,content,marker){
marker.addEventListener("click",function(e){
    openInfo(content,e,data,data2);
});
}

function openInfo(content,e,data,data2){
  var p = e.target;
var point = new BMap.Point(p.point.lng, p.point.lat);
var infoWindow = new BMap.InfoWindow(content,opts);// 创建信息窗口对象
map.openInfoWindow(infoWindow,point); //开启信息窗口
}

/*地图事件设置函数：*/
function setMapEvent(){
  map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
map.enableScrollWheelZoom();//启用地图滚轮放大缩小
map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
map.enableKeyboard();//启用键盘上下左右键移动地图
}

var blist = [];
var districtLoading = 0;
function getBoundary() {
addDistrict("浙江省");//这里我以浙江为案例
}

/**
* 添加行政区划
* @param {} districtName 行政区划名
* @returns  无返回值
*/
function addDistrict(districtName) {
//使用计数器来控制加载过程
districtLoading++;
var bdary = new BMap.Boundary();
bdary.get(districtName, function (rs) {       //获取行政区域
   var count = rs.boundaries.length; //行政区域的点有多少个
   if (count === 0) {
       alert('未能获取当前输入行政区域');
       return;
   }
   for (var i = 0; i < count; i++) {
       blist.push({ points: rs.boundaries[i], name: districtName });
   };
   //加载完成区域点后计数器-1
   districtLoading--;
   if (districtLoading == 0) {
       //全加载完成后画端点
       drawBoundary();
   }
});
}

function drawBoundary() {
//包含所有区域的点数组
var pointArray = [];

/*画遮蔽层的相关方法
*思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。
*      这样就做出了一个经过多次西北角的闭合多边形*/
//定义中国东南西北端点，作为第一层
var pNW = { lat: 0.0, lng: 0.0 }
var pNE = { lat: 0.0, lng: 0.0 }
var pSE = { lat: 0.0, lng: 0.0 }
var pSW = { lat: 0.0, lng: 0.0 }
//向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
var pArray = [];
pArray.push(pNW);
pArray.push(pSW);
pArray.push(pSE);
pArray.push(pNE);
pArray.push(pNW);
//循环添加各闭合区域
for (var i = 0; i < blist.length; i++) {
    //添加显示用标签层
    var label = new BMap.Label(blist[i].name, { offset: new BMap.Size(100, -20) });
    label.hide();
    map.addOverlay(label);
    //添加多边形层并显示
    var ply = new BMap.Polygon(blist[i].points, { strokeWeight: 5, strokeColor: "#FF0000", fillOpacity: 0.01, fillColor: " #fff" }); //建立多边形覆盖物
    ply.name = blist[i].name;
    ply.label = label;
    ply.addEventListener("click", click);
    /*ply.addEventListener("mouseover", mouseover);
    ply.addEventListener("mouseout", mouseout);
    ply.addEventListener("mousemove", mousemove);*/
    map.addOverlay(ply);

    //添加名称标签层
    var centerlabel = new BMap.Label(blist[i].name, { offset: new BMap.Size(20, 20) });
    centerlabel.setPosition(ply.getBounds().getCenter());
    map.addOverlay(centerlabel);

    //将点增加到视野范围内
    var path = ply.getPath();
    pointArray = pointArray.concat(path);
    //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
    pArray = pArray.concat(path);
    pArray.push(pArray[0]);
}

//限定显示区域，需要引用api库
var boundply = new BMap.Polygon(pointArray);
BMapLib.AreaRestriction.setBounds(map, boundply.getBounds());
map.setViewport(pointArray);    //调整视野

//添加遮蔽层
var plyall = new BMap.Polygon(pArray, { strokeOpacity: 0.0000001, strokeColor: "#000000", strokeWeight: 0.00001, fillColor: "blue", fillOpacity: 0.5 }); //建立多边形覆盖物
map.addOverlay(plyall);
}

/*  添加缩略图和缩放控件 */
function addMapControl(){
var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT});
scaleControl.setUnit(BMAP_UNIT_METRIC);
map.addControl(scaleControl);
var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,type:0});
map.addControl(navControl);
var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_TOP_LEFT,isOpen:true});
map.addControl(overviewControl);
}


/**
* （补充）各种鼠标事件绑定，我这里没有做太多的功能
*/
function click(evt) {

}

function mouseover(evt) {

}

function mousemove(evt) {

}

function mouseout(evt) {

}
