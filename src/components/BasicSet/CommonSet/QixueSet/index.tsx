import 奇穴数据, { QixueNameMap } from '@/data/qixue'
import { Button, Drawer, Form, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { DEFAULT_QIXUE_VALUE } from '@/pages/constant'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setQixueData } from '@/store/basicReducer'
import './index.css'

interface QixueSetProps {
  getDpsFunction?: () => void
  className?: string
}

const QixueSet: React.FC<QixueSetProps> = (props) => {
  const { getDpsFunction, ...rest } = props

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [form] = Form.useForm()

  const dispatch = useAppDispatch()
  const qixueData = useAppSelector((state) => state?.basic?.qixueData)

  const handleChangeQixue = () => {
    setTimeout(() => {
      form?.validateFields().then((values) => {
        const newArray = Object.keys(values).map((key) => {
          return values[key]
        })
        localStorage.setItem('daozong_qixue_data', JSON.stringify(newArray))
        dispatch(setQixueData(newArray))
      })
      getDpsFunction && getDpsFunction()
    }, 0)
  }

  // 监听表单变化
  useEffect(() => {
    const obj = {}
    qixueData.map((item, index) => {
      obj[index] = item || DEFAULT_QIXUE_VALUE[index]
    })
    form?.setFieldsValue({
      ...obj,
    })
  }, [qixueData])

  return (
    <>
      <Button className="qixue-set-button" onClick={() => setDrawerOpen(true)} {...rest}>
        奇穴设置
      </Button>
      <Drawer
        title={'奇穴设置'}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        placement="bottom"
        height={200}
        mask={false}
        className={'qixue-set-drawer'}
      >
        <Form form={form} className={'qixue-set-drawer-wrap'}>
          {奇穴数据.map((重, index) => {
            return (
              <Form.Item className={'qixue-set-item'} name={index} key={QixueNameMap[index + 1]}>
                <Select
                  className={'qixue-set-item-select'}
                  disabled={重?.是否不可编辑}
                  onChange={handleChangeQixue}
                  dropdownMatchSelectWidth={false}
                  optionLabelProp="label"
                  showArrow={false}
                  popupClassName={'qixue-set-item-select-popup'}
                  defaultValue={DEFAULT_QIXUE_VALUE[index]}
                >
                  {重?.奇穴列表.map((奇穴) => {
                    return (
                      <Select.Option
                        value={奇穴?.奇穴名称}
                        key={奇穴?.奇穴名称}
                        disabled={奇穴?.是否不可编辑}
                        className={'qixue-set-item-select-option'}
                        label={
                          <div className={'qixue-label'}>
                            <img className={'qixue-label-img'} src={奇穴?.奇穴图片} />
                            <span className={'qixue-label-text'}>{奇穴?.奇穴名称}</span>
                          </div>
                        }
                      >
                        <img className={'qixue-set-item-select-img'} src={奇穴?.奇穴图片} />
                        <span className={'qixue-set-item-select-text'}>{奇穴?.奇穴名称}</span>
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            )
          })}
        </Form>
      </Drawer>
    </>
  )
}

export default QixueSet
