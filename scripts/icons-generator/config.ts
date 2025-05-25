import { Region } from "sharp";

export interface CropConfig {
  inputFolder: string;
  outputFolder: string;
  cutRegion?: Region;
  resize?: { w: number; h: number };
  blacklist?: string[]; // Skip if matched
  whitelist?: string[]; // Only include if matched
}

export interface SpriteCropperConfig {
  clear: boolean;
  suffix: boolean;
  entries: CropConfig[];
}

export const OUTPUT_FOLDER_BASE = "factorio-icons";

/** Note: Order matters if clear is on, have less specific output folders first
 * e.g. [a, a/b, a/b/c] vs. [a/b, a/b/c, a]
 */
export const FACTORIO_ICON_CONFIG: SpriteCropperConfig = {
  clear: true,
  suffix: false,
  entries: [
    // ================================= Core =============================== //
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/`,
      whitelist: [
        "add-icon.png",
        "background-image-logo.png",
        "bonus-icon.png",
        "clock-icon.png",
        "clone-editor-icon.png",
        "clone-icon.png",
        "custom-tag-in-map-view.png",
        "defeat.png",
        "enter-icon.png",
        "export.png",
        "factorio.png",
        "filter-blacklist.png",
        "force-editor-icon.png",
        "goto-icon.png",
        "gps-map-placeholder.png",
        "import.png",
        "item-editor-icon.png",
        "item-on-ground.png",
        "questionmark.png",
        "rail-path-not-possible.png",
        "rename-icon.png",
        "right-arrow.png",
        "robot-slot.png",
        "shoot-cursor-green.png",
        "shoot-cursor-red.png",
        "splash-screen-image.png",
        "splash-screen-image-space-age.png",
        "victory.png",
        "wube-logo.png",
      ],
      resize: { w: 64, h: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/category/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/item-group/`,
      cutRegion: { left: 128, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/entity/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/item-group/`,
      cutRegion: { left: 0, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/icons/`,
      whitelist: [
        "any-quality.png",
        "item-to-be-delivered-symbol.png",
        "rebuild-symbol.png",
        "space-age.png",
        "starmap-star.png",
        "tip.png",
        "unknown.png",
        "upgrade-symbol.png",
      ],
      resize: { w: 64, h: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/icons/`,
      whitelist: ["parametrise.png"],
      cutRegion: { left: 0, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/alerts/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/icons/alerts/`,
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/mod-manager/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/icons/mod-manager/`,
      resize: { w: 64, h: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/technology/constants",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/icons/technology/constants`,
      cutRegion: { left: 128, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/technology/effect",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/icons/technology/effect`,
      cutRegion: { left: 0, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/technology/effect-constant",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/icons/technology/effect-constant`,
      cutRegion: { left: 0, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/tooltips/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/icons/tooltips/`,
      blacklist: ["tooltip-category-electricity.png"],
      cutRegion: { left: 0, top: 0, width: 40, height: 40 },
      resize: { w: 64, h: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/tooltips/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/core/icons/tooltips/`,
      whitelist: ["tooltip-category-electricity.png"],
      cutRegion: { left: 0, top: 0, width: 33, height: 40 },
      resize: { w: 64, h: 64 },
    },
    // ================================= Base =============================== //
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/base/graphics/achievement/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/base/achievement/`,
      resize: { w: 64, h: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/base/graphics/equipment/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/base/equipment/`,
      resize: { w: 64, h: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/base/graphics/icons/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/base/icons/`,
      blacklist: ["shortcut-toolbar", "tooltips", "starmap-planet-nauvis.png"],
      cutRegion: { left: 0, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/base/graphics/icons/shortcut-toolbar/mip/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/base/icons/shortcut-toolbar`,
      cutRegion: { left: 0, top: 0, width: 24, height: 24 },
      resize: { w: 64, h: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/base/graphics/icons/tooltips/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/base/icons/tooltips`,
      cutRegion: { left: 0, top: 0, width: 40, height: 40 },
      resize: { w: 64, h: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/base/graphics/item-group/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/base/item-group/`,
      cutRegion: { left: 128, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/base/graphics/technology/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/base/technology/`,
      cutRegion: { left: 384, top: 0, width: 64, height: 64 },
    },
    // ================================= Elevated Rails =============================== //
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/elevated-rails/graphics/technology/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/elevated-rails/technology/`,
      cutRegion: { left: 384, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/elevated-rails/graphics/icons/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/elevated-rails/icons/`,
      cutRegion: { left: 0, top: 0, width: 64, height: 64 },
    },
    // ================================= Quality =============================== //
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/quality/graphics/technology/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/quality/technology/`,
      cutRegion: { left: 384, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/quality/graphics/icons/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/quality/icons/`,
      blacklist: [
        "quality-uncommon.png",
        "quality-rare.png",
        "quality-epic.png",
        "quality-legendary.png",
      ],
      cutRegion: { left: 0, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/quality/graphics/icons/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/quality/icons/`,
      whitelist: [
        "quality-uncommon.png",
        "quality-rare.png",
        "quality-epic.png",
        "quality-legendary.png",
      ],
    },
    // ================================= Space Age =============================== //
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/space-age/graphics/achievement/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/space-age/achievement/`,
      resize: { w: 64, h: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/space-age/graphics/equipment/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/space-age/equipment/`,
      resize: { w: 64, h: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/space-age/graphics/icons/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/space-age/icons/`,
      blacklist: [
        "fulgurite-small.png",
        "starmap-planet-aquilo.png",
        "starmap-planet-fulgora.png",
        "starmap-planet-gleba.png",
        "starmap-planet-vulcanus.png",
        "starmap-shattered-planet.png",
        "tooltips",
      ],
      cutRegion: { left: 0, top: 0, width: 64, height: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/space-age/graphics/icons/tooltips/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/space-age/icons/tooltips`,
      cutRegion: { left: 0, top: 0, width: 40, height: 40 },
      resize: { w: 64, h: 64 },
    },
    {
      inputFolder:
        "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/space-age/graphics/item-group/",
      outputFolder: `${OUTPUT_FOLDER_BASE}/space-age/item-group/`,
      cutRegion: { left: 128, top: 0, width: 64, height: 64 },
    },
  ],
};

// Not usefull
// {
//   inputFolder:
//     "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/base/graphics/decorative/",
//   outputFolder: `${OUTPUT_FOLDER_BASE}/base/decorative/`,
//   resize: { w: 64, h: 64 },
// },

// Inconsistent sizing of the icons in folder
// {
//   inputFolder:
//     "/mnt/01D511173777DD60/Games/Steam/steamapps/common/Factorio/data/core/graphics/icons/mip/",
//   outputFolder: `${OUTPUT_FOLDER_BASE}/core/icons/shortcut-toolbar`,
//   cutRegion: { left: 0, top: 0, width: 24, height: 24 },
//   resize: { w: 64, h: 64 },
// },
