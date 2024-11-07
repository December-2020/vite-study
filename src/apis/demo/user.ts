import type { Response } from "#/request";

import { get } from "@/utils/requestMock";

enum Api {
  // 获取用户信息
  User_Info = "/api/account/getAccountInfo",
}

const User = {
  Get_User_Info() {
    return get(Api.User_Info) as unknown as Response;
  },
};

export default User;
