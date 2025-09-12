[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / ProjectDelegate

# Interface: ProjectDelegate\<ExtArgs, GlobalOmitOptions\>

Defined in: backend/src/generated/prisma/index.d.ts:2473

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

### GlobalOmitOptions

`GlobalOmitOptions` = \{ \}

## Indexable

\[`K`: `symbol`\]: `object`

## Properties

### fields

> `readonly` **fields**: [`ProjectFieldRefs`](ProjectFieldRefs.md)

Defined in: backend/src/generated/prisma/index.d.ts:2845

Fields of the Project model

## Methods

### aggregate()

> **aggregate**\<`T`\>(`args`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetProjectAggregateType`](../type-aliases/GetProjectAggregateType.md)\<`T`\>\>

Defined in: backend/src/generated/prisma/index.d.ts:2764

Allows you to perform aggregations operations on a Project.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`ProjectAggregateArgs`](../type-aliases/ProjectAggregateArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`Subset`](../type-aliases/Subset.md)\<`T`, [`ProjectAggregateArgs`](../type-aliases/ProjectAggregateArgs.md)\>

Select which aggregations you would like to apply and on what fields.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetProjectAggregateType`](../type-aliases/GetProjectAggregateType.md)\<`T`\>\>

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

> **count**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`T` *extends* [`Record`](../../../runtime/library/type-aliases/Record.md)\<`"select"`, `any`\> ? `T`\<`T`\>\[`"select"`\] *extends* `true` ? `number` : \{ \[P in string \| number \| symbol\]: P extends keyof ProjectCountAggregateOutputType ? ProjectCountAggregateOutputType\[P\<P\>\] : never \} : `number`\>

Defined in: backend/src/generated/prisma/index.d.ts:2730

Count the number of Projects.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`ProjectCountArgs`](../type-aliases/ProjectCountArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`Subset`](../type-aliases/Subset.md)\<`T`, [`ProjectCountArgs`](../type-aliases/ProjectCountArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>\>

Arguments to filter Projects to count.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`T` *extends* [`Record`](../../../runtime/library/type-aliases/Record.md)\<`"select"`, `any`\> ? `T`\<`T`\>\[`"select"`\] *extends* `true` ? `number` : \{ \[P in string \| number \| symbol\]: P extends keyof ProjectCountAggregateOutputType ? ProjectCountAggregateOutputType\[P\<P\>\] : never \} : `number`\>

#### Example

```ts
// Count the number of Projects
const count = await prisma.project.count({
  where: {
    // ... the filter for the Projects we want to count
  }
})
```

***

### create()

> **create**\<`T`\>(`args`): [`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:2563

Create a Project.

#### Type Parameters

##### T

`T` *extends* [`ProjectCreateArgs`](../type-aliases/ProjectCreateArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectCreateArgs`](../type-aliases/ProjectCreateArgs.md)\<`ExtArgs`\>\>

Arguments to create a Project.

#### Returns

[`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Create one Project
const Project = await prisma.project.create({
  data: {
    // ... data to create a Project
  }
})
```

***

### createMany()

> **createMany**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:2577

Create many Projects.

#### Type Parameters

##### T

`T` *extends* [`ProjectCreateManyArgs`](../type-aliases/ProjectCreateManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectCreateManyArgs`](../type-aliases/ProjectCreateManyArgs.md)\<`ExtArgs`\>\>

Arguments to create many Projects.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

#### Example

```ts
// Create many Projects
const project = await prisma.project.createMany({
  data: [
    // ... provide data here
  ]
})
```

***

### createManyAndReturn()

> **createManyAndReturn**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

Defined in: backend/src/generated/prisma/index.d.ts:2601

Create many Projects and returns the data saved in the database.

#### Type Parameters

##### T

`T` *extends* [`ProjectCreateManyAndReturnArgs`](../type-aliases/ProjectCreateManyAndReturnArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectCreateManyAndReturnArgs`](../type-aliases/ProjectCreateManyAndReturnArgs.md)\<`ExtArgs`\>\>

Arguments to create many Projects.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

#### Example

```ts
// Create many Projects
const project = await prisma.project.createManyAndReturn({
  data: [
    // ... provide data here
  ]
})

// Create many Projects and only return the `id`
const projectWithIdOnly = await prisma.project.createManyAndReturn({
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

> **delete**\<`T`\>(`args`): [`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:2615

Delete a Project.

#### Type Parameters

##### T

`T` *extends* [`ProjectDeleteArgs`](../type-aliases/ProjectDeleteArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectDeleteArgs`](../type-aliases/ProjectDeleteArgs.md)\<`ExtArgs`\>\>

Arguments to delete one Project.

#### Returns

[`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Delete one Project
const Project = await prisma.project.delete({
  where: {
    // ... filter to delete one Project
  }
})
```

***

### deleteMany()

> **deleteMany**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:2646

Delete zero or more Projects.

#### Type Parameters

##### T

`T` *extends* [`ProjectDeleteManyArgs`](../type-aliases/ProjectDeleteManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectDeleteManyArgs`](../type-aliases/ProjectDeleteManyArgs.md)\<`ExtArgs`\>\>

Arguments to filter Projects to delete.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

#### Example

```ts
// Delete a few Projects
const { count } = await prisma.project.deleteMany({
  where: {
    // ... provide filter here
  }
})
```

***

### findFirst()

> **findFirst**\<`T`\>(`args?`): [`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:2515

Find the first Project that matches the filter.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`ProjectFindFirstArgs`](../type-aliases/ProjectFindFirstArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectFindFirstArgs`](../type-aliases/ProjectFindFirstArgs.md)\<`ExtArgs`\>\>

Arguments to find a Project

#### Returns

[`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one Project
const project = await prisma.project.findFirst({
  where: {
    // ... provide filter here
  }
})
```

***

### findFirstOrThrow()

> **findFirstOrThrow**\<`T`\>(`args?`): [`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:2531

Find the first Project that matches the filter or
throw `PrismaKnownClientError` with `P2025` code if no matches were found.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`ProjectFindFirstOrThrowArgs`](../type-aliases/ProjectFindFirstOrThrowArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectFindFirstOrThrowArgs`](../type-aliases/ProjectFindFirstOrThrowArgs.md)\<`ExtArgs`\>\>

Arguments to find a Project

#### Returns

[`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one Project
const project = await prisma.project.findFirstOrThrow({
  where: {
    // ... provide filter here
  }
})
```

***

### findMany()

> **findMany**\<`T`\>(`args?`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

Defined in: backend/src/generated/prisma/index.d.ts:2549

Find zero or more Projects that matches the filter.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`ProjectFindManyArgs`](../type-aliases/ProjectFindManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args?

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectFindManyArgs`](../type-aliases/ProjectFindManyArgs.md)\<`ExtArgs`\>\>

Arguments to filter and select certain fields only.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

#### Example

```ts
// Get all Projects
const projects = await prisma.project.findMany()

// Get first 10 Projects
const projects = await prisma.project.findMany({ take: 10 })

// Only select the `id`
const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
```

***

### findUnique()

> **findUnique**\<`T`\>(`args`): [`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:2486

Find zero or one Project that matches the filter.

#### Type Parameters

##### T

`T` *extends* [`ProjectFindUniqueArgs`](../type-aliases/ProjectFindUniqueArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectFindUniqueArgs`](../type-aliases/ProjectFindUniqueArgs.md)\<`ExtArgs`\>\>

Arguments to find a Project

#### Returns

[`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<`null` \| [`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `null`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one Project
const project = await prisma.project.findUnique({
  where: {
    // ... provide filter here
  }
})
```

***

### findUniqueOrThrow()

> **findUniqueOrThrow**\<`T`\>(`args`): [`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:2500

Find one Project that matches the filter or throw an error with `error.code='P2025'`
if no matches were found.

#### Type Parameters

##### T

`T` *extends* [`ProjectFindUniqueOrThrowArgs`](../type-aliases/ProjectFindUniqueOrThrowArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectFindUniqueOrThrowArgs`](../type-aliases/ProjectFindUniqueOrThrowArgs.md)\<`ExtArgs`\>\>

Arguments to find a Project

#### Returns

[`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Get one Project
const project = await prisma.project.findUniqueOrThrow({
  where: {
    // ... provide filter here
  }
})
```

***

### groupBy()

> **groupBy**\<`T`, `HasSelectOrTake`, `OrderByArg`, `OrderFields`, `ByFields`, `ByValid`, `HavingFields`, `HavingValid`, `ByEmpty`, `InputErrors`\>(`args`): `object` *extends* `InputErrors` ? [`GetProjectGroupByPayload`](../type-aliases/GetProjectGroupByPayload.md)\<`T`\> : [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`InputErrors`\>

Defined in: backend/src/generated/prisma/index.d.ts:2784

Group by Project.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`ProjectGroupByArgs`](../type-aliases/ProjectGroupByArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

##### HasSelectOrTake

`HasSelectOrTake` *extends* `0` \| `1`

##### OrderByArg

`OrderByArg` *extends* \{ `orderBy`: `undefined` \| [`ProjectOrderByWithAggregationInput`](../type-aliases/ProjectOrderByWithAggregationInput.md) \| [`ProjectOrderByWithAggregationInput`](../type-aliases/ProjectOrderByWithAggregationInput.md)[]; \} \| \{ `orderBy?`: [`ProjectOrderByWithAggregationInput`](../type-aliases/ProjectOrderByWithAggregationInput.md) \| [`ProjectOrderByWithAggregationInput`](../type-aliases/ProjectOrderByWithAggregationInput.md)[]; \}

##### OrderFields

`OrderFields` *extends* `"id"` \| `"createdAt"` \| `"updatedAt"` \| `"name"` \| `"ownerId"`

##### ByFields

`ByFields` *extends* [`ProjectScalarFieldEnum`](../type-aliases/ProjectScalarFieldEnum.md)

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

\{ \[key in string \| number \| symbol\]: key extends keyof ProjectGroupByArgs\<DefaultArgs\> ? T\[key\<key\>\] : never \} & `OrderByArg` & `InputErrors`

Group by arguments.

#### Returns

`object` *extends* `InputErrors` ? [`GetProjectGroupByPayload`](../type-aliases/GetProjectGroupByPayload.md)\<`T`\> : [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<`InputErrors`\>

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

> **update**\<`T`\>(`args`): [`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:2632

Update one Project.

#### Type Parameters

##### T

`T` *extends* [`ProjectUpdateArgs`](../type-aliases/ProjectUpdateArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectUpdateArgs`](../type-aliases/ProjectUpdateArgs.md)\<`ExtArgs`\>\>

Arguments to update one Project.

#### Returns

[`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Update one Project
const project = await prisma.project.update({
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

Defined in: backend/src/generated/prisma/index.d.ts:2665

Update zero or more Projects.
Note, that providing `undefined` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined

#### Type Parameters

##### T

`T` *extends* [`ProjectUpdateManyArgs`](../type-aliases/ProjectUpdateManyArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectUpdateManyArgs`](../type-aliases/ProjectUpdateManyArgs.md)\<`ExtArgs`\>\>

Arguments to update one or more rows.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`BatchPayload`](../type-aliases/BatchPayload.md)\>

#### Example

```ts
// Update many Projects
const project = await prisma.project.updateMany({
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

> **updateManyAndReturn**\<`T`\>(`args`): [`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

Defined in: backend/src/generated/prisma/index.d.ts:2695

Update zero or more Projects and returns the data updated in the database.

#### Type Parameters

##### T

`T` *extends* [`ProjectUpdateManyAndReturnArgs`](../type-aliases/ProjectUpdateManyAndReturnArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectUpdateManyAndReturnArgs`](../type-aliases/ProjectUpdateManyAndReturnArgs.md)\<`ExtArgs`\>\>

Arguments to update many Projects.

#### Returns

[`PrismaPromise`](../type-aliases/PrismaPromise.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>[]\>

#### Example

```ts
// Update many Projects
const project = await prisma.project.updateManyAndReturn({
  where: {
    // ... provide filter here
  },
  data: [
    // ... provide data here
  ]
})

// Update zero or more Projects and only return the `id`
const projectWithIdOnly = await prisma.project.updateManyAndReturn({
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

> **upsert**\<`T`\>(`args`): [`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:2714

Create or update one Project.

#### Type Parameters

##### T

`T` *extends* [`ProjectUpsertArgs`](../type-aliases/ProjectUpsertArgs.md)\<[`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)\>

#### Parameters

##### args

[`SelectSubset`](../type-aliases/SelectSubset.md)\<`T`, [`ProjectUpsertArgs`](../type-aliases/ProjectUpsertArgs.md)\<`ExtArgs`\>\>

Arguments to update or create a Project.

#### Returns

[`Prisma__ProjectClient`](Prisma__ProjectClient.md)\<[`GetFindResult`](../../../runtime/library/type-aliases/GetFindResult.md)\<[`$ProjectPayload`](../type-aliases/$ProjectPayload.md)\<`ExtArgs`\>, `T`, `GlobalOmitOptions`\>, `never`, `ExtArgs`, `GlobalOmitOptions`\>

#### Example

```ts
// Update or create a Project
const project = await prisma.project.upsert({
  create: {
    // ... data to create a Project
  },
  update: {
    // ... in case it already exists, update
  },
  where: {
    // ... the filter for the Project we want to update
  }
})
```
