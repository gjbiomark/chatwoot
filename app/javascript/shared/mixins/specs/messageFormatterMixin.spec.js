import { shallowMount } from '@vue/test-utils';
import messageFormatterMixin from '../messageFormatterMixin';

describe('messageFormatterMixin', () => {
  it('returns correct plain text', () => {
    const Component = {
      render() {},
      mixins: [messageFormatterMixin],
    };
    const wrapper = shallowMount(Component);
    const message =
      '<b>This is a Biomark Internal Messaging app https://www.biomarking.com</b>';
    expect(wrapper.vm.getPlainText(message)).toMatch(
      'This is a Biomark Internal Messaging app https://www.biomarking.com'
    );
  });
});
