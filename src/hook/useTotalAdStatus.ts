import { useEffect, useState } from 'react';
import { QueryOptions } from '../api/httpRequest';
import { DailyAdStatus } from '../interfaces/database';
import totalAdStatusModel from '../models/totalAdStatusModel';

function useTotalAdStatus(queryOptions: QueryOptions) {
  const [totalAdStatus, setTotalAdStatus] = useState<DailyAdStatus[]>();
  const [loading, setLoading] = useState(true);

  const getTotalAdStatus = async (queryOptions: QueryOptions) => {
    setLoading(true);
    setTotalAdStatus((await totalAdStatusModel.getPeriod(queryOptions)) || []);
    setLoading(false);
  };

  useEffect(() => {
    getTotalAdStatus(queryOptions);
  }, []);

  return { loading, totalAdStatus, getTotalAdStatus };
}

export default useTotalAdStatus;
