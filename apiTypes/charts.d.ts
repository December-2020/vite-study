interface LineCount {
  id: string;
  title: string;
  type: string;
  total: number;
  orders: number;
}
interface Day{
  day: string;
  num: number;
}

export interface LineData {
  countList: LineCount[];
  dayList: Day[];
}
