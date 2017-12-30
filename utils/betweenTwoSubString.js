// Hàm lấy chuỗi ở giữa 2 chuỗi con.
export default function (string, start, end) {
  let temp = string.substring(string.indexOf(start) + start.length, string.length);
  temp = temp.substring(0, temp.indexOf(end));
  return temp;
}
