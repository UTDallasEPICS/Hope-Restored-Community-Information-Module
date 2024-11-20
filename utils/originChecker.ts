const isSameOrigin = (origin: URL, destination: URL) =>
  origin.protocol === destination.protocol &&
  origin.host === destination.host &&
  origin.port === destination.port;

export function compareURLs(origin: string, destination: string) {
  const originURL = new URL(origin);
  const destinationURL = new URL(destination);

  return isSameOrigin(originURL, destinationURL);
}
