import { QixueListDTO } from '@/@types/qixue'
import QIXUEIMG_QIXUE from '../../assets/qixue/qixue.png'
import { CharacterFinalDTO } from '@/@types/character'
import {
  getMianBanGongJI,
  getLidao,
  getLidaoJiachengHuixin,
  // getJiChuGongJI,
  getLidaoJiachengPofang,
  getJiChuGongJI,
} from '@/components/BasicSet/CharacterSet/util'
import { 加成系数 } from '../constant'

export const 力道加成奇穴 = '强膂'

export const 判断是否开启力道加成奇穴 = (data) => {
  return data?.some((item) => item === 力道加成奇穴)
}

export const 奇穴数据: QixueListDTO[] = [
  // 1
  {
    奇穴列表: [
      {
        奇穴名称: '中峙',
        奇穴加成技能: ['行云势·一', '行云势·二', '行云势·三'],
        奇穴图片: 'https://icon.jx3box.com/icon/17728.png',
      },
      {
        奇穴名称: '渊冲',
        奇穴加成技能: ['行云势·一', '行云势·二', '行云势·三'],
        奇穴图片: 'https://icon.jx3box.com/icon/17729.png',
      },
      { 奇穴名称: '顾渺', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17730.png' },
    ],
  },
  // 2
  {
    是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '聚疏', 奇穴图片: 'https://icon.jx3box.com/icon/17731.png' },
      { 奇穴名称: '袭伐', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17732.png' },
      { 奇穴名称: '霆骇', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17733.png' },
    ],
  },
  // 3
  {
    奇穴列表: [
      {
        奇穴名称: '雨积',
        奇穴加成技能: ['行云势·一', '行云势·二', '行云势·三', '停云势'],
        奇穴图片: 'https://icon.jx3box.com/icon/17734.png',
      },
      { 奇穴名称: '溃延', 奇穴图片: 'https://icon.jx3box.com/icon/18244.png' },
      { 奇穴名称: '簇尘', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17736.png' },
      { 奇穴名称: '雾灭', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17737.png' },
    ],
  },
  // 4
  {
    奇穴列表: [
      {
        奇穴名称: '放皓',
        奇穴加成技能: ['沧浪三叠·一', '沧浪三叠·二', '沧浪三叠·三'],
        奇穴加成对应关系: {
          '沧浪三叠·一': '放皓·沧浪一',
          '沧浪三叠·二': '放皓·沧浪二',
          '沧浪三叠·三': '放皓·沧浪三',
        },
        奇穴图片: 'https://icon.jx3box.com/icon/17749.png',
      },
      { 奇穴名称: '急潮', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17748.png' },
      { 奇穴名称: '靖步', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17743.png' },
      { 奇穴名称: '遏云势', 奇穴图片: 'https://icon.jx3box.com/icon/17741.png' },
    ],
  },
  // 5
  {
    是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '电逝', 奇穴图片: 'https://icon.jx3box.com/icon/18243.png' },
      { 奇穴名称: '伏瀑', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17760.png' },
      { 奇穴名称: '威声', 奇穴图片: 'https://icon.jx3box.com/icon/17762.png' },
    ],
  },
  // 6
  {
    是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '击懈', 奇穴图片: 'https://icon.jx3box.com/icon/17746.png' },
      { 奇穴名称: '碣石', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17747.png' },
      { 奇穴名称: '观衅', 奇穴图片: 'https://icon.jx3box.com/icon/17751.png' },
      { 奇穴名称: '承磊', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/18231.png' },
    ],
  },
  // 7
  {
    奇穴列表: [
      { 奇穴名称: '滔天', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17750.png' },
      {
        奇穴名称: '镇机',
        奇穴加成技能: ['断云势', '断云势·额外伤害'],
        奇穴图片: 'https://icon.jx3box.com/icon/17735.png',
      },
      { 奇穴名称: '界破', 奇穴图片: 'https://icon.jx3box.com/icon/17757.png' },
      { 奇穴名称: '横断', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17756.png' },
    ],
  },
  // 8
  {
    // 是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '长溯', 奇穴图片: 'https://icon.jx3box.com/icon/18247.png' },
      { 奇穴名称: '鸣锋', 奇穴图片: 'https://icon.jx3box.com/icon/18246.png' },
      { 奇穴名称: '摧朽', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/18232.png' },
      { 奇穴名称: '识意', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17765.png' },
      { 奇穴名称: '敛摄', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/18235.png' },
    ],
  },
  // 9
  {
    是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '涣衍', 奇穴图片: 'https://icon.jx3box.com/icon/17756.png' },
      { 奇穴名称: '势钧', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/18241.png' },
      { 奇穴名称: '驰心', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17745.png' },
      { 奇穴名称: '周流', 奇穴图片: 'https://icon.jx3box.com/icon/18237.png' },
      { 奇穴名称: '驭耀', 奇穴图片: 'https://icon.jx3box.com/icon/18236.png' },
    ],
  },
  // 10
  {
    是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '殊际', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/18242.png' },
      { 奇穴名称: '涤瑕', 奇穴图片: 'https://icon.jx3box.com/icon/17758.png' },
      { 奇穴名称: '强膂', 奇穴图片: 'https://icon.jx3box.com/icon/18240.png' },
      { 奇穴名称: '辞霈', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17761.png' },
      { 奇穴名称: '连亘', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 11
  {
    是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '戗风', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17755.png' },
      { 奇穴名称: '流岚', 奇穴图片: 'https://icon.jx3box.com/icon/17742.png' },
      { 奇穴名称: '斩颓', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17754.png' },
      { 奇穴名称: '泯息', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/18238.png' },
      { 奇穴名称: '亘绝', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/18234.png' },
    ],
  },
  // 12
  {
    是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '截辕', 奇穴图片: 'https://icon.jx3box.com/icon/17759.png' },
      { 奇穴名称: '踏罡', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17738.png' },
      { 奇穴名称: '颂阵', 是否不可编辑: true, 奇穴图片: 'https://icon.jx3box.com/icon/17766.png' },
      { 奇穴名称: '潋风', 奇穴图片: QIXUEIMG_QIXUE },
      {
        奇穴名称: '泽风同承',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/17767.png',
      },
      {
        奇穴名称: '怒锋倾涛',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/17768.png',
      },
    ],
  },
]

export default 奇穴数据

// 奇穴名称枚举
export const QixueNameMap = [
  '零',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
  '十一',
  '十二',
]

// 判断力道奇穴加成后面板
export const 获取力道奇穴加成后面板 = (data: CharacterFinalDTO, openQiangLv): CharacterFinalDTO => {
  if (openQiangLv) {
    const 加成后面板力道 = getLidao(data.力道, true)
    const 力道差值 = 加成后面板力道 - data.力道
    return {
      ...data,
      力道: 加成后面板力道,
      // 由于基础面板已经加过会心了，所以只计算增加的力道带来的会心加成
      基础攻击: getJiChuGongJI(data.基础攻击, 力道差值),
      会心值: getLidaoJiachengHuixin(data.会心值, 力道差值),
      破防值: getLidaoJiachengPofang(data.破防值, 力道差值),
      面板攻击:
        getMianBanGongJI(data.面板攻击, 力道差值) +
        Math.round(力道差值 * 加成系数.力道加成基础攻击),
    }
  } else {
    return data
  }
}
