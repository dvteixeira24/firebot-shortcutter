// node process extension

namespace NodeJS {
  interface ProcessEnv {
    FIREBOT_DATA_DIR: string;
    HOSTNAME?: string;
    USE_SSL?: "true";
    APP_STORE_PATH?: string;
  }
}

// Firebot types
namespace FirebotConfigData {
  interface Effect {
    id: string;
    type: string;
    active: boolean;
    percentWeight: number | null;
    selectedFilters?: {
      sourceName: string;
      filterName: string;
      action: boolean;
    }[];
    selectedSources?: {
      sceneName: string;
      sourceId: number;
      groupName?: string;
      action: boolean;
    }[];
    browserSourceName?: string;
    url?: string;
    chatter?: string;
    message?: string;
    me?: boolean;
    listType?: string;
    presetListArgs?: Record<string, string>;
    effectList?: {
      list: Effect[];
      id: string;
    };
    sceneItem?: {
      id: number;
      name: string;
    };
    duration?: string;
    isTransformingScale?: boolean;
    endTransform?: {
      scaleX: string;
      scaleY: string;
      positionX: string;
      positionY: string;
    };
    easeIn?: boolean;
    easeOut?: boolean;
    isTransformingRotation?: boolean;
    isTransformingPosition?: boolean;
  }

  interface Preset {
    id: string;
    name: string;
    effects: {
      list: Effect[];
      id: string;
    };
    args: { name: string }[];
    sortTags: string[];
  }
  namespace json {
    interface PresetList extends Record<string, Preset> {}
  }
}
