import React, {
  InputHTMLAttributes,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
} from "react"

export type InputElemProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "ref"
>

export type ButtonElemProps = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "ref"
>
