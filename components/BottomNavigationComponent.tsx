'use client';
import React from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { useApplicationNavigation } from '@/hooks/useApplicationNavigation';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';

export const BottomNavigationComponent: React.FC = () => {
    const { navigationButtons } = useApplicationNavigation();
    const appContext = useApplicationContextApi();

    return (
        <div {...styles.bottomNavContainer()}>
            <div {...styles.bottomNavContent()}>
                <div {...styles.buttonsListContainer()}>
                    {appContext.isClient &&
                        navigationButtons.map((button) => (
                            <React.Fragment key={button.label}>
                                <div
                                    onClick={button.onClick}
                                    {...styles.navButtonItem(button.isActive)}
                                >
                                    {button.icon}
                                    {button.label}
                                </div>
                            </React.Fragment>
                        ))}
                </div>
            </div>
        </div>
    );
};

const styles: ExtendedStyleProps = {
    bottomNavContainer: () => ({
        className: 'd-lg-none d-md-block d-sm-block',
        style: {
            position: 'sticky',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2000,
            padding: 'var(--padding-1)',
            backgroundColor: 'var(--color-white)',
            boxShadow: '0 0 50px grey',
        },
    }),

    bottomNavContent: () => ({
        style: {
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            justifyContent: 'center',
        },
    }),

    buttonsListContainer: () => ({
        style: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            overflow: 'hidden',
        },
    }),

    navButtonItem: (isActive: boolean) => ({
        style: {
            display: 'grid',
            justifyContent: 'center',
            justifyItems: 'center',
            textAlign: 'center',
            gridGap: '5px',
            padding: 'var(--padding-1)',
            borderRadius: '5px',
            width: '85px',
            color: isActive ? 'var(--color-white)' : 'unset',
            backgroundColor: isActive ? 'var(--color-main)' : 'unset',
            cursor: 'pointer',
        },
    }),
};
