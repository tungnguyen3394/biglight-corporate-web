// 受入れ準備チェックリスト /guide/checklist/ + 採用スケジュール表 /guide/schedule/ (CEO 2026-11-01): A4 ngang, cùng khung guide.cjs (lớp tg-…), ít chữ.
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
</style>`;

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

exports.checklist = (o) => {
  const S = sheetsOf();
  const pg = (q, a, body) => S.sheet('', `<h2 class="tg-q tg-q0">${q}</h2><p class="tg-a">${a}</p><div class="tg-body">${body}</div>${S.foot('受入れ準備チェックリスト')}`);
  return wrap(o, 'Checklist', '受入れ準備チェックリスト', '受入れ準備チェックリスト', '特定技能の外国人を受け入れる前に確認する項目のチェックリスト。', o.PDF_URL, [
    cover(S, '受入れ準備<br>チェックリスト', '印刷して、順番にチェックするだけ。', 'PREPARATION CHECKLIST'),
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
    pg('5. 入社してから', '受入れ後も、続けて確認します。', items([
      ['定期面談を3か月に1回以上行っている', '本人と上司それぞれに'],
      ['定期届出の時期を予定に入れた', '毎年4月1日〜5月31日に前年度分を提出'],
      ['変更があれば14日以内に届け出る', '契約・支援計画・委託の変更や終了'],
      ['在留期限を管理している', '期限の前に更新を申請します'],
      ['給与を契約どおり支払っている', ''],
      ['相談窓口を本人に伝えている', '本人が理解できる言語で'],
      ['日本語を学ぶ機会を案内している', ''],
      ['2号を目指すか、本人と話している', '11分野で2号に進めます'],
    ])),
    contact(S, `本資料は${AS_OF}の制度をもとにした一般的なご案内です。分野ごとの要件や最新の情報は、出入国在留管理庁・分野所管省庁の公表資料をご確認ください。<br>参考：出入国在留管理庁「特定技能外国人受入れに関する運用要領」（令和8年10月）`),
  ]);
};

const lane = (cols, tpl) => `<div class="sy-lane" style="grid-template-columns:86px repeat(${cols},1fr)">${tpl}</div>`;
const heads = (a) => '<span></span>' + a.map(x => `<div class="h">${x}</div>`).join('');
const cells = (lb, a, c) => `<div class="l">${lb}</div>` + a.map(x => x ? `<div class="c ${c || ''}">${x}</div>` : '<div class="c e">—</div>').join('');

exports.schedule = (o) => {
  const S = sheetsOf();
  const pg = (q, a, body) => S.sheet('', `<h2 class="tg-q tg-q0">${q}</h2><p class="tg-a">${a}</p><div class="tg-body">${body}</div>${S.foot('採用スケジュール表')}`);
  return wrap(o, 'Schedule', '採用スケジュール表', '採用スケジュール表', '特定技能の採用から入社までのスケジュールの目安。', o.PDF_URL, [
    cover(S, '採用スケジュール表', '相談から入社まで、いつ、誰が、何をするか。', 'HIRING SCHEDULE'),
    pg('入社まで、どのくらいかかる？', '国内にいる人か、海外にいる人かで変わります。', `
      <div class="sy-bars">
        <div class="sy-sc"><span></span><span>1か月</span><span>2か月</span><span>3か月</span><span>4か月</span><span>5か月</span><span>6か月</span></div>
        <div class="sy-row"><b>国内の人</b><div class="sy-tr"><i class="s" style="left:0;width:16.67%">1か月〜</i><i class="m" style="left:16.67%;width:33.33%">3か月</i></div></div>
        <div class="sy-row"><b>海外の人</b><div class="sy-tr"><i class="s" style="left:0;width:50%">3か月〜</i><i class="m" style="left:50%;width:50%">6か月</i></div></div>
      </div>
      <p class="tg-note">※一般的な目安です。職種、在留資格の状況、審査の期間によって異なります。</p>`),
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
    pg('入社してからの1年', '毎年くり返す予定を、1枚で確認できます。', `
      <div class="tg-cal">
        <div class="tg-ms"><i></i><span>4月</span><span>5月</span><span>6月</span><span>7月</span><span>8月</span><span>9月</span><span>10月</span><span>11月</span><span>12月</span><span>1月</span><span>2月</span><span>3月</span></div>
        <div class="tg-cr"><b>定期届出</b><div class="tg-gt"><u style="grid-column:1/3">前年度分を提出</u></div></div>
        <div class="tg-cr"><b>定期面談</b><div class="tg-gt"><s style="grid-column:3"></s><s style="grid-column:6"></s><s style="grid-column:9"></s><s style="grid-column:12"></s></div></div>
        <div class="tg-cr"><b>随時届出</b><div class="tg-gt"><em style="grid-column:1/13">変更や終了があったら、14日以内</em></div></div>
        <div class="tg-cr"><b>在留期限</b><div class="tg-gt"><em style="grid-column:1/13">在留カードの期限を確認し、期限の前に更新を申請</em></div></div>
      </div>
      <p class="tg-note">※定期面談の月は一例です。3か月に1回以上、本人と上司それぞれに行います。</p>`),
    contact(S, `本資料は${AS_OF}の制度をもとにした一般的なご案内です。期間は目安であり、審査の結果や期間を保証するものではありません。<br>参考：出入国在留管理庁「外国人労働者に関する制度概要」（令和8年9月29日更新）`),
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
];
exports.field = (o, f) => {
  r = '../../../';
  const S = sheetsOf(), T = f.name + 'ガイド';
  const pg = (q, a, body) => S.sheet('', `<h2 class="tg-q tg-q0">${q}</h2><p class="tg-a">${a}</p><div class="tg-body">${body}</div>${S.foot(T)}`);
  const tile = (x, c) => `<div class="sy-tile ${c || ''}"><b>${x[0]}</b><span>${x[1]}</span></div>`;
  const out = wrap(o, 'Field Guide', T, T, `${f.name}で特定技能の外国人を受け入れるときのガイド。`, o.PDF_URL, [
    cover(S, `${f.name}<br>ガイド`, f.sum, f.en + ' FIELD GUIDE'),
    pg('どんな仕事で受け入れられる？', f.two, `<div class="sy-chips" style="${f.work.length > 6 ? '--c:4;--h:92px;--f:17px' : `--c:${f.work.length};--h:380px;--f:28px`}">${f.work.map(w => `<span class="${f.workOn.includes(w) ? 'on' : ''}">${w}</span>`).join('')}</div>`),
    pg('どんな人を採用できる？', '分野共通の条件に加えて、次の3つを確認します。', `<div class="sy-tiles" style="grid-template-columns:repeat(3,1fr)">${f.who.map(w => `<div class="sy-tile" style="min-height:430px;text-align:center;align-items:center"><span style="margin:0 0 12px;font-weight:700;color:var(--gold-d);font-size:17px">${w[0]}</span><b>${w[1]}</b><span>${w[2]}</span></div>`).join('')}</div>`),
    pg('会社に必要なことは？', 'この分野ならではの基準です。', `<div class="sy-tiles" style="grid-template-columns:repeat(3,1fr)">${f.co.map(x => tile(x)).join('')}</div><div class="sy-tiles" style="grid-template-columns:repeat(2,1fr);margin-top:14px">${f.ng.map(x => tile(x, 'n')).join('')}</div>`),
    pg('受入れまでの流れは？', '色の濃いところが、この分野で特に大事な手続きです。', `<div class="sy-flow" style="grid-template-columns:repeat(${f.flow.length},1fr)">${f.flow.map((x, i) => `<div class="${f.flowOn.includes(i) ? 'on' : ''}">${x}</div>`).join('')}</div><p class="tg-note" style="font-size:15px;margin-top:22px!important">${f.note}</p>`),
    contact(S, `本資料は${AS_OF}の制度をもとにした一般的なご案内です。要件の詳細は、出入国在留管理庁・分野所管省庁の公表資料をご確認ください。<br>参考：出入国在留管理庁「特定の分野に係る特定技能外国人受入れに関する運用要領」、「外国人労働者に関する制度概要」（令和8年9月29日更新）`),
  ]);
  r = '../../';
  return out;
};
