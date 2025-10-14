export class AuthRepository {
   async create(){
       console.log("AuthRepository");
        return {auth: true}
    }
}