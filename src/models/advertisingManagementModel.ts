import {
  CreateAdvertisingInpus,
  ModifyAdvertisingInpus,
} from "../hook/useAdvertisingManagement";
import { AdvertisingManagement } from "../interfaces/database";
import { axiosInstance } from "../api/axiosInstance";
import { HttpRequest } from "../api/httpRequest";

class AdvertisingManagementModel {
  constructor(private readonly service: HttpRequest<AdvertisingManagement>) {
    this.service;
  }

  private readonly getAdvertisingId = (arr: { id: number }[]) =>
    arr.sort((a, b) => b.id - a.id)[0].id + 1 || 1;

  async getOne() {
    const { data } = await this.service.getOne();
    return data;
  }

  async createAdvertising(inputs: CreateAdvertisingInpus) {
    const {
      data: { ads, count },
    } = await this.service.getOne();

    const { data } = await this.service.post({
      count,
      ads: [
        ...ads,
        {
          id: this.getAdvertisingId(ads),
          endDate: null,
          report: { cost: 0, convValue: 0, roas: 0 },
          ...inputs,
        },
      ],
    });

    return data;
  }

  async modifyAdvertising(inputs: ModifyAdvertisingInpus) {
    const {
      data: { ads, count },
    } = await this.service.getOne();

    const advertisingIdx = ads.findIndex(
      (advertising) => advertising.id === inputs.id
    );
    if (advertisingIdx === -1) throw new Error("광고가 없습니다");

    const updatedAdvertising = { ...ads[advertisingIdx], ...inputs };
    const { data } = await this.service.post({
      count,
      ads: [
        ...ads.slice(0, advertisingIdx),
        updatedAdvertising,
        ...ads.slice(advertisingIdx + 1),
      ],
    });
    return data;
  }

  async deleteAdvertising(id: number) {
    const {
      data: { ads, count },
    } = await this.service.getOne();

    const deleteThisIdxValue = ads.findIndex(
      (advertising) => advertising.id === id
    );
    if (deleteThisIdxValue === -1) throw new Error("광고가 없습니다");

    const { data } = await this.service.post({
      count,
      ads: [
        ...ads.slice(0, deleteThisIdxValue),
        ...ads.slice(deleteThisIdxValue + 1),
      ],
    });
    return data;
  }
}

const END_POINT_ADVERTISING_MANAGEMENT = "advertisingManagement";
export default new AdvertisingManagementModel(
  new HttpRequest<AdvertisingManagement>(
    axiosInstance,
    END_POINT_ADVERTISING_MANAGEMENT
  )
);
