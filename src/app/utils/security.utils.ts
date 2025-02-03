export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/[\\'"]/g, '\\$&')
    .replace(
      /(\b)(union|select|insert|update|delete|drop|alter|create|exec|xp_|sp_)(\b)/gi,
      '',
    )
    .replace(/javascript/gi, '')
    .replace(/[|&;$%@"<>()+,]/g, '')
    .replace(/\s{2,}/g, ' ');
};
