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
      status: "success",
      email: "m@example.com",
    },
    {
      id: "S000004",
      amount: 103,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "S000005",
      amount: 104,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "S000006",
      amount: 105,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "S000007",
      amount: 106,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "S000008",
      amount: 107,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "S000009",
      amount: 108,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "S000010",
      amount: 109,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "S000011",
      amount: 110,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "S000012",
      amount: 111,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "S000013",
      amount: 112,
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