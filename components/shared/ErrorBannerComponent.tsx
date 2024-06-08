'use client';
import React from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

type Props = {
    message: string;
};

export const ErrorBannerComponent: React.FC<Props> = (props: Props) => {
    const { message } = props;
    return (
        <div role="alert" {...styles.alertContainer()}>
            {message}
        </div>
    );
};

const styles: ExtendedStyleProps = {
    alertContainer: () => ({
        className: 'alert alert-danger',
    }),
};
