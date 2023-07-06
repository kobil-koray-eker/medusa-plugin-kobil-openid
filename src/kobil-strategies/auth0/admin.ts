import { Strategy as KobilStrategy } from "passport-oauth2";
import {
  ConfigModule,
  MedusaContainer,
} from "@medusajs/medusa/dist/types/global";
import { Router } from "express";
import {
  KOBIL_ADMIN_STRATEGY_NAME,
  KobilOptions,
  Profile,
  ExtraParams,
} from "./types";
import { PassportStrategy } from "../../core/passport/Strategy";
import { validateAdminCallback } from "../../core/validate-callback";
import { passportAuthRoutesBuilder } from "../../core/passport/utils/auth-routes-builder";

export class KobilAdminStrategy extends PassportStrategy(
  KobilStrategy,
  KOBIL_ADMIN_STRATEGY_NAME
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
    req: Request,
    accessToken: string,
    refreshToken: string,
    extraParams: ExtraParams,
    profile: Profile
  ): Promise<null | { id: string; accessToken: string }> {
    if (this.strategyOptions.admin.verifyCallback) {
      const validateRes = await this.strategyOptions.admin.verifyCallback(
        this.container,
        req,
        accessToken,
        refreshToken,
        extraParams,
        profile
      );

      return {
        ...validateRes,
        accessToken,
      };
    }
    const validateRes = await validateAdminCallback(profile, {
      container: this.container,
      strategyErrorIdentifier: "kobil",
    });
    return {
      ...validateRes,
      accessToken,
    };
  }
}

/**
 * Return the router that holds the auth0 admin authentication routes
 * @param auth0
 * @param configModule
 */
export function getKobilAdminAuthRouter(
  kobil: KobilOptions,
  configModule: ConfigModule
): Router {
  return passportAuthRoutesBuilder({
    domain: "admin",
    configModule,
    authPath: kobil.admin.authPath ?? "/admin/auth/kobil",
    authCallbackPath: kobil.admin.authCallbackPath ?? "/admin/auth/kobil/cb",
    successRedirect: kobil.admin.successRedirect,
    strategyName: KOBIL_ADMIN_STRATEGY_NAME,
    passportAuthenticateMiddlewareOptions: {
      scope: "openid",
    },
    passportCallbackAuthenticateMiddlewareOptions: {
      failureRedirect: kobil.admin.failureRedirect,
    },
    expiresIn: kobil.admin.expiresIn,
  });
}
