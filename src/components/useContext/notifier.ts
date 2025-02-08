// toast.ts
type ToastType = "success" | "error" | "info";

type ToastMessage = {
  id: number;
  message: string;
  type: ToastType;
};

class ToastManager {
  private listeners: ((messages: ToastMessage[]) => void)[] = [];
  private messages: ToastMessage[] = [];
  private idCounter = 0;

  show(message: string, type: ToastType = "info") {
    const newToast: ToastMessage = { id: ++this.idCounter, message, type };
    this.messages = [...this.messages, newToast];
    this.notify();
    setTimeout(() => this.remove(newToast.id), 3000);
  }

  remove(id: number) {
    this.messages = this.messages.filter((toast) => toast.id !== id);
    this.notify();
  }

  subscribe(listener: (messages: ToastMessage[]) => void) {
    this.listeners.push(listener);
    listener(this.messages);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.messages));
  }
}

export const toast = new ToastManager();
