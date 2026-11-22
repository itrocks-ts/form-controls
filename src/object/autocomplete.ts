import { loadCss } from '@itrocks/asset-loader/asset-loader.js'

export async function enableAutocomplete(input: HTMLInputElement)
{
	input.classList.add('autocomplete')
	loadCss('/@itrocks/autocomplete/autocomplete.css')
	new (await import('@itrocks/autocomplete/autocomplete.js')).AutoComplete(input, {
		allowNew: !['0', 'false', 'no', 'off'].includes(input.closest('form')?.dataset.allowNew ?? '0')
	})
}
