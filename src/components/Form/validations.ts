export const weekDays = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo',
  'Todos',
];

export function sortWeekdays(days: []): [] {
  return days.sort((a, b) => {
    const dayIndexA = weekDays.indexOf(a);
    const dayIndexB = weekDays.indexOf(b);
    return dayIndexA - dayIndexB;
  });
}
