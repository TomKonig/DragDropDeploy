[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [build/build.executor](../README.md) / BuildExecutorService

# Class: BuildExecutorService

Defined in: [backend/src/build/build.executor.ts:17](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.executor.ts#L17)

BuildExecutorService: performs a real build process (opt-in) capturing stdout/err to log file.
Current minimal strategy:
 - Detects presence of package.json in project workspace (future: project specific path)
 - Runs `npm run build --if-present` and records exit code
 - Redacts any occurrence of bearer tokens or typical secret patterns before writing logs

## Constructors

### Constructor

> **new BuildExecutorService**(`metrics`, `minify`, `prisma`): `BuildExecutorService`

Defined in: [backend/src/build/build.executor.ts:21](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.executor.ts#L21)

#### Parameters

##### metrics

[`MetricsService`](../../../metrics/metrics.service/classes/MetricsService.md)

##### minify

[`MinifyService`](../../../minify/minify.service/classes/MinifyService.md)

##### prisma

[`PrismaService`](../../../prisma/prisma.service/classes/PrismaService.md)

#### Returns

`BuildExecutorService`

## Methods

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [backend/src/build/build.executor.ts:23](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.executor.ts#L23)

#### Returns

`boolean`

***

### runBuild()

> **runBuild**(`projectId`, `logFile`): `Promise`\<\{ `exitCode`: `null` \| `number`; `success`: `boolean`; \}\>

Defined in: [backend/src/build/build.executor.ts:25](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.executor.ts#L25)

#### Parameters

##### projectId

`string`

##### logFile

`string`

#### Returns

`Promise`\<\{ `exitCode`: `null` \| `number`; `success`: `boolean`; \}\>
