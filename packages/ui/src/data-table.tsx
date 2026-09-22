"use client";
import { useState, type ReactNode } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table.js";
import { Input } from "./input.js";
import { Button } from "./button.js";
import { Checkbox } from "./checkbox.js";
import { Icon } from "./icons.js";
export type { ColumnDef } from "@tanstack/react-table";
export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  label: string;
  pageSize?: number;
  searchable?: boolean;
  selectable?: boolean;
  getRowId?: (row: T) => string;
  onSelectionChange?: (rows: T[]) => void;
  empty?: ReactNode;
};
export function DataTable<T>({
  data,
  columns,
  label,
  pageSize = 5,
  searchable = true,
  selectable = false,
  getRowId,
  onSelectionChange,
  empty = "표시할 데이터가 없습니다.",
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState("");
  const [selection, setSelection] = useState<RowSelectionState>({});
  const [visibility, setVisibility] = useState<VisibilityState>({});
  const [columnsOpen, setColumnsOpen] = useState(false);
  // TanStack's instance is intentionally mutable; it should not be React-Compiler memoized.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    sortDescFirst: false,
    getRowId,
    state: {
      sorting,
      globalFilter: filter,
      rowSelection: selection,
      columnVisibility: visibility,
    },
    initialState: { pagination: { pageIndex: 0, pageSize } },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    onColumnVisibilityChange: setVisibility,
    onRowSelectionChange: (updater) => {
      const next = typeof updater === "function" ? updater(selection) : updater;
      setSelection(next);
      onSelectionChange?.(
        table
          .getCoreRowModel()
          .rows.filter((row) => next[row.id])
          .map((row) => row.original),
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="n-data-table">
      <div className="n-table-toolbar">
        {searchable && (
          <Input
            aria-label={`${label} 검색`}
            placeholder="검색…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        )}
        <details
          className="n-column-picker"
          onToggle={(event) => setColumnsOpen(event.currentTarget.open)}
        >
          <summary>
            <Icon name="chevron-down" /> 열 표시
          </summary>
          {columnsOpen &&
            table
              .getAllLeafColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <label key={col.id}>
                  <Checkbox
                    checked={col.getIsVisible()}
                    onCheckedChange={(checked) =>
                      col.toggleVisibility(checked === true)
                    }
                  />
                  {typeof col.columnDef.header === "string"
                    ? col.columnDef.header
                    : col.id}
                </label>
              ))}
        </details>
      </div>
      <div className="n-table-scroll">
        <Table aria-label={label}>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {selectable && (
                  <TableHead>
                    <Checkbox
                      aria-label="현재 페이지 전체 선택"
                      checked={
                        table.getIsAllPageRowsSelected()
                          ? true
                          : table.getIsSomePageRowsSelected()
                            ? "indeterminate"
                            : false
                      }
                      onCheckedChange={(checked) =>
                        table.toggleAllPageRowsSelected(checked === true)
                      }
                    />
                  </TableHead>
                )}
                {group.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    aria-sort={
                      header.column.getIsSorted() === "asc"
                        ? "ascending"
                        : header.column.getIsSorted() === "desc"
                          ? "descending"
                          : undefined
                    }
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        className="n-sort-button"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <Icon
                          name={
                            header.column.getIsSorted() === "asc"
                              ? "arrow-up"
                              : header.column.getIsSorted() === "desc"
                                ? "arrow-down"
                                : "arrow-up-down"
                          }
                        />
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-selected={row.getIsSelected()}>
                  {selectable && (
                    <TableCell>
                      <Checkbox
                        aria-label={`${row.index + 1}행 선택`}
                        checked={row.getIsSelected()}
                        onCheckedChange={(checked) =>
                          row.toggleSelected(checked === true)
                        }
                      />
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0)}>
                  {empty}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="n-table-footer-controls">
        <span aria-live="polite">
          {table.getFilteredRowModel().rows.length}개 결과 ·{" "}
          {table.getState().pagination.pageIndex + 1} /{" "}
          {Math.max(1, table.getPageCount())} 페이지
        </span>
        <div className="n-inline">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            이전
          </Button>
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
    </div>
  );
}
