import { SKU } from "./types";

export const INITIAL_SKUS: SKU[] = [
  { id: "1", name: "Basic T-Shirt White", code: "TS-WHT-001", subSkuIds: [] },
  { id: "2", name: "Premium T-Shirt Black", code: "TS-BLK-999", subSkuIds: [] },
  { id: "3", name: "T-Shirt Bundle (2-Pack)", code: "BUN-TS-01", subSkuIds: ["1", "2"] },
];

export const INITIAL_MEDIA_ITEMS: any[] = [ // Using any for brevity in constants, but will use MediaItem in components
  {
    id: "f1",
    name: "Summer Campaign",
    type: "folder",
    parentId: null,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "m1",
    name: "Holiday Promo Video",
    type: "content",
    mode: "video",
    orientation: "landscape",
    aspectRatio: "16:9",
    parentId: null,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "m2",
    name: "New Collection Grid",
    type: "content",
    mode: "carousel",
    orientation: "portrait",
    aspectRatio: "9:16",
    parentId: "f1",
    updatedAt: new Date().toISOString(),
  }
];
