import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '@/ui/components/app/App.vue';
import TableItem from '@/ui/components/table/Table.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('<App/>', () => {
  let store, actions, mutations, app;

  beforeEach(() => {
    actions = {
      createANewTable: jest.fn(),
    };
    mutations = {
      setCells: jest.fn()
    };
    store = new Vuex.Store({
      mutations,
      actions
    });
    localVue.use(store);
    app = shallowMount(App, {
      store,
      localVue,
    });
  });

  it('Render right', () => {
    expect(app.find(TableItem).exists()).toBe(true);
  });

  it('Dispatches the createTable use case when App is loaded', () => {
    expect(actions.createANewTable).toHaveBeenCalled();
  });

  // TODO: Cómo testar que ha sido llamado con x params?
});
