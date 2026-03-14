export class AuthUtils {
    private static adminRoutes: string[] = [
      "/externalproperties",
      "/managecareers",
      "/managefaq",
      "/manageproperties",
      "/managetestimonials",
      "/portalaccess",
      "/settings",
      "/transactions",
      "/users",
      "/tickets",
      "/managemailinglist"
    ];
  
    static isAdmin(pathname: string): boolean {
      return this.adminRoutes.includes(pathname);
    }

    static isAdminPortalPage(): boolean {
      return this.adminRoutes.includes("/portalaccess");
    }

    static isClient(pathname: string): boolean {
        return !this.adminRoutes.includes(pathname);
      }
  }
  
