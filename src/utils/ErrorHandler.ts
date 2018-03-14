import ErrorLogger from './ErrorLogger';

type ErrorHandler = (err: any, logError?: ErrorLogger) => void;

export default ErrorHandler;
