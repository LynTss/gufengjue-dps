// 循环模拟器
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal, Tooltip, message } from 'antd'
import { ReactSortable } from 'react-sortablejs'

import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks'

import 循环模拟技能基础数据 from './constant/skill'

import { getDpsCycle, 获取总用时 } from './utils'
import {
  CycleSimulatorLog,
  CycleSimulatorSkillDTO,
  ShowCycleSingleSkill,
  模拟DPS结果,
  模拟信息类型,
} from './simulator/type'

import 模拟循环 from './simulator/index'
import { 每秒郭氏帧 } from './constant'

import CycleModalHeader from './components/CycleModalHeader'
import StatusBar from './components/StatusBar'
import CycleSkillItem from './components/CycleSkillItem'
import AddCycleSkillBtns from './components/AddCycleSkillBtns'
import SaveCustomCycleModal from './components/SaveCustomCycleModal'
import { currentDpsFunction } from '@/store/basicReducer/current-dps-function'
import QixueSetModal from './components/QixueSetModal'
import { 获取加速等级 } from '@/utils/help'
import './index.css'
import { setCustomCycleList } from '@/store/basicReducer'

const 加速等级枚举 = {
  0: 0,
  1: 95,
  2: 4241,
  3: 8857,
  4: 13851,
  5: 19316,
}

interface CycleSimulatorProps {
  打开循环模拟器?: () => void
}

