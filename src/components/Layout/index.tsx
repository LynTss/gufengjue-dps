import React from 'react'
// import ImgBg from '../../assets/main.jpg'
import ImgBg_1 from '../../assets/bg/1.jpg'
import ImgBg_2 from '../../assets/bg/2.jpg'
import ImgBg_3 from '../../assets/bg/3.jpg'
import ImgBg_4 from '../../assets/bg/4.jpeg'
import { useAppSelector } from '@/hooks'
import './index.css'

interface LayoutProps {
  children: any
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  const random = Math.random()
  const 关闭背景图 = useAppSelector((state) => state?.basic?.关闭背景图)

  const mapKey = random < 0.05 ? 4 : random < 0.34 ? 1 : random < 0.67 ? 2 : 3
  const imgMap = {
    1: ImgBg_1,
    2: ImgBg_2,
    3: ImgBg_3,
    4: ImgBg_4,
  }

  return (
    <div className='layout'>
      <div className='layout-wrapper'>{children}</div>
      {!关闭背景图 ? (
        <img className='layout-bg' src={imgMap[mapKey]} alt='' />
      ) : (
        <div className={'layout-bg-color'} />
      )}
    </div>
  )
}

export default Layout
