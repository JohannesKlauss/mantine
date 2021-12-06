import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStyles, MantineProvider } from '@mantine/styles';
import { generateBorderStyles } from '@mantine/ds/src';
import { SegmentedControl, SegmentedControlProps } from '../SegmentedControl';
import { SegmentedControl as SegmentedControlStylesApi } from '../styles.api';

const styles = generateBorderStyles(SegmentedControlStylesApi);
const useStyles = createStyles(() => styles);

function Wrapper(props: Partial<SegmentedControlProps<string>>) {
  return <SegmentedControl data={['React', 'Angular', 'Vue']} {...props} />;
}

function WithClassNames() {
  return <Wrapper classNames={useStyles().classes} />;
}

storiesOf('@mantine/core/SegmentedControl/styles-api', module)
  .add('With sx', () => (
    <Wrapper sx={{ border: '1px solid red', maxWidth: 400 }} mx="auto" mt="xl" />
  ))
  .add('With styles as object', () => <Wrapper styles={styles} />)
  .add('With styles as function', () => <Wrapper styles={() => styles} />)
  .add('With styles as classNames', () => <WithClassNames />)
  .add('Styles API on MantineProvider', () => (
    <MantineProvider styles={{ SegmentedControl: () => styles }}>
      <Wrapper />
    </MantineProvider>
  ));
