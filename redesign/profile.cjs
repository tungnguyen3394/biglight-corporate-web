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

  const sheets = [
    // 01 表紙 — 3 dải xiên của hero trang chủ, màu phẳng thay ảnh
    sheet(1, 'cp-cover', `
      <div class="cp-logo"><img src="${r}img/mark.png" alt="" width="1014" height="971"><img class="cp-lw" src="${r}img/wordmark.png" alt="BIGLIGHT株式会社" width="1014" height="175"></div>
      <div class="cp-big">外国人材の採用を、<br>紹介から定着まで。</div>
      <div class="cp-sub">BIGLIGHT株式会社 会社案内</div>
      ${dots}
      <div class="cp-lic"><b>特定技能・技人国の外国人材紹介と登録支援</b>有料職業紹介事業　許可番号 23-ユ-302414<br>登録支援機関　登録番号 21登-006596<span class="cp-r">NAGOYA / KANTO / HO CHI MINH CITY</span></div>
      <div class="cp-strips" aria-hidden="true"><i></i><i></i><i></i><span>COMPANY PROFILE ${new Date().getFullYear()}</span></div>`),

    // 02 ご挨拶
    sheet(2, '', `
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
      </div>${pn(2, 'MESSAGE')}`),

    // 03 会社概要 + 沿革
    sheet(3, '', `
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
      </div>${pn(3, 'COMPANY / HISTORY')}`),

    // 04 Mission / Vision / Value
    sheet(4, '', `
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
      </div>${pn(4, 'MISSION / VISION / VALUE')}`),

    // 05 事業内容 + アプリ
    sheet(5, '', `
      ${head('Service', '事業内容', '採用から定着まで、ワンストップで。<br>完全成功報酬でご支援します。')}
      <div class="cp-svc">
        <div><div class="cp-no">SERVICE 01</div><div class="cp-nm">特定技能 採用支援<small>SPECIFIED SKILLED WORKER</small></div><div class="cp-ds">人手不足の19分野に、即戦力の外国人材を。募集・面接から在留資格の手続き、登録支援機関としての義務的支援まで一貫して対応します。<b>対象：工業製品製造業・建設・飲食料品製造業・外食業・自動車運送業 ほか</b></div></div>
        <div><div class="cp-no">SERVICE 02</div><div class="cp-nm">技人国 人材紹介<small>ENGINEER / SPECIALIST</small></div><div class="cp-ds">エンジニア・通訳・貿易事務など、専門知識を持つ高度人材をご紹介します。経験・日本語力・専門性から最適な人材をご提案します。<b>対象：技術・人文知識・国際業務の在留資格を持つ人材</b></div></div>
      </div>
      <div class="cp-sec cp-mt2">PRODUCT　採用・学習・定着の現場に、3つのアプリ</div>
      <div class="cp-apps">
        <div><img src="${r}img/icon-portal.png" alt="" width="44" height="44"><div><b>BIGLIGHT ポータル</b><p>在留資格・書類・連絡・定期面談・年末調整などの支援業務を、企業と本人がひとつの画面で。</p><span class="cp-store">App Store</span><span class="cp-store">Google Play</span></div></div>
        <div><img src="${r}img/icon-academy.png" alt="" width="44" height="44"><div><b>BIGLIGHT アカデミー</b><p>特定技能試験の対策アプリ。分野別の問題・単語・文法・模擬試験を、ベトナム語・インドネシア語・ミャンマー語・ネパール語で。</p><span class="cp-store">App Store</span><span class="cp-store">Google Play</span></div></div>
        <div><img src="${r}img/icon-job.png" alt="" width="44" height="44"><div><b>BIGLIGHT JOB</b><p>特定技能専門の求人サイト。全国の求人検索から多言語の履歴書作成、面接練習、入社後フォローまで。</p><span class="cp-store">App Store</span><span class="cp-store">Google Play</span></div></div>
      </div>${pn(5, 'SERVICE / PRODUCT')}`),

    // 06 数字 + 選ばれる理由
    sheet(6, '', `
      ${head('Strength', '数字で見るBIGLIGHT・選ばれる理由', '名古屋・東海エリアを中心に、<br>全国の企業様をご支援しています。')}
      <div class="cp-nums">
        <div><div class="cp-num">2021</div><i></i><p>設立</p></div>
        <div><div class="cp-num">500<small>+</small></div><i></i><p>人材紹介実績（名）</p></div>
        <div><div class="cp-num">80<small>+</small></div><i></i><p>取引企業（社）</p></div>
        <div><div class="cp-num">19<small>分野</small></div><i></i><p>特定技能 対応分野</p></div>
      </div>
      <div class="cp-note">※人材紹介実績・取引企業数は2026年6月時点</div>
      <div class="cp-rs">
        <div><div class="cp-no">01</div><div class="cp-t">高精度マッチング<small>MATCHING</small></div><div class="cp-d">経験豊富なチームが、企業のニーズと人材を丁寧にマッチングします。<b>経験豊富な専任チーム ／ 自社プラットフォームの母集団 ／ スキル・人柄まで見極め</b></div></div>
        <div><div class="cp-no">02</div><div class="cp-t">完全成功報酬<small>SUCCESS FEE</small></div><div class="cp-d">採用が決まるまで費用はかかりません。採用計画の段階から安心してご相談いただけます。<b>初期費用・着手金なし ／ 採用成功時のみのお支払い ／ 採用前のご相談は無料</b></div></div>
        <div><div class="cp-no">03</div><div class="cp-t">ワンストップ対応<small>ONE STOP</small></div><div class="cp-d">募集・面接から在留資格の手続き、入社後の生活支援・定着まで、自社で一貫して対応します。<b>採用〜定着まで一気通貫 ／ 再委託なし ／ 東海エリア密着 × ベトナム直結</b></div></div>
      </div>${pn(6, 'STRENGTH')}`),

    // 07 流れ + 義務的支援
    sheet(7, '', `
      ${head('Flow', 'ご相談から定着まで', '5つのステップで、採用から定着まで。<br>ご相談は無料です。')}
      <div class="cp-steps">
        <div><span class="cp-c">1</span><div class="cp-k">STEP 01</div><div class="cp-t">ご相談</div><div class="cp-d">無料でヒアリングし、課題やご要望を伺います。</div></div>
        <div><span class="cp-c">2</span><div class="cp-k">STEP 02</div><div class="cp-t">ご提案</div><div class="cp-d">最適な人材プラン・スケジュールをご提示します。</div></div>
        <div><span class="cp-c">3</span><div class="cp-k">STEP 03</div><div class="cp-t">マッチング</div><div class="cp-d">条件に合う人材をご紹介し、面接を実施します。</div></div>
        <div><span class="cp-c">4</span><div class="cp-k">STEP 04</div><div class="cp-t">入社</div><div class="cp-d">在留資格・ビザ手続きをワンストップで対応します。</div></div>
        <div><span class="cp-c">5</span><div class="cp-k">STEP 05</div><div class="cp-t">定着支援</div><div class="cp-d">入社後も生活・就労をフォローし、長期定着を支えます。</div></div>
      </div>
      <div class="cp-sec cp-mt">SUPPORT　登録支援機関として、義務的支援10項目を母国語で代行</div>
      <div class="cp-sup">
        <div><b>01</b>事前ガイダンス</div><div><b>06</b>日本語学習の機会の提供</div>
        <div><b>02</b>出入国時の送迎</div><div><b>07</b>相談・苦情への対応</div>
        <div><b>03</b>住居確保・生活に必要な契約の支援</div><div><b>08</b>日本人との交流促進</div>
        <div><b>04</b>生活オリエンテーション</div><div><b>09</b>転職支援（人員整理等の場合）</div>
        <div><b>05</b>公的手続き等への同行</div><div><b>10</b>定期的な面談・行政機関への届出</div>
      </div>${pn(7, 'FLOW / SUPPORT')}`),

    // 08 対応分野
    sheet(8, '', `
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
      </div>${pn(8, 'FIELDS')}`),

    // 09 お問い合わせ
    sheet(9, '', `
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
      </div>${pn(9, '© BIGLIGHT株式会社')}`),
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
${css}
<section class="cp"><div class="wrap">
  <div class="side cp-bar" style="margin-top:24px"><h2 class="en">Profile</h2><div><p>会社概要・事業内容・ご相談の流れ・対応分野を、1冊の会社案内にまとめました。印刷や社内でのご共有には、PDF（A4横・9ページ）をご利用ください。</p><div style="margin-top:24px">${pill('PDFをダウンロード', PDF)}</div></div></div>
  <nav class="cp-toc" aria-label="会社案内の目次"><a href="#p01">01 表紙</a><a href="#p02">02 代表メッセージ</a><a href="#p03">03 会社概要・沿革</a><a href="#p04">04 ミッション・ビジョン</a><a href="#p05">05 事業内容</a><a href="#p06">06 数字・選ばれる理由</a><a href="#p07">07 ご相談の流れ</a><a href="#p08">08 対応分野</a><a href="#p09">09 お問い合わせ</a></nav>
  <div class="cp-stack">${sheets.join('\n')}</div>
</div></section>
${js}` });
};
