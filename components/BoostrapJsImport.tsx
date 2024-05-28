'use client';
import { FunctionComponent, useEffect } from 'react';

export const BoostrapJsImport: FunctionComponent = () => {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);
    return null;
};
