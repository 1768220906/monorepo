import type { HealthData } from "../services/healthService.js";

export type HealthDto = {
  status: "ok";
  timestamp: string;
  uptime?: number;
};

export const toHealthDto = (data: HealthData): HealthDto => ({
  status: data.status,
  timestamp: data.timestamp,
  ...(data.uptime !== undefined ? { uptime: data.uptime } : {}),
});
