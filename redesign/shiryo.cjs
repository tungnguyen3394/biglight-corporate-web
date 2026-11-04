// 受入れ準備ガイド /guide/preparation/ + 分野別ガイド /guide/field/ (CEO 2026-11-01): A4 ngang, cùng khung guide.cjs (lớp tg-…), ít chữ.
// Một nguồn, hai hình thức: trang web + PDF (deploy-new.yml in bằng Chrome). noindex, không menu, chỉ gửi bằng link. Không ghi số tiền.
// Quy định theo 運用要領 令和8年10月. Thời gian 国内 1〜3か月・海外 3〜6か月 = cùng con số FAQ trên web, là mốc tham khảo của BIGLIGHT.
const { TG_CSS, TG_JS } = require('./guide.cjs');
const AS_OF = '令和8年11月時点';
let r = '../../';   // trang 分野別 sâu hơn 1 cấp: exports.field đổi tạm
const dots = '<span class="tg-dots"><i></i><i></i><i></i><i></i></span>';

const CSS = `<style>
.sy-ck{display:grid;grid-template-columns:1fr 1fr;gap:0 44px}
.sy-ck li{display:grid;grid-template-columns:34px 1fr;gap:14px;align-items:center;min-height:138px;padding:10px 0;border-bottom:1px solid var(--ln)}
.sy-ck i{width:30px;height:30px;border:2px solid var(--navy);border-radius:5px;display:block}
.sy-ck b{display:block;font-size:21px;line-height:1.45}.sy-ck small{display:block;font-size:15px;color:var(--grey);line-height:1.5;margin-top:2px}
.sy-who{display:flex;align-items:center;gap:14px;margin-top:18px;font-size:15px;color:var(--ink2)}.sy-who u{text-decoration:none;flex:1;border-bottom:1px solid var(--ink);height:26px}
.sy-bars{margin-top:36px}
.sy-sc{display:grid;grid-template-columns:150px repeat(6,1fr);font-size:15px;font-weight:700;color:var(--ink2);padding-bottom:12px;border-bottom:1px solid var(--ln);text-align:right}
.sy-row{display:grid;grid-template-columns:150px 1fr;align-items:center;height:210px;border-bottom:1px solid var(--ln)}.sy-row>b{font-size:22px}
.sy-tr{position:relative;height:110px}.sy-tr i{position:absolute;top:0;bottom:0;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:19px;font-weight:700}
.sy-tr i.s{background:var(--navy);color:#fff;border-radius:10px 0 0 10px}.sy-tr i.m{background:var(--tn);color:var(--navy);border-radius:0 10px 10px 0}
.sy-lane{display:grid;gap:6px 6px;margin-top:6px}
.sy-lane .h{background:var(--navy);color:#fff;font-weight:700;font-size:15.5px;text-align:center;padding:14px 12px;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 50%,calc(100% - 12px) 100%,0 100%,12px 50%);display:flex;align-items:center;justify-content:center;min-height:84px;line-height:1.35}
.sy-lane .l{display:flex;align-items:center;font-weight:700;font-size:16px;color:var(--navy)}
.sy-lane .c{background:var(--tn);border-radius:6px;font-size:16px;line-height:1.45;padding:10px 6px;min-height:152px;display:flex;align-items:center;justify-content:center;text-align:center;font-weight:700}
.sy-lane .c.b{background:var(--tg)}.sy-lane .c.e{background:#f5f6f8;color:#9a9a9a;font-weight:400}.sy-lane .c.k{background:var(--navy);color:#fff}
.sy-tiles{display:grid;gap:14px}.sy-tile{background:var(--tn);border-radius:10px;padding:18px 20px;display:flex;flex-direction:column;justify-content:center;min-height:152px}.sy-tile b{font-size:21px;color:var(--navy);line-height:1.4}.sy-tile span{font-size:15.5px;color:var(--ink2);margin-top:6px;line-height:1.5}
.sy-tile.n{background:#fdf0ec}.sy-tile.n b{color:#c0392b}.sy-tile.k{background:var(--tg)}
.sy-chips{display:grid;grid-template-columns:repeat(var(--c),1fr);gap:12px}.sy-chips span{background:var(--tn);color:var(--navy);border-radius:10px;height:var(--h);display:flex;align-items:center;justify-content:center;text-align:center;padding:6px;font-size:var(--f);font-weight:700}.sy-chips span.on{background:var(--navy);color:#fff}
.sy-flow{display:grid;gap:0;margin-top:6px}.sy-flow div{background:var(--tn);color:var(--navy);min-height:260px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:17px;font-weight:700;line-height:1.45;padding:8px 20px 8px 24px;clip-path:polygon(0 0,calc(100% - 18px) 0,100% 50%,calc(100% - 18px) 100%,0 100%,18px 50%)}
.sy-flow div:first-child{clip-path:polygon(0 0,calc(100% - 18px) 0,100% 50%,calc(100% - 18px) 100%,0 100%)}.sy-flow div.on{background:var(--navy);color:#fff}
.fx-up{display:grid;grid-template-columns:repeat(4,1fr);gap:0}.fx-up>div{background:var(--tn);padding:34px 30px 34px 40px;min-height:300px;clip-path:polygon(0 0,calc(100% - 22px) 0,100% 50%,calc(100% - 22px) 100%,0 100%,22px 50%)}.fx-up>div:first-child{clip-path:polygon(0 0,calc(100% - 22px) 0,100% 50%,calc(100% - 22px) 100%,0 100%)}.fx-up .on{background:var(--navy);color:#fff}.fx-up b{display:block;font-size:26px}.fx-up span{display:block;font-size:17px;margin-top:14px;line-height:1.6}
.fx-form{display:grid;grid-template-columns:1fr 1fr;gap:0 44px}.fx-form>div{display:grid;grid-template-columns:230px 1fr;align-items:end;height:84px;border-bottom:1px solid var(--ink)}.fx-form b{font-size:18px;padding-bottom:12px}
.fx-pt{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.fx-pt>div{background:var(--tn);border-radius:12px;padding:34px 30px;min-height:470px}.fx-pt b{display:block;font-size:26px;color:var(--navy);margin-top:20px;line-height:1.4}.fx-pt p{font-size:18px;color:var(--ink2);margin-top:14px!important;line-height:1.75}
.fx-toc{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:28px;font-size:15px}.fx-toc span{font-weight:700;color:var(--navy);margin-right:8px}.fx-toc em{background:#f3f5f8;border-radius:16px;padding:7px 14px;font-weight:700;color:var(--ink2)}
.fx-sp{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.fx-sp>div{background:var(--tn);border-radius:12px;padding:30px 24px;min-height:500px;position:relative}.fx-sp>div:not(:last-child):after{content:"→";position:absolute;right:-13px;top:50%;font-weight:700;color:var(--navy);z-index:1}.fx-sp b{display:block;font-size:22px;color:var(--navy);margin-top:22px;line-height:1.4}.fx-sp p{font-size:17px;color:var(--ink2);margin-top:12px!important;line-height:1.75}
.fx-tm{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:30px}.fx-tm>div{display:flex;justify-content:space-between;align-items:center;background:#f3f5f8;border-radius:10px;padding:22px 28px}.fx-tm b{font-size:19px}.fx-tm span{font:700 30px/1 Roboto,"Noto Sans JP",sans-serif;color:var(--navy)}
.fx-st{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.fx-st>div{border-radius:12px;padding:30px 22px;min-height:360px;display:flex;flex-direction:column;gap:10px}.fx-st .x{background:#fdf0ec}.fx-st .o{background:var(--tn)}.fx-st b{font-size:22px;line-height:1.4}.fx-st span{font-size:15px;color:var(--ink2)}.fx-st em{margin-top:auto;font-size:21px;font-weight:700;line-height:1.5}.fx-st .x em{color:#c0392b}.fx-st .o em{color:var(--navy)}
.fx-faq>div{min-height:190px}.fx-faq .tg-fq{font-size:19px}.fx-faq .tg-fa{font-size:17px}
.tg-pg .dx-tb{font-size:18.5px}.tg-pg .dx-tb td,.tg-pg .dx-tb th{padding:20px 14px}.tg-pg .dx-tb th{font-size:15px}
.tg-pg .dx-dn{grid-template-columns:250px 1fr;gap:26px}.tg-pg .dx-dn svg{width:250px;height:250px}.tg-pg .dx-lg>div{font-size:16px}
.tg-pg .dx-case{grid-template-columns:450px 1fr}
.fx-ex .dx-tb td,.fx-ex .dx-tb th{padding:12px 14px}.fx-ex .dx-tb th:empty{display:none}.fx-ex thead tr:has(th:empty){display:none}
.tg-pg .dx-2 .dx-dn{grid-template-columns:210px 1fr;gap:20px}.tg-pg .dx-2 .dx-dn svg{width:210px;height:210px}.tg-pg .dx-2 .dx-lg>div{font-size:15px;grid-template-columns:16px 1fr auto;gap:10px}.tg-pg .dx-2 .dx-lg b{font-size:17px}
</style>${require('./data.cjs').DX_CSS}`;

function sheetsOf() { let no = 0; return {
  sheet: (cls, inner) => { no += 1; const id = String(no).padStart(2, '0'); return `<div class="tg-sh" id="p${id}"><div class="tg-pg${cls ? ' ' + cls : ''}">${inner}</div></div>`; },
  foot: (t) => `<div class="tg-pn"><span>${String(no + 1).padStart(2, '0')}</span>${dots}<span>${t}</span></div>`,
}; }
const cover = (S, title, sub, en) => S.sheet('tg-cover', `
  <div class="tg-logo"><img src="${r}img/mark.png" alt="" width="1014" height="971"><img class="tg-lw" src="${r}img/wordmark.png" alt="BIGLIGHT株式会社" width="1014" height="175"></div>
  <h2 class="tg-big" style="font-size:52px">${title}</h2>
  <div class="tg-sub">${sub}</div>${dots}
  <div class="tg-asof"><b>企業のご担当者さま向け</b>${AS_OF}　BIGLIGHT株式会社</div>
  <div class="tg-strips" aria-hidden="true"><i></i><i></i><i></i><span>${en}</span></div>`);
