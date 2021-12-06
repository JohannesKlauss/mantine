import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStyles, MantineProvider } from '@mantine/styles';
import { generateBorderStyles } from '@mantine/ds/src';
import { paragraph } from '@mantine/mockdata';
import { Pagination, PaginationProps } from '../Pagination';
import { Pagination as PaginationStylesApi } from '../styles.api';

const styles = generateBorderStyles(PaginationStylesApi);
const useStyles = createStyles(() => styles);

function Wrapper(props: Partial<PaginationProps>) {
  return (
    <Pagination {...props} total={10} position="center" mt="xl">
      {paragraph}
    </Pagination>
  );
}

function WithClassNames() {
  return <Wrapper classNames={useStyles().classes} />;
}

storiesOf('@mantine/core/Pagination/styles-api', module)
  .add('With sx', () => <Wrapper sx={{ border: '1px solid red', backgroundColor: 'blue' }} />)
  .add('With styles as object', () => <Wrapper styles={styles} />)
  .add('With styles as function', () => <Wrapper styles={() => styles} />)
  .add('With styles as classNames', () => <WithClassNames />)
  .add('Styles API on MantineProvider', () => (
    <MantineProvider styles={{ Pagination: () => styles }}>
      <Wrapper />
    </MantineProvider>
  ));
