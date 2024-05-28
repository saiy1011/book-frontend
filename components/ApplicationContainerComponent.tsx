'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { NavigationBarComponent } from '@/components/NavigationBarComponent';
import { FooterComponent } from '@/components/FooterComponent';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { BottomNavigationComponent } from '@/components/BottomNavigationComponent';
import { LoginComponent } from '@/components/LoginComponent';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';

type Props = PropsWithChildren;

export const ApplicationContainerComponent: React.FC<Props> = (
    props: Props,
) => {
    const appContext = useApplicationContextApi();
    const [tokenIsValid, setTokenIsValid] = useState<boolean | undefined>(
        undefined,
    );

    useEffect(() => {
        setTokenIsValid(appContext.tokenExistsAndIsValid());
        appContext.initializeRequestInterceptor(setTokenIsValid);
    }, [appContext]);

    return (
        <div {...styles.appContainer()}>
            <NavigationBarComponent />
            {appContext.isClient && tokenIsValid ? (
                <main {...styles.mainContentContainer()}>{props.children}</main>
            ) : (
                <LoginComponent />
            )}
            <FooterComponent />
            <BottomNavigationComponent />
        </div>
    );
};

const styles: ExtendedStyleProps = {
    appContainer: () => ({
        style: {
            display: 'grid',
            gridTemplateRows: 'max-content minmax(100vh, 1fr) max-content',
        },
    }),

    mainContentContainer: () => ({
        style: {
            width: '100%',
        },
    }),
};
