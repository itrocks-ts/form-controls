import { build } from '@itrocks/build/build.js'

const controlSelector = [
	'input:not([type=button], [type=hidden], [type=image], [type=reset], [type=submit])',
	'select',
	'textarea'
].join(', ')

build<HTMLLabelElement, 'click'>('label', 'click', function (event) {
	if (event.defaultPrevented || this.contains(this.control)) return
	if (event.target instanceof Element && event.target.closest('a, button, input, select, textarea')) return

	const controls = this.parentElement?.querySelectorAll<HTMLElement>(
		`:is(${controlSelector}):enabled:not([data-form-action], [readonly])`
	)

	for (const control of controls ?? []) {
		if (!(this.compareDocumentPosition(control) & Node.DOCUMENT_POSITION_FOLLOWING)) continue
		if (this.contains(control)) continue
		control.focus()
		if (document.activeElement !== control) continue
		if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) {
			control.select()
		}
		if (control !== this.control) event.preventDefault()
		return
	}
	event.preventDefault()
})
