import { Button, Checkbox, Dropdown, Menu, Popover, Select, Tooltip } from 'antd'
import React from 'react'
import { CycleSimulatorSkillDTO, 模拟信息类型 } from '../../simulator/type'
import 快速导入默认循环 from '../../constant/快速导入默认循环'
import { useAppSelector } from '@/hooks'
import './index.css'
interface CycleModalHeaderProps {
  cycle: CycleSimulatorSkillDTO[]
  设置自定义循环保存弹窗: (e: boolean) => void
  清空循环: () => void
  起手驰风: boolean
  设置起手驰风: (e: boolean) => void
  快速导入循环: (e: CycleSimulatorSkillDTO[]) => void
  更新奇穴弹窗展示: (e: boolean) => void
  更新奇穴信息: (e: string[]) => void
  加速等级: number
  更新加速等级: (e: number) => void
  模拟信息: 模拟信息类型
}

function CycleModalHeader(props: CycleModalHeaderProps) {
  const {
    cycle,
    设置自定义循环保存弹窗,
    清空循环,
    起手驰风,
    设置起手驰风,
    快速导入循环,
    更新奇穴弹窗展示,
    更新奇穴信息,
    加速等级,
    更新加速等级,
    模拟信息,
  } = props

  const 自定义循环 = useAppSelector((state) => state?.basic?.customCycleList)

  const 快捷添加循环 = (名称, 类型 = '默认') => {
    const 数据源 = 类型 === '默认' ? 快速导入默认循环 : 自定义循环

    const 当前循环数据 = 数据源?.find((item) => item.名称 === 名称)

    const 技能序列信息 = (当前循环数据?.技能序列 || [])
      .map((item) => {
        return 模拟信息?.技能基础数据?.find((a) => a?.技能名称 === item) as CycleSimulatorSkillDTO
      })
      .filter((item) => item)

    快速导入循环(技能序列信息)
    if (当前循环数据?.奇穴信息) {
      更新奇穴信息(当前循环数据?.奇穴信息)
    }
  }

  return (
    <div className={'cycle-simulator-modal-header space-between'}>
      <div className={'cycle-simulator-modal-title-wrapper'}>
        <h1 className={'cycle-simulator-modal-title'}>循环模拟</h1>
        <Popover
          content={
            <div>
              <p>1、点击下方技能按钮添加至循环内</p>
              <p>2、可以整行删除、复制本行到最后一行</p>
              <p>3、可以在单行内拖动改变技能顺序</p>
              <p>
                更多使用说明详见：
                <a href="https://www.jx3box.com/tool/75292" target="_blank" rel="noreferrer">
                  使用手册及FAQ
                </a>
              </p>
            </div>
          }
        >
          <span className={'cycle-simulator-help'}>如何使用</span>
        </Popover>
        <Popover
          content={
            <div>
              目前未支持的功能
              <p>奇穴：截辕</p>
            </div>
          }
        >
          <span className={'cycle-not-support'}>未支持功能</span>
        </Popover>
      </div>
      <div className={'cycle-simulator-header-btns'}>
        <Checkbox
          className={'cycle-simulator-header-checkbox'}
          checked={起手驰风}
          // value={起手驰风}
          onChange={(e) => 设置起手驰风(e.target.checked)}
        >
          起手驰风
        </Checkbox>
        <Select
          size="small"
          className={'cycle-simulator-header-select'}
          value={加速等级}
          onChange={更新加速等级}
          options={Array.from({ length: 6 }, (v, i) => i).map((a) => {
            return {
              value: a,
              label: `${a}段加速`,
            }
          })}
        />
        <Dropdown
          overlay={
            <Menu>
              {快速导入默认循环?.map((item) => {
                return (
                  <Menu.Item key={item?.名称} onClick={() => 快捷添加循环(item?.名称)}>
                    {item?.名称}
                  </Menu.Item>
                )
              })}
              {自定义循环?.length
                ? 自定义循环.map((item, index) => {
                    return (
                      <Menu.Item key={index} onClick={() => 快捷添加循环(item?.名称, '自定义')}>
                        {item?.名称}
                      </Menu.Item>
                    )
                  })
                : null}
            </Menu>
          }
        >
          <Button size="small">导入循环</Button>
        </Dropdown>
        <Tooltip title={'本奇穴设置只会在循环模拟器内生效，不影响外部'}>
          <Button size="small" onClick={() => 更新奇穴弹窗展示(true)}>
            奇穴设置
          </Button>
        </Tooltip>
        <Button size="small" onClick={() => 清空循环()} danger>
          清空循环
        </Button>
        <Tooltip title="自定义循环和原计算器其他循环的dps会心期望计算方式不同。会导致最终数值偏差。请勿进行跨循环比较。">
          <Button
            size="small"
            type="primary"
            onClick={() => 设置自定义循环保存弹窗(true)}
            disabled={cycle?.length < 1 || 模拟信息?.循环执行结果 === '异常'}
          >
            保存为自定义循环
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default CycleModalHeader
