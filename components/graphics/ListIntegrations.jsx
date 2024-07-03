import { List } from "lucide-react"
import { FaList } from "react-icons/fa"
import TableIntegrations from "./TableIntegrations"

export default function ListIntegrations() {
  return (
    <div className=" shadow-sm bg-background rounded-lg p-5 flex-1 ">
      <div className="flex gap-x-2 items-center">
        <div className="flex items-center justify-center bg-slate-200 w-8 h-8 rounded-lg">
          <FaList  className="text-slate-500" />
        </div>
        <p className="text-xl">List of integrations</p>
      </div>
      <TableIntegrations />
    </div>
  )
}

