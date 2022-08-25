class Company {
  constructor() {
    this.departments = {};
  }

  addEmployee(name, salary, position, department) {
    const isValid = [name, salary, position, department];
    for (let param of isValid) {
      if (param == "" || param == undefined || param == null) {
        throw new Error("Invalid input!");
      }
      if (param == salary) {
        if (param < 0) {
          throw new Error("Invalid input!");
        }
      }
    }

    if (this.departments.hasOwnProperty(department) == false) {
      this.departments[department] = [];
    }
    this.departments[department].push({ name, salary, position });
    return `New employee is hired. Name: ${name}. Position: ${position}`;
  }

  bestDepartment() {
    let highestAvg = 0;
    let highestDepartment = undefined;

    for (let department in this.departments) {
      const departmentInfo = this.departments[department];
      let currentAvg = 0;
      for (let depSalaries of departmentInfo) {
        currentAvg += depSalaries.salary;
      }
      currentAvg = currentAvg / departmentInfo.length;
      if (highestAvg < currentAvg) {
        highestAvg = currentAvg;
        highestDepartment = department;
      }
    }

    const bestDep = this.departments[highestDepartment].sort(
      (a, b) => b.salary - a.salary || a.name.localeCompare(b.name)
    );
    let finalText = [
      `Best Department is: ${highestDepartment}`,
      `Average salary: ${highestAvg.toFixed(2)}`,
    ];
    for (let dep of bestDep) {
      finalText.push(`${dep.name} ${dep.salary} ${dep.position}`);
    }
    return finalText.join("\n");
  }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");

c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
