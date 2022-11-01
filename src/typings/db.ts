import { Dispatch, SetStateAction } from "react";

export interface EnDataType {
  id: string;
  age: number;
  name: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
}

export interface KoDataType {
  id: number;
  release_date: string;
  screening: boolean;
  title: string;
}

export interface LangType {
  lang: (lang: number) => void;
}

export interface AutoDataType {
    enData?: EnDataType[];
    koData?: KoDataType[];
}


