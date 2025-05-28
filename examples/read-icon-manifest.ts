// Example usage of manifest.json

const ICON_MANIFEST_URL =
  'https://raw.githubusercontent.com/deniszholob/icons-factorio/refs/heads/main/factorio-icons/manifest.json';

export interface IconEntry {
  key: string;
  path: string;
}

/**
 * GET manifest.json from url and parse it to IconEntry[] array
 * @param fileUrl - The URL of the file to download.
 * @returns A promise that resolves to an array of IconEntry
 */
export function readIconManifest(fileUrl: string): Promise<IconEntry[]> {
  return fetch(fileUrl)
    .then((res: Response): Promise<Record<string, string>> => res.json())
    .then((manifest: Record<string, string>): IconEntry[] =>
      Object.entries(manifest).map(
        ([key, iconPath]: [string, string]): IconEntry => ({
          key,
          path: iconPath,
        }),
      ),
    )
    .catch((err: unknown): IconEntry[] => {
      console.error('Failed to load manifest.json', err);
      return [];
    });
}

async function main() {
  const icons: IconEntry[] = await readIconManifest(ICON_MANIFEST_URL);
  console.log(icons.slice(0, 5));
}

main();
