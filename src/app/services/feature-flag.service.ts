import { Injectable } from '@angular/core';
import { RemoteConfig } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  constructor(private remoteConfig: RemoteConfig) {
    // Configuración para desarrollo
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 30000, // 30 segundos en desarrollo
      fetchTimeoutMillis: 5000, // 5 segundos timeout
    };
  }

  async isFeatureEnabled(featureName: string): Promise<boolean> {
    try {
      // Importación dinámica para asegurar compatibilidad
      const { fetchAndActivate, getValue } = await import(
        'firebase/remote-config'
      );

      // Usando la API modular correcta
      await fetchAndActivate(this.remoteConfig);
      const value = getValue(this.remoteConfig, featureName);
      return value.asBoolean();
    } catch (error) {
      console.error('Error al verificar feature flag:', error);
      return false; // Valor por defecto seguro
    }
  }
}
