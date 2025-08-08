

import type { FormEventHandler, FunctionComponent } from 'react';
import { useState, useCallback } from 'react';
import type { KcContextBase } from '../config/context-base';

export interface ILoginProps {
    kcContext: KcContextBase.Login;
}

export const Login: FunctionComponent<ILoginProps> = ({ kcContext }) => {
    const { url } = kcContext;
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
        <form
            id="kc-form-login"
            action={url.loginAction}
            method="post"
            onSubmit={onSubmit}
            className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
        >
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6" id="login-form.login.title">Custom Login</h1>
            {kcContext.message && (
                <>
                    <p className="text-sm text-gray-600 mb-2">{kcContext.message?.summary}</p>
                    <p className="text-xs text-gray-500 mb-4">{kcContext.message.type}</p>
                </>
            )}

            <div className="mb-4">
                <label htmlFor="email" id="login.email.label" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="off"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" id="login.password.label" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={isLoginButtonDisabled}
            >
                <p id="login.button.label">Log In</p>
            </button>
        </form>
    );
};
