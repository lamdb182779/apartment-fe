import React from 'react';
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import { useEditorReadOnly } from '@udecode/plate-common';
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font';

import { Icons, iconVariants } from '@/components/plate-ui/icons';
import { InsertDropdownMenu } from './insert-dropdown-menu';
import { MarkToolbarButton } from './mark-toolbar-button';
import { ModeDropdownMenu } from './mode-dropdown-menu';
import { ToolbarGroup } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';
import { ListStyleType } from '@udecode/plate-indent-list';
import { ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED } from '@udecode/plate-media';
import { AlignDropdownMenu } from './align-dropdown-menu';
import { ColorDropdownMenu } from '@/components/plate-ui/color-dropdown-menu';
import { MoreDropdownMenu } from './more-dropdown-menu';
import { LineHeightDropdownMenu } from './line-height-dropdown-menu';
import { IndentListToolbarButton } from './indent-list-toolbar-button';
import { OutdentToolbarButton } from './outdent-toolbar-button';
import { IndentToolbarButton } from './indent-toolbar-button';
import { LinkToolbarButton } from './link-toolbar-button';
import { MediaToolbarButton } from './media-toolbar-button';
import { TableDropdownMenu } from './table-dropdown-menu';
import { EmojiDropdownMenu } from './emoji-dropdown-menu';
import { ToggleToolbarButton } from './toggle-toolbar-button';
import { IndentListDropdownMenu } from './indent-list-dropdown-menu';
import { FontSizeDropdownMenu } from './font-size-dropdown-menu';
import { FontWeightDropdownMenu } from './font-weight-dropdown-menu';
import { FontFamilyDropdownMenu } from './font-family-dropdown-menu';
export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: 'translateX(calc(-1px))',
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Code (⌘+E)" nodeType={MARK_CODE}>
                <Icons.code />
              </MarkToolbarButton>

              <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
                <Icons.color className={iconVariants({ variant: 'toolbar' })} />
              </ColorDropdownMenu>
              <ColorDropdownMenu
                nodeType={MARK_BG_COLOR}
                tooltip="Background Color"
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
              <AlignDropdownMenu />

              <LineHeightDropdownMenu />

              <IndentListDropdownMenu />

              <OutdentToolbarButton />
              <IndentToolbarButton />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton />
              <ToggleToolbarButton />

              <MediaToolbarButton nodeType={ELEMENT_IMAGE} />

              <MediaToolbarButton nodeType={ELEMENT_MEDIA_EMBED} >
              </MediaToolbarButton>

              <TableDropdownMenu />

              <EmojiDropdownMenu />

              <MoreDropdownMenu />
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  );
}
