// 走不通了，这条路加起来几亿种组合。浏览器扛不住
import {
  EquipmentCharacterPositionEnum,
  EquipmentInlayEnum,
  EquipmentPositionEnum,
  EquipmentTypeEnum,
  GainTypeEnum,
} from '@/@types/enum'
import { EquipmentDTO } from '@/@types/equipment'
import ZUANGBEI_DATA from '@/data/zhuangbei'
import { getZuiDaJingLian } from '../ZhuangbeiSelect'
import { getDpsTime, getTrueCycleByName } from '@/utils/skill-dps'
import { getDpsTotal } from '@/components/Dps/utils'
import { getNewEquipmentData, getSkillCycleGainData } from '../utils'
import { getFinalCharacterBasicDataByEquipment } from '../../util'
import { Modal } from 'antd'
import './index.css'

const MaxDpsFunc = ({
  skillBasicData,
  currentCycle,
  currentCycleName,
  currentTarget,
  zengyixuanxiangData,
  zengyiQiyong,
  network,
  equipmentBasicData,
  withWufeng = false,
}) => {
  // 获取全部的装备组合
  const startTime = new Date().valueOf()
  console.log('开始计算最优配装')
  const all = getAllList(withWufeng)
  console.log('总计算量', all?.length)

  // 获取所有装备计算dps所需要的数据组合
  const allDpsParams = getAllDpsParams(all)

  let maxDpsItem: any = { dps: 0 }

  allDpsParams.forEach((item) => {
    const { totalDps, dpsTime } = getDps(item, {
      skillBasicData,
      currentCycle,
      currentCycleName,
      currentTarget,
      zengyixuanxiangData,
      zengyiQiyong,
      network,
    })
    const dps = totalDps / dpsTime
    if (dps > maxDpsItem?.dps) {
      maxDpsItem = {
        ...{
          totalDps,
          dpsTime,
          dps,
          data: item,
        },
      }
    }
  })
  const endTime = new Date().valueOf()

  console.log('------------------------------')
  console.log('计算完成')
  console.log('最大DPS期望组合为', maxDpsItem?.data)
  console.log('最大DPS期望为', Math.floor(maxDpsItem?.totalDps / maxDpsItem?.dpsTime))
  console.log('战斗时间', maxDpsItem?.dpsTime)
  console.log('计算共用时约', `${(endTime - startTime) / 1000}秒`)
  console.log('共计算装备排列可能数量', all?.length)

  Modal.confirm({
    type: 'success',
    title: `当前增益最佳推荐（计算用时）${(endTime - startTime) / 1000}秒`,
    content: (
      <div>
        {Object.keys(maxDpsItem?.data)
          .filter((item) => item.includes('_') && !item.includes('大附魔'))
          .map((item) => {
            const currentData = maxDpsItem?.data?.[item]
            // 找到和当前装备不一样的装备

            const currentList = equipmentBasicData?.equipments || []

            const isDiff = currentList?.find(
              (a) => a.装备部位 === currentData.装备部位 && a.id !== currentData.id
            )
            return (
              <p key={item} className="max_item">
                <span>
                  <span className={`max_name ${isDiff ? 'diff_name' : ''}`}>
                    {currentData.装备名称}
                  </span>
                </span>
                <span>{currentData.装备品级}</span>
              </p>
            )
          })}
        理论最高秒伤：
        <span className={'max_dps'}>{Math.floor(maxDpsItem?.dps)}</span>
      </div>
    ),
  })
}

