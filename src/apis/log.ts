import type { Response } from "#/request";

import { post } from "@/utils/requestInstance";

enum Api {
  // 日志分页数据
  Log_Page = "/page/log/log_base/log_page",
}

const Log = {
  Query_Log_Page(params: object) {
    return post(Api.Log_Page, params) as unknown as Response;
  },
};

export default Log;
