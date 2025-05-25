import * as fs from 'fs/promises';
import * as path from 'path';
import { MANIFEST_CONFIG, ManifestConfig } from './config';

interface FileInfo {
  absPath: string;
  relPathFromRoot: string;
  folderRelativeToRoot: string;
  fileName: string;
}

async function main(): Promise<void> {
  const rootDir = path.resolve(MANIFEST_CONFIG.rootDir);
  const allFiles = await scanPngFiles(rootDir, rootDir);

  const keyMap = generateUniqueKeys(allFiles);
  console.log(keyMap);
  const folderToFiles = groupFilesByFolder(allFiles, rootDir);

  // Write per-folder manifests
  await Promise.all(
    [...folderToFiles.entries()].map(async ([folder, files]) => {
      const manifest: Record<string, string> = {};
      for (const file of files) {
        manifest[keyMap.get(file.absPath)!] = file.relPathFromRoot.replace(
          /\\/g,
          '/',
        );
      }

      const sortedManifest = MANIFEST_CONFIG.sortKeys
        ? sortObjectByKey(manifest)
        : manifest;

      const manifestPath = path.join(folder, 'manifest.json');
      await fs.writeFile(manifestPath, JSON.stringify(sortedManifest, null, 2));
      console.log(`✅ Manifest written to: ${manifestPath}`);
    }),
  );

  // Always write root manifest
  const rootManifest: Record<string, string> = {};
  for (const file of allFiles) {
    rootManifest[keyMap.get(file.absPath)!] = file.relPathFromRoot.replace(
      /\\/g,
      '/',
    );
  }

  const sortedRootManifest = MANIFEST_CONFIG.sortKeys
    ? sortObjectByKey(rootManifest)
    : rootManifest;

  const rootManifestPath = path.join(rootDir, 'manifest.json');
  await fs.writeFile(
    rootManifestPath,
    JSON.stringify(sortedRootManifest, null, 2),
  );
  console.log(`✅ Root manifest written to: ${rootManifestPath}`);
}

async function scanPngFiles(
  currentDir: string,
  rootDir: string,
): Promise<FileInfo[]> {
  const results: FileInfo[] = [];
  const entries = await fs.readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      const subResults = await scanPngFiles(fullPath, rootDir);
      results.push(...subResults);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      const relPathFromRoot = path.relative(rootDir, fullPath);
      const folderRelativeToRoot = path.dirname(relPathFromRoot);
      results.push({
        absPath: fullPath,
        // relPathFromRoot,
        // relPathFromRoot: path.join(MANIFEST_CONFIG.rootDir, relPathFromRoot),
        relPathFromRoot: path.join(
          path.basename(MANIFEST_CONFIG.rootDir),
          relPathFromRoot,
        ),
        folderRelativeToRoot,
        fileName: entry.name,
      });
    }
  }

  return results;
}

function generateUniqueKeys(allFiles: FileInfo[]): Map<string, string> {
  const keyCounts = new Map<string, number>();
  const result = new Map<string, string>();

  const sortedFiles = [...allFiles].sort((a, b) => {
    const depthA = a.folderRelativeToRoot
      .split(path.sep)
      .filter(Boolean).length;
    const depthB = b.folderRelativeToRoot
      .split(path.sep)
      .filter(Boolean).length;
    return depthA - depthB;
  });

  for (const file of sortedFiles) {
    const parts = file.folderRelativeToRoot.split(path.sep).filter(Boolean);
    const baseName = file.fileName.split('.')[0];

    if (parts.length === 0) {
      let key = baseName;
      if (keyCounts.has(key)) {
        let counter = 2;
        let newKey = `${key}_${counter}`;
        while (keyCounts.has(newKey)) {
          counter++;
          newKey = `${key}_${counter}`;
        }
        key = newKey;
        console.warn(
          `⚠️ Duplicate filename detected in root folder.\n` +
            `Using numeric suffix key: "${key}" for file: ${file.relPathFromRoot}`,
        );
      }
      keyCounts.set(key, 1);
      result.set(file.absPath, key);
      continue;
    }

    let prefixIndex = parts.length - 1;
    let key = `${parts[prefixIndex]}_${baseName}`;

    while (keyCounts.has(key) && prefixIndex > 0) {
      prefixIndex--;
      const prefix = parts.slice(prefixIndex).join('_');
      key = `${prefix}_${baseName}`;
    }

    if (keyCounts.has(key)) {
      let counter = 2;
      let newKey = `${key}_${counter}`;
      while (keyCounts.has(newKey)) {
        counter++;
        newKey = `${key}_${counter}`;
      }
      console.warn(
        `⚠️ Duplicate filename detected in manifest for folder "${file.folderRelativeToRoot}".\n` +
          `Original key: "${baseName}" is already used.\n` +
          `Using prefixed key: "${newKey}" instead.`,
      );
      key = newKey;
    }

    keyCounts.set(key, 1);
    result.set(file.absPath, key);
  }

  return result;
}

function groupFilesByFolder(
  allFiles: FileInfo[],
  rootDir: string,
): Map<string, FileInfo[]> {
  const map = new Map<string, FileInfo[]>();
  for (const file of allFiles) {
    const absFolder = path.join(rootDir, file.folderRelativeToRoot);
    let currentFolder = absFolder;

    while (currentFolder.startsWith(rootDir)) {
      if (!map.has(currentFolder)) {
        map.set(currentFolder, []);
      }
      map.get(currentFolder)!.push(file);

      if (currentFolder === rootDir) break;
      currentFolder = path.dirname(currentFolder);
    }
  }
  return map;
}

function sortObjectByKey(obj: Record<string, string>): Record<string, string> {
  const sortedKeys = Object.keys(obj).sort();
  const sortedObj: Record<string, string> = {};
  for (const key of sortedKeys) {
    sortedObj[key] = obj[key];
  }
  return sortedObj;
}

main()
  .then(() => console.log('✅ Done'))
  .catch((err) => console.error('❌ Error:', err));
