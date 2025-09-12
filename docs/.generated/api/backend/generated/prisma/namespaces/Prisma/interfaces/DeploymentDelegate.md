[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentDelegate

# Interface: DeploymentDelegate\<ExtArgs, GlobalOmitOptions\>

Defined in: backend/src/generated/prisma/index.d.ts:3599

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

### GlobalOmitOptions

`GlobalOmitOptions` = \{ \}

## Indexable

\[`K`: `symbol`\]: `object`

## Properties

### fields

> `readonly` **fields**: [`DeploymentFieldRefs`](DeploymentFieldRefs.md)

Defined in: backend/src/generated/prisma/index.d.ts:3971

Fields of the Deployment model

## Methods

### aggregate()

> **aggregate**\<`T`\>(`args`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetDeploymentAggregateType`](../type-aliases/GetDeploymentAggregateType.md)\<`T`\>\>

Defined in: backend/src/generated/prisma/index.d.ts:3890

Allows you to perform aggregations operations on a Deployment.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`DeploymentAggregateArgs`](../type-aliases/DeploymentAggregateArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`Subset`](../type-aliases/Subset.md)\<`T`, [`DeploymentAggregateArgs`](../type-aliases/DeploymentAggregateArgs.md)\>

Select which aggregations you would like to apply and on what fields.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetDeploymentAggregateType`](../type-aliases/GetDeploymentAggregateType.md)\<`T`\>\>

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

> **count**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`T` *extends* [`Record`](../../../runtime/library/type-aliases/Record.md)\<`"select"`, `any`\> ? `T`\<`T`\>\[`"select"`\] *extends* `true` ? `number` : \{ \[P in string \| number \| symbol\]: P extends keyof DeploymentCountAggregateOutputType ? DeploymentCountAggregateOutputType\[P\<P\>\] : never \} : `number`\>

Defined in: backend/src/generated/prisma/index.d.ts:3856

Count the number of Deployments.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`DeploymentCountArgs`](../type-aliases/DeploymentCountArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`Subset`](../type-aliases/Subset.md)\<`T`, [`DeploymentCountArgs`](../type-aliases/DeploymentCountArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>\>

Arguments to filter Deployments to count.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`T` *extends* [`Record`](../../../runtime/library/type-aliases/Record.md)\<`"select"`, `any`\> ? `T`\<`T`\>\[`"select"`\] *extends* `true` ? `number` : \{ \[P in string \| number \| symbol\]: P extends keyof DeploymentCountAggregateOutputType ? DeploymentCountAggregateOutputType\[P\<P\>\] : never \} : `number`\>

#### Example

```ts
// Count the number of Deployments
const count = await prisma.deployment.count({
  where: {
    // ... the filter for the Deployments we want to count
  }
})
```

***

### create()

> **create**\<`T`\>(`args`): [`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:3689

Create a Deployment.

#### Type Parameters

##### T

`T` *extends* [`DeploymentCreateArgs`](../type-aliases/DeploymentCreateArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentCreateArgs`](../type-aliases/DeploymentCreateArgs.md)\<`ExtArgs`\>\>

Arguments to create a Deployment.

#### Returns

[`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Create one Deployment
const Deployment = await prisma.deployment.create({
  data: {
    // ... data to create a Deployment
  }
})
```

***

### createMany()

> **createMany**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:3703

Create many Deployments.

#### Type Parameters

##### T

`T` *extends* [`DeploymentCreateManyArgs`](../type-aliases/DeploymentCreateManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentCreateManyArgs`](../type-aliases/DeploymentCreateManyArgs.md)\<`ExtArgs`\>\>

Arguments to create many Deployments.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

#### Example

```ts
// Create many Deployments
const deployment = await prisma.deployment.createMany({
  data: [
    // ... provide data here
  ]
})
```

***

### createManyAndReturn()

> **createManyAndReturn**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

Defined in: backend/src/generated/prisma/index.d.ts:3727

Create many Deployments and returns the data saved in the database.

#### Type Parameters

##### T

`T` *extends* [`DeploymentCreateManyAndReturnArgs`](../type-aliases/DeploymentCreateManyAndReturnArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentCreateManyAndReturnArgs`](../type-aliases/DeploymentCreateManyAndReturnArgs.md)\<`ExtArgs`\>\>

Arguments to create many Deployments.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

#### Example

```ts
// Create many Deployments
const deployment = await prisma.deployment.createManyAndReturn({
  data: [
    // ... provide data here
  ]
})

// Create many Deployments and only return the `id`
const deploymentWithIdOnly = await prisma.deployment.createManyAndReturn({
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

> **delete**\<`T`\>(`args`): [`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:3741

Delete a Deployment.

#### Type Parameters

##### T

`T` *extends* [`DeploymentDeleteArgs`](../type-aliases/DeploymentDeleteArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentDeleteArgs`](../type-aliases/DeploymentDeleteArgs.md)\<`ExtArgs`\>\>

Arguments to delete one Deployment.

#### Returns

[`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Delete one Deployment
const Deployment = await prisma.deployment.delete({
  where: {
    // ... filter to delete one Deployment
  }
})
```

***

### deleteMany()

> **deleteMany**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:3772

Delete zero or more Deployments.

#### Type Parameters

##### T

`T` *extends* [`DeploymentDeleteManyArgs`](../type-aliases/DeploymentDeleteManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentDeleteManyArgs`](../type-aliases/DeploymentDeleteManyArgs.md)\<`ExtArgs`\>\>

Arguments to filter Deployments to delete.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

#### Example

```ts
// Delete a few Deployments
const { count } = await prisma.deployment.deleteMany({
  where: {
    // ... provide filter here
  }
})
```

***

### findFirst()

> **findFirst**\<`T`\>(`args?`): [`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:3641

Find the first Deployment that matches the filter.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`DeploymentFindFirstArgs`](../type-aliases/DeploymentFindFirstArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentFindFirstArgs`](../type-aliases/DeploymentFindFirstArgs.md)\<`ExtArgs`\>\>

Arguments to find a Deployment

#### Returns

[`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one Deployment
const deployment = await prisma.deployment.findFirst({
  where: {
    // ... provide filter here
  }
})
```

***

### findFirstOrThrow()

> **findFirstOrThrow**\<`T`\>(`args?`): [`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:3657

Find the first Deployment that matches the filter or
throw `PrismaKnownClientError` with `P2025` code if no matches were found.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`DeploymentFindFirstOrThrowArgs`](../type-aliases/DeploymentFindFirstOrThrowArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentFindFirstOrThrowArgs`](../type-aliases/DeploymentFindFirstOrThrowArgs.md)\<`ExtArgs`\>\>

Arguments to find a Deployment

#### Returns

[`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one Deployment
const deployment = await prisma.deployment.findFirstOrThrow({
  where: {
    // ... provide filter here
  }
})
```

***

### findMany()

> **findMany**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

Defined in: backend/src/generated/prisma/index.d.ts:3675

Find zero or more Deployments that matches the filter.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`DeploymentFindManyArgs`](../type-aliases/DeploymentFindManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentFindManyArgs`](../type-aliases/DeploymentFindManyArgs.md)\<`ExtArgs`\>\>

Arguments to filter and select certain fields only.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

#### Example

```ts
// Get all Deployments
const deployments = await prisma.deployment.findMany()

// Get first 10 Deployments
const deployments = await prisma.deployment.findMany({ take: 10 })

// Only select the `id`
const deploymentWithIdOnly = await prisma.deployment.findMany({ select: { id: true } })
```

***

### findUnique()

> **findUnique**\<`T`\>(`args`): [`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:3612

Find zero or one Deployment that matches the filter.

#### Type Parameters

##### T

`T` *extends* [`DeploymentFindUniqueArgs`](../type-aliases/DeploymentFindUniqueArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentFindUniqueArgs`](../type-aliases/DeploymentFindUniqueArgs.md)\<`ExtArgs`\>\>

Arguments to find a Deployment

#### Returns

[`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one Deployment
const deployment = await prisma.deployment.findUnique({
  where: {
    // ... provide filter here
  }
})
```

***

### findUniqueOrThrow()

> **findUniqueOrThrow**\<`T`\>(`args`): [`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:3626

Find one Deployment that matches the filter or throw an error with `error.code='P2025'`
if no matches were found.

#### Type Parameters

##### T

`T` *extends* [`DeploymentFindUniqueOrThrowArgs`](../type-aliases/DeploymentFindUniqueOrThrowArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentFindUniqueOrThrowArgs`](../type-aliases/DeploymentFindUniqueOrThrowArgs.md)\<`ExtArgs`\>\>

Arguments to find a Deployment

#### Returns

[`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one Deployment
const deployment = await prisma.deployment.findUniqueOrThrow({
  where: {
    // ... provide filter here
  }
})
```

***

### groupBy()

> **groupBy**\<`T`, `HasSelectOrTake`, `OrderByArg`, `OrderFields`, `ByFields`, `ByValid`, `HavingFields`, `HavingValid`, `ByEmpty`, `InputErrors`\>(`args`): `object` *extends* `InputErrors` ? [`GetDeploymentGroupByPayload`](../type-aliases/GetDeploymentGroupByPayload.md)\<`T`\> : [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`InputErrors`\>

Defined in: backend/src/generated/prisma/index.d.ts:3910

Group by Deployment.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`DeploymentGroupByArgs`](../type-aliases/DeploymentGroupByArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

##### HasSelectOrTake

`HasSelectOrTake` *extends* `0` \| `1`

##### OrderByArg

`OrderByArg` *extends* \{ `orderBy`: `undefined` \| [`DeploymentOrderByWithAggregationInput`](../type-aliases/DeploymentOrderByWithAggregationInput.md) \| [`DeploymentOrderByWithAggregationInput`](../type-aliases/DeploymentOrderByWithAggregationInput.md)[]; \} \| \{ `orderBy?`: [`DeploymentOrderByWithAggregationInput`](../type-aliases/DeploymentOrderByWithAggregationInput.md) \| [`DeploymentOrderByWithAggregationInput`](../type-aliases/DeploymentOrderByWithAggregationInput.md)[]; \}

##### OrderFields

`OrderFields` *extends* `"id"` \| `"createdAt"` \| `"projectId"` \| `"status"` \| `"userId"` \| `"commitHash"` \| `"imageTag"` \| `"buildLogsUrl"`

##### ByFields

`ByFields` *extends* [`DeploymentScalarFieldEnum`](../type-aliases/DeploymentScalarFieldEnum.md)

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

\{ \[key in string \| number \| symbol\]: key extends keyof DeploymentGroupByArgs\<DefaultArgs\> ? T\[key\<key\>\] : never \} & `OrderByArg` & `InputErrors`

Group by arguments.

#### Returns

`object` *extends* `InputErrors` ? [`GetDeploymentGroupByPayload`](../type-aliases/GetDeploymentGroupByPayload.md)\<`T`\> : [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`InputErrors`\>

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

> **update**\<`T`\>(`args`): [`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:3758

Update one Deployment.

#### Type Parameters

##### T

`T` *extends* [`DeploymentUpdateArgs`](../type-aliases/DeploymentUpdateArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentUpdateArgs`](../type-aliases/DeploymentUpdateArgs.md)\<`ExtArgs`\>\>

Arguments to update one Deployment.

#### Returns

[`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Update one Deployment
const deployment = await prisma.deployment.update({
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

Defined in: backend/src/generated/prisma/index.d.ts:3791

Update zero or more Deployments.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`DeploymentUpdateManyArgs`](../type-aliases/DeploymentUpdateManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentUpdateManyArgs`](../type-aliases/DeploymentUpdateManyArgs.md)\<`ExtArgs`\>\>

Arguments to update one or more rows.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

#### Example

```ts
// Update many Deployments
const deployment = await prisma.deployment.updateMany({
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

> **updateManyAndReturn**\<`T`\>(`args`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

Defined in: backend/src/generated/prisma/index.d.ts:3821

Update zero or more Deployments and returns the data updated in the database.

#### Type Parameters

##### T

`T` *extends* [`DeploymentUpdateManyAndReturnArgs`](../type-aliases/DeploymentUpdateManyAndReturnArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentUpdateManyAndReturnArgs`](../type-aliases/DeploymentUpdateManyAndReturnArgs.md)\<`ExtArgs`\>\>

Arguments to update many Deployments.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

#### Example

```ts
// Update many Deployments
const deployment = await prisma.deployment.updateManyAndReturn({
  where: {
    // ... provide filter here
  },
  data: [
    // ... provide data here
  ]
})

// Update zero or more Deployments and only return the `id`
const deploymentWithIdOnly = await prisma.deployment.updateManyAndReturn({
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

> **upsert**\<`T`\>(`args`): [`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:3840

Create or update one Deployment.

#### Type Parameters

##### T

`T` *extends* [`DeploymentUpsertArgs`](../type-aliases/DeploymentUpsertArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`DeploymentUpsertArgs`](../type-aliases/DeploymentUpsertArgs.md)\<`ExtArgs`\>\>

Arguments to update or create a Deployment.

#### Returns

[`Prisma__DeploymentClient`](Prisma__DeploymentClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$DeploymentPayload`](../type-aliases/$DeploymentPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Update or create a Deployment
const deployment = await prisma.deployment.upsert({
  create: {
    // ... data to create a Deployment
  },
  update: {
    // ... in case it already exists, update
  },
  where: {
    // ... the filter for the Deployment we want to update
  }
})
```
