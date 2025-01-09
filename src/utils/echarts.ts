/*
 * @Author: Komorebi
 * @Date: 2024-12-17 14:38:41
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-12-18 14:06:19
 */
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入图表，图表后缀都为 Chart
import { LineChart, BarChart, PieChart, RadarChart } from "echarts/charts";
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent, // 标题
  TooltipComponent, // 提示框
  GridComponent, // 直角坐标系
  DatasetComponent, // 数据集
  // TransformComponent, // 内置数据转换器 (filter, sort)
  LegendComponent, // 图例
  DataZoomComponent, // 数据区域缩放
} from "echarts/components";
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { SVGRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LabelLayout,
  UniversalTransition,
  SVGRenderer,
  DatasetComponent,
  DataZoomComponent,
  LegendComponent,
  // TransformComponent,

  LineChart,
  BarChart,
  PieChart,
  RadarChart,
]);

export default echarts;
