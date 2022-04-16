import React from "react"
import Navigation from "../../components/Navigation"

type Props = {
  children: React.ReactNode
}
const PageContainer = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

export default PageContainer
