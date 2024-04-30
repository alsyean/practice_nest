import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from 'express';

// nest js cli를 이용한 middleware 만들기
// nest g middleware middleware-name
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // nest js logger
  private logger = new Logger('HTTP');
  use = (req: Request, res: Response, next: NextFunction) => {
    // nest js logger 사용법
    // this.logger.log(req.ip, req.method, req.originalUrl);

    // 응답 받고 log 출력
    res.on('finish', () => {
      this.logger.log(`${req.ip}, ${req.method}, ${res.statusCode}, ${req.originalUrl}`);
    });
    next();
  };
}
