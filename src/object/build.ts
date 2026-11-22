import { build }              from '@itrocks/build/build.js'
import { enableAutocomplete } from './autocomplete.js'

build<HTMLInputElement>('input[data-type=object]', enableAutocomplete)
