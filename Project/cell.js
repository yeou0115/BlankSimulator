class Player {
    constructor(){
        this.name = "";
        this.sex = 0;   //0은 남자, 1은 여자

        this.old = 0;		//현 나이
        this.img = '';	    //화면에 출력될 이미지

        this.happy = 50;	        //현 행복도
        this.health	= 50;	    //현 건강
        this.money = 50;		    //현 자산
    }
    setName(name){
        this.name = name;
    }
    setSex(sex){
        this.sex = sex;
    }
}

class QA {
    constructor(table, r) {
      this.old = int(table.getString(r, 0));
      this.question = table.getString(r, 1);
      this.question_prob = float(table.getString(r, 2));
      this.answer_num = int(table.getString(r, 3));
      this.answer = []; // [ [답변1 내용, 자산, 자산 확률, 행복, 행복확률, 건강, 건강 확률], [답변2 내용, 자산, 자산 확률, 행복, 행복확률, 건강, 건강 확률], ... ]
      this.setAnswer(table, r);
    }
  
    setAnswer(table, r) {
      let lst = [];
      for (let i = 0; i < this.answer_num; i++) {
        lst[i] = [
          table.getString(r, 4 + i * 7 + 0),
          float(table.getString(r, 4 + i * 7 + 1)),
          float(table.getString(r, 4 + i * 7 + 2)),
          float(table.getString(r, 4 + i * 7 + 3)),
          float(table.getString(r, 4 + i * 7 + 4)),
          float(table.getString(r, 4 + i * 7 + 5)),
          float(table.getString(r, 4 + i * 7 + 6))
        ];
      }
      this.answer = lst;
    }
  }

class QuestionScreen {
    constructor(questionText, charImage, age, optionlst, optionNum, index) {
      this.questionText = questionText;
      this.charImage = charImage;
      this.age = age;
      this.optionlst = optionlst;
      this.options = [];
      this.optionNum = optionNum;

      this.index = index;


      this.setOptions();
    }
    
    previewResult(_x,_y,n){
      if(showPreview){
        for (let i = 0; i < 6; i+=2) {
          image(bar, _x, _y + 30 * i + 20, bar_width, bar_height);
        }

        let hap_fu = this.optionlst[n][3];
        let hea_fu = this.optionlst[n][5];
        let mon_fu = this.optionlst[n][1];

        fill(70, 150);
        rect(_x + 7, _y + 30 * 0 + 27, map(player.happy + hap_fu, 0, 100, 0, 186), 18);
        rect(_x + 7, _y + 30 * 2 + 27, map(player.health + hea_fu, 0, 100, 0, 186), 18);
        rect(_x + 7, _y + 30 * 4 + 27, map(player.money + mon_fu, 0, 100, 0, 186), 18);

        textAlign(LEFT, TOP);
        textSize(20);
        fill(255);

        if(hap_fu > 0){
          text('+' + hap_fu +'('+this.optionlst[n][4]*100+'%)', _x + 7 + bar_width, _y + 30 * 0 + 27);
        }else if(hap_fu<0){
          text(hap_fu+'('+this.optionlst[n][4]*100+'%)', _x + 7 + bar_width, _y + 30 * 0 + 27);
        }

        
        if(hea_fu > 0){
          text('+' + hea_fu+'('+this.optionlst[n][6]*100+'%)', _x + 7 + bar_width, _y + 30 * 2 + 27);
        }else if(hea_fu<0){
          text(hea_fu+'('+this.optionlst[n][6]*100+'%)', _x + 7 + bar_width, _y + 30 * 2 + 27);
        }

        
        if(mon_fu > 0){
          text('+' + mon_fu+'('+this.optionlst[n][2]*100+'%)', _x + 7 + bar_width, _y + 30 * 4 + 27);
        }else if(mon_fu<0){
          text(mon_fu+'('+this.optionlst[n][2]*100+'%)', _x + 7 + bar_width, _y + 30 * 4 + 27);
        }

        fill(255); // 선택지 텍스트 색상 흰색
        textAlign(CENTER, CENTER);
        textSize(32);
      }
    }
    drawStage(){
      image(bar3,100,50,300,40);
      image(baby,50,50,40,40);
      image(skull,410,50,40,40);
      fill(255);
      rect(108,60,map(this.age,0,81,0,290),20)
    }

