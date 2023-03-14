export interface IJWTPayload {
  iss: string;
  type: string;
  aud: string;
  iat: number;
  exp: number;
  userId: string;
  countryCode: string;
  roles: string[]
}
