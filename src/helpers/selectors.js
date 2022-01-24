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
