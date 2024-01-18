/* eslint-disable no-useless-escape */
export const formatMoney = (data) => {
  let santizeData;
  if (typeof data === "number") {
    santizeData = data;
  } else {
    santizeData = data ? data.replace(/[\D\s\._\-]/g, "") : 0;
  }
  const formatValue = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  }).format(santizeData);

  return formatValue.replaceAll(".", ",").slice(0, -2);
};

export const revertMoney = (stringData) => {
  return stringData ? +stringData.replaceAll(",", "").slice(0, -2) : 0;
};
