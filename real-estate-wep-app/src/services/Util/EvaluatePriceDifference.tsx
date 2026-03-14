export const calculatePriceDifference = (oldPrice: number, newPrice: number): number => {
    if (oldPrice === 0) {
      throw new Error("Old price cannot be zero.");
    }
    return parseFloat(((newPrice - oldPrice) / oldPrice * 100).toFixed(2));
  };
  
