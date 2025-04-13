/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from '@vue/test-utils';
import ProjectView from '@/modules/projects/views/ProjectView.vue';
import { useProjectsStore } from '@/modules/projects/stores/projects.store';
import { fakeProjects } from '../../mocks/projects.fake';
import { useRouter } from 'vue-router';
import type { Mock } from 'vitest';

vi.mock('vue-router');
vi.mock('@/modules/projects/stores/projects.store');

describe('<ProjectView />', () => {
  test('should be render a project', () => {
    (useProjectsStore as any).mockReturnValue({
      projectList: fakeProjects,
    });

    const wrapper = mount(ProjectView, {
      props: { id: '1' },
      global: {
        stubs: ['RouterLink'],
      },
    });

    const tableRows = wrapper.findAll('tr.hover\\:bg-base-300');

    expect(tableRows.length).toBe(5);
  });

  test('should redurect to projects if projectId not found', () => {
    (useProjectsStore as any).mockReturnValue({
      projectList: [],
    });

    const replaceSpy = vi.fn();
    (useRouter as Mock).mockReturnValue({
      replace: replaceSpy,
    });

    mount(ProjectView, {
      props: { id: '1' },
      global: {
        stubs: ['RouterLink'],
      },
    });

    expect(replaceSpy).toHaveBeenCalledWith('/');
  });
});
