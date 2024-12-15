import React, { ReactNode } from 'react';
import { withRef } from '@udecode/cn';
import {
  ListStyleType,
  useIndentListToolbarButton,
  useIndentListToolbarButtonState,
} from '@udecode/plate-indent-list';

import { Icons, Icon } from '@/components/plate-ui/icons';

import { ToolbarButton } from './toolbar';

export const IndentListToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType: ListStyleType,
    Icon: Icon,
    tooltip: string,
  }
>(({ nodeType = ListStyleType.Disc, Icon = Icons.ul, tooltip }, ref) => {
  const state = useIndentListToolbarButtonState({ nodeType });
  const { props } = useIndentListToolbarButton(state);

  return (
    <ToolbarButton
      ref={ref}
      tooltip={tooltip}
      {...props}
    >
      <Icon />
    </ToolbarButton>
  );
});
