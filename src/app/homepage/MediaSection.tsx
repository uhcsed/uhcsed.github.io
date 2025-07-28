'use client'
import { FontSize, FontWeight } from '@/app/theme'
import styled from '@emotion/styled'
import React from 'react'
import { Section, SectionHeader, FullWidthContainer } from './Styles'
import { VIDEOS } from '@/data/videos'
import { LinkButton } from '@/components/LinkButton'
import { YouTubeEmbed } from '@next/third-parties/google'

const MediaArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  min-width:300px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

`

const VideoCard = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: normal;
`
const VideoContainer = styled.div`
  max-height: 300px;
  min-width: 300px;
  aspect-ratio: 16 / 9;
  margin-bottom: 8px;
`

const VideoTitle = styled.h3`
  font-size: ${FontSize.title_sm};
  font-weight: ${FontWeight.title_md};
  text-align: center;
`

const VideoDate = styled.h4`
  font-size: ${FontSize.body_sm};
  font-weight: ${FontWeight.body_sm};
  text-align: center;
`

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

const isYouTubeLink = (url: string) => url.includes('youtube.com')

export const MediaSection = () => {
  return (
    <FullWidthContainer>
      <Section id="media-section">
        <SectionHeader title="Our LAB on Media" subtitle="Explore LAB's media space" />
        <MediaArea>
          {VIDEOS.map(video => (
            <VideoCard key={video.url}>
              <VideoContainer>
                {isYouTubeLink(video.url) ? (
                  <YouTubeEmbed videoid={video.id}></YouTubeEmbed>
                ) : (
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    <img src={`/thumbnails/${video.id}.png`} alt={video.title} />
                  </a>
                )}
              </VideoContainer>
              <VideoTitle>{video.title}</VideoTitle>
              <VideoDate>{formatDate(video.date)}</VideoDate>
            </VideoCard>
          ))}
        </MediaArea>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          <LinkButton href="https://www.youtube.com/@UniversityOfHouston" image="/images/youtube.svg" text="University of Houston" />
          <LinkButton href="https://x.com/UHouston" image="/images/twitter-x.svg" text="@UHouston" />
        </div>
      </Section>
    </FullWidthContainer>
  )
}
