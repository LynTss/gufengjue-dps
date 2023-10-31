import { TuanduiZengyiBasicDataDTO, ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { TuanduiZengyi_DATA } from '@/data/tuanduizengyi'
import { useAppSelector } from '@/hooks'
import { Button, Checkbox, Col, InputNumber, Modal, Row, Select } from 'antd'
import React, { useState } from 'react'
import './index.css'

function TuanduiZengyiXuanze({ saveDataAndGetDps }) {
  const zengyixuanxiangData = useAppSelector((state) => state.zengyi.zengyixuanxiangData)

  const [visible, setVisible] = useState<boolean>(false)

  // 暂时不开放编辑
  // const openEdit = true

  const onChangeZengyi = (
    e: boolean | null,
    zengyi: TuanduiZengyiBasicDataDTO,
    cengshu?,
    fugailv?
  ) => {
    const exist = zengyixuanxiangData?.团队增益?.some((item) => item.增益名称 === zengyi?.增益名称)
    const newData: ZengyixuanxiangDataDTO = {
      ...zengyixuanxiangData,
      团队增益: [...(zengyixuanxiangData?.团队增益 || [])],
    }
    if (exist) {
      newData.团队增益 = zengyixuanxiangData?.团队增益?.map((item) => {
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
          层数: cengshu || zengyi?.层数,
          覆盖率: fugailv || zengyi?.覆盖率,
        },
      ]
    }

    saveDataAndGetDps(newData)
  }

  return (
    <div className="tuandui-zengyi">
      <Row gutter={[8, 12]}>
        {TuanduiZengyi_DATA.map((item) => {
          const 当前增益选项 = (zengyixuanxiangData?.团队增益 || []).find(
            (a) => item?.增益名称 === a?.增益名称
          )?.启用
          return (
            <Col span={6} key={item.增益名称}>
              <Checkbox
                checked={当前增益选项}
                className="tuandui-zengyi-checkbox"
                onChange={(e) => onChangeZengyi(e?.target?.checked, item)}
              >
                {item.增益名称}
              </Checkbox>
            </Col>
          )
        })}
      </Row>
      <div className="tuandui-zengyi-btn-wrap">
        <Button size="small" className="tuandui-zengyi-btn" onClick={() => setVisible(true)}>
          {/* 部分增益层数/覆盖率设置 */}
          部分增益层数/覆盖率展示
        </Button>
      </div>
      <Modal
        className="tuandui-zengyi-detail-modal"
        centered
        open={visible}
        title={
          <span>
            部分增益层数/覆盖率展示
            {/* 部分增益层数/覆盖率设置 */}
            {/* <span style={{ color: '#F34242', fontSize: 14 }}>
              为避免有人恶意输入100%覆盖率带节奏，暂时不开放编辑
            </span> */}
          </span>
        }
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {TuanduiZengyi_DATA.filter(
          (item) => item.层数选项数组?.length || item?.覆盖率支持手动录入
        ).map((item) => {
          const 当前增益选项 = (zengyixuanxiangData?.团队增益 || []).find(
            (a) => item?.增益名称 === a?.增益名称
          )
          return (
            <div
              className={`tuandui-zengyi-detail-item ${
                item.层数选项数组?.length && item?.覆盖率支持手动录入
                  ? 'tuandui-zengyi-detail-item-100'
                  : ''
              }`}
              key={item.增益名称}
            >
              <h1 className="tuandui-zengyi-detail-title">{item.增益名称}</h1>
              <div className="tuandui-zengyi-detail-content">
                {item?.层数选项数组?.length ? (
                  <div className={'tuandui-zengyi-content-item'}>
                    <span className="tuandui-zengyi-content-item-title">层数</span>
                    <Select
                      value={当前增益选项?.层数}
                      className="t-z-c-content"
                      placeholder="请选择"
                      defaultValue={item?.层数}
                      onChange={(e) => onChangeZengyi(null, item, e)}
                    >
                      {item?.层数选项数组?.map((a) => {
                        return (
                          <Select.Option key={a} value={a}>
                            {a}
                          </Select.Option>
                        )
                      })}
                    </Select>
                  </div>
                ) : null}
                {item?.覆盖率支持手动录入 ? (
                  <div className={'tuandui-zengyi-content-item'}>
                    <span className="tuandui-zengyi-content-item-title">覆盖率</span>
                    <InputNumber
                      // disabled={openEdit}
                      className="t-z-c-content"
                      placeholder="请输入覆盖率"
                      min={0}
                      value={当前增益选项?.覆盖率}
                      precision={2}
                      max={100}
                      addonAfter={'%'}
                      onChange={(e) => onChangeZengyi(null, item, item.层数, e)}
                      defaultValue={item?.覆盖率}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
      </Modal>
    </div>
  )
}

export default TuanduiZengyiXuanze
