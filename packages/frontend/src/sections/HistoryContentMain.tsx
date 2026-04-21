import { useEffect, useState } from "react"
import { columns, type Payment } from "./HistoryContentColumns"
import { DataTable } from "./HistoryContentTables"

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "S000001",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "S000002",
      amount: 101,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "S000003",
      amount: 102,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "S000004",
      amount: 103,
      status: "processing",
      email: "example@gmail.com",
    },
  ]
}

export default function HistoryContentMain() {
  const [data, setData] = useState<Payment[]>([])

  useEffect(() => {
    async function fetchData() {
      const result = await getData()
      setData(result)
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}