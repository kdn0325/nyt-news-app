const useTextTruncation = (maxLength = 10) => {
  /* 말줄임표 */
  const truncateText = (text: string) => {
    if (text) {
      if (text.length <= maxLength) {
        return text;
      }
      return text.slice(0, maxLength) + '...';
    }
    return '';
  };

  return truncateText;
};

export default useTextTruncation;
