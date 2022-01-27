import { useState, useEffect } from "react";
import axios from "axios";
import { getDailySpots } from "helpers/selectors";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    // const daysURL = `api/days`;
    // axios.get(daysURL).then(response => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }));
      // console.log(all[0]); // first
      // console.log(all[1]); // second
      // console.log(all[2]); // third

      // const [first, second, third] = all;

      // console.log(first, second, third);
    });
    //});
  }, []);



  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.put(`/api/appointments/${id}`, appointment)
        .then(() => {
          const days = remainingSpots(state, appointments);
          setState(prev => ({ ...prev, appointments, days }));
        })
    );


  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.delete(`/api/appointments/${id}`, appointment)
        .then(() => {
          const days = remainingSpots(state, appointments);
          setState({ ...state, appointments, days });
        })
    );
  }

  function remainingSpots(state, appointments) {

    const index = state.days.findIndex(d => d.name === state.day);
    const dayObj = state.days[index];

    const spots = getDailySpots(dayObj, appointments)
    const day = { ...dayObj, spots };

    return state.days.map(d => d.name === state.day ? day : d);
  }



  return { state, setDay, bookInterview, cancelInterview, remainingSpots };


}
