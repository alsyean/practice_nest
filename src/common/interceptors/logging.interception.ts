import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap ,map} from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();

    // custom 사용 가능 이런식으로 변형하면
    // return을 어떻게 하든 아래와 같은 형식으로 response로 변형되서 나옴
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
    // 공식 홈페이지 예시
    // return next
    //   .handle()
    //   .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
