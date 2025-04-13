export const groupMessagesByDate = (messages) => {
  const grouped = messages.reduce((groups, message) => {
    const dateKey = message.time
      ? new Date(message.time).toDateString()
      : new Date(message.createdAt).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
    return groups;
  }, {});

  const sorted = Object.entries(grouped)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))

    .reduce((acc, [key, value]) => {
      acc[key] = value.sort((a, b) => new Date(a.time) - new Date(b.time));
      return acc;
    }, {});

  return sorted;
};
