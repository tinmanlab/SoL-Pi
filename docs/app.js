const figures = {
  1:{title:'논문 전체 주장',body:'하네스 자동 최적화가 동일 모델의 token/cost를 줄일 수 있다는 전체 개요입니다.',note:'큰 비용 절감 숫자에는 native Codex/Claude Code 대비 값도 포함됩니다. Pi baseline 대비 full-stack 비용 감소는 약 33%입니다.',page:1},
  2:{title:'평가 누수 방지',body:'search → freeze → held-out 평가를 분리해 benchmark에 맞춘 반복 튜닝을 제한합니다.',note:'held-out 결과를 다시 search loop에 넣지 않는 것이 핵심입니다.',page:3},
  3:{title:'535개 실행 환경',body:'495개 실제 GitHub issue/PR 기반 환경과 40개 verifier 기반 환경으로 구성됩니다.',note:'정답 문자열 하나가 아니라 실행 가능한 해결 여부를 평가합니다.',page:4},
  4:{title:'네 가지 메커니즘',body:'Action Fusion, Context Compact, ObservationPack, Reducer가 서로 다른 낭비를 줄입니다.',note:'이 페이지의 4개 카드가 Figure 4를 초보자용으로 재구성한 것입니다.',page:5},
  5:{title:'20-agent swarm',body:'동일 초기 상태에서 SoL-Pi swarm이 Pi swarm보다 낮은 비용과 더 나은 결과를 보인 사례입니다.',note:'configuration당 2시간 run 1회이므로 강한 통계적 일반화는 어렵습니다.',page:8},
  6:{title:'모델마다 다른 작동',body:'GPT-5.6 Sol과 Opus 5에서 같은 메커니즘의 trigger rate와 intensity가 다릅니다.',note:'좋은 하네스의 효과는 model × harness 상호작용으로 봐야 합니다.',page:9},
  7:{title:'중복과 보완',body:'full stack에서는 일부 메커니즘 activation이 줄어 앞단 메커니즘이 일을 대신하는 패턴이 보입니다.',note:'“시너지 입증”보다는 complementarity와 양립한다고 읽는 편이 정확합니다.',page:10},
  8:{title:'Action Fusion 발견 과정',body:'trajectory 분석 → 병목 가설 → 구현 → 반복 수정으로 Action Fusion이 만들어진 과정을 보여줍니다.',note:'149 turns 절감은 final benchmark 실측이 아니라 full-triggering counterfactual projection입니다.',page:10}
};

const detail = document.querySelector('#figureDetail');
const image = document.querySelector('#figureImage');

document.querySelectorAll('.figure-selector button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.figure-selector button').forEach(x => x.classList.remove('active'));
    button.classList.add('active');
    const id = button.dataset.fig;
    const f = figures[id];
    image.src = `./assets/figures/fig${id}-guide.svg`;
    image.alt = `Figure ${id}을 초보자용으로 재구성한 흐름도`;
    detail.innerHTML = `<div><span>Figure ${id}</span><h3>${f.title}</h3><p>${f.body}</p></div><aside><b>읽을 때 주의</b><p>${f.note}</p><a id="figureSource" href="https://arxiv.org/pdf/2609.20519#page=${f.page}" target="_blank" rel="noopener">원 논문 Figure 보기 ↗</a></aside>`;
  });
});
