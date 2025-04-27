'use client'
import React, { useState } from 'react'
import { Section, SectionHeader, FullWidthContainer } from './Styles'
import styled from '@emotion/styled'
import { LinkButton } from '@/components/LinkButton'
import { PublicationCard } from '@/components/Publication/PublicationCard'
import Link from 'next/link'
import { URL } from '@/components/URL'
import { Color } from '@/app/theme'

const minCardWidth = 200
const gap = 24
const sideMargins = 96
const numCards = 4

const NewsItemsArea = styled.div`
  display: grid;
  gap: ${gap}px;
  padding: 0;
  grid-template-columns: repeat(auto-fit, minmax(${minCardWidth}px, 1fr));
  @media (max-width: ${minCardWidth * 4 + gap * 3 + sideMargins * 2}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${minCardWidth * 2 + gap + sideMargins * 2}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const PublicationContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Color.gray300};
  padding: 16px;
  gap: 8px;
`
const PublicationTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 8px;
`

const PublicationAuthors = styled.p`
  margin-bottom: 4px;
`

const PublicationDate = styled.p`
  display: flex;
`

export const NewsSection = () => {
  const newsItems = [
    {
      title: 'Breaking the Programming Language Barrier: Multilingual Prompting to Empower Non-Native English Learners',
      link: 'https://dl.acm.org/doi/10.1145/3699538.3706894',
    },
    {
      title: 'To Google or To ChatGPT? A Comparison of CS2 Students\' Information Gathering Approaches and Outcomes',
      link: 'https://arxiv.org/abs/2501.11935'
    },
    {
      title:
        'Students and Instructors Reflections on the Impact of COVID-19 on Computer Science Education after One Year of Remote Teaching',
      link: 'https://link.springer.com/article/10.1007/s44217-025-00438-1',
    },
    {
      title: 'Student-AI Interaction: A Case Study of CS1 students',
      link: 'https://dl.acm.org/doi/abs/10.1145/3699538.3699567',
    },
  ];
  const newsItemComponents = newsItems.map((item, index) => (
    <PublicationContainer key={index}>
      <PublicationTitle>{item.title}</PublicationTitle>
      <PublicationDate>
        {item.link && (
          <Link href={item.link} style={{marginLeft: '10px', display: 'flex'}}>
            <URL href={item.link} />
          </Link>
        )}
      </PublicationDate>
    </PublicationContainer>
  ));

 
  return (
    <FullWidthContainer>
      <Section id="news-section">
        <SectionHeader title="Latest Publications" subtitle="Check the latest publications from our team" />  
        <NewsItemsArea id="news area">
          {newsItemComponents}
        </NewsItemsArea>
        <LinkButton href="/publications" text="See More" style={{ alignSelf: 'center' }} />

      </Section>
    </FullWidthContainer>
  )
}
