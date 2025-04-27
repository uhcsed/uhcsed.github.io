'use client'
import { FontVariant, ScreenSize, linearlyScaleSize } from '@/app/theme'
import { AlumniCard, SpecialThanksCard } from '@/components/AlumniCard'
import { Divider } from '@/components/Divider'
import { MemberCard } from '@/components/MemberCard'
import { Section, SectionTitle, Sections } from '@/components/Section'
import { Sidebar } from '@/components/SideBar'
import { ALUMNI_MEMBERS_BY_POSITION, CURRENT_MEMBERS_BY_POSITION, UHPositions } from '@/data/members'
import styled from '@emotion/styled'
import { startCase } from 'lodash'
import React, { useRef } from 'react'

const SectionContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 48px 24px;
  @media (max-width: ${ScreenSize.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px
    ${linearlyScaleSize({
      minSizePx: 24,
      maxSizePx: 96,
      minScreenSizePx: parseInt(ScreenSize.md),
      maxScreenSizePx: parseInt(ScreenSize.lg),
    })};
  padding-right: ${linearlyScaleSize({
    minSizePx: 24,
    maxSizePx: 8,
    minScreenSizePx: parseInt(ScreenSize.sm),
    maxScreenSizePx: parseInt(ScreenSize.md),
  })};
  width: 100%;
  gap: 16px;
  @media (min-width: ${ScreenSize.max}) {
    width: ${ScreenSize.max};
    margin: 0 auto;
  }

  & > main {
    // make the main content (publications list) take up 85% and the Sidebar component 15%
    width: 80%;

    @media (max-width: ${ScreenSize.sm}) {
      width: 100%;
    }
  }
`
const SideContainer = styled.div`
  padding-top: 96px;
  padding-left: 30px;
  padding-right: 30px;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: ${ScreenSize.md}) {
    display: none;
  }
`
const AlumniSectionContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  @media (max-width: ${ScreenSize.xl}) {
    grid-template-columns: 1fr;
  }
  margin-bottom: 24px;
`

const SubCategoryTitle = styled.h2`
  ${FontVariant.title_md}
  margin-bottom: 8px;
`

// Usar posiciones filtradas para quitar "Alumni" de UHPositions
const Positions = UHPositions.filter(pos => pos !== 'Alumni');

export default function Page() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  return (
    <Container>
      <main style={{ padding: '0px', margin: '0px' }}>
        <h1>People</h1>
        <Sections>
          {Positions.map(position => {
            return (
              CURRENT_MEMBERS_BY_POSITION[position] &&
              CURRENT_MEMBERS_BY_POSITION[position].length > 0 && (
                <React.Fragment key={position}>
                  <Section
                    key={position}
                    id={startCase(position)}
                    ref={el => {
                      sectionRefs.current[position] = el
                    }}
                  >
                    <SectionTitle>{position}</SectionTitle>
                    <SectionContent>
                      {CURRENT_MEMBERS_BY_POSITION[position].map(member => (
                        <MemberCard key={`${member.firstName}-${member.lastName}`} member={member} />
                      ))}
                    </SectionContent>
                  </Section>
                  <Divider />
                </React.Fragment>
              )
            )
          })}
          <Section
            id="alumni"
            key="alumni"
            ref={el => {
              sectionRefs.current['alumni'] = el
            }}
          >
            <SectionTitle>Alumni</SectionTitle>
            {/* Combinamos "Alumni" con otras posiciones que puedan tener alumnos */}
            {Object.keys(ALUMNI_MEMBERS_BY_POSITION).map(position => {
              return (
                ALUMNI_MEMBERS_BY_POSITION[position] &&
                ALUMNI_MEMBERS_BY_POSITION[position].length > 0 && (
                  <React.Fragment key={position}>
                    {/* Solo mostrar la subcategoría si no es "Alumni" */}
                    {position !== 'Alumni' && <SubCategoryTitle>{position}</SubCategoryTitle>}
                    <AlumniSectionContent>
                      {ALUMNI_MEMBERS_BY_POSITION[position].map((alumnus) => (
                        <AlumniCard key={`${alumnus.firstName}-${alumnus.lastName}`} mem={alumnus} />
                      ))}
                    </AlumniSectionContent>
                  </React.Fragment>
                )
              )
            })}
          </Section>
        </Sections>
      </main>
      <SideContainer>
        <Sidebar
          sidebarList={[...Positions.map(position => startCase(position)), 'alumni']}
          sectionRefs={sectionRefs}
        />
      </SideContainer>
    </Container>
  )
}