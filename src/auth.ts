import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    KeycloakProvider({
        authorization: {
          url: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/auth`,
          params: {
            scope: `openid ${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}`,
            // response_type: 'code',
          }
        },
        clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
        clientSecret: "",
        issuer: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}`
      })
  ],
})