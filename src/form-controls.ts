import { ObjectOrType }       from '@itrocks/class-type'
import { applyTransformer }   from '@itrocks/transformer'
import { EDIT, HTML }         from '@itrocks/transformer'
import { resolveTransformer } from '@itrocks/transformer'
import { ControlScope }       from './field'
import { escapeHtml }         from './field'

export { checkboxControl }      from './checkbox/control'
export { dateControl }          from './date/control'
export { fileControl }          from './file/control'
export { linkedObjectsControl } from './linked-objects/control'
export { multilineControl }     from './multiline/control'
export { numberControl }        from './number/control'
export { objectControl }        from './object/control'
export { passwordControl }      from './password/control'
export { textControl }          from './text/control'

export { ControlField, ControlScope, FieldDependencies, controlField, escapeHtml } from './field'

export async function formControl<T extends object>(
	value: unknown, target: ObjectOrType<T>, property: keyof T, scope?: ControlScope
): Promise<string>
{
	if (!scope) {
		return applyTransformer(value, target, property, HTML, EDIT)
	}
	const transformer = resolveTransformer<T>(target, property, HTML, EDIT)
	return transformer ? await transformer(value, target, property, scope, HTML, EDIT) : escapeHtml(value ?? '')
}

export async function renderControl<T extends object>(object: T, property: keyof T, prefix: string): Promise<string>
{
	return formControl(await object[property], object, property, { label: false, prefix })
}
