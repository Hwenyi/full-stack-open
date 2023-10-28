import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getAll = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getAll
};