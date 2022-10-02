import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidadorCampo {

  static deveCombinar(ControleNome: string, CombineControleNome: string): any {
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const controle = formGroup.controls[ControleNome];
      const combineControle = formGroup.controls[CombineControleNome];

      if (combineControle.errors && !combineControle.errors.deveCombinar) {
        return null;
      }

      if (controle.value !== combineControle.value) {
        combineControle.setErrors({ deveCombinar: true });
      }
      else
        combineControle.setErrors(null);

      return null;

    }
  }

}
