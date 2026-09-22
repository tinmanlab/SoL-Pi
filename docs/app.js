const detail = document.querySelector('#mechanismDetail');
const mechanismCopy = {
  fusion: ['Action Fusion','Before: edit → 모델 호출 → test. After: edit 도구에 then_run 같은 후속 실행을 묶어, 자명한 중간 판단 호출을 제거합니다.','edit + test → 한 계약'],
  compact: ['Online Context Compact','Before: 끝난 하위 작업도 매 호출마다 계속 전송. After: 앞으로 절약될 입력 토큰이 cache rewrite 비용보다 클 때만 맥락을 정리합니다.','오래된 맥락 → 이득일 때만 압축'],
  pack: ['ObservationPack','Before: 30 KB 출력이 다음 요청마다 재전송. After: 원문은 로컬에 보존하고 stable handle + 작은 excerpt만 전달하며 필요하면 exact recall 합니다.','큰 값 복사 → 참조 전달'],
  reducer: ['Evidence-Preserving Reducer','Before: 비싼 주 모델이 긴 build/test log 전체를 읽음. After: 싼 보조 모델이 증거를 추출하고 schema·hash·exit status·exact quote를 결정론적으로 검증합니다.','cheap reader + deterministic verifier']
};

document.querySelectorAll('.mechanism').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.mechanism').forEach(x => x.classList.remove('active','after'));
    card.classList.add('active','after');
    const [title, body, tag] = mechanismCopy[card.dataset.mech];
    detail.innerHTML = `<div><span class="detail-tag">AFTER</span><h3>${title}</h3><p>${body}</p><p><b>${tag}</b></p></div>`;
    if(card.dataset.mech==='fusion') card.querySelector('.mini-viz').innerHTML='<span>edit</span><i> + then_run → </i><span>test</span>';
    if(card.dataset.mech==='pack') card.querySelector('.mini-viz').innerHTML='<span>30 KB 원문</span><i>→ handle →</i><span>≈ 1 KB excerpt</span>';
    if(card.dataset.mech==='reducer') card.querySelector('.mini-viz').innerHTML='<span>로그</span><i>→ verified →</i><span>증거 receipt</span>';
  });
});

const metricStage = document.querySelector('#metricStage');
const metricViews = {
  efficiency: `<div class="metric-copy"><div class="metric-badge">GPT-5.6 Sol · EdgeBench</div><h3>Pi → SoL-Pi 전체 4개 장치</h3><p>토큰과 비용은 크게 줄지만 점수도 조금 내려갑니다. 따라서 <b>“같은 성능으로 절반 비용”은 아닙니다.</b></p></div><div class="metric-bars"><div class="metric"><span>Tokens</span><div class="bar-bg"><i style="width:100%"></i></div><b>2.1538B</b><em>Pi</em></div><div class="metric accent"><span>Tokens</span><div class="bar-bg"><i style="width:51%"></i></div><b>1.0990B</b><em>SoL-Pi · −49.0%</em></div><div class="metric"><span>Score</span><div class="bar-bg score"><i style="width:100%"></i></div><b>44.833</b><em>Pi</em></div><div class="metric accent"><span>Score</span><div class="bar-bg score"><i style="width:93.7%"></i></div><b>42.003</b><em>93.7% retained</em></div></div>`,
  performance: `<div class="metric-copy"><div class="metric-badge">GPT-5.6 Sol · EdgeBench</div><h3>Pi → ObservationPack 단독</h3><p>최고 성능 operating point는 full stack이 아니라 <b>단일 메커니즘</b>입니다. 이 설정에서는 토큰을 줄이면서 점수도 올라갔습니다.</p></div><div class="metric-bars"><div class="metric"><span>Tokens</span><div class="bar-bg"><i style="width:100%"></i></div><b>2.1538B</b><em>Pi</em></div><div class="metric accent"><span>Tokens</span><div class="bar-bg"><i style="width:93.9%"></i></div><b>2.0224B</b><em>−6.1%</em></div><div class="metric"><span>Score</span><div class="bar-bg score"><i style="width:94.97%"></i></div><b>44.833</b><em>Pi</em></div><div class="metric accent"><span>Score</span><div class="bar-bg score"><i style="width:100%"></i></div><b>47.208</b><em>+5.3%</em></div></div>`
};

document.querySelectorAll('.mode-switch button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.mode-switch button').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  metricStage.innerHTML = metricViews[btn.dataset.mode];
}));