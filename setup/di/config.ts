export const config = {
  /** set default languahe */
  locale: 'en-EN',
  /** set Api based url for API repository */
  apiBaseURL: `${process.env.config.apiBaseURL}`,
  /** set Api Image url for Profile images  */
  apiImageURL: process.env.config.apiBaseURL,
  /** set Auth based url for Auth repository */
  authApiBaseURL: process.env.config.authApiBaseURL,
  // /** set Prime Auth based url for Auth repository */
  primeApiURL: `${process.env.config.primeApiBaseURL}`,
  /** set Auth localstorage key name in Auth repository */
  authLocalStorageName: `AUTH_${process.env.config.project}_${process.env.config.env}`,
  /** set Prime Api base url in Prime repository */
  primeApiBaseURL: `${process.env.config.primeApiBaseURL}primeapi/v2/`,
  /** set Prime Api Upload url in Upload repository */
  primeApiUploadURL: `${process.env.config.primeApiBaseURL}primeapi/v2/uploadSigner/`,
  /** set Prime Client Id in Prime repository */
  primeClientId: process.env.config.primeClientId,
  /** set Prime Account Id for Auth repository */
  primeAccountId: process.env.config.primeAccountId,
  /** Cache Db name */
  cacheDb: `CACHE_${process.env.config.project}`,
  /** Cache Time to live. 1 minute by default */
  cacheTtl: 1000 * 60,
  /** Project code */
  project: process.env.config.project,
};
