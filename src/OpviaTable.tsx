import * as React from 'react';
import { useState } from 'react';

import { Column, Cell, EditableCell2, Table2 } from '@blueprintjs/table';
import { betterTableData } from './data/dummyData';
import { CalculateAggregateDialog } from './CalculateAggregateDialog';

const columns = [
  { columnName: 'Time', columnType: 'time', columnId: 'time' },
  { columnName: 'Cell Density', columnType: 'data', columnId: 'cell-density' },
  { columnName: 'Volume', columnType: 'data', columnId: 'volume' },
];

const OpviaTable: React.FC = () => {
  // const [aggregates, setAggregates] = useState<string[]>([]);
  const [aggregateResults, setAggregateResults] = useState<
    Array<{ function: string; column: string; result: number }>
  >([]);

  const cellRenderer = (rowIndex: number, columnIndex: number) => {
    const columnName = columns[columnIndex].columnId;
    const value = betterTableData[columnName][rowIndex];
    return <EditableCell2 value={String(value)} />;
  };

  const resultCellRenderer = (rowIndex: number, columnIndex: number) => {
    if (columnIndex === 0) {
      const formattedValue = `${aggregateResults[rowIndex].function}/${aggregateResults[rowIndex].column}`;
      return <Cell>{formattedValue}</Cell>;
    } else if (columnIndex === 1) {
      return <Cell>{aggregateResults[rowIndex].result}</Cell>;
    }
    return <Cell>-</Cell>;
  };

  const cols = columns.map((column) => (
    <Column
      key={`${column.columnId}`}
      cellRenderer={cellRenderer}
      name={column.columnName}
    />
  ));

  const calculateAggegate = (func: string, columnName: string) => {
    const data = betterTableData[columnName] as number[];
    switch (func) {
      case 'sum':
        return data.reduce((curr: number, acc) => curr + acc, 0);
      case 'max':
        return Math.max(...data);
      case 'min':
        return Math.min(...data);
      case 'average':
        return data.reduce((curr: number, acc) => curr + acc, 0) / data.length;
    }
  };

  const onCalculate = (func: string, col: string) => {
    const result = calculateAggegate(func, col) || 0; // Use 0 as a default value if the result is undefined
    const newResult = { function: func, column: col, result: result };

    setAggregateResults([...aggregateResults, newResult]);
  };

  return (
    <div>
      <Table2 defaultRowHeight={30} numRows={8}>
        {cols}
      </Table2>
      <CalculateAggregateDialog onCalculate={onCalculate} />

      <Table2 numRows={aggregateResults.length}>
        <Column name="Function/Column" cellRenderer={resultCellRenderer} />
        <Column name="Result" cellRenderer={resultCellRenderer} />
      </Table2>
    </div>
  );
};

export default OpviaTable;
