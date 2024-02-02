import { Button, Popover, Tooltip } from 'antd'
import React from 'react'

function CycleModalHeader({ cycle, 设置自定义循环保存弹窗 }) {
  return (
    <div className={'cycle-simulator-modal-header space-between'}>
      <div className={'cycle-simulator-modal-title-wrapper'}>
        <h1 className={'cycle-simulator-modal-title'}>循环模拟（beta）</h1>
        <Popover
          content={
            <div>
              <p>1、点击下方技能按钮添加至循环内</p>
              <p>2、可以整行删除、复制本行到最后一行</p>
              <p>3、可以整行拖动技能、在单行内拖动改变技能顺序</p>
              <p>4、宠物可以通过拖动改变宠物顺序</p>
              <p>5、按钮上红色标识为技能剩余CD</p>
            </div>
          }
        >
          <span className={'cycle-simulator-help'}>如何使用?</span>
        </Popover>
        <Popover
          content={
            <div>
              <p>标鹄显示</p>
              <p>验证循环合理性，金乌判断</p>
              <p>日志分析buff覆盖</p>
              <p>宏命令生成循环等等</p>
              <p>后续会逐步按计划实现。</p>
            </div>
          }
        >
          <span className={'cycle-not-support'}>目前未支持功能</span>
        </Popover>
      </div>
      {cycle?.length ? (
        <Tooltip title="自定义循环和原计算器其他循环的dps会心期望计算方式不同。会导致最终数值偏差。请勿进行跨循环比较。">
          <Button
            size="small"
            type="primary"
            onClick={() => 设置自定义循环保存弹窗(true)}
            disabled={cycle?.length <= 1}
          >
            保存为自定义循环
          </Button>
        </Tooltip>
      ) : null}
    </div>
  )
}

export default CycleModalHeader
