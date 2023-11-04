const useDateFormatter = () => {
  /* 리스트 아이템 포맷 */
  const formatDateToCustomString = (inputDate: Date) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

    const formattedDate = `${year}.${month}.${day}. (${dayOfWeek})`;
    return formattedDate;
  };

  return {formatDateToCustomString};
};

export default useDateFormatter;
