/*
 * @Author: Komorebi
 * @Date: 2024-09-26 09:15:04
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-11 09:42:01
 */
export default {
  // 通用组件
  Components: {
    inputPlaceholder: "请输入内容",
  },

  // 路由模块 (侧边导航栏)
  Route: {
    // 公共路由
    common: {
      login: "登录",
      // 404: "页面未找到",
    },
    chart: {
      title: "图表",
      histogram: "柱状图",
      line: "折线图",
      test: "测试路由",
      test1: "测试路由1",
      test2: "测试路由2",
      test3: "测试路由3",
    },
  },

  // 提示弹窗
  ToolTip: {
    langSuccess: "更换成功",
    fullScreen: "全屏",
    exit: "退出",
    noSupportFullScreen: "该浏览器暂不支持全屏",
    closeConsole: "请先关闭控制台再全屏",
  },

  // 登录页面
  Login: {
    login: "登录",
    inputUsername: "请输入用户名",
    inputPassword: "请输入密码",
  },

  // 404页面
  404: {
    title: "页面未找到!",
    openNewPage: "打开新页面",
    notBeAccessed: "暂无法访问该页面...",
    tips: "请检查您输入的URL是否正确, 或单击按钮返回首页",
    backButton: "返回首页",
  },

  // 图表页面
  Chart: {
    line: {
      price: "价格",
      number: "数量",
    }
  }
};
