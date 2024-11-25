import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { defineConfig } from "vitepress";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "../../dist/index.d.ts");
const fileContent = fs.readFileSync(filePath, "utf8");

export default defineConfig({
    title: "Mach2",
    lastUpdated: true,
    cleanUrls: true,
    description: "A speedy, lightweight, and typesafe canvas rendering and lifecycle management library.",
    themeConfig: {
        editLink: {
            pattern: "https://github.com/TheCommieAxolotl/mach2/edit/main/docs/:path",
        },
        footer: {
            message: "Made with ❤️ by TheCommieAxolotl",
            copyright: "Copyright © 2024 TheCommieAxolotl, Released under the GPL-3.0 License.",
        },
        nav: [
            { text: "Home", link: "/" },
            { text: "Get Started", link: "/intro/get-started" },
        ],
        sidebar: [
            {
                text: "Introduction",
                items: [
                    { text: "Get Started", link: "/intro/get-started" },
                    { text: "Basics", link: "/intro/basics" },
                ],
            },
            {
                text: "Graphing",
                items: [
                    { text: "Functions", link: "/graphing/functions" },
                    { text: "Dealing with Coordinates", link: "/graphing/coordinates" },
                    { text: "Vectors", link: "/graphing/vectors" },
                    { text: "Polynomials", link: "/graphing/polynomials" },
                    { text: "Superellipses", link: "/graphing/superellipses" },
                ],
            },
        ],
        socialLinks: [{ icon: "github", link: "https://github.com/TheCommieAxolotl/mach2" }],
    },
    vite: {
        resolve: {
            alias: {
                mach2: path.resolve(__dirname, "../../src"),
                "~": path.resolve(__dirname, "../../src"),
            },
        },
    },
    markdown: {
        math: true,
        codeTransformers: [
            transformerTwoslash({
                explicitTrigger: false,
                twoslashOptions: {
                    extraFiles: {
                        "mach2.ts": fileContent,
                    },
                },
            }),
        ],
    },
});
