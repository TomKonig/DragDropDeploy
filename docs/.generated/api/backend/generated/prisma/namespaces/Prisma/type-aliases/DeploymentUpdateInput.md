[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentUpdateInput

# Type Alias: DeploymentUpdateInput

> **DeploymentUpdateInput** = `object`

Defined in: backend/src/generated/prisma/index.d.ts:4946

## Properties

### buildLogsUrl?

> `optional` **buildLogsUrl**: [`NullableStringFieldUpdateOperationsInput`](NullableStringFieldUpdateOperationsInput.md) \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4952

***

### commitHash?

> `optional` **commitHash**: [`NullableStringFieldUpdateOperationsInput`](NullableStringFieldUpdateOperationsInput.md) \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4950

***

### createdAt?

> `optional` **createdAt**: [`DateTimeFieldUpdateOperationsInput`](DateTimeFieldUpdateOperationsInput.md) \| `Date` \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4948

***

### id?

> `optional` **id**: [`StringFieldUpdateOperationsInput`](StringFieldUpdateOperationsInput.md) \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4947

***

### imageTag?

> `optional` **imageTag**: [`NullableStringFieldUpdateOperationsInput`](NullableStringFieldUpdateOperationsInput.md) \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4951

***

### project?

> `optional` **project**: [`ProjectUpdateOneRequiredWithoutDeploymentsNestedInput`](ProjectUpdateOneRequiredWithoutDeploymentsNestedInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:4953

***

### status?

> `optional` **status**: [`EnumDeployStatusFieldUpdateOperationsInput`](EnumDeployStatusFieldUpdateOperationsInput.md) \| [`DeployStatus`](../../$Enums/type-aliases/DeployStatus.md)

Defined in: backend/src/generated/prisma/index.d.ts:4949

***

### user?

> `optional` **user**: [`UserUpdateOneWithoutDeploymentsNestedInput`](UserUpdateOneWithoutDeploymentsNestedInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:4954
