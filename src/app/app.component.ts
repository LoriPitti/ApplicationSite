import { Component } from '@angular/core';
import {IconSetService} from "@coreui/icons-angular";
import {
  cilAccountLogout,
  cilActionUndo,
  cilApps, cilBarChart, cilCheckCircle,
  cilChevronCircleRightAlt,
  cilEducation,
  cilFindInPage,
  cilIndustry,
  cilUser, cilUserPlus, cilWarning, cilXCircle
} from "@coreui/icons";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ApplicationsMenager';

  constructor(public iconSet:IconSetService) {
    iconSet.icons = {cilEducation, cilUser, cilIndustry, cilActionUndo,cilChevronCircleRightAlt,cilApps,cilFindInPage,
      cilAccountLogout, cilUserPlus,cilCheckCircle, cilXCircle, cilWarning, cilBarChart}
  }
}
