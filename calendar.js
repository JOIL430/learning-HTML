class CoolCalendar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.date = new Date();
        this.render();
        this.startClock();
    }

    render() {
        const year = this.date.getFullYear();
        const month = this.date.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        const today = new Date();

        const monthName = this.date.toLocaleString('default', { month: 'long' });

        let html = `
        <style>
          .cool-calendar {
            background: #fff;
            border-radius: 15px;
            padding: 20px;
            width: 320px;
            font-family: 'Segoe UI', sans-serif;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
          .cool-calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }
          .cool-calendar-header button {
            background: none;
            border: none;
            font-size: 1.2em;
            cursor: pointer;
          }
          .cool-calendar-header h2 {
            font-size: 1.4em;
            margin: 0;
          }
          .cool-calendar-clock {
            text-align: center;
            font-size: 1.1em;
            margin-bottom: 10px;
            font-weight: bold;
            color: #333;
          }
          .cool-calendar-days, .cool-calendar-dates {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            text-align: center;
          }
          .cool-calendar-days div {
            font-weight: bold;
            color: #666;
          }
          .cool-calendar-dates div {
            padding: 8px;
            border-radius: 6px;
            cursor: pointer;
            transition: 0.3s;
          }
          .cool-calendar-dates div:hover {
            background: #eee;
          }
          .cool-calendar-today {
            background: #667eea;
            color: white;
            font-weight: bold;
          }
        </style>
  
        <div class="cool-calendar">
          <div class="cool-calendar-header">
            <button id="prevMonth">&larr;</button>
            <h2>${monthName} ${year}</h2>
            <button id="nextMonth">&rarr;</button>
          </div>
          <div class="cool-calendar-clock" id="clock">--:--:--</div>
          <div class="cool-calendar-days">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div class="cool-calendar-dates">
      `;

        for (let i = 0; i < firstDay; i++) {
            html += `<div></div>`;
        }

        for (let i = 1; i <= totalDays; i++) {
            const isToday =
                i === today.getDate() &&
                year === today.getFullYear() &&
                month === today.getMonth();

            html += `<div class="${isToday ? 'cool-calendar-today' : ''}">${i}</div>`;
        }

        html += `</div></div>`;

        this.container.innerHTML = html;

        document.getElementById('prevMonth').onclick = () => {
            this.date.setMonth(this.date.getMonth() - 1);
            this.render();
        };

        document.getElementById('nextMonth').onclick = () => {
            this.date.setMonth(this.date.getMonth() + 1);
            this.render();
        };
    }

    startClock() {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const timeString = `${hours}:${minutes}:${seconds}`;
            const clockEl = document.getElementById('clock');
            if (clockEl) {
                clockEl.textContent = timeString;
            }
        };
        updateClock();
        setInterval(updateClock, 1000);
    }
}

// To use this, in your HTML:
// <div id="calendar-container"></div>
// <script src="calendar.js"></script>
// <script> new CoolCalendar('calendar-container'); </script>
