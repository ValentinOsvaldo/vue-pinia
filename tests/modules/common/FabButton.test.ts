import FabButton from '@/modules/common/components/FabButton.vue';
import { shallowMount } from '@vue/test-utils';

describe('<FabButton />', () => {
  test('should  renders with default position', () => {
    const wrapper = shallowMount(FabButton);

    expect(wrapper.props('position')).toBe('bottom-right');

    const buttonClasses = wrapper.find('button').classes();
    const classesToHave = [
      'btn',
      'btn-circle',
      'btn-secondary',
      'fixed',
      'size-14',
      'bottom-right',
    ];

    expect(buttonClasses).toEqual(classesToHave);
  });

  test('should renders with top-left position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-left',
      },
    });

    expect(wrapper.find('button').classes()).toContain('top-left');
    expect(wrapper.props('position')).toBe('top-left');
  });

  test('should renders slot content inside button', async () => {
    const wrapper = shallowMount(FabButton, {
      slots: {
        default: `<span>Hello</span>`,
      },
    });

    const slotContent = wrapper.find('button span');

    expect(slotContent.exists()).toBeTruthy();
    expect(slotContent.text()).toBe('Hello');
  });
});
