export interface pet {
  id: string;
  name: string;
  code: number;
  birthDate: null;
  image: null;
  color: string;
  sex: string;
  description: null;
  is_neutered: boolean;
  neuter_date: null;
  createdAt: string;
  breed: breed;
}

export interface breed {
  id: number;
  name: string;
  species: string;
}
