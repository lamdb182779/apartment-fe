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

export function FontWeightDropdownMenu({ ...props }: DropdownMenuProps) {
    const openState = useOpenState();
    const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900]
    const editor = useEditorState()

    return (
        <DropdownMenu modal={false} {...openState} {...props}>
            <DropdownMenuTrigger asChild>
                <ToolbarButton
                    pressed={openState.open}
                    tooltip="Font weight"
                    isDropdown
                >
                    {editor.getMarks()?.fontWeight ?? "def"}
                </ToolbarButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="min-w-0">
                <DropdownMenuRadioGroup
                    className="grid grid-cols-3 gap-0.5"
                >
                    {fontWeights.map((value) => (
                        <DropdownMenuRadioItem
                            key={value}
                            value={`${value}`}
                            className='cols-span-1'
                            onClick={() => { openState.onOpenChange(false); setMarks(editor, { ...editor.getMarks(), fontWeight: value }) }}
                        >
                            {value}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
