# Factorio Icons

Extracted Icons from Factorio

Use the [factorio-icons/manifest.json](./factorio-icons/manifest.json) to programmatically import

e.g.

```ts
fetch("https://raw.githubusercontent.com/deniszholob/icons-factorio/refs/heads/main/factorio-icons/manifest.json")
  .then((res: Response): Promise<Record<string, string>> => res.json())
  .then((manifest: Record<string, string>) => {
    // TODO: Use icons
    const [key, path] = Object.entries(manifest);
  })
  .catch((err) => {
    console.error("Failed to load manifest.json", err);
  });
```

# Support Me

If you find the cheat sheet or the source code useful, consider:

- Donating Ko-fi: https://ko-fi.com/deniszholob
- Supporting on Patreon: https://www.patreon.com/deniszholob
