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


  for (let i = 0; i < dayObj[0].appointments.length; i++) {
    const matchAppontment = arrAppointment.filter(a => a.id === dayObj[0].appointments[i]);
    results.push(matchAppontment[0]);
  }

  return results;
}
