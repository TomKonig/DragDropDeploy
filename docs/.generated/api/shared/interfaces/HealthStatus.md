[**@dragdropdeploy/shared**](../README.md)

***

[@dragdropdeploy/shared](../README.md) / HealthStatus

# Interface: HealthStatus

Defined in: [index.ts:27](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/shared/src/index.ts#L27)

Minimal standardized health endpoint payload shared by backend and consumers.

## Properties

### status

> **status**: `"ok"`

Defined in: [index.ts:29](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/shared/src/index.ts#L29)

Literal ok to simplify client status checks

***

### timestamp

> **timestamp**: `string`

Defined in: [index.ts:31](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/shared/src/index.ts#L31)

ISO timestamp (UTC) when the health snapshot was generated
