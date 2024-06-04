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
import { BuchUpdateModell, Buch } from '@/api/buch';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { ErrorBannerComponent } from '@/components/shared/ErrorBannerComponent';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';
import { useParams, useRouter } from 'next/navigation';
import { InputFieldValidationComponent } from '@/components/shared/InputFieldValidationComponent';
import { LoadingComponent } from '@/components/shared/LoadingComponent';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Update() {
    const { register, handleSubmit, formState, reset, setValue } =
        useForm<BuchUpdateModell>({ mode: 'onBlur' });
    const { id } = useParams<{ id: string }>();
    const { errors } = formState;
    const [response, setResponse] = useState<string | undefined>(undefined);
    const [errorUpdate, setErrorUpdate] = useState<string | undefined>(
        undefined,
    );
    const router = useRouter();
    const appContext = useApplicationContextApi();

    const {
        data: buch,
        error,
        isLoading,
    } = useSWR<Buch, string>(`${id}`, () => appContext.getBuchById(Number(id)));

    const toRabatt = (rabatt: string | undefined): number => {
        if (rabatt === undefined) return 0;
        const clear = rabatt.replace('%', '');
        return Number(clear);
    };

    const DateToString = (date: Date | undefined): string => {
        if (date === undefined) return '';
        return new Intl.DateTimeFormat('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);
    };
    const BooleanToString = (lieferbar: boolean): string =>
        lieferbar ? 'true' : 'false';

    useEffect(() => {
        if (buch === undefined) return;
        setValue('schlagwoerter', buch.schlagwoerter);
        setValue('art', buch.art);
        setValue('lieferbar', BooleanToString(buch.lieferbar));
        setValue('isbn', buch.isbn);
        setValue('preis', buch.preis);
        setValue('rating', buch.rating);
        setValue('rabatt', toRabatt(buch.rabatt));
        setValue('homepage', buch.homepage);
    }, [buch, setValue]);

    const onSubmit = async (data: BuchUpdateModell) => {
        setResponse(undefined);
        setErrorUpdate(undefined);
        if (buch === undefined) return;
        data.id = buch?.id.toString();
        data.version = buch?.version;
        console.log('Form submitted', data);
        try {
            await appContext.updateBuch(data);
            setResponse(buch?.titel);
            reset();
            router.push(`/buecher/${id}`);
        } catch (err) {
            console.log(err);
            setErrorUpdate((err as Error).message);
        }
    };

    if (isLoading)
        return <LoadingComponent message={'Buchdaten werden geladen'} />;

    if (error !== undefined) return <ErrorBannerComponent message={error} />;

    return (
        <div className="container">
            <h1 {...styles.title()}>Buch: {buch?.titel} ändern</h1>
            <span {...styles.info()}>
                Titel und Untertitel können nicht geändert werden!
            </span>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputFieldValidationComponent
                    htmlforlabel="isbn"
                    label="ISBN"
                    error={errors.isbn?.message}
                    className="form-control"
                    type="text"
                    id="isbn"
                    placeholder="ISBN"
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
                    type="text"
                    id="erscheinungsdatum"
                    placeholder="Erscheinungsdatum"
                    defaultValue={DateToString(buch?.datum)}
                    rest={register('datum', {
                        required: {
                            value: true,
                            message: 'Erscheinungsdatum ist erforderlich!',
                        },
                        pattern: {
                            value: /^[0-3]?[0-9][/.][0-3]?[0-9][/.](?:[0-9]{2})?[0-9]{2}$/,
                            message: 'Datum ist ungültig!',
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
                        value={'DRUCKAUSGABE'}
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
                        value={'KINDLE'}
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
                    Buch ändern
                </button>
                {response ? (
                    <div className="alert alert-success" role="alert">
                        Buch: {response} wurde erfolgreich geändert!
                    </div>
                ) : null}
                {errorUpdate ? (
                    <div>
                        <ErrorBannerComponent message={errorUpdate} />
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
            marginBottom: 'var(--gap-0)',
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
    info: () => ({
        className: 'badge rounded-pill text-bg-warning',
        style: {
            marginBottom: 'var(--gap-2)',
            marginTop: 'var(--gap-0)',
        },
    }),
};
