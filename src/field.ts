import { ObjectOrType } from '@itrocks/class-type'
import { displayOf }    from '@itrocks/property-view'
import { toCssId }      from '@itrocks/rename'
import { toField }      from '@itrocks/rename'
import { tr }           from '@itrocks/translate'

export type ControlField = {
	id:    string,
	label: string,
	name:  string
}

export type ControlScope = {
	label?: boolean,
	prefix: string
}

export type FieldDependencies = {
	displayOf:   <T extends object>(object: ObjectOrType<T>, property: keyof T) => string,
	fieldIdOf:   (property: PropertyKey) => string,
	fieldNameOf: (property: PropertyKey) => string,
	tr:          (text: string) => string
}

const fieldDependencies: FieldDependencies = { displayOf, fieldIdOf: toCssId, fieldNameOf: toField, tr }

export function controlField<T extends object>(
	target: ObjectOrType<T>, property: keyof T, scope?: ControlScope, depends: FieldDependencies = fieldDependencies
): ControlField
{
	const prefix = scope?.prefix ? (scope.prefix + '.') : ''
	const id     = escapeHtml(prefix + depends.fieldIdOf(property))
	const name   = escapeHtml(prefix + depends.fieldNameOf(property))
	const label  = (scope?.label === false)
		? ''
		: `<label for="${id}">${escapeHtml(depends.tr(depends.displayOf(target, property)))}</label>`
	return { id, label, name }
}

export function escapeHtml(value: unknown): string
{
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
}

export function fieldMarkup(field: ControlField, markup: string, separator = '\n\t\t\t\t'): string
{
	return field.label ? (field.label + separator + markup) : markup
}
