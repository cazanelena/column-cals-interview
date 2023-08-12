import * as React from 'react';
import { useState } from 'react';

import { Column, EditableCell2, Table2 } from '@blueprintjs/table';
import { betterTableData } from './data/dummyData';
import { CalculateAggregateDialog } from './CalculateAggregateDialog';

const columns = [
  { columnName: 'Time', columnType: 'time', columnId: 'time' },
  { columnName: 'Cell Density', columnType: 'data', columnId: 'cell-density' },
  { columnName: 'Volume', columnType: 'data', columnId: 'volume' },
];

const OpviaTable: React.FC = () => {
  const [aggregates, setAggregates] = useState<string[]>([]);

  const cellRenderer = (rowIndex: number, columnIndex: number) => {
    const columnName = columns[columnIndex].columnId;
    const value = betterTableData[columnName][rowIndex];
    return <EditableCell2 value={String(value)} />;
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
    console.log(calculateAggegate(func, col));
    const result = calculateAggegate(func, col);
    const aggregateText = `The ${func} of ${col} is ${result}`;
    setAggregates([...aggregates, aggregateText]);
  };

  return (
    <div>
      <Table2 defaultRowHeight={30} numRows={8}>
        {cols}
      </Table2>
      <CalculateAggregateDialog onCalculate={onCalculate} />
      {aggregates.map((aggregateText) => (
        <div key={aggregateText}>{aggregateText}</div>
      ))}
    </div>
  );
};

export default OpviaTable;