function CycleSimulator(props: CycleSimulatorProps) {
  const { 打开循环模拟器 } = props
  const [logData, setLogData] = useState<CycleSimulatorLog[]>([])

  const [模拟DPS结果, 更新模拟DPS结果] = useState<模拟DPS结果>({
    dps: 0,
    total: 0,
    战斗时间: 0,
    技能列表: [],
  })

  const [模拟信息, 更新模拟信息] = useState<模拟信息类型>({
    角色状态信息: {
      锐意: 0,
      体态: '双刀',
    },
    当前时间: 0,
    当前自身buff列表: {},
    当前目标buff列表: {},
    循环执行结果: '成功',
    循环异常信息: {},
    技能释放记录: [],
    当前各技能运行状态: {},
    当前GCD组: {},
  })

  // 基础弹窗
  const [basicModalOpen, setBasicModalOpen] = useState<boolean>(false)
  // 循环
  const [cycle, setCycle] = useState<CycleSimulatorSkillDTO[]>([])
  const [自定义循环保存弹窗, 设置自定义循环保存弹窗] = useState<boolean>(false)
  // 当前面板加速值
  const 外部加速值 = useAppSelector((state) => state?.basic?.characterFinalData)?.加速值
  const 大橙武模拟 = useAppSelector((state) => state?.basic?.equipmentBasicData)?.大橙武特效

  // 当前网络延迟
  const 网络按键延迟 = 0
  const [加速等级, 更新加速等级] = useState<number>(0)

  // 自定义循环
  const customCycleList = useAppSelector((state) => state?.basic?.customCycleList)

  const 加速值 = useMemo(() => {
    return 加速等级枚举[加速等级] || 0
  }, [加速等级])

  // 是否实时计算
  const 是否实时计算 = true

  const [起手驰风, 设置起手驰风] = useState<boolean>(true)

  // 奇穴
  const reduxQixuedata = useAppSelector((state) => state?.basic?.qixueData)
  const [奇穴信息, 更新奇穴信息] = useState<string[]>([])
  const [奇穴弹窗展示, 更新奇穴弹窗展示] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (basicModalOpen) {
      // 设置外面选择的默认奇穴信息
      更新奇穴信息(reduxQixuedata)
      更新加速等级(获取加速等级(外部加速值))
    } else {
      setLogData([])
      setBasicModalOpen(false)
      setCycle([])
      更新模拟DPS结果({ dps: 0, total: 0, 战斗时间: 0, 技能列表: [] })
    }
  }, [basicModalOpen, reduxQixuedata, 外部加速值])

  useEffect(() => {
    if (是否实时计算 && basicModalOpen) {
      simulator({})
    }
  }, [basicModalOpen, cycle, 是否实时计算, 起手驰风, 网络按键延迟, 加速值, 奇穴信息])

  const simulator = (props?) => {
    const { 传入加速 = 加速值, 更新展示 = true } = props
    const res = 模拟循环({
      测试循环: cycle.map((item) => item?.技能名称) || [],
      加速值: 传入加速 !== undefined ? 传入加速 : 加速值,
      奇穴: 奇穴信息,
      起手驰风,
      大橙武模拟,
    })

    const {
      最终日志,
      当前自身buff列表: 处理后自身buff,
      当前目标buff列表: 处理后目标buff,
      角色状态信息: 处理后角色状态信息,
      ...rest
    } = res
    if (更新展示) {
      setLogData(最终日志)
      计算dps(最终日志, rest?.当前时间)
      更新模拟信息({
        当前自身buff列表: 处理后自身buff,
        当前目标buff列表: 处理后目标buff,
        角色状态信息: 处理后角色状态信息,
        ...rest,
      })
    }
    return { 最终日志, ...rest }
  }

  // 计算DPS日志
  const 计算dps = (data: CycleSimulatorLog[], 当前时间) => {
    const 获取用于计算的技能组 = getDpsCycle(data)
    const { dpsPerSecond, dpsList, totalDps } = dispatch(
      currentDpsFunction({
        更新循环技能列表: 获取用于计算的技能组,
        更新计算时间: 当前时间 / 每秒郭氏帧,
        更新奇穴数据: 奇穴信息,
      })
    )
    更新模拟DPS结果({
      dps: 当前时间 > 0 ? dpsPerSecond : 0,
      total: 当前时间 > 0 ? totalDps : 0,
      战斗时间: 获取总用时(当前时间),
      技能列表: dpsList,
    })
  }

  // 向循环内新增技能
  const 新增循环技能 = (item: CycleSimulatorSkillDTO) => {
    const newCycle = [...(cycle || []), item]
    setCycle(newCycle)
  }

  const 批量新增循环 = (item: CycleSimulatorSkillDTO[]) => {
    const newCycle = [...(cycle || []), ...item]
    setCycle(newCycle)
  }

  // 从循环内删除技能
  const 删除循环技能 = (index) => {
    const newCycle = [...(cycle || [])]
    newCycle.splice(index, 1)
    setCycle(newCycle)
  }

  // 根据循环计算更适合展示的多层数组，用于显示
  const 处理循环结果对象 = useMemo(() => {
    const res: ShowCycleSingleSkill[][] = []
    cycle.map((item, index) => {
      const 找到当前技能释放记录 = 模拟信息?.技能释放记录?.[index]
      const data = {
        ...item,
        ...找到当前技能释放记录,
      }
      if (index === 0) {
        res[res?.length] = [{ ...data, index: index || 0 }]
      } else {
        res[res?.length - 1] = [...(res[res?.length - 1] || []), { ...data, index: index || 0 }]

        const 打完本技能进入双刀 =
          (奇穴信息?.includes('威声') && data?.技能名称 === '灭') || data?.技能名称 === '断'

        if (打完本技能进入双刀) {
          res[res?.length] = []
        }
      }
      return data
    })

    return { 显示循环: res, 完整循环: cycle }
  }, [cycle, 模拟信息])

  // 拖拽更新循环
  const 拖拽更新循环 = (newList, type) => {
    if (type == '轮次内') {
      // 首先获取被替换轮次的第一个元素的index索引
      const minIndex = newList.reduce(function (min, obj) {
        return Math.min(min, obj.index)
      }, Infinity)
      // 获取最大的索引，判断拖拽生效范围
      const maxIndex = newList.reduce(function (min, obj) {
        return Math.max(min, obj.index)
      }, Number.NEGATIVE_INFINITY)
      // 将数组哪索引范围内跌元素替换为新的数组元素
      const newCycle = cycle.map((item, index) => {
        if (index < minIndex || index > maxIndex) {
          return { ...item }
        } else {
          return newList[index - minIndex]
        }
      })
      // 更新循环
      setCycle(newCycle)
    } else if (type === '整个轮次拖拽') {
      const res: CycleSimulatorSkillDTO[] = []
      newList.forEach((item) => {
        item.forEach((a) => {
          if (a.技能名称) {
            const 当前技能数据 = 循环模拟技能基础数据?.find((b) => b?.技能名称 === a.技能名称)
            if (当前技能数据) {
              res.push(当前技能数据)
            }
          }
        })
      })
      setCycle(res)
    }
  }

  // 复制本轮到最后
  const 复制本轮至最后 = (轮次) => {
    const newCycle = cycle.concat(轮次)
    setCycle(newCycle)
  }

  // 删除本轮次
  const 删除本轮次 = (轮次) => {
    const minIndex = 轮次.reduce(function (min, obj) {
      return Math.min(min, obj.index)
    }, Infinity)
    // 获取最大的索引，判断拖拽生效范围
    const maxIndex = 轮次.reduce(function (min, obj) {
      return Math.max(min, obj.index)
    }, Number.NEGATIVE_INFINITY)
    // 将数组哪索引范围内跌元素替换为新的数组元素
    const newCycle = cycle.filter((item, index) => {
      return index < minIndex || index > maxIndex
    })
    // 更新循环
    setCycle(newCycle)
  }

  // 确认保存自定义循环
  const 确认保存循环 = (名称) => {
    // 获取0 1 2 加速下 网络延迟为 1 2 3 的共9种循环
    const 各加速枚举 = {
      0: { dpsTime: 0, cycle: [] },
      1: { dpsTime: 0, cycle: [] },
      2: { dpsTime: 0, cycle: [] },
      3: { dpsTime: 0, cycle: [] },
      4: { dpsTime: 0, cycle: [] },
      5: { dpsTime: 0, cycle: [] },
    }

    const 异常加速等级: number[] = []

    Object.keys(各加速枚举).forEach((加速) => {
      const 实际加速值 = 加速等级枚举[加速]
      const 模拟结果 = simulator({
        传入加速: Number(实际加速值),
        更新展示: false,
      })
      const 本次日志 = 模拟结果?.最终日志
      const 循环执行结果 = 模拟结果?.循环执行结果
      const 战斗时间 = 本次日志[本次日志.length - 1].日志时间 || 0
      const 战斗秒 = Math.round((战斗时间 / 每秒郭氏帧) * 100) / 100
      const 用于计算循环 = getDpsCycle(本次日志)
      if (循环执行结果 === '成功') {
        各加速枚举[加速] = {
          dpsTime: 战斗秒,
          cycle: 用于计算循环,
        }
      } else {
        异常加速等级.push(Number(加速))
      }
    })

    if (异常加速等级?.length > 0) {
      message.error(`${异常加速等级?.join(',')}段加速异常，将不会保存该加速的循环`)
    }

    const 技能序列 = cycle.map((item) => item.技能名称)

    const 新自定义循环 = customCycleList?.some((item) => item?.名称 === 名称)
      ? customCycleList.map((item) => {
          return item.名称 === 名称
            ? { 名称, 各加速枚举: 各加速枚举 as any, 奇穴信息, 技能序列 }
            : item
        })
      : (customCycleList || []).concat([
          { 名称, 各加速枚举: 各加速枚举 as any, 奇穴信息, 技能序列 },
        ])

    dispatch(setCustomCycleList(新自定义循环))

    设置自定义循环保存弹窗(false)
    message.success('保存成功')
  }

  useEffect(() => {
    // redux变动，更新storage信息
    const 保存信息 = {}
    ;(customCycleList || []).forEach((item) => {
      保存信息[item.名称] = {
        name: item?.名称,
        title: item?.名称,
        hide: false,
        type: '自定义',
        qixue: item?.奇穴信息,
        各加速枚举: item?.各加速枚举,
        skillList: item?.技能序列,
      }
    })
    localStorage?.setItem('dz_custom_cycle', JSON.stringify(保存信息))
  }, [customCycleList, 奇穴信息])

  return (
    <>
      <Button
        danger
        onClick={() => {
          setBasicModalOpen(true)
          打开循环模拟器 && 打开循环模拟器()
        }}
      >
        循环模拟
      </Button>
      <Modal
        className="cycle-simulator-modal"
        maskClosable={false}
        width={'100%'}
        title={
          <CycleModalHeader
            cycle={cycle}
            设置自定义循环保存弹窗={设置自定义循环保存弹窗}
            清空循环={() => setCycle([])}
            起手驰风={起手驰风}
            设置起手驰风={设置起手驰风}
            快速导入循环={(循环) => setCycle(循环)}
            更新奇穴信息={更新奇穴信息}
            更新奇穴弹窗展示={更新奇穴弹窗展示}
            加速等级={加速等级}
            更新加速等级={更新加速等级}
            模拟信息={模拟信息}
          />
        }
        centered
        footer={null}
        open={basicModalOpen}
        onCancel={() => setBasicModalOpen(false)}
        destroyOnClose
      >
        <div className={'cycle-simulator-setting'}>
          {/* 角色状态栏 */}
          <StatusBar
            模拟信息={模拟信息}
            完整循环={处理循环结果对象?.完整循环}
            日志信息={logData}
            模拟DPS结果={模拟DPS结果}
          />
          {/* // 循环展示模块 */}
          <div className={'cycle-simulator-setting-res'}>
            {处理循环结果对象?.显示循环?.length ? (
              (处理循环结果对象?.显示循环 || []).map((轮次, index) => {
                return 轮次?.length ? (
                  <div className={`cycle-simulator-setting-turn cycle-turn-drag`} key={`${index}`}>
                    <ReactSortable
                      list={轮次.map((i) =>
                        Object.assign(i, { id: `${i?.技能名称}_${index}_${i?.index}` })
                      )}
                      setList={(e) => {
                        拖拽更新循环(e, '轮次内')
                      }}
                      className="cycle-simulator-setting-turn-drop"
                      animation={150}
                      draggable={'.cycle-simulator-setting-skill-drag'}
                    >
                      {(轮次 || []).map((item) => {
                        return (
                          <CycleSkillItem
                            技能={item}
                            删除循环技能={删除循环技能}
                            key={`${item?.技能名称}_${index}_${item?.index}`}
                            模拟信息={模拟信息}
                          />
                        )
                      })}
                      <div className={'cycle-turn-operate'}>
                        <Tooltip title="复制并添加到最后">
                          <CopyOutlined
                            className={'cycle-turn-operate-btn'}
                            onClick={() => 复制本轮至最后(轮次)}
                          />
                        </Tooltip>
                        <Tooltip title="删除此轮">
                          <DeleteOutlined
                            className={'cycle-turn-operate-btn'}
                            onClick={() => 删除本轮次(轮次)}
                          />
                        </Tooltip>
                      </div>
                    </ReactSortable>
                  </div>
                ) : (
                  <div />
                )
              })
            ) : (
              <p className={'cycle-simulator-setting-tip'}>请点击下方技能按钮生成模拟技能序列</p>
            )}
          </div>
        </div>
        {/* 添加循环按钮组 */}
        <AddCycleSkillBtns
          新增循环技能={新增循环技能}
          批量新增循环={批量新增循环}
          处理循环结果对象={处理循环结果对象}
          模拟信息={模拟信息}
          大橙武模拟={大橙武模拟}
        />
        {/* 保存自定义循环弹窗 */}
        <SaveCustomCycleModal
          自定义循环保存弹窗={自定义循环保存弹窗}
          设置自定义循环保存弹窗={设置自定义循环保存弹窗}
          保存自定义循环={确认保存循环}
        />
        {/* 循环自定义奇穴弹窗 */}
        <QixueSetModal
          奇穴信息={奇穴信息}
          更新奇穴信息={更新奇穴信息}
          奇穴弹窗展示={奇穴弹窗展示}
          更新奇穴弹窗展示={更新奇穴弹窗展示}
        />
      </Modal>
    </>
  )
}

export default CycleSimulator
