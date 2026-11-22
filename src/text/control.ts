import { ControlField } from '../field'
import { escapeHtml }   from '../field'
import { fieldMarkup }  from '../field'

export function textControl(value: unknown, field: ControlField): string
{
	const { id, name } = field
	const inputValue   = value ? ` value="${escapeHtml(value)}"` : ''
	return fieldMarkup(field, `<input id="${id}" name="${name}"${inputValue}>`)
}
