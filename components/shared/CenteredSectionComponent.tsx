import React, { PropsWithChildren } from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

type Props = PropsWithChildren;

export const CenteredSectionComponent: React.FC<Props> = (props: Props) => {
    return <div {...styles.centeredSectionContainer()}>{props.children}</div>;
};

const styles: ExtendedStyleProps = {
    centeredSectionContainer: () => ({
        style: {
            display: 'grid',
            justifySelf: 'center',
            width: '100%',
            maxWidth: 'var(--max-page-width)',
        },
    }),
};