    setOptions(){
      for(let i=0;i<this.optionNum;i++){
        this.options.push(this.optionlst[i][0]);
      }
    }
    displayQuestionScreen() {
      this.drawStage();

      // 질문 이미지 그리기
      image(questionImage, 100, 140, 1400, 360); // 이미지 위치 및 크기 설정
  
      // 리퍼 이미지 그리기
      image(reaperImage, 600, 0, 400, 215); // 이미지 위치 및 크기 설정
        // 돌발 이벤트 문구 표시
        if ([ 2, 8, 9, 12, 13, 21, 22, 26, 32, 34, 42, 45, 47, 48, 50, 57].includes(this.index)) {
          fill(255, 0, 0);
          textSize(60);
          text('랜덤', 500, 130); // 리퍼 이미지 왼쪽
          text('질문', 980, 130); // 리퍼 이미지 오른쪽
        }
      // 텍스트 그리기 (질문)
      textFont(customFont, 29); // 텍스트 폰트 및 크기 설정
      textStyle(NORMAL); // 텍스트 스타일 설정 (일반)
      fill(0); // 질문 텍스트 색상 검은색
      textAlign(LEFT, BASELINE);
      if (frameCount % frameInterval === 0 && textIndex < this.questionText.length) {
        displayText += this.questionText.charAt(textIndex);
        textIndex++;
      }
      text(displayText, 400, 260, 820, 400); // 텍스트 위치 및 영역 설정
  
      // 캐릭터 이미지 그리기
      drawAvatar(playScreen_w/2-100, playScreen_h-100, 150);
    
      //bar 그리기
      drawBar(playScreen_w/2-30,560,player.happy,player.health,player.money);

      // 선택지 텍스트 그리기
      fill(255); // 선택지 텍스트 색상 흰색
      textAlign(CENTER, CENTER);
      textSize(32);
  
      if (mouseX-playScreen_x > 50 && mouseX-playScreen_x < 600 && mouseY-playScreen_y > 600 && mouseY-playScreen_y < 650) {
        text(this.options[0] + " <", 350, 625);
        this.previewResult(playScreen_w/2-30,560, 0);
      } else {
        text(this.options[0], 350, 625);
      }
  
      if (mouseX-playScreen_x > 1000 && mouseX-playScreen_x < 1500 && mouseY-playScreen_y > 600 && mouseY-playScreen_y < 650) {
        text(this.options[1] + " <", 1250, 625);
        this.previewResult(playScreen_w/2-30,560, 1);
      } else {
        text(this.options[1], 1250, 625);
      }
  
      // 원 그리기 및 숫자 배치
      this.drawCirclesWithNumbers(this.age);
    }
  
    displayQuestionScreenOneOption() {
      this.drawStage();
      // 질문 이미지 그리기
      image(questionImage, 100, 140, 1400, 360); // 이미지 위치 및 크기 설정

      // 캐릭터 이미지 그리기
      drawAvatar(playScreen_w/2-100, playScreen_h-100, 150);
      //bar 그리기
      drawBar(playScreen_w/2-30,560,player.happy,player.health,player.money);
      // 리퍼 이미지 그리기
      image(reaperImage, 600, 0, 400, 215); // 이미지 위치 및 크기 설정
      // 돌발 이벤트 문구 표시
      if ([2, 8, 9, 12, 13, 21, 22, 26, 32, 34, 42, 45, 47, 48, 50, 57].includes(this.index)) {
        fill(255, 0, 0);
        textSize(60);
        text('랜덤', 500, 110); // 리퍼 이미지 왼쪽
        text('질문', 1050, 110); // 리퍼 이미지 오른쪽
      }
      // 텍스트 그리기 (질문)
      textFont(customFont, 29); // 텍스트 폰트 및 크기 설정
      textStyle(NORMAL); // 텍스트 스타일 설정 (일반)
      fill(0); // 질문 텍스트 색상 검은색
      textAlign(LEFT, BASELINE);
      if (frameCount % frameInterval === 0 && textIndex < this.questionText.length) {
        displayText += this.questionText.charAt(textIndex);
        textIndex++;
      }
      text(displayText, 400, 260, 820, 400); // 텍스트 위치 및 영역 설정

  
      // 선택지 텍스트 그리기
      fill(255); // 선택지 텍스트 색상 흰색
      textAlign(CENTER, CENTER);
      textSize(32);
  
      if (mouseX -playScreen_x> 50 && mouseX -playScreen_x< 600 && mouseY -playScreen_y> 600 && mouseY -playScreen_y< 650) {
        text(this.options + " <", 350, 625);
        this.previewResult(playScreen_w/2-30,560, 0);
      } else {
        text(this.options, 350, 625);
      }
  
      // 원 그리기 및 숫자 배치
      this.drawCirclesWithNumbers(this.age);
    }
  
