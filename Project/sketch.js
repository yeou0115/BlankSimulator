//정웅님이 추가로 선언한 변수(게임 메인 진행과정에서 필요)//////////////
let questionImage, reaperImage, characterImage, secondCharacterImage, randomImage, circleB, circleW, circleG;
let textIndex = 0;
let displayText = "";
let frameInterval = 1; // 텍스트가 나타나는 속도를 조절하기 위한 프레임 간격
let selectedOptions = []; // 사용자가 선택한 선택지를 저장할 배열
let selectedPath = [];
let probabilityCheck10 = undefined; // case 10에서의 확률 체크 여부 저장
let probabilityCheck12 = undefined;
let probabilityCheck18 = undefined;
let probabilityCheck19 = undefined;
let probabilityCheck22 = undefined;
let probabilityCheck23 = undefined;
let probabilityCheck30 = undefined;
let probabilityCheck31 = undefined;
let probabilityCheck32 = undefined;
let probabilityCheck36 = undefined;
let probabilityCheck42 = undefined;
let probabilityCheck44 = undefined;
let probabilityCheck48 = undefined;
let probabilityCheck52 = undefined;
let probabilityCheck55 = undefined;
let probabilityCheck57 = undefined;
let probabilityCheck58 = undefined;
let probabilityCheck60 = undefined;
let probabilityCheck66 = undefined;
let probabilityCheck67 = undefined;

////////////////////////////////////////////////////
let mode = 0; //화면 전환
let inputBox;
let inputActive = true;
let player  //player 선언

let happy, health, money;
let happy_h, health_h, money_h;
let bar_interval = 3000;
let bar_speed = 50;

let question_setlist;  //질문 csv 파일 받을 변수 선언
let question_list = [];  //QA 클래스 저장할 리스트;

let playScreen_w = 1600;  //플레이 화면 가로
let playScreen_h = 900; //플레이 화면 세로
let playScreen_x, playScreen_y; //플레이 화면 왼쪽 상단 x,y좌표

let customFont;  //폰트 변수
let start_reaper, female_icon, male_icon, opening_reaper_default, opening_reaper_smiling; //오프닝 관련 이미지 변수
let baby, skull, bar3;
let bar, happy_word, happy_icon, health_word, health_icon, money_word, money_icon;  //바 관련 이미지 변수

let avatar = [[], []];

let time = 0;
let time_open = 0;
let angle = 0;
//플레이어 입력값 받기
let inputText = '';

//페이드 인 페이드 아웃
let alpha = 0;
let fadeDirection = 1; // 1 for fade in, -1 for fade out
const fadeSpeed = 2; // 페이드 속도 조절

//타이핑 애니메이션
let typeIndex = 0;
let currentChatIndex = 0;
let charIndex = 0;
let typingCounter = 0;
let displayCounter = 0;
let currentDisplayText = '';

let typingSpeed = 3; // 타이핑 속도 (프레임 단위)
let displayTime = 150; // 한 문장이 화면에 완전히 표시된 후 유지되는 시간 (프레임 단위)
/////////////////////////////////////////
//희원님이 추가로 선언한 변수(게임 엔딩에 필요)////////////////////
let mouseover_calendar, mouseover_papyrus, papyrusicon, calendaricon, ending_reaper, calendar_outline, papyrus_outline;
let showPapyrus = false;
let showCalendar = false;
let clickedPapyrus = false;
let clickedCalendar = false;
let numberImages = [];
let papyrusClickCount = 0;
let calendarClickCount = 0;
let showRestartMessage = false;
let showThankYouMessage = false;
let buttonYes, buttonNo;
let answersByAge = {};  // 나이에 따른 답변을 저장할 객체
let selectedAnswersByAge = {};  // 선택된 답변을 저장할 객체
let questionList;  // CSV 파일에서 로드한 질문 리스트 제가 생각하기에는 이게 문제인 거 같긴 합니다
let closebutton;
// 아이콘의 위치 설정
let calendarX, calendarY, calendarW, calendarH, papyrusX, papyrusY, papyrusW, papyrusH;
let closebuttonX, closebuttonY, closebuttonW, closebuttonH;

// selectedPath 초기화
function initializeSelectedPath(size) {
  selectedPath = new Array(size).fill(false);
}

// 초기화 호출
initializeSelectedPath(60);  // 예: 60개의 질문에 대한 경로 설정

// 애니메이션 배열
let animationImages = [];
let animationIndex = 0;
let animationFrameInterval = 90; // 속도 조절
let animationCounter = 0;

// 변신 시 문구
let sentenceIndex = 0;
let sentenceDisplayTime = 200; // 속도 조절
let sentenceCounter = 0;

//음악 관련
let sound1, sound2, clickSound; // Add more as needed
let currentSound;

// 엔딩 이미지 관련 변수
let end_image = [];

