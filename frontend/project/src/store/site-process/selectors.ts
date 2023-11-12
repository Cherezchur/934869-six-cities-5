import type { State } from '../../types/state';
import type { City, SortName } from '../../types/types';
import { StoreSlice } from '../../const';

export const getCity = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): City => SITE_PROCESS.city;
export const getSorting = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): SortName => SITE_PROCESS.sorting;

