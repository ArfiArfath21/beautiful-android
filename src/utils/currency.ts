export function formatINR(amount: number, withDecimals = false) {
  try {
    return amount.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: withDecimals ? 2 : 0,
      maximumFractionDigits: withDecimals ? 2 : 0,
    });
  } catch {
    const rounded = withDecimals ? amount.toFixed(2) : Math.round(amount).toString();
    return `₹${rounded}`;
  }
}

