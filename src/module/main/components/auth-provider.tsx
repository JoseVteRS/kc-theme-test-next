"use client"

import { memo, useMemo } from 'react';
import type { AuthProviderProps } from 'react-oidc-context';
import { AuthProvider as OIAuthProvider } from 'react-oidc-context';
import { useRouter } from 'next/navigation';
import { WebStorageStateStore } from 'oidc-client-ts';
import { FCWithChildren } from '../../shared/utils/component.interface';


export const AuthProvider: FCWithChildren<unknown> = memo(({ children }) => {
  const { protocol, hostname, port, pathname } = window.location;
  const navigate = useRouter();
  const redirectUri = `${protocol}//${hostname}${port ? `:${port}` : ''}${pathname}`;

  const oidcConfig = useMemo(
    (): AuthProviderProps => ({
      authority: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}`,
      client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
      redirect_uri: redirectUri,
      scope: `openid ${process.env.NEXT_PUBLIC_TENANT_ID}`,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      onSigninCallback() {
        const searchParams = new URLSearchParams(window.location.search);

        searchParams.delete('state');
        searchParams.delete('session_state');
        searchParams.delete('code');

        navigate.push(window.location.pathname);
      },
      automaticSilentRenew: false,
      accessTokenExpiringNotificationTimeInSeconds: 30,
    }),
    [redirectUri, navigate],
  );

  return <OIAuthProvider {...oidcConfig}>{children}</OIAuthProvider>;
});

AuthProvider.displayName = 'AuthProvider';
