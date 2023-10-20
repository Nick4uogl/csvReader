import { CSVData } from '../../types/types';

import './usersTable.css';

interface Props {
  data: CSVData[];
  error: string;
}

const UsersTable: React.FC<Props> = ({ data, error }) => {
  return (
    <>
      {data.length > 0 && !error && (
        <table className="csv-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Age</th>
              <th>Experience</th>
              <th>Yearly Income</th>
              <th>Has Children</th>
              <th>License States</th>
              <th>Expiration Date</th>
              <th>License Number</th>
              <th>Duplicate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className={`${!item.valid.fullName ? 'highlighted' : ''}`}>
                  {item.fullName}
                </td>
                <td className={`${!item.valid.phone ? 'highlighted' : ''}`}>
                  {item.phone}
                </td>
                <td className={`${!item.valid.email ? 'highlighted' : ''}`}>
                  {item.email}
                </td>
                <td className={`${!item.valid.age ? 'highlighted' : ''}`}>
                  {item.age}
                </td>
                <td
                  className={`${!item.valid.experience ? 'highlighted' : ''}`}
                >
                  {item.experience}
                </td>
                <td
                  className={`${!item.valid.yearlyIncome ? 'highlighted' : ''}`}
                >
                  {item.yearlyIncome}
                </td>
                <td
                  className={`${!item.valid.hasChildren ? 'highlighted' : ''}`}
                >
                  {item.hasChildren}
                </td>
                <td
                  className={`${
                    !item.valid.licenseStates ? 'highlighted' : ''
                  }`}
                >
                  {item.licenseStates}
                </td>
                <td
                  className={`${
                    !item.valid.expirationDate ? 'highlighted' : ''
                  }`}
                >
                  {item.expirationDate}
                </td>
                <td
                  className={`${
                    !item.valid.licenseNumber ? 'highlighted' : ''
                  }`}
                >
                  {item.licenseNumber}
                </td>
                <td>{item.duplicateWith !== null ? item.duplicateWith : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UsersTable;
