export class SystemRepository {
  getUptimeSeconds(): number {
    return process.uptime();
  }

  getNowIso(): string {
    return new Date().toISOString();
  }
}

export const systemRepository = new SystemRepository();
