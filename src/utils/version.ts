export function getVersion() {
  const packageVersion = process.env.PKG_VERSION;
  const appVersion = process.env.VERSION || 'dev';

  return `${packageVersion}-${appVersion}`;
}
