import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Male, Female, QuestionMark } from'@mui/icons-material';
import {  Alert } from '@mui/material';
import { getErrorMessage } from "../../utils";
import { EntryFormValues } from "../../types";

import { Patient, Gender, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import AddEntryForm from "./AddEntryForm";

import EntryInfo from "./EntryInfo";


type Props = {
  diagnoses: Diagnosis[],
};

const PatientPage = ({ diagnoses }: Props ) => {
  const [patient, setPatient] = useState<Patient|null>(null);
  const [formVisible, setFormVisible] = useState(true);
  const [error, setError] = useState<string |null>(null);

  const getGenderIcon = (gender: Gender) => {
    if (gender === Gender.Male) {
      return <Male />;
    }

    if (gender === Gender.Female) {
      return <Female />;
    }

    return <QuestionMark />;
  };

  const id = useParams().id;

  useEffect(() => {
    if (id) {
      void patientService.getOne(id).then(data => {
        setPatient(data);
      });
    }
  }, [id]);

  const onNewEntry = async (values: EntryFormValues, resetter: () => void) => {
    if (!patient) return null;
    try {
      const updatedPatient = await patientService.addEntry(patient.id, values);
      setPatient(updatedPatient);
      setFormVisible(false);
      setError(null);
      resetter();
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      setError(message);
    }
  };

  const closeForm = () => {
    setFormVisible(false);
    setError(null);
  };

  if (!patient) return null;

  return (
    <div>
      <h3>{patient.name} {getGenderIcon(patient.gender)}</h3>

      <div>ssn {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      {error && <Alert severity="error">{error}</Alert>}

      <AddEntryForm
        onSubmit={onNewEntry}
        visible={formVisible}
        onOpen={() => setFormVisible(true)}
        onCancel={closeForm}
        diagnoses={diagnoses}
      />

      <h4>entries</h4>

      {patient.entries?.map(e =>
        <EntryInfo key={e.id} entry={e} diagnoses={diagnoses} />
      )}
    </div>
  );
};

export default PatientPage;