import { HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class FormValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    const mappedErrors: Record<string, string> = {};
    errors.forEach((e) => {
      mappedErrors[e.property] = Object.values(e.constraints!).join(', ');
    });
    super(mappedErrors, 450);
  }
}
