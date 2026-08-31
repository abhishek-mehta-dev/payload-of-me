import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiStripe,
  SiTypescript,
  SiTailwindcss,
  SiReactquery,
  SiReacthookform,
  SiZod,
  SiNestjs,
  SiPrisma,
  SiPostgresql,
  SiPaypal,
  SiAmazonwebservices,
  SiNginx,
  SiJsonwebtokens,
  SiSwagger,
  SiPuppeteer,
  SiRedis,
  SiSocketdotio,
  SiFirebase,
  SiGooglemaps,
  SiMysql,
  SiOpenai,
  SiAxios,
  SiGithubactions,
  SiVercel,
  SiFastapi,
  SiLangchain,
  SiHuggingface,
  SiWebflow,
  SiPm2,
  SiTypeorm,
  SiOpenapiinitiative,
  SiChartdotjs,
} from "react-icons/si";
import { Code2, Server, Radio, FileText, Cpu, Cloud, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TechMeta = {
  icon: IconType | LucideIcon;
  color: string;
};

/** Normalize labels so "React.js" / "React" / "Nest.js" resolve the same. */
function keyOf(name: string) {
  return name
    .toLowerCase()
    .replace(/\.js$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

const TECH_MAP: Record<string, TechMeta> = {
  react: { icon: SiReact, color: "#61DAFB" },
  "next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  next: { icon: SiNextdotjs, color: "#FFFFFF" },
  node: { icon: SiNodedotjs, color: "#339933" },
  "node.js": { icon: SiNodedotjs, color: "#339933" },
  express: { icon: SiExpress, color: "#888888" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  "stripe api": { icon: SiStripe, color: "#635BFF" },
  "plivo verify api": { icon: Phone, color: "#00A651" },
  plivo: { icon: Phone, color: "#00A651" },
  "stripe connect": { icon: SiStripe, color: "#635BFF" },
  stripe: { icon: SiStripe, color: "#635BFF" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  "tailwind css": { icon: SiTailwindcss, color: "#06B6D4" },
  "tanstack react query": { icon: SiReactquery, color: "#FF4154" },
  "tanstack query": { icon: SiReactquery, color: "#FF4154" },
  "react hook form": { icon: SiReacthookform, color: "#EC5990" },
  zod: { icon: SiZod, color: "#3E67B1" },
  nestjs: { icon: SiNestjs, color: "#E0234E" },
  "nest.js": { icon: SiNestjs, color: "#E0234E" },
  "prisma orm": { icon: SiPrisma, color: "#2D3748" },
  prisma: { icon: SiPrisma, color: "#2D3748" },
  postgresql: { icon: SiPostgresql, color: "#336791" },
  "paypal api": { icon: SiPaypal, color: "#00457C" },
  paypal: { icon: SiPaypal, color: "#00457C" },
  "hls.js": { icon: Radio, color: "#7eb8f0" },
  "aws s3": { icon: SiAmazonwebservices, color: "#FF9900" },
  "aws cloudfront": { icon: Cloud, color: "#8C4FFF" },
  nginx: { icon: SiNginx, color: "#009639" },
  "jwt authentication": { icon: SiJsonwebtokens, color: "#000000" },
  jwt: { icon: SiJsonwebtokens, color: "#000000" },
  "swagger/openapi": { icon: SiSwagger, color: "#85EA2D" },
  swagger: { icon: SiSwagger, color: "#85EA2D" },
  puppeteer: { icon: SiPuppeteer, color: "#40B5A4" },
  typeorm: { icon: SiTypeorm, color: "#FE3824" },
  redis: { icon: SiRedis, color: "#DC382D" },
  "socket.io": { icon: SiSocketdotio, color: "#010101" },
  "firebase admin": { icon: SiFirebase, color: "#FFCA28" },
  firebase: { icon: SiFirebase, color: "#FFCA28" },
  "google maps api": { icon: SiGooglemaps, color: "#4285F4" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  "openai api (gpt-4o-mini, whisper, moderation)": {
    icon: SiOpenai,
    color: "#10A37F",
  },
  openai: { icon: SiOpenai, color: "#10A37F" },
  recharts: { icon: SiChartdotjs, color: "#22B5BF" },
  "node-cron": { icon: Server, color: "#7eb8f0" },
  axios: { icon: SiAxios, color: "#5A29E4" },
  "github actions": { icon: SiGithubactions, color: "#2088FF" },
  vercel: { icon: SiVercel, color: "#FFFFFF" },
  pm2: { icon: SiPm2, color: "#2B037A" },
  "server-sent events (sse)": { icon: Radio, color: "#7eb8f0" },
  nodemailer: { icon: FileText, color: "#7eb8f0" },
  fastapi: { icon: SiFastapi, color: "#009688" },
  langchain: { icon: SiLangchain, color: "#1C3C3C" },
  "hugging face": { icon: SiHuggingface, color: "#FFD21E" },
  pymupdf: { icon: FileText, color: "#7eb8f0" },
  faiss: { icon: Cpu, color: "#7eb8f0" },
  "bubble.io": { icon: Code2, color: "#1474ff" },
  webflow: { icon: SiWebflow, color: "#4353FF" },
  "rest api": { icon: SiOpenapiinitiative, color: "#6BA539" },
};

const FALLBACK: TechMeta = { icon: Code2, color: "var(--brand)" };

export function getTechMeta(name: string): TechMeta {
  const k = keyOf(name);
  return (
    TECH_MAP[k] ||
    TECH_MAP[k.replace(/\.js$/, "")] ||
    TECH_MAP[name.toLowerCase()] ||
    FALLBACK
  );
}
