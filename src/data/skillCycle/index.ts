import yuyao from './yuyao'
import zhouliu_jiepo from './zhouliu_jiepo'
import zhouliu_cw_jiepo from './zhouliu_cw_jiepo'
import lianfeng_2 from './lianfeng_2'
import lianfeng_huanyan_7 from './lianfeng_huanyan_7'
// import lianfeng_huanyan from './lianfeng_huanyan'
// import lianfeng from './lianfeng'
// import zhouliu_cw_zhenji from './zhouliu_cw_zhenji'
// import zhouliu_jiepo_风雪 from './zhouliu_jiepo_风雪'

const All_Cycle_Data = [
  {
    name: '周流',
    title: '周流',
    cycle: zhouliu_jiepo,
    cycleList: [
      { 计算技能数: 4, 循环完整帧数: 96, 循环次数: 5 },
      { 计算技能数: 5, 循环完整帧数: 104, 循环次数: 2 },
      { 计算技能数: 5, 循环完整帧数: 120, 循环次数: 2 },
      { 计算技能数: 6, 循环完整帧数: 128, 循环次数: 7 },
      { 计算技能数: 8, 循环完整帧数: 166, 循环次数: 6 },
      { 计算技能数: 8, 循环完整帧数: 190, 循环次数: 2 },
      { 计算技能数: 10, 循环完整帧数: 230, 循环次数: 6 },
    ],
    type: '周流',
  },
  {
    name: '驭耀',
    title: '驭耀',
    cycle: yuyao,
    cycleList: [
      { 计算技能数: 10, 循环完整帧数: 242, 循环次数: 1 },
      { 计算技能数: 15, 循环完整帧数: 300, 循环次数: 14 },
    ],
    type: '驭耀',
  },
  // {
  //   name: '潋风',
  //   title: '潋风',
  //   cycle: lianfeng,
  //   cycleList: [
  //     { 计算技能数: 10, 循环完整帧数: 242, 循环次数: 1 },
  //     { 计算技能数: 15, 循环完整帧数: 305, 循环次数: 14 },
  //   ],
  //   type: '潋风',
  // },
  {
    name: '潋风-驭耀',
    title: '潋风-驭耀',
    cycle: lianfeng_2,
    cycleList: [
      { 计算技能数: 10, 循环完整帧数: 242, 循环次数: 1 },
      { 计算技能数: 15, 循环完整帧数: 305, 循环次数: 14 },
    ],
    type: '潋风',
  },
  {
    name: '潋风-连亘-涣衍',
    title: '潋风-连亘-涣衍',
    cycle: lianfeng_huanyan_7,
    cycleList: [
      { 计算技能数: 10, 循环完整帧数: 242, 循环次数: 1 },
      { 计算技能数: 15, 循环完整帧数: 305, 循环次数: 14 },
    ],
    type: '潋风',
  },
  {
    name: '周流_cw',
    title: '周流_cw',
    cycle: zhouliu_cw_jiepo,
    cycleList: [
      { 计算技能数: 4, 循环完整帧数: 92, 循环次数: 5 },
      { 计算技能数: 5, 循环完整帧数: 104, 循环次数: 2 },
      { 计算技能数: 5, 循环完整帧数: 120, 循环次数: 2 },
      { 计算技能数: 6, 循环完整帧数: 128, 循环次数: 7 },
      { 计算技能数: 8, 循环完整帧数: 166, 循环次数: 6 },
      { 计算技能数: 8, 循环完整帧数: 190, 循环次数: 2 },
      { 计算技能数: 10, 循环完整帧数: 230, 循环次数: 6 },
    ],
    type: '周流_cw',
    hide: true,
  },
]

export default All_Cycle_Data
