// <reference path="custom-typings.d.ts" />
import 'custom-typings.d.'
declare global {
  interface Window {
    __platform__: string;
  }
}
