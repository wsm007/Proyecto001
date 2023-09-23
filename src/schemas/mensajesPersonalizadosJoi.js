export const messages = {
  'any.required': `{#label} es obligatorio`,
  'number.base': `{#label} debe ser un número`,
  'number.integer': `{#label} debe ser un número entero`,
  'number.positive': `{#label} debe ser un valor positivo`,
  'string.base': `{#label} debe ser un texto`,
  'string.empty': `{#label} no puede estar vacío`,
  'string.email': `{#label} debe ser un correo electrónico válido`,
  // LA siguiente validación trabaja con: .pattern(new RegExp('^[0-9]{10}$'))
  'string.pattern.base': `{#label} debe ser un número de teléfono válido de 10 dígitos`,
  'string.min': `{#label} debe tener una longitud mínima de {#limit}`,
  'string.max': `{#label} debe tener una longitud máxima de {#limit}`,
  // Vañidación de fecha
  'date.base': `{#label} debe ser una fecha válida`,
 }
