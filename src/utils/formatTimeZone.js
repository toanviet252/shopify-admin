export const formatTime = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const options = {
    timeZone: "Asia/Bangkok", // GMT+7
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return date.toLocaleString("en-US", options);
};
