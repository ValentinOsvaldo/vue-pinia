import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { useProjectsStore } from '@/modules/projects/stores/projects.store';
import { fakeProjects } from '../../mocks/projects.fake';

describe('<ProjectsView />', () => {
  const wrapper = mount(ProjectsView, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

  const store = useProjectsStore();

  beforeEach(() => {
    store.$patch({
      projects: fakeProjects,
    });
  });

  test('should be render with projects', () => {
    const tableRows = wrapper.findAll('tbody tr');

    expect(tableRows).toHaveLength(2);

    tableRows.forEach((row, index) => {
      const project = fakeProjects[index];
      const cell = row.findAll('td');

      expect(cell.at(0)?.text()).toBe(project.name);
      expect(cell.at(1)?.text()).toBe(project.tasks.length.toString());
    });
  });

  test('should call addProject method on modal', () => {
    const inputModal = wrapper.findComponent({ name: 'InputModal' });
    const newProjectName = 'New Project';

    inputModal.vm.$emit('value', newProjectName);

    expect(store.addProject).toHaveBeenCalledWith(newProjectName);
  });
});
