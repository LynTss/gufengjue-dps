import React from 'react'
import './index.css'

interface LayoutProps {
  children: any
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  return <div className="layout">{children}</div>
}

export default Layout
