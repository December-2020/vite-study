/*
 * @Author: Komorebi
 * @Date: 2024-09-26 09:14:33
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-03-28 10:57:11
 */
export default {
  // 全局通用
  Layout: {
    search: {
      title: "Search docs",
      confirm: "to select",
      toggle: "to navigate",
      close: "to close",
      noResult: "No recent searches",
    },
  },

  // 通用组件
  Components: {
    inputPlaceholder: "Please enter content",
    dialogCancelText: "Cancel",
    dialogConfirmText: "Confirm",
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
    example: {
      title: "example",
      ellipsis: "Text omission",
      components: {
        title: "Components",
        dialog: "Dialog",
        editor: "Rich text editor",
      },
    },
  },

  // 提示弹窗
  ToolTip: {
    langSuccess: "Replace successfully",
    fullScreen: "Full screen",
    exit: "Exit",
    noSupportFullScreen:
      "This browser currently does not support full screen display",
    closeConsole: "Please close the console before going full screen",
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
      },
    },
  },
};
