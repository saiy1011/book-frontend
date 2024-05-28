'use client';
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, {
    useState,
    useEffect,
    InputHTMLAttributes,
    ReactNode,
    ChangeEvent,
} from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

interface Props<T extends object> {
    data: T[];
    children: (searchResult: T[]) => ReactNode;
    inputProps?: InputHTMLAttributes<any>;
    optionRight?: ReactNode;
}

const SearchInputComponent: React.FC<Props<any>> = <T extends object>(
    props: Props<T>,
) => {
    const { data, inputProps, optionRight, children } = props;
    const [searchResult, setSearchResult] = useState<T[]>(data);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        setSearchResult(data);
    }, [data]);

    useEffect(() => {
        const searchKundenFromQuery = (
            queryString: string,
            kunden: T[],
        ): T[] => {
            if (kunden === undefined || queryString === '') return kunden;

            const queryToLowercase = queryString.toLowerCase();

            return kunden.filter((item) => {
                return Object.values(item).some((value: string) => {
                    if (!value) return false;
                    return value
                        .toString()
                        .toLowerCase()
                        .includes(queryToLowercase);
                });
            });
        };

        const result = searchKundenFromQuery(inputValue, data);
        setSearchResult(result);
    }, [data, inputValue]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        setInputValue(event.target.value);
    };

    return (
        <div {...styles.searchContainer()}>
            <div {...styles.inputAndOptionContainer()}>
                <input
                    {...inputProps}
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    {...styles.searchInput()}
                />
                {optionRight}
            </div>
            {children !== undefined ? children(searchResult) : null}
        </div>
    );
};

const styles: ExtendedStyleProps = {
    searchContainer: () => ({
        style: {
            display: 'grid',
            gap: 'var(--gap-5)',
        },
    }),

    inputAndOptionContainer: () => ({
        style: {
            display: 'flex',
            gap: 'var(--gap-3)',
            alignContent: 'center',
            alignItems: 'center',
        },
    }),

    searchInput: () => ({
        className: 'form-control pt-2 pb-2',
        style: {
            flex: 1,
        },
    }),
};

export default SearchInputComponent;
