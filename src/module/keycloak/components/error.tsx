

import type { FormEventHandler, FunctionComponent } from 'react';
import { useState, useCallback } from 'react';
import type { KcContextBase } from '../config/context-base';

export interface IErrorProps {
    kcContext: KcContextBase.Error;
}

export const Error: FunctionComponent<IErrorProps> = ({ kcContext }) => {
    const { message } = kcContext;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (e) => {
            e.preventDefault();
            setIsLoginButtonDisabled(true);

            const formElement = e.target as HTMLFormElement;

            // Rename email to username
            const emailInput = formElement.querySelector("input[name='email']");
            if (emailInput) {
                emailInput.setAttribute('name', 'username');
            }

            // Submit the form
            formElement.submit();
        },
        [],
    );

    if (!kcContext) {
        return null;
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{kcContext.realm.displayName}</h2>
                <h3 className="text-lg font-semibold text-red-600 mb-4">Error de Autenticación</h3>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h4 className="text-sm font-medium text-red-800 mb-1">Detalles del Error</h4>
                        <p className="text-sm text-red-700 mb-2">{message.summary}</p>
                        <p className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded inline-block">Tipo: {message.type}</p>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={() => window.history.back()}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mr-3"
                >
                    Volver
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                    Reintentar
                </button>
            </div>
        </div>
    );
};
