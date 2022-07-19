export interface DailyAdStatus {
  imp: number;
  click: number;
  cost: number;
  conv: number;
  convValue: number;
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
  roas: number;
  date: string;
}

export interface DailyMediaStatus {
  channel: string;
  date: string;
  imp: number;
  click: number;
  cost: number;
  convValue: number;
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
  roas: number;
}

export interface AdvertisingManagement {
  count: number;
  ads: Advertising[];
}
export type AdvertisingStatus = 'active' | 'ended';
export type AdType = 'web' | 'app';
export interface AdvertisingReport {
  cost: number;
  convValue: number;
  roas: number;
}
export interface Advertising {
  id: number;
  title: string;
  status: AdvertisingStatus;
  startDate: Date;
  budget: number;
  adType: AdType;
  report?: AdvertisingReport;
  endDate?: Date | null;
}
