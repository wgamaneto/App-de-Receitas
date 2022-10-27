const copyTextToClipboard = async (text) => {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(text);
  }
  return document.execCommand('copy', true, text);
};

const copyLink = (pathname, setIsCopied) => {
  copyTextToClipboard(`http://localhost:3000${pathname}`);
  setIsCopied(true);
  const oneSec = 1500;
  setTimeout(() => {
    setIsCopied(false);
  }, oneSec);
};

export default copyLink;
// test
