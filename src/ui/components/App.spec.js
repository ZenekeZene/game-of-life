import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '@/ui/components/App.vue';
import TableItem from '@/ui/components/table/Table.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('<App/>', () => {
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      createANewTable: jest.fn(),
    };
    store = new Vuex.Store({
      actions
    });
    localVue.use(store);
  });

  it('Render right', () => {
    const app = shallowMount(App, {
      store,
      localVue,
    });
    expect(app.find(TableItem).exists()).toBe(true);
  });

  it('Dispatches the createTable use case when App is loaded', () => {
    const app = shallowMount(App, {
      store,
      localVue,
    });
    expect(actions.createANewTable).toHaveBeenCalled();
  });
});
