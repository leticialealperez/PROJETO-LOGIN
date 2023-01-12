export interface Contato {
  id: string;
  name: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  contacts: Contato[];
}

export interface ResponseAPI {
  success: boolean;
  message: string;
  data: any
}

export type SaveUserRequest = Omit<User, 'contacts' | 'id'>

export interface SaveContactRequest {
  idUser: string;
  newContact: Omit<Contato, 'id'>
}

export interface UpdateContactRequest {
  idUser: string;
  idContact: string;
  contactUpdated: Partial<Omit<Contato, 'id'>>;
};

export type DeleteContactRequest = Omit<UpdateContactRequest, 'contactUpdated'>;



export type Users = User[];
