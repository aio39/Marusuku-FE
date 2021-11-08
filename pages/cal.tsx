import CalendarClass, {
  Props as CalendarProps,
} from '@toast-ui/react-calendar';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { forwardRef, useRef, useState } from 'react';
import useSWR from 'swr';
import { IEvents } from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
// import 'tui-date-picker/dist/tui-date-picker.css';
// import 'tui-time-picker/dist/tui-time-picker.css';
// enum viewModeEnum {
//   Day = 'day',
//   Week = 'week',
//   month = 'month',
// }
type viewModeEnum = 'month' | 'week' | 'day';

const TuiCalendar = dynamic<CalendarClass>(
  () => import('../components/ToastCalWrapper'),
  {
    ssr: false,
  }
);
const CalendarWithForwardedRef = forwardRef<CalendarClass, CalendarProps>(
  (props, ref) => (
    // @ts-ignore:next-line
    <TuiCalendar {...props} forwardedRef={ref} />
  )
);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const calendarOptions = {
  // sort of option properties.
};

const CalendarPage = () => {
  const { data, error } = useSWR('/api/schedule', fetcher);
  const [viewMode, setViewMode] = useState<viewModeEnum>('month');
  const calendarRef = useRef<CalendarClass>(null);
  console.log(data);
  const handleClickNextButton = () => {
    if (!calendarRef.current) return;
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.next();
  };

  const handleClickPrevButton = () => {
    if (!calendarRef.current) return;
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.prev();
  };

  const handleClickViewModeButton = () => {
    // if (!calendarRef.current) return;
    // const calendarInstance = calendarRef.current.getInstance();
    // calendarInstance.prev();
    setViewMode((prev) => (prev == 'day' ? 'month' : 'day'));
  };

  const onCreate: IEvents['beforeCreateSchedule'] = (event) => {
    console.log(event);
  };

  return (
    <div>
      Cal
      <button onClick={handleClickNextButton}>Go next!</button>
      <button onClick={handleClickPrevButton}>Go Prev!</button>
      <button onClick={handleClickViewModeButton}>Day view</button>
      {data ? (
        <CalendarWithForwardedRef
          ref={calendarRef}
          onBeforeCreateSchedule={onCreate}
          // @ts-ignore:next-line
          // {...calendarOptions}
          // timezones={[
          //   {

          //     timezoneName: 'GMT+09:00',
          //     tooltip: 'seoul',
          //     displayLabel: 'GMT +9:00',
          //   },
          // ]}
          // defaultView="day"
          // view={viewMode}
          usageStatistics={false}
          height="500px"
          calendars={[
            {
              id: '0',
              name: 'Private',
              bgColor: '#9e5fff',
              borderColor: '#9e5fff',
            },
            {
              id: '1',
              name: 'Company',
              bgColor: '#00a9ff',
              borderColor: '#00a9ff',
            },
          ]}
          disableDblClick={true}
          disableClick={false}
          isReadOnly={false}
          useDetailPopup={true}
          useCreationPopup={true}
          month={{
            daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            startDayOfWeek: 0,
            narrowWeekend: true,
          }}
          week={{
            daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            startDayOfWeek: 0,
            narrowWeekend: true,
            showTimezoneCollapseButton: true,
            timezonesCollapsed: true,
          }}
          schedules={[
            {
              id: '1',
              calendarId: '1',
              title: 'my schedule',
              category: 'time',
              dueDateClass: '',
              start: '2021-10-06T10:30:00+09:00',
              end: '2021-10-06T12:30:00+09:00',
            },
            {
              id: '2',
              calendarId: '1',
              title: 'second schedule',
              category: 'time',
              dueDateClass: '',
              start: '2021-10-06T22:30:00+09:00',
              end: '2021-10-06T02:30:00+09:00',
              isReadOnly: true, // schedule is read-only
            },
          ]}
          scheduleView={true}
          taskView={true}
        />
      ) : (
        'loading'
      )}
    </div>
  );
};

export default CalendarPage;
