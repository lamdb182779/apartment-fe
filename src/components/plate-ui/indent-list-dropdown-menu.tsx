/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import {
    ListStyleType,
    useIndentListToolbarButton,
    useIndentListToolbarButtonState,
} from '@udecode/plate-indent-list';

import { Icons, iconVariants } from '@/components/plate-ui/icons';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';
import { IndentListToolbarButton } from './indent-list-toolbar-button';

const items = [
    {
        value: 'Bulleted',
        icon: Icons.ul,
        nodeType: ListStyleType.Disc,
    },
    {
        value: 'Roman Numberic',
        icon: Icons.tree,
        nodeType: ListStyleType.UpperRoman,
    },
    {
        value: 'Decimal Numberic',
        icon: Icons.ol,
        nodeType: ListStyleType.Decimal,
    },
    // {
    //     value: 'justify',
    //     icon: Icons.alignJustify,
    // },
];

export function IndentListDropdownMenu({ children, ...props }: DropdownMenuProps) {
    const state = useIndentListToolbarButtonState();

    const openState = useOpenState();
    const IconValue =
        items.find((item) => item.nodeType === state.nodeType)?.icon ??
        Icons.ul;

    return (
        <DropdownMenu modal={false} {...openState} {...props}>
            <DropdownMenuTrigger asChild>
                <ToolbarButton pressed={openState.open} tooltip="Align" isDropdown>
                    <IconValue />
                </ToolbarButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="min-w-0">
                <DropdownMenuRadioGroup
                    className="flex flex-col gap-0.5"
                >
                    {items.map(({ value, icon, nodeType }) => (
                        <IndentListToolbarButton key={value} tooltip={value} Icon={icon} nodeType={nodeType} />
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
