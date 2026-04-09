import WdogInputDateTermState from "@/components/WdogInputDateTermState"
import { addDays, format } from "date-fns"
import { useCallback, useState } from "react"
import type { DateRange } from 'react-day-picker'
import type { ColumnDef, SortingState, ColumnFiltersState } from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export default function HistoryContentMain() {
  // 상태들
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "status",
      header: "상태",
      filterFn: "includesString", // 필터링 지원
      cell: ({ row }) => {
        const status = row.getValue("status") as Payment['status']
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${
            status === "success" ? "bg-green-100 text-green-800" 
            : status === "pending" ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
          }`}>
            {status}
          </span>
        )
      }
    },
    {
      accessorKey: "email",
      header: "이메일",
      cell: ({ row }) => row.getValue("email"),
    },
    {
      accessorKey: "amount", 
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          금액
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">
          {formatCurrency(row.getValue("amount") as number)}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },    
  ]

  const data: Payment[] = [
    { id: "728ed52f", amount: 100000, status: "pending", email: "user1@example.com" },
    { id: "489e1d42", amount: 125000, status: "success", email: "user2@test.com" },
    { id: "a1b2c3d4", amount: 85000, status: "failed", email: "member3@gmail.com" },
    { id: "e5f6g7h8", amount: 200000, status: "processing", email: "client4@naver.com" },
    { id: "i9j0k1l2", amount: 75000, status: "success", email: "admin5@homefit.com" },
    { id: "m3n4o5p6", amount: 150000, status: "pending", email: "guest6@yahoo.com" },
    { id: "q7r8s9t0", amount: 300000, status: "success", email: "user1@example.com" },
    { id: "u1v2w3x4", amount: 95000, status: "failed", email: "user2@test.com" },
    { id: "y5z6a7b8", amount: 175000, status: "processing", email: "member3@gmail.com" },
    { id: "c9d0e1f2", amount: 225000, status: "success", email: "client4@naver.com" },
    { id: "g3h4i5j6", amount: 65000, status: "pending", email: "admin5@homefit.com" },
    { id: "k7l8m9n0", amount: 400000, status: "success", email: "guest6@yahoo.com" },
    { id: "o1p2q3r4", amount: 120000, status: "failed", email: "user1@example.com" },
    { id: "s5t6u7v8", amount: 280000, status: "processing", email: "user2@test.com" },
    { id: "w9x0y1z2", amount: 90000, status: "success", email: "member3@gmail.com" },
    { id: "a3b4c5d6", amount: 350000, status: "pending", email: "client4@naver.com" },
    { id: "e7f8g9h0", amount: 145000, status: "success", email: "admin5@homefit.com" },
    { id: "i1j2k3l4", amount: 80000, status: "failed", email: "guest6@yahoo.com" },
    { id: "m5n6o7p8", amount: 260000, status: "processing", email: "user1@example.com" },
    { id: "q9r0s1t2", amount: 180000, status: "success", email: "user2@test.com" },
  ]
  // 날짜 상태
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -7),
    to: new Date(),
  })
  const [dateDescription, setDateDescription] = useState<string>("")

  const handleDateChange = useCallback((dateRange: DateRange) => {
    setDateRange(dateRange)
    if (dateRange.from && dateRange.to) {
      setDateDescription(`${format(dateRange.from, 'yyyy-MM-dd')} ~ ${format(dateRange.to, 'yyyy-MM-dd')}`)
    }
  }, [])

  // 👇 완전한 useReactTable (페이지 + 정렬 + 필터)
  const table = useReactTable({
  data,
  columns,
  state: {
    sorting,
    columnFilters,
    globalFilter,
    // 👇 pagination 상태 제거 - 자동 관리
  },
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  onGlobalFilterChange: setGlobalFilter,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(), // 👈 이거만으로 충분!
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  // 👇 자동 페이지네이션 활성화
  manualPagination: false,
  // 👇 초기 상태만 설정
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
})
return (
    <>
      {/* 날짜 필터 */}
      <div className="flex gap-5 border p-1 rounded-lg bg-condition border-primary mb-4">
        <WdogInputDateTermState 
          title="결제기간" 
          from_dt={dateRange.from} 
          to_dt={dateRange.to} 
          onDateChange={handleDateChange}
        />
      </div>

      {/* 검색 */}
      <div className="flex items-center py-4">
        <div className="relative flex-1 md:w-[300px] lg:w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="이메일이나 상태 검색..."
            value={globalFilter ?? ""} 
            onChange={(event) => setGlobalFilter(String(event.target.value))}
            className="pl-10"
          />
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                    }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 (하단만) */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-b-md">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} 행 중{' '}
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          행 표시
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            이전
          </Button>
          <span>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            다음
          </Button>
        </div>
      </div>
    </>
);
}