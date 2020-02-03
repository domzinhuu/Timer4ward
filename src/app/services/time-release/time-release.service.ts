import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { mountHttpParams } from 'src/app/utils/helpers';
import { environment } from 'src/environments/environment';
import { TimeReleaseModel } from 'src/app/models/time-release.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeReleaseService {
  private releaseSubject = new BehaviorSubject([]);
  releases$: Observable<TimeReleaseModel[]> = this.releaseSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  public getReleases(filters?: any): Observable<any> {
    const params = mountHttpParams(filters);
    return this.httpClient.get(environment.api_url + '/release', { params }).pipe(
      tap((res: any) => {
        this.releaseSubject.next(res);
      })
    );
  }

  public save(timeRelease: TimeReleaseModel): Observable<any> {
    if (timeRelease._id) {
      return this.httpClient.put(environment.api_url + '/release/' + timeRelease._id, timeRelease);
    }
    return this.httpClient.post(environment.api_url + '/release', timeRelease);
  }

  public remove(id: string): Observable<any> {
    return this.httpClient.delete(environment.api_url + '/release/' + id);
  }
}
