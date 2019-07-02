<template>
<div id="fome">
	<div class="warp">
	<ul class="maptype">
		<li><span style="background:green;"></span>正常</li>
		<li><span style="background:red;"></span>异常</li>
	</ul>
	<div id="allmap" ref="allmap"></div>
	</div>
</div>
</template>
<script>
export default { 
	name: 'fome',
	data() {
		return {
			tupian1: require('./html/images/1.png'),
			tupian2: require('./html/images/2.png'),
			data_info: [
				[114.502461, 38.045474, "网站名称：市住房公积金;网站ip:192.168.1.100;网站URL:www.aaa.com;", 30],
				[120.153576, 29.287459, "网站名称：浙江省嘉兴市中学<br>网站ip:192.168.1.100<br>网站URL:www.ccc.com", 91],
				[120.750865, 30.762653, "网站名称：嘉兴经济技术开发区人力资源网", 70],
				[121.428599, 28.661378, "网站名称：嘉兴315维权网<br>网站ip:192.168.1.100<br>网站URL:www.jdin.com", 20],
				[120.153576, 30.287459, "网站名称：嘉兴旅游", 70],
				[120.205170, 30.25720, "网站名称：嘉兴市青少年宫", 92],
				[120.753576, 30.687459, "网站名称：嘉兴市公共交通总局", 55],
				[120.750865, 30.762653, "网站名称：嘉兴福利彩票", 35],
				[119.750865, 29.762653, "网站名称：嘉兴电视台", 15],
				[120.750865, 30.762653, "网站名称：市委老干部局", 95]
			]
		}
	},
	 methods: {  
		map() {   
			let map = new BMap.Map(this.$refs.allmap); // 创建Map实例 
			var point = new BMap.Point(116.404, 39.915);   
			map.centerAndZoom(point, 3); // 初始化地图,设置中心点坐标（经纬度/城市的名称）和地图级别 
			   
			// map.addControl(new BMap.MapTypeControl({ //添加地图类型控件
			// 	type: BMAP_NAVIGATION_CONTROL_SMALL,
			// 	    mapTypes: [     BMAP_NORMAL_MAP,      BMAP_HYBRID_MAP    ]
			// }));   
			map.setCurrentCity("浙江"); // 设置地图显示的城市 此项是必须设置的 
			   
			map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放 
			map.enableDoubleClickZoom();      //启用双击放大，默认启用
			   
			map.setMapStyle({
				style: 'midnight'
			}); //地图风格
			var bdary = new BMap.Boundary();
			bdary.get('浙江省', function(rs) { //获取行政区域
				// map.clearOverlays(); //清除地图覆盖物
				var count = rs.boundaries.length; //行政区域的点有多少个
				for (var i = 0; i < count; i++) {
					var ply = new BMap.Polygon(rs.boundaries[i], {
						strokeWeight: 2,
						fillColor: "#00a75b",
						strokeColor: "#ff0000"
					}); //建立多边形覆盖物
					map.addOverlay(ply); //添加覆盖物
					map.setViewport(ply.getPath()); //调整视野
				}
				//'{"type":"Feature","id":"0","properties":{"name":"'+name+'"},"geometry":{"type":"Polygon","coordinates":[[[' + String().replace(';','],[') + ']]}}';
			});
			//处理模拟的数据
			for (var i = 0; i < this.data_info.length; i++) {
				// var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
				var content = this.data_info[i][2];
				// console.log(series_data);
				var pt = new BMap.Point(this.data_info[i][0], this.data_info[i][1]);
				var myIcon = new BMap.Icon(this.tupian1, new BMap.Size(30, 30));
				var myIcon1 = new BMap.Icon(this.tupian2, new BMap.Size(30, 30));
				// var myIcon2 = new BMap.Icon("./html/images/3.png", new BMap.Size(30, 30));
				
				if (this.data_info[i][3] <= 40) {
					var marker2 = new BMap.Marker(pt, {
						icon: myIcon1
					});
					map.addOverlay(marker2);
					var label = new BMap.Label("3/5",{offset:new BMap.Size(0,0)});
					label.setStyle({
						color: "red",
						fontSize: "9px",
						backgroundColor: "0.05",
						border: "0",
						fontWeight: "bold"
					});
					marker2.setLabel(label);
					
					// marker2.setAnimation(BMAP_ANIMATION_BOUNCE);  // 会动
				} else if (this.data_info[i][3] >= 60 && this.data_info[i][3] < 80) {
					var marker2 = new BMap.Marker(pt, {
						icon: myIcon
					});
					map.addOverlay(marker2);
					var label = new BMap.Label("5/3",{offset:new BMap.Size(0,0)});
					label.setStyle({
						color: "red",
						fontSize: "9px",
						backgroundColor: "0.05",
						border: "0",
						fontWeight: "bold"
					});
					marker2.setLabel(label);
				}
			}
			// map.addEventListener("click", function(e) {
			// 	let point = new BMap.Point(e.point.lng, e.point.lat);
			// 	map.centerAndZoom(point, 16);
			// 	//(e.point.lng + ", " + e.point.lat)地图坐标
			// 	//("地图缩放至：" + this.getZoom() + "级")地图缩放级别
			// });
		} 
	},
	 mounted() {   //调用上面个的函数
		  
		this.map() 
	}
}
</script>
<style>
/*设置地图的宽高*/
.warp{
	position: relative;
}
.maptype{
	position: absolute;
	top: 8px;
	left: 8px;
	color: #fff;
	z-index: 9999;
}
.maptype  li{
	font-size: 14px;
	list-style: none;
}
.maptype  span{
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 50%;
}
#allmap {
	width: 700px;
	height: 500px;
	overflow: hidden;
}

.anchorBL {
	display: none;
}

.BMap_cpyCtrl {
	display: none;
}
</style>