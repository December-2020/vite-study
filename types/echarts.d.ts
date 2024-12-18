/*
 * @Author: Komorebi
 * @Date: 2024-12-17 15:25:33
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-12-17 15:27:50
 */
// 系列类型的定义后缀都为 SeriesOption
import type {
  //   BarSeriesOption,
  LineSeriesOption,
} from "echarts/charts";

// 组件类型的定义后缀都为 ComponentOption
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  //   DatasetComponentOption,
} from "echarts/components";

import type { ComposeOption } from "echarts/core";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  //   | BarSeriesOption
  | LineSeriesOption
  
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  //   | DatasetComponentOption
>;
