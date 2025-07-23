export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
    window.location.pathname = "/login";
  }
};

export const convertDateToHumanReadable = (
  date: Date,
  format: string
): string => {
  const map: { [key: string]: string | number } = {
    mm: (date.getMonth() + 1).toString().padStart(2, "0"),
    dd: date.getDate().toString().padStart(2, "0"),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyyy/gi, (matched) =>
    map[matched].toString()
  );
};
