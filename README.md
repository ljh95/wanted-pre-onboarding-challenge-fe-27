## 사전과제

원티드 프리온보딩을 위해 만듬.
하루만에 해야해서(늦잠자서 반나절) 굉장히 열심히 해볼것
최대한 해보자.!
목표는 2차과제 우선순위 추가한것이다.!


## 11.14 19:41
한 3시간에 걸쳐 앱 구성과 라우터, 테일윈드, 로그인, 회원가입을 만들었다.
클로드 도움 없이 하려다가 일단 깔끔한 코드를 만들고싶어서 도움을 많이 받았다.
중간에 useAuth를 통해 AuthController를 만드는 부분이 있는데
AuthController에서 useNavigation을 써야했기 때문이고
그러려면 어쩔 수 없이 컴포넌트 안에서 초기화해야했기에 useMemo를 통해 구현했다.
그런데 문제는, 해당 컨트롤러를 반복해서 생성하지 않기 위해 context를 통해 값을 보존시킬 수 있도록 했는데
useNavigate는 createBrowerserRouter 안에서 사용할 수 있고
따라서 AuthController의 컨텍스트 Provider 즉 AuthProvider역시 그보다 안에 있어야 했기때문에
App.tsx가 아닌, Latout 컴포넌트를 별도로 만들어 안에 존재할 수 있도록 한게 조금 아쉬운 부분이었던거 같다.


AuthController는 비지니스 영역이니까 맞는거 같기도 하고.. 좀 모르겠다.

무튼 이렇게 종택님이 말한대로, interface를 만들어 통신할 규격을 만들고, 그걸 구체적인 무언가로 로직을 만든 서비스를 만들고
해당 서비스들을 이용해서 전체적인 로직을 담당하는 컨트롤러를 만들었으며 
거기에 필요했던건 storage, navigation, apiClient 정도였던거 같다.

다시 짜라면 못짤거 같은데 그래도 전체적인 느낌을 한번 따라쳐봤다는것에 의의를 두며 빠르게 todos도 만들어야겠다..!

## 11.15 12:59
최대한 해보긴했는데, 뒤로갈수록 시간이 부족해 클로드의 힘도 많이 빌리고
생각도 정리하지 못했다.
기능도 완전히 동작하지 않았다.
이렇게 마무리지을 수 밖에 없어서 많이 아쉬운것 같다. 
오늘 강의 보면서 부족하거나 개선할점을 많이 찾아 기록하고 천천히 따라가봐야겠다.
