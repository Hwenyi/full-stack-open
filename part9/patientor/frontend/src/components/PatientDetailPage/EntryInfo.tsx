import { Entry, Diagnosis } from "../../types";

import { Work, MedicalServices, LocalHospital } from '@mui/icons-material';
import EntryDetails from "./EntryDetails";

type Props = {
  entry: Entry,
  diagnoses: Diagnosis[]
};

const EntryInfo = ({ entry, diagnoses } : Props) => {
  const diagnosis = (code: string): string => {
    const foundDiagnosis = diagnoses.find(d => d.code === code);
    if (!foundDiagnosis) return "unknown";
    return foundDiagnosis.name;
  };

  const typeIcon = (type: string) => {
    if (type === 'HealthCheck') {
      return <MedicalServices />;
    }

    if (type === 'OccupationalHealthcare') {
      return <Work />;
    }

    return <LocalHospital />;
  };

  const style = {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderStyle: 'solid'
  };

  return (
    <div style={style} >
      {entry.date} {entry.description} {typeIcon(entry.type)}

      <EntryDetails entry={entry} />

      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>
            {code} {diagnosis(code)}
          </li>
        )}
      </ul>
    </div>
  );
};

export default EntryInfo;