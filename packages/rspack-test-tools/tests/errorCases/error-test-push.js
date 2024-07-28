/** @type {import('../..').TErrorCaseConfig} */
module.exports = {
	description: "Testing proxy methods on errors: test push",
	options() {
		return {
			entry: "./resolve-fail-esm",
			plugins: [
				compiler => {
					compiler.hooks.afterCompile.tap("test push", compilation => {
						compilation.errors.push(new Error("test push"));
					});
				}
			]
		};
	},
	async check(diagnostics) {
		expect(diagnostics).toMatchInlineSnapshot(`
		Object {
		  "errors": Array [
		    Object {
		      "message": "  × Error: test push\\n  │     at xxx\\n  │     at xxx\\n  │     at xxx\\n  │     at xxx\\n  │     at xxx\\n  │     at xxx\\n",
		      "moduleTrace": Array [],
		      "stack": "Error: test push\\n    at Object.fn (<cwd>packages/rspack-test-tools/tests/errorCases/error-test-push.js:10:31)\\n    at next (<cwd>packages/rspack-lite-tapable/src/index.ts:773:10)\\n    at AsyncSeriesHook.callAsyncStageRange (<cwd>packages/rspack-lite-tapable/src/index.ts:790:3)\\n    at AsyncSeriesHook.callAsync (<cwd>packages/rspack-lite-tapable/src/index.ts:218:15)\\n    at <cwd>packages/rspack/src/Compiler.ts:613:29\\n    at <cwd>packages/rspack/src/Compiler.ts:660:15",
		    },
		    Object {
		      "message": "  × Module not found: Can't resolve './answer' in '<cwd>packages/rspack-test-tools/tests/fixtures/errors/resolve-fail-esm'\\n   ╭────\\n 1 │ import { answer } from './answer'\\n   ·                        ──────────\\n   ╰────\\n  help: Did you mean './answer.js'?\\n        \\n        The request './answer' failed to resolve only because it was resolved as fully specified,\\n        probably because the origin is strict EcmaScript Module,\\n        e. g. a module with javascript mimetype, a '*.mjs' file, or a '*.js' file where the package.json contains '\\"type\\": \\"module\\"'.\\n        \\n        The extension in the request is mandatory for it to be fully specified.\\n        Add the extension to the request.\\n",
		      "moduleId": "./resolve-fail-esm/index.js",
		      "moduleIdentifier": "javascript/esm|<cwd>packages/rspack-test-tools/tests/fixtures/errors/resolve-fail-esm/index.js",
		      "moduleName": "./resolve-fail-esm/index.js",
		      "moduleTrace": Array [],
		    },
		  ],
		  "warnings": Array [],
		}
	`);
	}
};
