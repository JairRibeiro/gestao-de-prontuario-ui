import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { AppHttp } from "app/security/app-http";
import { Specialization, SpecializationInfo } from "app/model/Specialization";
import { EventType } from "app/model/EventType";

@Injectable()
export class UtilService {

    private eventTypes: Array<EventType>;

    constructor(private http: AppHttp) {
    }

    getEventTypes(): Promise<Array<EventType>> {
        var headers = this.http.getHeadersDefault();

        return this.http.get<Array<EventType>>(`${environment.apiUrl}/event-type`, { headers })
            .toPromise();
    }

    getSpecialization(): Promise<Array<Specialization>> {
        var headers = this.http.getHeadersDefault();

        return this.http.get<Array<Specialization>>(`${environment.apiUrl}/speciality`, { headers })
            .toPromise();
    }

    getSpecializationById(id: number): Promise<SpecializationInfo> {
        var headers = this.http.getHeadersDefault();

        return this.http.get<SpecializationInfo>(`${environment.apiUrl}/speciality/${id}`, { headers })
            .toPromise();
    }

    cpfIsValid(strCPF) {
        var sum;
        var mod;
        sum = 0;
        if (strCPF == "00000000000") return false;

        for (var i = 1; i <= 9; i++) {
            sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }
        mod = (sum * 10) % 11;

        if ((mod == 10) || (mod == 11)) mod = 0;
        if (mod != parseInt(strCPF.substring(9, 10))) return false;

        sum = 0;
        for (i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        mod = (sum * 10) % 11;

        if ((mod == 10) || (mod == 11)) mod = 0;
        if (mod != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }
}