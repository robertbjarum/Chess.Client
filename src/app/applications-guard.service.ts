import { IConfiguration } from '@kognifai/poseidon-configurationinterface';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InitializeService } from '@kognifai/poseidon-ng-initialize-service';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';

@Injectable()
export class ApplicationsGuardService implements CanActivate {
  constructor(private initializeService: InitializeService, private configurationService: ConfigurationService<IConfiguration>, private router: Router) { }
  canActivate(): Observable<boolean> {
    const result = this.initializeService.isApplicationInCachedApplocations(this.configurationService.config.applicationId);
    result.subscribe((value) => {
      if (!value) {
        this.router.navigate(['unauthorized']);
      }
    });
    return result;
  }
}
