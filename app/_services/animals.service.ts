/**
 * Created by Wajid on 5/21/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {config} from "../config";
import { Observable } from 'rxjs/Observable';
import {Animal} from "../_modals/animal";
import {Species} from "../_modals/species";

@Injectable()
export class AnimalsService {
    API_URL = "";
    constructor(private http: Http) {
        this.API_URL = config.getEnvironmentVariable().endPoint;
    }

    getAnimals(): Observable<Animal[]>{
        return this.http.get(this.API_URL + 'api/animals').map((response: Response) => response.json());
    }

    getAnimal(id: number){
        return this.http.get(this.API_URL + 'api/animals/' + id).map((response) => {
            let res =  response.json();
            let species:Species = {Name: res.Species.Name, Id: res.SpceciesFK };
            let animal:Animal = { Name: res.Name, YearOfBirth: res.YearOfBirth, Id: res.Id, Age: res.Age, SpeciesFK: res.SpeciesFK, Species:species };
            return animal;
        });
    }

    postAnimal(model){
        return this.http.post(this.API_URL +'api/animals', JSON.stringify(model), this.jwt()).map(response=> response.json());
    }
    putAnimal(model){
        return this.http.put(this.API_URL +'api/animals/' + model.Id, JSON.stringify(model), this.jwt()).map(response=> response.json());
    }



    deleteAnimal(id: number){
        return this.http.delete(this.API_URL + 'api/animals/' + id).map(response => response.json());
    }

    // getByUserId(id: number): Observable<Contract[]> {
    //     return this.http.get(this.API_URL + 'api/animals/GetByUserId/' + id).map((response: Response) =>  response.json());
    // }
    //
    // getByUserIdForMeterData(id: number): Observable<MeterReadingDataDTO[]> {
    //     return this.http.get(this.API_URL + 'GetByUserIdForMeterData/' + id).map((response: Response) => response.json());
    // }
    //
    // addNewReading(reading: Reading) {
    //     return this.http.post(this.API_URL + 'AddNewReading', reading, this.jwt()).map((response: Response) => response.json());
    // }

    // private helper methods

    private jwt() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return options;
    }

}