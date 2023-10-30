// import zhouliu_jiepo, { 循环默认奇穴 as zhouliuqixue } from './zhouliu_jiepo'
// import zhouliu_cw_jiepo from './zhouliu_cw_jiepo'
// import lianfeng_2, { 循环默认奇穴 as lianfengqixue } from './lianfeng_2'
// import lianfeng_huanyan_7, { 循环默认奇穴 as lianfeng_7_qixue } from './lianfeng_huanyan_7'
// import lianfeng_huanyan_dandao, {
//   循环默认奇穴 as lianfeng_dandao_qixue,
// } from './lianfeng_huanyan_dandao'
import single_skill_cycle, { 循环默认奇穴 as single_skill_cycle_qixue } from './single_skill_cycle'
import 潋风4破, { 循环默认奇穴 as 潋风_4破奇穴 } from './潋风_4破'
import 潋风6破, { 循环默认奇穴 as 潋风_6破奇穴 } from './潋风_6破'

// import CW特效期间总伤害 from './三沧孤伤害'
// import 潋风期间总伤害 from './潋风期间单刀伤害'

const All_Cycle_Data = [
  // {
  //   name: '周流',
  //   title: '周流',
  //   cycle: zhouliu_jiepo,
  //   cycleList: [
  //     { 计算技能数: 4, 循环完整帧数: 96, 循环次数: 5 },
  //     { 计算技能数: 5, 循环完整帧数: 104, 循环次数: 2 },
  //     { 计算技能数: 5, 循环完整帧数: 120, 循环次数: 2 },
  //     { 计算技能数: 6, 循环完整帧数: 128, 循环次数: 7 },
  //     { 计算技能数: 8, 循环完整帧数: 166, 循环次数: 6 },
  //     { 计算技能数: 8, 循环完整帧数: 190, 循环次数: 2 },
  //     { 计算技能数: 10, 循环完整帧数: 230, 循环次数: 6 },
  //   ],
  //   type: '周流',
  //   qixue: zhouliuqixue,
  // },
  {
    name: '潋风-4破',
    title: '潋风-4破',
    cycle: 潋风4破,
    cycleList: [
      { 计算技能数: 10, 循环完整帧数: 242, 循环次数: 1 },
      { 计算技能数: 15, 循环完整帧数: 320, 循环次数: 14 },
    ],
    hide: false,
    type: '潋风',
    qixue: 潋风_4破奇穴,
  },
  {
    name: '潋风-6破',
    title: '潋风-6破',
    cycle: 潋风6破,
    cycleList: [
      { 计算技能数: 10, 循环完整帧数: 242, 循环次数: 1 },
      { 计算技能数: 15, 循环完整帧数: 320, 循环次数: 14 },
    ],
    hide: false,
    type: '潋风',
    qixue: 潋风_6破奇穴,
  },
  // {
  //   name: '潋风期间总伤害',
  //   title: '潋风期间总伤害',
  //   cycle: 潋风期间总伤害,
  //   cycleList: [{ 计算技能数: 7, 循环完整帧数: 25, 循环次数: 1 }],
  // },
  // {
  //   name: 'CW特效期间总伤害',
  //   title: 'CW特效期间总伤害',
  //   cycle: CW特效期间总伤害,
  //   cycleList: [{ 计算技能数: 4, 循环完整帧数: 1, 循环次数: 1 }],
  // },
  // {
  //   name: '潋风-连亘-单刀',
  //   title: '潋风-连亘-单刀',
  //   cycle: lianfeng_huanyan_dandao,
  //   cycleList: [
  //     { 计算技能数: 10, 循环完整帧数: 242, 循环次数: 1 },
  //     { 计算技能数: 15, 循环完整帧数: 319, 循环次数: 14 },
  //   ],
  //   hide: true,
  //   type: '潋风',
  //   qixue: lianfeng_dandao_qixue,
  // },
  {
    name: '单技能伤害期望统计-仅参考',
    title: '单技能伤害期望统计-仅参考',
    cycle: single_skill_cycle,
    cycleList: [{ 计算技能数: 1, 循环完整帧数: 1, 循环次数: 1 }],
    type: '单技能统计',
    hide: true,
    qixue: single_skill_cycle_qixue,
  },
  // {
  //   name: '周流_cw',
  //   title: '周流_cw',
  //   cycle: zhouliu_cw_jiepo,
  //   cycleList: [
  //     { 计算技能数: 4, 循环完整帧数: 92, 循环次数: 5 },
  //     { 计算技能数: 5, 循环完整帧数: 104, 循环次数: 2 },
  //     { 计算技能数: 5, 循环完整帧数: 120, 循环次数: 2 },
  //     { 计算技能数: 6, 循环完整帧数: 128, 循环次数: 7 },
  //     { 计算技能数: 8, 循环完整帧数: 166, 循环次数: 6 },
  //     { 计算技能数: 8, 循环完整帧数: 190, 循环次数: 2 },
  //     { 计算技能数: 10, 循环完整帧数: 230, 循环次数: 6 },
  //   ],
  //   type: '周流_cw',
  //   hide: true,
  //   qixue: zhouliuqixue,
  // },
  // {
  //   name: '理想潋风',
  //   title: '理想潋风',
  //   cycle: lianfeng,
  //   cycleList: [
  //     { 计算技能数: 10, 循环完整帧数: 242, 循环次数: 1 },
  //     { 计算技能数: 15, 循环完整帧数: 305, 循环次数: 14 },
  //   ],
  //   type: '潋风',
  // },
]

export default All_Cycle_Data
