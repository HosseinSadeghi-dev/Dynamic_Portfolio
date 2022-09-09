export interface PaginationModel {
  PAGE_NUMBER?: number
  PAGE_SIZE?: number
  TOTAL_COUNT?: number
  TOTAL_PAGES?: number
}

export interface SEOModel {
  title: string,
  description?: string,
  "og:locale"?: string,
  "og:type"?: string,
  "og:title"?: string,
  "og:description"?: string,
  "og:url"?: string,
  "og:site_name"?: string,
  "og:image"?: string,
  "twitter:url"?: string,
  "twitter:title"?: string,
  "twitter:description"?: string,
  url: string
  keywords?: string,
  id?: number
}

export enum SidenavStatus {
  open,
  close
}
