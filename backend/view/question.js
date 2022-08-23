const uuid = require('uuid');
class Question
{
    constructor(tech,details,options,correctAnswer,complexity)
    {
        this.Id = uuid.v4();
        this.tech = tech;
        this.details = details;
        this.options = options;
        this.selectedAnswer = "";
        this.correctAnswer = correctAnswer;
        this.complexity = complexity;
        if(this.complexity > 8) this.outOffScore = 5;
        else if(this.complexity > 5) this.outOffScore = 3;
        else if(this.complexity > 3) this.outOffScore = 2;
        else this.outOffScore = 1;
        this.negativeMark = 0.25 * this.outOffScore;
    }

}

module.exports = Question;