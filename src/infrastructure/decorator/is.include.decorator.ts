import { Logger } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsIn(elements: any[], validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsIn',
      target: object.constructor,
      propertyName,
      constraints: [elements],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          const [elements] = args.constraints;
          return elements.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          const [elements] = args.constraints;
          return `${propertyName} must be a of type ${elements}`;
        },
      },
    });
  };
}
