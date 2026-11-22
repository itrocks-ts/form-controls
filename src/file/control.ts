import { ControlField } from '../field'
import { fieldMarkup }  from '../field'

export function fileControl(field: ControlField): string
{
	return fieldMarkup(field, `<input id="${field.id}" name="${field.name}" type="file">`, '')
}
