import * as Yup from "yup";
import { FormikHelpers } from "formik";

function formikApplyYupTransforms<
  Payload,
  Schema extends Yup.ObjectSchema<Yup.Shape<object, {}>>
>(value: Payload, validationSchema: Schema, fieldName: string) {
  let val = value;

  const field = (validationSchema as any).fields[fieldName];

  if (field) {
    field.transforms.forEach((transform: any) => {
      try {
        val = transform(val);
      } catch {
        console.warn(
          "Transform not successful for the transform function:",
          transform
        );
        // Do nothing
      }
    });
  }

  return val;
}

export async function formikFieldApplyYupTransforms<
  Value,
  Schema extends Yup.ObjectSchema<Yup.Shape<object, {}>>,
  Form extends FormikHelpers<any>
>(value: Value, form: Form, validationSchema: Schema, fieldName: string) {
  const val = formikApplyYupTransforms(value, validationSchema, fieldName);
  form.setFieldValue(fieldName, val);

  return val;
}

export async function formikFormApplyYupTransforms<
  Payload,
  Schema extends Yup.ObjectSchema<Yup.Shape<object, {}>>
>(
  values: Payload,
  form: FormikHelpers<Payload>,
  validationSchema: Schema
): Promise<[Payload, boolean]> {
  const formattedValues = { ...values };

  Object.keys(values).forEach(fieldName => {
    formattedValues[fieldName] = formikApplyYupTransforms(
      values[fieldName],
      validationSchema,
      fieldName as keyof Payload & string
    );
  });

  form.setValues(formattedValues);

  const formErrors = await form.validateForm(formattedValues);
  const hasErrors = Boolean(Object.keys(formErrors).length);

  return [formattedValues, hasErrors];
}
