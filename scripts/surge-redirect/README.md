# Surge.sh Redirect Shim

Mientras Meta aprueba el template nuevo de WhatsApp con botón apuntando a `humanio.digital`, este shim hace que cualquier click del template actual (que va a `humanio.surge.sh/{slug}`) termine en `humanio.digital/?ref={slug}`.

## Deploy (una sola vez, manual)

```bash
cd scripts/surge-redirect/
SURGE_TOKEN=$SURGE_TOKEN surge . humanio.surge.sh
```

Después puedes deployar lo que quieras dentro de subcarpetas (`humanio.surge.sh/{slug}/`) — Surge sirve el `index.html` de la raíz solo cuando la ruta exacta no existe como subcarpeta. Pero como ya no construimos subcarpetas en cold, todos los slugs caerán al index → redirect.

## Cuando llegue el template nuevo aprobado por Meta

- Botón URL del nuevo template: `https://humanio.digital/?ref={{1}}`
- Cuando esté aprobado, actualiza `outreach-proposals/SKILL.md` para usar el nombre nuevo del template.
- Este shim se vuelve innecesario, pero puede quedarse como branding/seguridad por si algún cliente viejo todavía clickea links viejos.
