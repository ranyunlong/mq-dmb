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

export type MediaMode = "carousel" | "video" | "image" | "webpage" | "video_editor";
export type ScreenOrientation = "landscape" | "portrait";
export type AspectRatio = "16:9" | "4:3" | "1:1" | "9:16" | "custom";
export type MediaStatus = "processing" | "distributing" | "failed" | "published";

export interface MediaLog {
  timestamp: string;
  message: string;
}

export interface MediaItem {
  id: string;
  name: string;
  type: "folder" | "content";
  mode?: MediaMode;
  orientation?: ScreenOrientation;
  aspectRatio?: AspectRatio;
  status?: MediaStatus;
  logs?: MediaLog[];
  tags?: string[];
  designId?: string; // Reference to a .design file/asset
  parentId: string | null;
  updatedAt: string;
}

export type ScheduleStatus = "valid" | "cancelled" | "overridden" | "expired";
export type SchedulePublishStatus = "publishing" | "completed";
export type RepeatType = "daily" | "weekly";

export interface ScheduleLog {
  timestamp: string;
  stage: string;
  message: string;
}

export interface Schedule {
  id: string;
  startTime: string;
  endTime: string;
  mediaId: string; // Reference to MediaItem
  mediaName?: string; // Cache for display
  repeat: RepeatType;
  weeklyDays?: number[]; // [0, 1, 2, 3, 4, 5, 6] for Sun-Sat
  tags: string[];
  status: ScheduleStatus;
  publishStatus: SchedulePublishStatus;
  areas: string[];
  publisher: string;
  publishedAt: string;
  totalTargets: number; // For batch publishing progress (e.g., 10000 stores)
  completedTargets: number;
  publishLogs?: ScheduleLog[];
}
