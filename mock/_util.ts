import type { Recordable } from "../types/global";

import { ResultEnum } from "../src/enums/http";

/** 
 * 这里这么设置是为了与全局类型下的request文件中的
 * Response 接口统一风格
 */
export function resultSuccess<T = Recordable>(data: T, { msg = "ok" } = {}) {
  return {
    flag: ResultEnum.SUCCESS,
    data,
    msg,
    success: true,
  };
}

export function resultError(
  msg = "Request failed",
  { flag = ResultEnum.ERROR, data = null } = {}
) {
  return {
    flag,
    data,
    msg,
    success: false,
  };
}
