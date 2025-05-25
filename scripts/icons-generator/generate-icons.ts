import fs from "fs";
import path from "path";
import sharp, { Region } from "sharp";
import { FACTORIO_ICON_CONFIG, CropConfig } from "./config";

async function main(): Promise<void> {
  const cleared = new Set<string>();

  for (const config of FACTORIO_ICON_CONFIG.entries) {
    const absInput = path.resolve(config.inputFolder);
    const absOutput = path.resolve(config.outputFolder);

    if (FACTORIO_ICON_CONFIG.clear && !cleared.has(absOutput)) {
      clearDirectory(absOutput);
      cleared.add(absOutput);
    }

    await processDirectory(config, absInput, absOutput);
  }
}

async function processDirectory(
  config: CropConfig,
  currentInput: string,
  currentOutput: string
): Promise<void> {
  console.log(`Processing Directory: ${currentInput} → ${currentOutput}`);
  const entries = fs.readdirSync(currentInput, { withFileTypes: true });

  for (const entry of entries) {
    const name = entry.name;

    // If a whitelist exists, skip anything not in it
    if (config.whitelist && !config.whitelist.includes(name)) {
      console.log(`Skipped (not whitelisted): ${name}`);
      continue;
    }

    // If a blacklist exists, skip anything in it
    if (config.blacklist && config.blacklist.includes(name)) {
      console.log(`Skipped (blacklisted): ${name}`);
      continue;
    }

    const inputPath = path.join(currentInput, entry.name);
    // let outputPath = path.join(currentOutput, entry.name);
    const safeName = entry.name.replace(/_/g, "-");
    let outputPath = path.join(currentOutput, safeName);

    if (entry.isDirectory()) {
      fs.mkdirSync(outputPath, { recursive: true });
      await processDirectory(config, inputPath, outputPath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
      const ext = path.extname(entry.name);
      const baseName = path.basename(entry.name, ext);

      if (FACTORIO_ICON_CONFIG.suffix) {
        let width: number | undefined;
        let height: number | undefined;

        if (config.resize) {
          width = config.resize.w;
          height = config.resize.h;
        } else if (config.cutRegion) {
          width = config.cutRegion.width;
          height = config.cutRegion.height;
        } else {
          const metadata = await sharp(inputPath).metadata();
          width = metadata.width;
          height = metadata.height;
        }

        if (width && height) {
          const suffix = `${width}x${height}`; // Replace underscores with hyphens in the base name
          // outputPath = path.join(currentOutput, `${baseName}_${suffix}${ext}`);
          const safeBaseName = baseName.replace(/_/g, "-");
          outputPath = path.join(
            currentOutput,
            `${safeBaseName}_${suffix}${ext}`
          );
        }
      }

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      await processImage(inputPath, outputPath, config);
    }
  }
}

/** @see https://sharp.pixelplumbing.com/ */
async function processImage(
  inputPath: string,
  outputPath: string,
  config: CropConfig
): Promise<void> {
  console.log(`Processing Image: ${inputPath} → ${outputPath}`);
  let image = sharp(inputPath);

  if (config.cutRegion) {
    // @see https://sharp.pixelplumbing.com/api-extract
    image = image.extract(config.cutRegion);
  }

  if (config.resize) {
    // @see https://sharp.pixelplumbing.com/api-resize#extract
    image = image.resize(config.resize.w, config.resize.h, { fit: "outside" });
  }

  // If neither cut nor resize, just copy the file
  if (!config.cutRegion && !config.resize) {
    fs.copyFileSync(inputPath, outputPath);
    console.log(`Copied: ${outputPath}`);
  } else {
    await image.toFile(outputPath);
    console.log(`Saved: ${outputPath}`);
  }
}

function clearDirectory(dir: string): void {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Cleared: ${dir}`);
  }
}

main()
  .then(() => console.log("✅ Done"))
  .catch((err) => console.error("❌ Error:", err));
