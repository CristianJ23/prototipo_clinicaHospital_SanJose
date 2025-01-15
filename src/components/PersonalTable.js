import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import "../css/personalTable.css"

function PersonalTable({ data, columns }) {
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    return (
        <div>
            <input
                type='text'
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                placeholder='ingrese nombre para filtro'
            />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {!header.isPlaceHolder ? (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header, // Correct header rendering
                                                header.getContext()
                                            )}
                                            {header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? " ↑" : " ↓") : null}
                                        </div>
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((footer) => (
                                <th key={footer.id}>
                                    {flexRender(footer.column.columnDef.footer, footer)}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>

            <button onClick={() => table.setPageIndex(0)}>
                First Page
            </button>
            <button onClick={() => table.previousPage()}>
                Previous Page
            </button>
            <button onClick={() => table.nextPage()}>
                Next Page
            </button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                Last Page
            </button>
        </div>
    );
}

export default PersonalTable;
