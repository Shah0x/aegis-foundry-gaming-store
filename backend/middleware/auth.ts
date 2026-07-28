import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';
import Log from '../models/Log.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-2026';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: 'admin' | 'member';
    orgId?: string;
  };
}

export const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: 'admin' | 'member'; orgId?: string };
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Access token is invalid or expired', protocol: 'AUTH_EXPIRED' });
    }
  } else {
    return res.status(401).json({ error: 'Authorization header is missing or incorrect', protocol: 'AUTH_REQUIRED' });
  }
};

export const requireRole = (roles: Array<'admin' | 'member'>) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      // Log unauthorized access attempt
      Log.create({
        userId: req.user.id,
        action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
        details: `User tried to access route restricted to roles: ${roles.join(', ')}`,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }).catch(err => console.error('Error creating access attempt log:', err));

      return res.status(403).json({ error: 'Forbidden: Insufficient privileges', protocol: 'RBAC_FORBIDDEN' });
    }

    next();
  };
};
