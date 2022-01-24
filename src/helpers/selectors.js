export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const results = [];
  //get the array of appointments for that day
  const dayObj = state.days.filter(d => d.name === day);
  // validate edge cases
  if (!state.days || !dayObj[0])
    return results;

  //turn appointments in an iterable object
  const arrAppointment = Object.values(state.appointments);

  for (const app of dayObj[0].appointments) {
    const matchAppontment = arrAppointment.filter(a => a.id === app);
    results.push(matchAppontment[0]);
  }

  return results;
}

export function getInterview(state, interview) {
  const result = {};
  const interviewAppointments = Object.values(state.appointments).filter(a => a.interview);

  for (const a of interviewAppointments) {
    if (a.interview === interview) {
      result.student = a.interview.student;
      result.interviewer = state.interviewers[a.interview.interviewer]
    }
  }
  if (!interview)
    return null;

  return result;
}
