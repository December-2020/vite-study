/*
 * @Author: Komorebi
 * @Date: 2024-11-22 15:50:08
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-22 16:01:31
 */
import type { Response } from "#/request";

import { post } from "@/utils/requestMock";

enum Api {
  // 获取
  Line_Data = "/api/chart/get_line",
}

const Charts = {
  Get_Line_Data() {
    return post(Api.Line_Data, ) as unknown as Response;
  },
};

export default Charts;
