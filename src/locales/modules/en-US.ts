/*
 * @Author: Komorebi
 * @Date: 2024-09-26 09:14:33
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-09 16:55:21
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
      three: "Three Chart",
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
    closeConsole: "Please close the console before going full screen"
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

  // 图表页面
  Chart: {
    line: {
      price: "price",
      number: "number",
      orderQuantity: "order quantity",
      total: "total",
      languageProportion: "Language Proportion",
      abilityRadar: "Ability Radar",
      capacityAllocation: "Capacity allocation",
      radar: {
        sale: "Sale",
        manage: "Manage",
        informationTechnology: "Information Technology",
        customerService: "Customer Service",
        researchAndDevelopment: "Research And Development",
        market: "Market",
      }
    }
  }
};
