import patients from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient }  from "../types";
import { v1 as uuid } from 'uuid';

const getAllWithoutSsn = (): NonSensitivePatient[] => {
  return patients.map((patient) => ({
    ...patient, ssn:undefined
  }));
}; 

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid()
  };
  return newPatient;
};

const getOne = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};


export default {
  getAllWithoutSsn,
  addPatient,
  getOne
};

