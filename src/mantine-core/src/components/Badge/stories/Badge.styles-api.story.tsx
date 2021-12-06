import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStyles, MantineProvider } from '@mantine/styles';
import { generateBorderStyles } from '@mantine/ds/src';
import { Group } from '../../Group';
import { Badge, BadgeProps } from '../Badge';
import { Badge as BadgeStylesApi } from '../styles.api';

const styles = generateBorderStyles(BadgeStylesApi);
const useStyles = createStyles(() => styles);

const variants = ['light', 'filled', 'outline', 'dot', 'gradient'] as const;

function Wrapper(props: Partial<BadgeProps<'div'>>) {
  const items = variants.map((variant) => (
    <Badge key={variant} variant={variant} leftSection="L" rightSection="R" {...props}>
      {variant}
    </Badge>
  ));
  return (
    <Group position="center" mt="xl">
      {items}
    </Group>
  );
}

function WithClassNames() {
  return <Wrapper classNames={useStyles().classes} />;
}

storiesOf('@mantine/core/Badge/styles-api', module)
  .add('With sx', () => <Wrapper sx={{ border: '1px solid red', backgroundColor: 'blue' }} />)
  .add('With styles as object', () => <Wrapper styles={styles} />)
  .add('With styles as function', () => <Wrapper styles={() => styles} />)
  .add('With styles as classNames', () => <WithClassNames />)
  .add('Styles API on MantineProvider', () => (
    <MantineProvider styles={{ Badge: () => styles }}>
      <Wrapper />
    </MantineProvider>
  ));
