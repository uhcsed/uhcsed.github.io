'use client'
import Image from 'next/image'
import { Color, ScreenSize, linearlyScaleSize, FontVariant } from '@/app/theme'
import styled from '@emotion/styled'
import React from 'react'
import { Section } from './Styles'

const HeroContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  // TODO: Decide whether to keep gap
  // gap: 24px;

  @media (max-width: ${ScreenSize.md}) {
    flex-direction: column;
    gap: 0px;
  }
`

const HeroTextArea = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: ${linearlyScaleSize({
    minSizePx: 48,
    maxSizePx: 96,
    minScreenSizePx: parseInt(ScreenSize.md),
    maxScreenSizePx: parseInt(ScreenSize.lg),
  })};
`

const HeroTitle = styled.h1`
  // TODO: Try to make the responsive font-size more systematic. This is a temporary fix.
  ${FontVariant.title_xl}
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
  text-align: left;

  @media (max-width: ${ScreenSize.md}) {
    align-self: center;
    text-align: center;
  }
`

const HeroSubtitle = styled.h2`
  font-size: 1.375rem;
  font-weight: 300;
  margin-bottom: 8px;

  @media (max-width: ${ScreenSize.md}) {
    align-self: center;
    text-align: center;
  }
`
const HeroMessage = styled.p`
  ${FontVariant.body_md}
  color: ${Color.gray700};
  text-align: left;
  max-width: 100%;
  @media (max-width: ${ScreenSize.md}) {
    text-align: center;
  }
`

const HeroImageContainer = styled.div`
  flex-basis: 50%;
  position: relative;
  z-index: 0;
  @media (max-width: ${ScreenSize.md}) {
    // TODO: Set the min-height more systematically. This is a temporary fix.
    min-height: 30vh;
  }
`
export const HeroSection = () => {
  return (
    <Section id="hero-section" style={{ padding: '0' }}>
      {/* padding: 0 is to allow image to stretch to the right side of the webpage*/}
      <HeroContainer>
        <HeroTextArea id="hero-text-area">
          <HeroTitle>
            WELCOME to <span style={{ color: `${Color.red}`, paddingRight: '7px' }}>OUR LAB</span>!
          </HeroTitle>
          <HeroSubtitle>
            Research of <br /> <strong style={{ fontWeight: '700' }}>Computing Education</strong> at University Of Houston
          </HeroSubtitle>
          <HeroMessage>
          Computing Education at University of Houston includes an interdisciplinary group of researchers and PhD students who study how students learn computing, effective pedagogies for teaching computing and effective learning at scale. Our research labs include Ph.D., M.S., and undergraduate students at UH.
          </HeroMessage>
        </HeroTextArea>
        <HeroImageContainer id="hero-image-container">
          <Image
            id="hero-image"
            src={'/images/team.png'}
            alt="group picture"
            fill={true}
            priority
            style={{ position: 'absolute', objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </HeroImageContainer>
      </HeroContainer>
    </Section>
  )
}