function preload() {
  //나현 파트
  customFont = loadFont('assets/neodgm.ttf');
  start_reaper = loadImage('assets/start reaper.jpg')
  female_icon = loadImage('assets/female_icon.png');
  male_icon = loadImage('assets/male_icon.png');
  opening_reaper_default = loadImage('assets/opening reaper default.png');
  opening_reaper_smiling = loadImage('assets/opening reaper smiling.png');
  bar = loadImage('assets/bar.jpg');
  happy_word = loadImage('assets/happy_word.png');
  happy_icon = loadImage('assets/happy_icon.png');
  health_word = loadImage('assets/health_word.png');
  health_icon = loadImage('assets/health_icon.png');
  money_word = loadImage('assets/money_word.png');
  money_icon = loadImage('assets/money_icon.png');
  question_setlist = loadTable('assets/question_list.csv', 'csv', 'header');
  baby = loadImage('assets/baby.png');
  skull = loadImage('assets/skull.png');
  bar3 = loadImage('assets/bar3.png');


  //정웅님 이미지
  questionImage = loadImage('assets/banner.png'); // 경로 수정
  reaperImage = loadImage('assets/reaper face main.png'); // 경로 수정
  avatar[0].push(loadImage('assets/male/male_0.png'));
  avatar[1].push(loadImage('assets/female/female_0.png'));
  for (let i = 1; i < 9; i++) {
    avatar[0].push(loadImage('assets/male/male_' + i * 10 + '.gif'));
    avatar[1].push(loadImage('assets/female/female_' + i * 10 + '.gif'));
  }

  circleB = loadImage('assets/black_circle.png');
  circleW = loadImage('assets/white_circle.png');
  circleG = loadImage('assets/gray_circle.png');

  //희원님 이미지
  mouseover_papyrus = loadImage('assets/mouseover_papyrus.jpg'); // 마우스오버 파피루스 이미지 로드
  mouseover_calendar = loadImage('assets/mouseover_calendar.png'); // 마우스오버 캘린더 이미지 로드
  ending_reaper = loadImage('assets/ending_reaper.jpg'); // 엔딩 이미지 로드
  papyrusicon = loadImage('assets/papyrusicon.png'); // 파피루스 아이콘 로드
  calendaricon = loadImage('assets/calendaricon.png');
  calendar_outline = loadImage('assets/calendar_outline.png');
  papyrus_outline = loadImage('assets/papyrus_outline.png');
  numberImages = [];  // 숫자 이미지 배열 초기화
  questionList = loadTable('assets/question_list.csv', 'csv', 'header');
  for (let i = 1; i <= 80; i++) {
    let img = loadImage(`assets/calendar_num/calendar_num/${i}.png`);  // 숫자 이미지 경로에 맞게 수정
    numberImages.push(img);
  }
  closebutton = loadImage('assets/back_button.png');
  //도경 애니메이션 이미지
  for (let i = 1; i <= 7; i++) {
    animationImages.push(loadImage(`assets/frame${i}.png`));
  }

  //음악 삽입
  sound1 = loadSound('assets/Pixel_Dreams.mp3');
  sound2 = loadSound('assets/Ending.mp3');
  clickSound = loadSound('assets/button.wav');

  // 엔딩 삽입 이미지 with 캘린더
  end_image = []
  end_image[11] = loadImage('assets/11danceandsing.png')
  end_image[12] = loadImage('assets/12food.png')
  end_image[18] = end_image[22] = loadImage('assets/1822crossroad.png')
  end_image[21] = loadImage('assets/21smoke.png')
  end_image[27] = loadImage('assets/27companyfreelance.png')
  end_image[29] = loadImage('assets/29hobby.png')
  end_image[30] = loadImage('assets/30finance.png')
  end_image[31] = loadImage('assets/31car.png')
  end_image[32] = loadImage('assets/32marriage.png')
  end_image[33] = end_image[47] = loadImage('assets/3347promotion.png')
  end_image[34] = loadImage('assets/34baby.png')
  end_image[35] = loadImage('assets/35changingwork.png')
  end_image[41] = loadImage('assets/41home.png')
  end_image[44] = loadImage('assets/44hairloss.png')
  end_image[45] = loadImage('assets/45friends.png')
  end_image[49] = loadImage('assets/49concert.png')
  end_image[50] = loadImage('assets/50retirement.png')
  end_image[51] = end_image[70] = loadImage('assets/5170newjob.png')
  end_image[52] = loadImage('assets/52lottery.png')
  end_image[53] = loadImage('assets/53workout.png')
  end_image[54] = loadImage('assets/54parents.png')
  end_image[57] = loadImage('assets/57drunkdriving2.png')
  end_image[59] = loadImage('assets/59drinking.png')
  end_image[62] = loadImage('assets/62pets.png')
  end_image[65] = loadImage('assets/65pension.png')
  end_image[77] = loadImage('assets/77travel.png')
  end_image[80] = loadImage('assets/80life.png')
  end_image[79] = loadImage('assets/79thief.png')
  end_image[75] = loadImage('assets/75town.png');
  end_image[68] = loadImage('assets/68hospital.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  playScreen_x = (width - playScreen_w) / 2;  //플레이 화면 x좌표 설정
  playScreen_y = (height - playScreen_h) / 2; //플레이 화면 y좌표 설정
  textFont(customFont);
  player = new Player;
  happy = player.happy;
  health = player.health;
  money = player.money;
  happy_h = player.happy;
  health_h = player.health;
  money_h = player.money;
  for (let i = 0; i < question_setlist.getRowCount(); i++) {
    let qa = new QA(question_setlist, i);
    question_list.push(qa);
  }
  calendar = new Calendar(calendarX, calendarY, calendarW, calendarH, 10, 8);
  background(50);
  //희원 추가 파트
  buttonYes = createButton('예');
  buttonYes.position(width / 2 - 100, height / 2 + 400);
  buttonYes.style('background-color', 'black');
  buttonYes.style('color', 'white');
  buttonYes.style('border', 'none');
  buttonYes.style('padding', '10px 20px');
  buttonYes.style('font-size', '16px');
  buttonYes.mousePressed(resetGame);
  buttonYes.hide();
  buttonNo = createButton('아니요');
  buttonNo.position(width / 2 + 50, height / 2 + 400);
  buttonNo.style('background-color', 'black');
  buttonNo.style('color', 'white');
  buttonNo.style('border', 'none');
  buttonNo.style('padding', '10px 20px');
  buttonNo.style('font-size', '16px');
  buttonNo.mousePressed(showThankYou);
  buttonNo.hide();
  parseQuestionList();
  // Pixel Dreams 디폴트로 틀기
  currentSound = sound1;
  //currentSound.play();
  currentSound.loop()
  // 입력 박스 생성 및 스타일 설정
  inputBox = createInput();
  inputBox.position(-1000, -1000);  // 이름 입력 박스 위치 설정
  inputBox.size(200, 30);  // 크기 설정
  inputBox.input(updateText);
  inputBox.elt.focus();  // 입력 필드를 항상 포커스 상태로 유지
  inputBox.elt.addEventListener('focusout', () => inputBox.elt.focus());  // 포커스가 나가지 않도록 설정
  // 초기화
  inputText = '';
}

function updateText() {
  inputText = this.value();  // 입력 필드의 값을 inputText에 저장
}

function parseQuestionList() { //희원 추가 - 나이에 따른 값 저장
  for (let i = 0; i < questionList.getRowCount(); i++) {
    let row = questionList.getRow(i);
    let age = parseInt(row.get('나이'));  // '나이' 열의 값을 정수로 변환
    let answers = [];
    for (let j = 1; j <= 7; j++) {  // 최대 7개의 답변까지 처리
      let answer = row.get(`답변${j} 내용`);
      if (answer) {
        answers.push(answer);
      }
    }
    answersByAge[age] = answers;
  }
}

function draw() {
  if (mode >= 10) {
    resetTime();
  }
  if (mode === 90 && currentSound !== sound2) { //mode 90에서 음악 바꾸기
    currentSound.stop();
    currentSound = sound2;
    currentSound.play();
  }
  if (mode === 0 && currentSound === sound2) { //재시작시 mode 0에서 음악 바꾸기
    currentSound.stop();
    currentSound = sound1;
    currentSound.loop();
  }
  push();
  translate(playScreen_x, playScreen_y);
  fill(0);  //플레이 화면 컬러
  rectMode(CORNER);
  rect(0, 0, playScreen_w, playScreen_h);  //플레이 화면
  fill(130);
  textSize(30);
  textAlign(RIGHT);
  text("ESC : 메인 화면으로", playScreen_w, -30)
  switch (mode) {
    case 0: //시작 화면
      drawImageCenter(start_reaper, playScreen_w / 2, playScreen_h / 2 - 50, 500);
      textAlign(CENTER, CENTER);
      fill(244, 234, 224);
      textSize(25);
      let message = '“인생은 흘러가는 것이 아니라 채워지는 것이다.” - 존 러스킨'
      if ((frameCount % 3 === 0 || frameCount % 11 === 0) && typeIndex < message.length) typeIndex++;
      let textToShow = message.substring(0, typeIndex);
      text(textToShow, playScreen_w / 2, 100)

      if (typeIndex == message.length) {
        if (frameCount % 5 == 0) time_open += 1;
        fill(244, 234, 224, alpha = time_open * 5);
        textSize(60);
        text('"__빈칸__" 시뮬레이터', playScreen_w / 2, playScreen_h / 2 + 250);
      }
      if (time_open > 20) {
        textSize(25);
        text("Enter를 눌러 시작하기", playScreen_w - 180, playScreen_h - 70);
        if (keyIsPressed) {
          if (keyCode == ENTER) {
            mode += 1;
            time_open = 0;
            typeIndex = 0;
          }
        }
      }
      break;
    case 1: //경고 문구
      fill(196, 12, 12, alpha);
      textSize(30);
      textAlign(CENTER, CENTER);
      text("[주의]\n\n본 게임은 질문을 통해 인생을 간단히 시뮬레이션해보는 게임입니다. \n과몰입은 지양해주세요.", playScreen_w / 2, playScreen_h / 2);
      alpha += fadeDirection * fadeSpeed;
      if (alpha > 370) {
        fadeDirection = -1; // 페이드 아웃 시작
      } else if (alpha < -200) {
        mode += 1;
        fadeDirection = 1;
      }
      break;
    case 2:  //시작 멘트
      drawImageCenter(opening_reaper_default, playScreen_w / 2, playScreen_h / 2 - 100, 800);
      let chats = ["안녕?", "음.. 자기소개를 해야겠지..? 보다시피 난 사신이야.", "놀랄 필요 없어. 죽은 건 아니니까.",
        "난 너에게 인생을 미리 체험해 볼 기회를 주러 왔어.", "앞으로 무슨 일을 겪게 될지 \n 아니면 또 다른 인생은 어떨지 \n 궁금하지?",
        "대신 인생을 체험한다는 건 쉬운 일이 아니야. \n 내가 던지는 질문에 하나의 선택지만 골라야 하거든.",
        "그래도 힌트로 질문을 선택하기 전에 \n 결과를 미리 볼 수 있게 해뒀으니깐 참고하길 바라.",
        "준비 됐지?", "좋아 :D", '']
      textAlign(CENTER, TOP);
      fill(244, 234, 224);
      if (currentChatIndex == 4) drawImageCenter(opening_reaper_smiling, playScreen_w / 2, playScreen_h / 2 - 100, 800);;
      if (currentChatIndex == 9) displayTime = 130;
      if (currentChatIndex == 2) drawImageCenter(opening_reaper_smiling, playScreen_w / 2, playScreen_h / 2 - 100, 800);;
      if (currentChatIndex == chats.length - 2) drawImageCenter(opening_reaper_smiling, playScreen_w / 2, playScreen_h / 2 - 100, 800);;
      if (currentChatIndex == chats.length - 1) mode += 1;
      noStroke();
      textSize(32);
      typewriter(chats, playScreen_w / 2, playScreen_h / 2 + 200);
      break;
    case 3:   //이름 입력
      drawImageCenter(opening_reaper_default, playScreen_w / 2, playScreen_h / 2 - 100, 800);
      textAlign(CENTER, TOP);
      fill(244, 234, 224);
      noStroke();
      textSize(32);
      text("아래 빈칸에 네 이름을 바로 적고 Enter키를 눌러.", playScreen_w / 2, playScreen_h / 2 + 200);
      textSize(40);
      text("__________의 시뮬레이터", playScreen_w / 2, playScreen_h / 2 + 250)
      text(inputText, playScreen_w / 2 - 130, playScreen_h / 2 + 250)
      if (keyIsPressed && keyCode === ENTER && inputText.length > 0) {
        player.name = inputText;  // 플레이어 이름 저장
        inputText = '';
        inputBox.value('');  // 입력 박스 초기화
        inputBox.hide();  // 입력 박스를 숨깁니다.
        inputActive = false;  // 입력 비활성화
        mode += 1;
      }
      break;
    case 4:   //성별 선택
      drawImageCenter(opening_reaper_default, playScreen_w / 2, playScreen_h / 2 - 100, 800);

      rectMode(CENTER);
      let male_icon_x = playScreen_w / 2 - 200
      let female_icon_x = playScreen_w / 2 + 200
      let icon_y = playScreen_h / 2 + 320
      let icon_size = 200;
      //남자 아이콘
      if (mouseX - playScreen_x > male_icon_x - icon_size / 2 && mouseX - playScreen_x < male_icon_x + icon_size / 2
        && mouseY - playScreen_y > icon_y - icon_size / 2 && mouseY - playScreen_y < icon_y + icon_size / 2) {
        drawImageCenter(opening_reaper_smiling, playScreen_w / 2, playScreen_h / 2 - 100, 800);
        fill(244, 234, 224);
        rect(male_icon_x, icon_y, icon_size - 10, icon_size - 10);
        drawImageCenter(male_icon, male_icon_x, icon_y, icon_size + 30);
        if (mouseIsPressed) {
          player.setSex(0)
          mode = 10;
        }
      } else {
        fill(100);
        rect(male_icon_x, icon_y, icon_size - 10, icon_size - 10);
        drawImageCenter(male_icon, male_icon_x, icon_y, icon_size);
      }
      fill(244, 234, 224);
      textSize(32);
      textAlign(CENTER, TOP);
      text("남자", male_icon_x - 20, icon_y + 70);
      //여자 아이콘
      if (mouseX - playScreen_x > female_icon_x - icon_size / 2 && mouseX - playScreen_x < female_icon_x + icon_size / 2
        && mouseY - playScreen_y > icon_y - icon_size / 2 && mouseY - playScreen_y < icon_y + icon_size / 2) {
        drawImageCenter(opening_reaper_smiling, playScreen_w / 2, playScreen_h / 2 - 100, 800);
        fill(244, 234, 224);
        rect(female_icon_x, icon_y, icon_size - 10, icon_size - 10);
        drawImageCenter(female_icon, female_icon_x, icon_y, icon_size + 30);
        if (mouseIsPressed) {
          player.setSex(1);
          mode = 10
        }
      } else {
        fill(100);
        rect(female_icon_x, icon_y, icon_size - 10, icon_size - 10);
        drawImageCenter(female_icon, female_icon_x, icon_y, icon_size);
      }
      fill(244, 234, 224);
      textSize(32);
      textAlign(CENTER, TOP);
      text("여자", female_icon_x, icon_y + 70);

      //질문
      textAlign(CENTER, TOP);
      fill(244, 234, 224);
      noStroke();
      textSize(32);
      text(player.name + "이라... 좋아, 이번엔 네 성별을 알려줘. 고르는 순간 시작이야.", playScreen_w / 2, playScreen_h / 2 + 180);
      break;
    case 10:
      createQuestionScreen(0);

      break;
    case 11:
      createQuestionScreen(1);
      break;
    case 13:
      createQuestionScreen(3);
      break;
    case 15:
      createQuestionScreen(5);
      break;
    case 16:
      if (selectedPath[6]) createQuestionScreen(6);
      else mode = 17;  // 다음 단계로 이동
      break;
    case 17:
      if (selectedPath[7]) createQuestionScreen(7);
      else mode = 20;  // 다음 단계로 이동
      break;
    case 20:
      if (selectedPath[10]) createQuestionScreen(10);
      else mode = 21;  // 다음 단계로 이동
      break;
    case 21:
      if (selectedPath[11]) createQuestionScreen(11);
      else mode = 23;  // 다음 단계로 이동
      break;
    case 23:
      if (probabilityCheck23 === undefined) {
        let probability23 = 0.7;

        // 확률에 따라 실행 여부 결정
        probabilityCheck23 = Math.random() < probability23;
      }

      if (probabilityCheck23) {

        createQuestionScreen(13);
      } else {

        mode = 24;
      }
      break;
    case 24:
      createQuestionScreen(14);
      break;
    case 25:
      createQuestionScreen(15);
      break;
    case 26:
      createQuestionScreen(16);
      break;
    case 27:
      if (selectedPath[17]) createQuestionScreen(17);
      else mode = 28;
      break;
    case 28:
      if (selectedPath[18]) createQuestionScreen(18);
      else mode = 29;
      break;
    case 29:
      createQuestionScreen(19);
      break;
    case 30:

      createQuestionScreen(20);

      break;
    case 38:
      createQuestionScreen(28);
      break;
    case 42:
      if (probabilityCheck42 === undefined) {
        let probability42 = 0.4;

        // 확률에 따라 실행 여부 결정
        probabilityCheck42 = Math.random() < probability42;
      }

      if (probabilityCheck42) {

        createQuestionScreen(32);
      } else {

        mode = 43;
      }
      break;
    case 43:
      createQuestionScreen(33);
      break;
    case 45:
      if (selectedPath[35]) createQuestionScreen(35);
      else mode = 46;
      break;
    case 46:
      if (selectedPath[36]) createQuestionScreen(36);
      else mode = 48;
      break;
    case 48:
      createQuestionScreen(38);
      break;
    case 49:
      if (selectedPath[39]) createQuestionScreen(39);
      else mode = 50;
      break;
    case 50:
      if (selectedPath[40]) createQuestionScreen(40);
      else mode = 51;
      break;
    case 51:
      createQuestionScreen(41);
      break;
    case 52:
      if (probabilityCheck52 === undefined) {
        let probability52 = 0.01;

        // 확률에 따라 실행 여부 결정
        probabilityCheck52 = Math.random() < probability52;
      }

      if (probabilityCheck52) {

        createQuestionScreen(42);
      } else {

        mode = 53;
      }
      break;
    case 53:
      createQuestionScreen(43);
      break;
    case 54:
      createQuestionScreen(44);
      break;
    case 57:
      if (probabilityCheck57 === undefined) {
        let probability57 = 0.1;

        // 확률에 따라 실행 여부 결정
        probabilityCheck57 = Math.random() < probability57;
      }

      if (probabilityCheck57) {

        createQuestionScreen(47);
      } else {

        mode = 59;
      }
      break;
    case 59:
      createQuestionScreen(49);
      break;
    case 61:
      createQuestionScreen(51);
      break;
    case 62:
      createQuestionScreen(52);
      break;
    case 63:
      createQuestionScreen(53);
      break;
    case 64:
      createQuestionScreen(54);
      break;
    case 65:
      createQuestionScreen(55);
      break;
    case 66:

      createQuestionScreen(56);

      break;
    case 67:
      if (probabilityCheck67 === undefined) {
        let probability67 = 0.01;

        // 확률에 따라 실행 여부 결정
        probabilityCheck67 = Math.random() < probability67;
      }

      if (probabilityCheck67) {

        createQuestionScreen(57);
      } else {

        mode = 68;
      }
      break;
    case 68:
      createQuestionScreen(58);
      break;
    case 69:
      createQuestionScreen(59);
      break;

    case 90:
      // 문장 배열
      let sentences = [
        player.name + "의 시뮬레이터는 여기까지야.\n수고했어.", "인생을 처음부터 끝까지 체험해보니 어때?",
        "재밌다고 느낀 순간도 있고,\n질문이 너무 많아서 힘들었던 순간도 있었을 거야.",
        "하지만 인생은 수많은 선택의 연속이라고 하잖아? \n앞으로 너는 오늘 마주한 것보다 더 많고 어려운 선택의 순간들을 마주할 거야.",
        "오늘의 체험이 앞으로의 너에게 도움이 되길 바라.",
        "마지막으로 지금까지 너의 선택들을 정리해서 보여줄게. \n잘 읽어보고, 언젠가 다시 나를 만났을 때 너의 실제 삶은 어땠는지 이야기를 들려줘.",
        " 언제일지 모르지만 그날을 기다리고 있을게.",
        "안녕, " + player.name
      ];

      // 애니메이션 보이기
      animationCounter++;
      if (animationCounter % animationFrameInterval === 0 && animationIndex < 6) {
        animationIndex++;
      }
      if (animationIndex >= 6) {
        animationIndex = 6;
      }

      // 마지막 프레임 유지하기
      image(animationImages[animationIndex], playScreen_w / 2 - animationImages[animationIndex].width / 2 * 0.5, playScreen_h / 2 - animationImages[animationIndex].height / 2 * 0.7, animationImages[animationIndex].width * 0.5, animationImages[animationIndex].height * 0.5);

      // 문장 보이기
      if (animationIndex === 6) {
        sentenceCounter++;
        if (sentenceCounter % sentenceDisplayTime === 0) {
          sentenceIndex++;
          if (sentenceIndex >= sentences.length) {
            mode = 100; // 자동으로 마지막 문장으로 넘어가게
          }
        }
        if (sentenceIndex < sentences.length) {
          fill(244, 234, 224);
          textSize(32);
          textAlign(CENTER, TOP);
          text(sentences[sentenceIndex], playScreen_w / 2, playScreen_h / 2 + 40 + animationImages[animationIndex].height * 0.1);
        }
      }
      break;

    case 100:
      background(50);
      fill(0);
      rect(0, 0, playScreen_w, playScreen_h);
      fill(130);
      textSize(30);
      textAlign(RIGHT);
      text("ESC : 메인 화면으로", playScreen_w, -30)

      // 엔딩 이미지 기본 표시
      drawImageCenter(ending_reaper, playScreen_w / 2, playScreen_h / 2 + 50, 700);

      // 아이콘의 위치 설정
      calendarX = 1000; // 오른쪽 손 위치
      calendarY = 100 + sin(angle) * 5;
      calendarW = 200;
      calendarH = 200;

      papyrusX = 400; // 왼쪽 손 위치
      papyrusY = 95 + sin(angle) * 5;
      papyrusW = 200;
      papyrusH = 200;

      closebuttonX = 20
      closebuttonY = 10
      closebuttonW = 90
      closebuttonH = 90
      angle += 0.05

      // 아이콘 이미지 표시
      image(calendaricon, calendarX, calendarY, calendarW, calendarH);
      image(papyrusicon, papyrusX, papyrusY, papyrusW, papyrusH);

      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      text('아이콘을 클릭해봐', playScreen_w / 2, 100);
      text('▼', papyrusX + papyrusW / 2, papyrusY - 30);
      text('▼', calendarX + calendarW / 2, calendarY - 30);

      if (showPapyrus) {
        image(papyrus_outline, 0, 0, playScreen_w, playScreen_h);
        showResults();
        image(closebutton, closebuttonX, closebuttonY, closebuttonW, closebuttonH)
      }
      if (showCalendar) {
        drawCalendarOutline();
        image(closebutton, closebuttonX, closebuttonY, closebuttonW, closebuttonH)
      }
      // 마우스오버 이미지 변경
      if (!showPapyrus && !showCalendar && mouseX - playScreen_x > calendarX && mouseX - playScreen_x < calendarX + calendarW && mouseY - playScreen_y > calendarY && mouseY - playScreen_y < calendarY + calendarH) {
        image(mouseover_calendar, calendarX, calendarY, calendarW, calendarH);
      } else if (!showPapyrus && !showCalendar && mouseX - playScreen_x > papyrusX && mouseX - playScreen_x < papyrusX + papyrusW && mouseY - playScreen_y > papyrusY && mouseY - playScreen_y < papyrusY + papyrusH) {
        image(mouseover_papyrus, papyrusX, papyrusY, papyrusW, papyrusH);
        // papyrusW = 230;
        // papyrusH = 230;
        // image(papyrusicon, papyrusX, papyrusY, papyrusW, papyrusH);
      }
      if (showRestartMessage && !showCalendar && !showPapyrus) {
        fill(244, 234, 224);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("다시 시작하겠습니까?", playScreen_w / 2, 800);
        buttonYes.show();
        buttonNo.show();
      } else {
        buttonYes.hide();
        buttonNo.hide();
      }
      if (showThankYouMessage) {
        background(0);  // 배경을 검은색으로 설정
        fill(130);
        textSize(30);
        textAlign(RIGHT);
        text("ESC : 메인 화면으로", playScreen_w, -30)
        fill(244, 234, 224);
        textSize(32);
        textAlign(CENTER, CENTER);
        textSize(50);
        text("감사합니다.", playScreen_w / 2, playScreen_h / 2);
        textAlign(LEFT, CENTER);
        textSize(32);
        text("팀장/기획 및 디자이너 김도경", 200, playScreen_h / 2 + 100)
        text("팀원/개발자 권나현", 200, playScreen_h / 2 + 200)
        text("팀원/개발자 이정웅", playScreen_w / 2 + 300, playScreen_h / 2 + 100)
        text("팀원/개발자 정희원", playScreen_w / 2 + 300, playScreen_h / 2 + 200)
        buttonYes.hide();
        buttonNo.hide();
      }
      break;
  }
  pop();
}

function showThankYou() { // 희원 추가
  showRestartMessage = false;
  showThankYouMessage = true;
  buttonYes.hide();
  buttonNo.hide();
}

function drawImageCenter(img, x, y, w) {  //이미지 비율 유지해서 좌표 중앙에 그리기
  let h = img.height * w / img.width;
  image(img, x - w / 2, y - h / 2, w, h);
}

function drawCalendarOutline() { //희원 추가. 캘린더 그리기
  background(50);
  fill(0);
  rect(0, 0, playScreen_w, playScreen_h);
  image(calendar_outline, 50, 30, 840, 870);

  let startX = 180;
  let startY = 180;
  let spacingX = 80;
  let spacingY = 80;
  let random_answer = {};

  random_answer[29] = "특별한 취미는 없었다"
  random_answer[44] = "꼼꼼한 관리로 탈모를 피했다"
  random_answer[52] = "로또 1등은 다음 생애에..."
  random_answer[57] = "음주 운전과는 거리가 먼 사람이었다"
  random_answer[79] = "철저한 보안으로 집에 도둑이 들지 않았다"

  text('인생달력', 500, 160, 50, 50)



  for (let i = 0; i < 80; i++) {
    let x = startX + (i % 10) * spacingX - 100
    let y = startY + Math.floor(i / 10) * spacingY + 70
    image(numberImages[i], x, y, 60, 60);  // 이미지 크기를 80x80으로 설정

    // Mouseover check
    if (mouseX - playScreen_x > x && mouseX - playScreen_x < x + 80 && mouseY - playScreen_y > y && mouseY - playScreen_y < y + 80) {
      let age = i + 1;  // 나이를 1부터 시작
      let end_image_fin = end_image[age]
      if (selectedAnswersByAge[age] !== undefined) {
        fill(244, 234, 224);
        textSize(28);
        textAlign(CENTER);
        text(selectedAnswersByAge[age], playScreen_w - 350, playScreen_h / 2 + 270); // Adjust the position of the text as needed

      } else if (age == 29 || age == 44 || age == 52 || age == 57 || age == 79) {
        fill(244, 234, 224);
        textSize(28);
        textAlign(CENTER);
        text(random_answer[age], playScreen_w - 350, playScreen_h / 2 + 270);
      }
      if (end_image[age] !== undefined) {
        image(end_image_fin, playScreen_w / 2 + 325, playScreen_h / 2 - 70, 250, 250);
      }


    }
  }
  fill(244, 234, 224);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("숫자 위에 마우스를", playScreen_w - 350, playScreen_h / 2 - 170);
  text("올려놓고 너의 결정을", playScreen_w - 350, playScreen_h / 2 - 140);
  text("확인해봐", playScreen_w - 350, playScreen_h / 2 - 110);
}


function keyPressed() {    //ESC 변수 초기화
  if (keyCode == ESCAPE) {
    mode = 0;
    background(50);
    player = new Player;
    happy_h = 50;
    health_h = 50;
    money_h = 50;
    currentSound.stop();
    currentSound = sound1
    currentSound.play();

  }
  if (mode == 3 && keyCode === BACKSPACE && inputText.length > 0) {
    inputText = inputText.slice(0, -1);
  }
}

function keyTyped() {
  // 최대 길이 확인 및 알파벳 또는 한글 문자만 추가
  if (inputText.length < 10 && ((key >= 'A' && key <= 'Z') || (key >= 'a' && key <= 'z')) && keyCode != ENTER) {
    inputText += key;
  }
  return false; // p5.js의 기본 키 입력 처리를 방지
}

function typewriter(chats, x, y) {
  // 현재 타이핑 중인 문장 화면에 표시
  text(currentDisplayText, x, y);

  if (charIndex < chats[currentChatIndex].length) {
    typingCounter++;
    if (typingCounter >= typingSpeed) {
      typingCounter = 0;
      currentDisplayText += chats[currentChatIndex][charIndex];
      charIndex++;
    }
  } else {
    // 문장이 모두 타이핑되면 일정 시간 동안 유지
    displayCounter++;
    if (displayCounter >= displayTime) {
      displayCounter = 0;
      charIndex = 0;
      currentDisplayText = '';
      if (currentChatIndex < chats.length - 1) {
        currentChatIndex++;
      } else {
        text("done", 0, 0)
      }
    }
  }
}

function resetTime(mode) {
  let m = -1
  if (m != mode) {
    time = millis();
    m = mode;
  }
}

function drawAvatar(x, y, w) {
  let index = int(Math.floor(player.old / 10));
  let img = avatar[player.sex][index];
  let h = img.height * w / img.width;
  image(img, x - w / 2, y - h, w, h);
}

function drawBar(x, y, _happy, _health, _money) {
  icon_size = 20;
  word_size = 20;
  bar_width = 200;
  bar_height = bar.height * bar_width / bar.width;
  let imgs = [happy_icon, happy_word, health_icon, health_word, money_icon, money_word];

  for (let i = 0; i < imgs.length; i++) {
    if (i % 2 == 0) {
      let w = imgs[i].width * icon_size / imgs[i].height;
      image(imgs[i], x, y + 30 * i, w, icon_size);
      image(bar, x, y + 30 * i + 20, bar_width, bar_height);
    } else {
      let w = imgs[i].width * word_size / imgs[i].height;
      image(imgs[i], x + 25, y + 30 * (i - 1), w, word_size);
    }
  }

  rectMode(CORNER);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(20);

  if (happy != _happy) {
    let happy_gap = _happy - happy;
    happy_h += happy_gap / bar_speed;
    showPreview = false;
    if (happy_gap > 0) {  //바 증가
      happy_h = constrain(happy_h, 0, _happy);
      fill(0, 255, 0);
      text('+' + happy_gap, x + 7 + bar_width, y + 30 * 0 + 27);
    } else {
      happy_h = constrain(happy_h, _happy, 100);
      fill(255, 0, 0);
      text(happy_gap, x + 7 + bar_width, y + 30 * 0 + 27);
    }
    if (happy_h == _happy) happy = _happy;
  }

  if (health != _health) {
    let health_gap = _health - health;
    health_h += health_gap / bar_speed;
    showPreview = false;
    if (health_gap > 0) {  //바 증가
      health_h = constrain(health_h, 0, _health);
      fill(0, 255, 0);
      text('+' + health_gap, x + 7 + bar_width, y + 30 * 2 + 27);
    } else {
      health_h = constrain(health_h, _health, 100);
      fill(255, 0, 0);
      text(health_gap, x + 7 + bar_width, y + 30 * 2 + 27);
    }
    if (health_h == _health) health = _health;
  }

  if (money != _money) {
    let money_gap = _money - money;
    money_h += money_gap / bar_speed;
    showPreview = false;
    if (money_gap > 0) {  //바 증가
      money_h = constrain(money_h, 0, _money);
      fill(0, 255, 0);
      text('+' + money_gap, x + 7 + bar_width, y + 30 * 4 + 27);
    } else {
      money_h = constrain(money_h, _money, 100);
      fill(255, 0, 0);
      text(money_gap, x + 7 + bar_width, y + 30 * 4 + 27);
    }
    if (money_h == _money) money = _money;
  }

  if (happy == _happy && health == _health && money == _money) showPreview = true;

  fill(70, 150);
  rect(x + 7, y + 30 * 0 + 27, map(happy_h, 0, 100, 0, 186), 18);
  rect(x + 7, y + 30 * 2 + 27, map(health_h, 0, 100, 0, 186), 18);
  rect(x + 7, y + 30 * 4 + 27, map(money_h, 0, 100, 0, 186), 18);
}

function setSelectedPath(index, choice) {
  if (index === 3) {
    if (choice === 0) {
      selectedPath[6] = true;
      selectedPath[7] = false;
      selectedPath[10] = true;
      selectedPath[11] = false;
    } else if (choice === 1) {
      selectedPath[6] = false;
      selectedPath[7] = true;
      selectedPath[10] = true;
      selectedPath[11] = false;
    }
  } else if (index === 10) {
    if (choice === 0) {
      selectedPath[17] = true;
      selectedPath[18] = false;
      selectedPath[23] = true;
      selectedPath[24] = false;
      selectedPath[29] = true;
      selectedPath[30] = false;
      selectedPath[35] = true;
      selectedPath[36] = false;
      selectedPath[39] = true;
      selectedPath[40] = false;
    } else if (choice === 1) {
      selectedPath[17] = false;
      selectedPath[18] = true;
      selectedPath[23] = false;
      selectedPath[24] = true;
      selectedPath[29] = false;
      selectedPath[30] = true;
      selectedPath[35] = false;
      selectedPath[36] = true;
      selectedPath[39] = false;
      selectedPath[40] = true;
    } else if (index === 16) {
      if (choice === 0) {
        selectedPath[19] = true;
      } else if (choice === 1) {
        selectedPath[19] = false;
      }
    } else if (index === 19) {
      if (choice === 0) {
        selectedPath[21] = true;
        selectedPath[22] = false;
      } else if (choice === 1) {
        selectedPath[21] = false;
        selectedPath[22] = true;
      }
    }

  }
}

function handleMouseClick(mode, answerIndex) {
  applyChanges(question_list[mode - 10].answer[answerIndex].slice(1));
  setSelectedPath(mode - 10, answerIndex);
  let currentQuestion = questionList.getRow(mode - 10);  // question_list 대신 questionList 사용
  let age = parseInt(currentQuestion.get('나이'));  // '나이' 열의 값을 정수로 변환
  selectedAnswersByAge[age] = currentQuestion.get(`답변${answerIndex + 1} 내용`);  // Store the selected answer text by age
  mode++;
  displayText = "";
  textIndex = 0;

  return mode;
}

// 질문 화면을 표시하는 함수
function createQuestionScreen(index) {

  const qa = question_list[index];


  switch (qa.answer.length) {
    case 1:
      new QuestionScreen(qa.question, characterImage, qa.old, qa.answer, qa.answer_num, index).displayQuestionScreenOneOption();
      break;
    case 2:
      new QuestionScreen(qa.question, characterImage, qa.old, qa.answer, qa.answer_num, index).displayQuestionScreen();
      break;
    case 3:
      new QuestionScreen(qa.question, characterImage, qa.old, qa.answer, qa.answer_num, index).displayQuestionScreenThreeOptions();
      break;
    case 4:
      new QuestionScreen(qa.question, characterImage, qa.old, qa.answer, qa.answer_num, index).displayQuestionScreenFourOptions();
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      new QuestionScreen(qa.question, characterImage, qa.old, qa.answer, qa.answer_num, index).displayQuestionScreen2();
      break;
    default:
      console.error(`Unhandled number of answers for question ${index}`);
      break;
  }
}

function mousePressed() {
  clickSound.play();
  if (mode == 27 || mode == 28 || mode == 33 || mode == 34 || mode == 39 || mode == 40 || mode == 42 || mode == 45 || mode == 46 || mode == 47
    || mode == 49 || mode == 50 || mode == 52 || mode == 54 || mode == 57 || mode == 62 || mode == 67 || mode == 69) {
    const index = mode - 10;
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      handleMouseClick(mode, 0);
    }

  } else if (mode == 24 || mode == 56) {
    const index = mode - 10;
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 550 && mouseY - playScreen_y < 600) {
      handleMouseClick(mode, 0);
    }
    if (mouseX - playScreen_x > 250 && mouseX - playScreen_x < 450 && mouseY - playScreen_y > 650 && mouseY - playScreen_y < 700) {
      handleMouseClick(mode, 1);
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      handleMouseClick(mode, 2);
    }
  } else if (mode >= 10 && mode <= 69 && mode !== 63 && mode !== 16) {
    const index = mode - 10;
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      handleMouseClick(mode, 0);
    } else if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      handleMouseClick(mode, 1);
    }
  }
  if (mode === 10) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[0].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 11; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[0].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 11; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 11) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[1].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 13; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[1].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 13; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 12) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[2].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 13; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[2].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 13; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 13) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[3].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 15; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[3].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 15; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 14) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[4].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 15; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[4].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 15; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 15) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[5].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 16; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[5].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 16; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 16) {
    let options = [
      ["의학", [12, 1, -6, 0.8, 0, 0]],
      ["공학", [10, 1, -4, 0.8, 0, 0]],
      ["사회과학", [8, 1, -2, 0.8, 0, 0]],
      ["자연과학", [6, 1, -1, 0.8, , 0]],
      ["인문학", [4, 1, 1, 0.8, 0, 0]],
      ["교육", [2, 1, 2, 0.8, 0, 0]],
      ["예체능", [1, 1, 4, 0.8, 0, 0]]
    ];
    console.log(question_list[6])
    for (let i = 0; i < options.length; i++) {
      let x, y;
      if (i < 3) {
        // 왼쪽에 위치할 선택지
        x = 350;
        y = 550 + i * 50; // 왼쪽 선택지의 y 좌표 계산
      } else {
        // 오른쪽에 위치할 선택지
        x = 1050;
        y = 550 + (i - 3) * 50; // 오른쪽 선택지의 y 좌표 계산
      }

      if (mouseX - playScreen_x > x && mouseX - playScreen_x < x + 200 && mouseY - playScreen_y > y - 25 && mouseY - playScreen_y < y + 25) {
        selectedOptions.push(options[i][0]);
        applyChanges(options[i][1]); // 선택지에 대한 변수 영향 적용
        handleMouseClick(mode, i);
        mode = 17;
        displayText = ""; // 질문 텍스트 초기화
        textIndex = 0;
        break;
      }
    }

    /*
        for (let i = 0; i < options.length; i++) {
          let x = (i < 3) ? 450 : 950; // 왼쪽 또는 오른쪽에 위치
          let y = 550 + (i % 3) * 50; // 위치에 따라 y 좌표 계산
    
          if (mouseX -playScreen_x> x && mouseX-playScreen_x < x + 200 && mouseY-playScreen_y> y - 25 && mouseY -playScreen_y< y + 25) {
            selectedOptions.push(options[i][0]);
           applyChanges(options[i][1]); // 선택지에 대한 변수 영향 적용
            mode = 17; 
            displayText = ""; // 질문 텍스트 초기화
          textIndex = 0;
            break;
          }
        }*/
  } else if (mode === 17) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[7].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 20; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[7].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 20; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 20) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[10].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 21; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[10].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 21; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 21) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[11].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 23; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[11].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 23; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 23) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[13].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 24; // 다음 화면으로 전환 (여기서는 다음 모드가 정의되어 있지 않으므로, 24를 가정)
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[13].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 24; // 다음 화면으로 전환 (여기서는 다음 모드가 정의되어 있지 않으므로, 24를 가정)
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 24) { // X는 해당 모드 숫자
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 550 && mouseY - playScreen_y < 600) {
      applyChanges(question_list[14].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 24 + 1; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 250 && mouseX - playScreen_x < 450 && mouseY - playScreen_y > 650 && mouseY - playScreen_y < 700) {
      applyChanges(question_list[14].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 24 + 1; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[14].answer[2].slice(1)); // 세 번째 선택지에 대한 변수 영향 적용
      mode = 24 + 1; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 25) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[15].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 26; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[15].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 26; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 26) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[16].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 27; // 다음 화면으로 전환 (여기서는 다음 모드가 정의되어 있지 않으므로, 24를 가정)
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[16].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 27; // 다음 화면으로 전환 (여기서는 다음 모드가 정의되어 있지 않으므로, 24를 가정)
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 27) { // X는 해당 모드 숫자
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[17].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 28; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 28) { // X는 해당 모드 숫자
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[18].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 29; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 29) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[19].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 30; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[19].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 30; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 30) {
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[20].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 38; // 다음 화면으로 전환 (여기서는 다음 모드가 정의되어 있지 않으므로, 24를 가정)
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[20].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 38; // 다음 화면으로 전환 (여기서는 다음 모드가 정의되어 있지 않으므로, 24를 가정)
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 38) { // X는 해당 모드 숫자
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[28].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 42; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[28].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 42; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 42) { // Index 32: answer_num = 1
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[32].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 43; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 43) { // Index 33: answer_num = 2
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[33].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 45; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[33].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 45; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 45) { // Index 35: answer_num = 1
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[35].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 46; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 46) { // Index 36: answer_num = 1
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[36].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 48; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 48) { // Index 38: answer_num = 2
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[38].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 49; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[38].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 49; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 49) { // Index 39: answer_num = 1
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[39].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 50; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 50) { // Index 40: answer_num = 1
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[40].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 51; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 51) { // Index 41: answer_num = 2
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[41].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 52; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[41].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 52; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 52) { // Index 42: answer_num = 1
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[42].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 53; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 53) { // Index 43: answer_num = 2
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[43].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 54; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[43].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 54; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 54) { // Index 44: answer_num = 1
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[44].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 57; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 57) { // Index 47: answer_num = 1
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[47].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 59; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 59) { // Index 49: answer_num = 2
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[49].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 61; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[49].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 61; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  } else if (mode === 61) { // Index 51: answer_num = 2
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[51].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 62; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[51].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 62; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 62) { // Index 52: answer_num = 1
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[52].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 63; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 63) { // Index 53: answer_num = 4
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 550 && mouseY - playScreen_y < 600) {
      applyChanges(question_list[53].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      handleMouseClick(mode, 0);
      mode = 64; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 650 && mouseY - playScreen_y < 700) {
      applyChanges(question_list[53].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      handleMouseClick(mode, 1);
      mode = 64; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 550 && mouseY - playScreen_y < 600) {
      applyChanges(question_list[53].answer[2].slice(1)); // 세 번째 선택지에 대한 변수 영향 적용
      handleMouseClick(mode, 2);
      mode = 64; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 650 && mouseY - playScreen_y < 700) {
      applyChanges(question_list[53].answer[3].slice(1)); // 네 번째 선택지에 대한 변수 영향 적용
      handleMouseClick(mode, 3);
      mode = 64; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 64) { // Index 54: answer_num = 2
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[54].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 65; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[54].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 65; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 65) { // Index 55: answer_num = 2
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[55].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 66; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[55].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 66; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 66) { // Index 56: answer_num = 2
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[56].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 67; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      //applyChanges(question_list[56].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 67; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 67) { // Index 57: answer_num = 1
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[57].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 68; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 68) { // Index 58: answer_num = 2
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[58].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 69; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
    if (mouseX - playScreen_x > 1000 && mouseX - playScreen_x < 1500 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      // applyChanges(question_list[58].answer[1].slice(1)); // 두 번째 선택지에 대한 변수 영향 적용
      mode = 69; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }

  else if (mode === 69) { // Index 59: answer_num = 1
    if (mouseX - playScreen_x > 50 && mouseX - playScreen_x < 600 && mouseY - playScreen_y > 600 && mouseY - playScreen_y < 650) {
      applyChanges(question_list[59].answer[0].slice(1)); // 첫 번째 선택지에 대한 변수 영향 적용
      mode = 90; // 다음 화면으로 전환
      displayText = ""; // 질문 텍스트 초기화
      textIndex = 0;
    }
  }
  else if (mode === 100) { // 희원 추가 파트
    if (!showCalendar && mouseX - playScreen_x > papyrusX && mouseX - playScreen_x < papyrusX + papyrusW && mouseY - playScreen_y > papyrusY && mouseY - playScreen_y < papyrusY + papyrusH) {
      showPapyrus = true; // 상태 토글
    } else if (mouseX - playScreen_x > closebuttonX && mouseX - playScreen_x < closebuttonX + closebuttonW && mouseY - playScreen_y > closebuttonY && mouseY - playScreen_y < closebuttonY + closebuttonH) {
      showPapyrus = false; // 파피루스 이미지 원래 상태로
      papyrusClickCount++;
    }
    if (!showPapyrus && mouseX - playScreen_x > calendarX && mouseX - playScreen_x < calendarX + calendarW && mouseY - playScreen_y > calendarY && mouseY - playScreen_y < calendarY + calendarH) {
      showCalendar = true;  // 캘린더 표시/숨기기 전환
    } else if (mouseX - playScreen_x > closebuttonX && mouseX - playScreen_x < closebuttonX + closebuttonW && mouseY - playScreen_y > closebuttonY && mouseY - playScreen_y < closebuttonY + closebuttonH) {
      showCalendar = false; // 파피루스 이미지 원래 상태로
      calendarClickCount++;
    } if (papyrusClickCount >= 2 && calendarClickCount >= 1) {
      showRestartMessage = true;
    }
  }
}

function applyChanges(changes) {
  // changes 배열의 값을 변수에 할당
  let [mon, monP, hap, hapP, hea, heaP] = changes;

  // 확률 계산 후 변수 값 변경
  if (random(1) < monP) {
    player.money += mon;
    player.money = constrain(player.money, 0, 100)
  }
  if (random(1) < hapP) {
    player.happy += hap;
    player.happy = constrain(player.happy, 0, 100)
  }
  if (random(1) < heaP) {
    player.health += hea;
    player.health = constrain(player.health, 0, 100)
  }

  console.log(player.happy)
  console.log(player.health)
  console.log(player.money)
}
/*
let happinessByAge = {};
let moneyByAge = {};
let healthByAge = {};

function updateHappiness(age, happiness) {
  happinessByAge[String(age)] = happiness;
}

function updateMoney(age, money) {
  moneyByAge[String(age)] = money;
}

function updateHealth(age, health) {
  healthByAge[String(age)] = health;
}

function getAgeOfMaxValue(data) {
  let maxValue = -Infinity;
  let ageOfMaxValue = -1;

  for (let age in data) {
    if (data[age] > maxValue) {
      maxValue = data[age];
      ageOfMaxValue = parseInt(age); // 문자열을 숫자로 변환
    }
  }

  return ageOfMaxValue;
}

function getAgeOfMinValue(data) {
    let minValue = Infinity;
  let ageOfMinValue = -1;

  for (let age in data) {
    if (data[age] < minValue) {
      minValue = data[age];
      ageOfMinValue = parseInt(age); // 문자열을 숫자로 변환
    }
  }

  return ageOfMinValue;
} */

function showResults() { // 희원 수정
  // let ageOfMaxHappiness = getAgeOfMaxValue(happinessByAge);
  //let ageOfMinHappiness = getAgeOfMinValue(happinessByAge);
  //let ageOfMaxMoney = getAgeOfMaxValue(moneyByAge);
  //let ageOfMinMoney = getAgeOfMinValue(moneyByAge);
  //let ageOfMaxHealth = getAgeOfMaxValue(healthByAge);
  //let ageOfMinHealth = getAgeOfMinValue(healthByAge);
  //let assetText2 = `가장 돈이 많았던 나이는 ${ageOfMaxMoney}세, 가장 적었던 나이는 ${ageOfMinMoney}세 입니다.`;
  //let happinessText2 = `가장 행복했던 나이는 ${ageOfMaxHappiness}세, 가장 불행했던 나이는 ${ageOfMinHappiness}세 입니다.`;
  //let healthText2 = `가장 건강했던 나이는 ${ageOfMaxHealth}세, 가장 건강하지 않았던 나이는 ${ageOfMinHealth}세 입니다.`; 
  //let showResultsMessage2 = assetText2 + '\n' + happinessText2 + '\n' + healthText2;


  let assetText1 = '';
  let assetText2 = '';
  if (player.money <= 30) {
    assetText1 = '최종 자본 : 하(' + player.money + ')'
    assetText2 = '흥망성쇠 속 인생의 마지막은 가난했다. 너의 잘못된 선택도 불운도 있었고, 돈이 많이 들어가는 선택임을 알면서도 선택했다.  돈이 인생의 모든 것을 결정하지 않았다.';
  } else if (player.money <= 60) {
    assetText1 = '최종 자본 : 중(' + player.money + ')'
    assetText2 = '흥망성쇠 속 인생의 마지막은 중산층으로 끝났다. 조금 더 잘 잘 살아보려는 선택이 너를 중산층으로 만들었다. 경쟁 사회인 대한민국에서 중산층으로 인생을 마무리했다는 것은 큰 칭찬을 받아 마땅하다.';
  } else {
    assetText1 = '최종 자본 : 상(' + player.money + ')'
    assetText2 = '흥망성쇠를 거치며 인생의 마지막을 풍요롭게 끝냈다. 선택의 순간 속 너는 재치를 발휘하여 남들보다 더 많은 부를 얻을 수 있었다. 모두들 너의 부와 선택을 부러워했다.';
  }


  let happinessText1 = '';
  let happinessText2 = '';
  if (player.happy <= 30) {
    happinessText1 = '최종 행복도 : 하(' + player.happy + ')'
    happinessText2 = '인생의 마지막은 불행했다. 그러나 인생의 마지막이 불행했더라도 인생의 모든 순간이 불행했다는 것을 의미하지는 않는다.';
  } else if (player.happy <= 60) {
    happinessText1 = '최종 행복도 : 중(' + player.happy + ')'
    happinessText2 = '인생의 마지막 적절한 행복을 느꼈다. 행복 지수가 낮은 대한민국에서 적절한 행복을 느끼며 인생을 마무리하는 것은 결코 쉽지 않은 일이다.';
  } else {
    happinessText1 = '최종 행복도 : 상(' + player.happy + ')'
    happinessText2 = '인생의 마지막 최고로 행복하게 마무리했다. 힘든 순간도 있었지만, 다른 가치보다 행복을 최우선 순위로 삼으며 살아왔다.';
  }


  let healthText1 = '';
  let healthText2 = '';
  if (player.health <= 30) {
    healthText1 = '최종 건강도 : 하(' + player.health + ')'
    healthText2 = '아픈 몸인 상태로 눈을 감았다. 그러나 너에게도 건강했던 시절은 있었다. 너의 선택으로 혹은 불운으로 건강하지 않게 인생을 마무리했다. 그래도 80이 넘은 나이까지 살았다';
  } else if (player.health <= 60) {
    healthText1 = '최종 건강도 : 중(' + player.health + ')'
    healthText2 = '잔병치레를 하며 눈을 감았다. 큰 병은 없었지만 지병이 너의 신경을 건드렸었다. 그래도 인생의 모든 순간을 잔병 치레로 고생하지는 않았다. 그래도 80이 넘은 나이까지 비교적 건강하게 살았다.';
  } else {
    healthText1 = '최종 건강도 : 상(' + player.health + ')'
    healthText2 = '잠을 잔 듯 눈을 감았다. 건강을 우선하는 선택을 통해 마지막에 다른 누구보다도 편안했다. 아무도 너를 80살이라 생각하지 못할 정도로 건강했지만 신의 뜻은 아무도 알 수 없었다.';
  }

  let showResultsMessage = `${player.name} 인생에 대한 코멘트\n\n${assetText1}\n\n\n\n${healthText1}\n\n\n\n${happinessText1}`
  let showResultsMessage2 = `${assetText2}\n\n\n${healthText2}\n\n\n${happinessText2}`


  // Adjust these coordinates based on the actual dimensions and position of the papyrus image
  let papyrusTextX = playScreen_w / 4;  // X coordinate within the papyrus
  let papyrusTextY = playScreen_h / 8;  // Y coordinate within the papyrus
  let papyrusTextW = 880;  // Width of the text area
  let papyrusTextH = playScreen_h / 3 * 2;  // Height of the text area
  fill(244, 234, 224);
  textSize(30);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);

  text(showResultsMessage, papyrusTextX, papyrusTextY, papyrusTextW, papyrusTextH);

  let firstPartHeight = textSize() * 6 + textLeading() * 6;  // Adjust this based on the actual text height

  // Display the second part of the message with smaller text
  textSize(25);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);
  textLeading(30);

  // Adjust the Y coordinate for the second part of the message to avoid overlapping
  let secondPartY = papyrusTextY + firstPartHeight - 190;
  text(showResultsMessage2, papyrusTextX, secondPartY, papyrusTextW, papyrusTextH);


  //text(showResultsMessage2, papyrusTextX, papyrusTextY + 200, papyrusTextW, papyrusTextH);
}

function resetGame() {
  // 초기화 코드
  mode = 0;
  happy_h = 50;
  health_h = 50;
  money_h = 50;
  player = new Player;
  papyrusClickCount = 0;
  calendarClickCount = 0;
  showRestartMessage = false;
  showThankYouMessage = false;
  showResultsMessage = false;
  buttonYes.hide();
  buttonNo.hide();
  loading = false;
  displayText = "";
  currentCharIndex = 0;
  clearInterval(typingInterval);
  currentSound = sound1
  currentSound.stop();
  currentSound.play();
}