import { ConfigProvider } from 'antd'
import 'antd/dist/antd.variable.min.css'
import Layout from '@/components/Layout'
import '@/style/base.css'

ConfigProvider.config({
  theme: {
    primaryColor: '#ff0000',
  },
})

export default function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  )
}
