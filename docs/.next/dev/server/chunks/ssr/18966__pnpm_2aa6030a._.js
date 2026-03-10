module.exports = [
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-mdx@14.2.9_@types+mdast@4.0.4_@types+mdx@2.0.13_@types+react@19.2.14_fumadocs-core@1_kdhzmugxzhi4jrsfjdeek6zbb4/node_modules/fumadocs-mdx/dist/runtime/server.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "server",
    ()=>server,
    "toFumadocsSource",
    ()=>toFumadocsSource
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
//#region src/runtime/server.ts
function server(options = {}) {
    const { doc: { passthroughs: docPassthroughs = [] } = {} } = options;
    function fileInfo(file, base) {
        if (file.startsWith("./")) file = file.slice(2);
        return {
            path: file,
            fullPath: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["join"](base, file)
        };
    }
    function mapDocData(entry) {
        const data = {
            body: entry.default,
            toc: entry.toc,
            structuredData: entry.structuredData,
            _exports: entry
        };
        for (const key of docPassthroughs)data[key] = entry[key];
        return data;
    }
    return {
        async doc (_name, base, glob) {
            return await Promise.all(Object.entries(glob).map(async ([k, v])=>{
                const data = typeof v === "function" ? await v() : v;
                return {
                    ...mapDocData(data),
                    ...data.frontmatter,
                    ...createDocMethods(fileInfo(k, base), ()=>data)
                };
            }));
        },
        async docLazy (_name, base, head, body) {
            return await Promise.all(Object.entries(head).map(async ([k, v])=>{
                const data = typeof v === "function" ? await v() : v;
                const content = body[k];
                return {
                    ...data,
                    ...createDocMethods(fileInfo(k, base), content),
                    async load () {
                        return mapDocData(await content());
                    }
                };
            }));
        },
        async meta (_name, base, glob) {
            return await Promise.all(Object.entries(glob).map(async ([k, v])=>{
                const data = typeof v === "function" ? await v() : v;
                return {
                    info: fileInfo(k, base),
                    ...data
                };
            }));
        },
        async docs (name, base, metaGlob, docGlob) {
            return {
                docs: await this.doc(name, base, docGlob),
                meta: await this.meta(name, base, metaGlob),
                toFumadocsSource () {
                    return toFumadocsSource(this.docs, this.meta);
                }
            };
        },
        async docsLazy (name, base, metaGlob, docHeadGlob, docBodyGlob) {
            return {
                docs: await this.docLazy(name, base, docHeadGlob, docBodyGlob),
                meta: await this.meta(name, base, metaGlob),
                toFumadocsSource () {
                    return toFumadocsSource(this.docs, this.meta);
                }
            };
        }
    };
}
function toFumadocsSource(pages, metas) {
    const files = [];
    for (const entry of pages)files.push({
        type: "page",
        path: entry.info.path,
        absolutePath: entry.info.fullPath,
        data: entry
    });
    for (const entry of metas)files.push({
        type: "meta",
        path: entry.info.path,
        absolutePath: entry.info.fullPath,
        data: entry
    });
    return {
        files
    };
}
function createDocMethods(info, load) {
    return {
        info,
        async getText (type) {
            if (type === "raw") return (await (await __turbopack_context__.A("[externals]/node:fs/promises [external] (node:fs/promises, cjs, async loader)")).readFile(info.fullPath)).toString();
            const data = await load();
            if (typeof data._markdown !== "string") throw new Error("getText('processed') requires `includeProcessedMarkdown` to be enabled in your collection config.");
            return data._markdown;
        },
        async getMDAST () {
            const data = await load();
            if (!data._mdast) throw new Error("getMDAST() requires `includeMDAST` to be enabled in your collection config.");
            return JSON.parse(data._mdast);
        }
    };
}
;
 //# sourceMappingURL=server.js.map
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/normalize-url-DKBxIxO0.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "t",
    ()=>normalizeUrl
]);
//#region src/utils/normalize-url.tsx
/**
* normalize URL into the Fumadocs standard form (`/slug-1/slug-2`).
*
* This includes URLs with trailing slashes.
*/ function normalizeUrl(url) {
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (!url.startsWith("/")) url = "/" + url;
    if (url.length > 1 && url.endsWith("/")) url = url.slice(0, -1);
    return url;
}
;
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/utils-Bc53B3CJ.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>flattenTree,
    "c",
    ()=>visit,
    "i",
    ()=>findSiblings,
    "n",
    ()=>findParent,
    "o",
    ()=>getPageTreePeers,
    "r",
    ()=>findPath,
    "s",
    ()=>getPageTreeRoots,
    "t",
    ()=>findNeighbour
]);
//#region src/page-tree/utils.ts
/**
* Flatten tree to an array of page nodes
*/ function flattenTree(nodes) {
    const out = [];
    for (const node of nodes)if (node.type === "folder") {
        if (node.index) out.push(node.index);
        out.push(...flattenTree(node.children));
    } else if (node.type === "page") out.push(node);
    return out;
}
/**
* Get neighbours of a page, useful for implementing "previous & next" buttons
*/ function findNeighbour(tree, url, options) {
    const { separateRoot = true } = options ?? {};
    const roots = separateRoot ? getPageTreeRoots(tree) : [
        tree
    ];
    if (tree.fallback) roots.push(tree.fallback);
    for (const root of roots){
        const list = flattenTree(root.children);
        const idx = list.findIndex((item)=>item.url === url);
        if (idx === -1) continue;
        return {
            previous: list[idx - 1],
            next: list[idx + 1]
        };
    }
    return {};
}
function getPageTreeRoots(pageTree) {
    const result = pageTree.children.flatMap((child)=>{
        if (child.type !== "folder") return [];
        const roots = getPageTreeRoots(child);
        if (child.root) roots.push(child);
        return roots;
    });
    if (!("type" in pageTree)) result.push(pageTree);
    return result;
}
/**
* Get other **page** nodes that lives under the same parent.
*
* note: folders & its index nodes are not considered, use `findSiblings()` for more control.
*/ function getPageTreePeers(treeOrTrees, url) {
    return findSiblings(treeOrTrees, url).filter((item)=>item.type === "page");
}
/**
* Get other tree nodes that lives under the same parent.
*/ function findSiblings(treeOrTrees, url) {
    if ("children" in treeOrTrees) {
        const parent = findParent(treeOrTrees, url);
        if (!parent) return [];
        return parent.children.filter((item)=>item.type !== "page" || item.url !== url);
    }
    for(const lang in treeOrTrees){
        const result = findSiblings(treeOrTrees[lang], url);
        if (result.length > 0) return result;
    }
    return [];
}
function findParent(from, url) {
    let result;
    visit(from, (node, parent)=>{
        if ("type" in node && node.type === "page" && node.url === url) {
            result = parent;
            return "break";
        }
    });
    return result;
}
/**
* Search the path of a node in the tree matched by the matcher.
*
* @returns The path to the target node (from starting root), or null if the page doesn't exist
*/ function findPath(nodes, matcher, options = {}) {
    const { includeSeparator = true } = options;
    function run(nodes) {
        let separator;
        for (const node of nodes){
            if (matcher(node)) {
                const items = [];
                if (separator) items.push(separator);
                items.push(node);
                return items;
            }
            if (node.type === "separator" && includeSeparator) {
                separator = node;
                continue;
            }
            if (node.type === "folder") {
                const items = node.index && matcher(node.index) ? [
                    node.index
                ] : run(node.children);
                if (items) {
                    items.unshift(node);
                    if (separator) items.unshift(separator);
                    return items;
                }
            }
        }
    }
    return run(nodes) ?? null;
}
const VisitBreak = Symbol("VisitBreak");
/**
* Perform a depth-first search on page tree visiting every node.
*
* @param root - the root of page tree to visit.
* @param visitor - function to receive nodes, return `skip` to skip the children of current node, `break` to stop the search entirely.
*/ function visit(root, visitor) {
    function onNode(node, parent) {
        const result = visitor(node, parent);
        switch(result){
            case "skip":
                return node;
            case "break":
                throw VisitBreak;
            default:
                if (result) node = result;
        }
        if ("index" in node && node.index) node.index = onNode(node.index, node);
        if ("fallback" in node && node.fallback) node.fallback = onNode(node.fallback, node);
        if ("children" in node) for(let i = 0; i < node.children.length; i++)node.children[i] = onNode(node.children[i], node);
        return node;
    }
    try {
        return onNode(root);
    } catch (e) {
        if (e === VisitBreak) return root;
        throw e;
    }
}
;
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/chunk-CaR5F9JI.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "n",
    ()=>__exportAll,
    "r",
    ()=>__toESM,
    "t",
    ()=>__commonJSMin
]);
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod)=>()=>(mod || cb((mod = {
            exports: {}
        }).exports, mod), mod.exports);
