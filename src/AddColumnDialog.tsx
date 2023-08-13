import * as React from 'react';
import { useState } from 'react';

import { Button, Dialog, Label, InputGroup } from '@blueprintjs/core';

type Props = {
  addColumn: (columnName: string, func: string) => void;
};

export function AddColumnDialog(props: Props) {
  const [isColumnOpen, setIsColumnOpen] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>();
  const [funcDeclaration, setFuncDeclaration] = useState<string>();

  const addColumn = () => {
    // Clean up dialog
    setColumnName(undefined);
    setFuncDeclaration(undefined);
    setIsColumnOpen(false);
    props.addColumn(columnName, funcDeclaration);
  };
  return (
    <>
      <Button
        onClick={() => {
          setIsColumnOpen(true);
        }}
      >
        Add Column
      </Button>
      <Dialog
        title="Adding Column Dialog"
        onClose={() => setIsColumnOpen(false)}
        isOpen={isColumnOpen}
      >
        <Label>
          Name Column
          <InputGroup
            placeholder="Name of the new column"
            onChange={(e) => {
              setColumnName(e.currentTarget.value);
            }}
          ></InputGroup>
        </Label>

        <Label>
          Function Declaration
          <InputGroup
            placeholder="Write your function"
            onChange={(e) => {
              setFuncDeclaration(e.currentTarget.value);
            }}
          ></InputGroup>
        </Label>
        <Button onClick={addColumn}>Add Column</Button>
      </Dialog>
    </>
  );
}
