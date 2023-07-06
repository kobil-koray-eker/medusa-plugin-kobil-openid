import {
  ConfigModule,
  MedusaContainer,
} from "@medusajs/medusa/dist/types/global";
import { AuthOptions, StrategyExport } from "../../types";
import { Router } from "express";
import { getKobilAdminAuthRouter, KobilAdminStrategy } from "./admin";
import { getKobilStoreAuthRouter, KobilStoreStrategy } from "./store";

export * from "./admin";
export * from "./store";
export * from "./types";

export default {
  load: (
    container: MedusaContainer,
    configModule: ConfigModule,
    options: AuthOptions
  ): void => {
    if (options.kobil?.admin) {
      new KobilAdminStrategy(container, configModule, options.kobil);
    }

    if (options.kobil?.store) {
      new KobilStoreStrategy(container, configModule, options.kobil);
    }
  },
  getRouter: (configModule: ConfigModule, options: AuthOptions): Router[] => {
    const routers = [];

    if (options.kobil?.admin) {
      routers.push(getKobilAdminAuthRouter(options.kobil, configModule));
    }

    if (options.kobil?.store) {
      routers.push(getKobilStoreAuthRouter(options.kobil, configModule));
    }

    return routers;
  },
} as StrategyExport;
