import { ControlField } from '../field'
import { escapeHtml }   from '../field'
import { fieldMarkup }  from '../field'

export function multilineControl(value: string | undefined, field: ControlField): string
{
	const { id, name } = field
	return fieldMarkup(field, `<textarea id="${id}" name="${name}">${escapeHtml(value ?? '')}</textarea>`)
}
