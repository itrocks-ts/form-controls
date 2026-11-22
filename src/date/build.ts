import { build } from '@itrocks/build/build.js'

build<HTMLInputElement>('input[data-type=date]', async input =>
	(await import('@itrocks/air-datepicker/air-datepicker.js')).airDatePicker(input)
)
