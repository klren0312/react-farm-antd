import { Layout as AntLayout } from 'antd'
import { Outlet } from 'react-router-dom'
import PageHeader from './Header'
const { Header, Footer, Content } = AntLayout

export default function Layout() {
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    minHeight: '100vh',
  }
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#fff',
  }
  
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    backgroundColor: '#efefef',
  }
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#000',
  }  
  return (
    <AntLayout style={layoutStyle}>
      <Header style={headerStyle}>
        <PageHeader />
      </Header>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
      <Footer style={footerStyle}>Template Powered by Farm</Footer>
    </AntLayout>
  )
}
