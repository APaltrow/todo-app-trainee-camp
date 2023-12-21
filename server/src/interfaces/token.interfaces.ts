import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
}

export interface TokenVerificationResult extends JwtPayload {
  id: string;
}
