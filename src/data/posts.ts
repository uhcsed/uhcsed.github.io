interface Props {
  title: string
  date: Date
  categories: readonly string[]
  summary: string
  contentMdFilePath?: string // Add path to markdown file if exists. Path should be relative to /public/posts/
  endsAt?: Date // Add if the post has a deadline
}

export interface Post extends Props {}
export class Post {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

export const POSTS: Post[] = [
  {
    title: '"From Prompts to Propositions: A Logic-Based Lens on Student-LLM Interactions" is accepted to Koli Calling 2025',
    date: new Date('2025-09-07'), // Using today's date as acceptance announcement date
    categories: [''],
    summary:
      'Our paper introducing Prompt2Constraints, a novel method that translates student prompts into logical constraints, has been accepted to Koli Calling 2025. The research analyzed 1,872 prompts from 203 students and provides new insights into how students interact with LLMs for programming tasks. [Paper](https://arxiv.org/abs/2504.18691).',
  },
  {
    title: 'New preprint! 🚀 ',
    date: new Date('2025-04-26'),
    categories: [''],
    summary:
      "In our recent paper, it was great to work with James Prather, Brent Reeves, Paul Denny, Juho Leinonen, Stephen MacNeil, Andrew Luxton-Reilly, João Orvalho, Amin Alipour, Thezyrie Amarouche, Bailey Kimmel, Jared Wright, Musa Blake, and Gweneth Barbre on investigating how people speaking different languages — including Arabic, Portuguese, and Mandarin — use prompts to solve programming problems. [Paper](https://arxiv.org/pdf/2412.12800).",
  },
  {
    title: 'Today Daniel presented our work at the Koli Calling 24 conference',
    date: new Date('2024-11-15'),
    categories: [''],
    summary: 'You can find the paper [here](https://dl.acm.org/doi/10.1145/3699538.3699567).',
  },
  {
    title: 'A paper accepted to SIGCSE 2024!',
    date: new Date('2024-03'),
    categories: [''],
    summary: 'Our paper titled "Trust in Generative AI among students: An Exploratory Study" got accepted at the International Technical Symposium on Computer Science Education (SIGCSE TS) 2024'
  },
] as const satisfies Post[]

POSTS.sort((a, b) => b.date.getTime() - a.date.getTime())