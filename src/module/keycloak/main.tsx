"use client"

import type { FunctionComponent } from 'react';
import type { KcContext } from './config/context';
import { kcContext } from './config/context';
import { Login } from './components/login';
import { Error } from './components/error';

export interface IKeycloakMainProps {
    kcContext: KcContext;
}

const Entry: FunctionComponent<IKeycloakMainProps> = ({ kcContext }) => {
    switch (kcContext.pageId) {
        case 'login.ftl':
            return <Login kcContext={kcContext} />;
        case 'error.ftl':
            return <Error kcContext={kcContext} />;
        default:
            return <h3>Unsupported custom page type (to be implemented): {kcContext.pageId}</h3>;
    }
};

export const KeycloakMain = () => {
    if (!kcContext) {
        throw new Error('Keycloak main initialized with no keycloak context');
    }

    return <Entry kcContext={kcContext} />;
};
