import { Router } from "express";
import { ConfigModule } from "@medusajs/medusa/dist/types/global";
import loadConfig from "@medusajs/medusa/dist/loaders/config";
import KobilStrategy from "../kobil-strategies/auth0";
import { AuthOptions } from "../types";

export default function (rootDirectory, pluginOptions: AuthOptions): Router[] {
  const configModule = loadConfig(rootDirectory) as ConfigModule;
  return loadRouters(configModule, pluginOptions);
}

function loadRouters(
  configModule: ConfigModule,
  options: AuthOptions
): Router[] {
  const routers: Router[] = [];

  routers.push(...KobilStrategy.getRouter(configModule, options));

  return routers;
}
