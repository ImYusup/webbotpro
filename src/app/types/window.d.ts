// src/types/window.d.ts
import { PayPalButtonsComponentOptions } from "@paypal/paypal-js";

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: PayPalButtonsComponentOptions) => {
        render: (container: string | HTMLElement) => void;
      };
    };
  }
}
