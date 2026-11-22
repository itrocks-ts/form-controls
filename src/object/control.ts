import { ControlField } from '../field'
import { escapeHtml }   from '../field'
import { fieldMarkup }  from '../field'

export function objectControl(caption: string, objectId: unknown, fetch: string, field: ControlField): string
{
	const { id, name } = field
	const inputValue   = caption ? ` value="${escapeHtml(caption)}"` : ''
	const input        = `<input data-fetch="${escapeHtml(fetch)}" data-type="object" id="${id}" name="${name}"${inputValue}>`
	const inputId      = `<input id="${id}-id" name="${name}_id" type="hidden" value="${escapeHtml(objectId ?? '')}">`
	return fieldMarkup(field, inputId + input)
}
