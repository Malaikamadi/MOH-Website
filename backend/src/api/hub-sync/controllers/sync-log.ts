/**
 * Sync log controller - extends with hub sync actions for DHIS2/Ministry Hub integration
 */

import type { Core } from '@strapi/strapi';
import { factories } from '@strapi/strapi';

const HUB_SYNC_KEY = process.env.HUB_SYNC_API_KEY || '';

function requireSyncKey(ctx: any): boolean {
    const key = ctx.request?.headers?.['x-hub-sync-key'] || ctx.request?.body?.hubSyncKey || '';
    if (!HUB_SYNC_KEY) {
        ctx.body = { error: 'Hub sync not configured. Set HUB_SYNC_API_KEY.' };
        ctx.status = 501;
        return false;
    }
    if (key !== HUB_SYNC_KEY) {
        ctx.body = { error: 'Invalid or missing sync key.' };
        ctx.status = 401;
        return false;
    }
    return true;
}

async function logSync(strapi: Core.Strapi, data: Record<string, unknown>) {
    try {
        await strapi.documents('api::hub-sync.sync-log' as any).create({ data });
    } catch {
        strapi.log.warn('Could not write sync log.');
    }
}

export default factories.createCoreController('api::hub-sync.sync-log', ({ strapi }) => ({
    async syncDiseaseSurveillance(ctx: any) {
        if (!requireSyncKey(ctx)) return;

        const body = ctx.request?.body?.data || ctx.request?.body || [];
        const records = Array.isArray(body) ? body : [body];
        let created = 0;
        let updated = 0;

        try {
            for (const rec of records) {
                const payload = {
                    diseaseName: rec.diseaseName || rec.disease_name || rec.dx,
                    region: rec.region || rec.ou,
                    district: rec.district || null,
                    reportingPeriodStart: rec.reportingPeriodStart || rec.reporting_period_start || rec.period,
                    reportingPeriodEnd: rec.reportingPeriodEnd || rec.reporting_period_end || rec.period,
                    totalCases: Number(rec.totalCases ?? rec.total_cases ?? rec.value ?? 0),
                    newCases: Number(rec.newCases ?? rec.new_cases ?? 0),
                    deaths: Number(rec.deaths ?? 0),
                    recovered: Number(rec.recovered ?? 0),
                    sourceSystem: rec.sourceSystem || rec.source_system || 'DHIS2',
                    status: rec.status || 'Confirmed',
                };

                const existingList = await strapi.documents('api::disease-surveillance.disease-surveillance' as any)
                    .findMany({
                        filters: {
                            diseaseName: payload.diseaseName,
                            region: payload.region,
                            reportingPeriodStart: payload.reportingPeriodStart,
                        },
                        limit: 1,
                    });
                const existing = existingList[0];

                if (existing) {
                    await strapi.documents('api::disease-surveillance.disease-surveillance' as any).update({
                        documentId: existing.documentId,
                        data: payload as any,
                    });
                    updated++;
                } else {
                    await strapi.documents('api::disease-surveillance.disease-surveillance' as any).create({
                        data: payload as any,
                        status: 'published',
                    });
                    created++;
                }
            }

            await logSync(strapi, {
                source: body?.source || 'Ministry Hub',
                syncType: 'disease-surveillance',
                recordsProcessed: records.length,
                recordsCreated: created,
                recordsUpdated: updated,
                status: 'success',
            });

            ctx.body = { success: true, processed: records.length, created, updated };
            ctx.status = 200;
        } catch (err: any) {
            strapi.log.error('Hub sync disease-surveillance error:', err);
            await logSync(strapi, {
                source: 'Ministry Hub',
                syncType: 'disease-surveillance',
                recordsProcessed: records.length,
                recordsCreated: created,
                recordsUpdated: updated,
                status: 'failed',
                message: err?.message,
            });
            ctx.body = { error: err?.message };
            ctx.status = 500;
        }
    },

    async syncHealthDashboard(ctx: any) {
        if (!requireSyncKey(ctx)) return;

        const body = ctx.request?.body?.data || ctx.request?.body || {};

        try {
            const existing = await strapi.documents('api::health-information-hub.health-information-hub' as any)
                .findFirst({});

            const payload: Record<string, unknown> = {};
            if (body.totalMaternalDeaths !== undefined) payload.totalMaternalDeaths = Number(body.totalMaternalDeaths);
            if (body.totalUnderFiveDeaths !== undefined) payload.totalUnderFiveDeaths = Number(body.totalUnderFiveDeaths);
            if (body.diseaseReportsActive !== undefined) payload.diseaseReportsActive = Number(body.diseaseReportsActive);
            if (body.facilitiesReportingCount !== undefined) payload.facilitiesReportingCount = Number(body.facilitiesReportingCount);
            if (body.maternalDeathsQuarterly?.length) payload.maternalDeathsQuarterly = body.maternalDeathsQuarterly;
            if (body.underFiveDeathsQuarterly?.length) payload.underFiveDeathsQuarterly = body.underFiveDeathsQuarterly;
            if (body.maternalDeathsMonthly?.length) payload.maternalDeathsMonthly = body.maternalDeathsMonthly;
            if (body.underFiveDeathsMonthly?.length) payload.underFiveDeathsMonthly = body.underFiveDeathsMonthly;
            if (body.healthCoverage?.length) payload.healthCoverage = body.healthCoverage;
            if (body.districtAlerts?.length) payload.districtAlerts = body.districtAlerts;
            if (body.facilityReports?.length) payload.facilityReports = body.facilityReports;

            if (existing) {
                await strapi.documents('api::health-information-hub.health-information-hub' as any).update({
                    documentId: existing.documentId,
                    data: payload,
                });
            } else {
                await strapi.documents('api::health-information-hub.health-information-hub' as any).create({
                    data: payload as any,
                    status: 'published',
                });
            }

            await logSync(strapi, {
                source: body?.source || 'Ministry Hub',
                syncType: 'health-dashboard',
                recordsProcessed: 1,
                recordsCreated: existing ? 0 : 1,
                recordsUpdated: existing ? 1 : 0,
                status: 'success',
            });

            ctx.body = { success: true };
            ctx.status = 200;
        } catch (err: any) {
            strapi.log.error('Hub sync health-dashboard error:', err);
            await logSync(strapi, {
                source: 'Ministry Hub',
                syncType: 'health-dashboard',
                recordsProcessed: 1,
                recordsCreated: 0,
                recordsUpdated: 0,
                status: 'failed',
                message: err?.message,
            });
            ctx.body = { error: err?.message };
            ctx.status = 500;
        }
    },
}));
