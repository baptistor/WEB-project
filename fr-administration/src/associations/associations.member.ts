export class Member {
    public id: number
    public name: string;
    public firstname: string;
    public age: number;
    public role: string;
  
    constructor(id: number,name: string, firstname: string, age: number, role: string) {
      this.id=id;
      this.name = name;
      this.firstname = firstname;
      this.age = age;
      this.role = role;
    }
  }
  