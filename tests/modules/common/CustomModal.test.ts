import CustomModal from '@/modules/common/components/CustomModal.vue';
import { mount } from '@vue/test-utils';

describe('<CustomModal />', () => {
  test('should be renders with default default', () => {
    const wrapper = mount(CustomModal);

    const modal = wrapper.find('dialog');
    expect(modal.attributes('open')).toBeUndefined();
  });

  test('should renders dialog with header, body and actions slots', () => {
    const wrapper = mount(CustomModal, {
      slots: {
        header: `<span>Header content</span>`,
        body: `<span>Body content</span>`,
        actions: `<span>Footer content</span>`,
      },
    });

    expect(wrapper.text()).toContain('Header content');
    expect(wrapper.find('.my-5').text()).toContain('Body content');
    expect(wrapper.text()).toContain('Footer content');
  });

  test('should opens and closes dialog when open prop changes', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true,
      },
    });

    const modal = wrapper.find('dialog');
    expect(modal.attributes('open')).toBeDefined();

    await wrapper.setProps({ open: false });
    expect(modal.attributes('open')).toBeUndefined();
  });
});
