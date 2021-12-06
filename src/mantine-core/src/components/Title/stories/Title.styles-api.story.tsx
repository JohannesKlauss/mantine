import React from 'react';
import { storiesOf } from '@storybook/react';
import { MantineProvider } from '@mantine/styles';
import { Title } from '../Title';

storiesOf('@mantine/core/Title/styles-api', module).add('Styles API on MantineProvider', () => (
  <div style={{ padding: 20 }}>
    <MantineProvider
      styles={{
        Title: (theme) => ({
          root: {
            color: theme.colorScheme === 'dark' ? 'blue' : 'red',
          },
        }),
      }}
    >
      <Title order={1}>MantineProvider styles</Title>
    </MantineProvider>
  </div>
));
