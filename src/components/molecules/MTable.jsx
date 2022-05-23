export const MTable = ({
  data,
  isShowHeader = true,
  isLoading = false,
  columns,
  onRowClick,
  className,
}) => {
  const handleRowClick = (row) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <div className="max-h-[48rem] overflow-y-auto">
      <table className={`w-full table-auto  ${className}`}>
        {isShowHeader && (
          <thead>
            <tr className="uppercase text-sm leading-normal">
              {columns.map((column) => (
                <th key={column.key} className="py-3 px-6 text-left">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
        )}
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan={columns.length} className="text-center">
                Cargando...
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="text-sm font-light">
            {data.map((row, index) => (
              <tr
                key={row.id ?? index}
                onClick={handleRowClick}
                className="text-black font-medium hover:bg-gray-100">
                {columns.map((column) => (
                  <td key={column.key} className="py-3 px-6">
                    <div className="flex items-center">{row[column.key]}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
