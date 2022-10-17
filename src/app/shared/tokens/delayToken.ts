import { InjectionToken } from "@angular/core";

export const DELAY: InjectionToken<number> = new InjectionToken<number>('Время жизни алерта', {
    factory: () => 5000
})