const contact = (S, src) => S.sheet('', `
  <div class="tg-logo tg-logo-s"><img src="${r}img/mark.png" alt="" width="1014" height="971"><img class="tg-lw" src="${r}img/wordmark.png" alt="BIGLIGHT株式会社" width="1014" height="175"></div>
  <div class="tg-cbox"><div><div class="tg-en">Contact</div><p>人数や時期が未定でも大丈夫です。まずはお気軽にご相談ください。</p></div><span class="tg-circ">→</span></div>
  <div class="tg-ctel"><div><div class="tg-tel">052-908-7944</div><p>平日 9:00–18:00<br><b>BIGLIGHT株式会社</b>　〒462-0007 愛知県名古屋市北区如意一丁目112 A</p></div>
    <div class="tg-qr"><img src="${r}img/qr-contact.svg" alt="QRコード（biglight.jp/contact/）" width="132" height="132"><p><b>WEB FORM</b>biglight.jp/contact/</p></div></div>
  <div class="tg-src">${src}</div>${S.foot('© BIGLIGHT株式会社')}`);
const wrap = ({ page, pageHead, pill }, en, ja, title, desc, PDF, sheets) => page({ root: r, title: `${title}｜BIGLIGHT株式会社`, desc, body: `
${pageHead(en, ja)}
${TG_CSS}${CSS}
<section class="tg-root0"><div class="wrap">
  <div class="tg-bar">${pill('PDFをダウンロード', PDF)}</div>
  <div class="tg-stack">${sheets.join('\n')}</div>
</div></section>
${TG_JS}` });

const items = (a) => `<ul class="sy-ck">${a.map(([t, n]) => `<li><i></i><span><b>${t}</b>${n ? `<small>${n}</small>` : ''}</span></li>`).join('')}</ul>`;

const lane = (cols, tpl) => `<div class="sy-lane" style="grid-template-columns:86px repeat(${cols},1fr)">${tpl}</div>`;
const heads = (a) => '<span></span>' + a.map(x => `<div class="h">${x}</div>`).join('');
const cells = (lb, a, c) => `<div class="l">${lb}</div>` + a.map(x => x ? `<div class="c ${c || ''}">${x}</div>` : '<div class="c e">—</div>').join('');

/* 受入れ準備ガイド (CEO 2026-11-01): gộp チェックリスト + スケジュール表 thành 1 tài liệu 10 trang. Link cũ: nginx 301, CRM kind cũ trỏ sang đây. */
exports.prep = (o) => {
  const S = sheetsOf();
  const pg = (q, a, body) => S.sheet('', `<h2 class="tg-q tg-q0">${q}</h2><p class="tg-a">${a}</p><div class="tg-body">${body}</div>${S.foot('受入れ準備ガイド')}`);
  return wrap(o, 'Preparation', '受入れ準備ガイド', '受入れ準備ガイド', '特定技能の受入れ準備のチェックリストと、入社までのスケジュール。', o.PDF_URL, [
    cover(S, '受入れ準備ガイド', '何を、いつまでに。印刷して、順番に確認するだけ。', 'PREPARATION GUIDE'),
    pg('入社まで、どのくらいかかる？', '国内にいる人か、海外にいる人かで変わります。', `
      <div class="sy-bars">
        <div class="sy-sc"><span></span><span>1か月</span><span>2か月</span><span>3か月</span><span>4か月</span><span>5か月</span><span>6か月</span></div>
        <div class="sy-row"><b>国内の人</b><div class="sy-tr"><i class="s" style="left:0;width:16.67%">1か月〜</i><i class="m" style="left:16.67%;width:33.33%">3か月</i></div></div>
        <div class="sy-row"><b>海外の人</b><div class="sy-tr"><i class="s" style="left:0;width:50%">3か月〜</i><i class="m" style="left:50%;width:50%">6か月</i></div></div>
      </div>
      <p class="tg-note">※一般的な目安です。職種、在留資格の状況、審査の期間によって異なります。</p>`),
    pg('1. 受け入れできる会社か', '当てはまる項目にチェックしてください。', items([
      ['仕事が特定技能の業務区分に当てはまる', '分野ごとに業務区分があります'],
      ['報酬は同じ業務の日本人と同等以上', ''],
      ['フルタイムで直接雇用する', '原則 週5日以上・年217日以上、週30時間以上。派遣は農業・漁業のみ'],
      ['5年以内に出入国・労働法令の違反がない', ''],
      ['同じ業務の人を会社都合で離職させていない', '契約の前1年以内と、契約の後'],
      ['会社の責任で行方不明者を出していない', '契約の前1年以内と、契約の後'],
      ['税金・社会保険料を納めている', ''],
      ['介護・建設は 人数枠を確認した', 'その他の分野に人数枠はありません'],
    ])),
    pg('2. 支援の準備', '1号の方には、10項目の支援が必要です。', items([
      ['支援を自社で行うか、委託するか決めた', '全部を登録支援機関に委託すれば、支援体制の基準を満たします'],
      ['自社で行う場合: 支援責任者・担当者を決めた', '過去2年の受入れ実績、または生活相談の経験が必要です'],
      ['本人が理解できる言語で対応できる', ''],
      ['住まいの準備を決めた', '社宅の提供、連帯保証など'],
      ['空港などへの送迎を手配できる', ''],
      ['生活オリエンテーションの担当を決めた', ''],
      ['定期面談の担当を決めた', '3か月に1回以上'],
      ['現場の責任者・同僚に受入れを伝えた', ''],
    ])),
    pg('3. 契約の確認', '雇用契約の前に確認してください。', items([
      ['雇用条件書を本人が理解できる言語で用意した', '本人が理解して署名します'],
      ['本人が負担する費用（食費・住居費など）を説明する', '適正な額で、内容を本人が理解していること'],
      ['保証金・違約金の定めがない', '本国での契約も確認します'],
      ['帰国費用を給与から積み立てていない', '本人が払えないときは会社が負担します'],
      ['パスポート・在留カードを預からない', ''],
      ['支援の費用を本人に負担させない', ''],
      ['一時帰国の希望に有給休暇で対応する', ''],
      ['教育訓練・福利厚生で差別しない', ''],
    ])),
    pg('4. 申請の書類', '書類は4つのグループです。最新の一覧は出入国在留管理庁の案内をご確認ください。', items([
      ['本人: 申請書・試験の合格証', '技能実習2号を良好に修了した人は試験免除'],
      ['本人: 健康診断の結果', ''],
      ['会社: 会社の概要', ''],
      ['会社: 納税・社会保険の資料', ''],
      ['契約: 雇用契約書・雇用条件書', ''],
      ['計画: 1号の支援計画', '委託する場合は委託契約も'],
      ['分野: 分野ごとの書類', '協議会への加入も確認します'],
      ['協力確認書を市区町村へ提出', '初めての申請の前に。事業所と住居地それぞれの市区町村へ'],
    ])),
    pg('国内の人を採用するとき', '誰が何をするかを、順番に並べました。', lane(6,
      heads(['ご相談', '募集・面接', '雇用契約', '入社の準備', '在留資格<br>変更の申請', '入社'])
      + cells('会社', ['条件を決める', '面接する', '契約を結ぶ', '支援計画・<br>書類の準備', '会社の書類を<br>用意する', '受け入れる'])
      + cells('本人', ['', '応募・面接', '条件を確認', 'ガイダンス・<br>健康診断', '申請する<br>（本人申請が原則）', '住民登録など'])
      + cells('BIGLIGHT', ['制度の説明', '人材のご紹介', '条件の確認', 'ガイダンス', '手続きの<br>サポート', '生活オリエン<br>テーション'], 'b'))),
    pg('海外の人を採用するとき', '国内との違いは、認定証明書と入国の手続きです。', lane(6,
      heads(['ご相談', '募集・面接', '雇用契約', '認定証明書の<br>申請', '査証・入国', '入社'])
      + cells('会社', ['条件を決める', '面接する', '契約を結ぶ', '職員等が<br>代理申請', '証明書を<br>本人へ送る', '受け入れる'])
      + cells('本人', ['', '試験・面接', '条件を確認', 'ガイダンス・<br>健康診断', '査証を申請して<br>入国', '住民登録など'])
      + cells('BIGLIGHT', ['制度の説明', '人材のご紹介', '条件の確認', '手続きの<br>サポート', '空港の送迎', '生活オリエン<br>テーション'], 'b'))
      + '<p class="tg-note">※国によって、本国側の手続きが必要です。</p>'),
    // 2026-11-04 追加: 住まい・入社の週・生活オリエン・職場・最初の1か月・面談・届出・更新・離職・記入シート
    pg('5. 住まいの準備', '入国・入社の前に、住む場所を決めておきます。', items([
      ['住む場所を決めた', '社宅・寮を用意するか、本人が借りる部屋探しを手伝います'],
      ['居室の広さを確認した', '1人あたり 7.5㎡以上（寝室）が目安です'],
      ['家賃などの本人負担を決めた', '実費に相当する、適正な額にします'],
      ['連帯保証人・緊急連絡先を決めた', '本人が借りる場合、会社などが保証人になる支援をします'],
      ['電気・ガス・水道・ネットの手続きを決めた', '入居の日から使えるように'],
      ['家具・寝具・家電を確認した', '最低限の生活用品'],
      ['ごみの出し方・近所のルールを用意した', '自治体の外国語版のごみカレンダーがあれば印刷'],
      ['通勤の方法を決めた', '自転車・バスなど。交通ルールの説明も'],
    ])),
    pg('6. 入社の週にすること', '入社の前後1〜2週間で、生活の手続きを済ませます。', lane(5,
      heads(['空港・到着', '住民登録', '銀行・携帯', '社会保険', '仕事の開始'])
      + cells('期限', ['海外の場合', '住む場所が決まって14日以内', '給与の振込みまでに', '入社の日から', ''])
      + cells('会社', ['送迎の手配', '同行を手配', '同行を手配', '加入の手続き', '安全教育・職場の案内'])
      + cells('BIGLIGHT', ['空港へ送迎', '役所に同行', '開設・契約に同行', 'マイナンバーなどの説明', '生活オリエン<br>テーション'], 'b'))
      + '<p class="tg-note">※住民登録は、住居地を定めた日から14日以内に市区町村へ届け出ます（住民基本台帳法）。</p>'),
    pg('7. 生活オリエンテーションの内容', '1号の人には、日本の生活のルールを 本人がわかる言語で説明します（8時間以上）。', `<div class="sy-chips" style="--c:4;--h:150px;--f:20px">${['お金・銀行・税金', '病院・保険', '交通ルール', 'ごみ・近所のルール', '地震・台風などの災害', '困ったときの相談先', '入管・労働の法律', '届出・手続き'].map((w) => `<span>${w}</span>`).join('')}</div>
      <div class="tg-res tg-res2" style="margin-top:28px">BIGLIGHTに支援を委託している場合は、BIGLIGHTが母国語で行います。</div>`),
    pg('8. 職場の準備', '本人より先に、職場の準備をしておくと 立ち上がりが早くなります。', items([
      ['受入れの理由と予定を、職場に伝えた', '人数・入社日・担当する仕事'],
      ['教える担当者（相談相手）を決めた', '同じ職場の先輩など'],
      ['作業の手順を、写真や見本で用意した', '文字だけの手順書より伝わります'],
      ['安全のルールを、母国語かやさしい日本語で用意した', '危険な場所・保護具・合図'],
      ['「やさしい日本語」で話すことを共有した', '短く、はっきり、1文に1つのこと'],
      ['休み・残業・給与のルールを説明する準備をした', '雇用条件書と同じ内容で'],
      ['ロッカー・作業服・道具を用意した', ''],
      ['宗教・食事などの配慮を確認した', '本人に聞いておきます'],
    ])),
    pg('9. 定期面談', '3か月に1回以上、本人と、本人を監督する人の それぞれと面談します。', `<div class="fx-pt" style="grid-template-columns:repeat(3,1fr)">
      <div><span class="tg-c">1</span><b>本人と</b><p>仕事・生活・人間関係で困っていることはないか。給与や労働時間に問題はないか。</p></div>
      <div><span class="tg-c">2</span><b>上司・監督者と</b><p>仕事の様子、職場での問題、法令に反することが起きていないか。</p></div>
      <div><span class="tg-c">3</span><b>記録と報告</b><p>面談の内容を記録します。法令違反を知ったときは、関係機関に通報します。</p></div></div>
      <p class="tg-note">※本人との面談は、本人が十分に理解できる言語で行います。支援を委託している場合は、BIGLIGHTが行います。</p>`),
    pg('10. 届出の一覧', '変更があったときは14日以内。年に1回は定期届出です。', lane(4,
      heads(['いつ', '何を', '期限', '誰が'])
      + cells('随時', ['雇用契約を<br>変更・終了・新たに結んだ', '支援計画・支援委託<br>を変更・終了した', '受入れが<br>難しくなった', '不正行為を<br>知った'])
      + cells('期限', ['14日以内', '14日以内', '14日以内', '14日以内'])
      + cells('定期', ['受入れ・活動・支援の状況', '年1回（前年度分）', '4月1日〜5月31日', '会社（委託時は連名）'], 'b'))
      + '<p class="tg-note">※届出は、出入国在留管理庁の電子届出システムでも出せます。届出をしない・虚偽の届出は罰則の対象です。</p>'),
    pg('11. 在留期間の更新', '在留カードの期限を、会社でも管理しておきましょう。', `<div class="fx-up">
      <div><b>3か月前</b><span>更新の申請ができるようになります</span></div><div><b>2か月前</b><span>書類をそろえて申請</span></div><div><b>審査</b><span>結果が出るまで、元の期限から最長2か月は在留できます（特例期間）</span></div><div class="on"><b>新しい在留カード</b><span>会社で写しを保管</span></div></div>
      <div class="tg-res tg-res2" style="margin-top:28px">BIGLIGHTのアプリでは、在留期限が近づくと 企業さま・本人にお知らせします。</div>
      <p class="tg-note">※1号の在留期間は、通算5年まで（相当の理由がある場合は6年まで）。</p>`),
    pg('12. 退職・転職のとき', '会社の都合でも、本人の希望でも、手続きは同じように必要です。', items([
      ['雇用契約の終了を届け出た', '14日以内に、出入国在留管理庁へ'],
      ['会社都合の場合: 転職先探しを支援した', '1号の支援10項目の1つです'],
      ['ハローワークへ離職の届出をした', '外国人雇用状況の届出'],
      ['社会保険・住民税の手続きをした', ''],
      ['寮・社宅の退去日を決めた', ''],
      ['帰国する場合: 帰国費用を確認した', '本人が払えないときは会社が負担します'],
      ['最後の給与の支払日を伝えた', ''],
      ['退職証明書を渡した（求めがあれば）', '転職先での手続きに使います'],
    ])),
    pg('入社してからの1年', '毎年くり返す予定を、1枚で確認できます。', `
      <div class="tg-cal">
        <div class="tg-ms"><i></i><span>4月</span><span>5月</span><span>6月</span><span>7月</span><span>8月</span><span>9月</span><span>10月</span><span>11月</span><span>12月</span><span>1月</span><span>2月</span><span>3月</span></div>
        <div class="tg-cr"><b>定期届出</b><div class="tg-gt"><u style="grid-column:1/3">前年度分を提出</u></div></div>
        <div class="tg-cr"><b>定期面談</b><div class="tg-gt"><s style="grid-column:3"></s><s style="grid-column:6"></s><s style="grid-column:9"></s><s style="grid-column:12"></s></div></div>
        <div class="tg-cr"><b>随時届出</b><div class="tg-gt"><em style="grid-column:1/13">変更や終了があったら、14日以内</em></div></div>
        <div class="tg-cr"><b>在留期限</b><div class="tg-gt"><em style="grid-column:1/13">在留カードの期限を確認し、期限の前に更新を申請</em></div></div>
      </div>
      <p class="tg-note">※定期面談の月は一例です。3か月に1回以上、本人と上司それぞれに行います。</p>`),
    pg('受入れ情報シート（記入用）', '1人に1枚。印刷して、受入れの記録に使ってください。', `<div class="fx-form">${['氏名', '国籍', '在留カード番号', '在留期限', '分野・業務区分', '入社日', '住所（寮）', '社内の相談担当', '支援の担当（登録支援機関）', '定期面談の予定月', '次の定期届出', '緊急連絡先'].map((l) => `<div><b>${l}</b><u></u></div>`).join('')}</div>`),

    contact(S, `本資料は${AS_OF}の制度をもとにした一般的なご案内です。期間は目安であり、審査の結果や期間を保証するものではありません。分野ごとの要件や最新の情報は、出入国在留管理庁・分野所管省庁の公表資料をご確認ください。<br>参考：出入国在留管理庁「特定技能外国人受入れに関する運用要領」（令和8年10月）、「外国人労働者に関する制度概要」（令和8年9月29日更新）`),
  ]);
};

