'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightToBracket,
    faBook,
    faHouse,
    faPlus,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';
import { usePathname, useRouter } from 'next/navigation';

type NavigationButton = {
    label: string;
    icon: ReactNode;
    isActive: boolean;
    onClick: () => void;
};

type ApplicationNavigation = {
    navigationButtons: NavigationButton[];
};

export const useApplicationNavigation = (): ApplicationNavigation => {
    const appContext = useApplicationContextApi();
    const router = useRouter();
    const pathname = usePathname();

    const buttons: NavigationButton[] = [
        {
            label: 'Startseite',
            icon: (
                <FontAwesomeIcon
                    icon={faHouse}
                    style={{ color: 'black', fontSize: 20 }}
                />
            ),
            isActive: pathname === '/',
            onClick: () => router.push('/buecher'),
        },
        {
            label: 'Anlegen',
            icon: (
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: 'black', fontSize: 20 }}
                />
            ),
            isActive: pathname.includes('/anlegen'),
            onClick: () => router.push('/anlegen'),
        },
        {
            label: 'Suchen',
            icon: (
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: 'black', fontSize: 20 }}
                />
            ),
            isActive: pathname.includes('/suchen'),
            onClick: () => router.push('/suchen'),
        },
        {
            label: `${
                appContext.tokenExistsAndIsValid() ? 'Abmelden' : 'Anmelden'
            }`,
            icon: (
                <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    style={{ color: 'black', fontSize: 20 }}
                />
            ),
            isActive: false,
            onClick: () => appContext.logout(),
        },
    ];

    const [navigationButtons, setNavigationButtons] =
        useState<NavigationButton[]>(buttons);

    useEffect(() => {
        setNavigationButtons(buttons);
    }, [pathname]);

    return {
        navigationButtons,
    };
};
