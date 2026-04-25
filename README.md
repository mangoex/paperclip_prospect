# Humanio ![Org Chart](images/org-chart.png)

## What's Inside

> This is an [Agent Company](https://agentcompanies.io) package from [Paperclip](https://paperclip.ing)

| Content | Count |
|---------|-------|
| Agents | 10 |
| Projects | 1 |
| Skills | 51 |
| Tasks | 2 |

### Agents

| Agent | Role | Reports To | Active in flow |
|-------|------|------------|---|
| CEO | CEO | — | both |
| Scout | general | ceo | cold + demo enrichment |
| Qualifier | general | ceo | cold |
| Outreach | general | ceo | cold |
| Closer | general | ceo | cold + demo trigger |
| DesignPlanner | general | ceo | demo only (paused heartbeat) |
| WebBuilder | general | ceo | demo only (paused heartbeat) |
| WebQA | general | ceo | demo only (paused heartbeat) |
| WebPublisher | general | ceo | demo only (paused heartbeat) |
| DataAnalyst | researcher | ceo | metrics |

### Business Model

| Package | Price | Includes |
|---------|-------|----------|
| Starter | $27 USD/mo | Professional website + WhatsApp link + contact form |
| Pro | $47 USD/mo | All Starter + WhatsApp Chatbot with business info |
| Business | $97 USD/mo | All Pro + AI Chatbot with appointment scheduling |

## Pipeline — dos flujos separados

### COLD (default — outbound prospecting)

```
CEO → Scout → Qualifier → Outreach → Closer (espera respuesta)
```

NO se construye sitio. NO se publica nada en Surge. El Outreach manda WhatsApp template + email con 3-4 hallazgos del Qualifier y CTA → `humanio.digital/?ref={slug}`.

### DEMO (solo cuando el prospecto pidió ver una propuesta)

Disparado por Closer cuando un prospecto respondió con interés y pidió ver algo:

```
Closer (demo intake) → DesignPlanner → WebBuilder → WebQA → WebPublisher → Closer (entrega URL)
```

Esto SÍ construye sitio. Es 1 demo a la vez, no producción masiva. Los 4 agentes web tienen heartbeat **paused** — solo se activan por mensaje directo del Closer o del agente anterior en la cadena demo.

## WhatsApp Templates aprobados por Meta

| Template | Uso | Variables body | Button URL |
|---|---|---|---|
| `humanio_prospecto_inicial` | msg1 cold (Outreach) | {{1}}=Nombre, {{2}}=Especialidad, {{3}}=Ciudad, {{4}}=Keyword, {{5}}=Negocio | `https://humanio.surge.sh/{{1}}` (donde {{1}}=ref_slug) |
| `humanio_seguimiento_1` | msg2 día 3 (Closer) | {{1}}=Nombre, {{2}}=Empresa, {{3}}=Objetivo | `https://humanio.surge.sh/{{1}}` |
| `humanio_seguimiento_2` | msg3 día 7 (Closer) | {{1}}=Nombre, {{2}}=Empresa | `https://humanio.surge.sh/{{1}}` |

> **Importante**: como ya no construimos sitio en cold, el botón del template apunta a `humanio.surge.sh/{slug}` que está cubierto por un **redirect shim** (`scripts/surge-redirect/`) que rebota a `humanio.digital/?ref={slug}`. Cuando Meta apruebe templates nuevos con URL directa a `humanio.digital`, el shim se vuelve innecesario.

## Setup inicial — UNA SOLA VEZ

1. Deploy del redirect shim:
   ```bash
   cd scripts/surge-redirect/
   SURGE_TOKEN=$SURGE_TOKEN surge . humanio.surge.sh
   ```
2. Configurar env vars en cada agente del panel de Paperclip — ver `.paperclip.yaml`.

## Skills

51 skills incluyendo: alert-manager, backlink-analyzer, competitor-analysis, content-gap-analysis, content-quality-auditor, content-refresher, domain-authority-auditor, entity-optimizer, geo-content-optimizer, internal-linking-optimizer, keyword-research, memory-management, meta-tags-optimizer, on-page-seo-auditor, performance-reporter, rank-tracker, schema-markup-generator, seo-content-writer, serp-analysis, technical-seo-checker, frontend-design, outreach-proposals, qualifier-prospect-auditor, qualifier-seo, scout-prospector, frontend-design-review, frontend-ui-dark-ts, closer-sales, sales-copywriting, dataanalyst-pipeline, web-qa, qualifier-diagnostic-html, package-pricing, package-outreach, saas-metrics, retention-playbook, ui-ux-pro-max, paperclip-create-agent, paperclip-create-plugin, paperclip, para-memory-files, objection-handling, social-selling, cold-outreach, lead-qualification, web-scraping, web-template-system, web-premier-system, layout-blueprints, design-styles, dataanalyst-dashboard-html

## Getting Started

```bash
pnpm paperclipai company import https://github.com/mangoex/paperclip_prospect.git
```

See [Paperclip](https://paperclip.ing) for more information.

---

> Humanio — Inteligencia Artificial para negocios
