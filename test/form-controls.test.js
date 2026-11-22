const assert = require('node:assert/strict')
const test = require('node:test')

const { EDIT, HTML, setPropertyTransformer } = require('@itrocks/transformer')
const {
	checkboxControl,
	controlField,
	formControl,
	linkedObjectsControl,
	multilineControl,
	objectControl,
	renderControl,
	textControl
} = require('@itrocks/form-controls')

class CrewMember {
	job = 'Camera "A" & B'
}

setPropertyTransformer(CrewMember, 'job', HTML, EDIT, (value, object, property, scope) =>
	textControl(value, controlField(object, property, scope))
)

test('built-in controls keep their full submitted names in a scoped row', () => {
	const member = new CrewMember()
	const field = controlField(member, 'job', { prefix: 'crew.3', label: false })

	assert.match(checkboxControl(true, field), /name="crew\.3\.job" type="hidden" value="0"/)
	assert.match(checkboxControl(true, field), /<input checked id="crew\.3\.job" name="crew\.3\.job"/)
	assert.match(multilineControl('<script>', field), /name="crew\.3\.job">&lt;script&gt;<\/textarea>/)
	assert.match(objectControl('Camera "A"', 12, '/job/summary', field), /name="crew\.3\.job_id" type="hidden" value="12"/)
	assert.match(linkedObjectsControl([{ caption: 'Crew', id: '9' }], field, '/job/summary'),
		/data-field-name="crew\.3\.job".*name="crew\.3\.job_id\.9"/)
})

test('the same transformer renders an ordinary input and a row input', async () => {
	const member = new CrewMember()
	assert.match(await formControl(member.job, member, 'job'),
		/<label for="job">job<\/label>\s*<input id="job" name="job"/)
	assert.equal(await renderControl(member, 'job', 'crew.1'),
		'<input id="crew.1.job" name="crew.1.job" value="Camera &quot;A&quot; &amp; B">')
})
