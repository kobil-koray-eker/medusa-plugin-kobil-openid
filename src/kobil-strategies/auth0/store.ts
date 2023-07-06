import { Router } from "express";
import {
  ConfigModule,
  MedusaContainer,
} from "@medusajs/medusa/dist/types/global";
import { Strategy as KobilStrategy } from "passport-oauth2";
import {
  KobilOptions,
  Profile,
  ExtraParams,
  KOBIL_STORE_STRATEGY_NAME,
} from "./types";
import { PassportStrategy } from "../../core/passport/Strategy";
import { validateStoreCallback } from "../../core/validate-callback";
import { passportAuthRoutesBuilder } from "../../core/passport/utils/auth-routes-builder";
import jwt_decode from "jwt-decode";

export class KobilStoreStrategy extends PassportStrategy(
  KobilStrategy,
  KOBIL_STORE_STRATEGY_NAME
) {
  constructor(
    protected readonly container: MedusaContainer,
    protected readonly configModule: ConfigModule,
    protected readonly strategyOptions: KobilOptions
  ) {
    super({
      authorizationURL: strategyOptions.authorizationURL,
      tokenURL: strategyOptions.tokenURL,
      clientID: strategyOptions.clientID,
      clientSecret: strategyOptions.clientSecret,
      callbackURL: strategyOptions.store.callbackUrl,
    });
  }

  async validate(
    // req: Request,
    req: string,
    accessToken: string,
    refreshToken: string,
    extraParams: ExtraParams,
    profile: Profile
  ): Promise<null | { id: string; accessToken?: string; req?: string }> {
    const decoded = jwt_decode<any>(req);

    const kobilProfile: Profile = {
      emails: [
        {
          value: decoded.email,
        },
      ],
      name: {
        givenName: decoded.given_name,
        familyName: decoded.family_name,
      },
      id: decoded.sub,
    };

    // if (this.strategyOptions.store.verifyCallback) {
    //   const validateRes = await this.strategyOptions.store.verifyCallback(
    // this.container,
    //     req,
    //     accessToken,
    //     refreshToken,
    //     extraParams,
    //     profile
    //   );

    //   console.log("validateRes", validateRes);

    //   return {
    //     ...validateRes,
    //     accessToken,
    //     req
    //   };
    // }
    const validateRes = await validateStoreCallback(kobilProfile, {
      container: this.container,
      strategyErrorIdentifier: "kobil",
    });
    return {
      ...validateRes,
      accessToken,
      req,
    };
  }
}

/**
 * Return the router that holds the auth0 store authentication routes
 * @param auth0
 * @param configModule
 */
export function getKobilStoreAuthRouter(
  kobil: KobilOptions,
  configModule: ConfigModule
): Router {
  return passportAuthRoutesBuilder({
    domain: "store",
    configModule,
    authPath: kobil.store.authPath ?? "/store/auth/kobil",
    authCallbackPath: kobil.store.authCallbackPath ?? "/store/auth/kobil/cb",
    successRedirect: kobil.store.successRedirect,
    strategyName: KOBIL_STORE_STRATEGY_NAME,
    passportAuthenticateMiddlewareOptions: {
      scope: "openid",
    },
    passportCallbackAuthenticateMiddlewareOptions: {
      failureRedirect: kobil.store.failureRedirect,
    },
    expiresIn: kobil.store.expiresIn,
  });
}
