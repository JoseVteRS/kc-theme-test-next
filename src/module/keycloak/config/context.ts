"use client";

import { getKcContext } from 'keycloakify-test';
import type { KcContextBase } from './context-base';

// Tipado seguro para evitar any
type SafeWindow = Window & { kcContext?: KcContextBase.Login };

// Check if we're in debug mode (window.kcContext is not available)
const isDebugMode = !((window as unknown as SafeWindow).kcContext);

// Use either the real kcContext from window or the debug context
export const { kcContext } = isDebugMode
    ? getKcContext<{
          pageId: 'login.ftl';
      }>({
          mockPageId: 'login.ftl',
          mockData: [
              {
                  pageId: 'login.ftl',
              },
          ],
      })
    : { kcContext: (window as unknown as SafeWindow).kcContext as KcContextBase.Login };

export type KcContext = NonNullable<typeof kcContext>;
