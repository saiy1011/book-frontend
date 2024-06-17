/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { CenteredSectionComponent } from '@/components/shared/CenteredSectionComponent';
import InputFieldComponent from '@/components/shared/InputFieldComponent';
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

    useEffect(() => {
        const validateInput = () => {
            if (loginDaten.username === '' || loginDaten.password === '') {
                setIsInputValid(false);
                return;
            }
            setIsInputValid(true);
        };
        validateInput();
    }, [loginDaten]);

    const handleChange = (e: any) => {
        setLoginDaten((prevState) => ({
            ...prevState,
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
            <div className="container d-flex flex-column align-items-center p-4">
                <div
                    className={`card p-4 shadow-sm ${
                        isSmall ? 'w-100' : 'w-50'
                    }`}
                >
                    <h2 className="card-title text-center mb-4">Anmeldung</h2>
                    <div className="mb-3">
                        <InputFieldComponent
                            label={'Benutzername'}
                            name={'username'}
                            type={'text'}
                            placeholder={''}
                            value={loginDaten?.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <InputFieldComponent
                            label={'Passwort'}
                            name={'password'}
                            type={'password'}
                            placeholder={''}
                            value={loginDaten?.password}
                            onChange={handleChange}
                        />
                    </div>
                    {isLoading && (
                        <LoadingComponent
                            message={'Sie werden angemeldet. Haben Sie Geduld.'}
                        />
                    )}
                    {error && <ErrorBannerComponent message={error} />}
                    <button
                        type="button"
                        className="btn btn-primary w-100 mt-3"
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

export default LoginComponent;
