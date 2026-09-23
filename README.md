# CefyrCare · Sandkasse

En liten sandkasse for å teste Git-arbeidsflyten vår: en MVA-kalkulator som
nettside, med tester og automatisk deploy til GitHub Pages.

## Flyten

1. Lag en branch fra `main`: `git switch -c min-endring`
2. Gjør endringen, og kjør `npm run lint` og `npm test` lokalt.
3. Push branchen og åpne en pull request mot `main`. Fyll ut PR-malen.
4. CI (`test`) må være grønn, og branchen må være oppdatert mot `main`.
5. En annen enn forfatteren må godkjenne PR-en.
6. PR-en squash-merges (gjerne med auto-merge), og branchen slettes automatisk.
7. Push til `main` trigger deploy til GitHub Pages. Versjonen (commit og
   tidspunkt) vises øverst på siden.

Ingen kan pushe direkte til `main`, force-pushe eller slette den. Dette
håndheves av et ruleset i repoet, uten unntak.

## Lokalt

Krever Node 22 eller nyere, og ingen npm-avhengigheter.

```bash
npm run lint
npm test
```

Siden bruker ES-moduler, så den må serveres over HTTP, f.eks.
`npx serve .` eller `python -m http.server`.
