module.exports = [
"[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/content.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "content",
    ()=>content
]);
/**
 * @import {
 *   InitialConstruct,
 *   Initializer,
 *   State,
 *   TokenizeContext,
 *   Token
 * } from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/devlop@1.1.0/node_modules/devlop/lib/development.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$factory$2d$space$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-factory-space@2.0.1/node_modules/micromark-factory-space/dev/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$character$40$2$2e$1$2e$1$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-character@2.1.1/node_modules/micromark-util-character/dev/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/codes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/types.js [app-ssr] (ecmascript)");
;
;
;
;
const content = {
    tokenize: initializeContent
};
/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Initializer}
 *   Content.
 */ function initializeContent(effects) {
    const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
    /** @type {Token} */ let previous;
    return contentStart;
    //TURBOPACK unreachable
    ;
    /** @type {State} */ function afterContentStartConstruct(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$character$40$2$2e$1$2e$1$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code), 'expected eol or eof');
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof) {
            effects.consume(code);
            return;
        }
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].lineEnding);
        effects.consume(code);
        effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].lineEnding);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$factory$2d$space$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["factorySpace"])(effects, contentStart, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].linePrefix);
    }
    /** @type {State} */ function paragraphInitial(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(code !== __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$character$40$2$2e$1$2e$1$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code), 'expected anything other than a line ending or EOF');
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].paragraph);
        return lineStart(code);
    }
    /** @type {State} */ function lineStart(code) {
        const token = effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].chunkText, {
            contentType: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["constants"].contentTypeText,
            previous
        });
        if (previous) {
            previous.next = token;
        }
        previous = token;
        return data(code);
    }
    /** @type {State} */ function data(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof) {
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].chunkText);
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].paragraph);
            effects.consume(code);
            return;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$character$40$2$2e$1$2e$1$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            effects.consume(code);
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].chunkText);
            return lineStart;
        }
        // Data.
        effects.consume(code);
        return data;
    }
}
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/document.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "document",
    ()=>document
]);
/**
 * @import {
 *   Construct,
 *   ContainerState,
 *   InitialConstruct,
 *   Initializer,
 *   Point,
 *   State,
 *   TokenizeContext,
 *   Tokenizer,
 *   Token
 * } from 'micromark-util-types'
 */ /**
 * @typedef {[Construct, ContainerState]} StackItem
 *   Construct and its state.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/devlop@1.1.0/node_modules/devlop/lib/development.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$factory$2d$space$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-factory-space@2.0.1/node_modules/micromark-factory-space/dev/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$character$40$2$2e$1$2e$1$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-character@2.1.1/node_modules/micromark-util-character/dev/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$chunked$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-chunked@2.0.1/node_modules/micromark-util-chunked/dev/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/codes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/types.js [app-ssr] (ecmascript)");
;
;
;
;
;
const document = {
    tokenize: initializeDocument
};
/** @type {Construct} */ const containerConstruct = {
    tokenize: tokenizeContainer
};
/**
 * @this {TokenizeContext}
 *   Self.
 * @type {Initializer}
 *   Initializer.
 */ function initializeDocument(effects) {
    const self = this;
    /** @type {Array<StackItem>} */ const stack = [];
    let continued = 0;
    /** @type {TokenizeContext | undefined} */ let childFlow;
    /** @type {Token | undefined} */ let childToken;
    /** @type {number} */ let lineStartOffset;
    return start;
    //TURBOPACK unreachable
    ;
    /** @type {State} */ function start(code) {
        // First we iterate through the open blocks, starting with the root
        // document, and descending through last children down to the last open
        // block.
        // Each block imposes a condition that the line must satisfy if the block is
        // to remain open.
        // For example, a block quote requires a `>` character.
        // A paragraph requires a non-blank line.
        // In this phase we may match all or just some of the open blocks.
        // But we cannot close unmatched blocks yet, because we may have a lazy
        // continuation line.
        if (continued < stack.length) {
            const item = stack[continued];
            self.containerState = item[1];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(item[0].continuation, 'expected `continuation` to be defined on container construct');
            return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code);
        }
        // Done.
        return checkNewContainers(code);
    }
    /** @type {State} */ function documentContinue(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(self.containerState, 'expected `containerState` to be defined after continuation');
        continued++;
        // Note: this field is called `_closeFlow` but it also closes containers.
        // Perhaps a good idea to rename it but it’s already used in the wild by
        // extensions.
        if (self.containerState._closeFlow) {
            self.containerState._closeFlow = undefined;
            if (childFlow) {
                closeFlow();
            }
            // Note: this algorithm for moving events around is similar to the
            // algorithm when dealing with lazy lines in `writeToChild`.
            const indexBeforeExits = self.events.length;
            let indexBeforeFlow = indexBeforeExits;
            /** @type {Point | undefined} */ let point;
            // Find the flow chunk.
            while(indexBeforeFlow--){
                if (self.events[indexBeforeFlow][0] === 'exit' && self.events[indexBeforeFlow][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].chunkFlow) {
                    point = self.events[indexBeforeFlow][1].end;
                    break;
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(point, 'could not find previous flow chunk');
            exitContainers(continued);
            // Fix positions.
            let index = indexBeforeExits;
            while(index < self.events.length){
                self.events[index][1].end = {
                    ...point
                };
                index++;
            }
            // Inject the exits earlier (they’re still also at the end).
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$chunked$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["splice"])(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
            // Discard the duplicate exits.
            self.events.length = index;
            return checkNewContainers(code);
        }
        return start(code);
    }
    /** @type {State} */ function checkNewContainers(code) {
        // Next, after consuming the continuation markers for existing blocks, we
        // look for new block starts (e.g. `>` for a block quote).
        // If we encounter a new block start, we close any blocks unmatched in
        // step 1 before creating the new block as a child of the last matched
        // block.
        if (continued === stack.length) {
            // No need to `check` whether there’s a container, of `exitContainers`
            // would be moot.
            // We can instead immediately `attempt` to parse one.
            if (!childFlow) {
                return documentContinued(code);
            }
            // If we have concrete content, such as block HTML or fenced code,
            // we can’t have containers “pierce” into them, so we can immediately
            // start.
            if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
                return flowStart(code);
            }
            // If we do have flow, it could still be a blank line,
            // but we’d be interrupting it w/ a new container if there’s a current
            // construct.
            // To do: next major: remove `_gfmTableDynamicInterruptHack` (no longer
            // needed in micromark-extension-gfm-table@1.0.6).
            self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
        }
        // Check if there is a new container.
        self.containerState = {};
        return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code);
    }
    /** @type {State} */ function thereIsANewContainer(code) {
        if (childFlow) closeFlow();
        exitContainers(continued);
        return documentContinued(code);
    }
    /** @type {State} */ function thereIsNoNewContainer(code) {
        self.parser.lazy[self.now().line] = continued !== stack.length;
        lineStartOffset = self.now().offset;
        return flowStart(code);
    }
    /** @type {State} */ function documentContinued(code) {
        // Try new containers.
        self.containerState = {};
        return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
    }
    /** @type {State} */ function containerContinue(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(self.currentConstruct, 'expected `currentConstruct` to be defined on tokenizer');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(self.containerState, 'expected `containerState` to be defined on tokenizer');
        continued++;
        stack.push([
            self.currentConstruct,
            self.containerState
        ]);
        // Try another.
        return documentContinued(code);
    }
    /** @type {State} */ function flowStart(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof) {
            if (childFlow) closeFlow();
            exitContainers(0);
            effects.consume(code);
            return;
        }
        childFlow = childFlow || self.parser.flow(self.now());
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].chunkFlow, {
            _tokenizer: childFlow,
            contentType: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["constants"].contentTypeFlow,
            previous: childToken
        });
        return flowContinue(code);
    }
    /** @type {State} */ function flowContinue(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof) {
            writeToChild(effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].chunkFlow), true);
            exitContainers(0);
            effects.consume(code);
            return;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$character$40$2$2e$1$2e$1$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            effects.consume(code);
            writeToChild(effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].chunkFlow));
            // Get ready for the next line.
            continued = 0;
            self.interrupt = undefined;
            return start;
        }
        effects.consume(code);
        return flowContinue;
    }
    /**
   * @param {Token} token
   *   Token.
   * @param {boolean | undefined} [endOfFile]
   *   Whether the token is at the end of the file (default: `false`).
   * @returns {undefined}
   *   Nothing.
   */ function writeToChild(token, endOfFile) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(childFlow, 'expected `childFlow` to be defined when continuing');
        const stream = self.sliceStream(token);
        if (endOfFile) stream.push(null);
        token.previous = childToken;
        if (childToken) childToken.next = token;
        childToken = token;
        childFlow.defineSkip(token.start);
        childFlow.write(stream);
        // Alright, so we just added a lazy line:
        //
        // ```markdown
        // > a
        // b.
        //
        // Or:
        //
        // > ~~~c
        // d
        //
        // Or:
        //
        // > | e |
        // f
        // ```
        //
        // The construct in the second example (fenced code) does not accept lazy
        // lines, so it marked itself as done at the end of its first line, and
        // then the content construct parses `d`.
        // Most constructs in markdown match on the first line: if the first line
        // forms a construct, a non-lazy line can’t “unmake” it.
        //
        // The construct in the third example is potentially a GFM table, and
        // those are *weird*.
        // It *could* be a table, from the first line, if the following line
        // matches a condition.
        // In this case, that second line is lazy, which “unmakes” the first line
        // and turns the whole into one content block.
        //
        // We’ve now parsed the non-lazy and the lazy line, and can figure out
        // whether the lazy line started a new flow block.
        // If it did, we exit the current containers between the two flow blocks.
        if (self.parser.lazy[token.start.line]) {
            let index = childFlow.events.length;
            while(index--){
                if (// The token starts before the line ending…
                childFlow.events[index][1].start.offset < lineStartOffset && // …and either is not ended yet…
                (!childFlow.events[index][1].end || // …or ends after it.
                childFlow.events[index][1].end.offset > lineStartOffset)) {
                    // Exit: there’s still something open, which means it’s a lazy line
                    // part of something.
                    return;
                }
            }
            // Note: this algorithm for moving events around is similar to the
            // algorithm when closing flow in `documentContinue`.
            const indexBeforeExits = self.events.length;
            let indexBeforeFlow = indexBeforeExits;
            /** @type {boolean | undefined} */ let seen;
            /** @type {Point | undefined} */ let point;
            // Find the previous chunk (the one before the lazy line).
            while(indexBeforeFlow--){
                if (self.events[indexBeforeFlow][0] === 'exit' && self.events[indexBeforeFlow][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].chunkFlow) {
                    if (seen) {
                        point = self.events[indexBeforeFlow][1].end;
                        break;
                    }
                    seen = true;
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(point, 'could not find previous flow chunk');
            exitContainers(continued);
            // Fix positions.
            index = indexBeforeExits;
            while(index < self.events.length){
                self.events[index][1].end = {
                    ...point
                };
                index++;
            }
            // Inject the exits earlier (they’re still also at the end).
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$chunked$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["splice"])(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
            // Discard the duplicate exits.
            self.events.length = index;
        }
    }
    /**
   * @param {number} size
   *   Size.
   * @returns {undefined}
   *   Nothing.
   */ function exitContainers(size) {
        let index = stack.length;
        // Exit open containers.
        while(index-- > size){
            const entry = stack[index];
            self.containerState = entry[1];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(entry[0].exit, 'expected `exit` to be defined on container construct');
            entry[0].exit.call(self, effects);
        }
        stack.length = size;
    }
    function closeFlow() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(self.containerState, 'expected `containerState` to be defined when closing flow');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(childFlow, 'expected `childFlow` to be defined when closing it');
        childFlow.write([
            __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof
        ]);
        childToken = undefined;
        childFlow = undefined;
        self.containerState._closeFlow = undefined;
    }
}
/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 *   Tokenizer.
 */ function tokenizeContainer(effects, ok, nok) {
    // Always populated by defaults.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(this.parser.constructs.disable.null, 'expected `disable.null` to be populated');
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$factory$2d$space$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["factorySpace"])(effects, effects.attempt(this.parser.constructs.document, ok, nok), __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].linePrefix, this.parser.constructs.disable.null.includes('codeIndented') ? undefined : __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["constants"].tabSize);
}
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/flow.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "flow",
    ()=>flow
]);
/**
 * @import {
 *   InitialConstruct,
 *   Initializer,
 *   State,
 *   TokenizeContext
 * } from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/devlop@1.1.0/node_modules/devlop/lib/development.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$blank$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/blank-line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$content$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/content.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$factory$2d$space$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-factory-space@2.0.1/node_modules/micromark-factory-space/dev/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$character$40$2$2e$1$2e$1$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-character@2.1.1/node_modules/micromark-util-character/dev/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/codes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/types.js [app-ssr] (ecmascript)");
;
;
;
;
;
const flow = {
    tokenize: initializeFlow
};
/**
 * @this {TokenizeContext}
 *   Self.
 * @type {Initializer}
 *   Initializer.
 */ function initializeFlow(effects) {
    const self = this;
    const initial = effects.attempt(// Try to parse a blank line.
    __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$blank$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["blankLine"], atBlankEnding, // Try to parse initial flow (essentially, only code).
    effects.attempt(this.parser.constructs.flowInitial, afterConstruct, (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$factory$2d$space$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["factorySpace"])(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$content$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["content"], afterConstruct)), __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].linePrefix)));
    return initial;
    //TURBOPACK unreachable
    ;
    /** @type {State} */ function atBlankEnding(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$character$40$2$2e$1$2e$1$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code), 'expected eol or eof');
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof) {
            effects.consume(code);
            return;
        }
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].lineEndingBlank);
        effects.consume(code);
        effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].lineEndingBlank);
        self.currentConstruct = undefined;
        return initial;
    }
    /** @type {State} */ function afterConstruct(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$character$40$2$2e$1$2e$1$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code), 'expected eol or eof');
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof) {
            effects.consume(code);
            return;
        }
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].lineEnding);
        effects.consume(code);
        effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].lineEnding);
        self.currentConstruct = undefined;
        return initial;
    }
}
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/text.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolver",
    ()=>resolver,
    "string",
    ()=>string,
    "text",
    ()=>text
]);
/**
 * @import {
 *   Code,
 *   InitialConstruct,
 *   Initializer,
 *   Resolver,
 *   State,
 *   TokenizeContext
 * } from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/devlop@1.1.0/node_modules/devlop/lib/development.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/codes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/types.js [app-ssr] (ecmascript)");
;
;
const resolver = {
    resolveAll: createResolver()
};
const string = initializeFactory('string');
const text = initializeFactory('text');
/**
 * @param {'string' | 'text'} field
 *   Field.
 * @returns {InitialConstruct}
 *   Construct.
 */ function initializeFactory(field) {
    return {
        resolveAll: createResolver(field === 'text' ? resolveAllLineSuffixes : undefined),
        tokenize: initializeText
    };
    //TURBOPACK unreachable
    ;
    /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Initializer}
   */ function initializeText(effects) {
        const self = this;
        const constructs = this.parser.constructs[field];
        const text = effects.attempt(constructs, start, notText);
        return start;
        //TURBOPACK unreachable
        ;
        /** @type {State} */ function start(code) {
            return atBreak(code) ? text(code) : notText(code);
        }
        /** @type {State} */ function notText(code) {
            if (code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof) {
                effects.consume(code);
                return;
            }
            effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].data);
            effects.consume(code);
            return data;
        }
        /** @type {State} */ function data(code) {
            if (atBreak(code)) {
                effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].data);
                return text(code);
            }
            // Data.
            effects.consume(code);
            return data;
        }
        /**
     * @param {Code} code
     *   Code.
     * @returns {boolean}
     *   Whether the code is a break.
     */ function atBreak(code) {
            if (code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof) {
                return true;
            }
            const list = constructs[code];
            let index = -1;
            if (list) {
                // Always populated by defaults.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(Array.isArray(list), 'expected `disable.null` to be populated');
                while(++index < list.length){
                    const item = list[index];
                    if (!item.previous || item.previous.call(self, self.previous)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
/**
 * @param {Resolver | undefined} [extraResolver]
 *   Resolver.
 * @returns {Resolver}
 *   Resolver.
 */ function createResolver(extraResolver) {
    return resolveAllText;
    //TURBOPACK unreachable
    ;
    /** @type {Resolver} */ function resolveAllText(events, context) {
        let index = -1;
        /** @type {number | undefined} */ let enter;
        // A rather boring computation (to merge adjacent `data` events) which
        // improves mm performance by 29%.
        while(++index <= events.length){
            if (enter === undefined) {
                if (events[index] && events[index][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].data) {
                    enter = index;
                    index++;
                }
            } else if (!events[index] || events[index][1].type !== __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].data) {
                // Don’t do anything if there is one data token.
                if (index !== enter + 2) {
                    events[enter][1].end = events[index - 1][1].end;
                    events.splice(enter + 2, index - enter - 2);
                    index = enter + 2;
                }
                enter = undefined;
            }
        }
        return extraResolver ? extraResolver(events, context) : events;
    }
}
/**
 * A rather ugly set of instructions which again looks at chunks in the input
 * stream.
 * The reason to do this here is that it is *much* faster to parse in reverse.
 * And that we can’t hook into `null` to split the line suffix before an EOF.
 * To do: figure out if we can make this into a clean utility, or even in core.
 * As it will be useful for GFMs literal autolink extension (and maybe even
 * tables?)
 *
 * @type {Resolver}
 */ function resolveAllLineSuffixes(events, context) {
    let eventIndex = 0 // Skip first.
    ;
    while(++eventIndex <= events.length){
        if ((eventIndex === events.length || events[eventIndex][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].lineEnding) && events[eventIndex - 1][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].data) {
            const data = events[eventIndex - 1][1];
            const chunks = context.sliceStream(data);
            let index = chunks.length;
            let bufferIndex = -1;
            let size = 0;
            /** @type {boolean | undefined} */ let tabs;
            while(index--){
                const chunk = chunks[index];
                if (typeof chunk === 'string') {
                    bufferIndex = chunk.length;
                    while(chunk.charCodeAt(bufferIndex - 1) === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].space){
                        size++;
                        bufferIndex--;
                    }
                    if (bufferIndex) break;
                    bufferIndex = -1;
                } else if (chunk === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].horizontalTab) {
                    tabs = true;
                    size++;
                } else if (chunk === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].virtualSpace) {
                // Empty
                } else {
                    // Replacement character, exit.
                    index++;
                    break;
                }
            }
            // Allow final trailing whitespace.
            if (context._contentTypeTextTrailing && eventIndex === events.length) {
                size = 0;
            }
            if (size) {
                const token = {
                    type: eventIndex === events.length || tabs || size < __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["constants"].hardBreakPrefixSizeMin ? __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].lineSuffix : __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["types"].hardBreakTrailing,
                    start: {
                        _bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex,
                        _index: data.start._index + index,
                        line: data.end.line,
                        column: data.end.column - size,
                        offset: data.end.offset - size
                    },
                    end: {
                        ...data.end
                    }
                };
                data.end = {
                    ...token.start
                };
                if (data.start.offset === data.end.offset) {
                    Object.assign(data, token);
                } else {
                    events.splice(eventIndex, 0, [
                        'enter',
                        token,
                        context
                    ], [
                        'exit',
                        token,
                        context
                    ]);
                    eventIndex += 2;
                }
            }
            eventIndex++;
        }
    }
    return events;
}
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/constructs.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "attentionMarkers",
    ()=>attentionMarkers,
    "contentInitial",
    ()=>contentInitial,
    "disable",
    ()=>disable,
    "document",
    ()=>document,
    "flow",
    ()=>flow,
    "flowInitial",
    ()=>flowInitial,
    "insideSpan",
    ()=>insideSpan,
    "string",
    ()=>string,
    "text",
    ()=>text
]);
/**
 * @import {Extension} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$attention$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/attention.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$autolink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/autolink.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$block$2d$quote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/block-quote.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$escape$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/character-escape.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$reference$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/character-reference.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$fenced$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/code-fenced.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$indented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/code-indented.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/code-text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$definition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/definition.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$hard$2d$break$2d$escape$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/hard-break-escape.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$heading$2d$atx$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/heading-atx.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$html$2d$flow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/html-flow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$html$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/html-text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$end$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/label-end.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$start$2d$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/label-start-image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$start$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/label-start-link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$line$2d$ending$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/line-ending.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/list.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$setext$2d$underline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/setext-underline.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$thematic$2d$break$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/dev/lib/thematic-break.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/codes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/text.js [app-ssr] (ecmascript)");
;
;
;
const document = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].asterisk]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].plusSign]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].dash]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].digit0]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].digit1]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].digit2]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].digit3]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].digit4]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].digit5]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].digit6]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].digit7]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].digit8]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].digit9]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].greaterThan]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$block$2d$quote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["blockQuote"]
};
const contentInitial = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$definition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["definition"]
};
const flowInitial = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].horizontalTab]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$indented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeIndented"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].virtualSpace]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$indented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeIndented"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].space]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$indented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeIndented"]
};
const flow = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].numberSign]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$heading$2d$atx$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["headingAtx"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].asterisk]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$thematic$2d$break$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thematicBreak"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].dash]: [
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$setext$2d$underline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setextUnderline"],
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$thematic$2d$break$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thematicBreak"]
    ],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].lessThan]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$html$2d$flow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["htmlFlow"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].equalsTo]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$setext$2d$underline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setextUnderline"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].underscore]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$thematic$2d$break$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thematicBreak"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].graveAccent]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$fenced$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeFenced"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].tilde]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$fenced$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeFenced"]
};
const string = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].ampersand]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$reference$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["characterReference"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].backslash]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$escape$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["characterEscape"]
};
const text = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].carriageReturn]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$line$2d$ending$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lineEnding"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].lineFeed]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$line$2d$ending$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lineEnding"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].carriageReturnLineFeed]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$line$2d$ending$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lineEnding"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].exclamationMark]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$start$2d$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["labelStartImage"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].ampersand]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$reference$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["characterReference"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].asterisk]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$attention$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["attention"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].lessThan]: [
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$autolink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["autolink"],
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$html$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["htmlText"]
    ],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$start$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["labelStartLink"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].backslash]: [
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$hard$2d$break$2d$escape$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hardBreakEscape"],
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$escape$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["characterEscape"]
    ],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$end$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["labelEnd"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].underscore]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$attention$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["attention"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].graveAccent]: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeText"]
};
const insideSpan = {
    null: [
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$core$2d$commonmark$40$2$2e$0$2e$3$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$attention$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["attention"],
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolver"]
    ]
};
const attentionMarkers = {
    null: [
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].asterisk,
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].underscore
    ]
};
const disable = {
    null: []
};
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/create-tokenizer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTokenizer",
    ()=>createTokenizer
]);
/**
 * @import {
 *   Chunk,
 *   Code,
 *   ConstructRecord,
 *   Construct,
 *   Effects,
 *   InitialConstruct,
 *   ParseContext,
 *   Point,
 *   State,
 *   TokenizeContext,
 *   Token
 * } from 'micromark-util-types'
 */ /**
 * @callback Restore
 *   Restore the state.
 * @returns {undefined}
 *   Nothing.
 *
 * @typedef Info
 *   Info.
 * @property {Restore} restore
 *   Restore.
 * @property {number} from
 *   From.
 *
 * @callback ReturnHandle
 *   Handle a successful run.
 * @param {Construct} construct
 *   Construct.
 * @param {Info} info
 *   Info.
 * @returns {undefined}
 *   Nothing.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$debug$40$4$2e$4$2e$3$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/devlop@1.1.0/node_modules/devlop/lib/development.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$character$40$2$2e$1$2e$1$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-character@2.1.1/node_modules/micromark-util-character/dev/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$chunked$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-chunked@2.0.1/node_modules/micromark-util-chunked/dev/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$resolve$2d$all$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$resolve$2d$all$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-resolve-all@2.0.1/node_modules/micromark-util-resolve-all/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/codes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/values.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$debug$40$4$2e$4$2e$3$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('micromark');
function createTokenizer(parser, initialize, from) {
    /** @type {Point} */ let point = {
        _bufferIndex: -1,
        _index: 0,
        line: from && from.line || 1,
        column: from && from.column || 1,
        offset: from && from.offset || 0
    };
    /** @type {Record<string, number>} */ const columnStart = {};
    /** @type {Array<Construct>} */ const resolveAllConstructs = [];
    /** @type {Array<Chunk>} */ let chunks = [];
    /** @type {Array<Token>} */ let stack = [];
    /** @type {boolean | undefined} */ let consumed = true;
    /**
   * Tools used for tokenizing.
   *
   * @type {Effects}
   */ const effects = {
        attempt: constructFactory(onsuccessfulconstruct),
        check: constructFactory(onsuccessfulcheck),
        consume,
        enter,
        exit,
        interrupt: constructFactory(onsuccessfulcheck, {
            interrupt: true
        })
    };
    /**
   * State and tools for resolving and serializing.
   *
   * @type {TokenizeContext}
   */ const context = {
        code: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof,
        containerState: {},
        defineSkip,
        events: [],
        now,
        parser,
        previous: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof,
        sliceSerialize,
        sliceStream,
        write
    };
    /**
   * The state function.
   *
   * @type {State | undefined}
   */ let state = initialize.tokenize.call(context, effects);
    /**
   * Track which character we expect to be consumed, to catch bugs.
   *
   * @type {Code}
   */ let expectedCode;
    if (initialize.resolveAll) {
        resolveAllConstructs.push(initialize);
    }
    return context;
    //TURBOPACK unreachable
    ;
    /** @type {TokenizeContext['write']} */ function write(slice) {
        chunks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$chunked$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["push"])(chunks, slice);
        main();
        // Exit if we’re not done, resolve might change stuff.
        if (chunks[chunks.length - 1] !== __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof) {
            return [];
        }
        addResult(initialize, 0);
        // Otherwise, resolve, and exit.
        context.events = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$resolve$2d$all$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$resolve$2d$all$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAll"])(resolveAllConstructs, context.events, context);
        return context.events;
    }
    //
    // Tools.
    //
    /** @type {TokenizeContext['sliceSerialize']} */ function sliceSerialize(token, expandTabs) {
        return serializeChunks(sliceStream(token), expandTabs);
    }
    /** @type {TokenizeContext['sliceStream']} */ function sliceStream(token) {
        return sliceChunks(chunks, token);
    }
    /** @type {TokenizeContext['now']} */ function now() {
        // This is a hot path, so we clone manually instead of `Object.assign({}, point)`
        const { _bufferIndex, _index, line, column, offset } = point;
        return {
            _bufferIndex,
            _index,
            line,
            column,
            offset
        };
    }
    /** @type {TokenizeContext['defineSkip']} */ function defineSkip(value) {
        columnStart[value.line] = value.column;
        accountForPotentialSkip();
        debug('position: define skip: `%j`', point);
    }
    //
    // State management.
    //
    /**
   * Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
   * `consume`).
   * Here is where we walk through the chunks, which either include strings of
   * several characters, or numerical character codes.
   * The reason to do this in a loop instead of a call is so the stack can
   * drain.
   *
   * @returns {undefined}
   *   Nothing.
   */ function main() {
        /** @type {number} */ let chunkIndex;
        while(point._index < chunks.length){
            const chunk = chunks[point._index];
            // If we’re in a buffer chunk, loop through it.
            if (typeof chunk === 'string') {
                chunkIndex = point._index;
                if (point._bufferIndex < 0) {
                    point._bufferIndex = 0;
                }
                while(point._index === chunkIndex && point._bufferIndex < chunk.length){
                    go(chunk.charCodeAt(point._bufferIndex));
                }
            } else {
                go(chunk);
            }
        }
    }
    /**
   * Deal with one code.
   *
   * @param {Code} code
   *   Code.
   * @returns {undefined}
   *   Nothing.
   */ function go(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(consumed === true, 'expected character to be consumed');
        consumed = undefined;
        debug('main: passing `%s` to %s', code, state && state.name);
        expectedCode = code;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(typeof state === 'function', 'expected state');
        state = state(code);
    }
    /** @type {Effects['consume']} */ function consume(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(code === expectedCode, 'expected given code to equal expected code');
        debug('consume: `%s`', code);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(consumed === undefined, 'expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(code === null ? context.events.length === 0 || context.events[context.events.length - 1][0] === 'exit' : context.events[context.events.length - 1][0] === 'enter', 'expected last token to be open');
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$character$40$2$2e$1$2e$1$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            point.line++;
            point.column = 1;
            point.offset += code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].carriageReturnLineFeed ? 2 : 1;
            accountForPotentialSkip();
            debug('position: after eol: `%j`', point);
        } else if (code !== __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].virtualSpace) {
            point.column++;
            point.offset++;
        }
        // Not in a string chunk.
        if (point._bufferIndex < 0) {
            point._index++;
        } else {
            point._bufferIndex++;
            // At end of string chunk.
            if (point._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
            // strings.
            /** @type {string} */ chunks[point._index].length) {
                point._bufferIndex = -1;
                point._index++;
            }
        }
        // Expose the previous character.
        context.previous = code;
        // Mark as consumed.
        consumed = true;
    }
    /** @type {Effects['enter']} */ function enter(type, fields) {
        /** @type {Token} */ // @ts-expect-error Patch instead of assign required fields to help GC.
        const token = fields || {};
        token.type = type;
        token.start = now();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(typeof type === 'string', 'expected string type');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(type.length > 0, 'expected non-empty string');
        debug('enter: `%s`', type);
        context.events.push([
            'enter',
            token,
            context
        ]);
        stack.push(token);
        return token;
    }
    /** @type {Effects['exit']} */ function exit(type) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(typeof type === 'string', 'expected string type');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(type.length > 0, 'expected non-empty string');
        const token = stack.pop();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(token, 'cannot close w/o open tokens');
        token.end = now();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(type === token.type, 'expected exit token to match current token');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(!(token.start._index === token.end._index && token.start._bufferIndex === token.end._bufferIndex), 'expected non-empty token (`' + type + '`)');
        debug('exit: `%s`', token.type);
        context.events.push([
            'exit',
            token,
            context
        ]);
        return token;
    }
    /**
   * Use results.
   *
   * @type {ReturnHandle}
   */ function onsuccessfulconstruct(construct, info) {
        addResult(construct, info.from);
    }
    /**
   * Discard results.
   *
   * @type {ReturnHandle}
   */ function onsuccessfulcheck(_, info) {
        info.restore();
    }
    /**
   * Factory to attempt/check/interrupt.
   *
   * @param {ReturnHandle} onreturn
   *   Callback.
   * @param {{interrupt?: boolean | undefined} | undefined} [fields]
   *   Fields.
   */ function constructFactory(onreturn, fields) {
        return hook;
        //TURBOPACK unreachable
        ;
        /**
     * Handle either an object mapping codes to constructs, a list of
     * constructs, or a single construct.
     *
     * @param {Array<Construct> | ConstructRecord | Construct} constructs
     *   Constructs.
     * @param {State} returnState
     *   State.
     * @param {State | undefined} [bogusState]
     *   State.
     * @returns {State}
     *   State.
     */ function hook(constructs, returnState, bogusState) {
            /** @type {ReadonlyArray<Construct>} */ let listOfConstructs;
            /** @type {number} */ let constructIndex;
            /** @type {Construct} */ let currentConstruct;
            /** @type {Info} */ let info;
            return Array.isArray(constructs) ? /* c8 ignore next 1 */ handleListOfConstructs(constructs) : 'tokenize' in constructs ? handleListOfConstructs([
                constructs
            ]) : handleMapOfConstructs(constructs);
            //TURBOPACK unreachable
            ;
            /**
       * Handle a list of construct.
       *
       * @param {ConstructRecord} map
       *   Constructs.
       * @returns {State}
       *   State.
       */ function handleMapOfConstructs(map) {
                return start;
                //TURBOPACK unreachable
                ;
                /** @type {State} */ function start(code) {
                    const left = code !== null && map[code];
                    const all = code !== null && map.null;
                    const list = [
                        // To do: add more extension tests.
                        /* c8 ignore next 2 */ ...Array.isArray(left) ? left : left ? [
                            left
                        ] : [],
                        ...Array.isArray(all) ? all : all ? [
                            all
                        ] : []
                    ];
                    return handleListOfConstructs(list)(code);
                }
            }
            /**
       * Handle a list of construct.
       *
       * @param {ReadonlyArray<Construct>} list
       *   Constructs.
       * @returns {State}
       *   State.
       */ function handleListOfConstructs(list) {
                listOfConstructs = list;
                constructIndex = 0;
                if (list.length === 0) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(bogusState, 'expected `bogusState` to be given');
                    return bogusState;
                }
                return handleConstruct(list[constructIndex]);
            }
            /**
       * Handle a single construct.
       *
       * @param {Construct} construct
       *   Construct.
       * @returns {State}
       *   State.
       */ function handleConstruct(construct) {
                return start;
                //TURBOPACK unreachable
                ;
                /** @type {State} */ function start(code) {
                    // To do: not needed to store if there is no bogus state, probably?
                    // Currently doesn’t work because `inspect` in document does a check
                    // w/o a bogus, which doesn’t make sense. But it does seem to help perf
                    // by not storing.
                    info = store();
                    currentConstruct = construct;
                    if (!construct.partial) {
                        context.currentConstruct = construct;
                    }
                    // Always populated by defaults.
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(context.parser.constructs.disable.null, 'expected `disable.null` to be populated');
                    if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
                        return nok(code);
                    }
                    return construct.tokenize.call(// If we do have fields, create an object w/ `context` as its
                    // prototype.
                    // This allows a “live binding”, which is needed for `interrupt`.
                    fields ? Object.assign(Object.create(context), fields) : context, effects, ok, nok)(code);
                }
            }
            /** @type {State} */ function ok(code) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(code === expectedCode, 'expected code');
                consumed = true;
                onreturn(currentConstruct, info);
                return returnState;
            }
            /** @type {State} */ function nok(code) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(code === expectedCode, 'expected code');
                consumed = true;
                info.restore();
                if (++constructIndex < listOfConstructs.length) {
                    return handleConstruct(listOfConstructs[constructIndex]);
                }
                return bogusState;
            }
        }
    }
    /**
   * @param {Construct} construct
   *   Construct.
   * @param {number} from
   *   From.
   * @returns {undefined}
   *   Nothing.
   */ function addResult(construct, from) {
        if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
            resolveAllConstructs.push(construct);
        }
        if (construct.resolve) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$chunked$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["splice"])(context.events, from, context.events.length - from, construct.resolve(context.events.slice(from), context));
        }
        if (construct.resolveTo) {
            context.events = construct.resolveTo(context.events, context);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(construct.partial || context.events.length === 0 || context.events[context.events.length - 1][0] === 'exit', 'expected last token to end');
    }
    /**
   * Store state.
   *
   * @returns {Info}
   *   Info.
   */ function store() {
        const startPoint = now();
        const startPrevious = context.previous;
        const startCurrentConstruct = context.currentConstruct;
        const startEventsIndex = context.events.length;
        const startStack = Array.from(stack);
        return {
            from: startEventsIndex,
            restore
        };
        //TURBOPACK unreachable
        ;
        /**
     * Restore state.
     *
     * @returns {undefined}
     *   Nothing.
     */ function restore() {
            point = startPoint;
            context.previous = startPrevious;
            context.currentConstruct = startCurrentConstruct;
            context.events.length = startEventsIndex;
            stack = startStack;
            accountForPotentialSkip();
            debug('position: restore: `%j`', point);
        }
    }
    /**
   * Move the current point a bit forward in the line when it’s on a column
   * skip.
   *
   * @returns {undefined}
   *   Nothing.
   */ function accountForPotentialSkip() {
        if (point.line in columnStart && point.column < 2) {
            point.column = columnStart[point.line];
            point.offset += columnStart[point.line] - 1;
        }
    }
}
/**
 * Get the chunks from a slice of chunks in the range of a token.
 *
 * @param {ReadonlyArray<Chunk>} chunks
 *   Chunks.
 * @param {Pick<Token, 'end' | 'start'>} token
 *   Token.
 * @returns {Array<Chunk>}
 *   Chunks.
 */ function sliceChunks(chunks, token) {
    const startIndex = token.start._index;
    const startBufferIndex = token.start._bufferIndex;
    const endIndex = token.end._index;
    const endBufferIndex = token.end._bufferIndex;
    /** @type {Array<Chunk>} */ let view;
    if (startIndex === endIndex) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(endBufferIndex > -1, 'expected non-negative end buffer index');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(startBufferIndex > -1, 'expected non-negative start buffer index');
        // @ts-expect-error `_bufferIndex` is used on string chunks.
        view = [
            chunks[startIndex].slice(startBufferIndex, endBufferIndex)
        ];
    } else {
        view = chunks.slice(startIndex, endIndex);
        if (startBufferIndex > -1) {
            const head = view[0];
            if (typeof head === 'string') {
                view[0] = head.slice(startBufferIndex);
            /* c8 ignore next 4 -- used to be used, no longer */ } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(startBufferIndex === 0, 'expected `startBufferIndex` to be `0`');
                view.shift();
            }
        }
        if (endBufferIndex > 0) {
            // @ts-expect-error `_bufferIndex` is used on string chunks.
            view.push(chunks[endIndex].slice(0, endBufferIndex));
        }
    }
    return view;
}
/**
 * Get the string value of a slice of chunks.
 *
 * @param {ReadonlyArray<Chunk>} chunks
 *   Chunks.
 * @param {boolean | undefined} [expandTabs=false]
 *   Whether to expand tabs (default: `false`).
 * @returns {string}
 *   Result.
 */ function serializeChunks(chunks, expandTabs) {
    let index = -1;
    /** @type {Array<string>} */ const result = [];
    /** @type {boolean | undefined} */ let atTab;
    while(++index < chunks.length){
        const chunk = chunks[index];
        /** @type {string} */ let value;
        if (typeof chunk === 'string') {
            value = chunk;
        } else switch(chunk){
            case __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].carriageReturn:
                {
                    value = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["values"].cr;
                    break;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].lineFeed:
                {
                    value = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["values"].lf;
                    break;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].carriageReturnLineFeed:
                {
                    value = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["values"].cr + __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["values"].lf;
                    break;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].horizontalTab:
                {
                    value = expandTabs ? __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["values"].space : __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["values"].ht;
                    break;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].virtualSpace:
                {
                    if (!expandTabs && atTab) continue;
                    value = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["values"].space;
                    break;
                }
            default:
                {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$devlop$40$1$2e$1$2e$0$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ok"])(typeof chunk === 'number', 'expected number');
                    // Currently only replacement character.
                    value = String.fromCharCode(chunk);
                }
        }
        atTab = chunk === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].horizontalTab;
        result.push(value);
    }
    return result.join('');
}
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/parse.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parse",
    ()=>parse
]);
/**
 * @import {
 *   Create,
 *   FullNormalizedExtension,
 *   InitialConstruct,
 *   ParseContext,
 *   ParseOptions
 * } from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$combine$2d$extensions$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$combine$2d$extensions$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-combine-extensions@2.0.1/node_modules/micromark-util-combine-extensions/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$content$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/content.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$document$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/document.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$flow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/flow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$constructs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/constructs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$create$2d$tokenizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/create-tokenizer.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
function parse(options) {
    const settings = options || {};
    const constructs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$combine$2d$extensions$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$combine$2d$extensions$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["combineExtensions"])([
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$constructs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ...settings.extensions || []
    ]);
    /** @type {ParseContext} */ const parser = {
        constructs,
        content: create(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$content$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["content"]),
        defined: [],
        document: create(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$document$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["document"]),
        flow: create(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$flow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flow"]),
        lazy: {},
        string: create(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]),
        text: create(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["text"])
    };
    return parser;
    //TURBOPACK unreachable
    ;
    /**
   * @param {InitialConstruct} initial
   *   Construct to start with.
   * @returns {Create}
   *   Create a tokenizer.
   */ function create(initial) {
        return creator;
        //TURBOPACK unreachable
        ;
        /** @type {Create} */ function creator(from) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$40$4$2e$0$2e$2$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$create$2d$tokenizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTokenizer"])(parser, initial, from);
        }
    }
}
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/postprocess.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "postprocess",
    ()=>postprocess
]);
/**
 * @import {Event} from 'micromark-util-types'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$subtokenize$40$2$2e$1$2e$0$2f$node_modules$2f$micromark$2d$util$2d$subtokenize$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-subtokenize@2.1.0/node_modules/micromark-util-subtokenize/dev/index.js [app-ssr] (ecmascript) <locals>");
;
function postprocess(events) {
    while(!(0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$subtokenize$40$2$2e$1$2e$0$2f$node_modules$2f$micromark$2d$util$2d$subtokenize$2f$dev$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subtokenize"])(events)){
    // Empty
    }
    return events;
}
}),
"[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/preprocess.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "preprocess",
    ()=>preprocess
]);
/**
 * @import {Chunk, Code, Encoding, Value} from 'micromark-util-types'
 */ /**
 * @callback Preprocessor
 *   Preprocess a value.
 * @param {Value} value
 *   Value.
 * @param {Encoding | null | undefined} [encoding]
 *   Encoding when `value` is a typed array (optional).
 * @param {boolean | null | undefined} [end=false]
 *   Whether this is the last chunk (default: `false`).
 * @returns {Array<Chunk>}
 *   Chunks.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/codes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/open-plugin/docs/node_modules/.pnpm/micromark-util-symbol@2.0.1/node_modules/micromark-util-symbol/lib/constants.js [app-ssr] (ecmascript)");
;
const search = /[\0\t\n\r]/g;
function preprocess() {
    let column = 1;
    let buffer = '';
    /** @type {boolean | undefined} */ let start = true;
    /** @type {boolean | undefined} */ let atCarriageReturn;
    return preprocessor;
    //TURBOPACK unreachable
    ;
    /** @type {Preprocessor} */ // eslint-disable-next-line complexity
    function preprocessor(value, encoding, end) {
        /** @type {Array<Chunk>} */ const chunks = [];
        /** @type {RegExpMatchArray | null} */ let match;
        /** @type {number} */ let next;
        /** @type {number} */ let startPosition;
        /** @type {number} */ let endPosition;
        /** @type {Code} */ let code;
        value = buffer + (typeof value === 'string' ? value.toString() : new TextDecoder(encoding || undefined).decode(value));
        startPosition = 0;
        buffer = '';
        if (start) {
            // To do: `markdown-rs` actually parses BOMs (byte order mark).
            if (value.charCodeAt(0) === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].byteOrderMarker) {
                startPosition++;
            }
            start = undefined;
        }
        while(startPosition < value.length){
            search.lastIndex = startPosition;
            match = search.exec(value);
            endPosition = match && match.index !== undefined ? match.index : value.length;
            code = value.charCodeAt(endPosition);
            if (!match) {
                buffer = value.slice(startPosition);
                break;
            }
            if (code === __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].lf && startPosition === endPosition && atCarriageReturn) {
                chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].carriageReturnLineFeed);
                atCarriageReturn = undefined;
            } else {
                if (atCarriageReturn) {
                    chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].carriageReturn);
                    atCarriageReturn = undefined;
                }
                if (startPosition < endPosition) {
                    chunks.push(value.slice(startPosition, endPosition));
                    column += endPosition - startPosition;
                }
                switch(code){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].nul:
                        {
                            chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].replacementCharacter);
                            column++;
                            break;
                        }
                    case __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].ht:
                        {
                            next = Math.ceil(column / __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["constants"].tabSize) * __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["constants"].tabSize;
                            chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].horizontalTab);
                            while(column++ < next)chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].virtualSpace);
                            break;
                        }
                    case __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].lf:
                        {
                            chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].lineFeed);
                            column = 1;
                            break;
                        }
                    default:
                        {
                            atCarriageReturn = true;
                            column = 1;
                        }
                }
            }
            startPosition = endPosition + 1;
        }
        if (end) {
            if (atCarriageReturn) chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].carriageReturn);
            if (buffer) chunks.push(buffer);
            chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$open$2d$plugin$2f$docs$2f$node_modules$2f2e$pnpm$2f$micromark$2d$util$2d$symbol$40$2$2e$0$2e$1$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codes"].eof);
        }
        return chunks;
    }
}
}),
];

//# sourceMappingURL=b4d0a_micromark_dev_lib_c1f67ea7._.js.map