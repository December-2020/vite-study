/*
 * @Author: Komorebi
 * @Date: 2024-11-08 10:33:21
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-31 16:54:11
 */
import Cookies from "js-cookie";
import { useStorage } from "@vueuse/core";

// 用户相关信息
const UserInfoKey = "vue_userinfo";
const TokenKey = "vue_token";

/**
 * 过期时间
 * js-cookie 的过期时间是以天数为单位
 * 通过时间戳的方式设置过期时间为 2h 后
 * !东八区 与 格林威治的时间相差8个时区
 * *过期时间是以 new Date().toISOString() 的时间为准
 */
// const date = new Date();
/**
 * 获取当前时区
 * getTimezoneOffset() 方法返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟。
 * 如果本地时区后于协调世界时，则该差值为正值，如果先于协调世界时则为负值
 * 即东八区为 -480
 */
// const timezoneOffset = date.getTimezoneOffset();
// 设置2个小时(单位:分钟)
// const twoHours = 2 * 60;
/* const expires = new Date(
  date.getTime() + (twoHours + Math.abs(timezoneOffset)) * 60 * 1000
);
console.log("🚀 ~ expires:", expires);
const expires1 = new Date(date.getTime() + twoHours * 60 * 1000);
console.log("🚀 ~ expires1:", expires1)
console.log("🚀 ~ expires1:toISOString", expires1.toISOString()); */

// 换成格林威治的时间
/* const expires = new Date(date.getTime() + twoHours * 60 * 1000);
console.log("🚀 ~ expires:", expires);
const testTime = new Date(expires);
console.log("🚀 ~ testTime:", testTime); */

// 设置cookie过期时间 (单位:天)
const expires = 1 / 24;

export const getToken = () => {
  return Cookies.get(TokenKey);
};
export const setToken = (token: string) => {
  /**
   * { expires, secure: true }
   *
   * 确保在安全的HTTPS连接下才发送Cookie。
   * 这可以通过在设置Cookie时，
   * 将secure选项设置为true来实现。
   */
  return Cookies.set(TokenKey, token, { expires });
};
export const removeToken = () => {
  return Cookies.remove(TokenKey);
};

/**
 * 用户信息相关
 */
const userInfo = useStorage(UserInfoKey, {}, sessionStorage);
export const getUserInfo = () => {
  return userInfo.value;
};
export const setUserInfo = (info: object | null) => {
  userInfo.value = info;
};
