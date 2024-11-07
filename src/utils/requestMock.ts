/**
 * 请求实例
 * mock c测试
 */
import type { Response } from "#/request";

import Request from "./request";
import { ElMessage } from "element-plus";
import { RequestEnum, ContentTypeEnum } from "@/enums/http";

const requestInstance = new Request({
  baseURL: "",
  timeout: 1000 * 60 * 3,
});

export const get = (url: string, params?: string | object) => {
  return new Promise((resolve, reject) => {
    requestInstance
      .request<Response>({
        url,
        method: RequestEnum.GET,
        // get 请求只能通过params传参
        params,
      })
      .then((res) => {
        // 请求失败并且有请求错误信息
        if (!res.success) {
          if (res.msg) {
            ElMessage({
              message: res.msg,
              type: "error",
            });
          } else {
            console.error(res, "error");
          }
        }
        resolve(res);
      })
      .catch((err) => {
        console.error(err, "error");
        reject(err);
      });
  });
};

export const post = (url: string, data?: string | object) => {
  return new Promise((resolve, reject) => {
    requestInstance
      .request<Response>({
        url,
        method: RequestEnum.POST,
        headers: {
          "Content-Type": ContentTypeEnum.JSON,
        },
        /**
         * post 请求一般通过 data传参
         * 但是也可以通过 params 传参
         * 参数传递的方式主要看后端的写法
         */
        data,
      })
      .then((res) => {
        // 请求失败并且有请求错误信息
        if (!res.success) {
          if (res.msg) {
            ElMessage({
              message: res.msg,
              type: "error",
            });
          } else {
            console.error(res, "error");
          }
        }
        resolve(res);
      })
      .catch((err) => {
        console.error(err, "error");
        reject(err);
      });
  });
};
