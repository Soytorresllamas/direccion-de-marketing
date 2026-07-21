#!/usr/bin/env node
// Post-proceso del bundle (trampas 5.1 y 5.2 de CONTEXTO-CLAUDE-CODE.md):
//   1. Convierte el <script type="module"> a script clásico (con o sin comillas).
//      Con type=module la página sale EN BLANCO por file:// y tras StatiCrypt.
//   2. Inyecta las fuentes de Google (Newsreader + Hanken Grotesk) después de </title>.
//      No pueden ir en index.html porque html-inline intenta leerlas como archivo local.
// Uso: node scripts/postprocess-bundle.mjs  (lee bundle_mod.html, escribe bundle.html)

import { readFileSync, writeFileSync } from "node:fs";

const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,500&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">';

let html = readFileSync("bundle_mod.html", "utf8");

const antes = html.length;
html = html.replace(/<script\s+type=(?:"module"|'module'|module)\s*>/g, "<script>");
if (/<script\s+type=/.test(html)) throw new Error("Quedó un <script type=...> sin convertir");

if (!html.includes("</title>")) throw new Error("No encontré </title> para inyectar las fuentes");
if (!html.includes("fonts.googleapis.com")) html = html.replace("</title>", "</title>" + FONTS);

if (html.length < 300000) throw new Error(`Bundle sospechosamente chico (${html.length} bytes): ¿html-inline falló?`);

writeFileSync("bundle.html", html);
console.log(`bundle.html listo: ${html.length} bytes (bundle_mod: ${antes}).`);
