const useDateFormatter = () => {
  /* 데이터 전달 포맷 */
  const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateToCustomString = (usDate: string) => {
    const utcDate = new Date(usDate);

    const year = utcDate.getUTCFullYear();
    const month = (utcDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = utcDate.getUTCDate().toString().padStart(2, '0');
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][
      utcDate.getUTCDay()
    ];

    const koreanDateStr = `${year}.${month}.${day} (${dayOfWeek})`;
    return koreanDateStr;
  };

  return {getFormattedDate, formatDateToCustomString};
};

export default useDateFormatter;
