import React, { forwardRef } from 'react';
import { DefaultProps, MantineNumberSize, useExtractedMargins } from '@mantine/styles';
import useStyles from './Container.styles';

export interface ContainerProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
  /** Predefined container max-width or number for max-width in px */
  size?: MantineNumberSize;

  /** Horizontal padding defined in theme.spacing, or number value for padding in px */
  padding?: MantineNumberSize;

  /** If fluid is set to true, size prop is ignored and Container always take 100% of width */
  fluid?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      padding = 'md',
      fluid,
      size,
      style,
      sx,
      styles,
      classNames,
      ...others
    }: ContainerProps,
    ref
  ) => {
    const { classes, cx } = useStyles(
      { padding, fluid, size },
      { sx, styles, classNames, name: 'Container' }
    );
    const { mergedStyles, rest } = useExtractedMargins({ others, style });
    return <div className={cx(classes.root, className)} style={mergedStyles} ref={ref} {...rest} />;
  }
);

Container.displayName = '@mantine/core/Container';
