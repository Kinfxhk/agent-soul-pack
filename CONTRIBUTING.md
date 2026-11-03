# Contributing · agent-soul-pack

## Scope

M0 is a **template pack** (soul / user / agent Markdown) plus docs wiring to npm `dsh-soul-md`. Do **not** reimplement a persona/memory engine here.

## Clean-room

Do not copy competitor UI, strings, or assets. Do not put vendor brand names in the product title (technical “compatible with DSH” in docs is OK). Avoid bare DeepSeek / Grok product branding in templates.

## Secrets

Never commit API keys, tokens, or `.credentials.yaml`. Use `.env.example` with empty values only.

## AI-assisted development

Human (or maintaining agent) must review every line. Run `npm run check` before claiming done. Disclose AI tools in PR text when contributing publicly.

## Checks

```bash
npm run check
```

## License

MIT. By contributing you agree your changes are MIT-licensed.
