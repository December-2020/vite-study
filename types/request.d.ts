// AxiosRequestConfig,
import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: (
    config: AxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: <T = AxiosResponse>(config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}

// 自定义传入的参数
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}

/** 
 * * 调用接口返回的数据类型
 * ? 仅该服务后端返回的数据类型是这种
 * ? 后续可根据需求自行调整
 */
export interface Response {
  // 状态码
  flag: number;
  // 调用接口是否成功
  success: boolean;
  /**
   * 业务数据 object / array
   * ts 中 object(对象类型) 包括
   *    函数、数组、类、{}、object、Object
   */
  data: object;
  // 调用接口相关信息
  msg: string;
}
