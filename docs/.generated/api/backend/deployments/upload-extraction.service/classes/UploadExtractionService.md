[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [deployments/upload-extraction.service](../README.md) / UploadExtractionService

# Class: UploadExtractionService

Defined in: [backend/src/deployments/upload-extraction.service.ts:15](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/upload-extraction.service.ts#L15)

## Constructors

### Constructor

> **new UploadExtractionService**(): `UploadExtractionService`

#### Returns

`UploadExtractionService`

## Methods

### validateAndStage()

> **validateAndStage**(`projectId`, `archiveBuffer`, `originalName`): `Promise`\<`ExtractResult`\>

Defined in: [backend/src/deployments/upload-extraction.service.ts:19](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/upload-extraction.service.ts#L19)

#### Parameters

##### projectId

`string`

##### archiveBuffer

`Buffer`

##### originalName

`string`

#### Returns

`Promise`\<`ExtractResult`\>
