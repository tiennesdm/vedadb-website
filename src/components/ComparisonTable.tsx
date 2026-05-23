import { Check, X, Minus } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  vedadb: boolean | string;
  [key: string]: boolean | string;
}

interface ComparisonTableProps {
  headers: string[];
  rows: ComparisonRow[];
  className?: string;
}

function ComparisonTable({ headers, rows, className = '' }: ComparisonTableProps) {
  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={20} className="text-veda-green mx-auto" />
      ) : (
        <X size={20} className="text-veda-red mx-auto" />
      );
    }
    if (value === 'partial') {
      return <Minus size={20} className="text-veda-gray mx-auto" />;
    }
    return <span className="text-veda-off-white text-sm">{value}</span>;
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-veda-border-subtle">
            {headers.map((header, i) => (
              <th
                key={header}
                className={`py-4 px-4 text-left text-sm font-semibold uppercase tracking-wider sticky top-0 bg-veda-bg z-10 ${
                  i === 1
                    ? 'text-veda-amber'
                    : 'text-veda-gray'
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="border-b border-veda-border-subtle/50 hover:bg-veda-card/30 transition-colors"
            >
              <td className="py-4 px-4 text-sm text-veda-off-white font-medium">
                {row.feature}
              </td>
              {headers.slice(1).map((header, colIdx) => {
                const key = header.toLowerCase().replace(/\s+/g, '');
                const value = colIdx === 0 ? row.vedadb : row[key] ?? false;
                return (
                  <td
                    key={header}
                    className={`py-4 px-4 text-center ${
                      colIdx === 0 ? 'bg-veda-amber/5' : ''
                    }`}
                  >
                    {renderCell(value as boolean | string)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { ComparisonTable };
export type { ComparisonRow };