    displayQuestionScreenThreeOptions() {
      this.drawStage();
      // 캐릭터 이미지 그리기
      drawAvatar(playScreen_w/2-100, playScreen_h-100, 150);
    
      //bar 그리기
      drawBar(playScreen_w/2-30,560,player.happy,player.health,player.money);

      // 질문 이미지 그리기
      image(questionImage, 100, 140, 1400, 360); // 이미지 위치 및 크기 설정
  
      // 리퍼 이미지 그리기
      image(reaperImage, 600, 0, 400, 215); // 이미지 위치 및 크기 설정
        // 돌발 이벤트 문구 표시
        if ([2, 8, 9, 12, 13, 21, 22, 26, 32, 34, 42, 45, 47, 48, 50, 57].includes(this.index)) {
          fill(255, 0, 0);
          textSize(60);
          text('랜덤', 500, 110); // 리퍼 이미지 왼쪽
          text('질문', 1050, 110); // 리퍼 이미지 오른쪽
        }
      // 텍스트 그리기 (질문)
      textFont(customFont, 29); // 텍스트 폰트 및 크기 설정
      textStyle(NORMAL); // 텍스트 스타일 설정 (일반)
      fill(0); // 질문 텍스트 색상 검은색
      textAlign(LEFT, BASELINE);
      if (frameCount % frameInterval === 0 && textIndex < this.questionText.length) {
        displayText += this.questionText.charAt(textIndex);
        textIndex++;
      }
      text(displayText, 400, 260, 820, 400); // 텍스트 위치 및 영역 설정

  
      // 선택지 텍스트 그리기
      fill(255); // 선택지 텍스트 색상 흰색
      textAlign(CENTER, CENTER);
      textSize(32);
  
      // 첫 번째 선택지
      if (mouseX-playScreen_x > 50 && mouseX-playScreen_x < 600 && mouseY-playScreen_y > 550 && mouseY-playScreen_y< 600) {
        text(this.options[0] + " <", 350, 575);
        this.previewResult(playScreen_w/2-30,560, 0);
      } else {
        text(this.options[0], 350, 575);
      }
  
      // 두 번째 선택지
      if (mouseX-playScreen_x > 50 && mouseX-playScreen_x < 600 && mouseY-playScreen_y > 650 && mouseY-playScreen_y < 700) {
        text(this.options[1] + " <", 350, 675);
        this.previewResult(playScreen_w/2-30,560, 1);
      } else {
        text(this.options[1], 350, 675);
      }
  
      // 세 번째 선택지
      if (mouseX-playScreen_x > 1000 && mouseX-playScreen_x < 1500 && mouseY-playScreen_y > 600 && mouseY-playScreen_y < 650) {
        text(this.options[2] + " <", 1250, 625);
        this.previewResult(playScreen_w/2-30,560, 2);
      } else {
        text(this.options[2], 1250, 625);
      }
  
      // 원 그리기 및 숫자 배치
      this.drawCirclesWithNumbers(this.age);
    }
  
