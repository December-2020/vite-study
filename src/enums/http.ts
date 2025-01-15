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
  /** 
   * 1.适合复杂数据
   *  前端无需关心数据结构的复杂度, 后端解析方便
   * 2.少数浏览器不兼容
   * 3.数据格式
   *  发送的数据: {a:1, b:"b"},
   *  接收的数据: JSON.stringify({a:1, b:"b"})
   */
  JSON = "application/json;charset=UTF-8",
  // form-data qs
  /** 
   * 1.所有浏览器都兼容
   * 2.数据结构极其复杂时,服务端解析非常困难
   * 3.数据格式
   *  a=1&b=b
   */
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
