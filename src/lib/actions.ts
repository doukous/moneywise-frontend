import { redirect } from "react-router";
import { BackService } from "./backendFetch";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  PasswordResetRequestBody,
} from "./service/dto";

export async function loginAction({ request }: { request: Request }) {
  const data = await request.formData();

  const requestBody: LoginRequest = {
    email: data.get("mail-address")!.toString(),
    password: data.get("password")!.toString(),
  };

  const response: LoginResponse = await BackService.post("/login", requestBody);

  if (response.access_token) {
    localStorage.setItem("auth_token", response.access_token);
    localStorage.setItem("auth_token_creation_time", Date.now().toString());
    return redirect("/");
  }

  return { response: JSON.stringify(response) };
}

export async function registerAction({ request }: { request: Request }) {
  const data = await request.formData();

  const requestBody: RegisterRequest = {
    name: data.get("fullname")!.toString(),
    email: data.get("mail-address")!.toString(),
    password: data.get("password")!.toString(),
  };

  const response = await BackService.post("/register", requestBody);
  if (response) return redirect("/auth/login");

  return { response: JSON.stringify(response) };
}

export async function forgottenPasswordAction({
  request,
}: {
  request: Request;
}) {
  const data = await request.formData();
  const email = data.get("mail-address")!.toString();
  const submitType = data.get("submit-btn")!.toString();

  const requestBody: PasswordResetRequestBody = {
    email: email,
  };

  if (submitType == "submit-email") {
    const response = await BackService.post("/forgot-password", requestBody);
    return { response: response, email: email };
  }

  requestBody["password"] = data.get("password")!.toString();
  requestBody["password_confirmation"] = data.get("password")!.toString();

  requestBody["token"] = data.get("token")!.toString();
  const response = await BackService.post("/reset-password", requestBody);
  return { response: response };
}
