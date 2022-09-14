class SmartHike {
  constructor(username) {
    this.username = username;
    this.goals = {};
    this.listOfHikes = [];
    this.resources = 100;
  }

  addGoal(peak, altitude) {
    if (this.goals.hasOwnProperty(peak) == false) {
      this.goals[peak] = altitude;
      return `You have successfully added a new goal - ${peak}`;
    } else {
      return `${peak} has already been added to your goals`;
    }
  }

  hike(peak, time, difficultyLevel) {
    if (this.goals.hasOwnProperty(peak) == false) {
      throw new Error(`${peak} is not in your current goals`);
    } else {
      if (this.resources == 0) {
        throw new Error(`You don't have enough resources to start the hike`);
      } else {
        let difference = this.resources - time * 10;
        let usedResources = this.resources - difference;
        if (difference < 0) {
          return `You don't have enough resources to complete the hike`;
        } else {
          this.resources -= usedResources;
          this.listOfHikes.push({ peak, time, difficultyLevel });
          return `You hiked ${peak} peak for ${time} hours and you have ${this.resources}% resources left`;
        }
      }
    }
  }

  rest(time) {
    const additionalResources = time * 10;
    if (this.resources + additionalResources >= 100) {
      this.resources = 100;
      return `Your resources are fully recharged. Time for hiking!`;
    } else {
      this.resources += additionalResources;
      return `You have rested for ${time} hours and gained ${additionalResources}% resources`;
    }
  }

  showRecord(criteria) {
    if (this.listOfHikes.length == 0) {
      return `${this.username} has not done any hiking yet`;
    }
    if (criteria == "hard" || criteria == "easy") {
      let matches = this.listOfHikes.filter(
        (el) => el.difficultyLevel == criteria
      );
      if (matches.length > 0) {
        matches.sort((a, b) => a.time - b.time);
        let bestHike = matches[0];
        return `${this.username}'s best ${criteria} hike is ${bestHike.peak} peak, for ${bestHike.time} hours`;
      } else {
        return `${this.username} has not done any ${criteria} hiking yet`;
      }
    } else {
      let result = `All hiking records:`;
      this.listOfHikes.forEach(
        (el) =>
          (result += `\n${this.username} hiked ${el.peak} for ${el.time} hours`)
      );
      return result;
    }
  }
}

const user = new SmartHike("Vili");
user.addGoal("Musala", 2925);
user.hike("Musala", 8, "hard");
console.log(user.showRecord("easy"));
user.addGoal("Vihren", 2914);
user.hike("Vihren", 4, "hard");
console.log(user.showRecord("hard"));
user.addGoal("Rui", 1706);
user.hike("Rui", 3, "easy");
console.log(user.showRecord("all"));
