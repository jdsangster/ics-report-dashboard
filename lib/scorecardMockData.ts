import { ScorecardData } from "./types";

/** Demo data: a snapshot of the CDR Scorecard workbook (call reviews logged per CDR, grouped by team lead). */
export const mockScorecardReports: ScorecardData[] = [
  {
    id: "cdr-scorecard-2026-11-13",
    metadata: {
      reportType: "CDR Scorecard",
      cadence: "Weekly",
      periodLabel: "11/09 – 11/15"
    },
    asOf: "2026-11-13",
    cdrs: [
      {
        cdr: "Ximena Lopez",
        teamLead: "Valentina",
        callsReviewed: 12,
        status: "Outdated",
        lastReviewed: "2026-10-06",
        daysSinceReview: 38
      },
      {
        cdr: "Jesus Castillo",
        teamLead: "Valentina",
        callsReviewed: 14,
        status: "Up to date",
        lastReviewed: "2026-10-22",
        daysSinceReview: 22
      },
      {
        cdr: "Alan Castellano",
        teamLead: "Valentina",
        callsReviewed: 7,
        status: "Outdated",
        lastReviewed: "2026-09-22",
        daysSinceReview: 52
      },
      {
        cdr: "Alicia Romano",
        teamLead: "Valentina",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Araceli Pinget",
        teamLead: "Valentina",
        callsReviewed: 6,
        status: "Outdated",
        lastReviewed: "2026-09-24",
        daysSinceReview: 50
      },
      {
        cdr: "Diego Brandan",
        teamLead: "Valentina",
        callsReviewed: 13,
        status: "Outdated",
        lastReviewed: "2026-09-17",
        daysSinceReview: 57
      },
      {
        cdr: "Lucas DaSilva",
        teamLead: "Valentina",
        callsReviewed: 30,
        status: "Outdated",
        lastReviewed: "2026-09-24",
        daysSinceReview: 50
      },
      {
        cdr: "Marcos V",
        teamLead: "Valentina",
        callsReviewed: 9,
        status: "Outdated",
        lastReviewed: "2026-09-14",
        daysSinceReview: 60
      },
      {
        cdr: "Stefanny Navarro",
        teamLead: "Valentina",
        callsReviewed: 14,
        status: "Up to date",
        lastReviewed: "2026-11-02",
        daysSinceReview: 11
      },
      {
        cdr: "Camila",
        teamLead: "Valentina",
        callsReviewed: 8,
        status: "Up to date",
        lastReviewed: "2026-11-02",
        daysSinceReview: 11
      },
      {
        cdr: "Javier Garcia",
        teamLead: "Valentina",
        callsReviewed: 8,
        status: "Up to date",
        lastReviewed: "2026-11-03",
        daysSinceReview: 10
      },
      {
        cdr: "Kevin Perez",
        teamLead: "Valentina",
        callsReviewed: 7,
        status: "Up to date",
        lastReviewed: "2026-10-26",
        daysSinceReview: 18
      },
      {
        cdr: "Pedro M.",
        teamLead: "Valentina",
        callsReviewed: 5,
        status: "Outdated",
        lastReviewed: "2026-10-10",
        daysSinceReview: 34
      },
      {
        cdr: "Renee Castillo",
        teamLead: "Valentina",
        callsReviewed: 5,
        status: "Outdated",
        lastReviewed: "2026-10-13",
        daysSinceReview: 31
      },
      {
        cdr: "Rodrigo Cohen",
        teamLead: "Valentina",
        callsReviewed: 1,
        status: "Up to date",
        lastReviewed: "2026-10-15",
        daysSinceReview: 29
      },
      {
        cdr: "Katheryn Parada",
        teamLead: "Mairenis",
        callsReviewed: 6,
        status: "Outdated",
        lastReviewed: "2026-09-17",
        daysSinceReview: 57
      },
      {
        cdr: "Fernanda Fernandez",
        teamLead: "Mairenis",
        callsReviewed: 8,
        status: "Up to date",
        lastReviewed: "2026-11-04",
        daysSinceReview: 9
      },
      {
        cdr: "Loraine Castillo",
        teamLead: "Mairenis",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Luis",
        teamLead: "Mairenis",
        callsReviewed: 5,
        status: "Outdated",
        lastReviewed: "2026-09-14",
        daysSinceReview: 60
      },
      {
        cdr: "Laura Bracalenti",
        teamLead: "Mairenis",
        callsReviewed: 3,
        status: "Outdated",
        lastReviewed: "2026-09-17",
        daysSinceReview: 57
      },
      {
        cdr: "Marcio Oliveira",
        teamLead: "Mairenis",
        callsReviewed: 3,
        status: "Outdated",
        lastReviewed: "2026-08-19",
        daysSinceReview: 86
      },
      {
        cdr: "Maria",
        teamLead: "Mairenis",
        callsReviewed: 37,
        status: "Outdated",
        lastReviewed: "2026-03-30",
        daysSinceReview: 228
      },
      {
        cdr: "Mariana Ricaurte",
        teamLead: "Mairenis",
        callsReviewed: 6,
        status: "Up to date",
        lastReviewed: "2026-11-04",
        daysSinceReview: 9
      },
      {
        cdr: "Monica Solon",
        teamLead: "Mairenis",
        callsReviewed: 9,
        status: "Outdated",
        lastReviewed: "2026-09-28",
        daysSinceReview: 46
      },
      {
        cdr: "Paula Brunati",
        teamLead: "Mairenis",
        callsReviewed: 2,
        status: "Outdated",
        lastReviewed: "2026-09-28",
        daysSinceReview: 46
      },
      {
        cdr: "Tomas Vega",
        teamLead: "Mairenis",
        callsReviewed: 4,
        status: "Outdated",
        lastReviewed: "2026-08-26",
        daysSinceReview: 79
      },
      {
        cdr: "Stefania Ramundo",
        teamLead: "Mairenis",
        callsReviewed: 4,
        status: "Up to date",
        lastReviewed: "2026-10-28",
        daysSinceReview: 16
      },
      {
        cdr: "Stephania Arcila Puerto",
        teamLead: "Mairenis",
        callsReviewed: 29,
        status: "Outdated",
        lastReviewed: "2026-09-17",
        daysSinceReview: 57
      },
      {
        cdr: "Valentina Franco",
        teamLead: "Mairenis",
        callsReviewed: 3,
        status: "Outdated",
        lastReviewed: "2026-08-11",
        daysSinceReview: 94
      },
      {
        cdr: "George Tzaferis",
        teamLead: "Mairenis",
        callsReviewed: 2,
        status: "Outdated",
        lastReviewed: "2026-09-14",
        daysSinceReview: 60
      },
      {
        cdr: "Ayelén",
        teamLead: "Mairenis",
        callsReviewed: 16,
        status: "Up to date",
        lastReviewed: "2026-11-04",
        daysSinceReview: 9
      },
      {
        cdr: "Khomotso Mosena",
        teamLead: "Angelo",
        callsReviewed: 28,
        status: "Outdated",
        lastReviewed: "2026-07-17",
        daysSinceReview: 119
      },
      {
        cdr: "Ianis Gavriz",
        teamLead: "Angelo",
        callsReviewed: 6,
        status: "Outdated",
        lastReviewed: "2026-08-19",
        daysSinceReview: 86
      },
      {
        cdr: "Martina Nasif",
        teamLead: "Angelo",
        callsReviewed: 6,
        status: "Outdated",
        lastReviewed: "2026-08-06",
        daysSinceReview: 99
      },
      {
        cdr: "Alejandro Portillo",
        teamLead: "Angelo",
        callsReviewed: 8,
        status: "Outdated",
        lastReviewed: "2026-08-29",
        daysSinceReview: 76
      },
      {
        cdr: "Florencia Santos",
        teamLead: "Angelo",
        callsReviewed: 4,
        status: "Outdated",
        lastReviewed: "2026-08-07",
        daysSinceReview: 98
      },
      {
        cdr: "Valentina Squillari",
        teamLead: "Angelo",
        callsReviewed: 4,
        status: "Outdated",
        lastReviewed: "2026-08-07",
        daysSinceReview: 98
      },
      {
        cdr: "Julieta Lorenzetti",
        teamLead: "Angelo",
        callsReviewed: 3,
        status: "Outdated",
        lastReviewed: "2026-08-19",
        daysSinceReview: 86
      },
      {
        cdr: "Noraly Camargo",
        teamLead: "Angelo",
        callsReviewed: 5,
        status: "Outdated",
        lastReviewed: "2026-08-06",
        daysSinceReview: 99
      },
      {
        cdr: "Nicolas Soto",
        teamLead: "Angelo",
        callsReviewed: 2,
        status: "Outdated",
        lastReviewed: "2026-08-07",
        daysSinceReview: 98
      },
      {
        cdr: "Pablo Gutierrez",
        teamLead: "Angelo",
        callsReviewed: 3,
        status: "Outdated",
        lastReviewed: "2026-08-22",
        daysSinceReview: 83
      },
      {
        cdr: "Iara Berdayes",
        teamLead: "Angelo",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Ludmila Catalan",
        teamLead: "Angelo",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Melissa",
        teamLead: "Angelo",
        callsReviewed: 1,
        status: "Outdated",
        lastReviewed: "2026-08-22",
        daysSinceReview: 83
      },
      {
        cdr: "Agustin Mauvezin",
        teamLead: "Angelo",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Cameron Moorcraft",
        teamLead: "Angelo",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Milagros Cudeiro",
        teamLead: "Angelo",
        callsReviewed: 2,
        status: "Up to date",
        lastReviewed: "2026-11-04",
        daysSinceReview: 9
      },
      {
        cdr: "Motunrayo Bamgbose",
        teamLead: "Angelo",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Ailen Leiva",
        teamLead: "Martin",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Alejandra Saa",
        teamLead: "Martin",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Camila Abran",
        teamLead: "Martin",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Emma Donnewald",
        teamLead: "Martin",
        callsReviewed: 5,
        status: "Up to date",
        lastReviewed: "2026-11-03",
        daysSinceReview: 10
      },
      {
        cdr: "Florencia Barria",
        teamLead: "Martin",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Joao Miguel Campos",
        teamLead: "Martin",
        callsReviewed: 2,
        status: "Up to date",
        lastReviewed: "2026-11-04",
        daysSinceReview: 9
      },
      {
        cdr: "Josefina Rubino",
        teamLead: "Martin",
        callsReviewed: 2,
        status: "Up to date",
        lastReviewed: "2026-11-04",
        daysSinceReview: 9
      },
      {
        cdr: "Juan Milano",
        teamLead: "Martin",
        callsReviewed: 3,
        status: "Up to date",
        lastReviewed: "2026-11-04",
        daysSinceReview: 9
      },
      {
        cdr: "Lihue Alvarez",
        teamLead: "Martin",
        callsReviewed: 4,
        status: "Up to date",
        lastReviewed: "2026-11-04",
        daysSinceReview: 9
      },
      {
        cdr: "Luis Gonzalez",
        teamLead: "Martin",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Marcelo Gerbeaut",
        teamLead: "Martin",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Maria Camba",
        teamLead: "Martin",
        callsReviewed: 3,
        status: "Up to date",
        lastReviewed: "2026-11-04",
        daysSinceReview: 9
      },
      {
        cdr: "Melissa Salas",
        teamLead: "Martin",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Natalia Colombo",
        teamLead: "Martin",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Oriana Tuttobene",
        teamLead: "Martin",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Valentin Cruz",
        teamLead: "Martin",
        callsReviewed: 0,
        status: "Not reviewed"
      },
      {
        cdr: "Victoria Antunes Bueno",
        teamLead: "Martin",
        callsReviewed: 0,
        status: "Not reviewed"
      }
    ],
    weeks: [
      {
        label: "09/21 – 09/27",
        byLead: [
          {
            teamLead: "Angelo",
            calls: 0
          },
          {
            teamLead: "Valentina",
            calls: 7
          },
          {
            teamLead: "Mairenis",
            calls: 2
          },
          {
            teamLead: "Martin",
            calls: 0
          }
        ]
      },
      {
        label: "09/28 – 10/04",
        byLead: [
          {
            teamLead: "Angelo",
            calls: 0
          },
          {
            teamLead: "Valentina",
            calls: 7
          },
          {
            teamLead: "Mairenis",
            calls: 2
          },
          {
            teamLead: "Martin",
            calls: 1
          }
        ]
      },
      {
        label: "10/05 – 10/11",
        byLead: [
          {
            teamLead: "Angelo",
            calls: 0
          },
          {
            teamLead: "Valentina",
            calls: 8
          },
          {
            teamLead: "Mairenis",
            calls: 0
          },
          {
            teamLead: "Martin",
            calls: 0
          }
        ]
      },
      {
        label: "10/12 – 10/18",
        byLead: [
          {
            teamLead: "Angelo",
            calls: 0
          },
          {
            teamLead: "Valentina",
            calls: 4
          },
          {
            teamLead: "Mairenis",
            calls: 0
          },
          {
            teamLead: "Martin",
            calls: 0
          }
        ]
      },
      {
        label: "10/19 – 10/25",
        byLead: [
          {
            teamLead: "Angelo",
            calls: 0
          },
          {
            teamLead: "Valentina",
            calls: 2
          },
          {
            teamLead: "Mairenis",
            calls: 0
          },
          {
            teamLead: "Martin",
            calls: 4
          }
        ]
      },
      {
        label: "10/26 – 11/01",
        byLead: [
          {
            teamLead: "Angelo",
            calls: 0
          },
          {
            teamLead: "Valentina",
            calls: 4
          },
          {
            teamLead: "Mairenis",
            calls: 2
          },
          {
            teamLead: "Martin",
            calls: 2
          }
        ]
      },
      {
        label: "11/02 – 11/08",
        byLead: [
          {
            teamLead: "Angelo",
            calls: 2
          },
          {
            teamLead: "Valentina",
            calls: 5
          },
          {
            teamLead: "Mairenis",
            calls: 7
          },
          {
            teamLead: "Martin",
            calls: 12
          }
        ]
      },
      {
        label: "11/09 – 11/15",
        byLead: [
          {
            teamLead: "Angelo",
            calls: 0
          },
          {
            teamLead: "Valentina",
            calls: 0
          },
          {
            teamLead: "Mairenis",
            calls: 0
          },
          {
            teamLead: "Martin",
            calls: 0
          }
        ]
      }
    ]
  },
];
