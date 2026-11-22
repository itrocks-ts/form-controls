import { ControlField } from '../field'
import { escapeHtml }   from '../field'
import { fieldMarkup }  from '../field'

export function dateControl(value: string, field: ControlField): string
{
	const { id, name } = field
	const inputValue   = value ? ` value="${escapeHtml(value)}"` : ''
	return fieldMarkup(field, `<input data-type="date" id="${id}" name="${name}"${inputValue}>`)
}
