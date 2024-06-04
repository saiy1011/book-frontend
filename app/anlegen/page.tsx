/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable regexp/no-useless-non-capturing-group */
/* eslint-disable regexp/no-useless-escape */
/* eslint-disable regexp/no-dupe-characters-character-class */
/* eslint-disable regexp/prefer-d */
/* eslint-disable regexp/prefer-w */
/* eslint-disable no-useless-escape */
'use client';
import { useForm } from 'react-hook-form';
import { BuchInputModell } from '../../api/buch';
import React, { useState } from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { ErrorBannerComponent } from '@/components/shared/ErrorBannerComponent';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';
import { useRouter } from 'next/navigation';
import { InputFieldValidationComponent } from '@/components/shared/InputFieldValidationComponent';

export default function Create() {
    const appContext = useApplicationContextApi();
    const { register, handleSubmit, formState, reset } =
        useForm<BuchInputModell>({ mode: 'onBlur' });
    const { errors } = formState;
    const [response, setResponse] = useState<string>();
    const [error, setError] = useState<string | undefined>(undefined);
    const router = useRouter();

    const onSubmit = async (data: BuchInputModell) => {
        console.log('Form submitted', data);
        setResponse(undefined);
        setError(undefined);
        try {
            await appContext.createBuch(data);
            setResponse(data.titel.titel);
            reset();
            setTimeout(() => {
                router.push('/buecher');
            }, 3000);
        } catch (err) {
            console.log(err);
            setError((err as Error).message);
        }
    };

    return (
        <div className="container">
            <h1 {...styles.title()}>Buch anlegen</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputFieldValidationComponent
                    htmlforlabel="isbn"
                    label="ISBN-13"
                    error={errors.isbn?.message}
                    className="form-control"
                    type="text"
                    id="isbn"
                    placeholder="ISBN-13"
                    rest={register('isbn', {
                        required: {
                            value: true,
                            message: 'ISBN ist erforderlich!',
                        },
                        pattern: {
                            value: /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
                            message: 'ISBN ist ungültig!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="titel"
                    label="Titel"
                    error={errors.titel?.titel?.message}
                    className="form-control"
                    type="text"
                    id="titel"
                    placeholder="Titel"
                    rest={register('titel.titel', {
                        required: {
                            value: true,
                            message: 'Titel ist erforderlich!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="untertitel"
                    label="Untertitel"
                    error={errors.untertitel?.message}
                    className="form-control"
                    type="text"
                    id="untertitel"
                    placeholder="Untertitel"
                    rest={register('untertitel', {
                        maxLength: {
                            value: 40,
                            message:
                                'Untertitel darf maximal 40 Zeichen lang sein!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="preis"
                    label="Preis"
                    error={errors.preis?.message}
                    className="form-control"
                    type="number"
                    id="preis"
                    placeholder="Preis"
                    rest={register('preis', {
                        required: {
                            value: true,
                            message: 'Preis ist erforderlich!',
                        },
                        min: {
                            value: 0,
                            message: 'Preis muss größer als 0 sein!',
                        },
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message:
                                'Preis bitte mit 2 Nachkommastellen angeben!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="rating"
                    label="Rating"
                    error={errors.rating?.message}
                    className="form-control"
                    type="number"
                    id="rating"
                    placeholder="Rating"
                    rest={register('rating', {
                        min: {
                            value: 0,
                            message: 'Rating muss zwischen 0-5 sein!',
                        },
                        max: {
                            value: 5,
                            message: 'Rating muss zwischen 0-5 sein!',
                        },
                        required: {
                            value: true,
                            message: 'Rating ist erforderlich!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="rabatt"
                    label="Rabatt %"
                    error={errors.rabatt?.message}
                    className="form-control"
                    type="number"
                    id="rabatt"
                    placeholder="Rabatt %"
                    rest={register('rabatt', {
                        pattern: {
                            value: /^100$|^100.00$|^\d{0,2}(\.\d{1,2})? *%?$/,
                            message:
                                'Rabatt muss zwischen 0-100 sein (mit max. 2 Nachkommastellen)!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="erscheinungsdatum"
                    label="Erscheinungsdatum"
                    error={errors.datum?.message}
                    className="form-control"
                    type="date"
                    id="erscheinungsdatum"
                    placeholder="Erscheinungsdatum"
                    rest={register('datum', {
                        valueAsDate: true,
                        required: {
                            value: true,
                            message: 'Erscheinungsdatum ist erforderlich!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="homepage"
                    label="Homepage"
                    error={errors.homepage?.message}
                    className="form-control"
                    type="text"
                    id="homepage"
                    placeholder="Homepage"
                    rest={register('homepage', {
                        pattern: {
                            value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                            message: 'Homepage ist ungültig!',
                        },
                        required: {
                            value: true,
                            message: 'Homepage ist erforderlich!',
                        },
                    })}
                />
                <h2 {...styles.category()}>Buchart</h2>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="druckausgabe"
                        value={'Druckausgabe'}
                        {...register('art')}
                        defaultChecked
                    />
                    <label className="form-check-label" htmlFor="druckausgabe">
                        Druckausgabe
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="kindle"
                        value={'Kindle'}
                        {...register('art')}
                    />
                    <label className="form-check-label" htmlFor="kindle">
                        Kindle
                    </label>
                </div>
                <h2 {...styles.category()}>Lieferbar</h2>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="lieferbar"
                        value={'true'}
                        {...register('lieferbar')}
                        defaultChecked
                    />
                    <label htmlFor="lieferbar" className="form-check-label">
                        Ja
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="nichtLieferbar"
                        value={'false'}
                        {...register('lieferbar')}
                    />
                    <label
                        htmlFor="nichtLieferbar"
                        className="form-check-label"
                    >
                        Nein
                    </label>
                </div>
                <h2 {...styles.category()}>Schlagwörter</h2>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={'JAVASCRIPT'}
                        {...register('schlagwoerter')}
                    />
                    <label htmlFor="javascript" className="form-check-label">
                        JavaScript
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value="TYPESCRIPT"
                        {...register('schlagwoerter')}
                    />
                    <label htmlFor="typescript" className="form-check-label">
                        TypeScript
                    </label>
                </div>
                <button type="submit" {...styles.submitButton()}>
                    Buch anlegen
                </button>
                {response ? (
                    <div className="alert alert-success" role="alert">
                        Buch: {response} wurde erfolgreich angelegt!
                    </div>
                ) : null}
                {error ? (
                    <div>
                        <ErrorBannerComponent message={error} />
                    </div>
                ) : null}
            </form>
        </div>
    );
}

const styles: ExtendedStyleProps = {
    submitButton: () => ({
        className: 'btn',
        style: {
            backgroundColor: 'var(--color-main)',
            color: 'var(--color-white)',
            marginTop: 'var(--gap-2)',
            marginBottom: 'var(--gap-2)',
        },
    }),
    title: () => ({
        style: {
            fontSize: 'var(--font-extra-large-size)',
            fontWeight: '600',
            justifySelf: 'center',
            marginBottom: 'var(--gap-2)',
            marginTop: 'var(--gap-4)',
        },
    }),
    category: () => ({
        style: {
            fontSize: 'var(--font-large-size)',
            fontWeight: '600',
            justifySelf: 'center',
            marginBottom: 'var(--gap-1)',
            marginTop: 'var(--gap-2)',
        },
    }),
};
