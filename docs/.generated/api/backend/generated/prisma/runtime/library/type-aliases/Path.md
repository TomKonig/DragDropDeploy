[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / Path

# Type Alias: Path\<O, P, Default\>

> **Path**\<`O`, `P`, `Default`\> = `O` *extends* `unknown` ? `P` *extends* \[infer K, `...(infer R)`\] ? `K` *extends* keyof `O` ? `Path`\<`O`\[`K`\], `R`\> : `Default` : `O` : `never`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2584

## Type Parameters

### O

`O`

### P

`P`

### Default

`Default` = `never`