    displayQuestionScreenFourOptions() {
      this.drawStage();
      // 캐릭터 이미지 그리기
      drawAvatar(playScreen_w/2-100, playScreen_h-100, 150);
    
      //bar 그리기
      drawBar(playScreen_w/2-30,560,player.happy,player.health,player.money);

      // 질문 이미지 그리기
      image(questionImage, 100, 140, 1400, 360); // 이미지 위치 및 크기 설정
  
      // 리퍼 이미지 그리기
      image(reaperImage, 600, 0, 400, 215); // 이미지 위치 및 크기 설정
      // 돌발 이벤트 문구 표시
        if ([2, 8, 9, 12, 13, 21, 22, 26, 32, 34, 42, 45, 47, 48, 50, 57].includes(this.index)) {
          fill(255, 0, 0);
          textSize(60);
          text('랜덤', 500, 110); // 리퍼 이미지 왼쪽
          text('질문', 1050, 110); // 리퍼 이미지 오른쪽
        }
      // 텍스트 그리기 (질문)
      textFont(customFont, 29); // 텍스트 폰트 및 크기 설정
      textStyle(NORMAL); // 텍스트 스타일 설정 (일반)
      fill(0); // 질문 텍스트 색상 검은색
      textAlign(LEFT, BASELINE);
      if (frameCount % frameInterval === 0 && textIndex < this.questionText.length) {
        displayText += this.questionText.charAt(textIndex);
        textIndex++;
      }
      text(displayText, 400, 260, 820, 400); // 텍스트 위치 및 영역 설정
  
      // 선택지 텍스트 그리기
      fill(255); // 선택지 텍스트 색상 흰색
      textAlign(CENTER, CENTER);
      textSize(32);
  
      // 첫 번째 선택지
      if (mouseX-playScreen_x > 50 && mouseX-playScreen_x < 600 && mouseY-playScreen_y > 550 && mouseY-playScreen_y < 600) {
        text(this.options[0] + " <", 400, 575);
        this.previewResult(playScreen_w/2-30,560, 0);
      } else {
        text(this.options[0], 400, 575);
      }
  
      // 두 번째 선택지
      if (mouseX-playScreen_x > 50 && mouseX-playScreen_x < 600 && mouseY-playScreen_y > 650 && mouseY-playScreen_y < 700) {
        text(this.options[1] + " <", 400, 675);
        this.previewResult(playScreen_w/2-30,560, 1);
      } else {
        text(this.options[1], 400, 675);
      }
  
      // 세 번째 선택지
      if (mouseX-playScreen_x > 1050 && mouseX-playScreen_x < 1500 && mouseY-playScreen_y > 550 && mouseY-playScreen_y < 600) {
        text(this.options[2] + " <", 1250, 575);
        this.previewResult(playScreen_w/2-30,560, 2);
      } else {
        text(this.options[2], 1250, 575);
      }
  
      // 네 번째 선택지
      if (mouseX-playScreen_x > 1050 && mouseX-playScreen_x < 1500 && mouseY-playScreen_y > 650 && mouseY-playScreen_y < 700) {
        text(this.options[3] + " <", 1250, 675);
        this.previewResult(playScreen_w/2-30,560, 3);
      } else {
        text(this.options[3], 1250, 675);
      }
  
      // 원 그리기 및 숫자 배치
      this.drawCirclesWithNumbers(this.age);
    }

