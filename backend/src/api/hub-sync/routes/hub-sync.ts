/**
 * Hub Sync Routes
 * Endpoints for Ministry Information Hub / DHIS2 to push data
 */

export default {
    routes: [
        {
            method: 'POST',
            path: '/disease-surveillance',
            handler: 'sync-log.syncDiseaseSurveillance',
        },
        {
            method: 'POST',
            path: '/health-dashboard',
            handler: 'sync-log.syncHealthDashboard',
        },
    ],
};
