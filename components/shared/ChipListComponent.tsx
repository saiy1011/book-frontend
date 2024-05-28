import React from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

type Props = {
    values: string[];
};

export const ChipListComponent: React.FC<Props> = (props: Props) => {
    const { values } = props;
    return (
        <div {...styles.chipListContainer()}>
            {values.map((value) => (
                <div key={value} {...styles.chipItem()}>
                    {value}
                </div>
            ))}
        </div>
    );
};

const styles: ExtendedStyleProps = {
    chipListContainer: () => ({
        style: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
        },
    }),

    chipItem: () => ({
        className: 'badge badge-light',
        style: {
            color: 'var(--color-main)',
            border: '3px solid var(--color-main)',
            borderRadius: '25px',
            padding: '13px',
        },
    }),
};
