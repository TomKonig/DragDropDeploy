[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / GetSelect

# Type Alias: GetSelect\<Base, R, KR\>

> **GetSelect**\<`Base`, `R`, `KR`\> = \{ \[K in KR \| keyof Base\]?: K extends KR ? boolean : Base\[K\] \}

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1776

## Type Parameters

### Base

`Base` *extends* `Record`\<`any`, `any`\>

### R

`R` *extends* [`InternalArgs`](InternalArgs.md)\[`"result"`\]\[`string`\]

### KR

`KR` *extends* keyof `R` = `string` *extends* keyof `R` ? `never` : keyof `R`
