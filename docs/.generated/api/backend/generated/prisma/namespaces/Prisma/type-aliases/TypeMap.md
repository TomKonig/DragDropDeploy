[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / TypeMap

# Type Alias: TypeMap\<ExtArgs, GlobalOmitOptions\>

> **TypeMap**\<`ExtArgs`, `GlobalOmitOptions`\> = `object` & `object`

Defined in: backend/src/generated/prisma/index.d.ts:655

## Type Declaration

### globalOmitOptions

> **globalOmitOptions**: `object`

#### globalOmitOptions.omit

> **omit**: `GlobalOmitOptions`

### meta

> **meta**: `object`

#### meta.modelProps

> **modelProps**: `"user"` \| `"project"` \| `"deployment"`

#### meta.txIsolationLevel

> **txIsolationLevel**: [`TransactionIsolationLevel`](TransactionIsolationLevel.md)

### model

> **model**: `object`

#### model.Deployment

> **Deployment**: `object`

#### model.Deployment.fields

> **fields**: [`DeploymentFieldRefs`](../interfaces/DeploymentFieldRefs.md)

#### model.Deployment.operations

> **operations**: `object`

#### model.Deployment.operations.aggregate

> **aggregate**: `object`

#### model.Deployment.operations.aggregate.args

> **args**: [`DeploymentAggregateArgs`](DeploymentAggregateArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.aggregate.result

> **result**: [`Optional`](../../../runtime/library/type-aliases/Optional.md)\<[`AggregateDeployment`](AggregateDeployment.md)\>

#### model.Deployment.operations.count

> **count**: `object`

#### model.Deployment.operations.count.args

> **args**: [`DeploymentCountArgs`](DeploymentCountArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.count.result

> **result**: [`Optional`](../../../runtime/library/type-aliases/Optional.md)\<[`DeploymentCountAggregateOutputType`](DeploymentCountAggregateOutputType.md)\> \| `number`

#### model.Deployment.operations.create

> **create**: `object`

#### model.Deployment.operations.create.args

> **args**: [`DeploymentCreateArgs`](DeploymentCreateArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.create.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$DeploymentPayload`]($DeploymentPayload.md)\>

#### model.Deployment.operations.createMany

> **createMany**: `object`

#### model.Deployment.operations.createMany.args

> **args**: [`DeploymentCreateManyArgs`](DeploymentCreateManyArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.createMany.result

> **result**: [`BatchPayload`](BatchPayload.md)

#### model.Deployment.operations.createManyAndReturn

> **createManyAndReturn**: `object`

#### model.Deployment.operations.createManyAndReturn.args

> **args**: [`DeploymentCreateManyAndReturnArgs`](DeploymentCreateManyAndReturnArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.createManyAndReturn.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$DeploymentPayload`]($DeploymentPayload.md)\>[]

#### model.Deployment.operations.delete

> **delete**: `object`

#### model.Deployment.operations.delete.args

> **args**: [`DeploymentDeleteArgs`](DeploymentDeleteArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.delete.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$DeploymentPayload`]($DeploymentPayload.md)\>

#### model.Deployment.operations.deleteMany

> **deleteMany**: `object`

#### model.Deployment.operations.deleteMany.args

> **args**: [`DeploymentDeleteManyArgs`](DeploymentDeleteManyArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.deleteMany.result

> **result**: [`BatchPayload`](BatchPayload.md)

#### model.Deployment.operations.findFirst

> **findFirst**: `object`

#### model.Deployment.operations.findFirst.args

> **args**: [`DeploymentFindFirstArgs`](DeploymentFindFirstArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.findFirst.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$DeploymentPayload`]($DeploymentPayload.md)\> \| `null`

#### model.Deployment.operations.findFirstOrThrow

> **findFirstOrThrow**: `object`

#### model.Deployment.operations.findFirstOrThrow.args

> **args**: [`DeploymentFindFirstOrThrowArgs`](DeploymentFindFirstOrThrowArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.findFirstOrThrow.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$DeploymentPayload`]($DeploymentPayload.md)\>

#### model.Deployment.operations.findMany

> **findMany**: `object`

#### model.Deployment.operations.findMany.args

> **args**: [`DeploymentFindManyArgs`](DeploymentFindManyArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.findMany.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$DeploymentPayload`]($DeploymentPayload.md)\>[]

#### model.Deployment.operations.findUnique

> **findUnique**: `object`

#### model.Deployment.operations.findUnique.args

> **args**: [`DeploymentFindUniqueArgs`](DeploymentFindUniqueArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.findUnique.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$DeploymentPayload`]($DeploymentPayload.md)\> \| `null`

#### model.Deployment.operations.findUniqueOrThrow

> **findUniqueOrThrow**: `object`

#### model.Deployment.operations.findUniqueOrThrow.args

> **args**: [`DeploymentFindUniqueOrThrowArgs`](DeploymentFindUniqueOrThrowArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.findUniqueOrThrow.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$DeploymentPayload`]($DeploymentPayload.md)\>

#### model.Deployment.operations.groupBy

> **groupBy**: `object`

#### model.Deployment.operations.groupBy.args

> **args**: [`DeploymentGroupByArgs`](DeploymentGroupByArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.groupBy.result

> **result**: [`Optional`](../../../runtime/library/type-aliases/Optional.md)\<[`DeploymentGroupByOutputType`](DeploymentGroupByOutputType.md)\>[]

#### model.Deployment.operations.update

> **update**: `object`

#### model.Deployment.operations.update.args

> **args**: [`DeploymentUpdateArgs`](DeploymentUpdateArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.update.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$DeploymentPayload`]($DeploymentPayload.md)\>

#### model.Deployment.operations.updateMany

> **updateMany**: `object`

#### model.Deployment.operations.updateMany.args

> **args**: [`DeploymentUpdateManyArgs`](DeploymentUpdateManyArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.updateMany.result

> **result**: [`BatchPayload`](BatchPayload.md)

#### model.Deployment.operations.updateManyAndReturn

> **updateManyAndReturn**: `object`

#### model.Deployment.operations.updateManyAndReturn.args

> **args**: [`DeploymentUpdateManyAndReturnArgs`](DeploymentUpdateManyAndReturnArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.updateManyAndReturn.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$DeploymentPayload`]($DeploymentPayload.md)\>[]

#### model.Deployment.operations.upsert

> **upsert**: `object`

#### model.Deployment.operations.upsert.args

> **args**: [`DeploymentUpsertArgs`](DeploymentUpsertArgs.md)\<`ExtArgs`\>

#### model.Deployment.operations.upsert.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$DeploymentPayload`]($DeploymentPayload.md)\>

#### model.Deployment.payload

> **payload**: [`$DeploymentPayload`]($DeploymentPayload.md)\<`ExtArgs`\>

#### model.Project

> **Project**: `object`

#### model.Project.fields

> **fields**: [`ProjectFieldRefs`](../interfaces/ProjectFieldRefs.md)

#### model.Project.operations

> **operations**: `object`

#### model.Project.operations.aggregate

> **aggregate**: `object`

#### model.Project.operations.aggregate.args

> **args**: [`ProjectAggregateArgs`](ProjectAggregateArgs.md)\<`ExtArgs`\>

#### model.Project.operations.aggregate.result

> **result**: [`Optional`](../../../runtime/library/type-aliases/Optional.md)\<[`AggregateProject`](AggregateProject.md)\>

#### model.Project.operations.count

> **count**: `object`

#### model.Project.operations.count.args

> **args**: [`ProjectCountArgs`](ProjectCountArgs.md)\<`ExtArgs`\>

#### model.Project.operations.count.result

> **result**: [`Optional`](../../../runtime/library/type-aliases/Optional.md)\<[`ProjectCountAggregateOutputType`](ProjectCountAggregateOutputType.md)\> \| `number`

#### model.Project.operations.create

> **create**: `object`

#### model.Project.operations.create.args

> **args**: [`ProjectCreateArgs`](ProjectCreateArgs.md)\<`ExtArgs`\>

#### model.Project.operations.create.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$ProjectPayload`]($ProjectPayload.md)\>

#### model.Project.operations.createMany

> **createMany**: `object`

#### model.Project.operations.createMany.args

> **args**: [`ProjectCreateManyArgs`](ProjectCreateManyArgs.md)\<`ExtArgs`\>

#### model.Project.operations.createMany.result

> **result**: [`BatchPayload`](BatchPayload.md)

#### model.Project.operations.createManyAndReturn

> **createManyAndReturn**: `object`

#### model.Project.operations.createManyAndReturn.args

> **args**: [`ProjectCreateManyAndReturnArgs`](ProjectCreateManyAndReturnArgs.md)\<`ExtArgs`\>

#### model.Project.operations.createManyAndReturn.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$ProjectPayload`]($ProjectPayload.md)\>[]

#### model.Project.operations.delete

> **delete**: `object`

#### model.Project.operations.delete.args

> **args**: [`ProjectDeleteArgs`](ProjectDeleteArgs.md)\<`ExtArgs`\>

#### model.Project.operations.delete.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$ProjectPayload`]($ProjectPayload.md)\>

#### model.Project.operations.deleteMany

> **deleteMany**: `object`

#### model.Project.operations.deleteMany.args

> **args**: [`ProjectDeleteManyArgs`](ProjectDeleteManyArgs.md)\<`ExtArgs`\>

#### model.Project.operations.deleteMany.result

> **result**: [`BatchPayload`](BatchPayload.md)

#### model.Project.operations.findFirst

> **findFirst**: `object`

#### model.Project.operations.findFirst.args

> **args**: [`ProjectFindFirstArgs`](ProjectFindFirstArgs.md)\<`ExtArgs`\>

#### model.Project.operations.findFirst.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$ProjectPayload`]($ProjectPayload.md)\> \| `null`

#### model.Project.operations.findFirstOrThrow

> **findFirstOrThrow**: `object`

#### model.Project.operations.findFirstOrThrow.args

> **args**: [`ProjectFindFirstOrThrowArgs`](ProjectFindFirstOrThrowArgs.md)\<`ExtArgs`\>

#### model.Project.operations.findFirstOrThrow.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$ProjectPayload`]($ProjectPayload.md)\>

#### model.Project.operations.findMany

> **findMany**: `object`

#### model.Project.operations.findMany.args

> **args**: [`ProjectFindManyArgs`](ProjectFindManyArgs.md)\<`ExtArgs`\>

#### model.Project.operations.findMany.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$ProjectPayload`]($ProjectPayload.md)\>[]

#### model.Project.operations.findUnique

> **findUnique**: `object`

#### model.Project.operations.findUnique.args

> **args**: [`ProjectFindUniqueArgs`](ProjectFindUniqueArgs.md)\<`ExtArgs`\>

#### model.Project.operations.findUnique.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$ProjectPayload`]($ProjectPayload.md)\> \| `null`

#### model.Project.operations.findUniqueOrThrow

> **findUniqueOrThrow**: `object`

#### model.Project.operations.findUniqueOrThrow.args

> **args**: [`ProjectFindUniqueOrThrowArgs`](ProjectFindUniqueOrThrowArgs.md)\<`ExtArgs`\>

#### model.Project.operations.findUniqueOrThrow.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$ProjectPayload`]($ProjectPayload.md)\>

#### model.Project.operations.groupBy

> **groupBy**: `object`

#### model.Project.operations.groupBy.args

> **args**: [`ProjectGroupByArgs`](ProjectGroupByArgs.md)\<`ExtArgs`\>

#### model.Project.operations.groupBy.result

> **result**: [`Optional`](../../../runtime/library/type-aliases/Optional.md)\<[`ProjectGroupByOutputType`](ProjectGroupByOutputType.md)\>[]

#### model.Project.operations.update

> **update**: `object`

#### model.Project.operations.update.args

> **args**: [`ProjectUpdateArgs`](ProjectUpdateArgs.md)\<`ExtArgs`\>

#### model.Project.operations.update.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$ProjectPayload`]($ProjectPayload.md)\>

#### model.Project.operations.updateMany

> **updateMany**: `object`

#### model.Project.operations.updateMany.args

> **args**: [`ProjectUpdateManyArgs`](ProjectUpdateManyArgs.md)\<`ExtArgs`\>

#### model.Project.operations.updateMany.result

> **result**: [`BatchPayload`](BatchPayload.md)

#### model.Project.operations.updateManyAndReturn

> **updateManyAndReturn**: `object`

#### model.Project.operations.updateManyAndReturn.args

> **args**: [`ProjectUpdateManyAndReturnArgs`](ProjectUpdateManyAndReturnArgs.md)\<`ExtArgs`\>

#### model.Project.operations.updateManyAndReturn.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$ProjectPayload`]($ProjectPayload.md)\>[]

#### model.Project.operations.upsert

> **upsert**: `object`

#### model.Project.operations.upsert.args

> **args**: [`ProjectUpsertArgs`](ProjectUpsertArgs.md)\<`ExtArgs`\>

#### model.Project.operations.upsert.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$ProjectPayload`]($ProjectPayload.md)\>

#### model.Project.payload

> **payload**: [`$ProjectPayload`]($ProjectPayload.md)\<`ExtArgs`\>

#### model.User

> **User**: `object`

#### model.User.fields

> **fields**: [`UserFieldRefs`](../interfaces/UserFieldRefs.md)

#### model.User.operations

> **operations**: `object`

#### model.User.operations.aggregate

> **aggregate**: `object`

#### model.User.operations.aggregate.args

> **args**: [`UserAggregateArgs`](UserAggregateArgs.md)\<`ExtArgs`\>

#### model.User.operations.aggregate.result

> **result**: [`Optional`](../../../runtime/library/type-aliases/Optional.md)\<[`AggregateUser`](AggregateUser.md)\>

#### model.User.operations.count

> **count**: `object`

#### model.User.operations.count.args

> **args**: [`UserCountArgs`](UserCountArgs.md)\<`ExtArgs`\>

#### model.User.operations.count.result

> **result**: [`Optional`](../../../runtime/library/type-aliases/Optional.md)\<[`UserCountAggregateOutputType`](UserCountAggregateOutputType.md)\> \| `number`

#### model.User.operations.create

> **create**: `object`

#### model.User.operations.create.args

> **args**: [`UserCreateArgs`](UserCreateArgs.md)\<`ExtArgs`\>

#### model.User.operations.create.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$UserPayload`]($UserPayload.md)\>

#### model.User.operations.createMany

> **createMany**: `object`

#### model.User.operations.createMany.args

> **args**: [`UserCreateManyArgs`](UserCreateManyArgs.md)\<`ExtArgs`\>

#### model.User.operations.createMany.result

> **result**: [`BatchPayload`](BatchPayload.md)

#### model.User.operations.createManyAndReturn

> **createManyAndReturn**: `object`

#### model.User.operations.createManyAndReturn.args

> **args**: [`UserCreateManyAndReturnArgs`](UserCreateManyAndReturnArgs.md)\<`ExtArgs`\>

#### model.User.operations.createManyAndReturn.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$UserPayload`]($UserPayload.md)\>[]

#### model.User.operations.delete

> **delete**: `object`

#### model.User.operations.delete.args

> **args**: [`UserDeleteArgs`](UserDeleteArgs.md)\<`ExtArgs`\>

#### model.User.operations.delete.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$UserPayload`]($UserPayload.md)\>

#### model.User.operations.deleteMany

> **deleteMany**: `object`

#### model.User.operations.deleteMany.args

> **args**: [`UserDeleteManyArgs`](UserDeleteManyArgs.md)\<`ExtArgs`\>

#### model.User.operations.deleteMany.result

> **result**: [`BatchPayload`](BatchPayload.md)

#### model.User.operations.findFirst

> **findFirst**: `object`

#### model.User.operations.findFirst.args

> **args**: [`UserFindFirstArgs`](UserFindFirstArgs.md)\<`ExtArgs`\>

#### model.User.operations.findFirst.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$UserPayload`]($UserPayload.md)\> \| `null`

#### model.User.operations.findFirstOrThrow

> **findFirstOrThrow**: `object`

#### model.User.operations.findFirstOrThrow.args

> **args**: [`UserFindFirstOrThrowArgs`](UserFindFirstOrThrowArgs.md)\<`ExtArgs`\>

#### model.User.operations.findFirstOrThrow.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$UserPayload`]($UserPayload.md)\>

#### model.User.operations.findMany

> **findMany**: `object`

#### model.User.operations.findMany.args

> **args**: [`UserFindManyArgs`](UserFindManyArgs.md)\<`ExtArgs`\>

#### model.User.operations.findMany.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$UserPayload`]($UserPayload.md)\>[]

#### model.User.operations.findUnique

> **findUnique**: `object`

#### model.User.operations.findUnique.args

> **args**: [`UserFindUniqueArgs`](UserFindUniqueArgs.md)\<`ExtArgs`\>

#### model.User.operations.findUnique.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$UserPayload`]($UserPayload.md)\> \| `null`

#### model.User.operations.findUniqueOrThrow

> **findUniqueOrThrow**: `object`

#### model.User.operations.findUniqueOrThrow.args

> **args**: [`UserFindUniqueOrThrowArgs`](UserFindUniqueOrThrowArgs.md)\<`ExtArgs`\>

#### model.User.operations.findUniqueOrThrow.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$UserPayload`]($UserPayload.md)\>

#### model.User.operations.groupBy

> **groupBy**: `object`

#### model.User.operations.groupBy.args

> **args**: [`UserGroupByArgs`](UserGroupByArgs.md)\<`ExtArgs`\>

#### model.User.operations.groupBy.result

> **result**: [`Optional`](../../../runtime/library/type-aliases/Optional.md)\<[`UserGroupByOutputType`](UserGroupByOutputType.md)\>[]

#### model.User.operations.update

> **update**: `object`

#### model.User.operations.update.args

> **args**: [`UserUpdateArgs`](UserUpdateArgs.md)\<`ExtArgs`\>

#### model.User.operations.update.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$UserPayload`]($UserPayload.md)\>

#### model.User.operations.updateMany

> **updateMany**: `object`

#### model.User.operations.updateMany.args

> **args**: [`UserUpdateManyArgs`](UserUpdateManyArgs.md)\<`ExtArgs`\>

#### model.User.operations.updateMany.result

> **result**: [`BatchPayload`](BatchPayload.md)

#### model.User.operations.updateManyAndReturn

> **updateManyAndReturn**: `object`

#### model.User.operations.updateManyAndReturn.args

> **args**: [`UserUpdateManyAndReturnArgs`](UserUpdateManyAndReturnArgs.md)\<`ExtArgs`\>

#### model.User.operations.updateManyAndReturn.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$UserPayload`]($UserPayload.md)\>[]

#### model.User.operations.upsert

> **upsert**: `object`

#### model.User.operations.upsert.args

> **args**: [`UserUpsertArgs`](UserUpsertArgs.md)\<`ExtArgs`\>

#### model.User.operations.upsert.result

> **result**: [`PayloadToResult`](../../../runtime/library/type-aliases/PayloadToResult.md)\<[`$UserPayload`]($UserPayload.md)\>

#### model.User.payload

> **payload**: [`$UserPayload`]($UserPayload.md)\<`ExtArgs`\>

## Type Declaration

### other

> **other**: `object`

#### other.operations

> **operations**: `object`

#### other.operations.$executeRaw

> **$executeRaw**: `object`

#### other.operations.$executeRaw.args

> **args**: \[`TemplateStringsArray` \| [`Sql`](../../../runtime/library/classes/Sql.md), `any`[]\]

#### other.operations.$executeRaw.result

> **result**: `any`

#### other.operations.$executeRawUnsafe

> **$executeRawUnsafe**: `object`

#### other.operations.$executeRawUnsafe.args

> **args**: \[`string`, `any`[]\]

#### other.operations.$executeRawUnsafe.result

> **result**: `any`

#### other.operations.$queryRaw

> **$queryRaw**: `object`

#### other.operations.$queryRaw.args

> **args**: \[`TemplateStringsArray` \| [`Sql`](../../../runtime/library/classes/Sql.md), `any`[]\]

#### other.operations.$queryRaw.result

> **result**: `any`

#### other.operations.$queryRawUnsafe

> **$queryRawUnsafe**: `object`

#### other.operations.$queryRawUnsafe.args

> **args**: \[`string`, `any`[]\]

#### other.operations.$queryRawUnsafe.result

> **result**: `any`

#### other.payload

> **payload**: `any`

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

### GlobalOmitOptions

`GlobalOmitOptions` = \{ \}
