'use client';
import React from 'react';
import { Buch } from '@/api/buch';
import { useRouter } from 'next/navigation';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type Props = {
    buecher: Buch[];
};

export const BuecherTabelleComponent: React.FC<Props> = (props: Props) => {
    const { buecher } = props;
    const router = useRouter();
    const { isSmall } = useMediaQuery();

    const schlagwoerterExist = (
        schlagwoerter: string[] | undefined | null,
    ): boolean => {
        return (
            schlagwoerter !== null &&
            schlagwoerter !== undefined &&
            schlagwoerter.length > 0
        );
    };

    return (
        <table {...styles.tableContainer()}>
            <thead>
                <tr>
                    <th scope="col">Titel</th>
                    {isSmall ? null : <th scope="col">Isbn</th>}
                    <th scope="col">Art</th>
                    {isSmall ? null : <th scope="col">Homepage</th>}
                    <th scope="col">Preis</th>
                    {isSmall ? null : <th scope="col">Schlagwörter</th>}
                </tr>
            </thead>
            <tbody>
                {buecher.map((buch: Buch) => (
                    <tr
                        key={buch.id}
                        onClick={() => router.push(`/buecher/${buch.id}`)}
                    >
                        <td>{buch.titel}</td>
                        {isSmall ? null : <td>{buch.isbn}</td>}
                        <td>{buch.art}</td>
                        {isSmall ? null : <td>{buch.homepage}</td>}
                        <td>{`${buch.preis} €`}</td>
                        {isSmall ? null : (
                            <td style={{ maxWidth: '200px' }}>
                                <div {...styles.keyWordListContainer()}>
                                    {schlagwoerterExist(buch.schlagwoerter) ? (
                                        buch.schlagwoerter.map((word) => (
                                            <div
                                                key={word}
                                                {...styles.keyWordItem()}
                                            >
                                                {word.toLowerCase()}
                                            </div>
                                        ))
                                    ) : (
                                        <p>Kein Schlagwort vorhanden!</p>
                                    )}
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const styles: ExtendedStyleProps = {
    tableContainer: () => ({
        className: `table table-bordered table-hover`,
    }),

    keyWordListContainer: () => ({
        style: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
        },
    }),

    keyWordItem: () => ({
        className: 'badge badge-light',
        style: {
            color: 'var(--color-main)',
            border: '2px solid var(--color-main)',
        },
    }),
};
