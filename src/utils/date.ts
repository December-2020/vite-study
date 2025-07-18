/*
 * @Author: Komorebi
 * @Date: 2025-07-17 17:27:44
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-17 17:29:13
 */
/**
 * 按规则格式化日期：yyyy-MM-dd (HH)hh:mm:ss:SSS
 * @param {Date | string} date 日期
 * @param {string} format 格式化规则
 * 为兼容ie做的
 */
export const dateFormat = (date: Date | string | number, format: string): string => {
  let time: Date;
  
  if (!date) return "";
  
  if (typeof date === "string") {
    time = new Date(date.replace(/-/g, "/").replace(/T|Z/g, " ").trim());
    // 如果传入的字符串不能转为正常的日期格式，直接返回该字符串，不要返回一串NaN
    if (isNaN(Date.parse(time.toString()))) {
      return date;
    }
  } else if (["number", "object"].includes(typeof date)) {
    time = new Date(date as number | Date);
  } else {
    return date.toString();
  }
  
  const o: { [key: string]: number } = {
    "M+": time.getMonth() + 1, //月份
    "d+": time.getDate(), //日
    "h+": time.getHours() % 12 === 0 ? 12 : time.getHours() % 12, // 12小时制
    "H+": time.getHours(), // 24小时制
    "m+": time.getMinutes(), //分
    "s+": time.getSeconds(), //秒
    "q+": Math.floor((time.getMonth() + 3) / 3), //季度
    S: time.getMilliseconds(), //毫秒
  };
  
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (time.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 
          ? o[k].toString() 
          : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  
  return format;
};

/**
 * 格式化日期为YYYY-MM-DD
 * @param {Date | string | number} date
 * @return {string}
 */
export const formatDate = (date: Date | string | number): string => 
  dateFormat(date, "yyyy-MM-dd");

/**
 * 格式化时间为HH:mm
 * @param {Date | string | number} date
 * @return {string}
 */
export const formatTime = (date: Date | string | number): string => 
  dateFormat(date, "HH:mm");

/**
 * 格式化日期时间，去除秒：YYYY-MM-DD HH:mm
 * @param {Date | string | number} date
 * @return {string}
 */
export const formatDateTime = (date: Date | string | number): string => 
  dateFormat(date, "yyyy-MM-dd HH:mm");

/**
 * 格式化日期时间：YYYY-MM-DD HH:mm:ss
 * @param {Date | string | number} date
 * @return {string}
 */
export const formatDateTimeSec = (date: Date | string | number): string => 
  dateFormat(date, "yyyy-MM-dd HH:mm:ss");

/**
 * 格式化月份：YYYY-MM
 * @param {Date | string | number} date
 * @return {string}
 */
export const formatMonth = (date: Date | string | number): string => 
  dateFormat(date, "yyyy-MM");