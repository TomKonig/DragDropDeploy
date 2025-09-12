[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / TruthyKeys

# Type Alias: TruthyKeys\<T\>

> **TruthyKeys**\<`T`\> = keyof \{ \[K in keyof T as T\[K\] extends false \| undefined \| null ? never : K\]: K \}

Defined in: backend/src/generated/prisma/index.d.ts:376

## Type Parameters

### T

`T`
