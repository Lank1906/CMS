const validTransitions = {
  Planning: ['InProgress', 'Cancelled'],
  InProgress: ['Completed', 'Overdue', 'Cancelled'],
  Completed: [],
  Cancelled: [],
  Overdue: ['Completed'],
};

export const isValidStatusChange = (current, next) => {
  return validTransitions[current]?.includes(next);
};
