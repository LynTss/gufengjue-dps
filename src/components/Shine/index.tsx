import useShine from '@/hooks/use-shine'
import useSkew from '@/hooks/use-skew'
import React, { useRef } from 'react'
import classnames from 'classnames'
import './index.css'

export enum Size {
  L = 'L',
  S = 'S',
}
export enum Color {
  light = 'light',
  dark = 'dark',
}
export enum ShineSize {
  L = 'L',
  M = 'M',
  S = 'S',
}

function ShineBox(props) {
  const { children, className, shine = true, skew = true, ...rest } = props
  const divRef = useRef<any>()

  if (skew) {
    useSkew(divRef)
  }

  if (shine) {
    useShine(divRef)
  }

  const cls = classnames(shine ? 'shine' : '', className)

  const newStyle = { '--panel-color': 'rgb(54, 94, 159)', '--opacity': 0.08 } as any

  return (
    <div ref={divRef} className={cls} style={{ ...newStyle }} {...rest}>
      {children}
    </div>
  )
}

export default ShineBox

ShineBox.Size = Size
ShineBox.Color = Color
ShineBox.ShineSize = ShineSize
