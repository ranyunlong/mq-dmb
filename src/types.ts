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
