# Formik-yup

[Formik](https://www.npmjs.com/package/formik) and [Yup](https://www.npmjs.com/package/yup) is a lovley combination. It just works, and it does what it does really well. But just like any combination of two different frameworks, sometimes you need some help. And that is why I've created this package, containing a few but important helpers for make sure the glue between Formik and Yup is as strong as it possibly can be.

## Yup transforms (docs)

When Formik is performing its validation only errors will be returned and managed. Any transforms applied by Yup will therefore not be updating the Formik form values. So, using any transform methods from Yup with Formik will not have any implications on the final submit model. Here are my Yup transform helpers, that will do its best to apply any Yup transforms, and warn for any failed transforms that could not be applied by this package.

> Note that any helper functions are async and will return a `Promise`.

### formikFieldApplyYupTransforms

> **input**: `value: Value, form: FormikHelpers<any>, validationSchema: Schema, fieldName: string`
> **return**: formatted value `Promise<formattedValue: Value>`

Value transform helper for a single field. Useful for applying transforms on, for example, `blur` or `click` events. This will modify the value internally, so no manual actions needs to be taken to make sure the form is up to date with the transforms.

Example usage (within a Formik field render):

```
<TextField
	{...field}
	onBlur={e  => {
		formikFieldApplyYupTransforms(
			field.value,
			form,
			validationSchema,
			field.name
		);
		form.handleBlur(e);
	}}
/>
```

### formikFormApplyYupTransforms

> **input**: `values: Payload, form: FormikHelpers<Payload>, validationSchema: Schema`
> **return** array of the formatted values and an hasErrors boolean: `Promise<[formattedValues, hasErrors]>`

Value transform helper for a the whole form. Useful for applying transforms on Formik `submit`. This will modify the value internally, so no manual actions needs to be taken to make sure the form is up to date with the transforms.

Example usage:

```
const  onSubmit = async (
	values: Payload,
	form: FormikActions<Payload>
) => {
	const [formattedValues, hasErrors] = await  formikFormApplyYupTransforms(
		values,
		form,
		validationSchema
	);

	if (hasErrors) {
		return;
	}

	onSubmit(formattedValues);
};
```
