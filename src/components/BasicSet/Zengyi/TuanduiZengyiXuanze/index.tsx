import { TuanduiZengyiBasicDataDTO, ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { TuanduiZengyi_DATA } from '@/数据/团队增益'
import { useAppSelector } from '@/hooks'
import { Button, Space } from 'antd'
import React, { useMemo, useState } from 'react'
// import { SettingOutlined } from '@ant-design/icons'
import 团队增益设置弹窗 from './团队增益设置弹窗'
import 团队增益图标 from './团队增益图标'
import './index.css'

function TuanduiZengyiXuanze({ saveDataAndGetDps }) {
  const 增益数据 = useAppSelector((state) => state.basic.增益数据)

  const [visible, setVisible] = useState<boolean>(false)

  const onChangeZengyi = (
    e: boolean | null,
    zengyi: TuanduiZengyiBasicDataDTO,
    cengshu?,
    fugailv?
  ) => {
    const exist = 增益数据?.团队增益?.some((item) => item.增益名称 === zengyi?.增益名称)
    const newData: ZengyixuanxiangDataDTO = {
      ...增益数据,
      团队增益: [...(增益数据?.团队增益 || [])],
    }
    if (exist) {
      newData.团队增益 = 增益数据?.团队增益?.map((item) => {
        if (item.增益名称 === zengyi?.增益名称) {
          return {
            ...item,
            启用: e === null ? item?.启用 : e,
            层数: cengshu || item?.层数,
            覆盖率: fugailv || item?.覆盖率,
          }
        } else {
          return {
            ...item,
          }
        }
      })
    } else {
      newData.团队增益 = [
        ...newData.团队增益,
        {
          增益名称: zengyi?.增益名称,
          启用: e === null ? true : e,
          层数: cengshu || zengyi?.层数 || 1,
          覆盖率: fugailv || zengyi?.覆盖率 || 100,
        },
      ]
    }

    saveDataAndGetDps(newData)
  }

  const 快捷设置团队增益 = (data) => {
    const newData: ZengyixuanxiangDataDTO = {
      ...增益数据,
      团队增益: [...(data || [])],
    }
    saveDataAndGetDps(newData)
  }

  const 显示团队增益 = useMemo(() => {
    return (
      TuanduiZengyi_DATA.filter((item) => {
        return (增益数据?.团队增益 || []).find((a) => item?.增益名称 === a?.增益名称)?.启用 || false
      }).map((item) => {
        const 当前数据 = (增益数据?.团队增益 || []).find((a) => item?.增益名称 === a?.增益名称)
        return {
          ...item,
          当前数据: 当前数据,
        }
      }) || []
    )
  }, [TuanduiZengyi_DATA, 增益数据])

  return (
    <div className='tuandui-zengyi'>
      <div className='tuandui-zengyi-header'>
        <h1 className='tuandui-title'>团队增益</h1>
        <Button
          className={'tuandui-setting-btn'}
          danger
          size='small'
          onClick={() => setVisible(true)}
        >
          设置增益
        </Button>
      </div>
      {显示团队增益?.length ? (
        <Space size={[8, 8]} wrap>
          {显示团队增益.map((item) => {
            return <团队增益图标 data={item} key={item?.增益名称} 当前数据={item?.当前数据} />
          })}
        </Space>
      ) : (
        <p className={'tuandui-empty'}>当前无团队增益</p>
      )}
      <团队增益设置弹窗
        open={visible}
        onCancel={() => setVisible(false)}
        onChangeZengyi={onChangeZengyi}
        快捷设置团队增益={快捷设置团队增益}
      />
    </div>
  )
}

export default TuanduiZengyiXuanze
