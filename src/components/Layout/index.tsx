import React from 'react'

interface LayoutProps {
  children: any
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  return <div>{children}</div>
}

export default Layout
