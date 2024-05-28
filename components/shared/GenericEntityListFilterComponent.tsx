'use client';
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Buch } from '@/api/buch';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';
import { LoadingComponent } from '@/components/shared/LoadingComponent';
import { ErrorBannerComponent } from '@/components/shared/ErrorBannerComponent';
import { BuecherCardViewComponent } from '@/components/BuecherCardViewComponent';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { ChipListComponent } from '@/components/shared/ChipListComponent';
import useSWR from 'swr';

export type PropsGenericEntityListFiler<T> = {
    searchCriteria: {
        [key in keyof Partial<T>]: string;
    };
};
export const GenericEntityListFilerComponent: React.FC<
    PropsGenericEntityListFiler<Buch>
> = (props: PropsGenericEntityListFiler<Buch>) => {
    const { searchCriteria } = props;
    const appContext = useApplicationContextApi();
    const [filteredBooks, setFilteredBooks] = useState<Buch[]>([]);
    const {
        data: buecher,
        isLoading,
        error,
    } = useSWR<Buch[], string>('GetAlleBuecher', appContext.getAlleBuecher);

    useEffect(() => {
        const filterBooks = (): Buch[] => {
            return buecher === undefined
                ? []
                : buecher.filter((b) => {
                      const entries = Object.entries(b);
                      return Object.entries(searchCriteria).every((a) =>
                          entries.find((e) => {
                              return (
                                  e[0] === a[0] &&
                                  e[1] !== null &&
                                  a[1] !== undefined &&
                                  e[1]
                                      .toString()
                                      .toLowerCase()
                                      .includes(a[1].toString().toLowerCase())
                              );
                          }),
                      );
                  });
        };
        setFilteredBooks(filterBooks());
    }, [searchCriteria, buecher]);

    const formatSearchCriteriaList = (): string[] => {
        return Object.entries(searchCriteria).map((entry) => {
            const [key, value] = entry;
            return `${`${key.charAt(0).toUpperCase()}${key
                .slice(1)
                .toLowerCase()}`}: ${value}`;
        });
    };

    if (isLoading)
        return (
            <LoadingComponent message={'Vergleichbare Bücher werden geladen'} />
        );

    if (error !== undefined) return <ErrorBannerComponent message={error} />;

    if (filteredBooks.length === 0)
        return <div>Keine vergleichbare Bücher gefunden!</div>;

    return (
        <div {...styles.mainContainer()}>
            <ChipListComponent values={formatSearchCriteriaList()} />
            <BuecherCardViewComponent buecher={filteredBooks} />
        </div>
    );
};

const styles: ExtendedStyleProps = {
    mainContainer: () => ({
        style: {
            display: 'grid',
            gap: 'var(--gap-4)',
        },
    }),
};
