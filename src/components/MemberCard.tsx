'use client'

import React from 'react'
import styled from '@emotion/styled'
import { FontVariant, Color } from '@/app/theme'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { Member } from '@/data/members'
import Link from 'next/link'

const Card = styled.div`
  max-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${FontVariant.body_md}
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  border-radius: 50%;
  overflow: hidden;
`

const MemberImage = styled(ImageWithFallback)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Name = styled.span`
  ${FontVariant.body_lg}
  color: ${Color.gray900};
`

const Affiliation = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${Color.gray700};
`

const Buttons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`

const EmailButton = styled.a`
  content: url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/72px-LinkedIn_icon.svg.png');
  width: 30px;
  height: 30px;
  cursor: pointer;

  color: ${Color.white};
` as any;


interface Props {
  member: Member
}

export const MemberCard = ({ member }: Props) => {
  return (
    <Card>
      <ImageContainer>
        <MemberImage
          placeholder="blur"
          blurDataURL="/members/default.png"
          fallbackSrc="/members/default.png"
          width={180}
          height={180}
          src={`/members/${member.img}`}
          alt={member.firstName}
        />
      </ImageContainer>
      <Info>
        <Name>
          {member.firstName} {member.lastName}
        </Name>
        <Affiliation>
          {member.currentPosition ||
            ((member.position === 'Faculty' || member.position === 'Ph.D. Student') &&
              member.affiliation)}
        </Affiliation>
        <Buttons>
          {member.LinkedIn && <EmailButton href={`${member.LinkedIn}`} />}
        </Buttons>
      </Info>
    </Card>
  )
}