    displayQuestionScreen2() {
        this.drawStage();
        // 캐릭터 이미지 그리기
        drawAvatar(playScreen_w/2-100, playScreen_h-100, 150);
      
        //bar 그리기
        drawBar(playScreen_w/2-30,560,player.happy,player.health,player.money);
        // 질문 이미지 그리기
        image(questionImage, 100, 140, 1400, 360); // 이미지 위치 및 크기 설정
      
        // 리퍼 이미지 그리기
        image(reaperImage, 600, 0, 400, 215); // 이미지 위치 및 크기 설정
        // 돌발 이벤트 문구 표시
        if ([2, 8, 9, 12, 13, 21, 22, 26, 32, 34, 42, 45, 47, 48, 50, 57].includes(this.index)) {
          fill(255, 0, 0);
          textSize(60);
          text('랜덤', 500, 110); // 리퍼 이미지 왼쪽
          text('질문', 1050, 110); // 리퍼 이미지 오른쪽
        }
        // 텍스트 그리기 (질문)
        textFont(customFont, 29); // 텍스트 폰트 및 크기 설정
        textStyle(NORMAL); // 텍스트 스타일 설정 (일반)
        fill(0); // 질문 텍스트 색상 검은색
        textAlign(LEFT, BASELINE);
        if (frameCount % frameInterval === 0 && textIndex < this.questionText.length) {
          displayText += this.questionText.charAt(textIndex);
          textIndex++;
        }
        text(displayText, 400, 260, 820, 400); // 텍스트 위치 및 영역 설정

      
        // 선택지 텍스트 그리기
        fill(255); // 선택지 텍스트 색상 흰색
        textAlign(CENTER, CENTER);
        textSize(32);
      
        let leftOptions = this.options.slice(0, 3);
        let rightOptions = this.options.slice(3);
      
        // 왼쪽에 선택지 배치
        for (let i = 0; i < leftOptions.length; i++) {
          if (mouseX-playScreen_x > 350 && mouseX-playScreen_x < 550 && mouseY-playScreen_y > (525 + i * 50) && mouseY-playScreen_y < (575 + i * 50)) {
            text(leftOptions[i] + " <", 450, 550 + i * 50);
            this.previewResult(playScreen_w/2-30,560, i);
          } else {
            text(leftOptions[i], 450, 550 + i * 50);
          }
        }
      
        // 오른쪽에 선택지 배치
        for (let i = 0; i < rightOptions.length; i++) {
          if (mouseX-playScreen_x > 1050 && mouseX-playScreen_x < 1250 && mouseY-playScreen_y > (525 + i * 50) && mouseY-playScreen_y < (575 + i * 50)) {
            text(rightOptions[i] + " <", 1150, 550 + i * 50);
            this.previewResult(playScreen_w/2-30,560, 3+i);
          } else {
            text(rightOptions[i], 1150, 550 + i * 50);
          }
        }
      
        // 원 그리기 및 숫자 배치
        this.drawCirclesWithNumbers(this.age);
      }
  

drawCirclesWithNumbers(age) {
  let ageStr = age.toString().replace("-1", ""); // '-1' 제거
  let firstDigit = int(ageStr.charAt(0));
  let startNumber = firstDigit * 10;
  let endNumber = int(ageStr);
  player.old = age;
  
  for (let i = 0; i < 10; i++) {
    let x = 100 + i * 150; // 원의 x 좌표 간격 설정
    let y = 850; // 원의 y 좌표 설정
    let width = 120; // 원의 너비 설정
    let height = 70; // 원의 높이 설정
    let height2 = 80;
    let currentNumber = startNumber + i;
        // 원 안에 숫자 그리기
    fill(255); // 숫자 색상 하얀색
    textAlign(CENTER, CENTER);
    textSize(35);
    angle+=0.005

    if (currentNumber > endNumber) {
      image(circleB, x - width / 2, y - height / 2, width, height); // 검은색 원 이미지 그리기
    } else if (currentNumber === endNumber) {
      image(circleW, x - width / 2, y - height2 / 2, width, height2); // 흰색 원 이미지 그리기
      text(currentNumber+"세", x, y-2);
      textSize(25);
      fill(255);
      text("▼", x, y-47+ sin(angle)*3);
    } else {
      image(circleG, x - width / 2, y - height2 / 2, width, height2); // 회색 원 이미지 그리기
      text(currentNumber, x, y-2);
    }


    
  }
}

  }

  class Square {
    constructor(_x, _y, _size) {
        this.x = _x;
        this.y = _y;
        this.size = _size;
        this.event = "None";
        this.c = color(random(255), random(255), random(255));
    }

    display() {
        noStroke();
        fill(this.c);
        rect(this.x, this.y+50, this.size, this.size);

        if (mouseX > this.x && mouseX < this.x + this.size && mouseY > this.y+50 && mouseY < this.y+50 + this.size) {
            stroke(0);
            fill(this.c);
            rect(this.x, this.y+50, this.size, this.size);
        }
    }

    putEvent(event) {
        this.event = event;
        this.c = color(255, 0, 0);
    }

    showEvent() {
        if (this.event != "None") {
            fill(0);
            noStroke();
            text(this.event, mouseX, mouseY);
        }
    }

    isClicked(expandedSquareSize, centerX, centerY, i, j) {
      let newX = centerX + j * expandedSquareSize;
      let newY = centerY + i * expandedSquareSize;
      return mouseX > newX && mouseX < newX + expandedSquareSize && mouseY > newY && mouseY < newY + expandedSquareSize;
  }
}

class Calendar {
    constructor(_x, _y, _w, _h, _cols, _rows) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
        this.cols = _cols;
        this.rows = _rows;
        this.squares = [];
        this.initSquares();
    }

    initSquares() {
        let squareSize = this.w / (this.cols + 3);  // 칸의 크기 설정
        let offsetX = 80;
        let offsetY = 120;
        for (let i = 0; i < this.rows; i++) {
            this.squares[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.squares[i][j] = new Square(this.x + j * squareSize + offsetX, this.y + i * squareSize + offsetY, squareSize);
            }
        }
        // 마지막 칸의 위치를 왼쪽 끝에 두기 위해서
        this.squares.push(new Square(this.x + offsetX, this.y + this.rows * squareSize + offsetY, squareSize));
    }

    display() {
        image(calendarImg, this.x, this.y, this.w, this.h);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.squares[i][j].display();
            }
        }
        this.squares[this.squares.length - 1].display(); // 마지막 칸을 표시합니다.
    }

    isClicked(expandedSquareSize, centerX, centerY) {
      for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
              if (this.squares[i][j].isClicked(expandedSquareSize, centerX, centerY, i, j)) {
                  return true;
              }
          }
      }
      if (this.squares[this.squares.length - 1].isClicked(expandedSquareSize, centerX, centerY, this.rows, 0)) {
          return true;
      }
      return false;
  }
}