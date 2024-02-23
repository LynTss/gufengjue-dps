import React, { useMemo } from 'react'
import { CycleSimulatorSkillDTO, 技能GCD组, 模拟信息类型 } from '../../simulator/type'
import { 每秒郭氏帧 } from '../../constant'
import classNames from 'classnames'
import { Badge, Tooltip } from 'antd'
import { ERROR_ACTION } from '../../simulator/utils'

interface AddCycleSkillBtnProps {
  技能: CycleSimulatorSkillDTO
  完整循环: CycleSimulatorSkillDTO[]
  onClick?: any
  className?: string
  模拟信息: 模拟信息类型
  style?: any
}

interface 异常信息数据 {
  是否禁用?: boolean
  角标数字?: number
  异常描述?: string
}

// 添加循环技能按钮组件
const AddCycleSkillBtn: React.FC<AddCycleSkillBtnProps> = (props) => {
  const { 技能, 模拟信息, onClick, className, ...rest } = props

  const 释放等待CD = 计算可以释放时技能CD(模拟信息, 技能)

  const 异常信息: 异常信息数据 = useMemo(() => {
    if (技能?.技能类型 !== '其他' && 模拟信息?.角色状态信息?.体态 !== 技能?.技能类型) {
      return {
        是否禁用: true,
        异常描述: ERROR_ACTION?.体态错误?.信息,
      }
    } else if (技能?.技能名称 === '断' && (模拟信息?.角色状态信息?.锐意 || 0) < 100) {
      return {
        是否禁用: true,
        异常描述: ERROR_ACTION?.锐意不足?.信息,
      }
    } else if (技能?.技能名称 === '吃影子' && !模拟信息?.当前自身buff列表?.['身形']?.当前层数) {
      return {
        是否禁用: true,
        异常描述: ERROR_ACTION?.身形不足?.信息,
      }
    } else if (技能?.技能名称 === '点掉橙武' && !模拟信息?.当前自身buff列表?.['橙武']?.当前层数) {
      return {
        是否禁用: true,
        异常描述: ERROR_ACTION?.BUFF错误?.信息,
      }
    } else if (释放等待CD > 0) {
      return {
        角标数字: 释放等待CD,
        异常描述: `当前技能处于冷却中，剩余${释放等待CD}秒`,
      }
    } else {
      return {}
    }
  }, [释放等待CD, 技能, 模拟信息])

  // 点击前判断是否可以释放
  const beforeOnClick = () => {
    if (异常信息?.是否禁用) {
      return
    }
    onClick()
  }

  const cls = classNames(className, 异常信息?.是否禁用 ? 'cycle-simulator-setting-btn-error' : '')

  return (
    <div onClick={beforeOnClick} className={cls} {...rest}>
      <Tooltip title={异常信息?.异常描述}>
        <Badge count={异常信息?.角标数字} offset={[0, 0]}>
          <img className={`cycle-add-btn`} src={技能?.图标} />
        </Badge>
      </Tooltip>
      <p className={'cycle-add-btn-text'}>{技能?.技能原始名称 || 技能?.技能名称}</p>
    </div>
  )
}

export default AddCycleSkillBtn

const 计算可以释放时技能CD = (模拟信息: 模拟信息类型, 技能: CycleSimulatorSkillDTO) => {
  const 技能运行状态 = 模拟信息?.当前各技能运行状态?.[技能?.技能名称]

  const GCD = 检查GCD(技能, 模拟信息.当前GCD组)

  // 当前技能可以释放时间当前时间（为上一个技能释放结束时间）加上本技能释放前结算GCD
  const 可以释放时间 = (模拟信息?.当前时间 || 0) + (GCD || 0)
  const 技能CD = (技能运行状态?.计划下次充能时间点 || 0) - 可以释放时间
  // 把帧转成秒，保留两位小数
  const 剩余秒 = Math.round((技能CD / 每秒郭氏帧) * 100) / 100
  return 剩余秒
}

const 检查GCD = (技能: CycleSimulatorSkillDTO, GCD组: 技能GCD组) => {
  let 校验GCD组: string = 技能.技能GCD组 as string
  if (技能.技能GCD组 === '自身') {
    校验GCD组 = 技能?.技能名称
  }
  if (校验GCD组) {
    // 大部分技能只检查自己的GCD
    const GCD = GCD组[校验GCD组]
    return GCD
  } else {
    return 0
  }
}
