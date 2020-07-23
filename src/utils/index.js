export const getHostNameFromUrlString = (urlString) => {
  if (!urlString) return "";
  const matches = urlString.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  return matches && matches[1];
};
