/**
 * Standard JS Error has options to pass cause parameter, often another Error
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#differentiate_between_similar_errors
 */

export class DomainError extends Error {
  public cause: Error | undefined;

  constructor(message?: string, options?: { cause?: Error }) {
    super(message);
    this.cause = options?.cause;
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, DomainError.prototype);
  }

  getCause() {
    return this.cause;
  }
}
