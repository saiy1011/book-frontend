import React, { ReactNode } from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

export type ListEntry = {
    label: string;
    value: ReactNode;
};

type Props = {
    entries: ListEntry[];
};

export const BuchDetailsComponent: React.FC<Props> = (props: Props) => {
    const { entries } = props;
    return (
        <div {...styles.entryListContainer()}>
            {entries.map((entry, index, arr) => (
                <div
                    key={entry.label}
                    {...styles.entryItem(index === arr.length - 1)}
                >
                    <div {...styles.entryLabel()}>{entry.label}</div>
                    <div>{entry.value}</div>
                </div>
            ))}
        </div>
    );
};

const styles: ExtendedStyleProps = {
    entryListContainer: () => ({
        className: 'mt-2',
        style: {
            display: 'grid',
            border: '1px solid var(--color-darkgray-100)',
            borderRadius: '10px',
        },
    }),

    entryItem: (isLast: boolean) => ({
        style: {
            display: 'grid',
            gap: 'var(--gap-2)',
            alignItems: 'center',
            alignContent: 'center',
            gridTemplateColumns: '1fr max-content',
            padding: '14px var(--padding-2)',
            borderBottom: isLast
                ? 'unset'
                : '1px solid var(--color-darkgray-200)',
        },
    }),

    entryLabel: () => ({
        style: {
            fontWeight: '600',
        },
    }),
};
