import React from 'react'
// import ImgBg from '../../assets/main.jpg'
import ImgBg_1 from '../../assets/bg/1.jpg'
import ImgBg_2 from '../../assets/bg/2.jpg'
import ImgBg_3 from '../../assets/bg/3.jpg'
import './index.css'

interface LayoutProps {
  children: any
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  const random = Math.random()
  const mapKey = random < 0.34 ? 1 : random < 0.67 ? 2 : 3

  const imgMap = {
    1: ImgBg_1,
    2: ImgBg_2,
    3: ImgBg_3,
  }

  return (
    <div className="layout">
      <div className="layout-wrapper">{children}</div>
      <img className="layout-bg" src={imgMap[mapKey]} alt="" />
    </div>
  )
}

export default Layout
