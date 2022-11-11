import { DomainError } from '../error';
export class UserNotFound extends DomainError {
  constructor(message?: string | undefined, options?: { cause: Error }) {
    super(message, options);
    this.message = message ?? 'User not found';
  }
}
