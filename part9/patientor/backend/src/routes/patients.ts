import express from 'express';
import patientsService from '../services/patientsService';
import { parsePatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getAllWithoutSsn());
});

router.post('/', (req, res) => {
  try {
    const newPatient = parsePatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong,';
    if(error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;