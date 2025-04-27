'use client'

import React from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import { Color, FontVariant, FontSize, FontWeight } from '@/app/theme'

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  background-color: ${Color.gray600};
  margin-top: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 20px
  }
`

const FooterTextContainer = styled.div`   @media (max-width: 768px) {
    align-items: center;
  }
`

const FooterText = styled(Link)`
  ${FontVariant.body_md}
  color: ${Color.white};
  text-decoration: none;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }

`
const FooterAddress = styled.div`
display: flex;
  flex-direction: column;
  gap: 4px;
`
const FooterTextBold = styled.p`
  font-size: ${FontSize.body_md};
  color: ${Color.white};
  text-decoration: none;
  margin: 0;

  @media (max-width: 768px) {
    margin: 4px 0;
  }
`

const FooterLogoContainer = styled.div` 
  display: flex;
  align-items: center;
   @media (max-width: 768px) {
    flex-direction: row;
    margin-top: 16px;
  }
`

const LogoLink = styled(Link)`
  display: inline-block;
`

export const Footer = () => {
  return (
    <FooterContainer>
        <FooterAddress>
        <FooterTextBold>Department of Computer Science</FooterTextBold>
          <FooterText href="https://goo.gl/maps/8PG4bhyMoxwS1pXH8" target="_blank">
            Philip Guthrie Hoffman Hall<br />
            3551 Cullen Blvd, Room 574<br />
            Houston, Texas 77204-3010
          </FooterText>
        </FooterAddress>
      <FooterLogoContainer >
      

        <Image width={48} height={48} src="/images/uh_red.png" alt="UH Logo" />
      </FooterLogoContainer>
    </FooterContainer>
  )
}
