import { ITableProps } from "../module/ITable";

function AdminTable<T extends { id: number | string }>({
  columns,
  data,
  actions = [],
}: ITableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white">
      <table className="min-w-full table-auto text-sm text-left text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.label} className="p-3">
                {col.label}
              </th>
            ))}
            {actions.length > 0 && <th className="p-3">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.accessor)} className="p-3">
                  {String(row[col.accessor])}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="p-3 space-x-2">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => action.onClick(row)}
                      className={`px-2 py-1 rounded ${action.className || ""}`}
                    >
                      {action.getLabel ? action.getLabel(row) : action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
