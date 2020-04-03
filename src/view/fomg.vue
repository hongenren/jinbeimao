<template>
	<div class="supervise-warp">
		<div class="supervise">
			<h1 class="title">
				四川卫生监督综合在线监管系统
			</h1>
			<div class="header">
				<div class="fl">2019年7月1号11：08星期二</div>
				<div class="fr">进入管理退出</div>
			</div>
			<div class="navbar">
				<ul>
					<li>水质监测中心</li>
					<li>水质监测中心</li>
					<li>水质监测中心</li>
					<li>水质监测中心</li>
					<li>水质监测中心</li>
					<li>水质监测中心</li>
					<li>水质监测中心</li>
					<li>水质监测中心</li>
				</ul>
			</div>
			<div class="maincontent">
				<div class="main-left fl">
					<div class="medical-box">
						<div class="title1">医废收集总量统计</div>
						<ul>
							<li>总重量：106.69</li>
							<li>总包次：69</li>
						</ul>
						<div id="myChart" style="width: 350px;height:200px;"></div>
					</div>
					<div class="medical-box">
						<div class="title1">监测点医废收集统计</div>
						<table class="yf-table">
							<thead>
								<th>名字</th>
								<th>数量</th>
								<th>数量</th>
								<th>数量</th>
								<th>数量</th>
							</thead>
							<tbody>
								<tr>
									<td>名字</td>
									<td>1</td>
									<td>2</td>
									<td>3</td>
									<td>4</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="medical-box">
						<div class="title1">医废收集总量统计</div>
						<ul>
							<li>总重量：106.69</li>
							<li>总包次：69</li>
						</ul>
						<div id="myChart1" style="width: 350px;height:200px;"></div>
					</div>
				</div>
				<div class="main-center">
					<fome></fome>
				</div>
				<div class="main-right fr">
					<div class="title1">医废收集总量统计</div>
					<table class="yf-table jcsj">
						<tbody>
							<tr><td colspan="4">医院名称：拉丝粉阿萨德</td></tr>
							<tr><td colspan="4">科室：拉丝粉阿萨德</td></tr>
							<tr><td colspan="4">条形表示：拉丝粉阿萨德</td></tr>
							<tr>
								<td>废物类型</td>
								<td>废物类型</td>
								<td>废物类型</td>
								<td>废物类型</td>
							</tr>
							<tr>
								<td>废物类型</td>
								<td>废物类型</td>
								<td>废物类型</td>
								<td>废物类型</td>
							</tr>
							<tr><td colspan="4">收集时间：拉丝粉阿萨德</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import fome from './fome'
export default {
	components: {fome},
	data() {
		return {
			options: [{
			value: 'L',
			label: 'L'
			}, {
			value: 'S',
			label: 'S'
			}, {
			value: '其他',
			label: '其他'
			}],
			value: []
		}
	},
	mounted () {
		this.drawLine();
	},
	methods: {
		drawLine () {
			let myChart = this.$echarts.init(document.getElementById('myChart'));
			myChart.setOption({
				legend: {
					textStyle: {
						color: '#fff'
					}
				},
				tooltip: {},
				xAxis: {
                    // name: '单位',
					type: 'category',
					data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋"],
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
					},
                    axisLabel: {
                        color: '#fff'
                    },
                    axisTick: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
				yAxis: {
                    // name: '数量',
                    nameTextStyle: {
                        color: '#fff'
                    },
                    type: 'value',
                    minInterval: 1,
                    splitLine: {
                        show: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisTick: {
                        inside: true
                    },
                    axisLabel: {
                        color: '#fff'
                    }
                },
				// Declare several bar series, each will be mapped
				// to a column of dataset.source by default.
				series: [
					{
						name: '2011年',
						data: [5, 20, 36, 10, 10],
						type: 'bar',
						barWidth: 20,
						itemStyle: {
							color: '#66cdaa'
						}
					},
					{
						name: '2012年',
						data: [5, 20, 36, 10, 10],
						type: 'bar',
						barWidth: 20,
						itemStyle: {
							color: '#dcff3c'
						}
					}
				]
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.supervise-warp{
	background: #0a3756;
	height: 930px;
	overflow: hidden;
	font-size: 12px;
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	li{
		list-style: none;
	}
	.supervise{
		width: 1500px;
		margin: 0 auto;
		.title{
			color: #cca01e;
			font-size: 30px;
			text-align: center;
		}
		.header{
			overflow: hidden;
			padding: 0 20px;
			color: #fff;
		}
		.navbar{
			margin-top: 10px;
			overflow: hidden;
			li{
				margin-right: 50px;
				color: #e066ff;
				&:first-child{
					margin-left: 40px;
				}
			}
		}
		li{
			float: left;
			font-size: 14px;
		}
		.maincontent{
			margin-top: 10px;
			overflow: hidden;
			.main-left{
				width: 360px;
				height: auto;
			}
			.title1{
				font-size: 16px;
				color: #fff;
			}
				.yf-table{
					color: #fff;
					border-collapse: collapse;
					border-spacing: 0;
					width: 100%;
					border-top: 1px solid #fff;
					border-right: 1px solid #fff;
					border-left: 1px solid #fff;
					tr{
						border: 1px solid #fff;
						height: 50px;
					}
					td, th{
						border: 1px solid #fff;
						padding: 0 20px;
					}
				}
			.medical-box{
				padding-left: 5px;
				ul{
					overflow: hidden;
					margin: 10px 0;
				}
				li{
					color: #fff;
					margin-right: 20px;
					background: #51606d;
					border-radius: 5px;
					padding: 5px;
					&:first-child{
						margin-left: 40px;
					}
				}
			}
			.main-center{
				float: left;
				margin-left: 20px;
				width: 700px;
				height: 400px;
			}
			.main-right{
				width: 360px;
				height: 400px;
				.jcsj{
					tr{
						border: 1px solid #f5f5f5;
						height: 20px;
					}
					td{
						
					}
				}
			}
		}
	}
}

</style>