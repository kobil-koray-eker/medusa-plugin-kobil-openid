import {
  ConfigModule,
  MedusaContainer,
} from "@medusajs/medusa/dist/types/global";
import { Router } from "express";
import {
  KobilOptions,
  KOBIL_ADMIN_STRATEGY_NAME,
  KOBIL_STORE_STRATEGY_NAME,
} from "../kobil-strategies/auth0";

export const CUSTOMER_METADATA_KEY = "useSocialAuth";
export const AUTH_PROVIDER_KEY = "authProvider";

export const TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;

export type StrategyExport = {
  load: (
    container: MedusaContainer,
    configModule: ConfigModule,
    options?: unknown
  ) => void;
  getRouter?: (configModule: ConfigModule, options: AuthOptions) => Router[];
};

export type AuthOptions = {
  kobil?: KobilOptions;
};

export type StrategyErrorIdentifierType = keyof AuthOptions;
export type StrategyNames = {
  [key in StrategyErrorIdentifierType]: {
    admin: string;
    store: string;
  };
};

export const strategyNames: StrategyNames = {
  kobil: {
    admin: KOBIL_ADMIN_STRATEGY_NAME,
    store: KOBIL_STORE_STRATEGY_NAME,
  },
};
