import React from 'react';
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font';
import { useEditorReadOnly } from '@udecode/plate-common';

import { Icons, iconVariants } from '@/components/plate-ui/icons';
import { ColorDropdownMenu } from '@/components/plate-ui/color-dropdown-menu';

import { MarkToolbarButton } from './mark-toolbar-button';
import { MoreDropdownMenu } from './more-dropdown-menu';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';
import { FontSizeDropdownMenu } from './font-size-dropdown-menu';
import { ToolbarGroup } from './toolbar';
import { FontWeightDropdownMenu } from './font-weight-dropdown-menu';
import { FontFamilyDropdownMenu } from './font-family-dropdown-menu';

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <div className='flex flex-wrap'>
          <ToolbarGroup>
            <TurnIntoDropdownMenu />

          </ToolbarGroup>
          <ToolbarGroup>

            <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
              <Icons.bold />
            </MarkToolbarButton>
            <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
              <Icons.italic />
            </MarkToolbarButton>
            <MarkToolbarButton
              nodeType={MARK_UNDERLINE}
              tooltip="Underline (⌘+U)"
            >
              <Icons.underline />
            </MarkToolbarButton>
            <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
              <Icons.color className={iconVariants({ variant: 'toolbar' })} />
            </ColorDropdownMenu>
            <ColorDropdownMenu
              nodeType={MARK_BG_COLOR}
              tooltip="Highlight Color"
            >
              <Icons.bg className={iconVariants({ variant: 'toolbar' })} />
            </ColorDropdownMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <FontFamilyDropdownMenu />
            <FontSizeDropdownMenu />
            <FontWeightDropdownMenu />
          </ToolbarGroup>
          <ToolbarGroup>
            <MoreDropdownMenu />
          </ToolbarGroup>
        </div>
      )}

    </>
  );
}
