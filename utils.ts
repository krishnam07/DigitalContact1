
export const maskNumber = (phone: string): string => {
  if (!phone || phone.length < 4) return 'XXXXXXXXXX';
  const firstTwo = phone.slice(0, 2);
  const lastTwo = phone.slice(-2);
  const middle = 'X'.repeat(phone.length - 4);
  return `${firstTwo}${middle}${lastTwo}`;
};

export const generateUUID = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
