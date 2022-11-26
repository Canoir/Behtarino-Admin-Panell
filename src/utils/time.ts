export function removeSeconds(time: string) {
  const parts = time?.split(':');
  if (parts?.length > 1) return parts.slice(0, 2).join(':');
  return time;
}
