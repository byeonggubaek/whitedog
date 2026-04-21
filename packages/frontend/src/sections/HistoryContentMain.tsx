import { useEffect, useState } from "react"
import { columns, type Payment } from "./HistoryContentColumns"
import { DataTable } from "./HistoryContentTables"

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 101,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "728ed52f",
      amount: 102,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 103,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "728ed52f",
      amount: 104,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 105,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "728ed52f",
      amount: 106,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 107,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "728ed52f",
      amount: 108,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 109,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "728ed52f",
      amount: 110,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 111,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "728ed52f",
      amount: 112,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 113,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "728ed52f",
      amount: 114,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 115,
      status: "processing",
      email: "example@gmail.com",
    },
  ]
}

export default function HistoryContentMain() {
  const [data, setData] = useState<Payment[]>([])

  useEffect(() => {
    const fetchData = async () => {
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