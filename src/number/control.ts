import { ControlField } from '../field'
import { escapeHtml }   from '../field'
import { fieldMarkup }  from '../field'

export function numberControl(value: string, field: ControlField): string
{
	const { id, name } = field
	return fieldMarkup(field, `<input data-type="number" id="${id}" name="${name}" value="${escapeHtml(value)}">`)
}
