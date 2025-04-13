import type { Project } from '@/modules/projects/interfaces/project.interface';

export const fakeProjects: Project[] = [
  {
    id: '1',
    name: 'Project 1',
    tasks: [
      { id: '1', name: 'Task 1', completedAt: new Date() },
      { id: '2', name: 'Task 2' },
      { id: '3', name: 'Task 3' },
      { id: '4', name: 'Task 4' },
      { id: '5', name: 'Task 5' },
    ],
  },
  {
    id: '2',
    name: 'Project 2',
    tasks: [],
  },
];
