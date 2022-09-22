export interface BlogModel {
  id: number;
  title: string;
  description: string;
  image: string;
  status: BlogStatus;
  userNameEdited: string;
  userNameCreated: string;
  seen: number;
  created: Date;
  updated: Date;
  seenDates: Date[];
  deleted: boolean;
  showColor: string;
  imageDeleted: boolean;
  keywords: string;
}

export enum BlogStatus {
  published,
  unPublished
}
