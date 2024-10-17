export const addToCalendar = (item: Record<any, any>, returnTitle = false) => {
  const location = item.place || "Kulturní dům JAS, Pilsen, Czech Republic";
  const description = item.name + " with " + item.teachers;

  const title =
    "LHHC 2024: " +
    (item.type === "Party"
      ? item.name
      : item.type + (item.level ? " " + item.level : "") + " - " + item.name);

  if (returnTitle) return title;

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&location=${encodeURIComponent(location)}&dates=${formatDate(
    item.start
  )}/${formatDate(item.end)}&details=${encodeURIComponent(description)}`;
};

// format date as YYYYMMDDTMMHHSSZ
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}00Z`;
};
