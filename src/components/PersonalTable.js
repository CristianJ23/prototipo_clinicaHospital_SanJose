import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel
} from '@tanstack/react-table';
import { useState } from 'react';
import { format } from 'date-fns';
import "../css/personalTable.css";

function PersonalTable({ data, columns }) {
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const validData = Array.isArray(data) ? data : [];
    
    const formattedData = validData
        .map(row => ({
            ...row,
            fecha_creacion: row.fecha_creacion
                ? format(new Date(row.fecha_creacion), "dd/MM/yyyy")
                : "Fecha inválida",
            raw_fecha_creacion: row.fecha_creacion ? new Date(row.fecha_creacion) : null
        }))
        .sort((a, b) => (b.raw_fecha_creacion - a.raw_fecha_creacion)); // Ordena de más reciente a más antigua

    const filteredData = formattedData.filter(row => {
        return Object.values(row).some(value =>
            String(value).toLowerCase().includes(filtering.toLowerCase())
        );
    });

    const pageData = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    const table = useReactTable({
        data: pageData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
            pagination: { pageIndex, pageSize },
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: ({ pageIndex, pageSize }) => {
            setPageIndex(pageIndex);
            setPageSize(pageSize);
        },
        manualPagination: true,
        pageCount: Math.ceil(filteredData.length / pageSize),
    });

    return (
        <div className="personal_table_container">
            <input
                className="filter_input"
                type='text'
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                placeholder='Ingrese nombre para filtro'
            />
            <table className="personal_table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="header_cell"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {!header.isPlaceHolder ? (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() === 'asc' ? " ↑" : " ↓"
                                            ) : null}
                                        </div>
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="table_row">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="table_cell">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length}>No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination_controls">
                <button
                    className="pagination_button"
                    onClick={() => setPageIndex(0)}
                    disabled={pageIndex === 0}
                >
                    First Page
                </button>
                <button
                    className="pagination_button"
                    onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))}
                    disabled={pageIndex === 0}
                >
                    Previous Page
                </button>
                <button
                    className="pagination_button"
                    onClick={() => setPageIndex(prev => Math.min(prev + 1, table.getPageCount() - 1))}
                    disabled={pageIndex >= table.getPageCount() - 1}
                >
                    Next Page
                </button>
                <button
                    className="pagination_button"
                    onClick={() => setPageIndex(table.getPageCount() - 1)}
                    disabled={pageIndex >= table.getPageCount() - 1}
                >
                    Last Page
                </button>
            </div>

            <div className="page_size_selector">
                <label htmlFor="pageSize">Filas por página:</label>
                <select
                    className="page_size_select"
                    id="pageSize"
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPageIndex(0);
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <div className="pagination_info">
                <span>
                    Página {filteredData.length > 0 ? pageIndex + 1 : 0} de {filteredData.length > 0 ? table.getPageCount() : 0}
                </span>
            </div>
        </div>
    );
}

export default PersonalTable;
