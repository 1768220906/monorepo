import type { Context } from "hono";
import { ok } from "../utils/response.js";
import { toHealthDto } from "../dto/healthDto.js";
import { healthService } from "../services/healthService.js";

export class HealthController {
  getHealth(c: Context, detailed: boolean) {
    const healthData = healthService.getHealth(detailed);
    const dto = toHealthDto(healthData);
    return ok(c, dto);
  }
}

export const healthController = new HealthController();
