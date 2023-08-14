import { useState } from 'react';

import { Button, Dialog, Radio, RadioGroup } from '@blueprintjs/core';

import { betterTableData } from './data/dummyData';

type Props = {
  onCalculate: (func: string, column: string) => void;
};

export function CalculateAggregateDialog(props: Props) {
  const [isAggregateDialogOpen, setAggregateDialogOpen] =
    useState<boolean>(false);
  const [selectedFunction, setSelectedFunction] = useState<
    string | undefined
  >();
  const [selectedColumn, setSelectedColumn] = useState<string | undefined>();

  const columnOptions = Object.keys(betterTableData).filter(
    (columnName) => columnName !== 'time',
  );

  const onCalculate = () => {
    const func = selectedFunction;
    const column = selectedColumn;
    console.log(
      `selected func: ${selectedFunction}, selectecCol: ${selectedColumn}`,
    );
    // clean up state:
    setSelectedColumn(undefined);
    setSelectedFunction(undefined);
    setAggregateDialogOpen(false);

    props.onCalculate(func, column);
  };

  return (
    <>
      <Button
        onClick={() => {
          setAggregateDialogOpen(true);
        }}
      >
        Add aggregate
      </Button>
      <Dialog
        title="Column Aggregations Dialog"
        onClose={() => setAggregateDialogOpen(false)}
        isOpen={isAggregateDialogOpen}
      >
        <RadioGroup
          label="Function Choice"
          onChange={(e) => setSelectedFunction(e.currentTarget.value)}
          selectedValue={selectedFunction}
        >
          <Radio label="Sum" value="sum" />
          <Radio label="Average" value="average" />
          <Radio label="Max" value="max" />
          <Radio label="Min" value="min" />
        </RadioGroup>
        <RadioGroup
          label="Column Choice"
          onChange={(e) => setSelectedColumn(e.currentTarget.value)}
          selectedValue={selectedColumn}
        >
          {columnOptions.map((columnName) => (
            <Radio key={columnName} label={columnName} value={columnName} />
          ))}
        </RadioGroup>
        <Button onClick={onCalculate}>Calculate</Button>
      </Dialog>
    </>
  );
}
