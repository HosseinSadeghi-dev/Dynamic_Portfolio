export interface ProjectModel {
  id: number;
  title: string;
  description: string;
  image: string;
  externalLink: string;
  keywords: string,
  imageDeleted: boolean;
  status: ProjectStatus;
  seen: number;
  created: Date;
  updated: Date;
}

export enum ProjectStatus {
  published,
  unPublished
}
