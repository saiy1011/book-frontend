'use client';
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { CenteredSectionComponent } from '@/components/shared/CenteredSectionComponent';
import InputFieldComponent from '@/components/shared/InputFieldComponent';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { LoginDaten } from '@/api/auth';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';
import { ErrorBannerComponent } from '@/components/shared/ErrorBannerComponent';
import { LoadingComponent } from '@/components/shared/LoadingComponent';

export const LoginComponent: React.FC = () => {
    const appContext = useApplicationContextApi();

    const { isSmall } = useMediaQuery();

    const [loginDaten, setLoginDaten] = useState<LoginDaten>({
        username: '',
        password: '',
    });

    const [isInputValid, setIsInputValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] =
        useState<boolean>(false);

    useEffect(() => {
        const validateInput = () => {
            if (
                loginDaten.username === '' ||
                loginDaten.password === '' ||
                !termsAndConditionsAccepted
            ) {
                setIsInputValid(false);
                return;
            }
            setIsInputValid(true);
        };
        validateInput();
    }, [loginDaten, termsAndConditionsAccepted]);

    const handleChange = (e: any) => {
        setLoginDaten((prevState) => ({
            ...prevState,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async () => {
        setIsLoading(true);
        setError(undefined);

        try {
            await appContext.login(loginDaten);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CenteredSectionComponent>
            <div {...styles.loginContainer()}>
                <div {...styles.content(isSmall)}>
                    <div {...styles.cardTitle()}>Anmeldung</div>
                    <div {...styles.inputFieldListContainer()}>
                        <InputFieldComponent
                            label={'Benutzername'}
                            name={'username'}
                            type={'text'}
                            placeholder={'zB: admin'}
                            value={loginDaten?.username}
                            onChange={handleChange}
                        />
                        <InputFieldComponent
                            label={'Passwort'}
                            name={'password'}
                            type={'password'}
                            placeholder={'zB: p'}
                            value={loginDaten?.password}
                            onChange={handleChange}
                        />

                        <div {...styles.checkboxContainer()}>
                            <input
                                type="checkbox"
                                id="termsAndConditions"
                                defaultChecked={termsAndConditionsAccepted}
                                {...styles.checkboxInput()}
                                onClick={() =>
                                    setTermsAndConditionsAccepted(
                                        !termsAndConditionsAccepted,
                                    )
                                }
                            />
                            <label
                                htmlFor="termsAndConditions"
                                {...styles.checkboxLabel()}
                            >
                                Ich habe die AGBs gelesen, verstanden und stimme
                                zu
                            </label>
                        </div>

                        {isLoading ? (
                            <LoadingComponent
                                message={
                                    'Sie werden angemeldet. Haben Sie Geduld.'
                                }
                            />
                        ) : null}
                        {error ? (
                            <ErrorBannerComponent message={error} />
                        ) : null}
                    </div>

                    <button
                        type="button"
                        {...styles.submitButton()}
                        onClick={handleLogin}
                        disabled={!isInputValid || isLoading}
                    >
                        Anmelden
                    </button>
                </div>
            </div>
        </CenteredSectionComponent>
    );
};

const styles: ExtendedStyleProps = {
    loginContainer: () => ({
        style: {
            display: 'grid',
            alignItems: 'start',
            alignContent: 'start',
            justifyItems: 'center',
            padding: 'var(--padding-10) var(--padding-2) 0 var(--padding-2)',
        },
    }),

    content: (isScreenSmall: boolean) => ({
        style: {
            display: 'grid',
            alignItems: 'start',
            alignContent: 'start',
            boxShadow: '0 0 10px grey',
            padding: 'var(--padding-3) var(--padding-2)',
            minWidth: `${isScreenSmall ? '100%' : '30%'}`,
            borderRadius: 'var(--gap-1)',
        },
    }),

    cardTitle: () => ({
        style: {
            fontSize: 'var(--font-extra-large-size)',
            fontWeight: '600',
            justifySelf: 'center',
            marginBottom: 'var(--gap-5)',
        },
    }),

    submitButton: () => ({
        className: 'btn',
        style: {
            backgroundColor: 'var(--color-main)',
            width: '100%',
            color: 'var(--color-white)',
            marginTop: 'var(--gap-2)',
        },
    }),

    inputFieldListContainer: () => ({
        style: {
            display: 'grid',
            gap: 'var(--gap-2)',
        },
    }),

    checkboxContainer: () => ({
        className: 'form-check',
        style: {},
    }),

    checkboxInput: () => ({
        className: 'form-check-input',
        style: {
            color: 'var(--color-main)',
        },
    }),

    checkboxLabel: () => ({
        className: 'form-check-label',
        style: {
            color: 'var(--color-main)',
        },
    }),
};
