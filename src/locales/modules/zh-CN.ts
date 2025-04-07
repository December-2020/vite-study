/*
 * @Author: Komorebi
 * @Date: 2024-09-26 09:15:04
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-03-28 10:52:06
 */
export default {
  // 全局通用
  Layout: {
    search: {
      title: "搜索",
      confirm: "确认",
      toggle: "切换",
      close: "关闭",
      noResult: "暂无搜索结果",
    },
  },

  // 通用组件
  Components: {
    inputPlaceholder: "请输入内容",
    dialogCancelText: "取消",
    dialogConfirmText: "确认",
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
      three: "3D图",
      line: "折线图",
      test: "测试路由",
      test1: "测试路由1",
      test2: "测试路由2",
      test3: "测试路由3",
    },
    example: {
      title: "例子",
      ellipsis: "文本省略",
    },
    components: {
      title: "组件",
      dialog: "弹窗",
      editor: "富文本编辑器",
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
      orderQuantity: "订单量",
      total: "总计",
      languageProportion: "语言占比",
      abilityRadar: "能力雷达",
      capacityAllocation: "能力分配",
      radar: {
        sale: "销售",
        manage: "管理",
        informationTechnology: "信息技术",
        customerService: "客服",
        researchAndDevelopment: "研发",
        market: "市场",
      },
    },
  },
};
