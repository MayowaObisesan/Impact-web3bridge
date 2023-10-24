import { Request, Response, NextFunction } from 'express';
import { ResponseCode, StatusCode } from '../@types';
import { PreboardService, UserService } from '../service';
import { Toolbox } from '../utils';
import { userValidations } from '../validations';

const { verifyToken } = Toolbox;

const UserMiddleware = {
  async onlyAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req);
      const { email } = req.body;
      const userWithEmail = await UserService.getUserByEmail(email);
      if (userWithEmail?.role?.admin) {
        next();
      } else {
        return res.status(StatusCode.UNAUTHORIZED).json({
          status: !!ResponseCode.FAILURE,
          message: 'Only admin can access resource',
        });
      }
    } catch (error: any) {
      console.log(error);
      return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
        status: !!ResponseCode.FAILURE,
        message: error,
      });
    }
  },
  async inspectUserOnboarding(req: Request, res: Response, next: NextFunction) {
    try {
      await userValidations.validateUserOnboarding(req.body);
      next();
    } catch (error: any) {
      return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
        status: !!ResponseCode.FAILURE,
        message: error,
      });
    }
  },
  async inspectCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userValidations.validateCreateUser(req.body);
      const { email, username } = req.body;
      const { token } = req.params;
      const decoded: any = await verifyToken(token);

      if (!decoded)
        return res.status(StatusCode.BAD_REQUEST).json({
          status: !!ResponseCode.FAILURE,
          message: 'Token validation failed',
        });

      if (decoded.email !== email)
        return res.status(StatusCode.BAD_REQUEST).json({
          status: !!ResponseCode.FAILURE,
          message: 'Token validation failed. Wrong email used.',
        });

      const preboarder = await PreboardService.getOnboarder(email);

      if (!preboarder)
        return res.status(StatusCode.BAD_REQUEST).json({
          status: !!ResponseCode.SUCCESS,
          message: 'You are not onboarded yet. Please onboard first.',
        });

      const userWithEmail = await UserService.getUserByEmail(email);

      const userWithUsername = await UserService.getUserByUsername(username);

      if (userWithEmail) {
        return res.status(StatusCode.BAD_REQUEST).json({
          status: !!ResponseCode.FAILURE,
          message: 'Email already exists',
        });
      }

      if (userWithUsername) {
        return res.status(StatusCode.BAD_REQUEST).json({
          status: !!ResponseCode.FAILURE,
          message: 'Username already exists',
        });
      }
      next();
    } catch (error: any) {
      console.log(error);
      return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
        status: !!ResponseCode.FAILURE,
        message: error,
      });
    }
  },
};

export default UserMiddleware;
