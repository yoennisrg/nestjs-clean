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
class IsNotSiblingOfConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (isDefined(value)) {
      return this.getFailedConstraints(args).length === 0;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${
      args.property
    } cannot exist alongside the following defined properties: ${this.getFailedConstraints(
      args,
    ).join(', ')}`;
  }

  getFailedConstraints(args: ValidationArguments) {
    return args.constraints.filter((prop) => isDefined(args.object[prop]));
  }
}

// Create Decorator for the constraint that was just created
export function IsNotSiblingOf(
  props: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: props,
      validator: IsNotSiblingOfConstraint,
    });
  };
}

// Helper function for determining if a prop should be validated
export function incompatibleSiblingsNotPresent(incompatibleSiblings: string[]) {
  return function (o, v) {
    return Boolean(
      isDefined(v) || // Validate if prop has value
        incompatibleSiblings.every((prop) => !isDefined(o[prop])), // Validate if all incompatible siblings are not defined
    );
  };
}

export function IncompatableWith(incompatibleSiblings: string[]) {
  const notSibling = IsNotSiblingOf(incompatibleSiblings);
  const validateIf = ValidateIf(
    incompatibleSiblingsNotPresent(incompatibleSiblings),
  );
  return function (target: any, key: string) {
    notSibling(target, key);
    validateIf(target, key);
  };
}
