import { privateApiClient } from '../client';

export interface StructureItemType {
  id?: number;
  external_id?: number;
  manager_id?: number;
  group_type?: string;
  group_type_name?: string;
  title?: string;
  name?: string;
  children?: StructureItemType[];
}

export const getHierarchy = async () =>
  await privateApiClient<DataRes<StructureItemType[]>>({
    url: '/api/allguests'
  });
