import { AttendanceData } from "./types";

/** Demo data: the CDR meetings of Tue 11/17 and Fri 11/20/2026, built from the Zoom participants export, the current roster and each CDR's schedule. */
export const mockAttendanceReports: AttendanceData[] = [
  {
    id: "cdr-attendance-2026-11-17",
    "metadata": {
      "reportType": "CDR Attendance",
      "cadence": "Weekly",
      "periodLabel": "11/17"
    },
    "meeting": {
      "date": "2026-11-17",
      "start": "13:01",
      "end": "14:00",
      "durationMinutes": 59
    },
    "records": [
      {
        "cdr": "Alan Castellano",
        "teamLead": "Valentina",
        "minutes": 59
      },
      {
        "cdr": "Araceli Pinget",
        "teamLead": "Valentina",
        "minutes": 57
      },
      {
        "cdr": "Camila Aput",
        "teamLead": "Valentina",
        "minutes": 0
      },
      {
        "cdr": "Dayana Jaramillo",
        "teamLead": "Valentina",
        "minutes": 59
      },
      {
        "cdr": "Diego Brandan",
        "teamLead": "Valentina",
        "minutes": 59
      },
      {
        "cdr": "Florencia Barria",
        "teamLead": "Valentina",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Javier Garcia",
        "teamLead": "Valentina",
        "minutes": 59
      },
      {
        "cdr": "Jesus Castillo",
        "teamLead": "Valentina",
        "minutes": 0
      },
      {
        "cdr": "Kevin Perez",
        "teamLead": "Valentina",
        "minutes": 59
      },
      {
        "cdr": "Lucas DaSilva",
        "teamLead": "Valentina",
        "minutes": 59
      },
      {
        "cdr": "Luis Gonzalez",
        "teamLead": "Valentina",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Marcos Villa",
        "teamLead": "Valentina",
        "minutes": 59
      },
      {
        "cdr": "Milena Ferreira",
        "teamLead": "Valentina",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Pedro Moreno",
        "teamLead": "Valentina",
        "minutes": 59
      },
      {
        "cdr": "Renee Castillo",
        "teamLead": "Valentina",
        "minutes": 59
      },
      {
        "cdr": "Stefanny Navarro",
        "teamLead": "Valentina",
        "minutes": 59
      },
      {
        "cdr": "Ximena Lopez",
        "teamLead": "Valentina",
        "minutes": 59
      },
      {
        "cdr": "Angel Fuquen",
        "teamLead": "Mairenis",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Ayelen Mannucci",
        "teamLead": "Mairenis",
        "minutes": 59
      },
      {
        "cdr": "Emma Donnewald",
        "teamLead": "Mairenis",
        "minutes": 52
      },
      {
        "cdr": "Fernanda Fernandez",
        "teamLead": "Mairenis",
        "minutes": 59
      },
      {
        "cdr": "Joao Miguel Campos",
        "teamLead": "Mairenis",
        "minutes": 59
      },
      {
        "cdr": "Josefina Rubino",
        "teamLead": "Mairenis",
        "minutes": 59
      },
      {
        "cdr": "Juan Milano",
        "teamLead": "Mairenis",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Lihue Alvarez",
        "teamLead": "Mairenis",
        "minutes": 59
      },
      {
        "cdr": "Malena Sosa",
        "teamLead": "Mairenis",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Marcelo Gerbeaut",
        "teamLead": "Mairenis",
        "minutes": 59
      },
      {
        "cdr": "Maria Camba",
        "teamLead": "Mairenis",
        "minutes": 59
      },
      {
        "cdr": "Maria Josefina Boldrer",
        "teamLead": "Mairenis",
        "minutes": 59
      },
      {
        "cdr": "Milagros Cudeiro",
        "teamLead": "Mairenis",
        "minutes": 59
      },
      {
        "cdr": "Oriana Tuttobene",
        "teamLead": "Mairenis",
        "minutes": 59
      },
      {
        "cdr": "Stefania Ramundo",
        "teamLead": "Mairenis",
        "minutes": 59
      },
      {
        "cdr": "Valentin Cruz",
        "teamLead": "Mairenis",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Agustin Mauvezin",
        "teamLead": "Angelo",
        "minutes": 59
      },
      {
        "cdr": "Ailen Leiva",
        "teamLead": "Angelo",
        "minutes": 59
      },
      {
        "cdr": "Alejandra Saa",
        "teamLead": "Angelo",
        "minutes": 59
      },
      {
        "cdr": "Allan Martins",
        "teamLead": "Angelo",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Ianis Gavriz",
        "teamLead": "Angelo",
        "minutes": 59
      },
      {
        "cdr": "Iara Berdayes",
        "teamLead": "Angelo",
        "minutes": 59
      },
      {
        "cdr": "Janaina Aicardo",
        "teamLead": "Angelo",
        "minutes": 55
      },
      {
        "cdr": "Juan Pablo Gutierrez",
        "teamLead": "Angelo",
        "minutes": 59
      },
      {
        "cdr": "Katharina Thiede",
        "teamLead": "Angelo",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Ludmila Catalan",
        "teamLead": "Angelo",
        "minutes": 59
      },
      {
        "cdr": "Martina Nasif",
        "teamLead": "Angelo",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Melissa Katemo",
        "teamLead": "Angelo",
        "minutes": 59
      },
      {
        "cdr": "Melissa Salas",
        "teamLead": "Angelo",
        "minutes": 59
      },
      {
        "cdr": "Motunrayo Bamgbose",
        "teamLead": "Angelo",
        "minutes": 58
      },
      {
        "cdr": "Nicolas Soto",
        "teamLead": "Angelo",
        "minutes": 59
      },
      {
        "cdr": "Victoria Antunes Bueno",
        "teamLead": "Angelo",
        "minutes": 40
      },
      {
        "cdr": "Anabella Roldan",
        "teamLead": "Martin",
        "minutes": 0
      },
      {
        "cdr": "Elbert Arcila",
        "teamLead": "Martin",
        "minutes": 59
      },
      {
        "cdr": "Joana Garcia",
        "teamLead": "Martin",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Joaquin Castillo",
        "teamLead": "Martin",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Leonardo De Rezende",
        "teamLead": "Martin",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Lucia Torralba",
        "teamLead": "Martin",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Luhanna Vegh",
        "teamLead": "Martin",
        "minutes": 59
      },
      {
        "cdr": "Magali Rocio",
        "teamLead": "Martin",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Maria Clara Lima",
        "teamLead": "Martin",
        "minutes": 59
      },
      {
        "cdr": "Richard Silva",
        "teamLead": "Martin",
        "minutes": 59
      },
      {
        "cdr": "Sebastian Balao",
        "teamLead": "Martin",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Sebastian Estrello",
        "teamLead": "Martin",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Suellen Grabowski",
        "teamLead": "Martin",
        "minutes": 59
      }
    ]
  },
  {
    id: "cdr-attendance-2026-11-20",
    "metadata": {
      "reportType": "CDR Attendance",
      "cadence": "Weekly",
      "periodLabel": "11/20"
    },
    "meeting": {
      "date": "2026-11-20",
      "start": "13:01",
      "end": "13:43",
      "durationMinutes": 42
    },
    "records": [
      {
        "cdr": "Alan Castellano",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Araceli Pinget",
        "teamLead": "Valentina",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Camila Aput",
        "teamLead": "Valentina",
        "minutes": 0
      },
      {
        "cdr": "Dayana Jaramillo",
        "teamLead": "Valentina",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Diego Brandan",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Florencia Barria",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Javier Garcia",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Jesus Castillo",
        "teamLead": "Valentina",
        "minutes": 0
      },
      {
        "cdr": "Kevin Perez",
        "teamLead": "Valentina",
        "minutes": 41
      },
      {
        "cdr": "Lucas DaSilva",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Luis Gonzalez",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Marcos Villa",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Milena Ferreira",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Pedro Moreno",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Renee Castillo",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Stefanny Navarro",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Ximena Lopez",
        "teamLead": "Valentina",
        "minutes": 42
      },
      {
        "cdr": "Angel Fuquen",
        "teamLead": "Mairenis",
        "minutes": 42
      },
      {
        "cdr": "Ayelen Mannucci",
        "teamLead": "Mairenis",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Emma Donnewald",
        "teamLead": "Mairenis",
        "minutes": 0
      },
      {
        "cdr": "Fernanda Fernandez",
        "teamLead": "Mairenis",
        "minutes": 42
      },
      {
        "cdr": "Joao Miguel Campos",
        "teamLead": "Mairenis",
        "minutes": 42
      },
      {
        "cdr": "Josefina Rubino",
        "teamLead": "Mairenis",
        "minutes": 42
      },
      {
        "cdr": "Juan Milano",
        "teamLead": "Mairenis",
        "minutes": 34
      },
      {
        "cdr": "Lihue Alvarez",
        "teamLead": "Mairenis",
        "minutes": 41
      },
      {
        "cdr": "Malena Sosa",
        "teamLead": "Mairenis",
        "minutes": 42
      },
      {
        "cdr": "Marcelo Gerbeaut",
        "teamLead": "Mairenis",
        "minutes": 42
      },
      {
        "cdr": "Maria Camba",
        "teamLead": "Mairenis",
        "minutes": 42
      },
      {
        "cdr": "Maria Josefina Boldrer",
        "teamLead": "Mairenis",
        "minutes": 41
      },
      {
        "cdr": "Milagros Cudeiro",
        "teamLead": "Mairenis",
        "minutes": 40
      },
      {
        "cdr": "Oriana Tuttobene",
        "teamLead": "Mairenis",
        "minutes": 42
      },
      {
        "cdr": "Stefania Ramundo",
        "teamLead": "Mairenis",
        "minutes": 42
      },
      {
        "cdr": "Valentin Cruz",
        "teamLead": "Mairenis",
        "minutes": 42
      },
      {
        "cdr": "Agustin Mauvezin",
        "teamLead": "Angelo",
        "minutes": 35
      },
      {
        "cdr": "Ailen Leiva",
        "teamLead": "Angelo",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Alejandra Saa",
        "teamLead": "Angelo",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Allan Martins",
        "teamLead": "Angelo",
        "minutes": 42
      },
      {
        "cdr": "Ianis Gavriz",
        "teamLead": "Angelo",
        "minutes": 41
      },
      {
        "cdr": "Iara Berdayes",
        "teamLead": "Angelo",
        "minutes": 41
      },
      {
        "cdr": "Janaina Aicardo",
        "teamLead": "Angelo",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Juan Pablo Gutierrez",
        "teamLead": "Angelo",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Katharina Thiede",
        "teamLead": "Angelo",
        "minutes": 42
      },
      {
        "cdr": "Ludmila Catalan",
        "teamLead": "Angelo",
        "minutes": 41
      },
      {
        "cdr": "Martina Nasif",
        "teamLead": "Angelo",
        "minutes": 35
      },
      {
        "cdr": "Melissa Katemo",
        "teamLead": "Angelo",
        "minutes": 42
      },
      {
        "cdr": "Melissa Salas",
        "teamLead": "Angelo",
        "minutes": 11,
        "excused": true
      },
      {
        "cdr": "Motunrayo Bamgbose",
        "teamLead": "Angelo",
        "minutes": 42
      },
      {
        "cdr": "Nicolas Soto",
        "teamLead": "Angelo",
        "minutes": 20
      },
      {
        "cdr": "Victoria Antunes Bueno",
        "teamLead": "Angelo",
        "minutes": 42
      },
      {
        "cdr": "Anabella Roldan",
        "teamLead": "Martin",
        "minutes": 42
      },
      {
        "cdr": "Elbert Arcila",
        "teamLead": "Martin",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Joana Garcia",
        "teamLead": "Martin",
        "minutes": 42
      },
      {
        "cdr": "Joaquin Castillo",
        "teamLead": "Martin",
        "minutes": 0
      },
      {
        "cdr": "Leonardo De Rezende",
        "teamLead": "Martin",
        "minutes": 42
      },
      {
        "cdr": "Lucia Torralba",
        "teamLead": "Martin",
        "minutes": 42
      },
      {
        "cdr": "Luhanna Vegh",
        "teamLead": "Martin",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Magali Rocio",
        "teamLead": "Martin",
        "minutes": 42
      },
      {
        "cdr": "Maria Clara Lima",
        "teamLead": "Martin",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Richard Silva",
        "teamLead": "Martin",
        "minutes": 0,
        "excused": true
      },
      {
        "cdr": "Sebastian Balao",
        "teamLead": "Martin",
        "minutes": 0
      },
      {
        "cdr": "Sebastian Estrello",
        "teamLead": "Martin",
        "minutes": 0
      },
      {
        "cdr": "Suellen Grabowski",
        "teamLead": "Martin",
        "minutes": 42
      }
    ]
  },
];
