import { ControlField } from '../field'
import { fieldMarkup }  from '../field'

export function checkboxControl(value: boolean, field: ControlField): string
{
	const { id, name } = field
	const hidden       = `<input name="${name}" type="hidden" value="0">`
	const checked      = value ? 'checked ' : ''
	const checkbox     = `<input ${checked}id="${id}" name="${name}" type="checkbox" value="1">`
	return fieldMarkup(field, hidden + '\n\t\t\t\t' + checkbox)
}
