export const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert(`${name} copied!`))
      .catch((err) => console.error("Failed to copy: ", err));
  };
  
