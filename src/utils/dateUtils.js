export const converUTCtoLoacle = (utcDate) => {
  const date = new Date(utcDate);

  const localeLastUpdateDate = date.toLocaleString();

  let currentDateTime = new Date();
  currentDateTime = currentDateTime.toLocaleString();

  let dateDiffmin = new Date(currentDateTime) - new Date(localeLastUpdateDate);
  dateDiffmin = Math.round(dateDiffmin / 1000 / 60);
  if (dateDiffmin > 60) {
    dateDiffmin =
      Math.floor(dateDiffmin / 60) +
      " hour(s) and " +
      (dateDiffmin % 60) +
      " mins";
    return dateDiffmin;
  }
  return dateDiffmin + " mins";
};
