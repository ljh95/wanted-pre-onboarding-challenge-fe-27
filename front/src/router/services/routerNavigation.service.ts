import { NavigateFunction } from "react-router-dom";
import { INavigationService } from "../interfaces/navigation.interface";

export class RouterNavigationService implements INavigationService {
  constructor(private navigate: NavigateFunction) {}

  navigateTo(path: string): void {
    this.navigate(path);
  }

  replace(path: string): void {
    this.navigate(path, { replace: true });
  }

  goBack(): void {
    this.navigate(-1);
  }
}
