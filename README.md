[![npm version](https://img.shields.io/npm/v/@itrocks/form-controls?logo=npm)](https://www.npmjs.org/package/@itrocks/form-controls)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/form-controls)](https://www.npmjs.org/package/@itrocks/form-controls)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/form-controls?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/form-controls)
[![issues](https://img.shields.io/github/issues/itrocks-ts/form-controls)](https://github.com/itrocks-ts/form-controls/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&logo=discord&logoColor=white&label=discord)](https://25.re/ditr)

# form-controls

Reusable HTML form controls for it.rocks property editors.

## Usage

```sh
npm i @itrocks/form-controls
```

The standard framework registers the HTML edit transformers for each property type and loads the browser behaviours.
Generic edit forms include the shared stylesheet through `@itrocks/edit`.

```ts
import { renderControl } from '@itrocks/form-controls'

const html = await renderControl(crewMember, 'job', 'crew.1')
```

This renders the standard control for `job` with the field name `crew.1.job` and omits its label. Each field of that
row must use the same prefix. The object picker also renders the companion hidden field `crew.1.job_id`.

## API

- `formControl(value, target, property, scope?)` selects the HTML edit transformer registered on the property or
  its type. The target can be an instance or its class.
- `renderControl(object, property, prefix)` reads the property and renders a scoped control without a label.
- `controlField(target, property, scope?, dependencies?)` provides the escaped field ID, field name and label
  markup to use when implementing an edit transformer. Naming, property display and translation use the
  standard framework conventions by default. Pass overrides for these conventions when rendering outside it.rocks.
- `ControlScope` contains a dotted `prefix` without a trailing dot and optional `label: false`.
  A custom HTML edit transformer can accept it as its fourth argument and pass it to `controlField`.
- `escapeHtml(value)` escapes HTML characters in text or a double-quoted attribute.

The markup helpers accept a `ControlField` from `controlField`.

- `checkboxControl(value, field)` emits the checkbox and its unchecked fallback field.
- `dateControl(value, field)` and `numberControl(value, field)` accept values already formatted for display.
- `fileControl(field)` emits the file input.
- `linkedObjectsControl(entries, field, fetch)` renders multiple linked inputs from caption and ID pairs.
- `multilineControl(value, field)` renders a textarea.
- `objectControl(caption, objectId, fetch, field)` renders the visible autocomplete input and its hidden ID.
- `passwordControl(value, field)` renders the password input and preserves an existing password via the ignore marker.
- `textControl(value, field)` renders the default text input.

A standalone template can include `@itrocks/form-controls/browser/build.js` as a module and
`@itrocks/form-controls/css/form-controls.css` as a stylesheet. The browser module activates date pickers,
autocomplete and linked inputs on initial and dynamically inserted controls.
