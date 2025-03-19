export interface treatment {
  id: number;
  date: string;
  typeTreatment: typeTreatment;
  medicalCenter: medicalCenter;
}

export interface medicalCenter {
  id: number;
  name: string;
}

export interface typeTreatment {
  id: number;
  category: string;
  name: string;
}