/* ===== 分野別ガイド (CEO 2026-11-01): 5 ngành, mỗi ngành 6 trang. Nguồn: 運用要領別冊 分野別 (bản trên trang 入管庁 11/2026) + 制度概要 令和8年9月29日.
   Không ghi số tiền, không ghi hội phí. Thêm ngành = thêm 1 phần tử FIELDS + DOC_KINDS ở CRM + PL_DOC ở sales. */
exports.FIELDS = [
  { slug: 'kensetsu', name: '建設分野', en: 'CONSTRUCTION', sum: '土木・建築・ライフライン設備の3区分',
    work: ['土木', '建築', 'ライフライン・設備'], workOn: ['土木', '建築', 'ライフライン・設備'], two: '3区分すべて2号まで進めます。',
    who: [['技能', '建設分野 特定技能1号評価試験', ''], ['日本語', 'A2.2相当以上', 'JFT-Basic または JLPT N4以上'], ['免除', '技能実習2号を良好に修了', '職種・作業を問わず、試験免除']],
    co: [['建設特定技能受入計画', '国土交通大臣の認定が必要'], ['建設業の許可', '建設業法第3条第1項の許可'], ['建設キャリアアップシステム', '会社と本人の登録'], ['登録法人に所属', 'JAC、または正会員の業者団体を通じて'], ['同等以上の報酬を安定的に', '昇給も契約書に明記'], ['受入れ人数の上限', '1号の総数は 常勤職員の数まで']],
    ng: [['5年以内の建設業法の監督処分', '受入計画の要件を満たしません'], ['退職後の再雇用', '新しい計画の認定が必要です']],
    flow: ['ご相談', '募集・面接', '雇用契約', '登録法人・CCUS', '受入計画の申請', '在留資格の申請', '認定証<br>の提出', '入社'], flowOn: [3, 4, 6],
    note: '※受入計画の認定前でも在留資格の申請はできますが、許可には認定証の写しが必要です。' },
  { slug: 'kogyo', name: '工業製品製造業分野', en: 'MANUFACTURING', sum: '機械金属加工など17の業務区分',
    work: ['機械金属加工', '電気電子機器組立て', '金属表面処理', '紙器・段ボール箱製造', 'コンクリート製品製造', 'RPF製造', '陶磁器製品製造', '印刷・製本', '紡織製品製造', '縫製', '電線・ケーブル製造', 'プレハブ住宅製品製造', '家具製造', '定形・不定形耐火物製造', '生コンクリート製造', 'ゴム製品製造', 'かばん製造'], workOn: ['機械金属加工', '電気電子機器組立て', '金属表面処理'], two: '濃い色の3区分は 2号まで進めます。',
    who: [['技能', '製造分野 特定技能1号評価試験', '業務区分ごと'], ['日本語', 'A2.2相当以上', 'JFT-Basic または JLPT N4以上'], ['免除', '技能実習2号を良好に修了', '業務区分に対応する職種の場合']],
    co: [['対象の事業所', '日本標準産業分類の対象業種を行っていること'], ['登録法人に加入', '経済産業省の登録法人（JAIM）。在留資格の申請の前に'], ['行動規範を守る', '登録法人の行動規範'], ['生産性向上・国内人材確保', '取組を行うこと'], ['訓練・研修', '必要に応じて実施'], ['実務経験の証明', '本人の求めに応じて書面を交付']],
    ng: [['会社全体ではなく事業所で判断', '働く事業所の業種が対象か確認します'], ['付随業務のみの従事', '試験で確認した業務が主です']],
    flow: ['ご相談', '業種の確認', '募集・面接', '雇用契約', '登録法人に加入', '在留資格の申請', '入社'], flowOn: [1, 4], note: '※繊維工業・印刷・こん包業などは、協議会で調った事項への対応も求められます。' },
  { slug: 'inshoku', name: '飲食料品製造業分野', en: 'FOOD MANUFACTURING', sum: '飲食料品製造業・水産加工業の2区分',
    work: ['飲食料品製造業', '水産加工業'], workOn: ['飲食料品製造業', '水産加工業'], two: '2号まで進めます（工程管理の実務経験も要件）。',
    who: [['技能', '分野の特定技能1号評価試験', '飲食料品製造業／水産加工業'], ['日本語', 'A2.2相当以上', 'JFT-Basic または JLPT N4以上'], ['免除', '技能実習2号を良好に修了', '対応する職種の場合']],
    co: [['対象の事業所', '食料品製造業、清涼飲料、茶・コーヒー、製氷など'], ['製造小売も対象', '菓子・パン・豆腐・食肉、製造を行うスーパー'], ['協議会に加入', '食品産業特定技能協議会。在留資格の申請の前に'], ['キャリアアップの計画', '契約の前に書面で説明'], ['農林水産省・協議会に協力', '調査や指導への協力'], ['実務経験の証明', '本人の求めに応じて書面を交付']],
    ng: [['対象外の業種', '酒類、塩、医薬品、香料、飲食料品卸売、ペットフードなど'], ['スーパーでの販売業務', '関連業務としても不可。派遣・付随業務のみの請負も対象外']],
    flow: ['ご相談', '業種の確認', '募集・面接', '雇用契約', '協議会に加入', '在留資格の申請', '入社'], flowOn: [1, 4], note: '※業務区分の変更には、令和9年3月31日までの経過措置があります。' },
  { slug: 'gaishoku', name: '外食業分野', en: 'FOOD SERVICE', sum: '調理・接客・店舗管理を1区分で',
    work: ['飲食物調理', '接客', '店舗管理'], workOn: ['飲食物調理', '接客', '店舗管理'], two: '業務区分は「外食業」の1つ。2号まで進めます（店舗管理などの実務経験も要件）。',
    who: [['技能', '外食業 特定技能1号評価試験', ''], ['日本語', 'A2.2相当以上', 'JFT-Basic または JLPT N4以上'], ['免除', '技能実習2号を良好に修了', '対応する職種の場合']],
    co: [['飲食サービスの事業所', '店内飲食・持ち帰り・配達・ケータリング・給食'], ['ホテルや病院の中も可', '宿泊施設の飲食部門、医療・福祉施設の給食部門'], ['協議会に加入', '在留資格の申請の前に'], ['キャリアアップの計画', '契約の前に書面で説明'], ['農林水産省・協議会に協力', '調査や指導への協力'], ['実務経験の証明', '本人の求めに応じて書面を交付']],
    ng: [['接待', '関連業務を含めて不可'], ['風俗営業の営業所での就労', '旅館・ホテルの一部は例外。接待防止の措置が必要']],
    flow: ['ご相談', '店舗の確認', '募集・面接', '雇用契約', '協議会に加入', '在留資格の申請', '入社'], flowOn: [1, 4], note: '※仕入れた業者が販売する卸売（BtoB）は、飲食サービス業に当たりません。' },
  { slug: 'unso', name: '自動車運送業分野', en: 'TRANSPORTATION', sum: 'トラック・タクシー・バスの3区分',
    work: ['トラック運転者', 'タクシー運転者', 'バス運転者'], workOn: [], two: '自動車運送業は 特定技能1号のみです（2号はありません）。',
    who: [['技能', '分野の評価試験 + 日本の運転免許', 'トラック: 第一種／タクシー・バス: 第二種'], ['日本語', 'トラック A2.2相当以上', 'タクシー・バス: 原則 B1相当以上（JLPT N3以上など）'], ['研修', 'タクシー・バスは 新任運転者研修', '修了が必要です']],
    co: [['自動車運送事業者', '事業を営んでいること'], ['認証を受けている', '運転者職場環境良好度認証。トラックは安全性優良事業所の認定でも可'], ['協議会の構成員', '自動車運送業分野特定技能協議会'], ['新任運転者研修', 'タクシー・バスで実施'], ['日本語の学習プラン', 'タクシー・バスを A2.2相当で受け入れる場合'], ['準備のための在留資格', '特定活動。免許の取得などのため']],
    ng: [['免許がないまま運転業務', '1号の活動には日本の免許が必要です'], ['関連業務だけの従事', '清掃などは付随的に。運転が主です']],
    flow: ['ご相談', '認証の確認', '募集・面接', '雇用契約', '特定活動で入国', '免許・研修', '特定技能1号', '乗務開始'], flowOn: [1, 4, 5], note: '※特定活動の上限は トラック6か月、タクシー・バス1年。この期間は 1号の通算5年に含みません。' },
  // 2026-11-03 物流倉庫（受入れは2027年度の見込み）: 運用方針 R8.1.23 閣議決定・上乗せ基準概要・運用要領別冊 R8.9.18
  { slug: 'soko', name: '物流倉庫分野', en: 'LOGISTICS WAREHOUSE', sum: '倉庫内の入出庫・保管・ピッキング・流通加工',
    work: ['入出庫の受渡し・検品', '貨物の移動', '保管庫への格納', 'ピッキング', '流通加工', '在庫管理'], workOn: [], two: '物流倉庫は 特定技能1号と育成就労です（2号はありません）。受入れは 2027年度の見込みです。',
    who: [['技能', '物流倉庫分野特定技能1号評価試験', '日本海事協会が実施'], ['日本語', 'A2.2相当以上', 'JFT-Basic または JLPT N4以上'], ['免除', '技能実習2号を良好に修了', '日本語は免除。技能は関連性があれば免除']],
    co: [['事業者の類型', '倉庫業者／倉庫作業の受託会社／貨物自動車運送事業者'], ['営業倉庫登録のある倉庫', '運送事業者は自社占有の倉庫'], ['倉庫管理システム', '入庫・在庫・出庫を管理するWMSの利活用'], ['機器・システムの報告', '協議会加入から1年以内'], ['協議会の構成員', '在留諸申請の前に加入（設置は調整中）'], ['直接雇用', '派遣は不可。日本人と同等以上の待遇']],
    ng: [['包装されていない食品に直接触れる業務', '対象外です'], ['運送に伴う荷役として引き受けている作業', '倉庫作業料金を収受する作業が対象です']],
    flow: ['ご相談', '類型・倉庫・WMSの確認', '協議会に加入', '募集・面接', '雇用契約', '在留資格申請', '入社・定着'], flowOn: [1, 2], note: '※評価試験の合格者が出てからの受入れになるため、入社は 2027年度の見込みです。' },
];
/* 2026-11-04 (CEO: tài liệu mỏng → dày): 6 → ~16 trang. Thêm: điểm chính, số liệu 入管庁 (data.cjs GOV), 国籍, 求人倍率・賃金, 業務の例, 試験,
   協議会・登録法人の手続き, 必要書類, 事例 (tên thật, CRM), FAQ, 出典. Không ghi số tiền BIGLIGHT; phí thi/hội phí chỉ ghi tên khoản. */
