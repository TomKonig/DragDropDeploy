[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [auth/jwt-auth.guard](../README.md) / JwtAuthGuard

# Class: JwtAuthGuard

Defined in: [backend/src/auth/jwt-auth.guard.ts:7](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/jwt-auth.guard.ts#L7)

## Extends

- `IAuthGuard`

## Constructors

### Constructor

> **new JwtAuthGuard**(`reflector`): `JwtAuthGuard`

Defined in: [backend/src/auth/jwt-auth.guard.ts:8](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/jwt-auth.guard.ts#L8)

#### Parameters

##### reflector

`Reflector`

#### Returns

`JwtAuthGuard`

#### Overrides

`AuthGuard('jwt').constructor`

## Properties

### arguments

> `static` **arguments**: `any`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:305

#### Inherited from

`AuthGuard('jwt').arguments`

***

### caller

> `static` **caller**: `Function`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:306

#### Inherited from

`AuthGuard('jwt').caller`

***

### length

> `readonly` `static` **length**: `number`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:302

#### Inherited from

`AuthGuard('jwt').length`

***

### name

> `readonly` `static` **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es2015.core.d.ts:97

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

`AuthGuard('jwt').name`

## Methods

### canActivate()

> **canActivate**(`context`): `boolean` \| `Promise`\<`boolean`\> \| `Observable`\<`boolean`\>

Defined in: [backend/src/auth/jwt-auth.guard.ts:12](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/jwt-auth.guard.ts#L12)

#### Parameters

##### context

`ExecutionContext`

Current execution context. Provides access to details about
the current request pipeline.

#### Returns

`boolean` \| `Promise`\<`boolean`\> \| `Observable`\<`boolean`\>

Value indicating whether or not the current request is allowed to
proceed.

#### Overrides

`AuthGuard('jwt').canActivate`

***

### getAuthenticateOptions()

> **getAuthenticateOptions**(`context`): `undefined` \| `IAuthModuleOptions`\<`any`\>

Defined in: node\_modules/@nestjs/passport/dist/auth.guard.d.ts:9

#### Parameters

##### context

`ExecutionContext`

#### Returns

`undefined` \| `IAuthModuleOptions`\<`any`\>

#### Inherited from

`AuthGuard('jwt').getAuthenticateOptions`

***

### getRequest()

> **getRequest**(`context`): `any`

Defined in: node\_modules/@nestjs/passport/dist/auth.guard.d.ts:10

#### Parameters

##### context

`ExecutionContext`

#### Returns

`any`

#### Inherited from

`AuthGuard('jwt').getRequest`

***

### handleRequest()

> **handleRequest**\<`TUser`\>(`err`, `user`, `info`, `context`, `status?`): `TUser`

Defined in: node\_modules/@nestjs/passport/dist/auth.guard.d.ts:8

#### Type Parameters

##### TUser

`TUser` = `any`

#### Parameters

##### err

`any`

##### user

`any`

##### info

`any`

##### context

`ExecutionContext`

##### status?

`any`

#### Returns

`TUser`

#### Inherited from

`AuthGuard('jwt').handleRequest`

***

### logIn()

> **logIn**\<`TRequest`\>(`request`): `Promise`\<`void`\>

Defined in: node\_modules/@nestjs/passport/dist/auth.guard.d.ts:5

#### Type Parameters

##### TRequest

`TRequest` *extends* `object` = `any`

#### Parameters

##### request

`TRequest`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`AuthGuard('jwt').logIn`

***

### \[hasInstance\]()

> `static` **\[hasInstance\]**(`value`): `boolean`

Defined in: node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

#### Parameters

##### value

`any`

#### Returns

`boolean`

#### Inherited from

`AuthGuard('jwt').[hasInstance]`

***

### apply()

> `static` **apply**(`this`, `thisArg`, `argArray?`): `any`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:281

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

#### Parameters

##### this

`Function`

##### thisArg

`any`

The object to be used as the this object.

##### argArray?

`any`

A set of arguments to be passed to the function.

#### Returns

`any`

#### Inherited from

`AuthGuard('jwt').apply`

***

### bind()

> `static` **bind**(`this`, `thisArg`, ...`argArray`): `any`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:296

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Parameters

##### this

`Function`

##### thisArg

`any`

An object to which the this keyword can refer inside the new function.

##### argArray

...`any`[]

A list of arguments to be passed to the new function.

#### Returns

`any`

#### Inherited from

`AuthGuard('jwt').bind`

***

### call()

> `static` **call**(`this`, `thisArg`, ...`argArray`): `any`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:288

Calls a method of an object, substituting another object for the current object.

#### Parameters

##### this

`Function`

##### thisArg

`any`

The object to be used as the current object.

##### argArray

...`any`[]

A list of arguments to be passed to the method.

#### Returns

`any`

#### Inherited from

`AuthGuard('jwt').call`

***

### toString()

> `static` **toString**(): `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:299

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

`AuthGuard('jwt').toString`
