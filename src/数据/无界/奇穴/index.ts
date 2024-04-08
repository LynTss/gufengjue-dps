import { QixueListDTO } from '@/@types/qixue'

export const 力道加成奇穴 = '斩涛·悟'

export const 无界_判断是否开启力道加成奇穴 = (data) => {
  return data?.some((item) => item === 力道加成奇穴)
}

export const 无界奇穴数据: QixueListDTO[] = [
  // 1
  {
    奇穴列表: [
      {
        奇穴名称: '斩涛·悟',
        奇穴加成类型: '常驻',
        奇穴加成技能: '通用',
        奇穴图片: 'https://icon.jx3box.com/icon/17728.png',
      },
    ],
  },
  // 2
  {
    // 是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: '披靡·悟',
        奇穴加成类型: '无增益',
        奇穴图片: 'https://icon.jx3box.com/icon/17755.png',
      },
    ],
  },
  // 3
  {
    奇穴列表: [
      {
        奇穴名称: '倒海·悟',
        奇穴加成类型: '无增益',
        奇穴图片: 'https://icon.jx3box.com/icon/17734.png',
      },
    ],
  },
  // 4
  {
    奇穴列表: [
      {
        奇穴名称: '孤锋破浪·悟',
        奇穴加成类型: '无增益',
        奇穴图片: 'https://icon.jx3box.com/icon/17749.png',
      },
    ],
  },
]

export default 无界奇穴数据
