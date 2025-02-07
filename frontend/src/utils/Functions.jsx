
const formatWeight = (weightInGrams) => {
    if (weightInGrams === undefined) return "N/A"; // For packet items
    const kg = Math.floor(weightInGrams / 1000);
    const g = weightInGrams % 1000;
    if (kg > 0 && g > 0) return `${kg}kg ${g}g`;
    if (kg > 0) return `${kg}kg`;
    return `${g}g`;
  };

  const calculateItemTotal = (item) => {
    if (item.isPacket) {
      return (item.price * item.quantity).toFixed(2);
    } else {
      return ((item.price / 1000) * item.weightInGrams).toFixed(2);
    }
  };
  const calculateTotal = (cartItems) => {
    return cartItems
      .reduce((total, item) => total + parseFloat(calculateItemTotal(item)), 0)
      .toFixed(2);
  };

    export { formatWeight, calculateItemTotal, calculateTotal };