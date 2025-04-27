interface Props {
  url: string
  title: string
  id: string
  date: Date
}

export interface Video extends Props {}
export class Video {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

export const VIDEOS: Video[] = [
  {
    url: 'https://www.youtube.com/embed/VvMDw6uwHM8?si=mbbsFaoeV3ZMmVy8',
    id: 'VvMDw6uwHM8',
    title: 'Student-AI Interaction: A Case Study of CS1 students',
    date: new Date('2024-11-15'),
  },
  {
    url: 'https://www.youtube.com/embed/VvMDw6uwHM8?si=mbbsFaoeV3ZMmVy8',
    id: 'VvMDw6uwHM8',
    title: 'Student-AI Interaction: A Case Study of CS1 students',
    date: new Date('2024-11-15'),
  },
  {
    url: 'https://www.youtube.com/watch?v=VvMDw6uwHM8',
    id: 'VvMDw6uwHM8',
    title: 'Student-AI Interaction: A Case Study of CS1 students',
    date: new Date('2024-11-15'),
  },
] as const satisfies Video[]
