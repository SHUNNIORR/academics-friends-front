export interface Hour {
  hour: string;
  classroom: string;
  academicFriends: string[];
}

export interface Day {
  day: string;
  hours: Hour[];
}

export interface Schedule {
  numberOfHours: number;
  days: Day[];
}
