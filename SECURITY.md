# Security · agent-soul-pack

## Reporting

Email the KINFX maintainer privately for vulnerabilities. Do not open public issues with exploit details or leaked secrets.

## Secrets policy

- No real credentials in git, CI logs, templates, or examples.
- Runtime keys: `$DSH_HOME/.credentials.yaml` or user secret store.
- This M0 ships Markdown templates and install docs only — no network auth.

## Supply chain

Pin host `@deepseek-ai/dsh@0.2.1-rc.5` when following the wiring guide. Persona engine is upstream `dsh-soul-md` (MIT); re-verify peers before upgrading.
