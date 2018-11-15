<template>
  <div :id="id" style="width: 500px;height: 350px;"></div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入线形图图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: 'hello',
    data() {
      return {

      }
    },
    mounted() {
      this.drawLine();
    },
    props: ["data", "name", "id","date"],
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(`${this.id}`))
        // 绘制图表
        myChart.setOption({
          title: {  //设置标题的样式
            left:"50",  //距离左边
            top:"20",     //距离右边
            text: this.name,   //标题的文本内容
            textStyle:{
              fontWeight: 'normal', fontSize:"14"    //标题的样式
            }},
          tooltip: {},
          xAxis: {     //x轴从左至右的排列
            data: this.data.xAaxis.data
          },
          yAxis: {
            splitLine:{show: false}  // 消除横向背景线条
          }, //添加y轴
          legend: {    //设置线条提示的样式
            x: 'right',
            y: '200',
            orient: 'vertical',
            data: [{
              name: this.data.series[1].name,
              textStyle: {
                color: '#2f8dfe'
              }
            }, {
              name: this.data.series[0].name,
              textStyle: {
                color: '#ff8bed'
              }
            }]
          },
          series: [{    //设置线条，一条线就是一个对象
            name: this.data.series[1].name,
            type: 'line',
            symbol: "circle",
            data: this.data.series[1].data,    //线条的数据，是一个数组[123,321,456]
            itemStyle: {
              color: '#2f8dfe'     //设置线条折点的颜色
            },
            lineStyle: {
              color: '#d9d9d9',    //设置线条的颜色
              width:1.5
            }
          }, {
            name: this.data.series[0].name,
            type: 'line',
            symbol: "circle",
            data: this.data.series[0].data,
            itemStyle: {
              color: '#ff8bed'
            }, lineStyle: {
              color: '#d9d9d9',
              width:1
            }
          }]
        });
      }
    }
  }
</script>

<style>
</style>