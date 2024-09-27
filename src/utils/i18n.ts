import i18n from "@/locales";

/**
 * 翻译 route.meta 中的标题
 * 用于面包屑、侧边栏、tagsView
 */
export function generateTitle(title?: string): string {
  if (title) {
    const { t } = i18n.global;
    let tTitle = t(`Route.${title}`);
    /**
     * 路由名称一般是有 xxx.xxx (某个模块.具体名称)
     */
    let _title = ~tTitle.indexOf(".") ? "" : tTitle;
    return _title;
  }
  return "";
}
