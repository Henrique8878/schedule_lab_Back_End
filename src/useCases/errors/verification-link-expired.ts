export class VerificationLinkExpires extends Error {
  constructor() {
    super('Link de verificação expirou')
  }
}
