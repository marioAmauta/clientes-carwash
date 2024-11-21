import { SortingOptions } from "@/components/layout/sorting";

export const SITE_TITLE = process.env.SITE_TITLE ?? "Clientes Carwash";

export const USER_SESSION_COOKIE_NAME = "user_session";

export const APP_LINKS = Object.freeze({
  HOME_PAGE: "/",
  LOGIN_PAGE: "/iniciar-sesion",
  CREATE_ACCOUNT_PAGE: "/crear-cuenta",
  INVITATION_CODES_PAGE: "/codigos-de-invitacion",
  CREATE_INVITATION_CODE_PAGE: "/crear-invitacion",
  USER_PAGE: "/usuario",
  CUSTOMERS_PAGE: "/clientes",
  NEW_CUSTOMER_PAGE: "/crear-cliente",
  EDIT_CUSTOMER_PAGE: "/editar-cliente",
  NEW_TIP_PAGE: "/crear-propina",
  EDIT_TIP_PAGE: "/editar-propina"
});

export const ERROR_MESSAGES = Object.freeze({
  ALREADY_CREATED_CUSTOMER: "Cliente con esta patente ya existe",
  ALREADY_USED_CAR_PLATE: "La patente ya está en uso, por favor elige otra",
  INVALID_CAR_PLATE: {
    MIN: "La patente debe tener al menos 5 caracteres en caso de motos y 6 en caso de autos",
    MAX: "La patente no puede tener más de 6 caracteres"
  },
  INVALID_TIP: "La propina no puede estar vacía",
  INVALID_INVITATION_CODE: "El código de invitación no es válido",
  ALREADY_USED_INVITATION_CODE: "El código de invitación ya ha sido usado",
  ALREADY_EXISTS_INVITATION_CODE: "El código de invitación ya existe",
  USERNAME_FORM_ERROR: "El usuario debe tener al menos 1 carácter",
  USERNAME_FORM_ERROR_MAX: "El usuario debe tener como máximo 25 caracteres",
  ALREADY_USED_USERNAME: "El nombre de usuario ya está en uso, por favor elige otro",
  EMAIL_FORM_ERROR: "El email no es válido",
  ALREADY_USED_EMAIL: "El email ya está en uso, por favor elige otro",
  PASSWORD_FORM_ERROR: "La contraseña debe tener al menos 4 caracteres",
  CONFIRM_PASSWORD_FORM_ERROR: "Las contraseñas no coinciden",
  INVALID_CREDENTIALS: "Email y/o contraseña incorrectos",
  INVALID_DATA: "Invalid data",
  INVITATION_CODE_NOT_COPIED: "No se pudo copiar el código de invitación",
  INVITATION_CODE_NOT_DELETED: "No se pudo eliminar el código de invitación"
});

export const SUCCESS_MESSAGES = Object.freeze({
  INVITATION_CODE_COPIED: "Código de invitación copiado con éxito",
  INVITATION_CODE_DELETED: "Código de invitación eliminado con éxito"
});

export const TEST_IDS = Object.freeze({
  registerForm: {
    invitationCode: "invitationCode",
    username: "username",
    email: "email",
    password: "password",
    confirmPassword: "confirmPassword",
    submitButton: "submit"
  },
  loginForm: {
    email: "email",
    password: "password",
    submitButton: "submit"
  },
  customerForm: {
    carPlate: "carPlate",
    description: "description",
    tip: "tip",
    comment: "comment",
    submitButton: "submit",
    cancelButton: "cancel"
  },
  tipForm: {
    tip: "tip",
    comment: "comment",
    submitButton: "submitTip"
  },
  formInvitationCode: {
    invitationCode: "invitationCode",
    submitButton: "submit"
  },
  searchForm: {
    search: "search",
    submitButton: "submitButton"
  },
  updateProfileForm: {
    username: "update:username",
    submitButton: "update:submitButton"
  },
  searchButtonTrigger: "searchButtonTrigger",
  userMenuButtonTrigger: "userMenuButtonTrigger",
  logoutButtonTrigger: "logoutButtonTrigger",
  logoutButton: "logoutButton",
  invitationCodeOptionsButton: "invitationCodeOptionsButton",
  invitationCodeCopyButton: "invitationCodeCopyButton",
  invitationCodeDeleteButton: "invitationCodeDeleteButton",
  invitationCodeDeleteButtonTrigger: "invitationCodeDeleteButtonTrigger",
  customerOptionsButton: "customerOptionsButton",
  customerEditButton: "customerEditButton",
  customerDeleteButton: "customerDeleteButton",
  tipOptionsButton: "tipOptionsButton",
  tipEditButton: "tipEditButton",
  tipDeleteButton: "tipDeleteButton",
  invitationCodeLinkTab: "invitationCodeLinkTab",
  homepageLink: "homepageLink",
  createInvitationLink: "createInvitationLink",
  createNewCustomerHeaderLink: "createNewCustomerHeaderLink",
  createNewCustomerLinkButton: "createNewCustomerLinkButton",
  createAccountLink: "createAccountLink",
  loginLink: "loginLink",
  noCustomersCreateCustomerButton: "noCustomersCreateCustomerButton",
  modalInfoMessage: "modalInfoMessage",
  modalCloseButton: "modalCloseButton"
});

export const SORTING_OPTIONS_CUSTOMER: SortingOptions[] = [
  {
    value: "newest",
    label: "Mas recientes"
  },
  {
    value: "oldest",
    label: "Mas antiguas"
  }
];

export const SORTING_OPTIONS_TIP: SortingOptions[] = [
  {
    value: "highest",
    label: "Mayor propina"
  },
  {
    value: "lowest",
    label: "Menor propina"
  }
];

export const SORTING_OPTIONS_TIP_AND_CUSTOMER: SortingOptions[] = [...SORTING_OPTIONS_CUSTOMER, ...SORTING_OPTIONS_TIP];

// Error codes taken from Prisma documentation
export const PRISMA_ERROR_CODES = Object.freeze({
  // https://www.prisma.io/docs/orm/reference/error-reference#p2002
  uniqueConstraint: "P2002"
});
