export class HttpError extends Error {
  readonly status: number
  readonly code: string
  readonly expose: boolean

  constructor(status: number, code: string, message?: string, expose = status < 500) {
    super(message ?? code)
    this.name = 'HttpError'
    this.status = status
    this.code = code
    this.expose = expose
  }
}

export const badRequest = (code: string, message?: string) => new HttpError(400, code, message)
export const unauthorized = (code = 'UNAUTHORIZED') => new HttpError(401, code)
export const forbidden = (code = 'FORBIDDEN') => new HttpError(403, code)
export const notFound = (code = 'NOT_FOUND') => new HttpError(404, code)
export const conflict = (code: string, message?: string) => new HttpError(409, code, message)
export const unprocessable = (code: string, message?: string) => new HttpError(422, code, message)
export const tooMany = (code = 'RATE_LIMITED') => new HttpError(429, code)
