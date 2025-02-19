import { ComponentCustomProperties } from "vue";
import { I18n } from "vue-i18n";

declare module "vue" {
  interface ComponentCustomProperties {
    $t: I18n["t"];
    // $tc: I18n["tc"];
    // $te: I18n["te"];
    // $d: I18n["d"];
    // $n: I18n["n"];
  }
}
