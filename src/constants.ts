import { SKU } from "./types";

export const INITIAL_SKUS: SKU[] = [
  { id: "1", name: "Basic T-Shirt White", code: "TS-WHT-001", subSkuIds: [] },
  { id: "2", name: "Premium T-Shirt Black", code: "TS-BLK-999", subSkuIds: [] },
  { id: "3", name: "T-Shirt Bundle (2-Pack)", code: "BUN-TS-01", subSkuIds: ["1", "2"] },
];
