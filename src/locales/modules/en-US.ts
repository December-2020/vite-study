/*
 * @Author: Komorebi
 * @Date: 2024-09-26 09:14:33
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-18 15:02:06
 */
export default {
  // 通用组件
  Components: {
    inputPlaceholder: "Please enter content",
  },

  // 页面路由
  Route: {
    common: {
      login: "Login",
      // 404: "Page Not Found",
    },
    chart: {
      title: "Charts",
      histogram: "Histogram Chart",
      line: "Line Chart",
      test: "Test Route",
      test1: "Test Route 1",
      test2: "Test Route 2",
      test3: "Test Route 3",
    },
  },

  // 提示弹窗
  ToolTip: {
    langSuccess: "Replace successfully",
    fullScreen: "Full screen",
    exit: "Exit",
    noSupportFullScreen:
      "This browser currently does not support full screen display",
  },

  // 登录页面
  Login: {
    login: "Login",
    inputUsername: "Please enter your username",
    inputPassword: "Please enter your password",
  },

  // 404页面
  404: {
    title: "Page Not Found!",
    openNewPage: "Open new page",
    notBeAccessed: "The page cannot be accessed...",
    tips: "Please check that url you entered is correct, or click the button to return to the homepage",
    backButton: "back homepage",
  },
};
