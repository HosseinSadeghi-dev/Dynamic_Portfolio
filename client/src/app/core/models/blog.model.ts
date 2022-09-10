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
  deleted: boolean;
}

export enum BlogStatus {
  published,
  unPublished
}
