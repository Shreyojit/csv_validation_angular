export interface CsvRow {
  name: string;
  roll: string;
  dept: string;
  age: number;
  passion: string;
  oe_course: string;
  elective_course: string;
  backlogs: number;
  career_goals: string;
  remarks?: string | null;
  errors: {
    [key: string]: boolean; // Dynamic error keys for each field
  };
}


  
  interface ParseResult {
    data: CsvRow[];
    errors: any[];
    meta: any;
  }
  