import {StatusCodes} from 'http-status-codes';

export interface IErrorResponse {
    message: string;
    comingFrom: string;
    statusCode: number;
    status: string;
    serializeError(): IError;
}

export interface IError {
    message: string;
    comingFrom: string;
    statusCode: number;
    status: string;
}

export abstract class CsutomError extends Error {
    abstract statusCode: number;
    abstract status: string;
    comingFrom: string;

    constructor(message: string, comingFrom: string) {
        super(message);
        this.comingFrom = comingFrom;
    }

    serializeError(): IError {
        return {
            message: this.message,
            comingFrom: this.comingFrom,
            statusCode: this.statusCode,
            status: this.status,
        };
    }
}

export class BadRequestError extends CsutomError {
    statusCode: number = StatusCodes.BAD_REQUEST;
    status: string = "BAD_REQUEST";
    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

export class NotFoundtError extends CsutomError {
    statusCode: number = StatusCodes.NOT_FOUND;
    status: string = "NOT_FOUND";
    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

export class ConflictError extends CsutomError {
    statusCode: number = StatusCodes.CONFLICT;
    status: string = "CONFLICT";
    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}


export class NotAuthorizedError extends CsutomError {
    statusCode: number = StatusCodes.UNAUTHORIZED;
    status: string = "UNAUTHORIZED";
    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

export class ForbiddebError extends CsutomError {
    statusCode: number = StatusCodes.FORBIDDEN;
    status: string = "FORBIDDEN";
    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}
export class FileTooLargeError extends CsutomError {
    statusCode: number = StatusCodes.REQUEST_TOO_LONG;
    status: string = "REQUEST_TOO_LONG";
    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

export class ServerError extends CsutomError {
    statusCode: number = StatusCodes.SERVICE_UNAVAILABLE;
    status: string = "SERVICE_UNAVAILABLE";
    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}
export interface ErrorException extends Error {
    errorno?: number;
    code?: string;
    path?: string;
    syscall?: string;
    stack?: string;
}