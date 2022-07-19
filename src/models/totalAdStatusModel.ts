import { axiosInstance } from "../api/axiosInstance";
import { HttpRequest, QueryOptions } from "../api/httpRequest";
import { DailyAdStatus } from "../interfaces/database";

class MediaStatusModel {
  constructor(private readonly service: HttpRequest<DailyAdStatus>) {
    this.service;
  }
  async getAll() {
    const { data } = await this.service.getAll();
    return data;
  }

  async getPeriod({ gte, lte, queryField = "date" }: QueryOptions) {
    const { data } = await this.service.getBetween({ gte, lte, queryField });
    return data;
  }
}

const END_POINT_TOTAL_AD_STATUS = "totalAdStatus";
export default new MediaStatusModel(
  new HttpRequest<DailyAdStatus>(axiosInstance, END_POINT_TOTAL_AD_STATUS)
);
