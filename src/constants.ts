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
    status: "published",
    logs: [
      { timestamp: "202408080801", message: "Video source identified" },
      { timestamp: "202408080805", message: "Initial synthesis complete" },
      { timestamp: "202408080810", message: "Final rendering finished" }
    ],
    tags: ["Holiday", "Promotion"],
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
    status: "processing",
    logs: [
      { timestamp: "202408080900", message: "Assets collection started" },
      { timestamp: "202408080902", message: "Processing image 1/5" }
    ],
    tags: ["Fashion", "New Arrival"],
    parentId: "f1",
    updatedAt: new Date().toISOString(),
  }
];

export const INITIAL_SCHEDULES: any[] = [
  {
    id: "s1",
    startTime: "2024-08-10T08:00:00Z",
    endTime: "2024-08-20T22:00:00Z",
    mediaId: "m1",
    mediaName: "Holiday Promo Video",
    repeat: "daily",
    tags: ["Sales", "North Region"],
    status: "valid",
    publishStatus: "completed",
    areas: ["Store A", "Store B", "District North"],
    publisher: "Admin User",
    publishedAt: "2024-08-09T10:00:00Z",
    totalTargets: 500,
    completedTargets: 500,
    publishLogs: [
      { timestamp: "202408091000", stage: "Initialization", message: "Schedule initialized for 500 targets" },
      { timestamp: "202408091005", stage: "Batch 1", message: "Successfully published to 250 stores" },
      { timestamp: "202408091010", stage: "Batch 2", message: "Successfully published to relative 250 stores" }
    ]
  },
  {
    id: "s2",
    startTime: "2024-08-15T09:00:00Z",
    endTime: "2024-09-15T18:00:00Z",
    mediaId: "m2",
    mediaName: "New Collection Grid",
    repeat: "weekly",
    weeklyDays: [1, 3, 5], // Mon, Wed, Fri
    tags: ["Autumn", "Nationwide"],
    status: "valid",
    publishStatus: "publishing",
    areas: ["All Stores", "Ecommerce Panel"],
    publisher: "Marketing Lead",
    publishedAt: "2024-08-14T14:00:00Z",
    totalTargets: 12000,
    completedTargets: 8450,
    publishLogs: [
      { timestamp: "202408141400", stage: "Processing", message: "Starting global distribution batch..." },
      { timestamp: "202408141530", stage: "Batch 45", message: "Optimizing delivery for East Coast nodes" }
    ]
  }
];
