import { MEMBERS, Member } from './members'

export const PublicationTypes = ['Conference', 'Poster', 'Workshop', 'Journal', 'Preprint'] as const
export type PublicationType = (typeof PublicationTypes)[number]

export const ResearchTopics = {
  'Computing Education': { emoji: '🎓' },
  'AI in Education': { emoji: '🤖' },
  'Learning': { emoji: '🌐' },
  'Student Behavior': { emoji: '👨‍🎓' },
  'Trust in AI': { emoji: '🔍' },
  'Instructional Design': { emoji: '📝' },
  'Programming Education': { emoji: '👨‍💻' }
}
export type ResearchTopicType = keyof typeof ResearchTopics

export enum PublicationLinkType {
  PDF = 'PDF',
  SLI = 'Slides',
  POS = 'Poster',
  ACM = 'ACM DL',
  WEB = 'Website',
  VID = 'Video',
  TRA = 'Trailer',
  ARX = 'arXiv',
}

interface Props {
  title: string
  authors: (Member | string)[]
  year: number
  venue: string
  topics: ResearchTopicType[]
  type: PublicationType
  award?: string
  links?: { url: string; type: PublicationLinkType }[]
}

export interface Publication extends Props {}
export class Publication {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

export const PUBLICATIONS: Publication[] = [
  {
    title: "Breaking the Programming Language Barrier: Multilingual Prompting to Empower Non-Native English Learners",
    authors: [
      'James Prather', 
      'Brent N Reeves', 
      'Paul Denny', 
      'Juho Leinonen', 
      'Stephen MacNeil', 
      'Andrew Luxton-Reilly', 
      'João Orvalho', 
      MEMBERS.amin, 
      MEMBERS.Ali, 
      'Thezyrie Amarouche', 
      'Bailey Kimmel', 
      'Jared Wright', 
      'Musa Blake', 
      'Gweneth Barbre'
    ],
    venue: 'ACE 25',
    year: 2025,
    topics: ['Computing Education', 'Learning', 'Programming Education'],
    type: 'Conference',
    links: [
      {
        url: 'https://dl.acm.org/doi/full/10.1145/3716640.3716649',
        type: PublicationLinkType.ACM,
      },
    ],
  },
  {
    title: 'To Google or To ChatGPT? A Comparison of CS2 Students Information Gathering Approaches and Outcomes',
    authors: [
      'Aayush Kumar', 
      MEMBERS.Daniel, 
      MEMBERS.amin, 
      'Sruti Srinivasa Ragavan'
    ],
    venue: '',
    year: 2025,
    topics: ['Computing Education', 'Learning', 'Programming Education', 'Student Behavior', 'AI in Education'],
    type: 'Preprint',
    links: [
      {
        url: 'https://arxiv.org/abs/2501.11935',
        type: PublicationLinkType.ARX,
      },
    ],
  },
  {
    title: 'Students and Instructors Reflections on the Impact of COVID-19 on Computer Science Education after One Year of Remote Teaching',
    authors: [
      'Giulia Toti',
      'Lei Si',
      'David Daniels',
      MEMBERS.Matin,
      MEMBERS.amin,
      'Guoning Chen'
    ],
    venue: 'Discover Education',
    year: 2025,
    topics: ['Computing Education', 'Learning', 'Instructional Design'],
    type: 'Journal',
    links: [
      {
        url: 'https://link.springer.com/article/10.1007/s44217-025-00438-1',
        type: PublicationLinkType.WEB,
      },
    ],
  },
  {
    title: 'Student-AI Interaction: A Case Study of CS1 students',
    authors: [
      MEMBERS.Matin,
      'Daye Nam',
      MEMBERS.Daniel,
      MEMBERS.Ali,
      'James Prather',
      'Michael Hilton',
      'Sruti Srinivasa Ragavan',
      MEMBERS.amin
    ],
    venue: 'Koli Calling 24',
    year: 2024,
    topics: ['Computing Education', 'Learning', 'Programming Education', 'Student Behavior', 'AI in Education'],
    type: 'Conference',
    links: [
      {
        url: 'https://dl.acm.org/doi/abs/10.1145/3699538.3699567',
        type: PublicationLinkType.ACM,
      },
    ],
  },
  {
    title:
      "Trust in Generative AI among Students: An exploratory study",
      authors: [
        MEMBERS.Matin,
        'David Daniels',
        'Daye Nam',
        'Aayush Kumar',
        'Stella Chen',
        'Michael Hilton',
        'Sruti Srinivasa Ragavan',
        MEMBERS.amin
      ],
    venue: 'SIGCSE 2024',
    year: 2024,
    topics: ['Computing Education', 'Learning', 'Programming Education', 'Student Behavior', 'AI in Education'],
    type: 'Conference',
    links: [
      {
        url: 'https://dl.acm.org/doi/abs/10.1145/3626252.3630842',
        type: PublicationLinkType.ACM,
      },
    ],
  },
  {
    title:
      'Towards characterizing trust in generative artificial intelligence among students',
      authors: [
        MEMBERS.Matin,
        'David Daniels',
        'Stella Chen',
        'Daye Nam',
        'Aayush Kumar',
        'Michael Hilton',
        MEMBERS.amin,
        'Sruti Srinivasa Ragavan'
      ],
    venue: 'ICER 23',
    year: 2023,
    topics: ['Computing Education', 'Trust in AI', 'AI in Education'],
    type: 'Poster',
    links: [
      {
        url: 'https://dl.acm.org/doi/abs/10.1145/3568812.3603469',
        type: PublicationLinkType.ACM,
      },
    ],
  },
] as const satisfies Publication[]

export const PREPRINTS: Publication[] = PUBLICATIONS.filter(p => p.type === 'Preprint')
export const PUBLICATIONS_BY_YEAR: Record<string, Publication[]> = PUBLICATIONS.reduce(
  (acc, publication) => {
    if (publication.type === 'Preprint') return acc // skip preprints
    const yearKey = publication.year
    if (!acc[yearKey]) acc[yearKey] = [] as Publication[]
    acc[yearKey].push(publication)
    return acc
  },
  {} as Record<number, Publication[]>
)