var __exportAll = (all, no_symbols)=>{
    let target = {};
    for(var name in all){
        __defProp(target, name, {
            get: all[name],
            enumerable: true
        });
    }
    if (!no_symbols) {
        __defProp(target, Symbol.toStringTag, {
            value: "Module"
        });
    }
    return target;
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for(var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++){
            key = keys[i];
            if (!__hasOwnProp.call(to, key) && key !== except) {
                __defProp(to, key, {
                    get: ((k)=>from[k]).bind(null, key),
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            }
        }
    }
    return to;
};
var __toESM = (mod, isNodeMode, target)=>(target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod));
;
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/path-CX1URXrl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>path_exports,
    "i",
    ()=>joinPath,
    "n",
    ()=>dirname,
    "o",
    ()=>slash,
    "r",
    ()=>extname,
    "s",
    ()=>splitPath,
    "t",
    ()=>basename
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$chunk$2d$CaR5F9JI$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/chunk-CaR5F9JI.js [app-rsc] (ecmascript)");
;
//#region src/source/path.ts
var path_exports = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$chunk$2d$CaR5F9JI$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["n"])({
    basename: ()=>basename,
    dirname: ()=>dirname,
    extname: ()=>extname,
    joinPath: ()=>joinPath,
    slash: ()=>slash,
    splitPath: ()=>splitPath
});
function basename(path, ext) {
    const idx = path.lastIndexOf("/");
    return path.substring(idx === -1 ? 0 : idx + 1, ext ? path.length - ext.length : path.length);
}
function extname(path) {
    const dotIdx = path.lastIndexOf(".");
    if (dotIdx !== -1) return path.substring(dotIdx);
    return "";
}
function dirname(path) {
    return path.split("/").slice(0, -1).join("/");
}
/**
* Split path into segments, trailing/leading slashes are removed
*/ function splitPath(path) {
    return path.split("/").filter((p)=>p.length > 0);
}
/**
* Resolve paths, slashes within the path will be ignored
* @param paths - Paths to join
* @example
* ```
* ['a','b'] // 'a/b'
* ['/a'] // 'a'
* ['a', '/b'] // 'a/b'
* ['a', '../b/c'] // 'b/c'
* ```
*/ function joinPath(...paths) {
    const out = [];
    const parsed = paths.flatMap(splitPath);
    for (const seg of parsed)switch(seg){
        case "..":
            out.pop();
            break;
        case ".":
            break;
        default:
            out.push(seg);
    }
    return out.join("/");
}
function slash(path) {
    if (path.startsWith("\\\\?\\")) return path;
    return path.replaceAll("\\", "/");
}
;
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/source/plugins/slugs.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSlugs",
    ()=>getSlugs,
    "slugsFromData",
    ()=>slugsFromData,
    "slugsPlugin",
    ()=>slugsPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/path-CX1URXrl.js [app-rsc] (ecmascript)");
