import { number } from "echarts/core";

interface LineCount {
  id: string;
  title: string;
  type: "年" | "季" | "月" | "周" | "日";
  total: number;
  orders: number;
}
interface Day {
  day: string;
  num: number;
  price: number;
}
interface LangType {
  name: string;
  value: number;
}
// interface Skill {
//   type: string;
//   value: number;
// }
export interface LineData {
  countList: LineCount[];
  dayList: Day[];
  typeList: LangType[];
  skillList: number[];
}
