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
  price: number;
}

export interface LineData {
  countList: LineCount[];
  dayList: Day[];
}
