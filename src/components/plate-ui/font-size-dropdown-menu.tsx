import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';
import { setMarks, useEditorState } from '@udecode/plate-common';

export function FontSizeDropdownMenu({ ...props }: DropdownMenuProps) {
    const openState = useOpenState();
    const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 96]
    const editor = useEditorState()

    return (
        <DropdownMenu modal={false} {...openState} {...props}>
            <DropdownMenuTrigger asChild>
                <ToolbarButton
                    pressed={openState.open}
                    tooltip="Font size"
                    isDropdown
                >
                    {editor.getMarks()?.fontSize ?? "df"}
                </ToolbarButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="min-w-0">
                <DropdownMenuRadioGroup
                    className="grid grid-cols-5 gap-0.5"
                >
                    {fontSizes.map((value) => (
                        <DropdownMenuRadioItem
                            key={value}
                            value={`${value}`}
                            className='cols-span-1'
                            onClick={() => { openState.onOpenChange(false); setMarks(editor, { ...editor.getMarks(), fontSize: value }) }}
                        >
                            {value}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
