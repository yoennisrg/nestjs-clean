import { BadRequestException, ValidationError } from '@nestjs/common';

export const exceptionFactory = (validationErrors: ValidationError[] = []) => {
  return new BadRequestException(mapperErrors(validationErrors));
};

const mapperErrors = (validationErrors: ValidationError[]) => {
  return validationErrors.map(
    ({ property, constraints, children }: ValidationError) => {
      if (constraints) {
        return {
          [property]: Object.values(constraints),
        };
      }
      const child = mapperErrors(children);
      return {
        [property]: child,
      };
    },
  );
};
