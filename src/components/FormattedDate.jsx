import { useFormatter } from 'next-intl';

export function FormattedDate({ date, ...props }) {
  const format = useFormatter();

  return (
    <time dateTime={date.toISOString()} {...props}>
      {format.dateTime(date, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </time>
  );
}
