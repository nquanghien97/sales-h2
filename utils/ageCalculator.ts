export function ageCalculator(startDate: string) {
  const [day, month, year] = startDate.split('-').map(Number); // Tách ngày, tháng, năm
  const start = new Date(year, month - 1, day); // Chuyển thành đối tượng Date (lưu ý tháng bắt đầu từ 0)
  const now = new Date(); // Ngày hiện tại
  
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  // Điều chỉnh nếu số ngày nhỏ hơn 0
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Lấy số ngày của tháng trước
    days += prevMonth.getDate();
    months--;
  }

  // Điều chỉnh nếu số tháng nhỏ hơn 0
  if (months < 0) {
    months += 12;
    years--;
  }
  return { years, months }
}