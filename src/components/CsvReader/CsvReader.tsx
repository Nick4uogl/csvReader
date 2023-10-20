import React from 'react';
import Papa from 'papaparse';
import { CSVData } from '../../types/types.ts';
import {
  getShortStateName,
  validateAge,
  validateDate,
  validateExperience,
  validateHasChildren,
  validateLicenseNumber,
  validateLicenseStates,
  validatePhoneNumber,
  validateYearlyIncome,
  checkUniqueness,
} from '../../utils/validators.ts';

interface CSVReaderProps {
  handleChangeData: (data: CSVData[]) => void;
  handleChangeError: (value: string) => void;
}

const CSVReader: React.FC<CSVReaderProps> = ({
  handleChangeData,
  handleChangeError,
}) => {
  const validateData = (results): CSVData[] => {
    const data = results.data;
    if (
      !results.meta.fields?.includes('Full Name') ||
      !results.meta.fields?.includes('Phone') ||
      !results.meta.fields?.includes('Email')
    ) {
      handleChangeError('File is incorrect');
    }
    const validatedData = data?.map((item, index) => {
      const newItem: CSVData = {
        id: index + 1,
        fullName: item['Full Name']?.trim(),
        phone: item.Phone.replace(/[^\d+]/g, '')
          .replace(/^1/, '+1')
          ?.trim(),
        email: item.Email?.trim(),
        age: item.Age?.trim(),
        experience: item.Experience?.trim(),
        yearlyIncome:
          typeof item['Yearly Income'] === 'number'
            ? item['Yearly Income'].toFixed(2)
            : item['Yearly Income']?.trim(),
        hasChildren: item['Has children'],
        licenseStates: getShortStateName(item['License states']?.trim()),
        expirationDate: item['Expiration date']?.trim(),
        licenseNumber: item['License number']?.trim(),
        duplicateWith: null,
        valid: {
          fullName: true,
          phone: validatePhoneNumber(item.Phone?.trim()),
          email: true,
          age: validateAge(item.Age?.trim()),
          experience: validateExperience(
            item.Experience?.trim(),
            item.Age?.trim(),
          ),
          yearlyIncome: validateYearlyIncome(
            parseFloat(item['Yearly Income']?.trim()),
          ),
          hasChildren: validateHasChildren(item['Has children']?.trim()),
          licenseStates: validateLicenseStates(item['License states']?.trim()),
          expirationDate: validateDate(item['Expiration date']?.trim()),
          licenseNumber: validateLicenseNumber(item['License number']?.trim()),
        },
      };

      return newItem;
    });

    return checkUniqueness(validatedData);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file) {
        if (!file.name.endsWith('.csv')) {
          handleChangeError('File format is incorrect');
          return;
        }

        Papa.parse(file, {
          complete: (result) => {
            const validatedData = validateData(result);
            handleChangeData(validatedData);
          },
          header: true,
          skipEmptyLines: true,
        });
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default CSVReader;
