import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { Color, FontVariant, ScreenSize } from '@/app/theme'
import { Category, CategoryContainer, NewsDate, categoryColors } from './NewsCard'
import { Post } from '@/data/posts'
import Markdown from 'react-markdown'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.28);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalCard = styled.div`
  width: 70%;
  max-width: ${ScreenSize.max};
  background-color: ${Color.white};
  padding: 48px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;

  @media (max-width: ${ScreenSize.lg}) {
    width: 90%;
    max-height: 90%;
    padding: 24px 16px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  margin-bottom: 8px;
`

const Title = styled.div`
  ${FontVariant.title_md}
  padding-top: 4px;
`

const PaperButton = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;
  background-color: ${Color.gray200};
  border-radius: 4px;
  border: none;
  padding: 8px 12px;
  margin-top: 4px;
  cursor: pointer;

  .icon {
    color: ${Color.red};
  }
`

const CloseButton = styled.button`
  position: relative;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;

  // draw 'x' icon
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 2px;
    background-color: ${Color.gray600};
  }
  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

const Content = styled.div`
  ${FontVariant.body_md}
  color: ${Color.black};
  max-height: 60vh;
  overflow-y: scroll;
  h1 {
    ${FontVariant.title_lg}
    margin-top: 24px;
  }
  h2 {
    ${FontVariant.title_md}
    margin-top: 16px;
  }
  img {
    max-width: 100%;
  }
  p {
    margin-top: 8px;
  }
  a {
    color: ${Color.black};
  }
`

interface Props {
  post: Post | null
  onClose: () => void
}

export const NewsModal = ({ post, onClose }: Props) => {
  const [mdContent, setMdContent] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modalRef, onClose])

  useEffect(() => {
    post &&
      fetch(`/posts/${post.contentMdFilePath}`)
        .then(response => response.text())
        .then(text => {
          const div = document.createElement('div')
          div.innerHTML = text
          setMdContent(div.textContent)
        })
  }, [post])

  if (!post) {
    return null
  } else {
    const currentDate = new window.Date()
    const expired = post.endsAt && post.endsAt < currentDate

    return (
      post && (
        <ModalContainer>
          <ModalCard ref={modalRef}>
            <Header>
              <div>
                <CategoryContainer labelsOnLeft>
                  {post.categories.map((category, i) => (
                    <Category key={i} style={{ backgroundColor: expired ? Color.gray400 : categoryColors[category] }}>
                      {category}
                    </Category>
                  ))}
                  {expired !== undefined &&
                    (expired ? (
                      <Category style={{ backgroundColor: Color.gray400 }}>Closed</Category>
                    ) : (
                      <Category style={{ backgroundColor: Color.gray400 }}>Open</Category>
                    ))}
                </CategoryContainer>
                <Title>{post.title}</Title>
              </div>
              <CloseButton onClick={onClose} />
            </Header>

            <NewsDate style={{ marginBottom: '8px' }}>{post.date.toDateString()}</NewsDate>
            <Content>
              <Markdown>{mdContent}</Markdown>
            </Content>
          </ModalCard>
        </ModalContainer>
      )
    )
  }
}
