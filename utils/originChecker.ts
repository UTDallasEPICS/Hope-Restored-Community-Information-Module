const isSameOrigin = (origin: URL, destination: URL) =>
  origin.protocol === destination.protocol &&
  origin.host === destination.host &&
  origin.port === destination.port;

export function compareURLs(origin: string, destination: string) {
  if (!origin || !destination) {
    return false;
  }
  const originURL = new URL(origin);
  const destinationURL = new URL(destination);

  return isSameOrigin(originURL, destinationURL);
}
