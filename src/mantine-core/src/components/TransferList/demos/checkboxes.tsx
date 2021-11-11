import React from 'react';
import { TransferList } from '../TransferList';

const code = `
import React from 'react';
import { TransferList } from '@mantine/core';

function Demo() {
  return (
    <TransferList
      available={['Item 1', 'Item 2', 'Item 3']}
      selected={['Item 01', 'Item 02', 'Item 03']}
      checkboxes
    />
  );
}
`;

function Demo() {
  return (
    <TransferList
      available={['Item 1', 'Item 2', 'Item 3']}
      selected={['Item 01', 'Item 02', 'Item 03']}
      checkboxes
    />
  );
}

export const checkboxes: MantineDemo = {
  type: 'demo',
  code,
  component: Demo,
};
