import styled from "styled-components"
import Link, { LinkProps } from "next/link"
import React from "react"

export const NavContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`

export const LogoStyled = styled.div`
  height: 100%;
  width: 70px;
  padding: 25px;
`

export const LogoContainer = ({
  children,
  ...props
}: LinkProps & { children: React.ReactNode }) => (
  <Link {...props}>
    <LogoStyled>{children}</LogoStyled>
  </Link>
)

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const OptionStyled = styled.div`
  padding: 10px 15px;
  cursor: pointer;
`

export const OptionLink = ({
  children,
  ...props
}: LinkProps & { children: React.ReactNode }) => (
  <Link {...props}>
    <OptionStyled>{children}</OptionStyled>
  </Link>
)
