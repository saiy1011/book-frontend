import React from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

type Props = {
    message?: string;
};

export const LoadingComponent: React.FC<Props> = (props: Props) => {
    const { message } = props;
    const loadingText = message ?? 'Wird geladen';

    return (
        <div {...styles.container()}>
            <div role="status" {...styles.spinner()}>
                <span {...styles.loadingText()}>{loadingText}</span>
            </div>
        </div>
    );
};

const styles: ExtendedStyleProps = {
    container: () => ({
        className: 'd-flex justify-content-center',
    }),

    spinner: () => ({
        className: 'spinner-border',
        style: {
            color: 'var(--color-main)',
        },
    }),

    loadingText: () => ({
        className: 'sr-only',
        style: {
            color: 'var(--color-main)',
        },
    }),
};
