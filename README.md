<h1>😃Gridians 개발자 소통 사이트</h1>
<h2>개발자들이 서로 소통하며 궁금한 것을 물어보고 즐겨찾기 등 개인 카드프로필을 꾸밀 수 있는 사이트</h2>

🗓 프로젝트 기간
2022/1/25 ~ ing 
<hr/>

<h3>주요기능</h3>
(인트로 화면)
<br/>

![intro](https://user-images.githubusercontent.com/67773009/223963586-46647b0a-4656-4d5a-9378-2846f3cbe698.png)
<br/>

(회원가입 화면)

![signUp](https://user-images.githubusercontent.com/67773009/223965145-3e09b368-6aa9-4380-a533-6ab43e1d4a1d.png)
<li>회원가입 정보를 작성하게 되면 이메일 인증이 작성한 이메일로 인증을 요청하고 인증이 완료된 사람만 로그인이 가능합니다.</li>
<br/>

(로그인 화면)

![login](https://user-images.githubusercontent.com/67773009/223965852-ea6eca14-f03d-4966-b0fe-82591d81b775.png)
<li>회원가입 인증이 완료되면 로그인 진행가능.</li>
<li>로그인을 하면 AccessToken, RefreshToken을 받아서 저장한다.</li>
<br/>

(내 정보 화면)

![mypage](https://user-images.githubusercontent.com/67773009/223967586-59418feb-0d98-4ffb-8b60-1880700ad8a2.png)
<li>내 닉네임 또는 이메일 비밀번호 등을 수정할 수 있고 이미지 또한 변경이 가능하다.</li>
<li>이메일 수정시 이메일은 재 인증을 통해서만 이메일 변경이 가능하다.</li>
<li>회원탈퇴를 누르면 웹사이트에 있는 정보기능이 완전히 사라진다.</li>
<br/>

(메인 화면)

![main](https://user-images.githubusercontent.com/67773009/223967070-41a44a71-6958-4932-aefd-c43578a57313.png)
<li>로그인을 하게되면 메인화면에 카드를 등록한 유저들이 나타난다.</li>
<li>즐겨찾기를 하게 되면 그 유저의 카드에는 노란색으로 표시가 된다.</li>

<br/>

![card](https://user-images.githubusercontent.com/67773009/223968647-3bcf8eac-20ad-46c0-bf5a-dd235a363947.png)
<br/>

![card1](https://user-images.githubusercontent.com/67773009/223969265-4cefc861-9eec-48b2-a494-0736c8c56cc4.png)
<br/>

<li>카드를 등록하게 되면 이렇게 카드가 만들어진다.</li>
<li>수정버튼을 클릭하여 개인 상태메세지 태그 등 자유롭게 작성이 가능하다.</li>
<li>오른쪽 하단에 버튼을 누르게 되면 내 카드 정보가 보여진다.</li>
<br/>

![card2](https://user-images.githubusercontent.com/67773009/223968658-5d64bb4d-1482-46b8-a947-f7ac308de56b.png)
<br/>

![comment](https://user-images.githubusercontent.com/67773009/223968671-06e387f2-fc4c-485f-b6c0-760177f0e1c4.png)
<br/>

<li>깃허브 연동을 하게 되면 연동한 계정의 정보를 조금 보여준다.</li>
<li>등록한 사람에 카드에 댓글 작성이 가능하다.</li>
<li>댓글을 남긴 사람에 대한 답글 작성도 가능하며 삭제는 본인이 작성한 댓글이 삭제 가능하다.</li>

<h1>⛓ 기술스택</h1>
<h3>React, React-Query, Recoil, Axios</h3>
