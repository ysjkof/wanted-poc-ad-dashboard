import { useEffect, useState } from 'react';
import { Advertising, AdvertisingManagement } from '../interfaces/database';
import advertisingManagementModel from '../models/advertisingManagementModel';

export interface CreateAdvertisingInpus
  extends Pick<Advertising, 'adType' | 'title' | 'budget' | 'startDate' | 'endDate' | 'status'> {}

export interface ModifyAdvertisingInpus extends Partial<CreateAdvertisingInpus> {
  id: number;
}

function useAdvertisingManagement() {
  const [managementState, setMenagementState] = useState<AdvertisingManagement | null>(null);
  const [loading, setLoading] = useState(true);

  const getManagementState = async () => {
    setLoading(true);
    setMenagementState((await advertisingManagementModel.getOne()) || null);
    setLoading(false);
  };

  const createAdvertising = async (mutationAdvertisingInpus: CreateAdvertisingInpus) => {
    setLoading(true);
    const result = await advertisingManagementModel.createAdvertising(mutationAdvertisingInpus);
    setLoading(false);
    return result;
  };

  const modifyAdversising = async (mutationAdvertisingInpus: ModifyAdvertisingInpus) => {
    setLoading(true);
    await advertisingManagementModel.modifyAdvertising(mutationAdvertisingInpus);
    setLoading(false);
  };

  const deleteAdversising = async (id: number) => {
    setLoading(true);
    await advertisingManagementModel.deleteAdvertising(id);
    setLoading(false);
  };

  useEffect(() => {
    getManagementState();
  }, []);

  return { loading, managementState, createAdvertising, modifyAdversising, deleteAdversising };
}

export default useAdvertisingManagement;
