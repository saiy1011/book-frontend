'use client';
import React from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useApplicationNavigation } from '@/hooks/useApplicationNavigation';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';

export const NavigationBarComponent: React.FC = () => {
    const { isSmall } = useMediaQuery();
    const { navigationButtons } = useApplicationNavigation();
    const appContext = useApplicationContextApi();

    return (
        <nav {...styles.navbarContainer(isSmall)}>
            <div {...styles.navbarContentContainer()}>
                <Link href="/" {...styles.brand()}>
                    HKA Bücherverwaltung
                </Link>
                {appContext.tokenExistsAndIsValid() && appContext.isClient ? (
                    <div {...styles.navbarButtonContainer()}>
                        {navigationButtons.map((button) => (
                            <button
                                key={button.label}
                                type="button"
                                {...styles.navbarButton(button.isActive)}
                                onClick={button.onClick}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                ) : null}
            </div>
        </nav>
    );
};

const styles: ExtendedStyleProps = {
    navbarContainer: (isScreenSmall: boolean) => ({
        style: {
            display: 'grid',
            justifyItems: 'center',
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-black)',
            height: 'var(--navbar-height)',
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2000,
            padding: `${
                isScreenSmall
                    ? 'var(--padding-1) var(--padding-2)'
                    : 'var(--padding-1) var(--padding-10)'
            }`,
            boxShadow: '0 0 15px grey',
        },
    }),

    navbarContentContainer: () => ({
        style: {
            display: 'grid',
            gridTemplateColumns: '1fr max-content',
            gap: 'var(--gap-2)',
            alignItems: 'center',
            maxWidth: 'var(--max-page-width)',
            width: '100%',
        },
    }),

    brand: () => ({
        className: 'navbar-brand',
        style: {
            fontSize: 'var(--font-large-size)',
            fontWeight: 400,
        },
    }),

    navbarButtonContainer: () => ({
        className: 'd-none d-lg-block d-md-none-sm-none',
        style: {
            display: 'flex',
        },
    }),

    navbarButton: (isActive: boolean) => ({
        className: 'btn',
        style: {
            color: isActive ? 'var(--color-white)' : 'var(--color-main)',
            backgroundColor: isActive ? 'var(--color-main)' : 'unset',
        },
    }),
};
