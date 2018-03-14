import ErrorHandler from './ErrorHandler';

export default async (handleError: ErrorHandler, handler: () => Promise<void>) => {
  try {
    await handler();
  } catch (err) {
    handleError(err);
  }
};
