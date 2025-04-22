export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const addThousandSeparator = (num) => {
  if (num === undefined || num === null) return '';
  
  
  const [ingrate, decimal] = num.toString().split('.');
  
  const formattedInteger = ingrate.replace(/\B(?=(\d{3})+(?!\d))/g, ','); 

  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
}