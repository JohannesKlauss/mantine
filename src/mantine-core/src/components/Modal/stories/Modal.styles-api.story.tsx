import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStyles, MantineProvider } from '@mantine/styles';
import { generateBorderStyles } from '@mantine/ds/src';
import { Modal, ModalProps } from '../Modal';
import { Modal as ModalStylesApi } from '../styles.api';

const styles = generateBorderStyles(ModalStylesApi);
const useStyles = createStyles(() => styles);

function Wrapper(props: Partial<ModalProps>) {
  return (
    <Modal {...props} opened title="Modal" padding="xl" onClose={() => {}}>
      Modal
    </Modal>
  );
}

function WithClassNames() {
  return <Wrapper classNames={useStyles().classes} />;
}

storiesOf('@mantine/core/Modal/styles-api', module)
  .add('With sx', () => <Wrapper sx={{ border: '1px solid red', backgroundColor: 'blue' }} />)
  .add('With styles as object', () => <Wrapper styles={styles} />)
  .add('With styles as function', () => <Wrapper styles={() => styles} />)
  .add('With styles as classNames', () => <WithClassNames />)
  .add('Styles API on MantineProvider', () => (
    <MantineProvider styles={{ Modal: () => styles }}>
      <Wrapper />
    </MantineProvider>
  ));
