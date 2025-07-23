export const getCssVariable = (name: string) => {
  // 确保 name 以 "--" 开头
  if (!name.startsWith("--")) {
    name = `--${name}`;
  }
  // 获取 CSS 变量的值
  const value =
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    "";
  return value;
};
