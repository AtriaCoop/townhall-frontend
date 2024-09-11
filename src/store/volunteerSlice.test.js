import volunteerSlice, {
  fetchVolunteers,
  fetchVolunteerById,
} from './volunteerSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('volunteerSlice', () => {
  let store;
  let mock;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        volunteers: volunteerSlice,
      },
    });
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should handle initial state', () => {
    const initialState = store.getState().volunteers;
    expect(initialState).toEqual({
      volunteers: [],
      volunteer: null,
      status: 'idle',
      error: null,
    });
  });

  it('should handle fetchVolunteers.pending', async () => {
    mock.onGet('http://localhost:8000/volunteers/').reply(200, []);

    const promise = store.dispatch(fetchVolunteers());

    const initialState = store.getState().volunteers;
    expect(initialState.status).toBe('loading');

    await promise;
  });

  it('should handle fetchVolunteers.fulfilled', async () => {
    const volunteersData = [{ id: 1, first_name: 'John', last_name: 'Doe' }];

    mock.onGet('http://localhost:8000/volunteers/').reply(200, volunteersData);

    await store.dispatch(fetchVolunteers());

    const state = store.getState().volunteers;
    expect(state.status).toBe('succeeded');
    expect(state.volunteers).toEqual(volunteersData);
  });

  it('should handle fetchVolunteers.rejected', async () => {
    mock.onGet('http://localhost:8000/volunteers/').reply(500);

    await store.dispatch(fetchVolunteers());

    const state = store.getState().volunteers;
    expect(state.status).toBe('failed');
    expect(state.error).toBeDefined();
  });

  it('should handle fetchVolunteerById.pending', async () => {
    const promise = store.dispatch(fetchVolunteerById(1));

    const state = store.getState().volunteers;
    expect(state.status).toBe('loading');

    await promise;
  });

  it('should handle fetchVolunteerById.fulfilled', async () => {
    const volunteerData = { id: 1, first_name: 'John', last_name: 'Doe' };

    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(200, volunteerData);

    await store.dispatch(fetchVolunteerById(1));

    const state = store.getState().volunteers;
    expect(state.status).toBe('succeeded');
    expect(state.volunteer).toEqual(volunteerData);
  });

  it('should handle fetchVolunteerById.rejected', async () => {
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(500);

    await store.dispatch(fetchVolunteerById(1));

    const state = store.getState().volunteers;
    expect(state.status).toBe('failed');
    expect(state.error).toBeDefined();
  });

  it('should handle the case where volunteer data is not found', async () => {
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(404);

    await store.dispatch(fetchVolunteerById(1));

    const state = store.getState().volunteers;
    expect(state.status).toBe('failed');
    expect(state.error).toBeDefined();
  });
});
