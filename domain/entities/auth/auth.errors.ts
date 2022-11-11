import { DomainError } from '../error';
export class NotAuthorized extends DomainError {
  constructor() {
    super();
    this.message ?? 'You are not Authorized';
  }
}
