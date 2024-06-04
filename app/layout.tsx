import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BoostrapJsImport } from '@/components/BoostrapJsImport';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ApplicationContainerComponent } from '@/components/ApplicationContainerComponent';
import { ApplicationContextProvider } from '@/context/ApplicationContextApi';

config.autoAddCss = false;

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
    title: 'Buch Webapp Gruppe 2',
    description: 'Buch Webapp Gruppe 2',
};

type PropsRootLayout = PropsWithChildren;
export default function RootLayout(props: PropsRootLayout) {
    return (
        <html lang="de">
            <BoostrapJsImport />
            <body className={inter.className}>
                <ApplicationContextProvider>
                    <ApplicationContainerComponent>
                        {props.children}
                    </ApplicationContainerComponent>
                </ApplicationContextProvider>
            </body>
        </html>
    );
}
