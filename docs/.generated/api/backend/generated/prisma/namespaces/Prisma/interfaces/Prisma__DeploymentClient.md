[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / Prisma\_\_DeploymentClient

# Interface: Prisma\_\_DeploymentClient\<T, Null, ExtArgs, GlobalOmitOptions\>

Defined in: backend/src/generated/prisma/index.d.ts:3980

The delegate class that acts as a "Promise-like" for Deployment.
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

Defined in: backend/src/generated/prisma/index.d.ts:3981

#### Overrides

`Prisma.PrismaPromise.[toStringTag]`

## Methods

### catch()

> **catch**\<`TResult`\>(`onrejected?`): `Promise`\<`T` \| `TResult`\>

Defined in: backend/src/generated/prisma/index.d.ts:3996

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

### finally()

> **finally**(`onfinally?`): `Promise`\<`T`\>

Defined in: backend/src/generated/prisma/index.d.ts:4003

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

### project()

> **project**\<`T`\>(`args?`): [`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<`Null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `Null`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:3982

#### Type Parameters

##### T

`T` *extends* [`ProjectDefaultArgs`](../type-aliases/ProjectDefaultArgs.md)\<`ExtArgs`\> = \{ \}

#### Parameters

##### args?

[`Subset`](../type-aliases/Subset.md)\<`T`, [`ProjectDefaultArgs`](../type-aliases/ProjectDefaultArgs.md)\<`ExtArgs`\>\>

#### Returns

[`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<`Null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `Null`, `ExtArgs`, `GlobalOmitOptions`\>

***

### then()

> **then**\<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): `Promise`\<`TResult1` \| `TResult2`\>

Defined in: backend/src/generated/prisma/index.d.ts:3990

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

***

### user()

> **user**\<`T`\>(`args?`): [`Prisma__UserClient`](Prisma__UserClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:3983

#### Type Parameters

##### T

`T` *extends* [`Deployment$userArgs`](../type-aliases/Deployment$userArgs.md)\<`ExtArgs`\> = \{ \}

#### Parameters

##### args?

[`Subset`](../type-aliases/Subset.md)\<`T`, [`Deployment$userArgs`](../type-aliases/Deployment$userArgs.md)\<`ExtArgs`\>\>

#### Returns

[`Prisma__UserClient`](Prisma__UserClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>
