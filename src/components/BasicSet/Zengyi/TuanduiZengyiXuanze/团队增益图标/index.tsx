import { TuanduiZengySelectedDataDTO, TuanduiZengyiBasicDataDTO } from '@/@types/zengyi'
import { Popover } from 'antd'
import React, { useMemo } from 'react'
import './index.css'

interface 团队增益图标类型 {
  data: TuanduiZengyiBasicDataDTO
  当前数据: TuanduiZengySelectedDataDTO | undefined
  disabled?: boolean
}

function 团队增益图标(props: 团队增益图标类型) {
  const { data, 当前数据, disabled, ...rest } = props
  const 增益描述 = useMemo(() => {
    return data?.增益描述
      ?.replaceAll('【', `<span class="tuandui-zengyi-tag">`)
      .replaceAll('】', '</span>')
  }, [data?.增益描述])

  return (
    <Popover
      title={data?.增益名称}
      content={
        <div className={'tuandui-zengyi-img-content'}>
          <h1 className={'tuandui-zengyi-img-title'}>增益描述</h1>
          <div
            className={'tuandui-zengyi-img-text'}
            dangerouslySetInnerHTML={{ __html: 增益描述 || '' }}
          />
          <h1 className={'tuandui-zengyi-img-title'}>增益来源</h1>
          <p className={'tuandui-zengyi-img-text'}>{data?.增益来源}</p>
          {当前数据?.覆盖率 && 当前数据?.覆盖率 !== 100 ? (
            <>
              <h1 className={'tuandui-zengyi-img-title'}>覆盖率</h1>
              <p className={'tuandui-zengyi-img-text'}>{当前数据?.覆盖率}%</p>
            </>
          ) : null}
          {当前数据?.层数 && 当前数据?.层数 > 1 ? (
            <>
              <h1 className={'tuandui-zengyi-img-title'}>层数</h1>
              <p className={'tuandui-zengyi-img-text'}>{当前数据?.层数}层</p>
            </>
          ) : null}
        </div>
      }
    >
      <div className={'tuandui-zengyi-item-wrap'} {...rest}>
        <img
          className={`tuandui-zengyi-img ${disabled ? 'tuandui-zengyi-img-disabled' : ''}`}
          src={data?.增益图片}
        />
        {当前数据?.层数 && 当前数据?.层数 > 1 ? (
          <span className='tuandui-zengyi-img-count'>{当前数据?.层数}</span>
        ) : null}
      </div>
    </Popover>
  )
}

export default 团队增益图标
