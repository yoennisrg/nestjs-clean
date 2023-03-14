import { Logger } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidateIf,
  isDefined,
} from 'class-validator';

// Define new constraint that checks the existence of sibling properties
@ValidatorConstraint({ async: false })
class IsValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (
      Object.prototype.hasOwnProperty.call(args.object, args.constraints[0])
    ) {
      return this.isIncludeValueofProperty(args) || isDefined(value);
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is required`;
  }

  isIncludeValueofProperty(args: ValidationArguments) {
    const options = args.constraints[1];
    return !options.includes(args.object[args.constraints[0]]);
  }
}

// Create Decorator for the constraint that was just created
function IfMatch(
  prop: string,
  value: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [prop, value],
      validator: IsValidConstraint,
    });
  };
}

export function IsRequiredIfMatch(
  property: string,
  value: string[],
  validationOptions?: ValidationOptions,
) {
  const match = IfMatch(property, value, validationOptions);
  return function (target: any, key: string) {
    match(target, key);
  };
}
