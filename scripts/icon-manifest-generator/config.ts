export interface ManifestConfig {
  rootDir: string;
  hostDir: string;
  sortKeys?: boolean;
}

export const MANIFEST_CONFIG: ManifestConfig = {
  rootDir: 'factorio-icons',
  hostDir:
    'https://raw.githubusercontent.com/deniszholob/icons-factorio/refs/heads/main/',
  sortKeys: true,
};
