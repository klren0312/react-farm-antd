import { ConnectButton } from '@mysten/dapp-kit'

export default function Header() {
  return <div className="h-full flex justify-between items-center">
    <div className="flex items-center">
      TEMPLATE
    </div>
    <ConnectButton />
  </div>
}
