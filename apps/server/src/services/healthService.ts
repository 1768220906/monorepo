import { systemRepository } from "../repositories/systemRepository.js";

export type HealthData = {
  status: "ok";
  timestamp: string;
  uptime?: number;
};

export class HealthService {
  getHealth(detailed: boolean): HealthData {
    return {
      status: "ok",
      timestamp: systemRepository.getNowIso(),
      ...(detailed ? { uptime: systemRepository.getUptimeSeconds() } : {}),
    };
  }
}

export const healthService = new HealthService();
