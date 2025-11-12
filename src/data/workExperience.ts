export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const workExperiences: WorkExperience[] = [
  {
    id: '1',
    company: 'VibeMonitor.ai',
    position: 'Backend Engineer | AI Infrastructure',
    duration: 'Sep 2024 - Oct 2024',
    startDate: '2024-09',
    endDate: '2024-10',
    description: 'Built AI-powered RCA agent integrating Slack, GitHub, and Grafana with RAG pipeline using LangChain and LangGraph',
    achievements: [
      'Built AI-powered RCA agent integrating Slack, GitHub, and Grafana with RAG pipeline using LangChain and LangGraph',
      'Implemented LGTM stack (Loki, Grafana, Tempo, Mimir) with ClickHouse and vector database for real-time observability',
      'Collaborated with ex-Atlassian senior engineers on production-grade distributed systems and observability infrastructure'
    ],
    technologies: ['LangChain', 'LangGraph', 'Grafana', 'ClickHouse', 'Vector DB', 'Slack API']
  },
  {
    id: '2',
    company: 'Techsnap',
    position: 'Backend Developer Intern | FastAPI | Microservices',
    duration: 'Jul 2024 - Sep 2024',
    startDate: '2024-07',
    endDate: '2024-09',
    description: 'Developed scalable microservices using FastAPI and Django REST for enterprise LMS/CMS serving 10,000+ concurrent users',
    achievements: [
      'Developed scalable microservices using FastAPI and Django REST for enterprise LMS/CMS serving 10,000+ concurrent users',
      'Designed event-driven architecture with AWS EventBridge and SQS, achieving 99.5% message delivery reliability',
      'Orchestrated AWS cloud services (Lambda, ECS, RDS) for serverless auto-scaling, reducing costs by 30% while maintaining 99.9% availability'
    ],
    technologies: ['FastAPI', 'Django REST', 'AWS Lambda', 'EventBridge', 'SQS', 'ECS']
  },
  {
    id: '3',
    company: 'Software Incubator - Software Development Center',
    position: 'Backend Engineer | Django Developer',
    duration: 'Jun 2023 - Aug 2024',
    startDate: '2023-06',
    endDate: '2024-08',
    description: 'Architected scalable cloud-native microservices with FastAPI and Django REST Framework, delivering 99.9% uptime',
    achievements: [
      'Architected scalable cloud-native microservices with FastAPI and Django REST Framework, delivering 99.9% uptime',
      'Designed secure RESTful APIs with OAuth2.0 and JWT authentication, accelerating client integration by 35%',
      'Mentored team of 4+ junior developers in backend best practices, boosting team velocity by 20%'
    ],
    technologies: ['Django', 'FastAPI', 'OAuth2.0', 'JWT', 'PostgreSQL', 'Docker']
  }
];