const FX = {
  kensetsu: {
    pts: [['受入計画の認定', '受入れ前に、国土交通大臣の「建設特定技能受入計画」の認定が必要です。'], ['JAC と CCUS', '建設技能人材機構（JAC）への加入と、建設キャリアアップシステムの登録が必要です。'], ['人数枠と月給制', '1号の人数は常勤職員の数まで。報酬は月給制で、昇給も契約に明記します。']],
    tasks: [['土木', '型枠施工、鉄筋施工、とび、コンクリート圧送、建設機械施工、トンネル推進 など'], ['建築', '型枠施工、鉄筋施工、とび、左官、建築大工、内装仕上げ、屋根ふき、タイル張り など'], ['ライフライン・設備', '電気通信、配管、建築板金、保温保冷、電気工事 など'], ['関連する業務', '同じ現場で日本人も行う、資材の運搬・片付け・清掃など（主な業務と合わせて）']],
    steps: [['JACに加入', '正会員の建設業者団体に入るか、JACの賛助会員になります。'], ['CCUSに登録', '会社（事業者）と本人（技能者）を、建設キャリアアップシステムに登録します。'], ['受入計画を申請', '外国人就労管理システムからオンラインで申請し、国土交通大臣の認定を受けます。'], ['入国後の講習・巡回', '受入れ後の講習や、適正就労監理機関による巡回訪問に対応します。']],
    docs: ['建設特定技能受入計画の認定証（写し）', '建設業の許可証（写し）', 'JACの会員であることの証明', '建設キャリアアップシステムの登録の確認書類', '分野の誓約書（分野所定の様式）'],
    faq: [['何人まで受け入れられますか？', '1号の総数は、常勤職員（技能実習生と1号は除く）の数までです。'], ['技能実習を修了した人は？', '技能実習2号を良好に修了した人は、技能試験と日本語試験が免除されます。'], ['給与はどう決めますか？', '同じ技能の日本人と同等以上で、月給制です。技能に応じた昇給も契約に書きます。'], ['転職してきた人を採用するときは？', '同じ業務区分なら可能です。受入れる会社として、新しく受入計画の認定を受けます。'], ['日給制・時給制でもいいですか？', 'いいえ。季節や天候で収入が変わらないよう、月給制が求められます。'], ['2号になるには？', '班長などとしての実務経験と、2号の試験（または技能検定1級）への合格が必要です。']],
  },
  kogyo: {
    pts: [['事業所で判断', '会社全体ではなく、働く事業所が対象の業種かどうかで判断します。'], ['登録法人（JAIM）', '在留資格を申請する前に、工業製品製造技能人材機構（JAIM）に加入します。'], ['17の業務区分', '機械金属加工・電気電子機器組立て・金属表面処理の3区分は、2号まで進めます。']],
    tasks: [['機械金属加工', '溶接、鋳造、鍛造、機械加工、仕上げ、プレス、金属塗装、機械検査、機械保全 など'], ['電気電子機器組立て', '電子機器組立て、電気機器組立て、プリント配線板製造 など'], ['金属表面処理', 'めっき、アルミニウム陽極酸化処理 など'], ['その他の14区分', '紙器・段ボール、コンクリート製品、印刷・製本、縫製、ゴム製品、家具など、区分ごとの作業']],
    steps: [['事業所の業種を確認', '日本標準産業分類で、対象の業種に当たる事業所かを確認します。'], ['製造の実績を確認', '直近1年間に、対象業種の製造品出荷額などがあることを確認します。'], ['JAIMに加入', '在留資格の申請の前に、登録法人の会員になります。'], ['行動規範を守る', '登録法人の行動規範に沿って受け入れ、国内人材の確保などにも取り組みます。']],
    docs: ['JAIM（登録法人）の会員であることの証明', '事業所が対象業種であることがわかる資料', '製造品出荷額などがわかる資料', '分野の誓約書（分野所定の様式）'],
    faq: [['溶接の仕事で受け入れられますか？', 'はい。機械金属加工の業務区分に入ります。2号まで進めます。'], ['本社と工場で業種が違います', '本人が働く事業所の業種で判断します。'], ['技能実習を修了した人は？', '業務区分に対応する職種・作業で2号を良好に修了していれば、試験が免除されます。'], ['検品や運搬もしてもらえますか？', '同じ職場の日本人も行う関連業務なら可能です。主な業務は試験で確かめた作業です。'], ['派遣で受け入れられますか？', 'いいえ。直接雇用のみです。'], ['2号になるには？', '3つの業務区分で、実務経験3年・ビジネス・キャリア検定3級・日本語N3 などと、2号の試験への合格が必要です。']],
  },
  inshoku: {
    pts: [['製造小売も対象', '工場だけでなく、パン・菓子・惣菜など、製造して販売する店も対象です。'], ['食品産業特定技能協議会', '在留資格を申請する前に、協議会に加入します。'], ['2号まで進める', '工程の管理などの実務経験と試験で、2号に進めます。']],
    tasks: [['飲食料品製造業', '原料の処理、加熱、殺菌、成形、乾燥などの製造・加工の工程、安全衛生'], ['水産加工業', '魚介類の処理、塩蔵、乾燥、くん製、冷凍など。水産加工食品の製造'], ['関連する業務', '原料の受入れ、製品の運搬・梱包、清掃など（主な業務と合わせて）'], ['対象外', '酒類、塩、医薬品、香料の製造。飲食料品の卸売、スーパーでの販売']],
    steps: [['事業所の業種を確認', '日本標準産業分類で、飲食料品の製造業に当たるかを確認します。'], ['協議会に加入', '農林水産省の食品産業特定技能協議会に、在留資格の申請の前に入ります。'], ['キャリアアップの計画', '雇用契約の前に、本人へ書面で説明します。'], ['調査・指導への協力', '農林水産省や協議会の調査・指導に協力します。']],
    docs: ['食品産業特定技能協議会の構成員であることの証明', '事業所が対象業種であることがわかる資料', 'キャリアアップの計画を説明した書面', '分野の誓約書（分野所定の様式）'],
    faq: [['スーパーの惣菜部門は対象ですか？', '製造を行う部門は対象です。売り場での販売の仕事は対象外です。'], ['水産加工もできますか？', 'はい。業務区分「水産加工業」で受け入れます。'], ['技能実習を修了した人は？', '対応する職種・作業で2号を良好に修了していれば、試験が免除されます。'], ['夜勤やシフト勤務はできますか？', '日本人と同じ条件であれば可能です。'], ['派遣で受け入れられますか？', 'いいえ。直接雇用のみです。請負で付随業務だけをすることも対象外です。'], ['2号になるには？', '複数の作業員を指導しながら工程を管理する実務経験2年と、2号の試験・日本語N3への合格が必要です。']],
  },
  gaishoku: {
    pts: [['海外からの受入れは停止中', '受入れの上限に近づいたため、令和8年4月13日から新規の認定証明書は交付されていません。'], ['いま採用できる人', '外食業の特定技能1号で働いている人の転職は、これまでどおり審査されます。'], ['更新は通常どおり', 'すでに雇用している人の在留期間の更新は、通常どおり審査されます。']],
    tasks: [['飲食物調理', '食材の仕込み、加熱・非加熱の調理、調味など'], ['接客', '注文を受ける、配膳、会計など'], ['店舗管理', '店舗の運営、従業員のシフト管理、衛生管理など'], ['関連する業務', '原材料の買出し、清掃、宅配など（主な業務と合わせて）']],
    steps: [['店舗の業態を確認', '飲食サービス業（店内飲食・持ち帰り・配達・給食など）に当たるかを確認します。'], ['協議会に加入', '食品産業特定技能協議会に、在留資格の申請の前に入ります。'], ['キャリアアップの計画', '雇用契約の前に、本人へ書面で説明します。'], ['接待をさせない', '風俗営業の店舗での就労は、原則としてできません。']],
    docs: ['食品産業特定技能協議会の構成員であることの証明', '店舗が飲食サービス業であることがわかる資料', 'キャリアアップの計画を説明した書面', '分野の誓約書（分野所定の様式）'],
    faq: [['いま、海外から採用できますか？', '令和8年4月13日以降の在留資格認定証明書の申請は不交付です。1号の試験も止まっています。'], ['留学生を外食業で採用できますか？', '外食業1号への変更は、原則として不許可となっています（一部に例外があります）。'], ['他の店から転職する人は？', '外食業の特定技能1号で働いている人の転職は、通常どおり審査されます。'], ['いま働いている人の更新は？', '通常どおり審査されます。'], ['ホテルのレストランは対象ですか？', 'はい。宿泊施設の飲食部門や、病院の給食部門も対象です。'], ['これから先は？', '令和9年4月から育成就労が始まります。外食業の受入れ見込数は5,300人です。']],
  },
  unso: {
    pts: [['日本の運転免許', '1号として働くには、日本の運転免許が必要です。準備の期間は「特定活動」で在留します。'], ['会社の認証', '運転者職場環境良好度認証（トラックは安全性優良事業所の認定でも可）が必要です。'], ['1号のみ', '自動車運送業に2号はありません。通算5年までです。']],
    tasks: [['トラック運転者', '貨物の運送、荷積み・荷下ろし、点検など'], ['タクシー運転者', '旅客の運送、運賃の収受、車両の点検など'], ['バス運転者', '旅客の運送、乗客の案内、車両の点検など'], ['関連する業務', '洗車・清掃、配車の補助など（運転が主）']],
    steps: [['認証を確認', '運転者職場環境良好度認証などを受けているか確認します。'], ['協議会に加入', '自動車運送業分野特定技能協議会の構成員になります。'], ['特定活動で準備', '入国後、免許の取得や研修のため「特定活動」で在留します。'], ['研修・乗務', 'タクシー・バスは新任運転者研修を修了して乗務します。']],
    docs: ['協議会の構成員であることの証明', '運転者職場環境良好度認証など（写し）', '一般貨物自動車運送事業などの許可の写し', '日本の運転免許証（写し）', '分野の誓約書（分野所定の様式）'],
    faq: [['外国の免許で運転できますか？', '1号の活動には日本の免許が必要です。外免切替などで取得します。'], ['タクシー・バスの日本語は？', '原則 B1相当以上（JLPT N3以上など）です。'], ['特定活動の期間は？', 'トラックは最長6か月、タクシー・バスは最長1年です。1号の通算5年には含みません。'], ['技能実習から移れますか？', '自動車運送業に対応する技能実習の職種はありません。試験に合格して受け入れます。'], ['倉庫の仕事もしてもらえますか？', '倉庫作業は別の分野（物流倉庫）です。関連業務の範囲を超える場合は対象外です。'], ['2号はありますか？', 'ありません。'], ],
  },
  soko: {
    pts: [['受入れは2027年度の見込み', '評価試験の合格者が出てからの受入れになります。いまは会社側の準備の時期です。'], ['3つの類型', '倉庫業者・倉庫作業の受託会社・貨物自動車運送事業者のいずれかです。'], ['WMS の利活用', '入庫・在庫・出庫を管理するシステムを使っていることが求められます。']],
    tasks: [['入出庫', '荷の受渡し、検品、仕分け'], ['保管', '貨物の移動、保管庫への格納、在庫管理（WMS）'], ['ピッキング・流通加工', 'ピッキング、梱包、値札付け、セット組み など'], ['関連する業務', '倉庫内の清掃、資材の整理など（主な業務と合わせて）']],
    steps: [['類型と倉庫を確認', '営業倉庫の登録がある倉庫か、運送事業者の自社占有の倉庫かを確認します。'], ['WMS を確認', '倉庫管理システムの利活用を確認します。'], ['協議会に加入', '協議会の設置後、在留諸申請の前に加入します（設置は調整中）。'], ['機器・システムの報告', '協議会への加入から1年以内に報告します。']],
    docs: ['協議会の構成員であることの証明（設置後）', '営業倉庫の登録などがわかる資料', 'WMSの利活用がわかる資料', '分野の誓約書（分野所定の様式）'],
    faq: [['いつから受け入れられますか？', '評価試験の合格者が出てからで、2027年度の見込みです。'], ['派遣で受け入れられますか？', 'いいえ。直接雇用のみです。'], ['運送会社でも受け入れられますか？', 'はい。自社で占有する倉庫での、有償の倉庫作業が対象です。'], ['技能実習から移れますか？', '関連のある職種なら、技能試験が免除される場合があります。日本語は免除されます。'], ['2号はありますか？', 'ありません。育成就労の対象分野でもあります。'], ['いま何を準備すればいい？', '類型・倉庫・WMSの確認と、協議会の設置を待っての加入準備です。']],
  },
};
exports.FX = FX;
const D = require('./data.cjs');
const G = D.GOV;
const yy = (l) => l.replace(/^R/, '令和').replace('.6末', '年6月末');

