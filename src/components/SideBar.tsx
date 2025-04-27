// Sidebar.js
import { Color, FontVariant } from '@/app/theme'
import styled from '@emotion/styled'
import { startCase } from 'lodash'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { NAV_BAR_HEIGHT } from '@/components/NavBar'

const SideBarContainer = styled.div`
  position: sticky;
  top: ${NAV_BAR_HEIGHT + 40}px;
  height: 100vh;
`

const SidebarLink = styled(Link)`
  display: block;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 10px;
  padding-bottom: 5px;
  color: ${Color.gray700};
  ${FontVariant.body_md}

  &.active {
    color: ${Color.red};
  }

  &:hover {
    color: ${Color.red};
    text-decoration: underline;
  }
`

interface IobserverOptions {
  root: HTMLElement | null
  rootMargin: string
  threshold: number | number[]
}

const defaultObserverOptions: IobserverOptions = {
  root: null,
  // when a section passes the area that is 10% from the top and 80% from the bottom of the viewport, it will be considered intersecting
  rootMargin: '-20% 0px -80% 0px',
  threshold: 0.0,
}

interface ISidebar {
  handleLinkClick?: () => void
  sidebarList: string[]
  sectionRefs: React.RefObject<Record<string, HTMLElement | null>>
  observerOptions?: IobserverOptions
}

const capitalizeWords = (s: string) => {
  if (s.toLowerCase() === 'ph d student') {
    return 'Ph.D. Student'
  }

  if (s.toLowerCase() === 'm s student') {
    return 'M.S. Student'
  }

  return startCase(s)
}

export const Sidebar = React.forwardRef(
  (
    { handleLinkClick, sidebarList, sectionRefs, observerOptions = defaultObserverOptions }: ISidebar,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const ignoreObserver = useRef(false)
    useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        if (ignoreObserver.current) return
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      }, observerOptions)

      if (sectionRefs.current !== null) {
        const sections = Object.values(sectionRefs.current)
        sections.forEach(section => {
          section && observer.observe(section)
        })

        return () => {
          observer.disconnect()
        }
      }
    }, [sectionRefs, observerOptions])

    return (
      <SideBarContainer ref={ref}>
        {/* TODO: replace sideBarList with sectionRefs */}
        {sidebarList.map(section => (
          <SidebarLink
            key={section}
            href={`#${section}`}
            className={activeSection === section ? 'active' : ''}
            onClick={() => handleLinkClick && handleLinkClick()}
          >
            {capitalizeWords(section)}
          </SidebarLink>
        ))}
      </SideBarContainer>
    )
  }
)
Sidebar.displayName = 'Sidebar'