const getDps = (
  value,
  {
    skillBasicData,
    currentCycle,
    currentCycleName,
    currentTarget,
    zengyixuanxiangData,
    zengyiQiyong,
    network,
  }
) => {
  const data = getNewEquipmentData(value)
  const { finalData } = getFinalCharacterBasicDataByEquipment(data)
  const final = {
    ...finalData,
    套装会心会效: data.taozhuangShuanghui,
    水特效武器: data.shuitexiaoWuqi,
    水特效武器_2: data.shuitexiaoWuqi_2,
    龙门武器: data?.longmenWuqi,
    大橙武特效: data?.dachengwu,
    小橙武特效: data?.xiaochengwu,
    风特效腰坠: data.texiaoyaozhui,
    风特效腰坠_2: data.texiaoyaozhui_2,
    切糕会心: data.qiegaotaozhuanghuixin,
    切糕无双: data.qiegaotaozhuangwushuang,
    切糕会心_2: data.qiegaotaozhuanghuixin_2,
    切糕无双_2: data.qiegaotaozhuangwushuang_2,
    冬至套装: data?.dongzhitaozhuangshuxing,
    大附魔_伤帽: data?.大附魔_伤帽,
    大附魔_伤衣: data?.大附魔_伤衣,
    大附魔_伤腰: data?.大附魔_伤腰,
    大附魔_伤腕: data?.大附魔_伤腕,
    大附魔_伤鞋: data?.大附魔_伤鞋,
  }
  let newSkillBasicData = skillBasicData
  newSkillBasicData = getSkillCycleGainData(
    skillBasicData,
    data.taozhuangJineng,
    data.dachengwu,
    data.xiaochengwu
  )
  const dpsTime = getDpsTime(
    currentCycleName,
    final,
    network,
    zengyiQiyong,
    zengyixuanxiangData,
    false
  )

  // 获取实际循环
  const trueCycle = getTrueCycleByName(currentCycleName, currentCycle, final)

  const { totalDps } = getDpsTotal({
    currentCycle: trueCycle,
    characterFinalData: final,
    当前目标: currentTarget,
    skillBasicData: newSkillBasicData,
    zengyiQiyong,
    zengyixuanxiangData,
    dpsTime,
  })

  // console.log('dps', totalDps)
  return { totalDps, dpsTime }
}

// 获取所有装备用户dps计算的列表
const getAllDpsParams = (list) => {
  return list.map((item) => {
    const zhuangbeiObj = {}

    item.forEach((item) => {
      zhuangbeiObj[item.position] = {
        装备名称: item.装备名称,
        装备品级: item.装备品级,
        id: item.id,
        当前精炼等级: getZuiDaJingLian(item),
        装备部位: item.position.split('_')?.[0],
        镶嵌孔数组: item.镶嵌孔数组.map((a) => {
          return {
            ...a,
            镶嵌宝石等级: 8,
          }
        }),
        附魔: getFumo(item),
      }
    })

    // console.log('zhuangbeiObj', zhuangbeiObj)

    return {
      openQiangLv: 1,
      wucaishi: '彩·破招·斩铁·狂攻(陆)',
      大附魔_伤帽: 1,
      大附魔_伤腕: 1,
      大附魔_伤腰: 1,
      大附魔_伤衣: 1,
      大附魔_伤鞋: 1,
      ...zhuangbeiObj,
    }
  })
}

// 获取所有符合的装备列表穷举
const getAllList = (withWufeng) => {
  let all: any[] = [固定id]
  Object.keys(EquipmentCharacterPositionEnum)
    .filter((item) => {
      return !固定部位.includes(item)
    })
    .forEach((type) => {
      const current: any[] = []
      ZUANGBEI_DATA[EquipmentCharacterPositionEnum[type]]
        ?.filter((item: EquipmentDTO) => {
          return guilvguize(item, withWufeng)
        })
        .forEach((item: EquipmentDTO) => {
          if (type !== '_1') {
            all.forEach((a) => {
              current.push([
                ...a,
                { ...item, position: `${EquipmentCharacterPositionEnum[type]}${type}` },
              ])
            })
          } else {
            current.push([{ ...item, position: `${EquipmentCharacterPositionEnum[type]}${type}` }])
          }
        })
      if (current?.length) {
        all = current
      }
    })
  return all
}

export default MaxDpsFunc

