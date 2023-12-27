export interface EnrollStudentRequest {
    classSchedule: File;
    resume:        File;
    email:         string;
    average:       number;
}
export interface StudentInfo {
    email:    string;
    name:     string;
    code:     string;
    type:     string;
    semester: string;
}