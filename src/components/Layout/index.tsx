import React from 'react'
import ImgBg from '../../assets/main-2.jpg'
import './index.css'

interface LayoutProps {
  children: any
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  return (
    <div className="layout">
      <div className="layout-wrapper">{children}</div>
      <img className="layout-bg" src={ImgBg} alt="" />
    </div>
  )
}

export default Layout
