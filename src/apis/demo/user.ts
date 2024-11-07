import type { Response } from "#/request";

import { post } from "@/utils/requestMock";

enum Api {
  // 获取用户信息
  User_Info = "/api/account/getAccountInfo",
}

const User = {
  Get_User_Info(params: object) {
    return post(Api.User_Info, params) as unknown as Response;
  },
};

export default User;
