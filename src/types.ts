export interface SKU {
  id: string;
  name: string;
  code: string;
  subSkuIds: string[];
}

export interface FileItem {
  id: string;
  name: string;
  type: "folder" | "image" | "video" | "audio";
  status?: "uploading" | "failed" | "pending" | "rejected" | "approved";
  size?: number; // In bytes
  updatedAt: string;
  owner: string;
  parentId: string | null;
  approver?: string;
  approvedAt?: string;
  duration?: string;
  bitrate?: string;
  fps?: number;
  codec?: string;
  tags?: string[];
  skuId?: string; // Optional binding to a SKU
}

export type MediaMode = "carousel" | "video" | "image" | "webpage";
export type ScreenOrientation = "landscape" | "portrait";
export type AspectRatio = "16:9" | "4:3" | "1:1" | "9:16" | "custom";

export interface MediaItem {
  id: string;
  name: string;
  type: "folder" | "content";
  mode?: MediaMode;
  orientation?: ScreenOrientation;
  aspectRatio?: AspectRatio;
  designId?: string; // Reference to a .design file/asset
  parentId: string | null;
  updatedAt: string;
}
