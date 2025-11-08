import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomerException } from './customerException';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const httpHost = host.switchToHttp();
        const response = httpHost.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Intern Server Error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message = typeof res === 'string' ? res : (res as any).message;
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        const customException = new CustomerException(message, status);

        const errorResponse = customException.getResponse();
        const safeResponse =
            typeof errorResponse === 'object'
                ? errorResponse
                : { message: errorResponse };

        response.status(status).json({
            ...safeResponse,
            timestamp: new Date().toISOString(),
            status,
        });
    }
}