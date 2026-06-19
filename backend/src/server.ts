import Fastify from "fastify";
import cors from "@fastify/cors";
import { env } from "./shared/env/env.js";
import { healthRoute } from "./shared/health/health.route.js";
import { propertyRoute } from "./features/property/property.route.js";
import { guidebookRoute } from "./features/guidebook/guidebook.route.js";

async function buildServer() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  await app.register(healthRoute);
  await app.register(propertyRoute);
  await app.register(guidebookRoute);

  return app;
}

async function start() {
  const app = await buildServer();

  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
