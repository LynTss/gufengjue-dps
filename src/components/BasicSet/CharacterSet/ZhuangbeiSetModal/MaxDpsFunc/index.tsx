// // 走不通了，这条路加起来几亿种组合。浏览器扛不住
// import {
//   装备栏部位枚举,
//   镶嵌增伤类型枚举,
//   装备部位枚举,
//   装备类型枚举,
//   增益类型枚举,
// } from '@/@types/enum'
// import { EquipmentDTO } from '@/@types/equipment'
// import ZUANGBEI_DATA from '@/数据/装备'
// import { getZuiDaJingLian } from '../ZhuangbeiSelect'
// import { getDpsTime, 根据奇穴处理技能的基础增益信息 } from '@/utils/skill-dps'
// import { getDpsTotal } from '@/components/Dps/guoshi_dps_utils'
// import { getNewEquipmentData, 根据装备格式化技能基础数据 } from '../utils'
// import { getFinalCharacterBasicDataByEquipment } from '../../util'
// import { Modal } from 'antd'
// import './index.css'
// import { CharacterFinalDTO } from '@/@types/character'

// const MaxDpsFunc = ({
//   skillBasicData,
//   currentCycle,
//   currentCycleName,
//   currentTarget,
//   zengyixuanxiangData,
//   zengyiQiyong,
//   network,
//   equipmentBasicData,
//   withWufeng = false,
//   qixueData,
// }) => {
//   // 获取全部的装备组合
//   const startTime = new Date().valueOf()
//   const all = getAllList(withWufeng)

//   // 获取所有装备计算dps所需要的数据组合
//   const allDpsParams = getAllDpsParams(all)

//   let maxDpsItem: any = { dps: 0 }

//   allDpsParams.forEach((item) => {
//     const { totalDps, dpsTime } = getDps(
//       item,
//       {
//         skillBasicData,
//         currentCycle,
//         currentCycleName,
//         currentTarget,
//         zengyixuanxiangData,
//         zengyiQiyong,
//         network,
//       },
//       qixueData
//     )
//     const dps = totalDps / dpsTime
//     if (dps > maxDpsItem?.dps) {
//       maxDpsItem = {
//         ...{
//           totalDps,
//           dpsTime,
//           dps,
//           data: item,
//         },
//       }
//     }
//   })
//   const endTime = new Date().valueOf()

//   Modal.confirm({
//     type: 'success',
//     title: `当前增益最佳推荐（计算用时）${(endTime - startTime) / 1000}秒`,
//     content: (
//       <div>
//         {Object.keys(maxDpsItem?.data)
//           .filter((item) => item.includes('_') && !item.includes('大附魔'))
//           .map((item) => {
//             const currentData = maxDpsItem?.data?.[item]
//             // 找到和当前装备不一样的装备

//             const currentList = equipmentBasicData?.equipments || []

//             const isDiff = currentList?.find(
//               (a) => a.装备部位 === currentData.装备部位 && a.id !== currentData.id
//             )
//             return (
//               <p key={item} className="max_item">
//                 <span>
//                   <span className={`max_name ${isDiff ? 'diff_name' : ''}`}>
//                     {currentData.装备名称}
//                   </span>
//                 </span>
//                 <span>{currentData.装备品级}</span>
//               </p>
//             )
//           })}
//         理论最高秒伤：
//         <span className={'max_dps'}>{Math.floor(maxDpsItem?.dps)}</span>
//       </div>
//     ),
//   })
// }

// const getDps = (
//   value,
//   {
//     skillBasicData,
//     currentCycle,
//     currentCycleName,
//     currentTarget,
//     zengyixuanxiangData,
//     zengyiQiyong,
//     network,
//   },
//   qixueData
// ) => {
//   const data = getNewEquipmentData(value)
//   const { finalData } = getFinalCharacterBasicDataByEquipment(data)
//   const final: CharacterFinalDTO = {
//     ...finalData,
//     装备增益: {
//       套装会心会效: data.套装会心会效,
//       水特效武器: data.水特效武器,
//       水特效武器_2: data.水特效武器_2,
//       龙门武器: data?.龙门武器,
//       大橙武特效: data?.大橙武特效,
//       小橙武特效: data?.小橙武特效,
//       风特效腰坠: data.风特效腰坠,
//       风特效腰坠_2: data.风特效腰坠_2,
//       切糕会心: data.切糕会心,
//       切糕无双: data.切糕无双,
//       切糕会心_2: data.切糕会心_2,
//       切糕无双_2: data.切糕无双_2,
//       冬至套装: data?.冬至套装,
//       大附魔_伤帽: data?.大附魔_伤帽,
//       大附魔_伤衣: data?.大附魔_伤衣,
//       大附魔_伤腰: data?.大附魔_伤腰,
//       大附魔_伤腕: data?.大附魔_伤腕,
//       大附魔_伤鞋: data?.大附魔_伤鞋,
//     },
//   }
//   let newSkillBasicData = skillBasicData

//   newSkillBasicData = 根据装备格式化技能基础数据(
//     skillBasicData,
//     data.套装技能,
//     data.大橙武特效,
//     data.小橙武特效
//   )

//   const dpsTime = getDpsTime(
//     currentCycleName,
//     final,
//     network,
//     zengyiQiyong,
//     zengyixuanxiangData,
//     false
//   )

//   // 获取实际循环
//   const { trueCycle, trueSkillBasicData } = 根据奇穴处理技能的基础增益信息(
//     currentCycleName,
//     currentCycle,
//     final,
//     qixueData,
//     newSkillBasicData
//   )

//   const { totalDps } = getDpsTotal({
//     currentCycle: trueCycle,
//     characterFinalData: final,
//     当前目标: currentTarget,
//     skillBasicData: trueSkillBasicData,
//     zengyiQiyong,
//     zengyixuanxiangData,
//     dpsTime,
//   })

