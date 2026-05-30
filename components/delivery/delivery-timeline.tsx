import { DeliveryEvent } from "@/types/delivery";
import { formatDate } from "@/lib/utils";

interface DeliveryTimelineProps {
  events: DeliveryEvent[];
}

export function DeliveryTimeline({ events }: DeliveryTimelineProps) {
  if (events.length === 0) {
    return (
      <p className="px-5 py-10 text-sm text-slate-500 dark:text-slate-400 text-center">
        Nenhum evento registrado no histórico.
      </p>
    );
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <ol className="px-5 py-6">
      {sortedEvents.map((event, index) => {
        const isLast = index === sortedEvents.length - 1;

        return (
          <li
            key={`${event.date}-${event.location}-${index}`}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {!isLast && (
              <span
                className="absolute left-[9px] top-5 bottom-0 w-px bg-slate-200 dark:bg-slate-700"
                aria-hidden="true"
              />
            )}
            <span
              className={`relative z-10 mt-1 h-[18px] w-[18px] shrink-0 rounded-full transition-colors duration-200 ${
                isLast
                  ? "bg-blue-600 dark:bg-blue-500 border-0"
                  : "border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
              }`}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1 space-y-1">
              <time
                dateTime={event.date}
                className="block text-xs text-slate-400 dark:text-slate-500"
              >
                {formatDate(event.date)}
              </time>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {event.location}
              </p>
              <p className="text-base text-slate-900 dark:text-slate-100">
                {event.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
