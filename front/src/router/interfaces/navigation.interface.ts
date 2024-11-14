export interface INavigationService {
  navigateTo(path: string): void;
  replace(path: string): void;
  goBack(): void;
}
