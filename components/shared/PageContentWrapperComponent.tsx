'use client';
import React, { PropsWithChildren } from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { CenteredSectionComponent } from '@/components/shared/CenteredSectionComponent';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type Props = PropsWithChildren & {
    title: string;
};

const PageContentWrapperComponent: React.FC<Props> = (props: Props) => {
    const { title, children } = props;
    const { isSmall } = useMediaQuery();

    return (
        <div {...styles.pageWrapperContainer(isSmall)}>
            <CenteredSectionComponent>
                <div {...styles.pageTitle()}>{title}</div>
                {children}
            </CenteredSectionComponent>
        </div>
    );
};

const styles: ExtendedStyleProps = {
    pageWrapperContainer: (isScreenSmall: boolean) => ({
        style: {
            display: 'grid',
            justifySelf: 'center',
            padding: `${
                isScreenSmall
                    ? 'var(--padding-1) var(--padding-2)'
                    : 'var(--padding-6) var(--padding-10)'
            }`,
        },
    }),

    pageTitle: () => ({
        className: 'h2',
        style: {
            marginBottom: 'var(--gap-3)',
        },
    }),
};

export default PageContentWrapperComponent;
