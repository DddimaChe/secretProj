export class User {

  constructor(private email: string,
              private password: string,
              private name: string,
              private lastName: string,
              private role: string,
              private id?:number,
              private registration?: Date){}
}
