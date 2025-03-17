"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_fastify = __toESM(require("fastify"));
var import_client = require("@prisma/client");
var app = (0, import_fastify.default)();
var prisma = new import_client.PrismaClient();
app.post("/test", async () => {
  await prisma.user.create({
    data: {
      name: "Henrique",
      email: "henriquearaujotomaz@fagammon.edu.br",
      category: "admin",
      password_hash: "duannes8"
    }
  });
});

// src/env/index.ts
var import_config = require("dotenv/config");
var z = __toESM(require("zod"));
var envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "prod"]),
  PORT: z.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  throw new Error("invalid environment variable");
}
var env = _env.data;

// src/server.ts
app.listen({
  port: env.PORT
}).then(() => {
  console.log("HTTP Server Running");
}).catch(() => {
  console.log("Server Error");
});
