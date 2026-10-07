# isDisposable API

Real-time disposable email detection with DNS/MX checks, risk scoring and domain age. Docs: https://isdisposable.com/docs/api-reference

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 3 entities and 3 HTTP routes. There are 2 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Bulk

Results: Bulk check results.

SDK operations: `create`.

### Check

Results: Check result.

SDK operations: `create`.

Key fields to recognise:

- `email`: The email address to check.
- `error`: Set on a bulk result item that could not be checked.
- `reason`: Why the email was flagged. Values seen in the API source: `blocklist_match`, `mx_blocklist_match`, `mx_invalid`, `self_referencing_mx`, `suspicious_ip`, `suspicious_mx`, `domain_new`, `plus_addressing`, `suspicious_username`, `custom_block`, `custom_allow`, clean.
- `score`: Risk score from 0 (safe) to 100 (definitely disposable).

### Health

Results: API status.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Bulk | `create` | `POST /v1/check/bulk` | Required |
| Check | `create` | `POST /v1/check` | Required |
| Health | `load` | `GET /v1/health` | Not required |

## Connect to the API

- API server: `https://isdisposable.com/api`

The default credential is sent in the `x-api-key` header.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /v1/health`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://isdisposable.com/api/v1/health'
```

Inspect the response using the Health reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Python | `py/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