;
//#region src/source/plugins/slugs.ts
/**
* Generate slugs for pages if missing
*/ function slugsPlugin(slugFn) {
    function isIndex(file) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(file, (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["r"])(file)) === "index";
    }
    return {
        name: "fumadocs:slugs",
        transformStorage ({ storage }) {
            const indexFiles = [];
            const taken = /* @__PURE__ */ new Set();
            for (const path of storage.getFiles()){
                const file = storage.read(path);
                if (!file || file.format !== "page" || file.slugs) continue;
                const customSlugs = slugFn?.(file);
                if (customSlugs === void 0 && isIndex(path)) {
                    indexFiles.push(path);
                    continue;
                }
                file.slugs = customSlugs ?? getSlugs(path);
                const key = file.slugs.join("/");
                if (taken.has(key)) throw new Error(`Duplicated slugs: ${key}`);
                taken.add(key);
            }
            for (const path of indexFiles){
                const file = storage.read(path);
                if (file?.format !== "page") continue;
                file.slugs = getSlugs(path);
                if (taken.has(file.slugs.join("/"))) file.slugs.push("index");
            }
        }
    };
}
/**
* Generate slugs from file data (e.g. frontmatter).
*
* @param key - the property name in file data to generate slugs, default to `slug`.
*/ function slugsFromData(key = "slug") {
    return (file)=>{
        const k = key;
        if (k in file.data && typeof file.data[k] === "string") return file.data[k].split("/").filter((v)=>v.length > 0);
    };
}
const GroupRegex = /^\(.+\)$/;
/**
* Convert file path into slugs, also encode non-ASCII characters, so they can work in pathname
*/ function getSlugs(file) {
    const dir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["n"])(file);
    const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(file, (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["r"])(file));
    const slugs = [];
    for (const seg of dir.split("/"))if (seg.length > 0 && !GroupRegex.test(seg)) slugs.push(encodeURI(seg));
    if (GroupRegex.test(name)) throw new Error(`Cannot use folder group in file names: ${file}`);
    if (name !== "index") slugs.push(encodeURI(name));
    return slugs;
}
;
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/icon-DzOeXioY.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "t",
    ()=>iconPlugin
]);
//#region src/source/plugins/icon.ts
function iconPlugin(resolveIcon) {
    function replaceIcon(node) {
        if (node.icon === void 0 || typeof node.icon === "string") node.icon = resolveIcon(node.icon);
        return node;
    }
    return {
        name: "fumadocs:icon",
        transformPageTree: {
            file: replaceIcon,
            folder: replaceIcon,
            separator: replaceIcon
        }
    };
}
;
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/source/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileSystem",
    ()=>FileSystem,
    "createGetUrl",
    ()=>createGetUrl,
    "loader",
    ()=>loader,
    "multiple",
    ()=>multiple,
    "source",
    ()=>source,
    "update",
    ()=>update
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$normalize$2d$url$2d$DKBxIxO0$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/normalize-url-DKBxIxO0.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$utils$2d$Bc53B3CJ$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/utils-Bc53B3CJ.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/path-CX1URXrl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$source$2f$plugins$2f$slugs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/source/plugins/slugs.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$icon$2d$DzOeXioY$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/icon-DzOeXioY.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
;
;
;
;
//#region src/source/source.ts
function multiple(sources) {
    const out = {
        files: []
    };
    for (const [type, source] of Object.entries(sources))for (const file of source.files)out.files.push({
        ...file,
        data: {
            ...file.data,
            type
        }
    });
    return out;
}
function source(config) {
    return {
        files: [
            ...config.pages,
            ...config.metas
        ]
    };
}
/**
* update a source object in-place.
*/ function update(source) {
    return {
        files (fn) {
            source.files = fn(source.files);
            return this;
        },
        page (fn) {
            for(let i = 0; i < source.files.length; i++){
                const file = source.files[i];
                if (file.type === "page") source.files[i] = fn(file);
            }
            return this;
        },
        meta (fn) {
            for(let i = 0; i < source.files.length; i++){
                const file = source.files[i];
                if (file.type === "meta") source.files[i] = fn(file);
            }
            return this;
        },
        build () {
            return source;
        }
    };
}
//#endregion
//#region src/source/storage/file-system.ts
/**
* In memory file system.
*/ var FileSystem = class {
    constructor(inherit){
        this.files = /* @__PURE__ */ new Map();
        this.folders = /* @__PURE__ */ new Map();
        if (inherit) {
            for (const [k, v1] of inherit.folders)this.folders.set(k, v1);
            for (const [k, v1] of inherit.files)this.files.set(k, v1);
        } else this.folders.set("", []);
    }
    read(path) {
        return this.files.get(path);
    }
    /**
	* get the direct children of folder (in virtual file path)
	*/ readDir(path) {
        return this.folders.get(path);
    }
    write(path, file) {
        if (!this.files.has(path)) {
            const dir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["n"])(path);
            this.makeDir(dir);
            this.readDir(dir)?.push(path);
        }
        this.files.set(path, file);
    }
    /**
	* Delete files at specified path.
	*
	* @param path - the target path.
	* @param [recursive=false] - if set to `true`, it will also delete directories.
	*/ delete(path, recursive = false) {
        if (this.files.delete(path)) return true;
        if (recursive) {
            const folder = this.folders.get(path);
            if (!folder) return false;
            this.folders.delete(path);
            for (const child of folder)this.delete(child);
            return true;
        }
        return false;
    }
    getFiles() {
        return Array.from(this.files.keys());
    }
    makeDir(path) {
        const segments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["s"])(path);
        for(let i = 0; i < segments.length; i++){
            const segment = segments.slice(0, i + 1).join("/");
            if (this.folders.has(segment)) continue;
            this.folders.set(segment, []);
            this.folders.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["n"])(segment)).push(segment);
        }
    }
};
//#endregion
//#region src/source/storage/content.ts
function isLocaleValid(locale) {
    return locale.length > 0 && !/\d+/.test(locale);
}
const parsers = {
    dir (path) {
        const [locale, ...segs] = path.split("/");
        if (locale && segs.length > 0 && isLocaleValid(locale)) return [
            segs.join("/"),
            locale
        ];
        return [
            path
        ];
    },
    dot (path) {
        const dir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["n"])(path);
        const parts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(path).split(".");
        if (parts.length < 3) return [
            path
        ];
        const [locale] = parts.splice(parts.length - 2, 1);
        if (!isLocaleValid(locale)) return [
            path
        ];
        return [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["i"])(dir, parts.join(".")),
            locale
        ];
    },
    none (path) {
        return [
            path
        ];
    }
};
const EmptyLang = Symbol();
/**
* convert input files into virtual file system.
*
* in the storage, locale codes are removed from file paths, hence the same file will have same file paths in every storage.
*/ function createContentStorageBuilder(loaderConfig) {
    const { source, plugins = [], i18n } = loaderConfig;
    const parser = i18n ? parsers[i18n.parser ?? "dot"] : parsers.none;
    const normalized = /* @__PURE__ */ new Map();
    for (const inputFile of source.files){
        let file;
        if (inputFile.type === "page") file = {
            format: "page",
            path: normalizePath(inputFile.path),
            slugs: inputFile.slugs,
            data: inputFile.data,
            absolutePath: inputFile.absolutePath
        };
        else file = {
            format: "meta",
            path: normalizePath(inputFile.path),
            absolutePath: inputFile.absolutePath,
            data: inputFile.data
        };
        const [pathWithoutLocale, locale = i18n ? i18n.defaultLanguage : EmptyLang] = parser(file.path);
        const list = normalized.get(locale) ?? [];
        list.push({
            pathWithoutLocale,
            file
        });
        normalized.set(locale, list);
    }
    function makeStorage(locale, inherit) {
        const storage = new FileSystem(inherit);
        for (const { pathWithoutLocale, file } of normalized.get(locale) ?? [])storage.write(pathWithoutLocale, file);
        const context = {
            storage
        };
        for (const plugin of plugins)plugin.transformStorage?.(context);
        return storage;
    }
    return {
        i18n () {
            const storages = {};
            if (!i18n) return storages;
            const fallbackLang = i18n.fallbackLanguage !== null ? i18n.fallbackLanguage ?? i18n.defaultLanguage : null;
            function scan(lang) {
                if (storages[lang]) return storages[lang];
                return storages[lang] = makeStorage(lang, fallbackLang && fallbackLang !== lang ? scan(fallbackLang) : void 0);
            }
            for (const lang of i18n.languages)scan(lang);
            return storages;
        },
        single () {
            return makeStorage(EmptyLang);
        }
    };
}
/**
* @param path - Relative path
* @returns Normalized path, with no trailing/leading slashes
* @throws Throws error if path starts with `./` or `../`
*/ function normalizePath(path) {
    const segments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["s"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["o"])(path));
    if (segments[0] === "." || segments[0] === "..") throw new Error("It must not start with './' or '../'");
    return segments.join("/");
}
//#endregion
//#region src/source/page-tree/transformer-fallback.ts
function transformerFallback() {
    const addedFiles = /* @__PURE__ */ new Set();
    function shouldIgnore(context) {
        return context.custom?._fallback === true;
    }
    return {
        root (root) {
            if (shouldIgnore(this)) return root;
            const isolatedStorage = new FileSystem();
            if (addedFiles.size === this.storage.files.size) return root;
            for (const file of this.storage.getFiles()){
                if (addedFiles.has(file)) continue;
                isolatedStorage.write(file, this.storage.read(file));
            }
            root.fallback = new PageTreeBuilder(isolatedStorage, {
                idPrefix: this.idPrefix ? `fallback:${this.idPrefix}` : "fallback",
                url: this.getUrl,
                noRef: this.noRef,
                transformers: this.transformers,
                generateFallback: false,
                context: {
                    ...this.custom,
                    _fallback: true
                }
            }).root();
            addedFiles.clear();
            return root;
        },
        file (node, file) {
            if (shouldIgnore(this)) return node;
            if (file) addedFiles.add(file);
            return node;
        },
        folder (node, _dir, metaPath) {
            if (shouldIgnore(this)) return node;
            if (metaPath) addedFiles.add(metaPath);
            return node;
        }
    };
}
//#endregion
//#region src/source/page-tree/builder.ts
const group = /^\((?<name>.+)\)$/;
const link = /^(?<external>external:)?(?:\[(?<icon>[^\]]+)])?\[(?<name>[^\]]+)]\((?<url>[^)]+)\)$/;
const separator = /^---(?:\[(?<icon>[^\]]+)])?(?<name>.+)---|^---$/;
const rest = "...";
const restReversed = "z...a";
const extractPrefix = "...";
const excludePrefix = "!";
var PageTreeBuilder = class {
    constructor(input, options){
        this.flattenPathToFullPath = /* @__PURE__ */ new Map();
        this.transformers = [];
        this.pathToNode = /* @__PURE__ */ new Map();
        this.unfinished = /* @__PURE__ */ new WeakSet();
        this.ownerMap = /* @__PURE__ */ new Map();
        this._nextId = 0;
        const { transformers, url, context, generateFallback = true, idPrefix = "", noRef = false } = options;
        if (transformers) this.transformers.push(...transformers);
        if (generateFallback) this.transformers.push(transformerFallback());
        this.ctx = {
            builder: this,
            idPrefix,
            getUrl: url,
            storage: void 0,
            noRef,
            transformers: this.transformers,
            custom: context
        };
        if (Array.isArray(input)) {
            const [locale, storages] = input;
            this.ctx.storage = this.storage = storages[locale];
            this.ctx.locale = locale;
            this.ctx.storages = storages;
        } else this.ctx.storage = this.storage = input;
        for (const file of this.storage.getFiles()){
            const content = this.storage.read(file);
            const flattenPath = file.substring(0, file.length - (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["r"])(file).length);
            this.flattenPathToFullPath.set(flattenPath + "." + content.format, file);
        }
    }
    resolveFlattenPath(name, format) {
        return this.flattenPathToFullPath.get(name + "." + format) ?? name;
    }
    /**
	* try to register as the owner of `node`.
	*
	* when a node is referenced by multiple folders, this determines which folder they should belong to.
	*
	* @returns whether the owner owns the node.
	*/ own(ownerPath, node, priority) {
        if (this.unfinished.has(node)) return false;
        const existing = this.ownerMap.get(node);
        if (!existing) {
            this.ownerMap.set(node, {
                owner: ownerPath,
                priority
            });
            return true;
        }
        if (existing.owner === ownerPath) {
            existing.priority = Math.max(existing.priority, priority);
            return true;
        }
        if (existing.priority >= priority) return false;
        const folder = this.pathToNode.get(existing.owner);
        if (folder && folder.type === "folder") if (folder.index === node) delete folder.index;
        else {
            const idx = folder.children.indexOf(node);
            if (idx !== -1) folder.children.splice(idx, 1);
        }
        existing.owner = ownerPath;
        existing.priority = priority;
        return true;
    }
    transferOwner(ownerPath, node) {
        const existing = this.ownerMap.get(node);
        if (existing) existing.owner = ownerPath;
    }
    generateId(localId = `_${this._nextId++}`) {
        let id = localId;
        if (this.ctx.locale) id = `${this.ctx.locale}:${id}`;
        if (this.ctx.idPrefix) id = `${this.ctx.idPrefix}:${id}`;
        return id;
    }
    buildPaths(paths, filter, reversed = false) {
        const items = [];
        const folders = [];
        const sortedPaths = paths.sort((a, b)=>reversed ? b.localeCompare(a) : a.localeCompare(b));
        for (const path of sortedPaths){
            if (filter && !filter(path)) continue;
            const fileNode = this.file(path);
            if (fileNode) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(path, (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["r"])(path)) === "index") items.unshift(fileNode);
                else items.push(fileNode);
                continue;
            }
            const dirNode = this.folder(path);
            if (dirNode) folders.push(dirNode);
        }
        items.push(...folders);
        return items;
    }
    resolveFolderItem(folderPath, item, outputArray, excludedPaths) {
        if (item === rest || item === restReversed) {
            outputArray.push(item);
            return;
        }
        let match = separator.exec(item);
        if (match?.groups) {
            let node = {
                $id: this.generateId(),
                type: "separator",
                icon: match.groups.icon,
                name: match.groups.name
            };
            for (const transformer of this.transformers){
                if (!transformer.separator) continue;
                node = transformer.separator.call(this.ctx, node);
            }
            outputArray.push(node);
            return;
        }
        match = link.exec(item);
        if (match?.groups) {
            const { icon, url, name, external } = match.groups;
            let node = {
                $id: this.generateId(),
                type: "page",
                icon,
                name,
                url
            };
            if (external) node.external = true;
            for (const transformer of this.transformers){
                if (!transformer.file) continue;
                node = transformer.file.call(this.ctx, node);
            }
            outputArray.push(node);
            return;
        }
        if (item.startsWith(excludePrefix)) {
            const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["i"])(folderPath, item.slice(1));
            excludedPaths.add(path);
            excludedPaths.add(this.resolveFlattenPath(path, "page"));
            return;
        }
        if (item.startsWith(extractPrefix)) {
            const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["i"])(folderPath, item.slice(3));
            const node = this.folder(path);
            if (!node) return;
            const children = node.index ? [
                node.index,
                ...node.children
            ] : node.children;
            if (this.own(folderPath, node, 2)) {
                for (const child of children){
                    this.transferOwner(folderPath, child);
                    outputArray.push(child);
                }
                excludedPaths.add(path);
            } else for (const child of children)if (this.own(folderPath, child, 2)) outputArray.push(child);
            return;
        }
        let path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["i"])(folderPath, item);
        let node = this.folder(path);
        if (!node) {
            path = this.resolveFlattenPath(path, "page");
            node = this.file(path);
        }
        if (!node || !this.own(folderPath, node, 2)) return;
        outputArray.push(node);
        excludedPaths.add(path);
    }
    folder(folderPath) {
        const cached = this.pathToNode.get(folderPath);
        if (cached) return cached;
        const files = this.storage.readDir(folderPath);
        if (!files) return;
        const isGlobalRoot = folderPath === "";
        const metaPath = this.resolveFlattenPath((0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["i"])(folderPath, "meta"), "meta");
        const indexPath = this.resolveFlattenPath((0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["i"])(folderPath, "index"), "page");
        let meta = this.storage.read(metaPath);
        if (meta && meta.format !== "meta") meta = void 0;
        const metadata = meta?.data ?? {};
        let node = {
            type: "folder",
            name: null,
            root: metadata.root,
            defaultOpen: metadata.defaultOpen,
            description: metadata.description,
            collapsible: metadata.collapsible,
            children: [],
            $id: this.generateId(folderPath),
            $ref: !this.ctx.noRef && meta ? {
                metaFile: metaPath
            } : void 0
        };
        this.pathToNode.set(folderPath, node);
        this.unfinished.add(node);
        if (!(metadata.root ?? isGlobalRoot)) {
            const file = this.file(indexPath);
            if (file && this.own(folderPath, file, 0)) node.index = file;
        }
        if (metadata.pages) {
            const outputArray = [];
            const excludedPaths = /* @__PURE__ */ new Set();
            for (const item of metadata.pages)this.resolveFolderItem(folderPath, item, outputArray, excludedPaths);
            if (excludedPaths.has(indexPath)) delete node.index;
            else if (node.index) excludedPaths.add(indexPath);
            for (const item of outputArray){
                if (item !== rest && item !== restReversed) {
                    node.children.push(item);
                    continue;
                }
                const resolvedItem = this.buildPaths(files, (file)=>!excludedPaths.has(file), item === restReversed);
                for (const child of resolvedItem)if (this.own(folderPath, child, 0)) node.children.push(child);
            }
        } else for (const item of this.buildPaths(files, node.index ? (file)=>file !== indexPath : void 0))if (this.own(folderPath, item, 0)) node.children.push(item);
        node.icon = metadata.icon ?? node.index?.icon;
        node.name = metadata.title ?? node.index?.name;
        this.unfinished.delete(node);
        if (!node.name) {
            const folderName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(folderPath);
            node.name = pathToName(group.exec(folderName)?.[1] ?? folderName);
        }
        for (const transformer of this.transformers){
            if (!transformer.folder) continue;
            node = transformer.folder.call(this.ctx, node, folderPath, meta ? metaPath : void 0);
        }
        this.pathToNode.set(folderPath, node);
        return node;
    }
    file(path) {
        const cached = this.pathToNode.get(path);
        if (cached) return cached;
        const page = this.storage.read(path);
        if (!page || page.format !== "page") return;
        const { title, description, icon } = page.data;
        let item = {
            $id: this.generateId(path),
            type: "page",
            name: title ?? pathToName((0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(path, (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["r"])(path))),
            description,
            icon,
            url: this.ctx.getUrl(page.slugs, this.ctx.locale),
            $ref: !this.ctx.noRef ? {
                file: path
            } : void 0
        };
        for (const transformer of this.transformers){
            if (!transformer.file) continue;
            item = transformer.file.call(this.ctx, item, path);
        }
        this.pathToNode.set(path, item);
        return item;
    }
    root(id = "root", path = "") {
        const folder = this.folder(path);
        let root = {
            $id: this.generateId(id),
            name: folder?.name || "Docs",
            children: folder ? folder.children : []
        };
        for (const transformer of this.transformers){
            if (!transformer.root) continue;
            root = transformer.root.call(this.ctx, root);
        }
        return root;
    }
};
/**
* Get item name from file name
*
* @param name - file name
*/ function pathToName(name) {
    const result = [];
    for (const c of name)if (result.length === 0) result.push(c.toLocaleUpperCase());
    else if (c === "-") result.push(" ");
    else result.push(c);
    return result.join("");
}
//#endregion
//#region src/source/loader.ts
function createPageIndexer({ url }) {
    const pages = /* @__PURE__ */ new Map();
    const pathToMeta = /* @__PURE__ */ new Map();
    const pathToPage = /* @__PURE__ */ new Map();
    return {
        scan (storage, lang) {
            for (const filePath of storage.getFiles()){
                const item = storage.read(filePath);
                const prefix = lang ? `${lang}.` : ".";
                const path = prefix + filePath;
                if (item.format === "meta") {
                    pathToMeta.set(path, {
                        path: item.path,
                        absolutePath: item.absolutePath,
                        data: item.data
                    });
                    continue;
                }
                const page = {
                    absolutePath: item.absolutePath,
                    path: item.path,
                    url: url(item.slugs, lang),
                    slugs: item.slugs,
                    data: item.data,
                    locale: lang
                };
                pathToPage.set(path, page);
                pages.set(prefix + page.slugs.join("/"), page);
            }
        },
        getPage (path, lang = "") {
            return pathToPage.get(`${lang}.${path}`);
        },
        getMeta (path, lang = "") {
            return pathToMeta.get(`${lang}.${path}`);
        },
        getPageBySlugs (slugs, lang = "") {
            let page = pages.get(`${lang}.${slugs.join("/")}`);
            if (page) return page;
            page = pages.get(`${lang}.${slugs.map(decodeURI).join("/")}`);
            if (page) return page;
        },
        getPages (lang) {
            const out = [];
            for (const [key, value] of pages.entries())if (lang === void 0 || key.startsWith(`${lang}.`)) out.push(value);
            return out;
        }
    };
}
function createGetUrl(baseUrl, i18n) {
    const baseSlugs = baseUrl.split("/");
    return (slugs, locale)=>{
        const hideLocale = i18n?.hideLocale ?? "never";
        let urlLocale;
        if (hideLocale === "never") urlLocale = locale;
        else if (hideLocale === "default-locale" && locale !== i18n?.defaultLanguage) urlLocale = locale;
        const paths = [
            ...baseSlugs,
            ...slugs
        ];
        if (urlLocale) paths.unshift(urlLocale);
        return `/${paths.filter((v1)=>v1.length > 0).join("/")}`;
    };
}
function loader(...args) {
    const loaderConfig = args.length === 2 ? resolveConfig(args[0], args[1]) : resolveConfig(args[0].source, args[0]);
    const { i18n } = loaderConfig;
    const storage = i18n ? createContentStorageBuilder(loaderConfig).i18n() : createContentStorageBuilder(loaderConfig).single();
    const indexer = createPageIndexer(loaderConfig);
    if (storage instanceof FileSystem) indexer.scan(storage);
    else for(const locale in storage)indexer.scan(storage[locale], locale);
    let pageTrees;
    function getPageTrees() {
        if (pageTrees) return pageTrees;
        const { plugins = [], url, pageTree: pageTreeConfig } = loaderConfig;
        const transformers = [];
        if (pageTreeConfig?.transformers) transformers.push(...pageTreeConfig.transformers);
        for (const plugin of plugins)if (plugin.transformPageTree) transformers.push(plugin.transformPageTree);
        const options = {
            url,
            ...pageTreeConfig,
            transformers
        };
        if (storage instanceof FileSystem) return pageTrees = new PageTreeBuilder(storage, options).root();
        else {
            const out = {};
            for(const locale in storage)out[locale] = new PageTreeBuilder([
                locale,
                storage
            ], options).root();
            return pageTrees = out;
        }
    }
    return {
        _i18n: i18n,
        get pageTree () {
            return getPageTrees();
        },
        set pageTree (v){
            pageTrees = v;
        },
        getPageByHref (href, { dir = "", language = i18n?.defaultLanguage } = {}) {
            const [value, hash] = href.split("#", 2);
            let target;
            if (value.startsWith("./")) {
                const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$path$2d$CX1URXrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["i"])(dir, value);
                target = indexer.getPage(path, language);
            } else target = this.getPages(language).find((item)=>item.url === value);
            if (target) return {
                page: target,
                hash
            };
        },
        resolveHref (href, parent) {
            if (href.startsWith("./")) {
                const target = this.getPageByHref(href, {
                    dir: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(parent.path),
                    language: parent.locale
                });
                if (target) return target.hash ? `${target.page.url}#${target.hash}` : target.page.url;
            }
            return href;
        },
        getPages (language) {
            return indexer.getPages(language);
        },
        getLanguages () {
            const list = [];
            if (!i18n) return list;
            for (const language of i18n.languages)list.push({
                language,
                pages: this.getPages(language)
            });
            return list;
        },
        getPage (slugs = [], language = i18n?.defaultLanguage) {
            return indexer.getPageBySlugs(slugs, language);
        },
        getNodeMeta (node, language = i18n?.defaultLanguage) {
            const ref = node.$ref?.metaFile;
            if (!ref) return;
            return indexer.getMeta(ref, language);
        },
        getNodePage (node, language = i18n?.defaultLanguage) {
            const ref = node.$ref?.file;
            if (!ref) return;
            return indexer.getPage(ref, language);
        },
        getPageTree (locale) {
            if (i18n) {
                const trees = getPageTrees();
                if (locale && trees[locale]) return trees[locale];
                return trees[i18n.defaultLanguage];
            }
            return getPageTrees();
        },
        generateParams (slug, lang) {
            if (i18n) return this.getLanguages().flatMap((entry)=>entry.pages.map((page)=>({
                        [slug ?? "slug"]: page.slugs,
                        [lang ?? "lang"]: entry.language
                    })));
            return this.getPages().map((page)=>({
                    [slug ?? "slug"]: page.slugs
                }));
        },
        async serializePageTree (tree) {
            const { renderToString } = await __turbopack_context__.A("[project]/projects/open-plugin/docs/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react-dom/server.edge.js [app-rsc] (ecmascript, async loader)");
            return {
                $fumadocs_loader: "page-tree",
                data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$utils$2d$Bc53B3CJ$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["c"])(tree, (node)=>{
                    node = {
                        ...node
                    };
                    if ("icon" in node && node.icon) node.icon = renderToString(node.icon);
                    if (node.name) node.name = renderToString(node.name);
                    if ("children" in node) node.children = [
                        ...node.children
                    ];
                    return node;
                })
            };
        }
    };
}
function resolveConfig(source, { slugs, icon, plugins = [], baseUrl, url, ...base }) {
    let config = {
        ...base,
        url: url ? (...args)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$normalize$2d$url$2d$DKBxIxO0$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(url(...args)) : createGetUrl(baseUrl, base.i18n),
        source,
        plugins: buildPlugins([
            icon && (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$icon$2d$DzOeXioY$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(icon),
            ...typeof plugins === "function" ? plugins({
                typedPlugin: (plugin)=>plugin
            }) : plugins,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$source$2f$plugins$2f$slugs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["slugsPlugin"])(slugs)
        ])
    };
    for (const plugin of config.plugins ?? []){
        const result = plugin.config?.(config);
        if (result) config = result;
    }
    return config;
}
const priorityMap = {
    pre: 1,
    default: 0,
    post: -1
};
function buildPlugins(plugins, sort = true) {
    const flatten = [];
    for (const plugin of plugins)if (Array.isArray(plugin)) flatten.push(...buildPlugins(plugin, false));
    else if (plugin) flatten.push(plugin);
    if (sort) return flatten.sort((a, b)=>priorityMap[b.enforce ?? "default"] - priorityMap[a.enforce ?? "default"]);
    return flatten;
}
;
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/source/plugins/lucide-icons.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lucideIconsPlugin",
    ()=>lucideIconsPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$icon$2d$DzOeXioY$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/icon-DzOeXioY.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$575$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__icons$3e$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/lucide-react@0.575.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/index.js [app-rsc] (ecmascript) <export * as icons>");
