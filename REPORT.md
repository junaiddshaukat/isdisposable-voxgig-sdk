# Voxgig SDK generator: developer experience report

**Author:** Junaid Shaukat · **Date:** 7 October 2026
**SDK:** isDisposable API → TypeScript + Python, generated with `@voxgig/sdkgen` 4.34.1 (`@voxgig/create-sdkgen` 0.30.6), Node 24.12, Python 3.14, macOS.

## Why this API

[isDisposable](https://isdisposable.com) is my own disposable email detection API. Its hand-written JS SDK (`@isdisposable/js`) has 70K+ npm downloads, so I could compare the generated SDK against one I already maintain. It has a free tier with an API key, and it isn't in the voxgig-sdk catalogue. It's also a stress test for the generator: the API is RPC-style (`POST /v1/check`, `POST /v1/check/bulk`, `GET /v1/health`) rather than CRUD on resources.

## Timeline

The API serves `/api/v1/openapi.json`, but it's a stub with no schemas or operationIds, and the docs don't link to it. So I wrote a fuller 3-endpoint spec (`.sdk/def/isdisposable-openapi.yaml`) from the API docs, then corrected it against what the live API actually returned. Times below are from my log (`HH:MM:SS`).

| Time | Step |
| --- | --- |
| 19:48:09 | `npm create @voxgig/sdkgen@latest -- isdisposable -o isdisposable-sdk -d ./isdisposable-openapi.yaml` |
| 19:48:30 | **Failed:** `npm ERESOLVE` (bug 1 below) |
| 19:48:39 | Worked around it by bumping `@voxgig/apidef` in `.sdk/package.json`, then `npm install` |
| 19:48:46 | `npm run add-target ts`, `npm run add-feature test` |
| 19:48:55 | `npm run build && npm run generate`: 3 entities, about 1 s |
| 19:49:04 | TypeScript SDK built; tests: 211 passed, 10 skipped, 0 failed |
| 19:49:25 | **First live call through the SDK:** `client.Health().load()` returned `{status: 'ok'}` |
| 19:53:58 | Set the publisher and repo in `model/project.aontu`, added the `py` target, regenerated |
| 19:54:22 | Python SDK: 198 passed, 89 skipped, 0 failed |
| 20:00:35 | **Live with API key:** `Check().create({email})` and `Bulk().create({emails})` returned real results in TypeScript and Python |

From the scaffold command to a working multi-language SDK took about 6 minutes, including one install failure. My hands-on time, including writing the spec and this report, was within the 30-minute limit. I used Claude Code to run the commands and read the generator source. I checked every claim here by running the code or reading the generated output.

## What worked well

- **Fast, and the tests are green out of the box.** It generated about 760 files across two languages in about 1 s, and both test suites passed without me editing anything.
- **Auth came straight from the spec.** The `x-api-key` header scheme (`apiKey` in the header) was picked up correctly, and the README tells you to use the `ISDISPOSABLE_APIKEY` environment variable.
- **`direct()` is a good escape hatch.** It never throws and it returns the full response, including the API's own error message.
- **Offline test mode** (`IsdisposableSDK.test()`) and the network simulator are things my hand-written SDK doesn't have.
- **Agent-ready files.** `AGENTS.md`, `CLAUDE.md` and `REFERENCE.md` are generated per language, which fits how people now consume SDKs.
- **The project overlay is well designed.** `model/project.aontu` says clearly that it's yours and is never overwritten. The comments in it saved me time, for example where it explains a confusing unification error.

## Bugs and friction (most important first)

1. **The documented quickstart fails on a clean machine.** `@voxgig/create-sdkgen@0.30.6` writes `"@voxgig/apidef": "~8.22.1"`, but the `@voxgig/sdkgen@~4.34.0` it installs (4.34.1) declares `peer @voxgig/apidef >=8.23.0`. The result is `npm error ERESOLVE unable to resolve dependency tree`, followed by `Voxgig Create SDK Error: npm install exited with code 1`. It leaves a half-scaffolded directory, and the message doesn't say how to recover. *Fix:* release create-sdkgen together with sdkgen, or derive the pins from sdkgen's own peerDependencies, and add a CI job that runs the README quickstart on a clean machine.
2. **Entity calls drop the API's error message.** Without a key, the API returns `401 {"error":"Missing API key. Pass your key in the x-api-key header. Get one at https://isdisposable.com/signup"}`. `client.Check().create(...)` turns that into `IsdisposableSDK: create: request: 401: Unauthorized` in both TypeScript and Python. A 400 behaves the same way: `{"error":"emails must be a non-empty array"}` becomes `400: Bad Request`. The most useful line for a new user is lost; only `direct()` keeps it. *Fix:* when the response has an `error` or `message` field, include it in the thrown error.
3. **RPC endpoints get CRUD names.** `POST /v1/check` becomes `client.Check().create({email})`, and `POST /v1/check/bulk` becomes a separate `Bulk` entity with `create`. It works, but a reader would expect something like `client.Check().run()`, `client.check(email)` or `client.Check().bulk([...])`. Many SaaS APIs are action-shaped (validate, send, convert), so this shows up often. *Fix:* turn a non-CRUD `operationId` such as `checkEmail` into a named method, or document how to rename operations in the overlay.
4. **The scaffold argues with itself about `log/`.** Every `add-target` and `generate` prints `WARN … .sdk/.gitignore ignores log/, so .sdk/log/copies.jsonl is not committed … Delete the log/ line.` The `.gitignore` it complains about comes from the scaffold itself. *Fix:* change the template.
5. **The generated README examples don't work against the real API.** The README shows `client.Check().create({})` and `client.Bulk().create({ emails: [] })`. I ran both against the live API and both return 400. This still happens after I added `required: [email]`, `minItems: 1` and `example:` values to the spec, so the generator ignores all three when it writes examples. The TypeScript README tutorial also jumps from step 1 to step 4 and has a heading "Create, update, and remove" for an entity that only supports create. *Fix:* fill examples from the spec's `example` values or the schema (`minItems`), and number steps based on the operations that actually exist.
6. **The "unofficial" disclaimer is hard-coded.** `pkgDescription` and `nonAffiliation` always say "Unofficial … Not affiliated with or endorsed by the upstream API provider", even when the API owner generates their own SDK, as here. It also defaults to `@voxgig-sdk/...` npm package names. *Fix:* add a `main: kit: publisher: official: true` option.
7. **Naming inconsistencies.** The brand `isDisposable` becomes `Isdisposable` and `IsdisposableSDK`. The record accessor is `entity.data()` in TypeScript but `entity.data_get()` in Python. There's also a typo: "This SDK ships 1 optional features".
8. **Docs gap: real keys and live tests.** The tutorial only covers the offline mock. I had to read `PrepareAuthUtility` to confirm how the key is sent. A short section on running against the real API with a key, and how to run the live suite, would close the loop.

## A finding about my own API

The live test also caught documentation drift in isDisposable. The API returned `reason: "mx_blocklist_match"`, which isn't in the documented list. The source has 12 reason values, but the docs list 7. I changed the spec to describe the real set and added the per-item `error` field that bulk results can contain. That's exactly the kind of drift that a spec-first SDK workflow exposes. The fix on my side is to publish a complete `openapi.json` and generate docs from it.

## Recommendations (ranked by impact on a new user)

1. Make the quickstart fail-proof: version-lock create-sdkgen to sdkgen and run the quickstart in CI.
2. Show the API's error message in thrown errors.
3. Support action-style (RPC) operations, so `operationId` becomes the method name.
4. Add a "Run it against the real API" section to the tutorial, covering the key environment variable and the live test mode.
5. Add an `official` publisher flag and a brand-casing override (`isDisposable`, not `Isdisposable`).
6. Fill README examples from the spec's `example`, `required` and `minItems` values, so the first snippet a developer copies actually works.
7. Fix the self-contradicting `.gitignore` warning and the README step numbering.

## Repo layout

- `.sdk/`: generator project (spec in `.sdk/def/`, my overrides in `.sdk/model/project.aontu`)
- `ts/`: TypeScript SDK
- `py/`: Python SDK
