module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/projects/open-plugin/docs/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/18966__pnpm_284cb6e8._.js",
  "chunks/[root-of-the-server]__66e9ea73._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/projects/open-plugin/docs/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];