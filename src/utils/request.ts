// AxiosRequestConfig,
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type { RequestConfig, RequestInterceptors } from "#/request";

import axios, { isCancel } from "axios";

/**
 * 取消重复请求
 * AbortController 是 fetch API 提供的,不需要从 axios 引入
 * isCancel 用于判断请求是不是被 AbortController 取消的
 */
// const { isCancel } = axios;
// 请求队列, 缓存发出的请求
const cacheRequest = new Map();
// 不进行重复请求拦截的白名单
const cacheWithList: string[] = [];

class Request {
  // axios 实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;
    /**
     * 拦截器的执行顺序为实例请求 → 类请求 → 实例响应 → 类响应
     */
    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        // 在发送请求之前做一些处理, 比如添加 token 等
        /**
         * 重复的请求
         *  1. 请求路径一致 url
         *  2. 请求方法一致 (get / post) method
         *  3. 请求参数一致 data
         */
        const { url, method } = config;
        // 请求的唯一标识 url__method
        let requestKey = `${url}__${method}`;
        // 剔除白名单中的请求
        if (!cacheWithList.includes(requestKey)) {
          removeCacheRequest(requestKey);
          // 将请求加入请求队列, 通过 AbortController 来进行手动取消
          const controller = new AbortController();
          res.signal = controller.signal;
          cacheRequest.set(requestKey, controller);
        }
        return res as InternalAxiosRequestConfig;
      },
      (err: any) => err
    );
    // 实例请求拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    // 实例响应拦截器
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );
    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // console.log(res, "全局响应拦截器");
        const { url, method } = res.config;
        // 请求成功,从缓存中移除
        let requestKey = `${url}__${method}`;
        removeCacheRequest(requestKey);
        // 响应直接返回 res.data
        return res.data;
      },
      (err: any) => err
    );
  }

  request<T>(config: RequestConfig): Promise<T> {
    // return this.instance.request(config);
    return new Promise((resolve, reject) => {
      // 如果存在单个请求的拦截器, 则使用该拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res);
          }
          // console.log(res, "接口返回的数据");
          if (isCancel(res)) {
            console.error("重复请求, 自动拦截并取消");
            return;
          }
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export default Request;

/**
 * @desc 删除缓存队列中的请求
 * @param {String} requestKey 本次请求的唯一标识 url__method
 */
function removeCacheRequest(requestKey: string) {
  if (cacheRequest.has(requestKey)) {
    // 通过AbortController实例上的abort来进行请求的取消
    const req = cacheRequest.get(requestKey);
    // 取消请求
    req.abort();
    // 从缓存中删除该请求
    cacheRequest.delete(requestKey);
  }
}
