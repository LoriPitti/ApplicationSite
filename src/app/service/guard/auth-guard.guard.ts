import {CanActivateFn, Router} from "@angular/router";
import {UserService} from "../user.service";
import {inject} from "@angular/core";
import {HttpRequestService} from "../httpRequest.service";

export const confirmEmailGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpRequestService)
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
