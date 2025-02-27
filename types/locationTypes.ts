export interface IPGeolocationResponse {
  status: string;
  country: string;
  regionName: string;
  city: string;
  district: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export interface Address {
  suburb?: string;
  town?: string;
  state?: string;
  "ISO3166-2-lvl4"?: string;
  region?: string;
  postcode?: string;
  country: string;
  country_code: string;
}

export interface LocationSearchResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}

export type LocationAPIResponse = LocationSearchResult[];