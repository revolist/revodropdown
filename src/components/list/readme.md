# revo-list

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute        | Description                        | Type                   | Default     |
| ----------------------- | ---------------- | ---------------------------------- | ---------------------- | ----------- |
| `isFocused`             | `is-focused`     |                                    | `boolean`              | `false`     |
| `selectedIndex`         | `selected-index` | Selected Value Index               | `number`               | `0`         |
| `sourceItems`           | --               | Define object mapping for id/value | `any[]`                | `[]`        |
| `template` _(required)_ | --               |                                    | `(item: any) => VNode` | `undefined` |


## Events

| Event     | Description | Type                                  |
| --------- | ----------- | ------------------------------------- |
| `changed` |             | `CustomEvent<{ item: any; e: any; }>` |


## Methods

### `moveSelection(step: number) => Promise<void>`



#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `step` | `number` |             |

#### Returns

Type: `Promise<void>`



### `refresh(source: any[]) => Promise<void>`



#### Parameters

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| `source` | `any[]` |             |

#### Returns

Type: `Promise<void>`



### `selectCurrent(e: KeyboardEvent) => Promise<void>`



#### Parameters

| Name | Type            | Description |
| ---- | --------------- | ----------- |
| `e`  | `KeyboardEvent` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [revo-dropdown](../dropdown)

### Graph
```mermaid
graph TD;
  revo-dropdown --> revo-list
  style revo-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