//   return { totalDps, dpsTime }
// }

// // 获取所有装备用户dps计算的列表
// const getAllDpsParams = (list) => {
//   return list.map((item) => {
//     const zhuangbeiObj = {}

//     item.forEach((item) => {
//       zhuangbeiObj[item.position] = {
//         装备名称: item.装备名称,
//         装备品级: item.装备品级,
//         id: item.id,
//         当前精炼等级: getZuiDaJingLian(item),
//         装备部位: item.position.split('_')?.[0],
//         镶嵌孔数组: item.镶嵌孔数组.map((a) => {
//           return {
//             ...a,
//             镶嵌宝石等级: 8,
//           }
//         }),
//         附魔: getFumo(item),
//       }
//     })

//     return {
//       wucaishi: '彩·破招·斩铁·狂攻(陆)',
//       大附魔_伤帽: 1,
//       大附魔_伤腕: 1,
//       大附魔_伤腰: 1,
//       大附魔_伤衣: 1,
//       大附魔_伤鞋: 1,
//       ...zhuangbeiObj,
//     }
//   })
// }

// // 获取所有符合的装备列表穷举
// const getAllList = (withWufeng) => {
//   let all: any[] = [固定id]
//   Object.keys(装备栏部位枚举)
//     .filter((item) => {
//       return !固定部位.includes(item)
//     })
//     .forEach((type) => {
//       const current: any[] = []
//       ZUANGBEI_DATA[装备栏部位枚举[type]]
//         ?.filter((item: EquipmentDTO) => {
//           return guilvguize(item, withWufeng)
//         })
//         .forEach((item: EquipmentDTO) => {
//           if (type !== '_1') {
//             all.forEach((a) => {
//               current.push([
//                 ...a,
//                 { ...item, position: `${装备栏部位枚举[type]}${type}` },
//               ])
//             })
//           } else {
//             current.push([{ ...item, position: `${装备栏部位枚举[type]}${type}` }])
//           }
//         })
//       if (current?.length) {
//         all = current
//       }
//     })
//   return all
// }

// export default MaxDpsFunc

// const guilvguize = (item: EquipmentDTO, withWufeng) => {
//   if (withWufeng && item.装备类型 === 装备类型枚举.试炼精简 && item.装备品级 >= 12100) {
//     return true
//   }
//   if (item.装备品级 < 12450) {
//     return false
//   }
//   if ([装备类型枚举.切糕, 装备类型枚举.副本精简].includes(item.装备类型)) {
//     return true
//   }
//   // 普通装备只要会无
//   if (item.装备类型 === 装备类型枚举.普通) {
//     return item.装备增益.some((a) =>
//       [增益类型枚举.外攻破防等级, 增益类型枚举.破招].includes(a.增益类型)
//     )
//   }
//   return true
// }

// const 固定部位 = ['_1', '_3', '_4', '_6', '_8', '_12']
// const 固定id = [
//   {
//     position: '帽子_1',
//     id: 94335,
//     uid: '207851',
//     装备名称: '濯心·锋虹冠',
//     装备品级: 12300,
//     装备类型: 装备类型枚举.普通,
//     镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.力道 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
//   },
//   {
//     position: '腰带_3',
//     id: 94277,
//     uid: '207793',
//     装备名称: '濯心·锋虹腰带',
//     装备品级: 12300,
//     装备类型: 装备类型枚举.门派套装,
//     镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会心 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
//   },
//   {
//     position: '护腕_4',
//     id: 94248,
//     uid: '207764',
//     装备名称: '濯心·锋虹护手',
//     装备品级: 12300,
//     装备类型: 装备类型枚举.门派套装,
//     镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.力道 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
//   },
//   {
//     position: '鞋子_6',
//     id: 94306,
//     uid: '207822',
//     装备名称: '濯心·锋虹靴',
//     装备品级: 12300,
//     装备类型: 装备类型枚举.门派套装,
//     镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.攻击 }, { 镶嵌类型: 镶嵌增伤类型枚举.破防 }],
//   },
//   {
//     position: '腰坠_8',
//     id: 37719,
//     uid: '208033',
//     装备名称: '恸黄沙',
//     装备品级: 12450,
//     装备类型: 装备类型枚举.副本精简,
//     镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破防 }],
//   },
//   {
//     position: '武器_12',
//     id: 34765,
//     uid: '208066',
//     装备名称: '踏刀行',
//     装备品级: 12450,
//     武器伤害_最小值: 2896,
//     武器伤害_最大值: 4827,
//     装备类型: 装备类型枚举.特效武器,
//     镶嵌孔数组: [
//       { 镶嵌类型: 镶嵌增伤类型枚举.攻击 },
//       { 镶嵌类型: 镶嵌增伤类型枚举.力道 },
//       { 镶嵌类型: 镶嵌增伤类型枚举.破防 },
//     ],
//   },
// ]

// const getFumo = (data) => {
//   const 部位 = data?.position?.split('_')?.[0]
//   if (装备部位枚举.武器 === 部位) {
//     return `武伤+540`
//   } else if ([装备部位枚举.鞋子].includes(部位)) {
//     return `加速+491`
//   } else if ([装备部位枚举.帽子, 装备部位枚举.戒指].includes(部位)) {
//     return `破招+799`
//   } else if ([装备部位枚举.衣服, 装备部位枚举.腰带].includes(部位)) {
//     return `无双+240`
//   } else if (
//     [装备部位枚举.护腕, 装备部位枚举.下装, 装备部位枚举.暗器].includes(
//       部位
//     )
//   ) {
//     return `破防+799`
//   }
//   return ''
// }

export default {}
