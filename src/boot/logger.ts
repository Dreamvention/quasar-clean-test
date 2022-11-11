import { boot } from 'quasar/wrappers';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';

export default boot(async ({ app, router }) => {
  Sentry.init({
    app,
    dsn: 'https://d28694661af44ab387038792d2569d43@o1341603.ingest.sentry.io/6615006',
    environment: process.env.APP_ENV,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
});
