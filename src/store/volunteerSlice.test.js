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
    // ARRANGE: Set up the Redux store and mock adapter for axios
    store = configureStore({
      reducer: {
        volunteers: volunteerSlice,
      },
    });
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    // CLEANUP: Reset the mock after each test
    mock.reset();
  });

  it('should handle initial state', () => {
    // ARRANGE: Retrieve the initial state from the store
    const initialState = store.getState().volunteers;

    // ASSERT: Check if the initial state matches the expected shape
    expect(initialState).toEqual({
      volunteers: [],
      volunteer: null,
      status: 'idle',
      error: null,
    });
  });

  it('should handle fetchVolunteers.pending', async () => {
    // ARRANGE: Set up mock response for fetching volunteers
    mock.onGet('http://localhost:8000/volunteers/').reply(200, []);

    // ACT: Dispatch fetchVolunteers action
    const promise = store.dispatch(fetchVolunteers());

    // ASSERT: Check if the status is updated to 'loading' after dispatching
    const initialState = store.getState().volunteers;
    expect(initialState.status).toBe('loading');

    // AWAIT: Wait for the action to complete
    await promise;
  });

  it('should handle fetchVolunteers.fulfilled', async () => {
    // ARRANGE: Prepare mock data and response for successful fetching
    const volunteersData = [{ id: 1, first_name: 'John', last_name: 'Doe' }];
    mock.onGet('http://localhost:8000/volunteers/').reply(200, volunteersData);

    // ACT: Dispatch fetchVolunteers action
    await store.dispatch(fetchVolunteers());

    // ASSERT: Check if the state is updated to 'succeeded' and data is populated
    const state = store.getState().volunteers;
    expect(state.status).toBe('succeeded');
    expect(state.volunteers).toEqual(volunteersData);
  });

  it('should handle fetchVolunteers.rejected', async () => {
    // ARRANGE: Set up mock response to simulate an API failure
    mock.onGet('http://localhost:8000/volunteers/').reply(500);

    // ACT: Dispatch fetchVolunteers action
    await store.dispatch(fetchVolunteers());

    // ASSERT: Check if the state is updated to 'failed' and an error is defined
    const state = store.getState().volunteers;
    expect(state.status).toBe('failed');
    expect(state.error).toBeDefined();
  });

  it('should handle fetchVolunteerById.pending', async () => {
    // ACT: Dispatch fetchVolunteerById action
    const promise = store.dispatch(fetchVolunteerById(1));

    // ASSERT: Check if the status is set to 'loading' when the action is dispatched
    const state = store.getState().volunteers;
    expect(state.status).toBe('loading');

    // AWAIT: Wait for the action to complete
    await promise;
  });

  it('should handle fetchVolunteerById.fulfilled', async () => {
    // ARRANGE: Prepare mock data for fetching a specific volunteer by ID
    const volunteerData = { id: 1, first_name: 'John', last_name: 'Doe' };
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(200, volunteerData);

    // ACT: Dispatch fetchVolunteerById action
    await store.dispatch(fetchVolunteerById(1));

    // ASSERT: Check if the state is updated to 'succeeded' and the volunteer data is populated
    const state = store.getState().volunteers;
    expect(state.status).toBe('succeeded');
    expect(state.volunteer).toEqual(volunteerData);
  });

  it('should handle fetchVolunteerById.rejected', async () => {
    // ARRANGE: Set up mock response to simulate an API failure
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(500);

    // ACT: Dispatch fetchVolunteerById action
    await store.dispatch(fetchVolunteerById(1));

    // ASSERT: Check if the state is updated to 'failed' and an error is defined
    const state = store.getState().volunteers;
    expect(state.status).toBe('failed');
    expect(state.error).toBeDefined();
  });

  it('should handle the case where volunteer data is not found', async () => {
    // ARRANGE: Set up mock response to return a 404 status code
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(404);

    // ACT: Dispatch fetchVolunteerById action
    await store.dispatch(fetchVolunteerById(1));

    // ASSERT: Check if the state is updated to 'failed' and an error is defined
    const state = store.getState().volunteers;
    expect(state.status).toBe('failed');
    expect(state.error).toBeDefined();
  });
});
