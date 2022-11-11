import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.variable.min.css'
import antdZhCN from 'antd/lib/locale-provider/zh_CN'
import '@/utils/axios'
import Layout from './components/Layout'
import './style/base.css'

ConfigProvider.config({
  theme: {
    // primaryColor: '#344160',
    primaryColor: '#365E9F',
  },
})

import App from './pages/index'
import { Provider } from 'react-redux'
import store from '@/store/index'

const root = ReactDOM.createRoot(document.getElementById('root') as any)
root.render(
  <Provider store={store}>
    <ConfigProvider locale={antdZhCN}>
      <Layout>
        <App />
      </Layout>
    </ConfigProvider>
  </Provider>
)
