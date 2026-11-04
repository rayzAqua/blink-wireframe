import { existsSync } from 'node:fs';
import { CATALOG } from '../src/content/index.ts';
import { ROLES } from '../src/content/roles.ts';
import { validateCatalog } from '../src/domain/validate.ts';
import type { ContentError } from '../src/domain/validate.ts';

const errors: ContentError[] = validateCatalog(CATALOG, ROLES);

for (const flow of CATALOG) {
  if (flow.source.trim() !== '' && !existsSync(flow.source)) {
    errors.push({ flowId: flow.id, message: `source file not found: ${flow.source}` });
  }
}

if (errors.length > 0) {
  for (const e of errors) {
    console.error(`${e.flowId}${e.screenId ? ` [${e.screenId}]` : ''}: ${e.message}`);
  }
  process.exit(1);
}

const screenCount = CATALOG.reduce((sum, flow) => sum + flow.screens.length, 0);
console.log(`content ok: ${CATALOG.length} flows, ${screenCount} screens`);
