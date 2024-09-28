import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { decisionTree  } from '../assets/decisionTree';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('questionContainer',{ static: false }) public questionContainer: ElementRef<any> | undefined;
  currentQuestionId : number = 1;
  private decisionTree = {

    1: {
      question: "What is the purpose of a sorting algorithm?",

      correct: 2,

      incorrect: 1
    },



    2: {

      question: "Can you name a few sorting algorithms?",

      correct: 3,

      incorrect: 2

    },

    3: {

      question: "What is the time complexity of Bubble Sort?",

      correct: 4,

      incorrect: 3


    },



    4: {
      question: "Why is Quick Sort generally faster than Bubble Sort?",

      correct: 5,

      incorrect: 4
    },



    5: {

      question: "What is the worst-case time complexity of Quick Sort?",

      correct: 6,

      incorrect: 5

    }
  };

  private questionBank = {
    questions: [
      {id:1,
        question: "What is the purpose of a sorting algorithm?",
        next: {
          correct: 2,
          incorrect: 1
        }
        
      },



      {
        id: 2,

        question: "Can you name a few sorting algorithms?",

        next: {
          correct: 3,
          incorrect: 2
        }

      },

      {
        id: 3,

        question: "What is the time complexity of Bubble Sort?",

        next: {
          correct: 4,
          incorrect: 3
        }


      },



      {
        id: 4,
        question: "Why is Quick Sort generally faster than Bubble Sort?",

        next: {
          correct: 5,
          incorrect: 4
        }
      },



      {
        id: 5,

        question: "What is the worst-case time complexity of Quick Sort?",

        next: {
          correct: 6,
          incorrect: 5
        }

      }
    ]
    
  }
  quesCont: string;

  //title = 'socraticApp';
  constructor(private el: ElementRef) {
    this.quesCont = (<HTMLInputElement>document.getElementById('questionContainer')).innerHTML;
    this.askQuestion();
  }

  //assistant = new AppComponent(this.questionBank, this.decisionTree); 
  //this.assistant.askQuestion();

  askQuestion() {
    
      const question:any = this.questionBank.questions.find(q => q.id === this.currentQuestionId);
    //this.questionContainer.nativeElement.innerText = question.question;
    this.quesCont = question.question;
    
    }
    
    processResponse(response:any) {
    
    let question:any = this.questionBank.questions.find(q => q.id === this.currentQuestionId);
    
    let isCorrect = this.checkResponse (response, question.id);
    
    this.responseCheck(isCorrect);
    
    const nextQuestionId = isCorrect? question.next.correct: question.next.incorrect;
    
    this.currentQuestionId = nextQuestionId;
    
    setTimeout(() => {
    
    this.askQuestion();
    
    }, 2000);
    
    }
    
    responseCheck(isCorrect:any) {
    
    if(isCorrect) {
    
      this.el.nativeElement.getElementById('response-container').innerText = 'Correct!!!';
    
      this.el.nativeElement.getElementById('response-container').style.color = 'green';
    
    }
    
    else {
      this.el.nativeElement.getElementById('response-container').innerText = 'Try Again!!!';
    
      this.el.nativeElement.getElementById('response-container').style.color = 'Red';
    }
    
    setTimeout(() => {
      this.el.nativeElement.getElementById('response-container').innerText = '';
  }, 2000);
    }

  checkResponse(response: any, questionId: any) {
    
      const correctAnswers:any = {


      1: ["to sort data", "to arrange data"],

        2: ["bubble sort", "merge sort", "quick sort", "insertion sort"],

          3: ["o(n^2)", "n squared"],

            4: ["divide and conquer",

              "better average case"],

              5: ["o(n log n)", "n log n"]

    };
    
    
    
    const acceptableAnswers:any = correctAnswers[questionId];
    
    return acceptableAnswers.some((answer:any) => response.toLowerCase().includes(answer));
  }
    
  // Initialize the assistant
    

    
    // Simulate student responses
    
    submitResponse() {
    
    const responseInput:any = document.getElementById('response-input');
    
    const response = responseInput.value.trim().toLowerCase();
    
    this.processResponse(response);
    
    responseInput.value = '';
    
    }
    
}
