import React from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

export const FooterComponent: React.FC = () => {
    return (
        <footer {...styles.footerContainer()}>
            <div {...styles.footerWrapper()}>
                <div {...styles.footerContent()}>
                    <div {...styles.brand()}>HKA Bücherverwaltung</div>
                </div>
                <div {...styles.rightsContainer()}>
                    © {new Date().getFullYear()} HKA Bücherverwaltung. Alle
                    Rechte vorbehalten.
                </div>
            </div>
        </footer>
    );
};

const styles: ExtendedStyleProps = {
    footerContainer: () => ({
        style: {
            overflow: 'hidden',
            color: 'var(--color-white)',
            backgroundColor: 'var(--color-main)',
            padding: 'var(--padding-4) var(--padding-8)',
            gap: 'var(--gap-3)',
        },
    }),

    footerWrapper: () => ({
        style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
        },
    }),

    footerContent: () => ({
        style: {
            overflow: 'hidden',
        },
    }),

    brand: () => ({
        style: {
            fontSize: 'var(--font-large-size)',
            fontWeight: 400,
        },
    }),

    rightsContainer: () => ({
        style: {
            overflow: 'hidden',
            fontSize: 'var(--font-small-size)',
        },
    }),
};
