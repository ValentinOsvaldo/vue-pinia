import { useProjectsStore } from '@/modules/projects/stores/projects.store';
import { createPinia, setActivePinia } from 'pinia';
import { fakeProjects } from '../../../mocks/projects.fake';

describe('useProjectsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test('should return defaults value', () => {
    const {
      isEmpty,
      addProject,
      addTaskToProject,
      projectList,
      projects,
      projectsWithCompletion,
      toggleTask,
    } = useProjectsStore();

    expect(isEmpty).toBe(true);
    expect(projectList).toEqual([]);
    expect(projects).toEqual([]);
    expect(projectsWithCompletion).toEqual([]);
    expect(addProject).toBeInstanceOf(Function);
    expect(addTaskToProject).toBeInstanceOf(Function);
    expect(toggleTask).toBeInstanceOf(Function);
  });

  test('should add a project - action', () => {
    const store = useProjectsStore();
    const newProjectName = 'New project';

    store.addProject(newProjectName);

    expect(store.projects.length).toBe(1);
    expect(store.projects[0]).toEqual({
      id: expect.any(String),
      name: newProjectName,
      tasks: [],
    });
  });

  test('should load from localStorage', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));

    const store = useProjectsStore();

    const [project1] = store.projects;

    expect(project1).toEqual({
      ...fakeProjects.at(0),
      tasks: expect.any(Array),
    });

    expect(store.projects).toHaveLength(2);
  });

  test('should add task to a project', () => {
    const store = useProjectsStore();
    store.addProject('New project');
    const project = store.projects.at(0)!;
    const taskName = 'New task';

    store.addTaskToProject(project.id, taskName);

    expect(project.tasks.length).toBe(1);
    expect(project.tasks.at(0)).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: undefined,
    });
  });

  test('should toggle task to a project', () => {
    const store = useProjectsStore();
    store.addProject('New project');
    const project = store.projects.at(0)!;
    const taskName = 'New task';

    store.addTaskToProject(project.id, taskName);

    const task = project.tasks.at(0)!;

    store.toggleTask(project.id, task.id);

    expect(project.tasks.at(0)).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: expect.any(Date),
    });
  });

  test('should return the projects with completion', () => {
    const store = useProjectsStore();

    store.$patch((state) => {
      state.projects = fakeProjects;
    });

    expect(store.projectsWithCompletion).toEqual([
      { id: '1', name: 'Project 1', taskCount: 5, completion: 20 },
      { id: '2', name: 'Project 2', taskCount: 0, completion: 0 },
    ]);
  });
});
