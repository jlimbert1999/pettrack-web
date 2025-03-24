import { treatment } from './treatment.interface';

export interface petDetail {
  image: string;
  id: string;
  name: string;
  code: number;
  birthDate: Date;
  color: string;
  sex: string;
  description: null;
  is_neutered: boolean;
  neuter_date: null;
  createdAt: Date;
  owner: owner;
  treatments: treatment[];
  breed: breed;
}

interface breed {
  id: number;
  name: string;
  species: string;
}

interface owner {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dni: string;
  address: string;
  phone: string;
  createdAt: Date;
  birthDate: Date;
  district: district;
}

interface district {
  id: number;
  name: string;
}