const guilvguize = (item: EquipmentDTO, withWufeng) => {
  if (withWufeng && item.装备类型 === EquipmentTypeEnum.试炼精简 && item.装备品级 >= 12100) {
    return true
  }
  if (item.装备品级 < 12450) {
    return false
  }
  if ([EquipmentTypeEnum.切糕, EquipmentTypeEnum.副本精简].includes(item.装备类型)) {
    return true
  }
  // 普通装备只要会无
  if (item.装备类型 === EquipmentTypeEnum.普通) {
    return item.装备增益.some((a) =>
      [GainTypeEnum.外攻破防等级, GainTypeEnum.破招].includes(a.增益类型)
    )
  }
  return true
}

const 固定部位 = ['_1', '_3', '_4', '_6', '_8', '_12']
const 固定id = [
  {
    position: '帽子_1',
    id: 94335,
    uid: '207851',
    装备名称: '濯心·锋虹冠',
    装备品级: 12300,
    装备类型: EquipmentTypeEnum.普通,
    镶嵌孔数组: [{ 镶嵌类型: EquipmentInlayEnum.力道 }, { 镶嵌类型: EquipmentInlayEnum.攻击 }],
  },
  {
    position: '腰带_3',
    id: 94277,
    uid: '207793',
    装备名称: '濯心·锋虹腰带',
    装备品级: 12300,
    装备类型: EquipmentTypeEnum.门派套装,
    镶嵌孔数组: [{ 镶嵌类型: EquipmentInlayEnum.会心 }, { 镶嵌类型: EquipmentInlayEnum.攻击 }],
  },
  {
    position: '护腕_4',
    id: 94248,
    uid: '207764',
    装备名称: '濯心·锋虹护手',
    装备品级: 12300,
    装备类型: EquipmentTypeEnum.门派套装,
    镶嵌孔数组: [{ 镶嵌类型: EquipmentInlayEnum.力道 }, { 镶嵌类型: EquipmentInlayEnum.攻击 }],
  },
  {
    position: '鞋子_6',
    id: 94306,
    uid: '207822',
    装备名称: '濯心·锋虹靴',
    装备品级: 12300,
    装备类型: EquipmentTypeEnum.门派套装,
    镶嵌孔数组: [{ 镶嵌类型: EquipmentInlayEnum.攻击 }, { 镶嵌类型: EquipmentInlayEnum.破防 }],
  },
  {
    position: '腰坠_8',
    id: 37719,
    uid: '208033',
    装备名称: '恸黄沙',
    装备品级: 12450,
    装备类型: EquipmentTypeEnum.副本精简,
    镶嵌孔数组: [{ 镶嵌类型: EquipmentInlayEnum.破防 }],
  },
  {
    position: '武器_12',
    id: 34765,
    uid: '208066',
    装备名称: '踏刀行',
    装备品级: 12450,
    武器伤害_最小值: 2896,
    武器伤害_最大值: 4827,
    装备类型: EquipmentTypeEnum.特效武器,
    镶嵌孔数组: [
      { 镶嵌类型: EquipmentInlayEnum.攻击 },
      { 镶嵌类型: EquipmentInlayEnum.力道 },
      { 镶嵌类型: EquipmentInlayEnum.破防 },
    ],
  },
]

const getFumo = (data) => {
  const 部位 = data?.position?.split('_')?.[0]
  if (EquipmentPositionEnum.武器 === 部位) {
    return `武伤+540`
  } else if ([EquipmentPositionEnum.鞋子].includes(部位)) {
    return `加速+491`
  } else if ([EquipmentPositionEnum.帽子, EquipmentPositionEnum.戒指].includes(部位)) {
    return `破招+799`
  } else if ([EquipmentPositionEnum.衣服, EquipmentPositionEnum.腰带].includes(部位)) {
    return `无双+240`
  } else if (
    [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装, EquipmentPositionEnum.暗器].includes(
      部位
    )
  ) {
    return `破防+799`
  }
  return ''
}
