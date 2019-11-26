# gux-text-field

This component is an html input component having update indicator or error/warning message on it.
You can specify a validation function to add this test on input. You can do it by yourself using the input event and
changing error-message attribute.

## Example usage

``` html
<gux-text-field>
</gux-text-field>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                                               | Type                                          | Default       |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------- | ------------- |
| `debounceTimeout`  | `debounce-timeout`   | Timeout between input and validation.                                                     | `number`                                      | `500`         |
| `disabled`         | `disabled`           | Disable the input and prevent interactions.                                               | `boolean`                                     | `false`       |
| `eraseLabel`       | `erase-label`        | The label for the erase button                                                            | `string`                                      | `''`          |
| `errorMessage`     | `error-message`      | The message displayed on validation failure.                                              | `string`                                      | `''`          |
| `errorMessageType` | `error-message-type` | The message type (warning or error)                                                       | `string`                                      | `Types.Error` |
| `placeholder`      | `placeholder`        | The input placeholder.                                                                    | `string`                                      | `undefined`   |
| `readonly`         | `readonly`           | Set the input in readonly mode                                                            | `boolean`                                     | `false`       |
| `srLabel`          | `sr-label`           | Aria label to use in case the text field does not have an actual label.                   | `string`                                      | `undefined`   |
| `type`             | `type`               | Indicate the input type                                                                   | `"email" \| "number" \| "password" \| "text"` | `'text'`      |
| `useClearButton`   | `use-clear-button`   | Determines whether or not the 'x' clear button is displayed when the input contains text. | `boolean`                                     | `true`        |
| `validation`       | `validation`         | The input validation.                                                                     | `any`                                         | `null`        |
| `value`            | `value`              | Indicate the input value                                                                  | `string`                                      | `''`          |


## Events

| Event   | Description                 | Type               |
| ------- | --------------------------- | ------------------ |
| `input` | Triggered when user inputs. | `CustomEvent<any>` |


## Methods

### `clear() => Promise<void>`

Clears the input.

#### Returns

Type: `Promise<void>`



### `setInputFocus() => Promise<void>`

Sets the input focus to the text input.

#### Returns

Type: `Promise<void>`



### `setLabelledBy(id: string) => Promise<void>`

Provides an aria-labelledby element for this component.

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [gux-datepicker](../gux-datepicker)
 - [gux-dropdown](../gux-dropdown)
 - [gux-pagination-buttons](../gux-pagination/buttons)
 - [gux-search](../gux-search)
 - [gux-slider](../gux-slider)
 - [gux-spin-button](../gux-spin-button)

### Graph
```mermaid
graph TD;
  gux-datepicker --> gux-text-field
  gux-dropdown --> gux-text-field
  gux-pagination-buttons --> gux-text-field
  gux-search --> gux-text-field
  gux-slider --> gux-text-field
  gux-spin-button --> gux-text-field
  style gux-text-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*