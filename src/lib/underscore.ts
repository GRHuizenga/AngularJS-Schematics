import { template } from 'underscore';

export const replaceParameters = (data: string, parameters: { [key: string]: string }): string => {
  return template(data)(parameters);
}