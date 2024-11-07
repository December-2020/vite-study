/*
 * @Author: Komorebi
 * @Date: 2024-09-27 15:07:15
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-27 15:07:33
 */
/**
 * @description: request method
 */
export enum RequestEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // form-data qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  //   FORM_DATA = "multipart/form-data;charset=UTF-8",
}

/**
 * @description: Request result set
 * 为mock 模拟请求设置的请求结果
 * 后续可根据需求自行修改
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
  TYPE = "success",
}
