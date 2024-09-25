export const invitationCode1 = "cbf2d9617af0";

export const invitationCode2 = "88532ddf63f54";

export const invitationCode3 = "333532ddf63f5";

type CustomerData = {
  carPlate: string;
  customerDescription: string;
};

export const editCustomerMock: CustomerData = {
  carPlate: "ASDF12",
  customerDescription: "hombre mayor mercedes benz plata"
};

type TipData = {
  tip: string;
  tipComment: string;
};

type NewCustomerData = CustomerData & TipData;

export const newCustomerMock: NewCustomerData = {
  carPlate: "QWER12",
  customerDescription: "",
  tip: String(5000),
  tipComment: "este cliente deja buena propina por aspirado"
};

export const newCustomerMock2: NewCustomerData = {
  carPlate: "WENA10",
  customerDescription: "hombre bwm blanco",
  tip: String(0),
  tipComment: "este cliente no deja propina"
};

export const adminUser = {
  username: "marioAmauta",
  email: "marioamauta@hello.com",
  password: "hello123",
  confirmPassword: "hello123"
};

export const newUserMock = {
  username: "Michael",
  email: "hello@hello.com",
  password: "hello123",
  confirmPassword: "hello123"
};

export const newUserMock2 = {
  username: "Freddy",
  email: "hola@hola.com",
  password: "hello123",
  confirmPassword: "hello123"
};

export const fakeCredentials = {
  fakeUsername: "fakeUsername",
  fakeEmail: "fakeEmail@fake.com",
  fakePassword: "fakePassword",
  fakeInvitationCode: "0123456789"
};
