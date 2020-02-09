import pkg from '../../package.json';

export function getVersion() {
  const baseVersion = pkg.version;
  const additionalVersion = process.env.APP_VERSION || 'dev';

  return `${baseVersion}-${additionalVersion}`;
}
