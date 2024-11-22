interface LineCount {
  id: string;
  title: string;
  type: string;
  total: number;
  orders: number;
}

export interface LineData {
  countList: LineCount[];
}
