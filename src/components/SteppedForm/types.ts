export type Form = {
  step: number;
  data: Record<string, unknown>;
  stepKey: string;
};

export type FormState = {
  currentStep: number;
  currentForm: Record<string, unknown> | null;
  forms: Form[];
};

export type Step = {
  formKey: string;
  name: string;
  component: JSX.Element;
  isRequireContinueCta: boolean;
  onSubmit?: (args: unknown) => void;
  beforeNextStep?: () => boolean;
};

export type SteppedForm = {
  steps: Step[];
};

export type FormAction = {
  type: string;
  payload: {
    step?: number;
    data?: unknown;
    stepKey?: string;
  } | null;
};

export type FormContextType = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  stepInfo: Step | null;
  handleMoveForward: (args: string) => void;
};