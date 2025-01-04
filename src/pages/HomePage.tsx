import { Button, message } from 'antd'
import useAppStore from '../stores/app'

export default function HomePage() {
  const [messageApi, contextHolder] = message.useMessage()
  const { num, increase } = useAppStore()
  return (
    <div className="text-3xl font-bold underline">
      <Button type="primary" onClick={() => {
        increase()
        messageApi.success('test success!')
      }}>
        <span>按钮 {num}</span>
      </Button>
      {contextHolder}
    </div>
  )
}
