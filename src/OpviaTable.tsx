import * as React from 'react';
import { useState } from 'react';

import { Column, Cell, EditableCell2, Table2 } from '@blueprintjs/table';
import { betterTableData } from './data/dummyData';
import { CalculateAggregateDialog } from './CalculateAggregateDialog';
import { AddColumnDialog } from './AddColumnDialog';

type ColumnDefinition = {
  columnName: string | number;
  columnType: string;
  columnId: string;
};

const columns = [
  { columnName: 'Time', columnType: 'time', columnId: 'time' },
  { columnName: 'Cell Density', columnType: 'data', columnId: 'cell-density' },
  { columnName: 'Volume', columnType: 'data', columnId: 'volume' },
];

const OpviaTable: React.FC = () => {
  const [aggregateResults, setAggregateResults] = useState<
    Array<{ function: string; column: string; result: number }>
  >([]);
  const [extraColumns, setExtraColumns] = useState<Array<ColumnDefinition>>([]);

  const cellRenderer = (rowIndex: number, columnIndex: number) => {
    if (columnIndex >= columns.length + extraColumns.length) {
      return <EditableCell2 value={'N/A'} />;
    }

    const allColumns = [...columns, ...extraColumns];
    const columnName = allColumns[columnIndex]?.columnId;

    if (betterTableData[columnName]) {
      const value = betterTableData[columnName][rowIndex];
      return <EditableCell2 value={String(value)} />;
    }

    return <EditableCell2 value={'N/A'} />;
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

  const cols = [...columns, ...extraColumns].map((column) => (
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

  const addColumn = (columnName: string, funcDeclaration: string) => {
    const newColumn = {
      columnName: columnName,
      columnType: 'data',
      columnId: columnName,
    };
    setExtraColumns([...extraColumns, newColumn]);

    const operatorMatch = funcDeclaration.split(' ');

    if (operatorMatch.length === 3) {
      // Make sure we have three parts (operand, operator, operand)
      const operator = operatorMatch[1];
      console.log('Operator:', operator);
      console.log('First Input Data:', betterTableData[operatorMatch[0]]);
      console.log('Second Input Data:', betterTableData[operatorMatch[2]]);
      betterTableData[newColumn.columnName] = compute(
        betterTableData[operatorMatch[0]],
        operator,
        betterTableData[operatorMatch[2]],
      );
    } else {
      console.log('Invalid Operator');
    }
  };

  const compute = (
    leftOperandData: number[],
    operator: string,
    rightOperandData: number[],
  ) => {
    if (!leftOperandData || !rightOperandData) {
      return []; // Invalid column data
    }

    const calculatedData = [];

    for (
      let i = 0;
      i < Math.min(leftOperandData.length, rightOperandData.length);
      i++
    ) {
      const leftValue = leftOperandData[i];
      const rightValue = rightOperandData[i];

      switch (operator) {
        case '+':
          calculatedData.push(leftValue + rightValue);
          break;
        case '-':
          calculatedData.push(leftValue - rightValue);
          break;
        case '*':
          calculatedData.push(leftValue * rightValue);
          break;
        case '/':
          calculatedData.push(leftValue / rightValue);
          break;
        default:
          calculatedData.push(NaN); // Invalid operator
          break;
      }
    }

    return calculatedData;
  };

  return (
    <div>
      <AddColumnDialog addColumn={addColumn} />
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
