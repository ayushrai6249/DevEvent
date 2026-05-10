<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router project. The following changes were made:

- **`instrumentation-client.ts`** (new file): Initializes PostHog client-side using the `instrumentation-client` convention for Next.js 15.3+. Configured with a reverse proxy (`/ingest`), exception capture for error tracking, and debug mode in development.
- **`next.config.ts`**: Added reverse proxy rewrites routing `/ingest/*` to PostHog's ingestion servers, and set `skipTrailingSlashRedirect: true` to support PostHog's trailing-slash API requests.
- **`components/ExploreBtn.tsx`**: Added `explore_events_clicked` capture to the Explore Events button click handler.
- **`components/EventCard.tsx`**: Added `"use client"` directive and `event_card_clicked` capture (with `title`, `slug`, `location`, and `date` properties) to the event card link click handler.
- **`.env.local`**: Populated `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

| Event | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" CTA button on the home page hero section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on a featured event card to view its details page | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/416853/dashboard/1564430)
- **Insight**: [Explore Events button clicks over time](https://us.posthog.com/project/416853/insights/4vOcGF1t)
- **Insight**: [Event card clicks over time](https://us.posthog.com/project/416853/insights/YykgrtSl)
- **Insight**: [Explore to event click conversion funnel](https://us.posthog.com/project/416853/insights/EXf5T7tL)
- **Insight**: [Most clicked events by title](https://us.posthog.com/project/416853/insights/rIrF54MH)
- **Insight**: [Total event card clicks (30 days)](https://us.posthog.com/project/416853/insights/hM4OLxNf)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
