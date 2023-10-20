import { DateTime } from 'luxon';
import { CSVData } from '../types/types';
import { stateMap } from './statesData';

export function getShortStateName(statesNames: string): string {
  

  const states = statesNames.split('|');
  const shortNames: string[] = [];
  for (let state of states) {
    const trimmedState = state.trim();
    if (stateMap[trimmedState]) {
      shortNames.push(stateMap[trimmedState]);
    } else {
      shortNames.push(trimmedState);
    }
  }
  return shortNames.join('|');
}

export function validateLicenseStates(licenseStates: string): boolean {
  const statesRegex =
    /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming)$/;
  const states = licenseStates.split('|');

  const validStates = states.filter((state) =>
    statesRegex.test(state.trim()),
  );
  if (validStates.length !== states.length) {
    return false;
  }
  return true;
}

export function validateHasChildren(hasChildren: string): boolean {
  if (
    hasChildren === 'TRUE' ||
    hasChildren === 'FALSE' ||
    hasChildren === ''
  ) {
    return true;
  } else {
    return false;
  }
}

export function validateAge(age: number): boolean {
  if (age < 21 || !Number.isInteger(parseInt(age)) || !parseInt(age)) {
    return false;
  }
  return true;
}

export function validateExperience(experience: number, age: number): boolean {
  if (experience < 0 || experience > age - 21 || !experience) {
    return false;
  }
  return true;
}

export function validateLicenseNumber(licenseNumber: string): boolean {
  return /^[a-zA-Z0-9]{6}$/.test(licenseNumber);
}

export function validateYearlyIncome(yearlyIncome: number): boolean {
  return yearlyIncome >= 0 && yearlyIncome <= 1000000;
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^(\+?1)?\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

export const checkUniqueness = (data: CSVData[]): CSVData[] => {
  return data.map((item, index) => {
    const duplicateEmailIndex = data.findIndex(
      (element, i) =>
        element.email.toLowerCase() === item.email.toLowerCase() &&
        i !== index,
    );
    const duplicatePhoneIndex = data.findIndex(
      (element, i) => element.phone === item.phone && i !== index,
    );

    if (duplicateEmailIndex !== -1) {
      item.duplicateWith = data[duplicateEmailIndex].id;
    } else if (duplicatePhoneIndex !== -1) {
      item.duplicateWith = data[duplicatePhoneIndex].id;
    } else {
      item.duplicateWith = null;
    }
    return item;
  });
};

export function validateDate(dateString: string): boolean {
  const formatsToCheck = ['yyyy-MM-dd', 'MM/dd/yyyy'];
  for (let format of formatsToCheck) {
    const dt = DateTime.fromFormat(dateString, format);
    if (dt.isValid && dt >= DateTime.local()) {
      return true;
    }
  }
  return false;
}