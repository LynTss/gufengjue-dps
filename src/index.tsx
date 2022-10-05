import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.variable.min.css'
import Layout from './components/Layout'
import './style/base.css'

ConfigProvider.config({
  theme: {
    primaryColor: '#ff0000',
  },
})

import App from './pages/index'

const root = ReactDOM.createRoot(document.getElementById('root') as any)
root.render(
  <ConfigProvider>
    <Layout>
      <App />
    </Layout>
  </ConfigProvider>
)
