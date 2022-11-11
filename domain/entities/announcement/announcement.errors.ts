import { DomainError } from '../error';
export class AnnouncementNotFound extends DomainError {
  constructor(message?: string | undefined, options?: { cause: Error }) {
    super(message, options);
    this.message = message ?? 'Announcement not found';
  }
}