exports.field = (o, f) => {
  r = '../../../';
  const S = sheetsOf(), T = f.name + 'ガイド', X = FX[f.slug] || {}, N = G.field[f.slug] || {}, C = D.CASES[f.slug];
  const EX = (G.exam || {})[f.slug], LB = (G.labor || {})[f.slug];
  const pg = (q, a, body) => S.sheet('', `<h2 class="tg-q tg-q0">${q}</h2><p class="tg-a">${a}</p><div class="tg-body">${body}</div>${S.foot(T)}`);
  const tile = (x, c) => `<div class="sy-tile ${c || ''}"><b>${x[0]}</b><span>${x[1]}</span></div>`;
  const pages = [];
  pages.push(cover(S, `${f.name}<br>ガイド`, f.sum, f.en + ' FIELD GUIDE'));
  if (X.pts) pages.push(pg(`${f.name}の受入れ、3つのポイント`, 'はじめに押さえておきたいことです。', `<div class="fx-pt">${X.pts.map(([h, t], i) => `<div><span class="tg-c">${i + 1}</span><b>${h}</b><p>${t}</p></div>`).join('')}</div>
    <div class="fx-toc"><span>このガイドの内容</span><em>数字で見る</em><em>仕事と人</em><em>試験</em><em>会社の基準と手続き</em><em>流れと書類</em>${C ? '<em>事例</em>' : ''}<em>よくある質問</em></div>`));
  if (N.t1 > 0) {
    const ful = N.cap ? (N.jul / N.cap * 100) : null;
    pages.push(pg(`数字で見る ${f.name}`, `特定技能で働く人は、${f.name}で <b>${D.fmt(N.t1 + (N.t2 || 0))}人</b>（${G.ssw.asOf}）。`, `
      ${D.kpis([[D.fmt(N.t1), '人', '特定技能1号'], [N.t2 != null ? D.fmt(N.t2) : '—', N.t2 != null ? '人' : '', N.t2 != null ? '特定技能2号' : '2号はありません'], [D.fmt(N.cap), '人', `1号の受入れ見込数（${G.ssw.cap.period}）`], [ful ? ful.toFixed(1) : '—', '%', `見込数に対する在留者（${G.ssw.jul.asOf}）`]])}
      <div class="dx-2" style="margin-top:30px"><div><div class="dx-h">1号の在留者数の推移</div>${D.vbars(N.hist.filter((h) => h[1] != null).map((h, i, a) => [yy(h[0]), h[1], i === a.length - 1 ? 'on' : '']), { h: 250, unit: '人' })}</div>
      <div><div class="dx-h">東海3県で働く1号・2号</div>${D.hbars(Object.entries(N.tokai).map(([k, v]) => [k, (v[0] || 0) + (v[1] || 0)]), { unit: '人', lw: '90px', vw: '100px' })}<p class="tg-note">住居地による集計です。</p></div></div>
      ${D.src(`${G.ssw.src}、${G.ssw.cap.src}、同 令和8年7月末の在留者数`)}`));
    if (N.nat) pages.push(pg('どの国の人が働いている？', `${f.name}の1号は、<b>${N.nat[0][0]}</b>出身の人が最も多くなっています。`, `
      <div class="dx-2"><div>${D.donut(N.nat, [D.fmt(N.t1), '人（1号）'], { pct: false, unit: '人' })}</div>
      <div><div class="dx-h">BIGLIGHTが支援している人の国籍（全分野）</div>${D.hbars(D.BL.nat.map(([l, v], i) => [l, v, i ? 'mu' : '']), { unit: '名', lw: '120px', vw: '80px' })}<p class="tg-note">BIGLIGHTの支援記録より（${D.BL.asOf}）。在籍 ${D.BL.active}名。</p></div></div>
      ${D.src(`${G.ssw.src}（上位5か国。「その他」は表示していません）`)}`));
  }
  if (!(N.t1 > 0) && N.cap) pages.push(pg('どのくらい受け入れる見込み？', `${f.name}は 令和8年1月に追加された新しい分野です。国が受入れの見込数を決めています。`, `
    ${D.kpis([[D.fmt(N.cap), '人', `特定技能1号の受入れ見込数（${G.ssw.cap.period}）`], [N.ikusei ? D.fmt(N.ikusei) : '—', N.ikusei ? '人' : '', '育成就労の受入れ見込数（令和9年4月から）'], ['0', '人', `いま在留している1号（${G.ssw.asOf}）`]], 3)}
    <div class="dx-2" style="margin-top:34px"><div><div class="dx-h">BIGLIGHTが支援している人の国籍（全分野）</div>${D.hbars(D.BL.nat.map(([l, v], i) => [l, v, i ? 'mu' : '']), { unit: '名', lw: '120px', vw: '80px' })}<p class="tg-note">BIGLIGHTの支援記録より（${D.BL.asOf}）。</p></div>
    <div><div class="dx-h">特定技能1号の国籍（全分野・上位5）</div>${D.hbars(G.ssw.nat.slice(0, 5).map(([l, v], i) => [l, v, i ? '' : 'on']), { unit: '人', lw: '120px', vw: '110px' })}</div></div>
    ${D.src(`${G.ssw.cap.src}、${G.ssw.src}`)}`));
  if (f.slug === 'gaishoku') pages.push(pg('いま、外食業で起きていること', '1号の在留者が受入れ見込数（上限）の5万人に近づき、新しい受入れが止まっています。', `
    <div class="fx-st">
      <div class="x"><b>海外から呼ぶ</b><span>在留資格認定証明書</span><em>令和8年4月13日以降の申請は 不交付</em></div>
      <div class="x"><b>国内の人が1号へ変わる</b><span>留学生など</span><em>原則 不許可（一部に例外）</em></div>
      <div class="x"><b>1号の技能試験</b><span>国内・海外</span><em>令和8年3月27日から 実施停止</em></div>
      <div class="o"><b>外食業1号の人の転職</b><span>他の店から</span><em>通常どおり審査</em></div>
      <div class="o"><b>在留期間の更新</b><span>いま働いている人</span><em>通常どおり審査</em></div>
    </div>
    <p class="tg-note">※例外：技能実習（医療・福祉施設給食製造作業）の修了者、すでに外食業の特定活動（1号移行準備）の許可を受けている人など。状況によっては特定活動への変更を案内される場合があります。最新の状況は出入国在留管理庁の発表をご確認ください。</p>
    ${D.src(G.gaishokuStop.src)}`));
  if (LB) pages.push(pg('人手不足と、給与の目安', LB.lead, `
    <div class="dx-2"><div><div class="dx-h">有効求人倍率（${LB.ratioAsOf}）</div>${D.hbars(LB.ratio.map(([l, v, c]) => [l, v, c]), { unit: '倍', dec: 2, lw: '250px', vw: '80px', fs: '15.5px' })}<p class="tg-note">1人の求職者に、何件の求人があるかを示します。</p></div>
    <div><div class="dx-h">平均の給与（${LB.wageAsOf}）</div>${D.table(['職種・在留資格', '所定内給与（月）'], LB.wage.map(([l, v]) => [l, v]), [1])}<p class="tg-note">特定技能の報酬は、同じ仕事をする日本人と同等以上にします。<br>${LB.mw}</p></div></div>
    ${D.src(LB.src)}`));
  pages.push(pg('どんな仕事で受け入れられる？', f.two, `<div class="sy-chips" style="${f.work.length > 6 ? '--c:4;--h:92px;--f:17px' : `--c:${f.work.length};--h:380px;--f:28px`}">${f.work.map(w => `<span class="${f.workOn.includes(w) ? 'on' : ''}">${w}</span>`).join('')}</div>`));
  if (X.tasks) pages.push(pg('仕事の内容を、もう少し詳しく', '主な業務に加えて、同じ職場の日本人も行う関連業務をしてもらえます。', D.table(['区分', '主な作業の例'], X.tasks)));
  pages.push(pg('どんな人を採用できる？', '分野共通の条件に加えて、次の3つを確認します。', `<div class="sy-tiles" style="grid-template-columns:repeat(3,1fr)">${f.who.map(w => `<div class="sy-tile" style="min-height:430px;text-align:center;align-items:center"><span style="margin:0 0 12px;font-weight:700;color:var(--gold-d);font-size:17px">${w[0]}</span><b>${w[1]}</b><span>${w[2]}</span></div>`).join('')}</div>`));
  if (EX) pages.push(pg('技能の試験は、どんな試験？', EX.lead, `<div class="fx-ex">${D.table(['', ''], EX.rows)}${EX.pass ? `<div class="dx-h" style="margin-top:26px">合格の状況</div>${D.table(EX.pass.head, EX.pass.rows, EX.pass.num || [])}` : ''}</div>${D.src(EX.src)}`));
  pages.push(pg('会社に必要なことは？', 'この分野ならではの基準です。', `<div class="sy-tiles" style="grid-template-columns:repeat(3,1fr)">${f.co.map(x => tile(x)).join('')}</div><div class="sy-tiles" style="grid-template-columns:repeat(2,1fr);margin-top:14px">${f.ng.map(x => tile(x, 'n')).join('')}</div>`));
  if (X.steps) pages.push(pg('分野の手続き、何をする？', '在留資格の申請とは別に、分野ごとの手続きがあります。', `<div class="fx-sp">${X.steps.map(([h, t], i) => `<div><span class="tg-c">${i + 1}</span><b>${h}</b><p>${t}</p></div>`).join('')}</div><p class="tg-note">※加入・認定の費用（会費など）は、団体・制度ごとに定められています。</p>`));
  pages.push(pg('受入れまでの流れは？', '色の濃いところが、この分野で特に大事な手続きです。', `<div class="sy-flow" style="grid-template-columns:repeat(${f.flow.length},1fr)">${f.flow.map((x, i) => `<div class="${f.flowOn.includes(i) ? 'on' : ''}">${x}</div>`).join('')}</div><p class="tg-note" style="font-size:15px;margin-top:22px!important">${f.note}</p>
    <div class="fx-tm"><div><b>日本国内にいる人</b><span>1〜3か月</span></div><div><b>海外にいる人</b><span>3〜6か月</span></div></div><p class="tg-note">※入社までのBIGLIGHTの目安です。分野の手続きや審査の状況で前後します。</p>`));
  if (X.docs) pages.push(pg('分野ならではの書類', '共通の書類に加えて、次の書類を用意します。', `${items(X.docs.map((d) => [d, '']))}<p class="tg-note">※共通の書類（申請書・雇用契約・支援計画・会社の資料など）は「受入れ準備ガイド」をご覧ください。最新の様式は出入国在留管理庁のホームページで確認できます。</p>`));
  if (C) pages.push(pg('BIGLIGHTの事例', `${C.area}の${C.name}さま。${C.field}での受入れです。`, D.caseBody(C)));
  if (X.faq) pages.push(pg('よくある質問', `${f.name}で、ご相談の多い質問です。`, `<div class="tg-faq fx-faq">${X.faq.map(([q, a]) => `<div><div class="tg-fq"><b>Q</b>${q}</div><div class="tg-fa"><b>A</b>${a}</div></div>`).join('')}</div>`));
  pages.push(contact(S, `本資料は${AS_OF}の制度をもとにした一般的なご案内です。要件の詳細は、出入国在留管理庁・分野所管省庁の公表資料をご確認ください。<br>参考：出入国在留管理庁「特定の分野に係る特定技能外国人受入れに関する運用要領」、「外国人労働者に関する制度概要」（令和8年9月29日更新）、「特定技能在留外国人数」（${G.ssw.asOf}）`));
  const out = wrap(o, 'Field Guide', T, T, `${f.name}で特定技能の外国人を受け入れるときのガイド。`, o.PDF_URL, pages);
  r = '../../';
  return out;
};
exports.fieldPages = (f) => (exports.field({ page: (x) => x.body, pageHead: () => '', pill: () => '', PDF_URL: '' }, f).match(/class="tg-sh"/g) || []).length;

