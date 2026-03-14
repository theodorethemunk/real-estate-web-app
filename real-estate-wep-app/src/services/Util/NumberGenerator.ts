const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const getRandomFloat = (min: number, max: number, decimals: number = 2): number => {
    const factor = Math.pow(10, decimals);
    return Math.round((Math.random() * (max - min) + min) * factor) / factor;
  };
  
  const getRandomBoolean = (): boolean => {
    return Math.random() < 0.5;
  };
  
  const getRandomFromArray = <T>(arr: T[]): T => {
    return arr[getRandomInt(0, arr.length - 1)];
  };
  
  const getUniqueRandomNumbers = (count: number, min: number, max: number): number[] => {
    if (count > max - min + 1) {
      throw new Error("Count exceeds available unique numbers in range");
    }
    const numbers = new Set<number>();
    while (numbers.size < count) {
      numbers.add(getRandomInt(min, max));
    }
    return Array.from(numbers);
  };
  
  const generatePassword = (length: number): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    return Array.from({ length }, () => chars[getRandomInt(0, chars.length - 1)]).join('');
  };
  
  const generateCode = (length: number = 6): string => {
    const digits = "123456789BCDEFGHJKLMNPQRSTUVWXYZ";
    return Array.from({ length }, () => digits[getRandomInt(0, digits.length - 1)]).join('');
  };

  const generateCVId = (length: number = 8): string => {
    const digits = "123456789";
    return Array.from({ length }, () => digits[getRandomInt(0, digits.length - 1)]).join('');
  };

  const generateFileName = (length: number = 8): string => {
    const digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => digits[getRandomInt(0, digits.length - 1)]).join('');
  };

  const generateLoginId = (): string => {
    const now = new Date();
    return `${now.getDate().toString().padStart(2, '0')}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getFullYear()}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
};
  
  export { getRandomInt, getRandomFloat, getRandomBoolean, getRandomFromArray, getUniqueRandomNumbers, generatePassword, generateCode, generateCVId, generateFileName, generateLoginId };
  
