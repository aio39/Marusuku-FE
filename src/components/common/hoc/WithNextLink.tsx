import NextLink from 'next/link'
import { FC } from 'react'

type IWithNextLink = {
  href?: string
}

const WithNextLink: FC<IWithNextLink> = ({ href, children }) => {
  return href ? <NextLink href={href}>{children}</NextLink> : <>{children}</>
}

export default WithNextLink
