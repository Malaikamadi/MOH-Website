# Hub Sync API – DHIS2 / Ministry Information Hub Integration

The MOH Website backend receives health data from the Ministry Information Hub (which aggregates data from DHIS2). This is a **two-way integration**:

```
DHIS2  →  Ministry Information Hub  →  MOH Website Backend  →  Website Frontend
```

## Endpoints

Both endpoints require authentication via API key.

### 1. Sync Disease Surveillance

**POST** `/api/hub-sync/disease-surveillance`

Bulk upsert disease surveillance records. Accepts DHIS2-style or normalized payloads.

**Headers:**
```
X-Hub-Sync-Key: <your-api-key>
Content-Type: application/json
```

**Body (single or array):**
```json
{
  "data": [
    {
      "diseaseName": "Malaria",
      "region": "Western Area",
      "district": "Freetown",
      "reportingPeriodStart": "2025-01-01",
      "reportingPeriodEnd": "2025-01-31",
      "totalCases": 150,
      "newCases": 45,
      "deaths": 2,
      "recovered": 120,
      "sourceSystem": "DHIS2",
      "status": "Confirmed"
    }
  ]
}
```

**Alternative field names (DHIS2 compat):**
- `disease_name` / `dx` → diseaseName
- `ou` → region
- `reporting_period_start` / `period` → reportingPeriodStart
- `total_cases` / `value` → totalCases

### 2. Sync Health Dashboard

**POST** `/api/hub-sync/health-dashboard`

Updates the Health Information Hub single type (aggregate dashboard data).

**Headers:**
```
X-Hub-Sync-Key: <your-api-key>
Content-Type: application/json
```

**Body (partial update supported):**
```json
{
  "data": {
    "totalMaternalDeaths": 137,
    "totalUnderFiveDeaths": 292,
    "diseaseReportsActive": 5,
    "facilitiesReportingCount": 1205,
    "maternalDeathsQuarterly": [
      { "period": "Q1", "year": 2025, "value": 27 }
    ],
    "healthCoverage": [
      { "label": "Vaccination", "value": 85, "color": "#059669", "icon": "fa-syringe" }
    ],
    "districtAlerts": [
      { "district": "Bombali", "status": "critical", "activeCases": 89, "lastUpdate": "15 min ago" }
    ]
  }
}
```

## Configuration

Set the API key in your environment:

```bash
HUB_SYNC_API_KEY=your-secure-random-key
```

Without this, sync endpoints return `501 Not Implemented`.

## Sync Logs

Each sync is logged in the `sync_logs` collection (api::hub-sync.sync-log). View in Strapi Admin under **Content Manager → Hub Sync Log** (requires admin access).

## Integration Flow

1. Ministry Hub (or DHIS2 middleware) periodically fetches/aggregates data.
2. Ministry Hub calls the sync endpoints with `X-Hub-Sync-Key`.
3. Backend upserts records and logs the sync.
4. Frontend fetches published data via the public API.
