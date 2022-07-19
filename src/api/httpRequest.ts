import { AxiosInstance } from 'axios';
export interface QueryOptions {
  gte: Date;
  lte: Date;
  queryField?: string;
}

export class HttpRequest<T> {
  constructor(private readonly service: AxiosInstance, private readonly endPoint: string) {
    this.service;
    this.endPoint;
  }

  private readonly removeTimeInDate = (date: Date) => date.toISOString().substring(0, 10);
  private readonly operateError = (error: any) => {
    if (error.response) {
      throw new Error(`2xx가 아닌 상태코드 ${error.response.status}로 응답했습니다 : `, error);
    } else if (error.request) {
      throw new Error(`요청이 전송됐지만 응답이 수신되지 않습니다 : `, error);
    } else {
      throw new Error(`에러 : `, error);
    }
  };

  getOne = () => this.service.get<T>(this.endPoint).catch((error) => this.operateError(error));

  getAll = () => this.service.get<T[]>(this.endPoint).catch((error) => this.operateError(error));

  // Date를 통일된 형태로 받으려면 가장 마지막 단계에서 형태를 가공하는 게 반복작업이 없을 거 같아 여기서 Date형태를 가공했다.
  getBetween = ({ gte, lte, queryField }: QueryOptions) =>
    this.service
      .get<T[]>(
        `${this.endPoint}?${queryField}_gte=${this.removeTimeInDate(gte)}&${queryField}_lte=${this.removeTimeInDate(
          lte,
        )}`,
      )
      .catch((error) => this.operateError(error));

  post = (data: T) => this.service.post(this.endPoint, data).catch((error) => this.operateError(error));
}
