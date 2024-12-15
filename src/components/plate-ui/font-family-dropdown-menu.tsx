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

export function FontFamilyDropdownMenu({ ...props }: DropdownMenuProps) {
    const openState = useOpenState();
    const fontFamilies = [
        {
            name: "Time New Roman",
            value: "Times New Roman, serif",
        },
        {
            name: "Arial",
            value: "Arial, sans-serif"
        },
        {
            name: "Calibri",
            value: "Calibri, sans-serif"
        },
        {
            name: "Verdana",
            value: "Verdana, sans-serif"
        },
        {
            name: "Tahoma",
            value: "Tahoma, sans-serif"
        },
        {
            name: "Courier New",
            value: "Courier New, serif"
        },
        {
            name: "Georgia",
            value: "Georgia, serif"
        },
        {
            name: "Garamond",
            value: "Garamond, serif"
        },
        {
            name: "Default",
            value: ""
        },
    ]
    const editor = useEditorState()

    return (
        <DropdownMenu modal={false} {...openState} {...props}>
            <DropdownMenuTrigger asChild>
                <ToolbarButton
                    pressed={openState.open}
                    tooltip={"Font family"}
                    isDropdown
                >
                    {editor.getMarks()?.fontFamily ?
                        <>
                            {fontFamilies.find(item => item.value === editor.getMarks()?.fontFamily)?.name ?? "Unknown"}
                        </>
                        :
                        <>{"Default"}</>}
                </ToolbarButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="min-w-0">
                <DropdownMenuRadioGroup
                    className="flex flex-col gap-0.5"
                >
                    {fontFamilies.map((item) => (
                        <DropdownMenuRadioItem
                            key={item.value}
                            value={`${item.value}`}
                            onClick={() => { setMarks(editor, { ...editor.getMarks(), fontFamily: item.value }) }}
                        >
                            {item.name}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
