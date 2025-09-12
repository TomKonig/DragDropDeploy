[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / Decimal

# Class: Decimal

Defined in: backend/src/generated/prisma/runtime/library.d.ts:425

## Constructors

### Constructor

> **new Decimal**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:453

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

## Properties

### d

> `readonly` **d**: `number`[]

Defined in: backend/src/generated/prisma/runtime/library.d.ts:449

***

### e

> `readonly` **e**: `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:450

***

### s

> `readonly` **s**: `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:451

***

### crypto

> `readonly` `static` **crypto**: `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:679

***

### Decimal?

> `readonly` `static` `optional` **Decimal**: *typeof* [`Decimal`](../namespaces/Decimal/README.md)

Defined in: backend/src/generated/prisma/runtime/library.d.ts:671

***

### default?

> `readonly` `static` `optional` **default**: *typeof* [`Decimal`](../namespaces/Decimal/README.md)

Defined in: backend/src/generated/prisma/runtime/library.d.ts:670

***

### EUCLID

> `readonly` `static` **EUCLID**: `9`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:691

***

### maxE

> `readonly` `static` **maxE**: `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:678

***

### minE

> `readonly` `static` **minE**: `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:677

***

### modulo

> `readonly` `static` **modulo**: [`Modulo`](../namespaces/Decimal/type-aliases/Modulo.md)

Defined in: backend/src/generated/prisma/runtime/library.d.ts:680

***

### precision

> `readonly` `static` **precision**: `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:673

***

### ROUND\_CEIL

> `readonly` `static` **ROUND\_CEIL**: `2`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:684

***

### ROUND\_DOWN

> `readonly` `static` **ROUND\_DOWN**: `1`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:683

***

### ROUND\_FLOOR

> `readonly` `static` **ROUND\_FLOOR**: `3`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:685

***

### ROUND\_HALF\_CEIL

> `readonly` `static` **ROUND\_HALF\_CEIL**: `7`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:689

***

### ROUND\_HALF\_DOWN

> `readonly` `static` **ROUND\_HALF\_DOWN**: `5`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:687

***

### ROUND\_HALF\_EVEN

> `readonly` `static` **ROUND\_HALF\_EVEN**: `6`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:688

***

### ROUND\_HALF\_FLOOR

> `readonly` `static` **ROUND\_HALF\_FLOOR**: `8`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:690

***

### ROUND\_HALF\_UP

> `readonly` `static` **ROUND\_HALF\_UP**: `4`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:686

***

### ROUND\_UP

> `readonly` `static` **ROUND\_UP**: `0`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:682

***

### rounding

> `readonly` `static` **rounding**: [`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

Defined in: backend/src/generated/prisma/runtime/library.d.ts:674

***

### toExpNeg

> `readonly` `static` **toExpNeg**: `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:675

***

### toExpPos

> `readonly` `static` **toExpPos**: `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:676

## Methods

### abs()

> **abs**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:456

#### Returns

`Decimal`

***

### absoluteValue()

> **absoluteValue**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:455

#### Returns

`Decimal`

***

### acos()

> **acos**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:502

#### Returns

`Decimal`

***

### acosh()

> **acosh**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:505

#### Returns

`Decimal`

***

### add()

> **add**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:559

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### asin()

> **asin**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:514

#### Returns

`Decimal`

***

### asinh()

> **asinh**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:508

#### Returns

`Decimal`

***

### atan()

> **atan**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:517

#### Returns

`Decimal`

***

### atanh()

> **atanh**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:511

#### Returns

`Decimal`

***

### cbrt()

> **cbrt**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:470

#### Returns

`Decimal`

***

### ceil()

> **ceil**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:458

#### Returns

`Decimal`

***

### clamp()

> **clamp**(`min`, `max`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:461

#### Parameters

##### min

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### max

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### clampedTo()

> **clampedTo**(`min`, `max`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:460

#### Parameters

##### min

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### max

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### cmp()

> **cmp**(`n`): `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:464

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`number`

***

### comparedTo()

> **comparedTo**(`n`): `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:463

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`number`

***

### cos()

> **cos**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:467

#### Returns

`Decimal`

***

### cosh()

> **cosh**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:493

#### Returns

`Decimal`

***

### cosine()

> **cosine**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:466

#### Returns

`Decimal`

***

### cubeRoot()

> **cubeRoot**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:469

#### Returns

`Decimal`

***

### decimalPlaces()

> **decimalPlaces**(): `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:472

#### Returns

`number`

***

### div()

> **div**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:476

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### dividedBy()

> **dividedBy**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:475

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### dividedToIntegerBy()

> **dividedToIntegerBy**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:478

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### divToInt()

> **divToInt**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:479

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### dp()

> **dp**(): `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:473

#### Returns

`number`

***

### eq()

> **eq**(`n`): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:482

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`boolean`

***

### equals()

> **equals**(`n`): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:481

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`boolean`

***

### exp()

> **exp**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:550

#### Returns

`Decimal`

***

### floor()

> **floor**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:484

#### Returns

`Decimal`

***

### greaterThan()

> **greaterThan**(`n`): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:486

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`boolean`

***

### greaterThanOrEqualTo()

> **greaterThanOrEqualTo**(`n`): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:489

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`boolean`

***

### gt()

> **gt**(`n`): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:487

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`boolean`

***

### gte()

> **gte**(`n`): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:490

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`boolean`

***

### hyperbolicCosine()

> **hyperbolicCosine**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:492

#### Returns

`Decimal`

***

### hyperbolicSine()

> **hyperbolicSine**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:495

#### Returns

`Decimal`

***

### hyperbolicTangent()

> **hyperbolicTangent**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:498

#### Returns

`Decimal`

***

### inverseCosine()

> **inverseCosine**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:501

#### Returns

`Decimal`

***

### inverseHyperbolicCosine()

> **inverseHyperbolicCosine**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:504

#### Returns

`Decimal`

***

### inverseHyperbolicSine()

> **inverseHyperbolicSine**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:507

#### Returns

`Decimal`

***

### inverseHyperbolicTangent()

> **inverseHyperbolicTangent**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:510

#### Returns

`Decimal`

***

### inverseSine()

> **inverseSine**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:513

#### Returns

`Decimal`

***

### inverseTangent()

> **inverseTangent**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:516

#### Returns

`Decimal`

***

### isFinite()

> **isFinite**(): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:519

#### Returns

`boolean`

***

### isInt()

> **isInt**(): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:522

#### Returns

`boolean`

***

### isInteger()

> **isInteger**(): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:521

#### Returns

`boolean`

***

### isNaN()

> **isNaN**(): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:524

#### Returns

`boolean`

***

### isNeg()

> **isNeg**(): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:527

#### Returns

`boolean`

***

### isNegative()

> **isNegative**(): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:526

#### Returns

`boolean`

***

### isPos()

> **isPos**(): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:530

#### Returns

`boolean`

***

### isPositive()

> **isPositive**(): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:529

#### Returns

`boolean`

***

### isZero()

> **isZero**(): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:532

#### Returns

`boolean`

***

### lessThan()

> **lessThan**(`n`): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:534

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`boolean`

***

### lessThanOrEqualTo()

> **lessThanOrEqualTo**(`n`): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:537

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`boolean`

***

### ln()

> **ln**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:553

#### Returns

`Decimal`

***

### log()

> **log**(`n?`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:541

#### Parameters

##### n?

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### logarithm()

> **logarithm**(`n?`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:540

#### Parameters

##### n?

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### lt()

> **lt**(`n`): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:535

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`boolean`

***

### lte()

> **lte**(`n`): `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:538

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`boolean`

***

### minus()

> **minus**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:543

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### mod()

> **mod**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:547

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### modulo()

> **modulo**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:546

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### mul()

> **mul**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:576

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### naturalExponential()

> **naturalExponential**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:549

#### Returns

`Decimal`

***

### naturalLogarithm()

> **naturalLogarithm**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:552

#### Returns

`Decimal`

***

### neg()

> **neg**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:556

#### Returns

`Decimal`

***

### negated()

> **negated**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:555

#### Returns

`Decimal`

***

### plus()

> **plus**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:558

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### pow()

> **pow**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:609

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### precision()

> **precision**(`includeZeros?`): `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:561

#### Parameters

##### includeZeros?

`boolean`

#### Returns

`number`

***

### round()

> **round**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:564

#### Returns

`Decimal`

***

### sd()

> **sd**(`includeZeros?`): `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:562

#### Parameters

##### includeZeros?

`boolean`

#### Returns

`number`

***

### sin()

> **sin**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:567

#### Returns

`Decimal`

***

### sine()

> **sine**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:566

#### Returns

`Decimal`

***

### sinh()

> **sinh**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:496

#### Returns

`Decimal`

***

### sqrt()

> **sqrt**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:570

#### Returns

`Decimal`

***

### squareRoot()

> **squareRoot**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:569

#### Returns

`Decimal`

***

### sub()

> **sub**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:544

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### tan()

> **tan**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:573

#### Returns

`Decimal`

***

### tangent()

> **tangent**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:572

#### Returns

`Decimal`

***

### tanh()

> **tanh**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:499

#### Returns

`Decimal`

***

### times()

> **times**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:575

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### toBinary()

#### Call Signature

> **toBinary**(`significantDigits?`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:578

##### Parameters

###### significantDigits?

`number`

##### Returns

`string`

#### Call Signature

> **toBinary**(`significantDigits`, `rounding`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:579

##### Parameters

###### significantDigits

`number`

###### rounding

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

##### Returns

`string`

***

### toDecimalPlaces()

#### Call Signature

> **toDecimalPlaces**(`decimalPlaces?`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:581

##### Parameters

###### decimalPlaces?

`number`

##### Returns

`Decimal`

#### Call Signature

> **toDecimalPlaces**(`decimalPlaces`, `rounding`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:582

##### Parameters

###### decimalPlaces

`number`

###### rounding

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

##### Returns

`Decimal`

***

### toDP()

#### Call Signature

> **toDP**(`decimalPlaces?`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:583

##### Parameters

###### decimalPlaces?

`number`

##### Returns

`Decimal`

#### Call Signature

> **toDP**(`decimalPlaces`, `rounding`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:584

##### Parameters

###### decimalPlaces

`number`

###### rounding

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

##### Returns

`Decimal`

***

### toExponential()

#### Call Signature

> **toExponential**(`decimalPlaces?`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:586

##### Parameters

###### decimalPlaces?

`number`

##### Returns

`string`

#### Call Signature

> **toExponential**(`decimalPlaces`, `rounding`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:587

##### Parameters

###### decimalPlaces

`number`

###### rounding

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

##### Returns

`string`

***

### toFixed()

#### Call Signature

> **toFixed**(`decimalPlaces?`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:589

##### Parameters

###### decimalPlaces?

`number`

##### Returns

`string`

#### Call Signature

> **toFixed**(`decimalPlaces`, `rounding`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:590

##### Parameters

###### decimalPlaces

`number`

###### rounding

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

##### Returns

`string`

***

### toFraction()

> **toFraction**(`max_denominator?`): `Decimal`[]

Defined in: backend/src/generated/prisma/runtime/library.d.ts:592

#### Parameters

##### max\_denominator?

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`[]

***

### toHex()

#### Call Signature

> **toHex**(`significantDigits?`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:596

##### Parameters

###### significantDigits?

`number`

##### Returns

`string`

#### Call Signature

> **toHex**(`significantDigits`, `rounding?`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:597

##### Parameters

###### significantDigits

`number`

###### rounding?

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

##### Returns

`string`

***

### toHexadecimal()

#### Call Signature

> **toHexadecimal**(`significantDigits?`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:594

##### Parameters

###### significantDigits?

`number`

##### Returns

`string`

#### Call Signature

> **toHexadecimal**(`significantDigits`, `rounding`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:595

##### Parameters

###### significantDigits

`number`

###### rounding

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

##### Returns

`string`

***

### toJSON()

> **toJSON**(): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:599

#### Returns

`string`

***

### toNearest()

> **toNearest**(`n`, `rounding?`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:601

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### rounding?

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

#### Returns

`Decimal`

***

### toNumber()

> **toNumber**(): `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:603

#### Returns

`number`

***

### toOctal()

#### Call Signature

> **toOctal**(`significantDigits?`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:605

##### Parameters

###### significantDigits?

`number`

##### Returns

`string`

#### Call Signature

> **toOctal**(`significantDigits`, `rounding`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:606

##### Parameters

###### significantDigits

`number`

###### rounding

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

##### Returns

`string`

***

### toPower()

> **toPower**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:608

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### toPrecision()

#### Call Signature

> **toPrecision**(`significantDigits?`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:611

##### Parameters

###### significantDigits?

`number`

##### Returns

`string`

#### Call Signature

> **toPrecision**(`significantDigits`, `rounding`): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:612

##### Parameters

###### significantDigits

`number`

###### rounding

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

##### Returns

`string`

***

### toSD()

#### Call Signature

> **toSD**(`significantDigits?`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:616

##### Parameters

###### significantDigits?

`number`

##### Returns

`Decimal`

#### Call Signature

> **toSD**(`significantDigits`, `rounding`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:617

##### Parameters

###### significantDigits

`number`

###### rounding

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

##### Returns

`Decimal`

***

### toSignificantDigits()

#### Call Signature

> **toSignificantDigits**(`significantDigits?`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:614

##### Parameters

###### significantDigits?

`number`

##### Returns

`Decimal`

#### Call Signature

> **toSignificantDigits**(`significantDigits`, `rounding`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:615

##### Parameters

###### significantDigits

`number`

###### rounding

[`Rounding`](../namespaces/Decimal/type-aliases/Rounding.md)

##### Returns

`Decimal`

***

### toString()

> **toString**(): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:619

#### Returns

`string`

***

### trunc()

> **trunc**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:622

#### Returns

`Decimal`

***

### truncated()

> **truncated**(): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:621

#### Returns

`Decimal`

***

### valueOf()

> **valueOf**(): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:624

#### Returns

`string`

***

### abs()

> `static` **abs**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:626

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### acos()

> `static` **acos**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:627

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### acosh()

> `static` **acosh**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:628

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### add()

> `static` **add**(`x`, `y`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:629

#### Parameters

##### x

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### y

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### asin()

> `static` **asin**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:630

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### asinh()

> `static` **asinh**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:631

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### atan()

> `static` **atan**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:632

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### atan2()

> `static` **atan2**(`y`, `x`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:634

#### Parameters

##### y

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### x

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### atanh()

> `static` **atanh**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:633

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### cbrt()

> `static` **cbrt**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:635

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### ceil()

> `static` **ceil**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:636

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### clamp()

> `static` **clamp**(`n`, `min`, `max`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:637

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### min

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### max

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### clone()

> `static` **clone**(`object?`): *typeof* [`Decimal`](../namespaces/Decimal/README.md)

Defined in: backend/src/generated/prisma/runtime/library.d.ts:638

#### Parameters

##### object?

[`Config`](../namespaces/Decimal/interfaces/Config.md)

#### Returns

*typeof* [`Decimal`](../namespaces/Decimal/README.md)

***

### config()

> `static` **config**(`object`): *typeof* [`Decimal`](../namespaces/Decimal/README.md)

Defined in: backend/src/generated/prisma/runtime/library.d.ts:639

#### Parameters

##### object

[`Config`](../namespaces/Decimal/interfaces/Config.md)

#### Returns

*typeof* [`Decimal`](../namespaces/Decimal/README.md)

***

### cos()

> `static` **cos**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:640

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### cosh()

> `static` **cosh**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:641

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### div()

> `static` **div**(`x`, `y`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:642

#### Parameters

##### x

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### y

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### exp()

> `static` **exp**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:643

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### floor()

> `static` **floor**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:644

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### hypot()

> `static` **hypot**(...`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:645

#### Parameters

##### n

...[`Value`](../namespaces/Decimal/type-aliases/Value.md)[]

#### Returns

`Decimal`

***

### isDecimal()

> `static` **isDecimal**(`object`): `object is Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:646

#### Parameters

##### object

`any`

#### Returns

`object is Decimal`

***

### ln()

> `static` **ln**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:647

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### log()

> `static` **log**(`n`, `base?`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:648

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### base?

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### log10()

> `static` **log10**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:650

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### log2()

> `static` **log2**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:649

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### max()

> `static` **max**(...`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:651

#### Parameters

##### n

...[`Value`](../namespaces/Decimal/type-aliases/Value.md)[]

#### Returns

`Decimal`

***

### min()

> `static` **min**(...`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:652

#### Parameters

##### n

...[`Value`](../namespaces/Decimal/type-aliases/Value.md)[]

#### Returns

`Decimal`

***

### mod()

> `static` **mod**(`x`, `y`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:653

#### Parameters

##### x

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### y

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### mul()

> `static` **mul**(`x`, `y`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:654

#### Parameters

##### x

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### y

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### noConflict()

> `static` **noConflict**(): *typeof* [`Decimal`](../namespaces/Decimal/README.md)

Defined in: backend/src/generated/prisma/runtime/library.d.ts:655

#### Returns

*typeof* [`Decimal`](../namespaces/Decimal/README.md)

***

### pow()

> `static` **pow**(`base`, `exponent`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:656

#### Parameters

##### base

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### exponent

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### random()

> `static` **random**(`significantDigits?`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:657

#### Parameters

##### significantDigits?

`number`

#### Returns

`Decimal`

***

### round()

> `static` **round**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:658

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### set()

> `static` **set**(`object`): *typeof* [`Decimal`](../namespaces/Decimal/README.md)

Defined in: backend/src/generated/prisma/runtime/library.d.ts:659

#### Parameters

##### object

[`Config`](../namespaces/Decimal/interfaces/Config.md)

#### Returns

*typeof* [`Decimal`](../namespaces/Decimal/README.md)

***

### sign()

> `static` **sign**(`n`): `number`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:660

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`number`

***

### sin()

> `static` **sin**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:661

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### sinh()

> `static` **sinh**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:662

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### sqrt()

> `static` **sqrt**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:663

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### sub()

> `static` **sub**(`x`, `y`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:664

#### Parameters

##### x

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

##### y

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### sum()

> `static` **sum**(...`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:665

#### Parameters

##### n

...[`Value`](../namespaces/Decimal/type-aliases/Value.md)[]

#### Returns

`Decimal`

***

### tan()

> `static` **tan**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:666

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### tanh()

> `static` **tanh**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:667

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`

***

### trunc()

> `static` **trunc**(`n`): `Decimal`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:668

#### Parameters

##### n

[`Value`](../namespaces/Decimal/type-aliases/Value.md)

#### Returns

`Decimal`
