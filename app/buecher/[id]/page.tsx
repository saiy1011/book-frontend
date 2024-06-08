'use client';
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-misused-promises, no-unused-vars */
import React from 'react';
import PageContentWrapperComponent from '@/components/shared/PageContentWrapperComponent';
import { useParams, useRouter } from 'next/navigation';
import { Buch } from '@/api/buch';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';
import { LoadingComponent } from '@/components/shared/LoadingComponent';
import { ErrorBannerComponent } from '@/components/shared/ErrorBannerComponent';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { RatingComponent } from '@/components/shared/RatingComponent';
import { CenteredSectionComponent } from '@/components/shared/CenteredSectionComponent';
import { ChipListComponent } from '@/components/shared/ChipListComponent';
import { GenericEntityListFilerComponent } from '@/components/shared/GenericEntityListFilterComponent';
import {
    BuchDetailsComponent,
    ListEntry,
} from '@/components/BuchDetailsComponent';
import useSWR from 'swr';

const BuchItem: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { isSmall } = useMediaQuery();

    const appContext = useApplicationContextApi();
    const {
        data: buch,
        isLoading,
        error,
    } = useSWR<Buch, string>(`${id}`, () => appContext.getBuchById(Number(id)));

    const handleDelete = async () => {
        await appContext.deleteBuch(Number(id));
        router.push('/buecher');
    };

    const buchDetails: ListEntry[] =
        buch !== undefined
            ? [
                  { label: 'Title', value: buch.titel },
                  { label: 'Isnb', value: buch.isbn },
                  { label: 'Art', value: buch.art },
                  { label: 'Preis', value: `${buch.preis} €` },
                  { label: 'Rabatt', value: buch.rabatt },
                  { label: 'Datum', value: buch.datum.toLocaleDateString() },
                  { label: 'Homepage', value: buch.homepage },
                  {
                      label: 'Rating',
                      value: (
                          <RatingComponent stars={buch.rating} maxValue={5} />
                      ),
                  },
                  {
                      label: 'Schlagwörter',
                      value: <ChipListComponent values={buch.schlagwoerter} />,
                  },
              ]
            : [];

    if (isLoading)
        return <LoadingComponent message={'Buchdaten werden geladen'} />;

    if (error !== undefined) return <ErrorBannerComponent message={error} />;

    return (
        <PageContentWrapperComponent title={`Buchdetails - ${buch?.titel}`}>
            <div {...styles.pageContainer(isSmall)}>
                <div {...styles.bookPictureAndIconContainer()}>
                    <div {...styles.bookPicture()}></div>
                    <div {...styles.buttonsContainer()}>
                        <button
                            type="button"
                            {...styles.editButton()}
                            onClick={() => router.push(`/buecher/${id}/edit`)}
                        >
                            Bearbeiten
                        </button>
                        <button
                            type="button"
                            {...styles.deleteButton()}
                            onClick={handleDelete}
                        >
                            Buch löschen
                        </button>
                    </div>
                </div>
                <BuchDetailsComponent entries={buchDetails} />
            </div>
            <CenteredSectionComponent>
                <div {...styles.secondSectionTitle()}>Vergleichbare Bücher</div>
                <GenericEntityListFilerComponent
                    searchCriteria={{ art: buch?.art }}
                />
            </CenteredSectionComponent>
        </PageContentWrapperComponent>
    );
};

const styles: ExtendedStyleProps = {
    pageContainer: (isScreenSmall: boolean) => ({
        className: 'mt-5',
        style: {
            display: 'grid',
            gap: 'var(--gap-3)',
            alignItems: 'start',
            gridTemplateColumns: isScreenSmall ? '1fr' : 'max-content 1fr',
        },
    }),

    bookPictureAndIconContainer: () => ({
        style: {
            display: 'grid',
            gap: 'var(--padding-3)',
            justifyContent: 'center',
        },
    }),

    bookPicture: () => ({
        style: {
            height: '350px',
            width: '250px',
            backgroundColor: '#E9E2E2',
            borderRadius: '10px',
        },
    }),

    buttonsContainer: () => ({
        style: {
            display: 'grid',
            gap: 'var(--gap-1)',
        },
    }),

    editButton: () => ({
        className: 'btn',
        style: {
            color: 'var(--color-main)',
            backgroundColor: 'unset',
            padding: 'var(--padding-1) var(--padding-2)',
            border: '2px solid var(--color-main)',
        },
    }),

    deleteButton: () => ({
        className: 'btn',
        style: {
            color: 'var(--color-white)',
            backgroundColor: 'var(--color-error)',
            padding: 'var(--padding-1) var(--padding-2)',
        },
    }),

    secondSectionTitle: () => ({
        className: 'h2',
        style: {
            marginTop: 'var(--gap-8)',
            marginBottom: 'var(--gap-2)',
        },
    }),
};

export default BuchItem;
