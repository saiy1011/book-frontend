import { CSSProperties } from 'react';

type CustomStyle = {
    className?: string;
    style?: CSSProperties;
};

export type ExtendedStyleProps = Record<
    string,
    // eslint-disable-next-line no-unused-vars
    (...args: any[]) => CustomStyle
>;
