import React from 'react';
import './Table.css';

export interface TableColumn<Row> {
  key: string;
  header: React.ReactNode;
  /** Defaults to reading `row[key]`. */
  render?: (row: Row) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

export interface TableProps<Row> {
  columns: TableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  dense?: boolean;
  onRowClick?: (row: Row) => void;
  /** Shown when there are no rows. */
  empty?: React.ReactNode;
  className?: string;
}

export function Table<Row>({
  columns,
  rows,
  rowKey,
  dense = false,
  onRowClick,
  empty,
  className = '',
}: TableProps<Row>) {
  return (
    <div className={`table-wrapper ${className}`}>
      <table className={`table ${dense ? 'table--dense' : ''}`}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{ textAlign: col.align ?? 'left', width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td className="table__empty" colSpan={columns.length}>
                {empty ?? 'Không có dữ liệu'}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className={onRowClick ? 'table__row--clickable' : ''}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((col) => (
                <td key={col.key} style={{ textAlign: col.align ?? 'left' }}>
                  {col.render
                    ? col.render(row)
                    : (row as Record<string, React.ReactNode>)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