;
;
;
//#region src/source/plugins/lucide-icons.ts
/**
* Convert icon names into Lucide Icons, requires `lucide-react` to be installed.
*/ function lucideIconsPlugin(options = {}) {
    const { defaultIcon } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$icon$2d$DzOeXioY$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])((icon = defaultIcon)=>{
        if (icon === void 0) return;
        const Icon = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$575$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__icons$3e$__["icons"][icon];
        if (!Icon) {
            console.warn(`[lucide-icons-plugin] Unknown icon detected: ${icon}.`);
            return;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(Icon);
    });
}
;
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/link.js [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/link.js <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/link.js <module evaluation>", "default");
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/link.js [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/link.js from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/link.js", "default");
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/link.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/link.js [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_f4xt32s5hihysvwj3f5h46n6yi/node_modules/fumadocs-core/dist/link.js [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$fumadocs$2d$core$40$16$2e$6$2e$9_$40$mdx$2d$js$2b$mdx$40$3$2e$1$2e$1_$40$types$2b$estree$2d$jsx$40$1$2e$0$2e$5_$40$types$2b$hast$40$3$2e$0$2e$4_$40$types$2b$mdast_f4xt32s5hihysvwj3f5h46n6yi$2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clsx",
    ()=>clsx,
    "default",
    ()=>__TURBOPACK__default__export__
]);
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cva",
    ()=>cva,
    "cx",
    ()=>cx
]);
/**
 * Copyright 2022 Joe Bell. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
;
const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"];
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };
}),
];

//# sourceMappingURL=18966__pnpm_2aa6030a._.js.map