import {
  ConfigModule,
  MedusaContainer,
} from "@medusajs/medusa/dist/types/global";
import { AuthOptions } from "../types";
import KobilStrategy from "../kobil-strategies/auth0";

export default async function authStrategiesLoader(
  container: MedusaContainer,
  authOptions: AuthOptions
) {
  const configModule = container.resolve("configModule") as ConfigModule;

  KobilStrategy.load(container, configModule, authOptions);
}
