import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/classic";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";

import { Records } from "../db";
import "../assets/css/calendar.css";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const selectedRecords = selectedDate
    ? Records.filter((record) => record.date === selectedDate)
    : [];

  return (
    <div className="calendar-card">

      {/* Calendar Heading */}
      <div className="calendar-heading">
        <i className="fa-solid fa-calendar"></i>
        <h2>Daily Calendar</h2>
      </div>

      {/* Calendar */}
      <FullCalendar
        plugins={[
          themePlugin,
          dayGridPlugin,
          interactionPlugin
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,today,next"
        }}
        buttonText={{
          today: "Today"
        }}
        dateClick={(info) => {
          setSelectedDate(info.dateStr);
        }}
      />

      {/* Date Popup */}
      {selectedDate && (
        <div className="calendar-modal-overlay">

          <div className="calendar-modal">

            {/* Modal Header */}
            <div className="calendar-modal-header">
              <h3>{selectedDate}</h3>

              <button
                type="button"
                className="calendar-modal-close"
                onClick={() => setSelectedDate(null)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="calendar-modal-body">

              {selectedRecords.length === 0 ? (
                <p className="calendar-no-records">
                  No transactions on this date.
                </p>
              ) : (
                selectedRecords.map((record) => (
                  <div
                    key={record.id}
                    className="calendar-record"
                  >

                    <div className="calendar-record-info">

                      <div className="calendar-record-title">
                        {record.title}
                      </div>

                      <div
                        className={`calendar-record-type ${
                          record.type.toLowerCase() === "income"
                            ? "income"
                            : "expense"
                        }`}
                      >
                        {record.type}
                      </div>

                    </div>

                    <div
                      className={`calendar-record-amount ${
                        record.type.toLowerCase() === "income"
                          ? "income"
                          : "expense"
                      }`}
                    >
                      {record.type.toLowerCase() === "income"
                        ? "+"
                        : "-"}
                      ${record.amount.toFixed(2)}
                    </div>

                  </div>
                ))
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Calendar;