import { paths } from 'src/router/paths';

export const formatLink = (primeId: string) => {
  const parts = primeId.split(':');

  if (parts[0] == 'learningProgram') return `${paths.learningProgram}/${primeId}`;
  if (parts[0] == 'certification') return `${paths.certification}/${primeId}`;

  return `${paths.course}/${primeId}`;
};
