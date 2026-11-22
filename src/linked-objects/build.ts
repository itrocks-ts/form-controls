import { build }              from '@itrocks/build/build.js'
import { containedAutoWidth } from '@itrocks/contained-auto-width/contained-auto-width.js'
import { enableAutocomplete } from '../object/autocomplete.js'

build<HTMLInputElement>('ul[data-type=objects] > li > input:not([type=hidden])', async input => {
	await enableAutocomplete(input)
	const { links } = await import('@itrocks/links/links.js')
	links(input)
})

build<HTMLLIElement>('[data-contained-auto-width], [data-multiple-contained-auto-width] > li',
	async container => containedAutoWidth(container))
