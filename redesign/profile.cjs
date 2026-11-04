// 会社案内 /about/profile/ (2026-10-30 CEO): 9 trang A4 ngang, chỉ chữ + kẻ dòng theo đúng ngôn ngữ web (không ảnh chụp).
// Một nguồn, hai hình thức: trang web này + PDF /assets/biglight-company-profile.pdf (deploy-new.yml in trang này bằng Chrome).
// CSS chỉ dùng lớp cp-… để không đụng lớp chung của site (.en .dots .pill .num …).
// Không ghi 従業員数, không ghi 保証 (CEO: chi phí / bảo hành nằm ở tài liệu gửi riêng).
module.exports = function profile({ page, pageHead, aboutTabs, pill, AICHI_SDGS, PDF_URL }) {
  const r = '../../';
  const PDF = PDF_URL || '/assets/biglight-company-profile.pdf';
  const dots = '<span class="cp-dots"><i></i><i></i><i></i><i></i></span>';
  const pn = (n, t) => `<div class="cp-pn"><span>${String(n).padStart(2, '0')}</span>${dots}<span>${t}</span></div>`;
  const head = (en, ja, lead) => `<div class="cp-head"><div><h2 class="cp-en">${en}</h2><div class="cp-jl">${ja}</div></div><div class="cp-lead">${lead}</div></div>`;
  const sheet = (n, cls, inner) => `<div class="cp-sh" id="p${String(n).padStart(2, '0')}"><div class="cp-pg${cls ? ' ' + cls : ''}">${inner}</div></div>`;
  const sdg = AICHI_SDGS.on;
  // 2026-11-04: 9 → 17 trang. Số trang tự đánh: N() = số của tờ đang viết (gọi 1 lần ở đầu mỗi tờ).
  let no = 0; const N = () => ++no;
  const { BL, CASES, DX_CSS, hbars, donut, fmt } = require('./data.cjs');
  const TOC = [['02', 'Contents', 'もくじ'], ['03', 'Message', '代表メッセージ'], ['04', 'Company', '会社概要・沿革'], ['05', 'Mission', 'ミッション・ビジョン・行動指針'], ['06', 'Service 01', '特定技能 採用支援'], ['07', 'Service 02', '技人国 人材紹介'], ['08', 'Support', '支援の体制'], ['09', 'Product', '3つのアプリ'], ['10', 'Data', '数字で見るBIGLIGHT'], ['11', 'Strength', '選ばれる理由'], ['12', 'Case', '導入事例 01・02'], ['13', 'Case', '導入事例 03・04'], ['14', 'Flow', 'ご相談から入社まで'], ['15', 'Fields', '対応分野'], ['16', 'FAQ', 'よくあるご質問'], ['17', 'Contact', 'お問い合わせ']];
  const caseMini = (c, k) => `<div class="cp-case"><div class="cp-no">CASE ${k}</div><div class="cp-cn">${c.name}</div><div class="cp-cm">${c.area}　／　${c.field}　／　${c.work}</div>
    <div class="cp-cs"><div><b>${c.since.replace(/年.*/, '')}<small>年〜</small></b><span>受入れ開始</span></div><div><b>${c.total}<small>名</small></b><span>これまでの受入れ</span></div>${c.active ? `<div><b>${c.active}<small>名</small></b><span>現在 在籍</span></div>` : ''}${c.two ? `<div><b>${c.two}<small>名</small></b><span>特定技能2号へ</span></div>` : ''}</div>
    <ul class="cp-cp">${c.pts.map((t) => `<li>${t}</li>`).join('')}</ul></div>`;

  const sheets = [
    // 01 表紙 — 3 dải xiên của hero trang chủ, màu phẳng thay ảnh
    sheet(N(), 'cp-cover', `
      <div class="cp-logo"><img src="${r}img/mark.png" alt="" width="1014" height="971"><img class="cp-lw" src="${r}img/wordmark.png" alt="BIGLIGHT株式会社" width="1014" height="175"></div>
      <div class="cp-big">外国人材の採用を、<br>紹介から定着まで。</div>
      <div class="cp-sub">BIGLIGHT株式会社 会社案内</div>
      ${dots}
      <div class="cp-lic"><b>特定技能・技人国の外国人材紹介と登録支援</b>有料職業紹介事業　許可番号 23-ユ-302414<br>登録支援機関　登録番号 21登-006596<span class="cp-r">NAGOYA / KANTO / HO CHI MINH CITY</span></div>
      <div class="cp-strips" aria-hidden="true"><i></i><i></i><i></i><span>COMPANY PROFILE ${new Date().getFullYear()}</span></div>`),

    // 02 もくじ
    sheet(N(), '', `
      ${head('Contents', 'もくじ', '会社のこと、サービス、事例、<br>ご相談の流れまで。')}
      <div class="cp-tocp">${TOC.map(([n, en, ja]) => `<div><b>${n}</b><span>${en}</span><em>${ja}</em></div>`).join('')}</div>${pn(no, 'CONTENTS')}`),

    // 02 ご挨拶
    sheet(N(), '', `
      <div class="cp-msg">
        <div><h2 class="cp-en">Message</h2><div class="cp-jl">代表メッセージ</div></div>
        <div>
          <div class="cp-lead">企業様と外国人材をつなぐ、<br>架け橋であり続けるために。</div>
          <div class="cp-body">
            <p>私はベトナム出身で、日本で生活し、仕事をする中で、多くの外国人材と企業様の課題を見てきました。外国人材は「日本で働きたい」という強い気持ちを持っていても、言葉や生活、仕事の面で不安を抱えています。一方で、多くの日本企業は人材不足という課題を抱えながらも、「どこに相談すればよいかわからない」「採用後のサポートが心配」と感じているのが現状です。</p>
            <p>BIGLIGHTは、そんな双方をつなぐ架け橋になりたいという思いから設立しました。私たちは人材を紹介して終わりではありません。採用前のご相談から、入社後の生活支援、職場定着まで、一人ひとり、一社一社と真剣に向き合うことを大切にしています。</p>
            <p>まだ若い会社ではありますが、お客様への感謝を忘れず、迅速・誠実・責任を持って行動し、信頼されるパートナーであり続けたいと考えています。今後ともBIGLIGHT株式会社をよろしくお願い申し上げます。</p>
          </div>
          <div class="cp-sig"><div class="cp-nm">BIGLIGHT株式会社　代表取締役　グエン・タン・トゥン<small>Nguyen Thanh Tung</small></div><div class="cp-hw">Nguyen Thanh Tung</div></div>
        </div>
      </div>${pn(no, 'MESSAGE')}`),

    // 03 会社概要 + 沿革
    sheet(N(), '', `
      ${head('Company', '会社概要・沿革', '名古屋本社とホーチミン拠点から、<br>日本の企業と外国人材をつなぐ。')}
      <div class="cp-co">
        <dl class="cp-dl">
          <div><dt>会社名</dt><dd>BIGLIGHT株式会社</dd></div>
          <div><dt>代表取締役</dt><dd>グエン・タン・トゥン</dd></div>
          <div><dt>所在地</dt><dd>〒462-0007　愛知県名古屋市北区如意一丁目112 A</dd></div>
          <div><dt>電話番号</dt><dd>052-908-7944（FAX 052-908-7267）</dd></div>
          <div><dt>設立</dt><dd>2021年8月12日</dd></div>
          <div><dt>資本金</dt><dd>5,000,000円</dd></div>
          <div><dt>事業内容</dt><dd>特定技能外国人支援事業／外国人高度人材紹介事業／支援アプリの導入・提供（BIGLIGHT ポータル・アカデミー・JOB）</dd></div>
          <div><dt>許可・登録</dt><dd>有料職業紹介事業　23-ユ-302414／登録支援機関　21登-006596</dd></div>
          ${sdg ? `<div><dt>認定</dt><dd>愛知県SDGs登録制度「あいちSDGsパートナーズ」登録（${AICHI_SDGS.since}）</dd></div>` : ''}
          <div><dt>取引銀行</dt><dd>三井住友銀行／あいち銀行</dd></div>
          <div><dt>関連会社</dt><dd>BIGLIGHT HR JOINT STOCK COMPANY（2nd Floor, THINH PHAT Building, 88 Bach Dang Street, Tan Son Hoa Ward, Ho Chi Minh City, Vietnam）</dd></div>
        </dl>
        <div>
          <div class="cp-sec">HISTORY　沿革</div>
          <div class="cp-hist">
            <div><b>2021.8</b><span>法人設立（名古屋市西区）</span></div>
            <div><b>2021.12</b><span>有料職業紹介・登録支援機関の許可を取得、営業開始</span></div>
            <div><b>2023.12</b><span>事務所移転（名古屋市北区）</span></div>
            <div><b>2024.8</b><span>ベトナム・ホーチミン市に子会社を設立、HR専門部署を立ち上げ</span></div>
            <div><b>2026.3</b><span>関東方面に出張所を開設</span></div>
            <div><b>2026.9</b><span>ポータル／アカデミー／JOB のアプリ提供を開始</span></div>
            ${sdg ? '<div><b>2026.10</b><span>あいちSDGsパートナーズに登録</span></div>' : ''}
          </div>
          ${sdg ? `<img class="cp-sdg" src="${r}img/aichi-sdgs-partners.jpg" alt="${AICHI_SDGS.alt}" width="1195" height="219">` : ''}
        </div>
      </div>${pn(no, 'COMPANY / HISTORY')}`),

    // 04 Mission / Vision / Value
    sheet(N(), '', `
      <div class="cp-mv">
        <div><h2 class="cp-en cp-m">Mission</h2><div class="cp-jl">ミッション</div><div class="cp-st">日本の成長を、<br>もっとグローバルに。</div><p class="cp-ds">人手不足に向き合う日本の企業と、「日本で働きたい」と願う外国人材。そのあいだにある言葉・制度・生活の壁を、私たちは一つずつ取り除いていきます。</p></div>
        <div><h2 class="cp-en cp-m">Vision</h2><div class="cp-jl">ビジョン</div><div class="cp-st">東海地域で最も信頼される<br>外国人材の架け橋になる。</div><p class="cp-ds">東海から全国へ、そして世界へ。私たちは、信頼と成長をつむぐ架け橋であり続けます。</p></div>
      </div>
      <div class="cp-sec cp-mt">VALUE　行動指針 F.I.R.S.T.</div>
      <div class="cp-first">
        <div><div class="cp-l">F</div><div class="cp-k">FAST</div><div class="cp-t">迷わず、<br>すぐに動く。</div><div class="cp-d">問い合わせへの返答も、手続きも、まず動く。スピードが企業と人材の信頼をつくります。</div></div>
        <div><div class="cp-l">I</div><div class="cp-k">INSIGHT</div><div class="cp-t">本質を見抜き、<br>集中する。</div><div class="cp-d">企業が本当に困っていること、人材が本当に望んでいることを見抜き、そこに力を注ぎます。</div></div>
        <div><div class="cp-l">R</div><div class="cp-k">RESPONSIBILITY</div><div class="cp-t">最後まで、<br>やり抜く。</div><div class="cp-d">紹介して終わりにしない。入社後の生活も、定着も、任されたことは最後まで責任を持つ。</div></div>
        <div><div class="cp-l">S</div><div class="cp-k">SPIRIT</div><div class="cp-t">失敗を恐れず、<br>挑む。</div><div class="cp-d">新しい仕組みを導入する。新しい分野に踏み出す。若い会社だからこそ、変化を恐れない。</div></div>
        <div><div class="cp-l">T</div><div class="cp-k">THANKFUL</div><div class="cp-t">感謝を、<br>行動で示す。</div><div class="cp-d">当たり前と思わない。企業様、人材、パートナーへの感謝を、言葉ではなく行動で返します。</div></div>
      </div>${pn(no, 'MISSION / VISION / VALUE')}`),

    // 06 特定技能 採用支援 — 企業さま / BIGLIGHT の役割分担
    sheet(N(), '', `
      ${head('Service 01', '特定技能 採用支援', '募集から定着まで、<br>企業さまの手間を一つずつ引き受けます。')}
      <div class="cp-role">
        <div class="h"><span></span><span>企業さまにお願いすること</span><span>BIGLIGHTが行うこと</span></div>
        <div><b>ご相談・確認</b><span>仕事の内容・人数・時期・条件を共有</span><span>分野・業務区分・会社の基準を確認し、採用計画をご提案</span></div>
        <div><b>募集・選考</b><span>面接・内定</span><span>国内外で募集（JOB・母国語セミナー）、書類選考、面接の日程調整と通訳</span></div>
        <div><b>契約・申請</b><span>雇用契約・分野の協議会への加入</span><span>雇用条件書・支援計画の準備、在留資格の申請書類をサポート</span></div>
        <div><b>入国・入社</b><span>住まいなど受入れの準備</span><span>空港の送迎、住まい・生活の契約、生活オリエンテーション、役所の手続きに同行</span></div>
        <div><b>定着</b><span>日々の仕事の指導</span><span>3か月に1回以上の定期面談、母国語での相談、届出、在留期間更新のご案内</span></div>
      </div>
      <p class="cp-note">対象：工業製品製造業・建設・飲食料品製造業・外食業・自動車運送業 ほか、特定技能の全分野</p>${pn(no, 'SERVICE 01')}`),

    // 07 技人国
    sheet(N(), '', `
      ${head('Service 02', '技人国 人材紹介', '専門知識を持つ人材を、<br>経験・日本語力・専攻からご提案します。')}
      <div class="cp-gj">
        <div><div class="cp-sec">ご紹介できる職種の例</div><div class="cp-chip"><span>機械・電気の設計</span><span>CAD オペレーター</span><span>生産技術・品質管理</span><span>ITエンジニア</span><span>通訳・翻訳</span><span>貿易事務・海外営業</span><span>外国人スタッフの管理</span></div></div>
        <div><div class="cp-sec">在留資格「技術・人文知識・国際業務」の主な条件</div><ul class="cp-ul"><li>大学・専門学校で学んだ内容と、仕事の内容が関連している</li><li>または、その仕事の実務経験が10年以上（通訳・翻訳などは3年以上）</li><li>報酬は日本人と同等以上</li><li>単純作業が中心の仕事は対象外</li></ul></div>
      </div>
      <div class="cp-sec cp-mt">FLOW</div>
      <div class="cp-fl"><span>ご相談</span><span>求人票の作成</span><span>候補者のご推薦</span><span>面接</span><span>内定</span><span>在留資格の申請</span><span>入社</span></div>
      <p class="cp-note">特定技能と同じく、採用が決まったときだけ費用が発生します。</p>${pn(no, 'SERVICE 02')}`),

    // 08 支援の体制
    sheet(N(), '', `
      ${head('Support', '支援の体制', '登録支援機関として、<br>義務的支援10項目を母国語で行います。')}
      <div class="cp-sup">
        <div><b>01</b>事前ガイダンス</div><div><b>06</b>日本語学習の機会の提供</div>
        <div><b>02</b>出入国時の送迎</div><div><b>07</b>相談・苦情への対応</div>
        <div><b>03</b>住居確保・生活に必要な契約の支援</div><div><b>08</b>日本人との交流促進</div>
        <div><b>04</b>生活オリエンテーション</div><div><b>09</b>転職支援（人員整理等の場合）</div>
        <div><b>05</b>公的手続き等への同行</div><div><b>10</b>定期的な面談・行政機関への届出</div>
      </div>
      <div class="cp-3">
        <div><b>母国語で</b><p>ベトナム語・インドネシア語などで、本人の相談を受けます。</p></div>
        <div><b>3つの拠点</b><p>名古屋本社・関東出張所・ホーチミン拠点。採用前から来日後まで同じチームが担当します。</p></div>
        <div><b>アプリで連絡</b><p>書類・期限・連絡を、企業さま・本人・BIGLIGHTが同じ画面で確認できます。</p></div>
      </div>${pn(no, 'SUPPORT')}`),

    // 09 アプリ（画面）
    sheet(N(), '', `
      ${head('Product', '3つのアプリ', '採用・学習・定着の現場を、<br>自社開発のアプリで支えます。')}
      <div class="cp-prod">
        <div class="w"><img src="${r}img/desk-portal.jpg" alt="BIGLIGHT ポータル（企業さま向け画面）" width="1600" height="1000"><div class="cp-pi"><img src="${r}img/icon-portal.png" alt="" width="44" height="44"><div><b>BIGLIGHT ポータル</b><p>在留期限・書類・連絡・定期面談・年末調整を、企業さまと本人がひとつの画面で。</p></div></div></div>
        <div><img class="ph" src="${r}img/shot-academy.jpg" alt="BIGLIGHT アカデミー" width="446" height="760"><div class="cp-pi"><img src="${r}img/icon-academy.png" alt="" width="44" height="44"><div><b>アカデミー</b><p>特定技能試験の対策。問題・単語・模擬試験を4言語で。</p></div></div></div>
        <div><img class="ph" src="${r}img/shot-job.jpg" alt="BIGLIGHT JOB" width="351" height="760"><div class="cp-pi"><img src="${r}img/icon-job.png" alt="" width="44" height="44"><div><b>JOB</b><p>特定技能専門の求人サイト。多言語の履歴書と面接練習。</p></div></div></div>
      </div>
      <p class="cp-note">3つとも App Store・Google Play で配信中です。</p>${pn(no, 'PRODUCT')}`),

    // 10 数字（社内データ）
    sheet(N(), '', `
      ${head('Data', '数字で見るBIGLIGHT', 'いま支援している人材と、<br>企業さまの内訳です。')}
      <div class="cp-dt">
        <div><div class="cp-sec">国籍（在籍 ${BL.active}名）</div>${donut(BL.nat, [fmt(BL.active), '名が在籍'], { unit: '名' })}</div>
        <div><div class="cp-sec">受入れ企業 ${BL.companies}社の分野</div>${hbars(BL.fields.map(([l, v], i) => [l, v, i ? '' : 'on']), { unit: '社', lw: '150px', vw: '70px', bh: '22px', fs: '14.5px', vs: '17px' })}
          <div class="cp-sec" style="margin-top:26px">所在地</div>${hbars(BL.prefs.slice(0, 5).map(([l, v], i) => [l, v, i < 3 ? '' : 'mu']), { unit: '社', lw: '150px', vw: '70px', bh: '16px', fs: '14.5px', vs: '16px' })}</div>
      </div>
      <div class="cp-nums cp-nums-s"><div><div class="cp-num">${BL.active}<small>名</small></div><i></i><p>いま支援している人材</p></div><div><div class="cp-num">${BL.companies}<small>社</small></div><i></i><p>受入れ中の企業さま</p></div><div><div class="cp-num">${BL.nat.length}<small>か国</small></div><i></i><p>人材の国籍</p></div><div><div class="cp-num">${BL.prefs.length}<small>都府県</small></div><i></i><p>企業さまの所在地</p></div></div>
      <p class="cp-note">※BIGLIGHTの支援記録より（${BL.asOf}）。在籍＝特定技能等で就労中の方。設立からの累計は 人材紹介 500名以上・取引企業 80社以上（2026年6月時点）。</p>${pn(no, 'DATA')}`),

    // 11 数字 + 選ばれる理由
    sheet(N(), '', `
      ${head('Strength', '数字で見るBIGLIGHT・選ばれる理由', '名古屋・東海エリアを中心に、<br>全国の企業様をご支援しています。')}
      <div class="cp-nums">
        <div><div class="cp-num">2021</div><i></i><p>設立</p></div>
        <div><div class="cp-num">500<small>+</small></div><i></i><p>人材紹介実績（名・累計）</p></div>
        <div><div class="cp-num">80<small>+</small></div><i></i><p>取引企業（社・累計）</p></div>
        <div><div class="cp-num">${BL.active}<small>名</small></div><i></i><p>いま支援している人材</p></div>
      </div>
      <div class="cp-note">※500名・80社は設立からの累計（2026年6月時点）。${BL.active}名・${BL.companies}社は現在の在籍・受入れ（${BL.asOf}）。</div>
      <div class="cp-rs">
        <div><div class="cp-no">01</div><div class="cp-t">高精度マッチング<small>MATCHING</small></div><div class="cp-d">経験豊富なチームが、企業のニーズと人材を丁寧にマッチングします。<b>経験豊富な専任チーム ／ 自社プラットフォームの母集団 ／ スキル・人柄まで見極め</b></div></div>
        <div><div class="cp-no">02</div><div class="cp-t">完全成功報酬<small>SUCCESS FEE</small></div><div class="cp-d">採用が決まるまで費用はかかりません。採用計画の段階から安心してご相談いただけます。<b>初期費用・着手金なし ／ 採用成功時のみのお支払い ／ 採用前のご相談は無料</b></div></div>
        <div><div class="cp-no">03</div><div class="cp-t">ワンストップ対応<small>ONE STOP</small></div><div class="cp-d">募集・面接から在留資格の手続き、入社後の生活支援・定着まで、自社で一貫して対応します。<b>採用〜定着まで一気通貫 ／ 再委託なし ／ 東海エリア密着 × ベトナム直結</b></div></div>
      </div>${pn(no, 'STRENGTH')}`),

    // 12–13 導入事例（CEO 2026-11-04: tên thật, số từ CRM — data.cjs CASES）
    sheet(N(), '', `
      ${head('Case', '導入事例', '東海エリアの企業さまでの、<br>受入れの実例です。')}
      <div class="cp-cases">${caseMini(CASES.kensetsu, '01')}${caseMini(CASES.kogyo, '02')}</div>${pn(no, 'CASE')}`),
    sheet(N(), '', `
      ${head('Case', '導入事例', '食品の製造から、外食の店舗まで。')}
      <div class="cp-cases">${caseMini(CASES.inshoku, '03')}${caseMini(CASES.gaishoku, '04')}</div>
      <p class="cp-note">※人数はBIGLIGHTの支援記録より（${BL.asOf}）。「これまでの受入れ」は入社予定の方を含みます。社名は各企業さまのご了承を得て掲載しています。</p>${pn(no, 'CASE')}`),

    // 14 流れ + 期間
    sheet(N(), '', `
      ${head('Flow', 'ご相談から定着まで', '5つのステップで、採用から定着まで。<br>ご相談は無料です。')}
      <div class="cp-steps">
        <div><span class="cp-c">1</span><div class="cp-k">STEP 01</div><div class="cp-t">ご相談</div><div class="cp-d">無料でヒアリングし、課題やご要望を伺います。</div></div>
        <div><span class="cp-c">2</span><div class="cp-k">STEP 02</div><div class="cp-t">ご提案</div><div class="cp-d">最適な人材プラン・スケジュールをご提示します。</div></div>
        <div><span class="cp-c">3</span><div class="cp-k">STEP 03</div><div class="cp-t">マッチング</div><div class="cp-d">条件に合う人材をご紹介し、面接を実施します。</div></div>
        <div><span class="cp-c">4</span><div class="cp-k">STEP 04</div><div class="cp-t">入社</div><div class="cp-d">在留資格・ビザ手続きをワンストップで対応します。</div></div>
        <div><span class="cp-c">5</span><div class="cp-k">STEP 05</div><div class="cp-t">定着支援</div><div class="cp-d">入社後も生活・就労をフォローし、長期定着を支えます。</div></div>
      </div>
      <div class="cp-sec cp-mt">SCHEDULE　入社までの目安</div>
      <div class="cp-term">
        <div><b>日本国内にいる人</b><span class="cp-bar1" style="width:33%">1〜3か月</span><p>在留資格の変更許可。技能実習の修了者・留学生・特定技能の転職者など</p></div>
        <div><b>海外にいる人</b><span class="cp-bar1 cp-bar2" style="width:66%">3〜6か月</span><p>在留資格認定証明書 → 査証 → 入国。国によって本国側の手続きが加わります</p></div>
      </div>
      <p class="cp-note">※BIGLIGHTの目安です。分野の手続き（受入計画の認定・協議会の加入など）や審査の状況で前後します。</p>${pn(no, 'FLOW')}`),

    // 08 対応分野
    sheet(N(), '', `
      ${head('Fields', '対応分野', 'BIGLIGHTが強い4つの主力分野と、自動車運送業。<br>19分野すべてご相談ください。')}
      <div class="cp-main5">
        <div><span class="cp-no">01</span><span class="cp-t">工業製品製造業<small>MANUFACTURING</small></span><span class="cp-d">機械金属加工・電気電子機器組立て・金属表面処理 など</span></div>
        <div><span class="cp-no">02</span><span class="cp-t">建設<small>CONSTRUCTION</small></span><span class="cp-d">土木・建築・ライフライン設備（国土交通省の受入計画認定に対応）</span></div>
        <div><span class="cp-no">03</span><span class="cp-t">飲食料品製造業<small>FOOD MANUFACTURING</small></span><span class="cp-d">飲食料品の製造・加工・安全衛生</span></div>
        <div><span class="cp-no">04</span><span class="cp-t">外食業<small>FOOD SERVICE</small></span><span class="cp-d">調理・接客・店舗管理（転職・移行ルートに対応）</span></div>
        <div><span class="cp-no">05</span><span class="cp-t">自動車運送業<small>TRANSPORTATION</small></span><span class="cp-d">トラック・タクシー・バスの運転者</span></div>
      </div>
      <div class="cp-sec cp-mt3">ALL FIELDS　特定技能 19分野</div>
      <div class="cp-all"><span>介護</span><span>ビルクリーニング</span><span>工業製品製造業</span><span>建設</span><span>造船・舶用工業</span><span>自動車整備</span><span>航空</span><span>宿泊</span><span>自動車運送業</span><span>鉄道</span><span>農業</span><span>漁業</span><span>飲食料品製造業</span><span>外食業</span><span>林業</span><span>木材産業</span><span>リネンサプライ</span><span>物流倉庫</span><span>資源循環</span></div>
      <div class="cp-two">
        <div><b>独自の採用チャネル</b><p>ベトナム・インドネシア出身の方に向けて、母国語のサイトと無料セミナーを運営。特定技能2号を目指す人材と直接つながり、企業様にご紹介しています。</p><span>job.biglight.jp　／　academy.biglight.jp</span></div>
        <div><b>対応エリア</b><p>名古屋本社・関東出張所・ホーチミン拠点。東海エリアを中心に、全国の企業様をご支援しています。</p><span>NAGOYA　／　KANTO　／　HO CHI MINH CITY</span></div>
      </div>${pn(no, 'FIELDS')}`),

    // 16 FAQ
    sheet(N(), '', `
      ${head('FAQ', 'よくあるご質問', 'はじめての企業さまから、<br>よくいただく質問です。')}
      <div class="cp-faq">
        ${[['費用はいつかかりますか？', '人材紹介の費用は、採用が決まったときだけです。ご相談・ご提案は無料です。'],
          ['1名からでも相談できますか？', 'はい。1名から、また人数や時期が未定の段階でもご相談いただけます。'],
          ['どのくらいで入社できますか？', '目安は、日本国内にいる人で1〜3か月、海外にいる人で3〜6か月です。'],
          ['どの国の人材を紹介できますか？', 'ベトナムが中心です。インドネシア・カンボジア・フィリピン・ミャンマー出身の方も在籍しています。'],
          ['日本語はどのくらい話せますか？', '特定技能1号の人は、日本語試験（A2.2相当以上）に合格しています。会話力は面接でご確認いただけます。'],
          ['入社後に困ったときは？', '企業さま・本人のどちらからも、担当者とアプリで連絡できます。本人の相談は母国語で受けます。']]
          .map(([q, a]) => `<div><div class="cp-fq"><b>Q</b>${q}</div><div class="cp-fa"><b>A</b>${a}</div></div>`).join('')}
      </div>${pn(no, 'FAQ')}`),

    // 09 お問い合わせ
    sheet(N(), '', `
      <div class="cp-logo cp-logo-s"><img src="${r}img/mark.png" alt="" width="1014" height="971"><img class="cp-lw" src="${r}img/wordmark.png" alt="BIGLIGHT株式会社" width="1014" height="175"></div>
      <div class="cp-cbox"><div><div class="cp-en cp-c50">Contact</div><div class="cp-jl">お問い合わせ・無料相談</div><p class="cp-ds">採用人数・職種・時期が未定でも構いません。まずはお気軽にご相談ください。</p></div><span class="cp-circ">→</span></div>
      <div class="cp-ctel">
        <div>
          <div class="cp-tel">052-908-7944</div>
          <p>平日 9:00–18:00　FAX 052-908-7267<br><b>BIGLIGHT株式会社</b>　〒462-0007 愛知県名古屋市北区如意一丁目112 A<br>biglight.jp</p>
          <div class="cp-sns"><span>FACEBOOK</span><span>INSTAGRAM</span><span>THREADS</span><span>X</span><span>WHATSAPP</span></div>
        </div>
        <div class="cp-qr"><img src="${r}img/qr-contact.svg" alt="QRコード（biglight.jp/contact/）" width="132" height="132"><p><b>WEB FORM</b>biglight.jp/contact/<br>24時間受付</p></div>
      </div>
      <div class="cp-cfoot">
        <div><b>日本本社</b>BIGLIGHT株式会社<br>〒462-0007 愛知県名古屋市北区如意一丁目112 A</div>
        <div><b>ベトナム拠点</b>BIGLIGHT HR JOINT STOCK COMPANY<br>2nd Floor, THINH PHAT Building, 88 Bach Dang Street, Tan Son Hoa Ward, Ho Chi Minh City</div>
      </div>${pn(no, '© BIGLIGHT株式会社')}`),
  ];

  const css = `<style>
.cp{--cp-line:#e0e0e0;--cp-ink:#202020;--cp-ink2:#444;--cp-grey:#737373;--cp-navy:#0b3d91;--cp-blue:#1e6fd6;--cp-gold:#f5a623;--cp-gold-l:#ffcb05;--cp-gold-d:#c47d00;padding:56px 0 120px}
.cp-bar{padding-bottom:48px;border-bottom:1px solid var(--cp-line);margin-bottom:40px}
.cp-bar p{font-size:16px;line-height:2;color:var(--cp-ink2);max-width:640px}
.cp-toc{display:flex;flex-wrap:wrap;gap:6px 22px;margin:-16px 0 40px;font:500 12px/1.8 Roboto,"Noto Sans JP",sans-serif;letter-spacing:.08em}
.cp-toc a{color:var(--cp-grey)}.cp-toc a:hover{color:var(--cp-navy)}
.cp-stack{display:grid;gap:32px}
.cp-sh{position:relative;width:100%;aspect-ratio:1200/848;overflow:hidden;border:1px solid var(--cp-line);background:#fff}
.cp-pg{width:1200px;height:848px;position:absolute;left:0;top:0;transform-origin:0 0;transform:scale(var(--cp-s,1));padding:64px 72px;overflow:hidden;color:var(--cp-ink);font-size:15px;line-height:2;background:#fff}
.cp-pg *{min-width:0}
.cp-pg h2{font-size:inherit}
.cp-en{font-family:Roboto,"Noto Sans JP",Arial,sans-serif;font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:44px!important;line-height:1.2;color:var(--cp-ink)}
.cp-en.cp-m{font-size:30px!important}.cp-en.cp-c50{font-size:50px!important}
.cp-jl{font-size:13px;font-weight:700;letter-spacing:.1em;color:var(--cp-navy);line-height:1.6;margin-top:8px}
.cp-lead{font-size:26px;font-weight:700;letter-spacing:.06em;line-height:1.7}
.cp-ds{font-size:14.5px;line-height:2;color:var(--cp-ink2)}
.cp-ds b{display:block;color:var(--cp-ink);font-weight:500;margin-top:6px}
.cp-head{display:grid;grid-template-columns:max-content 1fr;gap:40px;align-items:start}
.cp-head>div:first-child{min-width:300px}
.cp-sec{font-size:13px;font-weight:700;letter-spacing:.1em;color:var(--cp-navy)}
.cp-mt{margin-top:36px}.cp-mt2{margin-top:30px}.cp-mt3{margin-top:24px}
.cp-dots{display:flex;gap:14px}
.cp-dots i{width:7px;height:7px;border-radius:50%;display:block}
.cp-dots i:nth-child(1){background:var(--cp-gold-l)}.cp-dots i:nth-child(2){background:var(--cp-gold)}.cp-dots i:nth-child(3){background:var(--cp-blue)}.cp-dots i:nth-child(4){background:var(--cp-navy)}
.cp-pn{position:absolute;left:72px;right:72px;bottom:26px;display:flex;justify-content:space-between;align-items:center;font:500 10.5px/1 Roboto,sans-serif;letter-spacing:.16em;color:var(--cp-grey)}
.cp-no{font:500 11px/2.4 Roboto,sans-serif;letter-spacing:.14em;color:var(--cp-grey)}
/* 01 */
/* logo = biểu tượng + chữ, cùng tỉ lệ với header web (44 : 15) */
.cp-logo{display:flex;align-items:center;gap:16px;position:relative;z-index:1}
.cp-logo img{height:80px;width:auto}
.cp-logo img.cp-lw{height:27px}
.cp-logo-s{gap:12px}.cp-logo-s img{height:52px}.cp-logo-s img.cp-lw{height:18px}
.cp-big{font-size:54px;font-weight:700;letter-spacing:.04em;line-height:1.55;margin-top:104px;position:relative;z-index:1}
.cp-sub{font-size:15px;color:var(--cp-grey);margin:18px 0 30px;letter-spacing:.08em}
.cp-cover>.cp-dots{gap:24px}.cp-cover>.cp-dots i{width:9px;height:9px}
.cp-lic{position:absolute;left:72px;right:540px;bottom:64px;border-top:1px solid var(--cp-line);padding-top:22px;font-size:12.5px;line-height:1.9;color:var(--cp-ink2);letter-spacing:.04em}
.cp-lic b{display:block;font-size:15px;letter-spacing:.08em;color:var(--cp-ink);margin-bottom:4px;white-space:nowrap}
.cp-r{display:block;margin-top:10px;font:500 11px/1.8 Roboto,sans-serif;letter-spacing:.16em;color:var(--cp-grey)}
.cp-strips{position:absolute;right:0;top:0;width:560px;height:848px;overflow:hidden}
.cp-strips i{position:absolute;width:240px;display:block;clip-path:polygon(110px 0,100% 0,calc(100% - 110px) 100%,0 100%)}
.cp-strips i:nth-child(1){left:70px;top:-40px;height:620px;background:var(--cp-gold)}
.cp-strips i:nth-child(2){left:230px;top:120px;height:728px;background:var(--cp-blue)}
.cp-strips i:nth-child(3){left:390px;top:-40px;height:888px;background:var(--cp-navy)}
.cp-strips span{position:absolute;right:44px;top:72px;writing-mode:vertical-rl;font:500 11px/1 Roboto,sans-serif;letter-spacing:.3em;color:#fff}
/* 02 */
.cp-msg{display:grid;grid-template-columns:300px 1fr;gap:40px}
.cp-body{font-size:15px;line-height:2.2;color:var(--cp-ink2);margin-top:26px;display:grid;gap:14px;max-width:720px}
.cp-sig{display:flex;align-items:flex-end;justify-content:flex-end;gap:22px;margin-top:34px;max-width:720px}
.cp-nm{font-size:14px;letter-spacing:.1em;line-height:1.6}
.cp-nm small{display:block;font-size:11px;color:var(--cp-grey)}
.cp-hw{font:400 46px/1 "Mrs Saint Delafield",cursive;color:var(--cp-ink)}
/* 03 */
.cp-co{display:grid;grid-template-columns:1fr 360px;gap:64px;margin-top:30px}
.cp-dl{display:grid;grid-template-columns:150px 1fr;border-top:1px solid var(--cp-line);margin:0}
.cp-dl>div{display:contents}
.cp-dl dt,.cp-dl dd{margin:0;padding:10px 0;border-bottom:1px solid var(--cp-line);font-size:13.5px;line-height:1.8}
.cp-dl dt{font-weight:700;letter-spacing:.06em}
.cp-dl dd{color:var(--cp-ink2)}
.cp-co .cp-sec{margin-bottom:8px}
.cp-hist{border-top:1px solid var(--cp-line)}
.cp-hist>div{display:grid;grid-template-columns:78px 1fr;gap:16px;padding:10px 0;border-bottom:1px solid var(--cp-line);font-size:13px;line-height:1.8;color:var(--cp-ink2)}
.cp-hist b{font:700 15px/1.8 Roboto,sans-serif;color:var(--cp-navy);letter-spacing:.02em}
.cp-sdg{width:100%;height:auto;border:1px solid var(--cp-line);margin-top:22px}
/* 04 */
.cp-mv{display:grid;grid-template-columns:1fr 1fr;gap:56px}
.cp-st{font-size:28px;font-weight:700;letter-spacing:.06em;line-height:1.75;margin:8px 0 10px}
.cp-first{display:grid;grid-template-columns:repeat(5,1fr);margin-top:14px;border-top:1px solid var(--cp-line)}
.cp-first>div{padding:26px 22px 0 0;border-right:1px solid var(--cp-line);margin-right:22px}
.cp-first>div:last-child{border-right:0;margin-right:0}
.cp-l{font:700 52px/1 Roboto,sans-serif;color:var(--cp-navy)}
.cp-k{font:500 10.5px/1 Roboto,sans-serif;letter-spacing:.16em;color:var(--cp-gold-d);margin:12px 0 6px}
.cp-first .cp-t{font-size:17px;font-weight:700;letter-spacing:.06em;line-height:1.6}
.cp-first .cp-d,.cp-steps .cp-d{font-size:12.5px;line-height:1.9;color:var(--cp-ink2);margin-top:8px}
/* 05 */
.cp-svc{border-top:1px solid var(--cp-line);margin-top:22px}
.cp-svc>div{display:grid;grid-template-columns:130px 320px 1fr;gap:32px;padding:30px 0;border-bottom:1px solid var(--cp-line)}
.cp-nm2,.cp-svc .cp-nm{font-size:25px;font-weight:700;letter-spacing:.06em;line-height:1.4}
.cp-svc .cp-nm small{display:block;font:500 11px/1 Roboto,sans-serif;letter-spacing:.14em;color:var(--cp-grey);margin-top:8px}
.cp-apps{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;margin-top:22px}
.cp-apps>div{display:grid;grid-template-columns:44px 1fr;gap:14px}
.cp-apps img{width:44px;height:44px;border-radius:10px}
.cp-apps b{display:block;font-size:15px;letter-spacing:.04em;line-height:1.8}
.cp-apps p{margin:4px 0 8px;font-size:12.5px;line-height:1.8;color:var(--cp-ink2)}
.cp-store{display:inline-block;margin-right:6px;font:700 10px/1 Roboto,sans-serif;letter-spacing:.06em;border:1px solid var(--cp-ink);border-radius:5px;padding:5px 8px}
/* 06 */
.cp-nums{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;margin-top:30px;border-top:1px solid var(--cp-line);padding-top:34px}
.cp-num{font:700 72px/1 Roboto,sans-serif;color:var(--cp-navy);font-variant-numeric:tabular-nums}
.cp-num small{font-size:24px;color:var(--cp-gold-d);margin-left:4px}
.cp-nums i{display:block;width:40px;height:3px;background:var(--cp-gold);margin:14px 0 12px}
.cp-nums p{font-size:13.5px;letter-spacing:.06em;color:var(--cp-ink2)}
.cp-note{font-size:11.5px;color:var(--cp-grey);margin-top:10px}
/* 2026-11-04 trang mới */
.cp-nums-s{margin-top:22px;padding-top:22px}.cp-nums-s .cp-num{font-size:48px}
.cp-tocp{display:grid;grid-template-columns:1fr 1fr;gap:0 56px;margin-top:30px;border-top:1px solid var(--cp-line)}
.cp-tocp>div{display:grid;grid-template-columns:48px 150px 1fr;gap:14px;align-items:baseline;padding:11px 0;border-bottom:1px solid var(--cp-line)}
.cp-tocp b{font:700 18px/1 Roboto,sans-serif;color:var(--cp-navy)}.cp-tocp span{font:500 11px/1 Roboto,sans-serif;letter-spacing:.14em;color:var(--cp-grey);text-transform:uppercase}.cp-tocp em{font-style:normal;font-size:15px;font-weight:700;letter-spacing:.04em}
.cp-role{margin-top:30px;border-top:1px solid var(--cp-line)}
.cp-role>div{display:grid;grid-template-columns:150px 1fr 1.5fr;gap:28px;padding:16px 0;border-bottom:1px solid var(--cp-line);font-size:14px;line-height:1.85;color:var(--cp-ink2)}
.cp-role>div>b{font-size:17px;color:var(--cp-ink);letter-spacing:.04em}.cp-role>div>span:last-child{color:var(--cp-ink);font-weight:500}
.cp-role .h{font-size:12.5px;font-weight:700;letter-spacing:.08em;color:var(--cp-navy)!important;padding:10px 0}.cp-role .h span{color:var(--cp-navy)!important;font-weight:700!important}
.cp-gj{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;margin-top:30px}
.cp-chip{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.cp-chip span{border:1px solid var(--cp-line);border-radius:18px;padding:8px 16px;font-size:14px;font-weight:700;letter-spacing:.04em}
.cp-ul{margin:10px 0 0;padding:0;list-style:none;border-top:1px solid var(--cp-line)}.cp-ul li{padding:10px 0 10px 22px;border-bottom:1px solid var(--cp-line);font-size:14px;line-height:1.8;position:relative}.cp-ul li:before{content:"";position:absolute;left:4px;top:20px;width:7px;height:7px;border-radius:50%;background:var(--cp-gold)}
.cp-fl{display:grid;grid-template-columns:repeat(7,1fr);margin-top:12px}.cp-fl span{background:var(--cp-navy);color:#fff;font-size:13.5px;font-weight:700;text-align:center;padding:16px 10px 16px 18px;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 50%,calc(100% - 12px) 100%,0 100%,12px 50%)}.cp-fl span:first-child{clip-path:polygon(0 0,calc(100% - 12px) 0,100% 50%,calc(100% - 12px) 100%,0 100%)}.cp-fl span:nth-child(odd){background:#24569f}
.cp-3{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;margin-top:30px;border-top:1px solid var(--cp-line)}.cp-3>div{padding-top:16px}.cp-3 b{font-size:17px;letter-spacing:.06em}.cp-3 p{font-size:13.5px;line-height:1.9;color:var(--cp-ink2);margin:4px 0 0}
.cp-prod{display:grid;grid-template-columns:2.1fr 1fr 1fr;gap:32px;margin-top:26px;align-items:end}
.cp-prod img.ph,.cp-prod .w>img{display:block;border:1px solid var(--cp-line);border-radius:10px}.cp-prod .w>img{width:100%;height:auto}.cp-prod img.ph{height:330px;width:auto;margin:0 auto;border-radius:18px}
.cp-pi{display:grid;grid-template-columns:36px 1fr;gap:12px;margin-top:16px}.cp-pi img{width:36px;height:36px;border-radius:8px}.cp-pi b{font-size:14.5px}.cp-pi p{margin:2px 0 0;font-size:12.5px;line-height:1.75;color:var(--cp-ink2)}
.cp-dt{display:grid;grid-template-columns:1fr 1fr;gap:56px;margin-top:26px}.cp-dt .cp-sec{margin-bottom:14px}.cp-dt .dx-dn{grid-template-columns:240px 1fr;gap:24px}.cp-dt .dx-dn svg{width:240px;height:240px}.cp-dt .dx-lg>div{font-size:14.5px;padding:8px 0}
.cp-cases{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:28px}
.cp-case{border-top:2px solid var(--cp-ink);padding-top:16px}.cp-cn{font-size:28px;font-weight:700;letter-spacing:.04em;line-height:1.5}.cp-cm{font-size:13px;color:var(--cp-grey);margin-top:2px}
.cp-cs{display:grid;grid-template-columns:repeat(4,auto);justify-content:start;gap:32px;margin-top:30px}.cp-cs b{display:block;font:700 52px/1 Roboto,sans-serif;color:var(--cp-navy)}.cp-cs b small{font-size:14px;color:var(--cp-gold-d);margin-left:3px;font-family:"Noto Sans JP",sans-serif}.cp-cs span{font-size:12px;color:var(--cp-ink2)}
.cp-cp{list-style:none;margin:20px 0 0;padding:0;border-top:1px solid var(--cp-line)}.cp-cp li{padding:20px 0 20px 22px;border-bottom:1px solid var(--cp-line);font-size:16px;line-height:1.8;position:relative}.cp-cp li:before{content:"";position:absolute;left:4px;top:32px;width:7px;height:7px;border-radius:50%;background:var(--cp-gold)}
.cp-term{border-top:1px solid var(--cp-line);margin-top:14px}.cp-term>div{display:grid;grid-template-columns:200px 1fr;gap:6px 28px;padding:16px 0;border-bottom:1px solid var(--cp-line);align-items:center}.cp-term b{font-size:16px}.cp-term p{grid-column:2;margin:0;font-size:13px;color:var(--cp-ink2);line-height:1.8}
.cp-bar1{display:block;background:var(--cp-navy);color:#fff;font:700 15px/36px Roboto,"Noto Sans JP",sans-serif;padding-left:16px;border-radius:0 6px 6px 0}.cp-bar2{background:var(--cp-blue)}
.cp-faq{display:grid;grid-template-columns:1fr 1fr;gap:0 48px;margin-top:26px;border-top:1px solid var(--cp-line)}.cp-faq>div{padding:18px 0;border-bottom:1px solid var(--cp-line)}
.cp-fq,.cp-fa{display:grid;grid-template-columns:28px 1fr;gap:4px;align-items:baseline}.cp-fq{font-size:16.5px;font-weight:700;letter-spacing:.03em}.cp-fa{font-size:14px;color:var(--cp-ink2);line-height:1.9;margin-top:6px}.cp-fq b,.cp-fa b{font:700 17px/1 Roboto,sans-serif;color:var(--cp-navy)}.cp-fa b{color:var(--cp-gold-d)}
.cp-rs{border-top:1px solid var(--cp-line);margin-top:14px}
.cp-rs>div{display:grid;grid-template-columns:70px 300px 1fr;gap:28px;padding:22px 0;border-bottom:1px solid var(--cp-line)}
.cp-rs .cp-no{line-height:2.2}
.cp-rs .cp-t{font-size:22px;font-weight:700;letter-spacing:.06em;line-height:1.5}
.cp-rs .cp-t small,.cp-main5 .cp-t small{font:500 11px/1 Roboto,sans-serif;letter-spacing:.14em;color:var(--cp-grey)}
.cp-rs .cp-t small{display:block;margin-top:6px}
.cp-rs .cp-d{font-size:14px;line-height:1.95;color:var(--cp-ink2)}
.cp-rs .cp-d b{display:block;color:var(--cp-ink);font-weight:500;margin-top:4px}
/* 07 */
.cp-steps{display:grid;grid-template-columns:repeat(5,1fr);margin-top:52px;position:relative}
.cp-steps:before{content:"";position:absolute;left:24px;right:24px;top:24px;height:1px;background:var(--cp-line)}
.cp-steps>div{position:relative;padding-right:24px}
.cp-c{width:48px;height:48px;border-radius:50%;background:var(--cp-navy);color:#fff;display:flex;align-items:center;justify-content:center;font:700 15px/1 Roboto,sans-serif;position:relative}
.cp-steps .cp-k{margin-top:16px}
.cp-steps .cp-t{font-size:18px;font-weight:700;letter-spacing:.06em}
.cp-sup{display:grid;grid-template-columns:1fr 1fr;gap:0 48px;margin-top:16px;border-top:1px solid var(--cp-line)}
.cp-sup>div{display:grid;grid-template-columns:34px 1fr;gap:12px;align-items:baseline;padding:13px 0;border-bottom:1px solid var(--cp-line);font-size:14.5px;letter-spacing:.04em;line-height:1.8}
.cp-sup b{font:500 11px/1 Roboto,sans-serif;letter-spacing:.1em;color:var(--cp-navy)}
/* 08 */
.cp-main5{border-top:1px solid var(--cp-line);margin-top:24px}
.cp-main5>div{display:grid;grid-template-columns:70px 360px 1fr;gap:28px;padding:13px 0;border-bottom:1px solid var(--cp-line);align-items:baseline}
.cp-main5 .cp-no{line-height:1}
.cp-main5 .cp-t{font-size:19px;font-weight:700;letter-spacing:.06em;white-space:nowrap}
.cp-main5 .cp-t small{margin-left:12px}
.cp-main5 .cp-d{font-size:13px;color:var(--cp-ink2);line-height:1.8}
.cp-all{display:flex;flex-wrap:wrap;margin-top:10px;font-size:13px;color:var(--cp-ink2);letter-spacing:.04em}
.cp-all span:not(:last-child):after{content:"／";color:#ccc;margin:0 .6em}
.cp-two{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:22px;border-top:1px solid var(--cp-line)}
.cp-two>div{padding-top:16px}
.cp-two b{font-size:16px;letter-spacing:.06em}
.cp-two p{font-size:13px;line-height:1.9;color:var(--cp-ink2);margin-top:4px}
.cp-two span{display:block;font:500 12px/1.6 Roboto,sans-serif;letter-spacing:.06em;color:var(--cp-navy);margin-top:6px}
/* 09 */
.cp-cbox{border:1px solid var(--cp-ink);padding:48px 56px;display:grid;grid-template-columns:1fr auto;align-items:center;gap:40px;margin-top:36px}
.cp-cbox .cp-ds{margin-top:10px}
.cp-circ{width:44px;height:44px;border-radius:50%;background:var(--cp-navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px}
.cp-ctel{display:grid;grid-template-columns:1fr 260px;gap:48px;margin-top:44px}
.cp-tel{font:700 48px/1 Roboto,sans-serif;letter-spacing:.02em}
.cp-ctel p{font-size:13.5px;color:var(--cp-ink2);line-height:2.1;margin-top:14px}
.cp-ctel p b{color:var(--cp-ink)}
.cp-sns{display:flex;gap:8px;margin-top:20px;flex-wrap:wrap}
.cp-sns span{font:500 10.5px/1 Roboto,sans-serif;letter-spacing:.08em;border:1px solid var(--cp-line);border-radius:12px;padding:6px 10px;color:var(--cp-ink2)}
.cp-qr{display:grid;grid-template-columns:132px 1fr;gap:16px;align-items:center}
.cp-qr img{width:132px;height:132px}
.cp-qr p{margin:0;font-size:12px;line-height:1.8}
.cp-qr p b{display:block;font:500 11px/1.6 Roboto,sans-serif;letter-spacing:.1em;color:var(--cp-navy)}
.cp-cfoot{position:absolute;left:72px;right:72px;bottom:64px;border-top:1px solid var(--cp-line);padding-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:40px;font-size:12.5px;line-height:1.9;color:var(--cp-ink2)}
.cp-cfoot b{display:block;font-size:12px;letter-spacing:.1em;color:var(--cp-navy)}
@media (max-width:700px){.cp{padding:32px 0 80px}.cp-stack{gap:16px}}
@media print{
  @page{size:A4 landscape;margin:0}
  html,body,main{background:#fff!important;margin:0!important;padding:0!important}
  body>*:not(main),main>*:not(.cp),.cp-bar,.cp-toc,.ckb{display:none!important}
  .cp{padding:0!important;margin:0!important}.cp>.wrap{max-width:none;padding:0;margin:0}
  .cp-stack{display:block}
  /* thấp hơn trang 0,5mm: tờ cao đúng 210mm thì Chrome cắt mất chân trang khi làm tròn */
  .cp-sh{width:297mm;height:209.5mm;aspect-ratio:auto;border:0;break-inside:avoid;break-after:page;page-break-after:always}
  .cp-sh:last-child{break-after:auto;page-break-after:auto}
  .cp-pg{position:relative;transform:scale(.93543)!important}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
}
</style>`;

  const js = `<script>(function(){var st=document.querySelector('.cp-stack');if(!st)return;function fit(){var w=st.clientWidth;if(!w)return;st.style.setProperty('--cp-s',Math.min(1,w/1200));}fit();addEventListener('resize',fit);if(window.ResizeObserver)new ResizeObserver(fit).observe(st);})();</script>`;

  return page({ root: r, title: '会社案内｜BIGLIGHT株式会社', desc: 'BIGLIGHT株式会社の会社案内。', body: `
${pageHead('We are', '私たちについて', aboutTabs(r, 'company'))}
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap&text=NguyenThanhTung%20">
${css}${DX_CSS}
<section class="cp"><div class="wrap">
  <div class="side cp-bar" style="margin-top:24px"><h2 class="en">Profile</h2><div><p>会社概要・事業内容・支援の体制・導入事例・ご相談の流れを、1冊の会社案内にまとめました。印刷や社内でのご共有には、PDF（A4横・17ページ）をご利用ください。</p><div style="margin-top:24px">${pill('PDFをダウンロード', PDF)}</div></div></div>
  <nav class="cp-toc" aria-label="会社案内の目次"><a href="#p01">01 表紙</a>${TOC.map(([n, , ja]) => `<a href="#p${n}">${n} ${ja}</a>`).join('')}</nav>
  <div class="cp-stack">${sheets.join('\n')}</div>
</div></section>
${js}` });
};
