# springboot-angular-e2e

Playwright E2E test framework for a Spring Boot (Java) + Angular web application.

## Structure

```
├── tests/
│   ├── auth/        # Login, session, and auth flow tests
│   ├── api/         # Spring Boot REST API contract tests
│   └── e2e/         # Full Angular UI end-to-end tests
├── pages/           # Page Object Models for Angular components
├── fixtures/        # Shared test fixtures (authenticated sessions, etc.)
├── utils/           # ApiClient and helper utilities
└── .github/
    └── workflows/   # GitHub Actions CI pipeline
```

## Setup

```bash
npm install
npx playwright install
cp .env.example .env.local   # fill in your values
```

## Running Tests

```bash
npm test                  # all tests, headless
npm run test:e2e          # Angular UI tests only
npm run test:api          # Spring Boot API tests only
npm run test:auth         # Auth flow tests only
npm run test:headed       # run with visible browser
npm run test:debug        # step-through debugger
npm run report            # open HTML report
```

## CI

GitHub Actions runs on every push to `main`/`develop` and on pull requests. Configure the secrets below in your repo settings:

| Secret | Description |
|--------|-------------|
| `BASE_URL` | Angular app URL |
| `API_BASE_URL` | Spring Boot base URL |
| `TEST_USER_EMAIL` | Test user credentials |
| `TEST_USER_PASSWORD` | Test user credentials |
