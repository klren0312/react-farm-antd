import { ConfigProvider } from 'antd';
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import HomePage from './pages/HomePage'
import Layout from './layout';

export function Main() {
  return (
    <Router>
      <ConfigProvider locale={zhCN}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </ConfigProvider>
    </Router>
  );
}