/* ===== 物流人材ガイド（自動車運送業・物流倉庫）2026-11-03: 資料請求用、A4横 15ページ。数値・状況・出典は facts.json（Web の /logistics/ と同じ）。
   金額は書かない。行政書士の確認前。 */
exports.logistics = (o) => {
  r = '../../';
  const F = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'facts.json'), 'utf8'));
  const fact = (f, k) => F.facts.find((x) => x.field === f && x.key === k) || { value: '—', status: '' };
  const comp = (f) => F.facts.filter((x) => x.field === f && x.group === 'company');
  const st = (s) => s ? `<i class="lg-b ${s === '確定' ? 'ok' : s === '調整中' ? 'mid' : 'plan'}">${s}</i>` : '';
  const ymd = (d) => d.replace(/-/g, '/');
  const T = '物流人材ガイド', S = sheetsOf();
  const pg = (q, a, body) => S.sheet('', `<h2 class="tg-q tg-q0">${q}</h2><p class="tg-a">${a}</p><div class="tg-body">${body}</div>${S.foot(T)}`);
  const sec = (n, en, ja, sub) => S.sheet('', `<div class="lg-sec"><span>${n}</span><b>${ja}</b><em>${en}</em><p>${sub}</p></div>${dots}${S.foot(T)}`);
  const tile = (x, c) => `<div class="sy-tile ${c || ''}"><b>${x[0]}</b><span>${x[1]}</span></div>`;
  const ck = (list) => `<div class="lg-ck">${list.map((x) => `<div><i></i><span><b>${x.item}${st(x.status)}</b><small>${x.value}</small></span></div>`).join('')}</div>`;
  const tl = (f) => { const t = F.timeline[f]; return `<div class="lg-tl" style="grid-template-columns:repeat(${t.length},1fr)">${t.map((x) => `<div class="${x.status === '確定' ? 'on' : ''}"><b>${x.label}</b><span>${x.date}</span>${st(x.status)}</div>`).join('')}</div>`; };
  const ROWS = [['mikomi', '受入れ見込数'], ['start', '受入れ'], ['work', '対象業務'], ['skill', '技能試験'], ['jp', '日本語'], ['license', '免許・資格'], ['kyogikai', '協議会'], ['ikusei', '育成就労・2号']];
  const CSS2 = `<style>
.lg-b{display:inline-block;font-style:normal;font-size:12px;font-weight:700;border-radius:64px;padding:1px 10px;margin-left:8px;vertical-align:2px;white-space:nowrap}
.lg-b.ok{background:var(--tn);color:var(--navy)}.lg-b.mid{background:#fff3dc;color:#8a5a00}.lg-b.plan{background:#eee;color:#555}
.lg-sec{margin-top:150px}.lg-sec span{font:700 120px/1 Roboto,sans-serif;color:var(--tn)}.lg-sec b{display:block;font-size:56px;letter-spacing:.06em;margin-top:-30px}.lg-sec em{display:block;font:700 16px Roboto,sans-serif;letter-spacing:.2em;color:var(--gold-d);margin-top:12px}.lg-sec p{font-size:20px;color:var(--ink2);margin-top:28px!important;max-width:820px}
.lg-sum li{font-size:22px;font-weight:700;line-height:1.7;padding:20px 0 20px 56px;border-bottom:1px solid var(--ln);position:relative}.lg-sum li::before{content:attr(data-n);position:absolute;left:0;top:20px;width:38px;height:38px;border-radius:50%;background:var(--navy);color:#fff;font:700 16px/38px Roboto,sans-serif;text-align:center}
.lg-cmp{display:grid;grid-template-columns:150px 1fr 1fr;font-size:14.5px;line-height:1.5}.lg-cmp>div{padding:9px 14px;border-bottom:1px solid var(--ln);display:flex;align-items:center}
.lg-cmp .h{background:var(--navy);color:#fff;font-weight:700;font-size:18px;justify-content:center;border-radius:8px 8px 0 0;border:0;margin:0 4px}.lg-cmp .l{font-weight:700;color:var(--ink2)}.lg-cmp>div:nth-child(6n+4),.lg-cmp>div:nth-child(6n+5),.lg-cmp>div:nth-child(6n+6){background:#fafbfc}
.lg-tl{display:grid;gap:8px;margin-top:6px}.lg-tl>div{background:#f5f6f8;border-radius:10px;padding:16px 14px;min-height:190px;display:flex;flex-direction:column;gap:8px}.lg-tl>div.on{background:var(--tn)}.lg-tl b{font-size:15.5px;line-height:1.45;color:var(--navy)}.lg-tl span{font-size:14px;line-height:1.5;color:var(--ink2);flex:1}.lg-tl .lg-b{margin:0;align-self:flex-start}
.lg-tlh{font-weight:700;font-size:18px;margin:18px 0 8px}.lg-tlh:first-child{margin-top:0}
.lg-ck{display:grid;grid-template-columns:1fr 1fr;gap:0 40px}.lg-ck>div{display:grid;grid-template-columns:30px 1fr;gap:14px;padding:13px 0;border-bottom:1px solid var(--ln)}.lg-ck>div>i{width:26px;height:26px;border:2px solid var(--navy);border-radius:5px;margin-top:3px}.lg-ck b{display:block;font-size:17.5px;line-height:1.5}.lg-ck small{display:block;font-size:14px;color:var(--ink2);line-height:1.6;margin-top:3px}
.lg-abc{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.lg-abc>div{border-radius:12px;background:var(--tn);padding:24px 22px;min-height:330px}.lg-abc em{font:700 64px/1 Roboto,sans-serif;color:var(--navy)}.lg-abc b{display:block;font-size:21px;margin-top:14px;line-height:1.45}.lg-abc p{font-size:15px;color:var(--ink2);margin-top:12px!important;line-height:1.7}.lg-abc u{display:block;text-decoration:none;font-size:14px;font-weight:700;color:var(--navy);border-top:1px solid #c9d8ee;margin-top:14px;padding-top:12px}
.lg-faq{display:grid;grid-template-columns:1fr 1fr;gap:14px 28px}.lg-faq>div{border-top:2px solid var(--navy);padding-top:12px}.lg-faq b{display:block;font-size:17px;line-height:1.5}.lg-faq b::before{content:"Q ";color:var(--gold-d);font-family:Roboto,sans-serif}.lg-faq p{font-size:14px;line-height:1.7;color:var(--ink2);margin-top:6px!important}
.lg-src li{display:grid;grid-template-columns:1fr 150px;gap:16px;font-size:14.5px;padding:10px 0;border-bottom:1px solid var(--ln);line-height:1.5}.lg-src li span{color:var(--grey);font-size:13px;text-align:right}.lg-src li small{display:block;color:var(--grey);font-size:12px;word-break:break-all}
.lg-sup{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:18px}.lg-sup span{background:#f5f6f8;border-radius:8px;font-size:14.5px;font-weight:700;text-align:center;padding:14px 6px;line-height:1.4}.lg-sup span b{display:block;font:700 13px Roboto,sans-serif;color:var(--gold-d)}
</style>`;
  const usedSrc = []; for (const x of F.facts.concat(F.timeline.unso, F.timeline.soko)) if (x.source && !usedSrc.includes(x.source)) usedSrc.push(x.source);
  const SUP = ['事前ガイダンス', '出入国時の送迎', '住居の確保', '生活オリエンテーション', '公的手続の同行', '日本語学習の機会', '相談・苦情対応', '日本人との交流', '転職支援', '定期面談'];
  const out = wrap(o, 'Logistics Guide', T + '（自動車運送業・物流倉庫）', T + '（自動車運送業・物流倉庫）', 'ドライバーと倉庫スタッフを特定技能で採用するためのガイド。', o.PDF_URL, [
    CSS2 + cover(S, '物流人材ガイド', 'ドライバーと倉庫スタッフを、特定技能で。<br>自動車運送業・物流倉庫の 2分野', 'LOGISTICS GUIDE'),
    pg('このガイドでわかること', '物流の現場を支える 2つの分野を、1冊にまとめました。', `<ul class="lg-sum">
      <li data-n="1">トラックなどの「ドライバー」は 自動車運送業分野、「倉庫スタッフ」は 物流倉庫分野で採用できます。</li>
      <li data-n="2">自動車運送業は 受入れ中。物流倉庫は 2026年1月に対象となり、2027年度の受入れに向けて 国が準備しています。</li>
      <li data-n="3">どちらも 直接雇用・日本語 N4相当以上・分野別協議会への加入が条件。運送会社は 倉庫スタッフも受け入れられます。</li></ul>
      <div class="tg-nums tg-nums3" style="margin-top:44px"><div><div class="tg-num">2.21<small>万人</small></div><i></i><p>自動車運送業の受入れ見込数<br>（2024〜2028年度）</p></div><div><div class="tg-num">1.14<small>万人</small></div><i></i><p>物流倉庫の受入れ見込数<br>（特定技能1号・2026〜2028年度）</p></div><div><div class="tg-num">2027<small>年度</small></div><i></i><p>物流倉庫の受入れ開始の見込み</p></div></div>`),
    pg('2つの分野をくらべる', `数値と状況は 国の公表資料から。状況は ${st('確定')} 公表済み、${st('調整中')} 国が準備中、${st('予定')} 見込みです。`, `<div class="lg-cmp"><div></div><div class="h">自動車運送業（ドライバー）</div><div class="h">物流倉庫（倉庫スタッフ）</div>${ROWS.map(([k, l]) => { const a = fact('unso', k), b = fact('soko', k); return `<div class="l">${l}</div><div>${a.value}${st(a.status)}</div><div>${b.value}${st(b.status)}</div>`; }).join('')}</div>`),
    pg('制度の現在地', `閣議決定から受入れまでの節目です（${ymd(F.updated)} 時点）。`, `<p class="lg-tlh">自動車運送業</p>${tl('unso')}<p class="lg-tlh">物流倉庫</p>${tl('soko')}`),
    sec('01', 'TRANSPORTATION', '自動車運送業<br>（ドライバー）', 'トラック・タクシー・バスの 3区分。日本の運転免許を 入国後に取得して 乗務します。BIGLIGHTは トラックドライバーを中心にご支援します。'),
    pg('どんな人を採用できる？', '試験と日本語に加えて、日本の運転免許が必要です。', `<div class="sy-tiles" style="grid-template-columns:repeat(3,1fr)">${[['技能', '自動車運送業分野 評価試験', 'トラック／タクシー／バス'], ['日本語', 'トラック: N4相当以上', 'タクシー・バス: 原則 N3以上'], ['免許', '日本の運転免許', 'トラック 第一種／タクシー・バス 第二種']].map((w) => `<div class="sy-tile" style="min-height:300px;text-align:center;align-items:center"><span style="margin:0 0 12px;font-weight:700;color:var(--gold-d);font-size:17px">${w[0]}</span><b>${w[1]}</b><span>${w[2]}</span></div>`).join('')}</div>
      <div class="sy-tiles" style="grid-template-columns:repeat(2,1fr);margin-top:14px">${tile(['国際運転免許だけでは 乗務できません', '入国後に 外免切替で 日本の免許を取ります'], 'n')}${tile(['国内在住で 日本の免許がある方', '特定活動を経ずに 1号へ変更できる場合があります'], 'k')}</div>`),
    pg('会社に必要なこと', '当てはまる項目に チェックしてください。', ck(comp('unso')) + `<div class="sy-tiles" style="grid-template-columns:repeat(2,1fr);margin-top:22px">${tile(['特定技能2号・育成就労は ありません', '在留は 1号の通算 最長5年です'], 'n')}${tile(['協議会の加入確認に 約1か月', '支援を委託する登録支援機関も 構成員であること'])}</div>`),
    pg('乗務までの道のり', '入国後、免許を取るまでは 在留資格「特定活動」で準備します。更新できないので 逆算が大切です。', `<p class="lg-tlh">トラック（特定活動 最長6か月）</p><div class="sy-flow" style="grid-template-columns:repeat(6,1fr)">${['採用・雇用契約', '評価試験・<br>日本語に合格', '「特定活動」で<br>入国', '外免切替・<br>日本語研修', '特定技能1号へ<br>変更', '乗務開始'].map((x, i) => `<div class="${i === 3 ? 'on' : ''}" style="min-height:170px">${x}</div>`).join('')}</div>
      <p class="lg-tlh">タクシー・バス（特定活動 最長1年）</p><div class="sy-flow" style="grid-template-columns:repeat(6,1fr)">${['採用・雇用契約', '評価試験・<br>日本語に合格', '「特定活動」で<br>入国', '第二種免許の<br>取得', '新任運転者<br>研修', '1号へ変更・<br>乗務開始'].map((x, i) => `<div class="${i === 3 || i === 4 ? 'on' : ''}" style="min-height:170px">${x}</div>`).join('')}</div>
      <p class="tg-note">※特定活動の期間は、特定技能1号の通算5年に含みません。採用決定から乗務まで、トラックで おおむね半年〜1年が目安です。</p>`),
    sec('02', 'LOGISTICS WAREHOUSE', '物流倉庫<br>（倉庫スタッフ）', '倉庫内の入出庫・保管・ピッキング・流通加工。2026年1月に特定技能の対象となり、受入れは 2027年度の見込みです。いまが 準備の時期です。'),
    pg('どんな仕事で受け入れられる？', '物流倉庫の中で行う 倉庫作業が対象です。', `<div class="sy-chips" style="--c:3;--h:118px;--f:22px">${['入出庫の受渡し・検品', '貨物の移動', '保管庫への格納', 'ピッキング', '流通加工', '在庫管理（WMS）'].map((w) => `<span>${w}</span>`).join('')}</div>
      <div class="sy-tiles" style="grid-template-columns:repeat(3,1fr);margin-top:14px">${tile(['包装されていない食品に 直接触れる業務', '対象外です'], 'n')}${tile(['運送に伴う荷役として 引き受けている作業', '倉庫作業料金を 受け取る作業が対象'], 'n')}${tile(['技能試験と日本語', '物流倉庫分野 評価試験 ＋ N4相当以上'])}</div>`),
    pg('受け入れられる会社（3つの類型）', 'いずれかに当てはまり、営業倉庫登録のある倉庫で働いてもらいます。', `<div class="lg-abc">
      <div><em>A</em><b>倉庫業者</b><p>倉庫業法の登録を受け、倉庫作業を自ら行う会社。</p><u>就業場所: 自社が占有する営業倉庫</u></div>
      <div><em>B</em><b>倉庫作業の受託会社</b><p>倉庫業者の委託を受けて、倉庫作業を行う会社。委託元と「雇用継続協定書」を作ります。</p><u>就業場所: 委託元の営業倉庫</u></div>
      <div><em>C</em><b>貨物自動車運送事業者</b><p>一般・特定貨物自動車運送事業の許可を受けた会社。ドライバーと倉庫スタッフを 同じ会社で採用できます。</p><u>就業場所: 自社占有の倉庫、または有償で引き受ける倉庫作業</u></div></div>
      <p class="tg-note">※荷主企業の自社倉庫や、営業倉庫登録のない倉庫は、現在の基準では対象になりません。</p>`),
    pg('会社に必要なこと（上乗せ基準）', '当てはまる項目に チェックしてください。', ck(comp('soko'))),
    pg('いまから準備できること', '試験の合格者が出る前に、会社側を整えておくと 受入れ開始と同時に動けます。', `<div class="sy-flow" style="grid-template-columns:repeat(6,1fr)">${['類型・倉庫の<br>確認', 'WMSの<br>利活用を確認', '協議会に加入<br>（設置後）', '試験合格者の<br>確保', '雇用契約・<br>在留資格申請', '入社・定着<br>（2027年度）'].map((x, i) => `<div class="${i < 3 ? 'on' : ''}" style="min-height:200px">${x}</div>`).join('')}</div>
      <div class="sy-tiles" style="grid-template-columns:repeat(3,1fr);margin-top:18px">${tile(['育成就労（2027年4月〜）', '日本語 A1相当から、最長3年で 1号へ'], 'k')}${tile(['特定技能2号は ありません', '1号の通算 最長5年'])}${tile(['機器・システムの報告', '協議会加入から 1年以内'])}</div>`),
    pg('ドライバー＋倉庫スタッフを、ひとつの窓口で', '分野ごとに制度は違いますが、採用と支援の窓口は ひとつにまとめられます。', `<div class="sy-tiles" style="grid-template-columns:repeat(3,1fr)">${tile(['運送会社は 倉庫も採用できる', '類型C。自社占有の倉庫・有償の倉庫作業が対象'], 'k')}${tile(['順番は「いま運送、次に倉庫」', 'ドライバーは受入れ中。倉庫は 2027年度に向けて準備'])}${tile(['支援は 同じ10項目', '登録支援機関BIGLIGHTが まとめて担います'])}</div>
      <p class="lg-tlh" style="margin-top:30px">BIGLIGHTの支援（義務的支援10項目）</p><div class="lg-sup">${SUP.map((x, i) => `<span><b>${String(i + 1).padStart(2, '0')}</b>${x}</span>`).join('')}</div>`),
    pg('よくある質問', 'ご相談の多い質問です。', `<div class="lg-faq">${[
      ['物流倉庫は いつから採用できますか？', '評価試験の合格者が出てからの受入れで、2027年度の見込みです。協議会も国が設置に向けて調整中です。'],
      ['WMSがないと 受け入れられませんか？', '入庫・在庫・出庫を管理するシステムの「利活用」が要件です。自社所有でなくても、事業所で使えれば構いません。'],
      ['派遣で 受け入れられますか？', '両分野とも 派遣は認められていません。直接雇用で、日本人と同等以上の報酬とします。'],
      ['ドライバーは すぐ乗務できますか？', '海外からの方は 入国後に免許を取るため、トラックで最長6か月の準備期間があります。'],
      ['フォークリフトは 任せられますか？', '貨物の移動は対象業務です。運転には 日本人と同じく 技能講習などの資格が必要です。'],
      ['5年たったら どうなりますか？', '両分野とも 2号はなく、1号の通算5年が上限です。改正があれば 選択肢をご案内します。'],
    ].map(([q, a]) => `<div><b>${q}</b><p>${a}</p></div>`).join('')}</div>`),
    pg('出典', `国の公表資料をもとに作成しています（最終確認 ${ymd(F.updated)}）。最新の内容は 各省庁の資料でご確認ください。`, `<ul class="lg-src">${usedSrc.map((k) => { const s = F.sources[k]; const v = F.facts.filter((x) => x.source === k).map((x) => x.verified_at).sort().pop() || F.updated; return `<li><div>${s.name}<small>${s.url}</small></div><span>確認日 ${ymd(v)}</span></li>`; }).join('')}</ul>`),
    contact(S, `本資料は${AS_OF}の制度をもとにした一般的なご案内です。物流倉庫分野は 受入れ開始前のため、試験・協議会の状況は変わることがあります。最新の情報は、出入国在留管理庁・国土交通省の公表資料をご確認ください。<br>参考：各分野の運用方針（令和8年1月23日閣議決定）、物流倉庫分野 運用要領別冊（令和8年9月18日）・上乗せ基準の概要・評価試験実施要領（令和8年10月26日）`),
  ]);
  return out;
};
