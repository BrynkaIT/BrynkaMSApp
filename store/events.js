export const state = () => {
	return {
		events: [{ name: 'Event', _id: null }]
	}
}

// Mutations
export const mutations = {
	setEvents(state, events) {
		state.events = [{ name: 'Event', _id: null }]
		if (events != null && events.length > 0) {
			events.forEach(event => {
				state.events.push(event)
			})
		}
	},

}

// Actions
export const actions = {
	getEvents({ commit }, query) {
		query = query || ''
		return this.$axios.$get(`/events${query}`)
			.then(res => {
				commit('setEvents', res.events )
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},
	getEvent({ commit }, eventId) {
		return this.$axios.$get(`/events/${eventId}`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},

	postEvent({ commit }, events) {
		return this.$axios.$post('/events', events )
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	putEvent({ commit }, eventToEdit) {
		return this.$axios.$put(`/events/${ eventToEdit.id }`, eventToEdit)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	deleteEvent({ commit }, eventId) {
		return this.$axios.$delete(`/events/${ eventId }`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	}

}
