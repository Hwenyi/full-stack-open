import { Entry } from "../../types";

import { Favorite } from '@mui/icons-material';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type Props = {
  entry: Entry
};

const EntryDetails = ({ entry }: Props ) => {
  const style = {
    marginTop: 10,
    marginBottom: 10,
  };

  switch (entry.type) {
    case 'HealthCheck': {

      const colors = {
        0: 'red',
        1: 'yellow',
        2: 'lime',
        3: 'green',
      };

      return (
        <div style={style}>
          <div style={{ color: colors[entry.healthCheckRating] }}>
            <Favorite />
          </div>
          <div>diagnose by {entry.specialist}</div>
        </div>
      );
    }
    case "Hospital": {
      return (
        <div style={style}>
          <div>diagnose by {entry.specialist}</div>
          {entry.discharge&&(
            <div>
              discharged {entry.discharge.date}: {entry.discharge.criteria}
            </div>
          )}
        </div>
      );
    }
    case "OccupationalHealthcare": {
      return (
        <div style={style}>
          <div>{entry.employerName}</div>
          <div>diagnose by {entry.specialist}</div>
          {entry.sickLeave&&(
            <div>
              sickleave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </div>
          )}
        </div>
      );
    }
    default:
      return assertNever(entry);
  }

};

export default EntryDetails;