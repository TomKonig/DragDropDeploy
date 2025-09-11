#!/usr/bin/env ts-node
/*
  Backfill script: Link existing Deployment rows to BuildJob rows using heuristics.
  Strategy:
    1. For each Deployment with null buildJobId, attempt to find a BuildJob in same project where:
       - Timestamps are close (BuildJob.createdAt within +/- 2 minutes of Deployment.createdAt)
       - If Deployment.artifactPath present and BuildJob.artifactPath matches -> strong match.
       - Prefer SUCCESS BuildJob if multiple candidates.
    2. Dry-run mode (default): prints intended updates only.
    3. Execute mode: pass --execute to persist updates.

  Safety:
    - Never overwrites a non-null buildJobId.
    - Skips if multiple equally-ranked candidates (ambiguous) unless --forceAmbiguous provided.

  Ranking:
    Score = (artifactPathExact? +20) + (statusSuccess? +5) + (timeProximityScore up to +5).
*/
import { PrismaClient, BuildJobStatus } from '@prisma/client';

interface Args { execute: boolean; forceAmbiguous: boolean; }
function parseArgs(): Args {
  const execute = process.argv.includes('--execute');
  const forceAmbiguous = process.argv.includes('--forceAmbiguous');
  return { execute, forceAmbiguous };
}

(async () => {
  const prisma = new PrismaClient();
  const { execute, forceAmbiguous } = parseArgs();
  const windowMs = 2 * 60 * 1000; // 2 minutes

  const deployments = await prisma.deployment.findMany({ where: { buildJobId: null }, orderBy: { createdAt: 'asc' } });
  if (!deployments.length) {
    console.log('No deployments needing backfill.');
    await prisma.$disconnect();
    return;
  }
  console.log(`Found ${deployments.length} deployments without buildJobId.`);

  let linked = 0, ambiguous = 0, skipped = 0;
  for (const d of deployments) {
    const candidates = await prisma.buildJob.findMany({ where: { projectId: d.projectId } });
    const scored = candidates.map(bj => {
      let score = 0;
      const timeDelta = Math.abs(bj.createdAt.getTime() - d.createdAt.getTime());
      if (timeDelta <= windowMs) {
        // Linear decay: 0ms -> 5 pts, windowMs -> 0 pts
        score += Math.max(0, 5 - (5 * timeDelta / windowMs));
      }
      if (bj.status === BuildJobStatus.SUCCESS) score += 5;
      if (d.artifactPath && bj.artifactPath && d.artifactPath === bj.artifactPath) score += 20;
      return { bj, score };
    }).filter(s => s.score > 0).sort((a,b) => b.score - a.score);

    if (!scored.length) { skipped++; continue; }
    if (scored.length > 1 && scored[0].score === scored[1].score && !forceAmbiguous) {
      ambiguous++; continue; }
    const chosen = scored[0];
    if (execute) {
      await prisma.deployment.update({ where: { id: d.id }, data: { buildJobId: chosen.bj.id } });
    }
    linked++;
    console.log(`${execute ? 'Linked' : 'Would link'} deployment ${d.id} -> buildJob ${chosen.bj.id} (score=${chosen.score.toFixed(2)})`);
  }

  console.log(`Summary: ${execute ? 'Linked' : 'Would link'}=${linked}, ambiguous=${ambiguous}, skipped=${skipped}`);
  console.log(`Mode: ${execute ? 'EXECUTE' : 'DRY-RUN'}${forceAmbiguous ? ' (force ambiguous)' : ''}`);
  await prisma.$disconnect();
})().catch(e => { console.error(e); process.exit(1); });
