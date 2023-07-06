import { MedusaContainer } from "@medusajs/medusa/dist/types/global";

export const KOBIL_ADMIN_STRATEGY_NAME = "kobil.admin.medusa-auth-plugin";
export const KOBIL_STORE_STRATEGY_NAME = "kobil.store.medusa-auth-plugin";

export type Profile = {
  emails: { value: string }[];
  name?: { givenName?: string; familyName?: string };
  id?: string;
};
export type ExtraParams = {
  audience?: string | undefined;
  connection?: string | undefined;
  prompt?: string | undefined;
};

export type KobilOptions = {
  clientID: string;
  clientSecret: string;
  authorizationURL: string;
  tokenURL: string;

  admin?: {
    callbackUrl: string;
    successRedirect: string;
    failureRedirect: string;
    /**
     * Default /admin/auth/auth0
     */
    authPath?: string;
    /**
     * Default /admin/auth/auth0/cb
     */
    authCallbackPath?: string;
    /**
     * The default verify callback function will be used if this configuration is not specified
     */
    verifyCallback?: (
      container: MedusaContainer,
      req: Request,
      accessToken: string,
      refreshToken: string,
      extraParams: ExtraParams,
      profile: Profile
    ) => Promise<null | { id: string } | never>;

    expiresIn?: number;
  };
  store?: {
    callbackUrl: string;
    successRedirect: string;
    failureRedirect: string;
    /**
     * Default /store/auth/auth0
     */
    authPath?: string;
    /**
     * Default /store/auth/auth0/cb
     */
    authCallbackPath?: string;
    /**
     * The default verify callback function will be used if this configuration is not specified
     */
    verifyCallback?: (
      container: MedusaContainer,
      req: Request,
      accessToken: string,
      refreshToken: string,
      extraParams: ExtraParams,
      profile: Profile
    ) => Promise<null | { id: string } | never>;

    expiresIn?: number;
  };
};
