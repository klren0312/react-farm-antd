import { useCurrentAccount } from '@mysten/dapp-kit'
import { Button, Flex, Table } from 'antd'
import { GetOwnerObjectsApi } from '../apis/owner.api'
import { useEffect, useState } from 'react'
import { PageInfo } from '../apis/types/common.type'
import { OwnerObject } from '../apis/types/owner.type'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const account = useCurrentAccount()
  const chain = account?.chains?.find((c) => c.startsWith('sui:'))?.replace(/^sui:/, '')
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>(undefined)
  const [ownerObjects, setOwnerObjects] = useState<OwnerObject[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const columns = [
    {
      title: 'object地址',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => <Link to={`https://suiscan.xyz/${chain}/object/${text}`}>{text}</Link>,
    },
  ]
  /**
   * 获取用户对象
   * @param direction 0: 上一页 1: 下一页
   */
  const getOwnerObjects = async (direction: number | null) => {
    if (!account?.address) return
    setTableLoading(true)
    let startCursor = pageInfo?.startCursor || null
    let endCursor = pageInfo?.endCursor || null
    switch (direction) {
      case 0:
        endCursor = null
        break
      case 1:
        startCursor = null
        break
      default:
        startCursor = null
        endCursor = null
        break
    }
    const result = await GetOwnerObjectsApi(account?.address, startCursor, endCursor)
    setPageInfo(result?.pageInfo)
    setOwnerObjects(result?.nodes as unknown as OwnerObject[])
    setTableLoading(false)
  }

  useEffect(() => {
    if (account?.address) {
      getOwnerObjects(null)
    }
  }, [account?.address])

  return (
    <div className="text-3xl font-bold underline">
      <Table scroll={{ y: 500 }} rowKey="address" dataSource={ownerObjects} columns={columns} pagination={false} loading={tableLoading} />
      <Flex justify="center" gap="middle">
        <Button disabled={!pageInfo?.hasPreviousPage} type="link" onClick={() => getOwnerObjects(0)}>上一页</Button>
        <Button disabled={!pageInfo?.hasNextPage} type="link" onClick={() => getOwnerObjects(1)}>下一页</Button>
      </Flex>
    </div>
  )
}
