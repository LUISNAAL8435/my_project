import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <div class="flex justify-center items-center p-4">
      <img src="/fisio.png" alt="Fisiocenter Logo" class="max-w-full h-auto max-h-48">
    </div>
  `,
  imports: []
})
export class LogoComponent {}