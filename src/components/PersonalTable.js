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
    const [pageIndex, setPageIndex] = useState(0); // Inicializamos pageIndex con 0
    const [pageSize, setPageSize] = useState(5);  // Inicializamos pageSize con 5

    // Validar que los datos sean un arreglo
    const validData = Array.isArray(data) ? data : [];
    
    // Validar y formatear los datos
    const formattedData = validData.map(row => ({
        ...row,
        fecha_creacion: row.fecha_creacion
            ? format(new Date(row.fecha_creacion), "dd/MM/yyyy")
            : "Fecha inválida",
    }));

    // Filtrar los datos según la búsqueda global
    const filteredData = formattedData.filter(row => {
        return Object.values(row).some(value =>
            String(value).toLowerCase().includes(filtering.toLowerCase())
        );
    });

    // Slicing the data to match the page size
    const pageData = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    // Inicializar la tabla
    const table = useReactTable({
        data: pageData, // Use the sliced data for the current page
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
            setPageSize(pageSize); // Asegúrate de actualizar ambos valores
        },
        manualPagination: true,  // Indicamos que la paginación se maneja manualmente
        pageCount: Math.ceil(filteredData.length / pageSize),  // Ajuste en el cálculo de total de páginas
    });

    // Mostrar datos para depuración
    console.log("Page Index:", pageIndex);
    console.log("Total Pages:", table.getPageCount());
    console.log("Rows for current page:", table.getRowModel().rows);

    return (
        <div>
            <input
                type='text'
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                placeholder='Ingrese nombre para filtro'
            />
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
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
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
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

            <div>
                <button
                    onClick={() => setPageIndex(0)}
                    disabled={pageIndex === 0}
                >
                    First Page
                </button>
                <button
                    onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))}
                    disabled={pageIndex === 0}
                >
                    Previous Page
                </button>
                <button
                    onClick={() => setPageIndex(prev => Math.min(prev + 1, table.getPageCount() - 1))}
                    disabled={pageIndex >= table.getPageCount() - 1}
                >
                    Next Page
                </button>
                <button
                    onClick={() => setPageIndex(table.getPageCount() - 1)}
                    disabled={pageIndex >= table.getPageCount() - 1}
                >
                    Last Page
                </button>
            </div>

            <div>
                <label htmlFor="pageSize">Filas por página:</label>
                <select
                    id="pageSize"
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPageIndex(0); // Reiniciar a la primera página al cambiar el tamaño de la página
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <div>
                <span>
                    Página {filteredData.length > 0 ? pageIndex + 1 : 0} de {filteredData.length > 0 ? table.getPageCount() : 0}
                </span>
            </div>
        </div>
    );
}

export default PersonalTable;
