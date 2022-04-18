import React from "react"
import { InputElemProps } from "../../../../types"
import {
  FormGroupContainer,
  FormInputLabel,
  FormInputContainer,
} from "./styles"

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
} & InputElemProps

const FormInput = ({
  handleChange,
  label,
  ...restInputProps
}: Props): JSX.Element => (
  <FormGroupContainer>
    <FormInputContainer onChange={handleChange} {...restInputProps} />
    {label ? (
      <FormInputLabel
        className={
          restInputProps.value && (restInputProps.value as string).length
            ? "shrink"
            : ""
        }
      >
        {label}
      </FormInputLabel>
    ) : null}
  </FormGroupContainer>
)

export default FormInput
