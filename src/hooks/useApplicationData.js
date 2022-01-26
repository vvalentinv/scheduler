import { useState, useEffect } from "react";
import axios from "axios";


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
        .then(() => setState(prev => ({ ...prev, appointments })))
      // .catch(err => console.log(err.message))

    );


  }

  function cancelInterview(id) {
    // find appointment
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
        .then(() => setState({ ...state, appointments }))
    );
  }

  return { state, setDay, bookInterview, cancelInterview };
}
