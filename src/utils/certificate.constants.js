/**
 * Certificate Form Constants
 * Shared dropdown options for certificate forms
 */

// Valid Department Names
export const DEPARTMENT_OPTIONS = [
  { value: 'PHYSICS', label: 'Physics' },
  { value: 'CHEMISTRY', label: 'Chemistry' },
  { value: 'BOTANY', label: 'Botany' },
  { value: 'ZOOLOGY', label: 'Zoology' },
  { value: 'MATHEMATICS', label: 'Mathematics' },
  { value: 'HINDI', label: 'Hindi' },
  { value: 'ENGLISH', label: 'English' },
  { value: 'URDU', label: 'Urdu' },
  { value: 'GEOGRAPHY', label: 'Geography' },
  { value: 'PSYCHOLOGY', label: 'Psychology' },
  { value: 'SOCIOLOGY', label: 'Sociology' },
  { value: 'HISTORY', label: 'History' },
  { value: 'POLITICAL SCIENCE', label: 'Political Science' },
  { value: 'ECONOMICS', label: 'Economics' },
  { value: 'HOME SCIENCE', label: 'Home Science' },
];

// Valid Course Names
export const COURSE_OPTIONS = [
  { value: 'BSC', label: 'B.Sc (Bachelor of Science)' },
  { value: 'BA', label: 'B.A (Bachelor of Arts)' },
  { value: 'BCOM', label: 'B.Com (Bachelor of Commerce)' },
];

// Valid Semesters
export const SEMESTER_OPTIONS = [
  { value: '1st', label: '1st Semester' },
  { value: '2nd', label: '2nd Semester' },
  { value: '3rd', label: '3rd Semester' },
  { value: '4th', label: '4th Semester' },
  { value: '5th', label: '5th Semester' },
  { value: '6th', label: '6th Semester' },
  { value: '7th', label: '7th Semester' },
  { value: '8th', label: '8th Semester' },
];

// Valid Sessions
export const SESSION_OPTIONS = [
  { value: '2022-2025', label: '2022-2025' },
  { value: '2023-2026', label: '2023-2026' },
  { value: '2024-2027', label: '2024-2027' },
  { value: '2025-2028', label: '2025-2028' },
];

// Certificate Types with Fees
export const CERTIFICATE_TYPES = [
  { value: 'BONAFIDE', label: 'Bonafide Certificate', fee: 200 },
  { value: 'CLC', label: 'College Leaving Certificate (CLC)', fee: 500 },
  { value: 'CHARACTER', label: 'Character Certificate', fee: 300 },
];

// Certificate Fees Map
export const CERTIFICATE_FEES = {
  BONAFIDE: 200,
  CLC: 500,
  CHARACTER: 300,
};
