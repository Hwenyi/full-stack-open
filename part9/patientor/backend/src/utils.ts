import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(value);
};

const parseString = (string: unknown, name: string): string => {
  if (!string || typeof string !== 'string') {
    throw new Error(`Incorrect or missing ${name}: ${string}`);
  }
  return string;
};

const parseDate = (date: unknown, name: string): string => {
  if (!date || typeof date !== 'string') {
    throw new Error(`Incorrect or missing ${name}: ${date}`);
  }
  return date;
};

const parseGender = (value: unknown): Gender => {
  if(!isString(value) || !isGender(value)) {
    throw new Error(`Value of gender is not correct: ${value}`);
  }
  return value;
};

export const parsePatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
    throw new Error('Data missing or in wrong format');
  }

  if ( !('name' in object)) throw new Error('name missing');
  if ( !('occupation' in object)) throw new Error('occupation missing');
  if ( !('ssn' in object)) throw new Error('ssn missing');
  if ( !('gender' in object)) throw new Error('gender missing');
  if ( !('dateOfBirth' in object)) throw new Error('dateOfBirth missing');

  return {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    ssn: parseString(object.ssn, 'occupation'),
    entries: []
  };
};