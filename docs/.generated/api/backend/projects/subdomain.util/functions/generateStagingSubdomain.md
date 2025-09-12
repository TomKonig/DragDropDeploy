[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [projects/subdomain.util](../README.md) / generateStagingSubdomain

# Function: generateStagingSubdomain()

> **generateStagingSubdomain**(`length`): `string`

Defined in: [backend/src/projects/subdomain.util.ts:11](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/subdomain.util.ts#L11)

Generate a random, DNS-safe staging subdomain.
Constraints:
- Lowercase alphanumeric + hyphen.
- Starts with letter.
- Length configurable (default 12) within 3..32.
- Avoid leading/trailing hyphen; collapse multiple hyphens.

## Parameters

### length

`number` = `12`

## Returns

`string`
