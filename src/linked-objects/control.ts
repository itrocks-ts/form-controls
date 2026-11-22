import { ControlField } from '../field'
import { escapeHtml }   from '../field'
import { fieldMarkup }  from '../field'

export function linkedObjectsControl(
	entries: { caption: string, id: string }[], field: ControlField, fetch: string
): string
{
	const { id, name } = field
	const inputs       = entries.map(entry => {
		const entryId = escapeHtml(entry.id)
		return '<li>'
			+ `<input id="${id}-id.${entryId}" name="${name}_id.${entryId}" type="hidden" value="${entryId}">`
			+ `<input name="${name}.${entryId}" value="${escapeHtml(entry.caption)}">`
			+ '</li>'
	})
	inputs.push(
		'<li>'
		+ `<input id="${id}-id" name="${name}_id" type="hidden">`
		+ `<input name="${name}" placeholder="+">`
		+ '</li>'
	)
	return fieldMarkup(
		field,
		`<ul data-multiple-contained-auto-width data-fetch="${escapeHtml(fetch)}"`
		+ ` data-field-id="${id}" data-field-name="${name}" data-type="objects">`
		+ inputs.join('') + '</ul>',
		''
	)
}
