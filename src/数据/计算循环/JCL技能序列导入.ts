export const JCL技能序列导入 = (原序列: string) => {
  let newStr = 原序列.replaceAll('\n', '')
  Object.keys(替换枚举).forEach((key) => {
    newStr = newStr.replaceAll(key, `${替换枚举[key]},`)
  })
  const arr = newStr.split(',')
  return arr.filter((item) => item)
}

const 替换枚举 = {
  留客雨: `留`,
  停云势: `停`,
  识破: `吃影子`,
  灭影追风: `灭`,
  游风飘踪: `游`,
  横云断浪: `横`,
  '沧浪三叠·一': `沧`,
  '沧浪三叠·二': `沧`,
  '沧浪三叠·三': `沧`,
  孤锋破浪: `孤`,
  '行云势·一': `行`,
  '行云势·二': `行`,
  '行云势·三': `行`,
  决云势: `决`,
  断云势: `断`,
}
