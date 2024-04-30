import {CanActivateFn, Router} from "@angular/router";
import {UserService} from "../user.service";
import {inject} from "@angular/core";

export const confirmEmailGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const  router = new Router();
  let verified = localStorage.getItem("verified");
  if( verified!= null && verified == '0') {
    return true;
  }
  else{
    router.navigate(["/student/profile"]);
    return false;
  }


};
