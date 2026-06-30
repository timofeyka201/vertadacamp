export type CamperModel = "econom" | "base" | "comfort";

export type ApplicationStatus = "new" | "in_progress" | "done";

export interface Application {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  model: CamperModel | "";
  comment: string;
  status: ApplicationStatus;
}

export const MODEL_LABELS: Record<CamperModel, string> = {
  econom: "Эконом",
  base: "Базовая",
  comfort: "Комфорт",
};

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Обработана",
};
