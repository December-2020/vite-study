/*
 * @Author: Komorebi
 * @Date: 2024-11-08 10:33:21
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-08 10:42:27
 */
import Cookies from "js-cookie";

const TokenKey = "vue_token";
/**
 * 过期时间
 * js-cookie 的过期时间是以天数为单位
 * 通过时间戳的方式设置过期时间为 2h 后
 * !东八区 与 格林威治的时间相差8个时区
 * *过期时间是以 new Date().toISOString() 的时间为准
 */
const date = new Date();
/**
 * 获取当前时区
 * getTimezoneOffset() 方法返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟。
 * 如果本地时区后于协调世界时，则该差值为正值，如果先于协调世界时则为负值
 * 即东八区为 -480
 */
const timezoneOffset = date.getTimezoneOffset();
// 设置2个小时(单位:分钟)
const twoHours = 2 * 60;
const expires = new Date(
  date.getTime() + (twoHours + Math.abs(timezoneOffset)) * 60 * 1000
);

export const getToken = () => {
  return Cookies.get(TokenKey);
};

export const setToken = (token: string) => {
  return Cookies.set(TokenKey, token, { expires });
};

export const removeToken = () => {
  return Cookies.remove(TokenKey);
};
