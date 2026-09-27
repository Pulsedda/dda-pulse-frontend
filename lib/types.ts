export type Kpi = {
  green: number;
  target: number;
  met: boolean;
};

export type Broker = {
  username: string;
  instagramUrl: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  instagramFullName: string | null;
  department: string | null;
  manager: string | null;
  followers: number;
  today: string;
  week: Kpi;
  month: Kpi;
  quarter: Kpi;
  baselineCompleted: boolean;
  lastScannedAtUtc: string | null;
  lastScanStatus: string | null;
};

export type DashboardResponse = {
  success: boolean;
  version: string;
  timezone: string;
  todayDubai: string;
  brokerCount: number;
  brokers: Broker[];
};
