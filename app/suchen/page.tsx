'use client';
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import PageContentWrapperComponent from '@/components/shared/PageContentWrapperComponent';
import { Buch } from '@/api/buch';
import {
    GenericEntityListFilerComponent,
    PropsGenericEntityListFiler,
} from '@/components/shared/GenericEntityListFilterComponent';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

type SearchCriteria = PropsGenericEntityListFiler<Buch>['searchCriteria'];

const SuchFormular: React.FC = () => {
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({});

    const handleRadioboxChange = (
        e: ChangeEvent<HTMLInputElement>,
        criteriaProp: keyof SearchCriteria,
    ) => {
        setSearchCriteria(() => {
            return {
                ...searchCriteria,
                [criteriaProp]: e.target.value,
            };
        });
    };

    const handleCheckboxChange = <K extends keyof SearchCriteria>(
        e: ChangeEvent<HTMLInputElement>,
        criteriaProp: K,
    ) => {
        setSearchCriteria((prevCriteria) => {
            const updatedCriteria = { ...prevCriteria };
            e.target.checked
                ? (updatedCriteria[criteriaProp] = e.target.value)
                : delete updatedCriteria[criteriaProp];
            return updatedCriteria;
        });
    };

    const renderInputField = (props: InputHTMLAttributes<any>) => {
        const { id, value } = props;
        return (
            <div key={id} {...styles.inputField()}>
                <input {...props} />
                <label htmlFor={id}>{value}</label>
            </div>
        );
    };

    const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSearchCriteria((prevCriteria) => {
            const updatedCriteria = { ...prevCriteria };
            isNaN(parseInt(e.target.value))
                ? delete updatedCriteria['rating']
                : (updatedCriteria['rating'] = e.target.value);
            return updatedCriteria;
        });
    };

    return (
        <PageContentWrapperComponent title={'Bücher Suchen'}>
            <div>
                <div {...styles.searchBar()}>
                    <div {...styles.radioButtonContainer()}>
                        {renderInputField({
                            type: 'radio',
                            id: 'KINDLE',
                            value: 'Kindle',
                            checked: searchCriteria.art === 'Kindle',
                            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                handleRadioboxChange(e, 'art'),
                        })}
                        {renderInputField({
                            type: 'radio',
                            id: 'DRUCKAUSGABE',
                            value: 'Druckausgabe',
                            checked: searchCriteria.art === 'Druckausgabe',
                            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                handleRadioboxChange(e, 'art'),
                        })}
                    </div>
                    <div {...styles.checkboxContainer}>
                        {renderInputField({
                            type: 'checkbox',
                            id: 'Phi',
                            value: 'Phi',
                            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                handleCheckboxChange(e, 'titel'),
                        })}
                    </div>
                    <select onChange={(e) => handleSelectionChange(e)}>
                        <option selected>Bewertung wählen</option>
                        <option value="1">1 Stern</option>
                        <option value="2">2 Sterne</option>
                        <option value="3">3 Sterne</option>
                        <option value="4">4 Sterne</option>
                        <option value="5">5 Sterne</option>
                        <option value="0">Keine Bewertung</option>
                    </select>
                </div>
                {/* Hier weitere Eingabefelder einfügen */}
                <div>
                    <GenericEntityListFilerComponent
                        searchCriteria={searchCriteria}
                    />
                </div>
            </div>
        </PageContentWrapperComponent>
    );
};

const styles: ExtendedStyleProps = {
    inputField: () => ({
        style: {
            display: 'flex',
            gap: 'var(--gap-1)',
        },
    }),
    radioButtonContainer: () => ({
        style: {
            display: 'flex',
            flexDirection: 'column',
        },
    }),
    checkboxContainer: () => ({
        style: {
            display: 'flex',
            flexDirection: 'column',
        },
    }),
    searchBar: () => ({
        style: {
            border: 'var(--br-8xs) solid var(--color-main)',
            borderRadius: '5px',
            padding: 'var(--padding-1)',
            marginBottom: 'var(--padding-2)',
            display: 'flex',
            flexDirection: 'row',
            gap: 'var(--gap-4)',
            alignItems: 'center',
        },
    }),
};

export default SuchFormular;
