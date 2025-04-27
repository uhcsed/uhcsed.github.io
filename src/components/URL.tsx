'use client'

import styled from '@emotion/styled'
import { FontVariant, Color, Padding, Radius } from '@/app/theme'
import Link from 'next/link'

export const URL = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;    
  padding: 8px 16px;
  ${FontVariant.body_md}
  border-radius: ${Radius.sm};  
  width: fit-content;
  color: ${Color.gray900};


  &::before {
    content: '🔗';
    margin-right: 6px;
  }

  &[href*='youtu']::before {
    // Cover edge cases like youtu.be
    display: inline-block;
    content: url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/16px-YouTube_full-color_icon_%282017%29.svg.png');
    width: 16px;
    height: 16px;
  }

  &[href*='dl.acm.org']::before {
    content: url('https://dl.acm.org/pb-assets/head-metadata/favicon-16x16-1574252172003.png');
    display: inline-block;
    text-decoration: none;
    width: 16px;
    height: 16px;
  }
  
  &[href*='arxiv.org']::before {
    content: url('/images/arxiv-logo.svg');
    display: in-line-block;
    width: 16px;
    height: 16px;

  }

  &[href*='.pdf']::before {
    content: url('/images/pdf_icon.svg');
    display: in-line-block;
    width: 11px;
    height: 16px;
    margin-right: 6px;
  }
`
