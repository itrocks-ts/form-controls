import { IGNORE }       from '@itrocks/transformer'
import { ControlField } from '../field'
import { fieldMarkup }  from '../field'

export function passwordControl(value: string | undefined, field: ControlField): string
{
	const { id, name } = field
	const inputValue   = value?.length ? ` value="${IGNORE}"` : ''
	return fieldMarkup(field, `<input id="${id}" name="${name}" type="password"${inputValue}>`)
}
