// node process extension

namespace NodeJS {
  interface ProcessEnv {
    FIREBOT_API_URL?: string;
    HOSTNAME?: string;
    USE_SSL?: "true";
    APP_STORE_PATH?: string;
  }
}

// Firebot types
namespace FirebotApiData {
  interface Effect {
    id: string;
    name: string;
    description: string;
    triggers: string[];
  }

  interface Preset {
    id: string;
    name: string;
    args: string[];
  }

  namespace json {
    interface PresetList extends Record<string, Preset> {}
  }
}
