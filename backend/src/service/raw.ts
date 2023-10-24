import { env } from '../config';

const { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD, SUPER_ADMIN_USERNAME } = env;

export const cohortList = [
  'Cohort I',
  'Cohort II',
  'Cohort III',
  'Cohort IV',
  'Cohort V',
  'Cohort VI',
  'Cohort VII',
  'Cohort VIII',
  'Cohort IX',
  'Cohort X',
];

export const onboarders = [
  {
    cohortId: 'Cohort I',
    email: 'samsonajulor@gmail.com',
    isBlacklisted: false,
  },
  {
    cohortId: 'Cohort II',
    email: 'samuel@gmail.com',
    isBlacklisted: true,
  },
];

export const superAdmin = {
  email: SUPER_ADMIN_EMAIL,
  password: SUPER_ADMIN_PASSWORD,
  username: SUPER_ADMIN_USERNAME,
  role: 'superAdmin',
  isActivated: true,
};
