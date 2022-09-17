export interface PersonalModel {
  id: number;
  fullName: string;
  phoneNumber: string;
  age: number;
  email: string;
  languages: string;
  nationality: string;
  cv: string;
  mainField: string;
  desc: string;
  address: string;
}

export interface SkillModel {
  id: number,
  title: string,
  progress: number
}
