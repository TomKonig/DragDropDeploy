[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / InternalArgs

# Type Alias: InternalArgs\<R, M, Q, C\>

> **InternalArgs**\<`R`, `M`, `Q`, `C`\> = `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1903

## Type Parameters

### R

`R` = `{ [K in string]: { [K in string]: unknown } }`

### M

`M` = `{ [K in string]: { [K in string]: unknown } }`

### Q

`Q` = `{ [K in string]: { [K in string]: unknown } }`

### C

`C` = `{ [K in string]: unknown }`

## Properties

### client

> **client**: `{ [K in keyof C]: () => C[K] }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1933

***

### model

> **model**: `{ [K in keyof M]: { [P in keyof M[K]]: () => M[K][P] } }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1923

***

### query

> **query**: `{ [K in keyof Q]: { [P in keyof Q[K]]: () => Q[K][P] } }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1928

***

### result

> **result**: `{ [K in keyof R]: { [P in keyof R[K]]: () => R[K][P] } }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1918
