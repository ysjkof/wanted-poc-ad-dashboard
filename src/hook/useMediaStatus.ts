import { useEffect, useState } from 'react';
import { QueryOptions } from '../api/httpRequest';
import { DailyMediaStatus } from '../interfaces/database';
import mediaStatusModel from '../models/mediaStatusModel';

function useMediaStatus(queryOptions: QueryOptions) {
  const [mediaStatus, setMediaStatus] = useState<DailyMediaStatus[]>();
  const [loading, setLoading] = useState(true);

  const getMediaStatus = async (queryOptions: QueryOptions) => {
    setLoading(true);
    setMediaStatus((await mediaStatusModel.getPeriod(queryOptions)) || []);
    setLoading(false);
  };

  useEffect(() => {
    getMediaStatus(queryOptions);
  }, []);

  return { loading, mediaStatus, getMediaStatus };
}

export default useMediaStatus;
