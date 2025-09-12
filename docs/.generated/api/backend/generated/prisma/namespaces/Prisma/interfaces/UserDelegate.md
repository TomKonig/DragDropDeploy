[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / UserDelegate

# Interface: UserDelegate\<ExtArgs, GlobalOmitOptions\>

Defined in: backend/src/generated/prisma/index.d.ts:1368

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

### GlobalOmitOptions

`GlobalOmitOptions` = \{ \}

## Indexable

\[`K`: `symbol`\]: `object`

## Properties

### fields

> `readonly` **fields**: [`UserFieldRefs`](UserFieldRefs.md)

Defined in: backend/src/generated/prisma/index.d.ts:1740

Fields of the User model

## Methods

### aggregate()

> **aggregate**\<`T`\>(`args`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetUserAggregateType`](../type-aliases/GetUserAggregateType.md)\<`T`\>\>

Defined in: backend/src/generated/prisma/index.d.ts:1659

Allows you to perform aggregations operations on a User.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`UserAggregateArgs`](../type-aliases/UserAggregateArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`Subset`](../type-aliases/Subset.md)\<`T`, [`UserAggregateArgs`](../type-aliases/UserAggregateArgs.md)\>

Select which aggregations you would like to apply and on what fields.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetUserAggregateType`](../type-aliases/GetUserAggregateType.md)\<`T`\>\>

#### Example

```ts
// Ordered by age ascending
// Where email contains prisma.io
// Limited to the 10 users
const aggregations = await prisma.user.aggregate({
  _avg: {
    age: true,
  },
  where: {
    email: {
      contains: "prisma.io",
    },
  },
  orderBy: {
    age: "asc",
  },
  take: 10,
})
```

***

### count()

> **count**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`T` *extends* [`Record`](../../../runtime/library/type-aliases/Record.md)\<`"select"`, `any`\> ? `T`\<`T`\>\[`"select"`\] *extends* `true` ? `number` : \{ \[P in string \| number \| symbol\]: P extends keyof UserCountAggregateOutputType ? UserCountAggregateOutputType\[P\<P\>\] : never \} : `number`\>

Defined in: backend/src/generated/prisma/index.d.ts:1625

Count the number of Users.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`UserCountArgs`](../type-aliases/UserCountArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`Subset`](../type-aliases/Subset.md)\<`T`, [`UserCountArgs`](../type-aliases/UserCountArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>\>

Arguments to filter Users to count.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`T` *extends* [`Record`](../../../runtime/library/type-aliases/Record.md)\<`"select"`, `any`\> ? `T`\<`T`\>\[`"select"`\] *extends* `true` ? `number` : \{ \[P in string \| number \| symbol\]: P extends keyof UserCountAggregateOutputType ? UserCountAggregateOutputType\[P\<P\>\] : never \} : `number`\>

#### Example

```ts
// Count the number of Users
const count = await prisma.user.count({
  where: {
    // ... the filter for the Users we want to count
  }
})
```

***

### create()

> **create**\<`T`\>(`args`): [`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:1458

Create a User.

#### Type Parameters

##### T

`T` *extends* [`UserCreateArgs`](../type-aliases/UserCreateArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserCreateArgs`](../type-aliases/UserCreateArgs.md)\<`ExtArgs`\>\>

Arguments to create a User.

#### Returns

[`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Create one User
const User = await prisma.user.create({
  data: {
    // ... data to create a User
  }
})
```

***

### createMany()

> **createMany**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:1472

Create many Users.

#### Type Parameters

##### T

`T` *extends* [`UserCreateManyArgs`](../type-aliases/UserCreateManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserCreateManyArgs`](../type-aliases/UserCreateManyArgs.md)\<`ExtArgs`\>\>

Arguments to create many Users.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

#### Example

```ts
// Create many Users
const user = await prisma.user.createMany({
  data: [
    // ... provide data here
  ]
})
```

***

### createManyAndReturn()

> **createManyAndReturn**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

Defined in: backend/src/generated/prisma/index.d.ts:1496

Create many Users and returns the data saved in the database.

#### Type Parameters

##### T

`T` *extends* [`UserCreateManyAndReturnArgs`](../type-aliases/UserCreateManyAndReturnArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserCreateManyAndReturnArgs`](../type-aliases/UserCreateManyAndReturnArgs.md)\<`ExtArgs`\>\>

Arguments to create many Users.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

#### Example

```ts
// Create many Users
const user = await prisma.user.createManyAndReturn({
  data: [
    // ... provide data here
  ]
})

// Create many Users and only return the `id`
const userWithIdOnly = await prisma.user.createManyAndReturn({
  select: { id: true },
  data: [
    // ... provide data here
  ]
})
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined
```

***

### delete()

> **delete**\<`T`\>(`args`): [`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:1510

Delete a User.

#### Type Parameters

##### T

`T` *extends* [`UserDeleteArgs`](../type-aliases/UserDeleteArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserDeleteArgs`](../type-aliases/UserDeleteArgs.md)\<`ExtArgs`\>\>

Arguments to delete one User.

#### Returns

[`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Delete one User
const User = await prisma.user.delete({
  where: {
    // ... filter to delete one User
  }
})
```

***

### deleteMany()

> **deleteMany**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:1541

Delete zero or more Users.

#### Type Parameters

##### T

`T` *extends* [`UserDeleteManyArgs`](../type-aliases/UserDeleteManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserDeleteManyArgs`](../type-aliases/UserDeleteManyArgs.md)\<`ExtArgs`\>\>

Arguments to filter Users to delete.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

#### Example

```ts
// Delete a few Users
const { count } = await prisma.user.deleteMany({
  where: {
    // ... provide filter here
  }
})
```

***

### findFirst()

> **findFirst**\<`T`\>(`args?`): [`Prisma__UserClient`](Prisma__UserClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:1410

Find the first User that matches the filter.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`UserFindFirstArgs`](../type-aliases/UserFindFirstArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserFindFirstArgs`](../type-aliases/UserFindFirstArgs.md)\<`ExtArgs`\>\>

Arguments to find a User

#### Returns

[`Prisma__UserClient`](Prisma__UserClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one User
const user = await prisma.user.findFirst({
  where: {
    // ... provide filter here
  }
})
```

***

### findFirstOrThrow()

> **findFirstOrThrow**\<`T`\>(`args?`): [`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:1426

Find the first User that matches the filter or
throw `PrismaKnownClientError` with `P2025` code if no matches were found.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`UserFindFirstOrThrowArgs`](../type-aliases/UserFindFirstOrThrowArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserFindFirstOrThrowArgs`](../type-aliases/UserFindFirstOrThrowArgs.md)\<`ExtArgs`\>\>

Arguments to find a User

#### Returns

[`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one User
const user = await prisma.user.findFirstOrThrow({
  where: {
    // ... provide filter here
  }
})
```

***

### findMany()

> **findMany**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

Defined in: backend/src/generated/prisma/index.d.ts:1444

Find zero or more Users that matches the filter.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`UserFindManyArgs`](../type-aliases/UserFindManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserFindManyArgs`](../type-aliases/UserFindManyArgs.md)\<`ExtArgs`\>\>

Arguments to filter and select certain fields only.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

#### Example

```ts
// Get all Users
const users = await prisma.user.findMany()

// Get first 10 Users
const users = await prisma.user.findMany({ take: 10 })

// Only select the `id`
const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
```

***

### findUnique()

> **findUnique**\<`T`\>(`args`): [`Prisma__UserClient`](Prisma__UserClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:1381

Find zero or one User that matches the filter.

#### Type Parameters

##### T

`T` *extends* [`UserFindUniqueArgs`](../type-aliases/UserFindUniqueArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserFindUniqueArgs`](../type-aliases/UserFindUniqueArgs.md)\<`ExtArgs`\>\>

Arguments to find a User

#### Returns

[`Prisma__UserClient`](Prisma__UserClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one User
const user = await prisma.user.findUnique({
  where: {
    // ... provide filter here
  }
})
```

***

### findUniqueOrThrow()

> **findUniqueOrThrow**\<`T`\>(`args`): [`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:1395

Find one User that matches the filter or throw an error with `error.code='P2025'`
if no matches were found.

#### Type Parameters

##### T

`T` *extends* [`UserFindUniqueOrThrowArgs`](../type-aliases/UserFindUniqueOrThrowArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserFindUniqueOrThrowArgs`](../type-aliases/UserFindUniqueOrThrowArgs.md)\<`ExtArgs`\>\>

Arguments to find a User

#### Returns

[`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one User
const user = await prisma.user.findUniqueOrThrow({
  where: {
    // ... provide filter here
  }
})
```

***

### groupBy()

> **groupBy**\<`T`, `HasSelectOrTake`, `OrderByArg`, `OrderFields`, `ByFields`, `ByValid`, `HavingFields`, `HavingValid`, `ByEmpty`, `InputErrors`\>(`args`): `object` *extends* `InputErrors` ? [`GetUserGroupByPayload`](../type-aliases/GetUserGroupByPayload.md)\<`T`\> : [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`InputErrors`\>

Defined in: backend/src/generated/prisma/index.d.ts:1679

Group by User.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`UserGroupByArgs`](../type-aliases/UserGroupByArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

##### HasSelectOrTake

`HasSelectOrTake` *extends* `0` \| `1`

##### OrderByArg

`OrderByArg` *extends* \{ `orderBy`: `undefined` \| [`UserOrderByWithAggregationInput`](../type-aliases/UserOrderByWithAggregationInput.md) \| [`UserOrderByWithAggregationInput`](../type-aliases/UserOrderByWithAggregationInput.md)[]; \} \| \{ `orderBy?`: [`UserOrderByWithAggregationInput`](../type-aliases/UserOrderByWithAggregationInput.md) \| [`UserOrderByWithAggregationInput`](../type-aliases/UserOrderByWithAggregationInput.md)[]; \}

##### OrderFields

`OrderFields` *extends* `"id"` \| `"createdAt"` \| `"updatedAt"` \| `"email"` \| `"displayName"` \| `"isOperator"`

##### ByFields

`ByFields` *extends* [`UserScalarFieldEnum`](../type-aliases/UserScalarFieldEnum.md)

##### ByValid

`ByValid` *extends* `0` \| `1`

##### HavingFields

`HavingFields` *extends* `string` \| `number` \| `symbol`

##### HavingValid

`HavingValid`

##### ByEmpty

`ByEmpty` *extends* `0` \| `1`

##### InputErrors

`InputErrors`

#### Parameters

##### args

\{ \[key in string \| number \| symbol\]: key extends keyof UserGroupByArgs\<DefaultArgs\> ? T\[key\<key\>\] : never \} & `OrderByArg` & `InputErrors`

Group by arguments.

#### Returns

`object` *extends* `InputErrors` ? [`GetUserGroupByPayload`](../type-aliases/GetUserGroupByPayload.md)\<`T`\> : [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`InputErrors`\>

#### Example

```ts
// Group by city, order by createdAt, get count
const result = await prisma.user.groupBy({
  by: ['city', 'createdAt'],
  orderBy: {
    createdAt: true
  },
  _count: {
    _all: true
  },
})
```

***

### update()

> **update**\<`T`\>(`args`): [`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:1527

Update one User.

#### Type Parameters

##### T

`T` *extends* [`UserUpdateArgs`](../type-aliases/UserUpdateArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserUpdateArgs`](../type-aliases/UserUpdateArgs.md)\<`ExtArgs`\>\>

Arguments to update one User.

#### Returns

[`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Update one User
const user = await prisma.user.update({
  where: {
    // ... provide filter here
  },
  data: {
    // ... provide data here
  }
})
```

***

### updateMany()

> **updateMany**\<`T`\>(`args`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:1560

Update zero or more Users.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`UserUpdateManyArgs`](../type-aliases/UserUpdateManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserUpdateManyArgs`](../type-aliases/UserUpdateManyArgs.md)\<`ExtArgs`\>\>

Arguments to update one or more rows.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

#### Example

```ts
// Update many Users
const user = await prisma.user.updateMany({
  where: {
    // ... provide filter here
  },
  data: {
    // ... provide data here
  }
})
```

***

### updateManyAndReturn()

> **updateManyAndReturn**\<`T`\>(`args`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

Defined in: backend/src/generated/prisma/index.d.ts:1590

Update zero or more Users and returns the data updated in the database.

#### Type Parameters

##### T

`T` *extends* [`UserUpdateManyAndReturnArgs`](../type-aliases/UserUpdateManyAndReturnArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserUpdateManyAndReturnArgs`](../type-aliases/UserUpdateManyAndReturnArgs.md)\<`ExtArgs`\>\>

Arguments to update many Users.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

#### Example

```ts
// Update many Users
const user = await prisma.user.updateManyAndReturn({
  where: {
    // ... provide filter here
  },
  data: [
    // ... provide data here
  ]
})

// Update zero or more Users and only return the `id`
const userWithIdOnly = await prisma.user.updateManyAndReturn({
  select: { id: true },
  where: {
    // ... provide filter here
  },
  data: [
    // ... provide data here
  ]
})
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined
```

***

### upsert()

> **upsert**\<`T`\>(`args`): [`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:1609

Create or update one User.

#### Type Parameters

##### T

`T` *extends* [`UserUpsertArgs`](../type-aliases/UserUpsertArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`UserUpsertArgs`](../type-aliases/UserUpsertArgs.md)\<`ExtArgs`\>\>

Arguments to update or create a User.

#### Returns

[`Prisma__UserClient`](Prisma__UserClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$UserPayload`](../type-aliases/$UserPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Update or create a User
const user = await prisma.user.upsert({
  create: {
    // ... data to create a User
  },
  update: {
    // ... in case it already exists, update
  },
  where: {
    // ... the filter for the User we want to update
  }
})
```
