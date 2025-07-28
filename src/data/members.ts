export const UHPositions = [
  'Faculty',
  'Ph.D. Student',
  'Alumni', // Añadido para manejar miembros alumni sin posición específica
] as const;
export type UHPositionTypes = (typeof UHPositions)[number];

export const SeasonTypes = ["Winter", "Spring", "Summer", "Fall"] as const;
export type SeasonType = (typeof SeasonTypes)[number];

interface Props {
  firstName: string;
  lastName: string;
  LinkedIn?: string;
  position?: UHPositionTypes; // Ahora es opcional
  img?: string;
  site?: string;
  msThesis?: string;
  phdThesis?: string;
  startYear?: number;
  startSeason?: SeasonType; // Add startSeason
  endYear?: number
  endSeason?: SeasonType; // Add endSeason
  isAlumni?: boolean;
  affiliation?: string;
  currentPosition?: string;
}

export interface Member extends Props {}
export class Member {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

export const MEMBERS = {
  amin: {
    firstName: "Amin",
    lastName: "Alipour",
    LinkedIn: "https://www.linkedin.com/in/alipourm/",
    position: "Faculty",
    currentPosition: 'Associate Professor',
    img: "Amin.jpg",
    isAlumni: false,
  },
  Matin: {
    firstName: "Matin",
    lastName: "Amoozadeh",
    LinkedIn: "https://www.linkedin.com/in/matin-amoozadeh-87b8231b3/",
    position: "Ph.D. Student",
    img: "Matin.jpg",
    isAlumni: false,
  },
  Ali: {
    firstName: "Ali",
    lastName: "Alfageeh",
    LinkedIn: "https://www.linkedin.com/in/ali-alfageeh-182755132/",
    position: "Ph.D. Student",
    img: "Ali.jpg",
    isAlumni: false,
  },
  Mahdi: {
    firstName: "Mahdi",
    lastName: "Kazemi",
    LinkedIn: "https://www.linkedin.com/in/sadegh-almahdi-kazemi/",
    position: "Ph.D. Student",
    img: "Mahdi.jpg",
    isAlumni: false,
  },
  Daniel: {
    firstName: "Daniel",
    lastName: "Prol",
    LinkedIn: "https://www.linkedin.com/in/dannyprol/",
    position: "Ph.D. Student",
    img: 'Daniel.jpg',
    isAlumni: false,
  },
  aftab: {
    firstName: 'Aftab',
    lastName: 'Hussain',
    startYear: 2020,
    startSeason: 'Fall',
    endYear: 2024,
    endSeason: 'Fall',
    isAlumni: true,
  },
  rabin: {
    firstName: 'Md. Rafiqul Islam',
    lastName: 'Rabin',
    startYear: 2018,
    startSeason: 'Fall',
    endYear: 2023,
    endSeason: 'Spring',
    isAlumni: true,
  },
  soodeh: {
    firstName: 'Soodeh',
    lastName: 'Atefi',
    startYear: 2018,
    startSeason: 'Fall',
    endYear: 2023,
    endSeason: 'Summer',
    isAlumni: true,
    affiliation: 'Co-advised with Dr. Aron Laszka',
  },
  farman: {
    firstName: 'Farman Ali',
    lastName: 'Pirzado',
    startYear: 2023,
    startSeason: 'Fall',
    endYear: 2024,
    endSeason: 'Spring',
    isAlumni: true,
    affiliation: 'Visiting PhD student at Tecnológico de Monterrey',
  },
  quang: {
    firstName: 'Quang',
    lastName: 'Lieu',
    isAlumni: true,
    currentPosition: "Undergraduate Researcher, Won the Provost's Undergraduate Research Scholarship in 2023"
  },
  bader:{
    firstName: 'Bader',
    lastName: 'Alkhazi',
    isAlumni: true,
    startYear: 2022,
    startSeason: "Fall",
    endYear: 2023,
    endSeason: "Spring",
    currentPosition: 'visiting scholar from Kuwait University'
  },
  david:{
    firstName: 'David',
    lastName: 'Daniels',
    isAlumni: true,
    currentPosition: 'undergraduate researcher, 2023'
  },
  andrew:{
    firstName: 'Andrew',
    lastName: 'Truelove',
    isAlumni: true,
    currentPosition: "Undergraduate Researcher, Won Provost's Undergraduate Research Scholarship in 2018."
  }
} as const satisfies Record<string, Member>;
  
export const ALUMNI_MEMBERS = Object.fromEntries(Object.entries(MEMBERS).filter(([, member]) => member.isAlumni));
export const CURRENT_MEMBERS = Object.fromEntries(
  Object.entries(MEMBERS).filter(([, member]) => !member.isAlumni)
);

const categorizeByPosition = (members: Record<string, Member>): Record<string, Member[]> => {
  // Inicializa un objeto para agrupar miembros
  const groupedMembers: Record<string, Member[]> = {};
  
  // Para cada miembro
  Object.values(members).forEach(member => {
    // Si es alumni y no tiene posición definida, asigna a la categoría "Alumni"
    const pos = member.isAlumni && !member.position ? "Alumni" : (member.position || "Uncategorized");
    
    // Inicializa el array si no existe
    if (!groupedMembers[pos]) {
      groupedMembers[pos] = [];
    }
    
    // Añade el miembro al grupo correspondiente
    groupedMembers[pos].push(member);
  });

  const seasonOrder = ['Winter', 'Spring', 'Summer', 'Fall'];

  // Ordena cada grupo
  for (const position in groupedMembers) {
    groupedMembers[position].sort((a, b) => {
      const aIsAlumni = a.isAlumni ?? false;
      const bIsAlumni = b.isAlumni ?? false;

      // Si ambos tienen endYear, compara por endYear
      if (a.endYear && b.endYear) {
        if (a.endYear !== b.endYear) {
          return b.endYear - a.endYear;
        }
        
        // Si endYear es igual, compara por endSeason
        if (a.endSeason && b.endSeason) {
          const aEndSeasonIndex = seasonOrder.indexOf(a.endSeason);
          const bEndSeasonIndex = seasonOrder.indexOf(b.endSeason);
          if (aEndSeasonIndex !== bEndSeasonIndex) {
            return bEndSeasonIndex - aEndSeasonIndex;
          }
        }
      }
      
      // Si no tienen endYear o son iguales, compara por startYear
      if (a.startYear && b.startYear && a.startYear !== b.startYear) {
        return b.startYear - a.startYear;
      }
      
      // Si no hay años para comparar o son iguales, ordena alfabéticamente por apellido
      return a.lastName.localeCompare(b.lastName);
    });
  }

  return groupedMembers;
};

export const CURRENT_MEMBERS_BY_POSITION = categorizeByPosition(CURRENT_MEMBERS);
export const ALUMNI_MEMBERS_BY_POSITION = categorizeByPosition(ALUMNI_MEMBERS);