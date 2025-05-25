import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import { EnumConfig, MANIFEST_CONFIG } from './config';

// // Converts 'IronOre' => 'Iron Ore'
// function toDisplayCase(id: string): string {
//   return id
//     .replace(/[-_]/g, ' ')
//     .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// }

// function toEnumKey(raw: string): string {
//   return raw
//     .split(/[-_]/) // split into groups
//     .map((group, index) => {
//       const clean = group.replace(/[^a-zA-Z0-9]/g, '');
//       const capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);
//       return index === 0 ? capitalized : capitalized; // all groups capitalized
//     })
//     .join('');
// }

// function toDisplay(raw: string): string {
//   const noPrefix = raw.replace(/^icons[-_]?/i, '');
//   return `Icons: ${noPrefix
//     .replace(/[-_]/g, ' ')
//     .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
//     .replace(/\b\w/g, (c) => c.toUpperCase())}`;
// }

function toEnumKey(prefix: string, name: string): string {
  let prefixFormated = prefix
    .split(/[_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('_');

  prefixFormated = prefixFormated
    .split(/[-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const nameFormated = name
    .split(/[-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return `${prefixFormated}_${nameFormated}`;
}

function toDisplay(prefix: string, name: string): string {
  let prefixFormated = prefix
    .split(/[_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(': ');

  prefixFormated = prefixFormated
    .split(/[-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  const nameFormated = name
    .split(/[-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return `${prefixFormated}: ${nameFormated}`;
}

function generateEnumFile(config: EnumConfig): void {
  const manifestPath = path.resolve(config.iconsFolderPath, 'manifest.json');
  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  const manifest: Record<string, string> = JSON.parse(manifestContent);

  const icons = Object.keys(manifest).map((id) => {
    const split = id.split(/[_]/);
    const name = split.pop() ?? '';
    const prefix = split.join('_');

    return {
      id,
      enumKey: toEnumKey(prefix, name),
      display: toDisplay(prefix, name),
      url: manifest[id],
    };
  });

  const enumName = toPascalCase(config.iconsFolderPath);
  const enumConstPrefix = toConstCase(config.iconsFolderPath);

  const templatePath = path.resolve(__dirname, config.mustacheTemplatePath);
  const template = fs.readFileSync(templatePath, 'utf8');

  const rendered = mustache.render(template, {
    icons,
    enumName,
    enumConstPrefix,
  });

  const enumFilename = `${path.basename(config.iconsFolderPath)}.enum.ts`;
  const outputPath = path.resolve(config.iconsFolderPath, enumFilename);
  fs.writeFileSync(outputPath, rendered);

  console.log(`✅ Enum file generated at: ${outputPath}`);
}

// Converts 'factorio-icons' => 'FactorioIcons'
function toPascalCase(input: string): string {
  return input
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .replace(/\s+/g, '');
}

function toConstCase(input: string): string {
  return input.toUpperCase().replace(/[-\s]+/g, '_');
}

generateEnumFile(MANIFEST_CONFIG);
