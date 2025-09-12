[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / Prisma\_\_UserClient

# Interface: Prisma\_\_UserClient\<T, Null, ExtArgs, GlobalOmitOptions\>

Defined in: backend/src/generated/prisma/index.d.ts:1749

The delegate class that acts as a "Promise-like" for User.
Why is this prefixed with `Prisma__`?
Because we want to prevent naming conflicts as mentioned in
https://github.com/prisma/prisma-client-js/issues/707

## Extends

- [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`T`\>

## Type Parameters

### T

`T`

### Null

`Null` = `never`

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

### GlobalOmitOptions

`GlobalOmitOptions` = \{ \}

## Properties

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `"PrismaPromise"`

Defined in: backend/src/generated/prisma/index.d.ts:1750

#### Overrides

`Prisma.PrismaPromise.[toStringTag]`

## Methods

### catch()

> **catch**\<`TResult`\>(`onrejected?`): `Promise`\<`T` \| `TResult`\>

Defined in: backend/src/generated/prisma/index.d.ts:1765

Attaches a callback for only the rejection of the Promise.

#### Type Parameters

##### TResult

`TResult` = `never`

#### Parameters

##### onrejected?

The callback to execute when the Promise is rejected.

`null` | (`reason`) => `TResult` \| `PromiseLike`\<`TResult`\>

#### Returns

`Promise`\<`T` \| `TResult`\>

A Promise for the completion of the callback.

#### Overrides

`Prisma.PrismaPromise.catch`

***

### deployments()

> **deployments**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`Null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

Defined in: backend/src/generated/prisma/index.d.ts:1752

#### Type Parameters

##### T

`T` *extends* [`User$deploymentsArgs`](../type-aliases/User$deploymentsArgs.md)\<`ExtArgs`\> = \{ \}

#### Parameters

##### args?

[`Subset`](../type-aliases/Subset.md)\<`T`, [`User$deploymentsArgs`](../type-aliases/User$deploymentsArgs.md)\<`ExtArgs`\>\>

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`Null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

***

### finally()

> **finally**(`onfinally?`): `Promise`\<`T`\>

Defined in: backend/src/generated/prisma/index.d.ts:1772

Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
resolved value cannot be modified from the callback.

#### Parameters

##### onfinally?

The callback to execute when the Promise is settled (fulfilled or rejected).

`null` | () => `void`

#### Returns

`Promise`\<`T`\>

A Promise for the completion of the callback.

#### Overrides

`Prisma.PrismaPromise.finally`

***

### projects()

> **projects**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`Null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

Defined in: backend/src/generated/prisma/index.d.ts:1751

#### Type Parameters

##### T

`T` *extends* [`User$projectsArgs`](../type-aliases/User$projectsArgs.md)\<`ExtArgs`\> = \{ \}

#### Parameters

##### args?

[`Subset`](../type-aliases/Subset.md)\<`T`, [`User$projectsArgs`](../type-aliases/User$projectsArgs.md)\<`ExtArgs`\>\>

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`Null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

***

### then()

> **then**\<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): `Promise`\<`TResult1` \| `TResult2`\>

Defined in: backend/src/generated/prisma/index.d.ts:1759

Attaches callbacks for the resolution and/or rejection of the Promise.

#### Type Parameters

##### TResult1

`TResult1` = `T`

##### TResult2

`TResult2` = `never`

#### Parameters

##### onfulfilled?

The callback to execute when the Promise is resolved.

`null` | (`value`) => `TResult1` \| `PromiseLike`\<`TResult1`\>

##### onrejected?

The callback to execute when the Promise is rejected.

`null` | (`reason`) => `TResult2` \| `PromiseLike`\<`TResult2`\>

#### Returns

`Promise`\<`TResult1` \| `TResult2`\>

A Promise for the completion of which ever callback is executed.

#### Overrides

`Prisma.PrismaPromise.then`
