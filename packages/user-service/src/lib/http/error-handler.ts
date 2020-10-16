import { FastifyError, FastifyReply, FastifyRequest, ValidationResult } from 'fastify';

export function handleError(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  if (error.validation) {
    const errors = error.validation.map(formatValidationResult);

    reply.status(400).send({
      error: 'BadRequest',
      message: 'Validation error',
      statusCode: 400,
      errors,
    });

    return;
  }

  const statusCode = error.statusCode || 500;

  reply.status(statusCode || 500).send({
    error: error.name.replace(/Error$/, ''),
    message: error.message,
    statusCode,
  });
}

function formatValidationResult(validationResult: ValidationResult) {
  let field = validationResult.dataPath;
  if (validationResult.dataPath) {
    field = field.replace(/^\.(.+)/, '$1');
  } else if (validationResult.keyword === 'required' && validationResult.params?.missingProperty) {
    field = validationResult.params?.missingProperty as string;
  }

  return {
    field,
    rules: validationResult.keyword,
    params: validationResult.params,
    message: validationResult.message,
  };
}
