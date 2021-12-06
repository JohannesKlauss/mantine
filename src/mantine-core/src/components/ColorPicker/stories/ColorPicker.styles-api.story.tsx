import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStyles, MantineProvider } from '@mantine/styles';
import { generateBorderStyles } from '@mantine/ds/src';
import { ColorPicker, ColorPickerProps } from '../ColorPicker';
import { ColorPicker as ColorPickerStylesApi } from '../styles.api';

const styles = generateBorderStyles(ColorPickerStylesApi);
const useStyles = createStyles(() => styles);

function Wrapper(props: Partial<ColorPickerProps>) {
  return (
    <ColorPicker {...props} style={{ maxWidth: 500 }} mx="auto" mt="xl">
      React.createElement
    </ColorPicker>
  );
}

function WithClassNames() {
  return <Wrapper classNames={useStyles().classes} />;
}

storiesOf('@mantine/core/ColorPicker/styles-api', module)
  .add('With sx', () => <Wrapper sx={{ border: '1px solid red', backgroundColor: 'blue' }} />)
  .add('With styles as object', () => <Wrapper styles={styles} />)
  .add('With styles as function', () => <Wrapper styles={() => styles} />)
  .add('With styles as classNames', () => <WithClassNames />)
  .add('Styles API on MantineProvider', () => (
    <MantineProvider styles={{ ColorPicker: () => styles }}>
      <Wrapper />
    </MantineProvider>
  ));
