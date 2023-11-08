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

router.get('/:id', (req, res) => {
  const patient = patientsService.getOne(req.params.id);
  if(patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;