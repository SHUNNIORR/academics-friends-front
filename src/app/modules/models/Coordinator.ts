export interface CreateCoordinatorRequest {
    email:    string;
    password: string;
    name:     string;
    code:     string;
}

export interface CreateCoordinatorResponse {
    email: string;
    name:  string;
    code:  string;
    type:  string;
}