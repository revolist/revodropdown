# revo-list

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute    | Description                        | Type      | Default     |
| ------------- | ------------ | ---------------------------------- | --------- | ----------- |
| `dataLabel`   | `data-label` | Define object mapping for labels   | `string`  | `undefined` |
| `isFocused`   | `is-focused` |                                    | `boolean` | `false`     |
| `sourceItems` | --           | Define object mapping for id/value | `any[]`   | `[]`        |


## Events

| Event     | Description | Type                                  |
| --------- | ----------- | ------------------------------------- |
| `changed` |             | `CustomEvent<{ item: any; e: any; }>` |


## Methods

### `refresh(source: any[]) => Promise<void>`



#### Parameters

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| `source` | `any[]` |             |

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
