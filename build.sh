#!/usr/bin/env bash
# Generator: tách biglight-demo.html thành site nhiều trang chuẩn SEO.
set -e
cd "$(dirname "$0")"
SRC=biglight-demo.html
P=_partials
mkdir -p "$P" service/tokutei-ginou service/jinzai-shoukai service/teichaku flow case about recruit faq news contact privacy

# ---------- 1) Tách fragment từ file gốc ----------
ex(){ sed -n "$1,$2p" "$SRC" > "$P/$3"; }
ex 646 660  preloader.html
ex 728 754  hero.html
ex 756 835  mv.html
ex 837 863  message.html
ex 866 877  issues.html
ex 880 889  solband.html
ex 892 922  soldetail.html
ex 927 961  svc-summary.html
ex 964 1016 tg-tokutei.html
ex 1021 1049 tg-jinzai.html
ex 1054 1130 strength.html
ex 1133 1144 stats.html
ex 1147 1178 flow.html
ex 1181 1251 case.html
ex 1254 1284 faq.html
ex 1287 1299 news.html
ex 1302 1312 cta.html
ex 1315 1340 recruit-hero.html
ex 1343 1361 culture.html
ex 1364 1403 recruit-detail.html
ex 1405 1455 senpai.html
ex 1458 1484 history.html
ex 1487 1506 company.html
cat > "$P/contact.html" <<'EOF'
<section class="sec contact" id="contact">
  <div class="wrap">
    <div class="sec-head reveal"><div class="en">Contact</div><h2>お問い合わせ</h2><p>採用のご相談・資料請求など、お気軽にどうぞ。最短即日でご返信します。</p></div>
    <form class="cform reveal" id="contactForm" novalidate>
      <div class="frow"><label>会社名</label><input type="text" name="company" placeholder="株式会社〇〇"></div>
      <div class="frow" data-f><label>ご担当者名<span class="req">必須</span></label><input type="text" name="name" placeholder="山田 太郎"><div class="err">お名前をご入力ください。</div></div>
      <div class="frow" data-f data-email><label>メールアドレス<span class="req">必須</span></label><input type="email" name="email" placeholder="example@company.co.jp"><div class="err">正しいメールアドレスをご入力ください。</div></div>
      <div class="frow" data-f><label>電話番号<span class="req">必須</span></label><input type="tel" name="tel" placeholder="052-908-7944"><div class="err">電話番号をご入力ください。</div></div>
      <div class="frow" data-f><label>お問い合わせ内容<span class="req">必須</span></label><textarea name="msg" placeholder="ご相談内容をご記入ください。"></textarea><div class="err">お問い合わせ内容をご入力ください。</div></div>
      <label class="fcheck"><input type="checkbox" id="agree"><span><a href="#" class="js-pp">プライバシーポリシー</a>に同意の上、確認画面へ進みます。</span></label>
      <div id="agreeErr" style="display:none;margin:-12px 0 16px"><div class="err" style="display:block">プライバシーポリシーへの同意が必要です。</div></div>
      <button type="submit" class="fsubmit">入力内容を確認する</button>
    </form>
    <div class="cform reveal" id="contactConfirm" style="display:none">
      <p class="confnote">以下の内容でよろしければ「送信する」を押してください。</p>
      <div class="conftbl" id="confTbl"></div>
      <div class="confbtns">
        <button type="button" class="btn-outline" id="confBack">&lsaquo; 修正する</button>
        <button type="button" class="fsubmit" id="confSend">送信する</button>
      </div>
    </div>
    <div class="fdone" id="formDone">送信ありがとうございます。<br>担当者より折り返しご連絡いたします。</div>
  </div>
</section>
EOF
ex 1526 1587 modal-privacy.html
ex 1711 1736 modal-download.html
ex 1535 1583 privacy-body.html

# bỏ ghi chú "số liệu mẫu" ở phần 数字で見るBIGLIGHT
sed -i '/数値はサンプルです/d' "$P/stats.html"
# bỏ khối メリット trùng lặp ở phần 特定技能制度 (giữ khối 委託 ở dưới)
sed -i '/<div class="tg-merit reveal">/,/<\/div>/d' "$P/tg-tokutei.html"

# ---------- 2) Khung dùng chung ----------
{
  cat "$P/preloader.html"
  echo '<div id="progress"></div>'
  cat <<'EOF'
<header id="hd">
  <div class="wrap nav">
    <a class="logo" href="/"><img src="/assets/logo.png" alt="BIGLIGHT株式会社"></a>
    <nav class="menu">
      <div class="item">
        <a>会社情報 <span class="caret">&#9660;</span></a>
        <div class="dropdown">
          <a href="/about/#mv">理念（Mission / Vision）</a>
          <a href="/about/#message">代表メッセージ</a>
          <a href="/#strength">選ばれる理由</a>
          <a href="/about/#history">沿革</a>
          <a href="/about/#company">会社概要</a>
        </div>
      </div>
      <div class="item">
        <a>サービス <span class="caret">&#9660;</span></a>
        <div class="dropdown">
          <a href="/service/tokutei-ginou/">特定技能 採用サービス</a>
          <a href="/service/jinzai-shoukai/">技人国 人材紹介</a>
          <a href="/service/teichaku/">定着・生活支援</a>
          <a href="/flow/">導入の流れ</a>
          <a href="/case/">導入事例</a>
        </div>
      </div>
      <div class="item"><a href="/case/">導入事例</a></div>
      <div class="item"><a href="/faq/">よくある質問</a></div>
      <div class="item"><a href="/news/">お知らせ</a></div>
      <div class="item">
        <a>採用情報 <span class="caret">&#9660;</span></a>
        <div class="dropdown">
          <a href="/recruit/">採用トップ</a>
          <a href="/recruit/#culture">会社文化</a>
          <a href="/recruit/#senpai">先輩の声</a>
        </div>
      </div>
      <a class="cta" href="/contact/">無料相談</a>
    </nav>
    <div class="burger" onclick="document.getElementById('mnav').classList.add('open')">&#9776;</div>
  </div>
</header>

<div id="mnav">
  <div class="mclose" onclick="document.getElementById('mnav').classList.remove('open')">&times;</div>
  <div class="macc">
    <button type="button" class="macc-h">会社情報 <span class="macc-ar">&#9662;</span></button>
    <div class="macc-body">
      <a href="/about/#mv">理念（Mission / Vision）</a>
      <a href="/about/#message">代表メッセージ</a>
      <a href="/#strength">選ばれる理由</a>
      <a href="/about/#history">沿革</a>
      <a href="/about/#company">会社概要</a>
    </div>
  </div>
  <div class="macc">
    <button type="button" class="macc-h">サービス <span class="macc-ar">&#9662;</span></button>
    <div class="macc-body">
      <a href="/service/tokutei-ginou/">特定技能 採用サービス</a>
      <a href="/service/jinzai-shoukai/">技人国 人材紹介</a>
      <a href="/service/teichaku/">定着・生活支援</a>
      <a href="/flow/">導入の流れ</a>
      <a href="/case/">導入事例</a>
    </div>
  </div>
  <a class="macc-link" href="/case/">導入事例</a>
  <a class="macc-link" href="/faq/">よくある質問</a>
  <a class="macc-link" href="/news/">お知らせ</a>
  <div class="macc">
    <button type="button" class="macc-h">採用情報 <span class="macc-ar">&#9662;</span></button>
    <div class="macc-body">
      <a href="/recruit/">採用トップ</a>
      <a href="/recruit/#culture">会社文化</a>
      <a href="/recruit/#senpai">先輩の声</a>
    </div>
  </div>
  <a class="macc-cta" href="/contact/">無料相談</a>
</div>
EOF
} > "$P/topmatter.html"

cat > "$P/footer.html" <<'EOF'
<footer>
  <div class="wrap">
    <div class="fgrid">
      <div>
        <div class="flogo"><a href="/"><img src="/assets/logo.png" alt="BIGLIGHT株式会社"></a></div>
        <p class="faddr">BIGLIGHT株式会社<br>〒462-0007<br>愛知県名古屋市北区如意一丁目112 A<br>TEL 052-908-7944 ／ FAX 052-908-7267</p>
      </div>
      <div><h5>サービス</h5><ul>
        <li><a href="/service/tokutei-ginou/">特定技能 採用サービス</a></li>
        <li><a href="/service/jinzai-shoukai/">技人国 人材紹介</a></li>
        <li><a href="/service/teichaku/">定着・生活支援</a></li>
        <li><a href="/flow/">導入の流れ</a></li>
        <li><a href="/case/">導入事例</a></li>
      </ul></div>
      <div><h5>会社情報</h5><ul>
        <li><a href="/about/#company">会社概要</a></li>
        <li><a href="/about/#history">沿革</a></li>
        <li><a href="/news/">お知らせ</a></li>
        <li><a href="/recruit/">採用情報</a></li>
        <li><a href="/faq/">よくある質問</a></li>
        <li><a href="/contact/">お問い合わせ</a></li>
        <li><a href="#" class="js-pp">プライバシーポリシー</a></li>
      </ul></div>
      <div><h5>アクセス</h5>
        <div class="fmap"><iframe src="https://www.google.com/maps?q=%E6%84%9B%E7%9F%A5%E7%9C%8C%E5%90%8D%E5%8F%A4%E5%B1%8B%E5%B8%82%E5%8C%97%E5%8C%BA%E5%A6%82%E6%84%8F%E4%B8%80%E4%B8%81%E7%9B%AE112&hl=ja&z=16&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="BIGLIGHT株式会社 地図"></iframe></div>
        <div class="fmapcap">名古屋市北区如意一丁目112 A</div>
      </div>
    </div>
    <div class="fbottom">
      <span>有料職業紹介 23-ユ-302414 ／ 登録支援機関 21登-006596</span>
      <span>&copy; BIGLIGHT Co., Ltd.</span>
    </div>
  </div>
</footer>

<div class="fab">
  <a class="fab-cta" href="/contact/">無料相談</a>
  <button class="fab-top" id="toTop" aria-label="ページトップへ">&#8593;</button>
</div>
EOF

# Bọc 1 fragment trong <section><wrap>
wrapsec(){ { echo '<section class="sec"><div class="wrap">'; cat "$P/$1"; echo '</div></section>'; } > "$P/$2"; }
wrapsec tg-tokutei.html w-tokutei.html
wrapsec tg-jinzai.html  w-jinzai.html

# Home: service summary trong section + hàng link sang trang dịch vụ
{
  echo '<section class="sec" id="service"><div class="wrap">'
  cat "$P/svc-summary.html"
  cat <<'EOF'
    <div class="cta-row reveal">
      <a class="btn-outline" href="/service/tokutei-ginou/">特定技能 採用サービス &rsaquo;</a>
      <a class="btn-outline" href="/service/jinzai-shoukai/">技人国 人材紹介 &rsaquo;</a>
      <a class="btn-outline" href="/service/teichaku/">定着・生活支援 &rsaquo;</a>
    </div>
  </div></section>
EOF
} > "$P/home-service.html"

# Intro (h2 -> sẽ thành h1) cho các trang dịch vụ
intro(){ # $1 out, $2 en, $3 title, $4 lead
  cat > "$P/$1" <<EOF
<section class="sec"><div class="wrap">
  <div class="sec-head reveal"><div class="en">$2</div><h2>$3</h2><p>$4</p></div>
</div></section>
EOF
}
cat > "$P/intro-tokutei.html" <<'EOF'
<section class="sec"><div class="wrap">
  <div class="sec-head reveal"><div class="en">Service</div><h2>特定技能 採用サービス</h2><p>製造・建設・介護・外食など人手不足の現場へ。即戦力となる特定技能外国人材を、募集から採用・入社・定着までワンストップでご支援します。</p></div>
  <div class="tg-pathlabel">主な対応分野</div>
  <div class="tg-jobs">
    <span class="tg-job">製造業</span>
    <span class="tg-job">建設</span>
    <span class="tg-job">介護</span>
    <span class="tg-job">外食業</span>
    <span class="tg-job">飲食料品製造</span>
    <span class="tg-job">農業</span>
    <span class="tg-job">宿泊</span>
    <span class="tg-job">自動車整備</span>
    <span class="tg-job">ビルクリーニング</span>
    <span class="tg-job">工業包装</span>
  </div>
</div></section>
EOF
cat > "$P/jinzai-body.html" <<'EOF'
<section class="sec"><div class="wrap">
  <div class="sec-head reveal"><div class="en">Service</div><h2>技人国 人材紹介サービス</h2><p>専門知識と国際感覚を持つ、優秀な外国人材をご紹介します。</p></div>
  <div class="rso-intro reveal">
    <p>BIGLIGHTでは、技術・人文知識・国際業務（技人国）の在留資格を持つ外国人材をご紹介しております。</p>
    <p>エンジニア、機械設計、生産技術、品質管理、営業、貿易事務、通訳・翻訳など、専門知識や高度なスキルを必要とする職種に対応可能です。</p>
    <p>企業様の採用ニーズを丁寧にヒアリングし、経験・日本語力・専門性を考慮した最適な人材をご提案いたします。</p>
  </div>
</div></section>

<section class="sec rso"><div class="wrap">
  <div class="sec-head reveal"><div class="en">About</div><h2>技術・人文知識・国際業務（技人国）とは？</h2></div>
  <div class="rso-intro reveal">
    <p>「技術・人文知識・国際業務」は、大学卒業者や専門知識を有する外国人材が日本で働くための在留資格です。</p>
    <p>単純作業ではなく、専門知識や語学力を活かした業務に従事することが認められています。</p>
    <p>近年では、深刻な人材不足を背景に、多くの企業が技人国人材を採用し、企業成長の原動力として活躍しています。</p>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head reveal"><div class="en">Job Categories</div><h2>技人国人材が従事できる主な職種</h2></div>
  <div class="grid4">
    <div class="scard reveal"><h3>IT・システム分野</h3><ul class="slist"><li>システムエンジニア</li><li>プログラマー</li><li>インフラエンジニア</li><li>Webエンジニア</li><li>AI・データ関連職</li></ul></div>
    <div class="scard reveal"><h3>製造・技術分野</h3><ul class="slist"><li>機械設計</li><li>CADオペレーター</li><li>生産技術</li><li>品質管理</li><li>技術開発</li><li>設備保全</li></ul></div>
    <div class="scard reveal"><h3>事務・営業分野</h3><ul class="slist"><li>貿易事務</li><li>海外営業</li><li>営業企画</li><li>マーケティング</li><li>購買業務</li></ul></div>
    <div class="scard reveal"><h3>語学・国際業務分野</h3><ul class="slist"><li>通訳</li><li>翻訳</li><li>海外顧客対応</li><li>海外拠点サポート</li></ul></div>
  </div>
</div></section>

<section class="sec rso"><div class="wrap">
  <div class="sec-head reveal"><div class="en">Comparison</div><h2>特定技能との違い</h2></div>
  <div class="cmpwrap reveal">
    <table class="cmptbl">
      <thead><tr><th>項目</th><th class="col-hl">技人国</th><th>特定技能</th></tr></thead>
      <tbody>
        <tr><th>学歴</th><td class="hl">原則大学卒業</td><td>不要</td></tr>
        <tr><th>業務内容</th><td class="hl">専門職</td><td>現場業務中心</td></tr>
        <tr><th>家族帯同</th><td class="hl">可能</td><td>原則不可</td></tr>
        <tr><th>在留期間更新</th><td class="hl">可能</td><td>制限あり</td></tr>
        <tr><th>キャリア形成</th><td class="hl">高い</td><td>現場中心</td></tr>
        <tr><th>管理職候補</th><td class="hl">可能</td><td>限定的</td></tr>
      </tbody>
    </table>
  </div>
  <p style="text-align:center;color:var(--muted);font-size:13.5px;margin-top:18px">企業様の将来を担う中核人材を採用したい場合、技人国人材は非常に有効な選択肢となります。</p>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head reveal"><div class="en">Our Talent</div><h2>BIGLIGHTがご紹介できる人材</h2></div>
  <div class="grid4">
    <div class="scard reveal"><h3>日本語力</h3><ul class="slist"><li>N2以上中心</li><li>ビジネス会話対応可能</li><li>社内コミュニケーション可能</li></ul></div>
    <div class="scard reveal"><h3>学歴</h3><ul class="slist"><li>大学卒業</li><li>専門学校卒業</li><li>技術系学部出身</li></ul></div>
    <div class="scard reveal"><h3>実務経験</h3><ul class="slist"><li>製造業</li><li>IT業界</li><li>建設関連</li><li>営業職</li><li>事務職</li></ul></div>
    <div class="scard reveal"><h3>国籍</h3><ul class="slist"><li>ベトナム</li><li>インドネシア</li><li>その他アジア諸国</li></ul></div>
  </div>
</div></section>

<section class="sec rso"><div class="wrap">
  <div class="sec-head reveal"><div class="en">Merit</div><h2>技人国人材を採用するメリット</h2></div>
  <div class="grid2">
    <div class="rso-merit reveal"><h4>若手人材を確保できる</h4><p>将来の幹部候補として育成可能です。</p></div>
    <div class="rso-merit reveal"><h4>専門知識を活かせる</h4><p>即戦力として現場で活躍できます。</p></div>
    <div class="rso-merit reveal"><h4>長期雇用が可能</h4><p>安定した雇用関係を構築できます。</p></div>
    <div class="rso-merit reveal"><h4>海外展開にも活用できる</h4><p>語学力と国際感覚を活かし、企業のグローバル化を支援します。</p></div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head reveal"><div class="en">Flow</div><h2>採用の流れ</h2><p>お問い合わせから入社後の定着支援まで、7つのステップでご案内します。</p></div>
  <div class="tkflow reveal">
    <div class="tkstep"><div class="tknum">1</div><div class="tkbody"><h4>お問い合わせ</h4><p>まずはお気軽にご相談ください。採用のお悩みを伺います。</p></div></div>
    <div class="tkstep"><div class="tknum">2</div><div class="tkbody"><h4>ヒアリング</h4><p>必要な人材像・業務内容・条件を丁寧にヒアリングします。</p></div></div>
    <div class="tkstep"><div class="tknum">3</div><div class="tkbody"><h4>候補者のご紹介</h4><p>経験・日本語力・専門性を考慮した最適な人材をご提案します。</p></div></div>
    <div class="tkstep"><div class="tknum">4</div><div class="tkbody"><h4>面接</h4><p>企業様と候補者の面接を実施。通訳・日程調整もサポートします。</p></div></div>
    <div class="tkstep"><div class="tknum">5</div><div class="tkbody"><h4>内定</h4><p>双方合意のうえ内定。雇用条件・入社時期を確定します。</p></div></div>
    <div class="tkstep"><div class="tknum">6</div><div class="tkbody"><h4>在留資格手続き</h4><p>在留資格の申請・変更手続きを専門スタッフが代行します。</p></div></div>
    <div class="tkstep"><div class="tknum">7</div><div class="tkbody"><h4>入社・定着支援</h4><p>入社後も定期訪問・面談でフォローし、長期定着を支えます。</p></div></div>
  </div>
  <div class="reveal" style="text-align:center;margin-top:26px"><a class="btn-outline" href="/flow/">サービス共通のご利用の流れ &rsaquo;</a></div>
</div></section>
EOF
intro intro-teichaku.html "Service" "定着・生活支援" "採用して終わりではありません。在留資格手続き、寮・生活サポート、入社後フォローまで、長く活躍できる環境づくりをご支援します。"

# 404
cat > "$P/intro-404.html" <<'EOF'
<section class="sec" style="padding-top:150px;text-align:center">
  <div class="wrap">
    <div class="sec-head reveal"><div class="en">404 Not Found</div><h2>ページが見つかりません</h2><p>お探しのページは移動または削除された可能性があります。</p></div>
    <div class="cta-row reveal"><a class="btn-gold" href="/">トップへ戻る</a><a class="btn-outline" href="/contact/">お問い合わせ</a></div>
  </div>
</section>
EOF

# 登録支援機関 section cho trang 特定技能
cat > "$P/tokutei-rso.html" <<'EOF'
<section class="sec rso">
  <div class="wrap">
    <div class="sec-head reveal"><div class="en">Registered Support Organization</div><h2>登録支援機関とは？</h2></div>
    <div class="rso-intro reveal">
      <p>特定技能外国人を受け入れる企業（特定技能所属機関）は、外国人材が安心して日本で働き、生活できるよう、法律で定められた支援を実施する必要があります。</p>
      <p>しかし、住居の確保、行政手続き、日本語学習支援、生活相談などを企業がすべて対応することは容易ではありません。そこで、企業に代わって支援業務を実施するのが<b>「登録支援機関」</b>です。</p>
      <p>BIGLIGHT株式会社は<b>出入国在留管理庁に登録された登録支援機関</b>として、外国人材の採用から入社後の定着まで一貫してサポートいたします。</p>
    </div>

    <div class="rso-diagram reveal">
      <div class="rso-node n1"><span class="rso-tag">特定技能所属機関</span><strong>受入れ企業</strong></div>
      <div class="rso-arrow"><span>雇用契約</span><i>&#8595;</i></div>
      <div class="rso-node n2"><span class="rso-tag">特定技能外国人</span><strong>働く外国人材</strong></div>
      <div class="rso-arrow"><i>&#8593;</i><span>支援業務</span></div>
      <div class="rso-node n3"><span class="rso-tag">登録支援機関</span><strong>BIGLIGHT株式会社</strong></div>
    </div>

    <h3 class="rso-h3 reveal">登録支援機関の主な役割</h3>
    <div class="grid4">
      <div class="solcard reveal"><div class="sn">01</div><div class="si">&#9992;</div><h3>入国前・入社前サポート</h3>
        <ul class="mlist"><li>事前ガイダンス</li><li>住居確保支援</li><li>ライフライン契約支援</li><li>入国準備サポート</li></ul></div>
      <div class="solcard reveal"><div class="sn">02</div><div class="si">&#127968;</div><h3>入社後の生活支援</h3>
        <ul class="mlist"><li>生活オリエンテーション</li><li>行政手続き同行</li><li>銀行口座開設支援</li><li>携帯電話契約支援</li></ul></div>
      <div class="solcard reveal"><div class="sn">03</div><div class="si">&#128172;</div><h3>定期面談・相談対応</h3>
        <ul class="mlist"><li>定期面談の実施</li><li>職場・生活相談</li><li>トラブル対応</li><li>企業との連携</li></ul></div>
      <div class="solcard reveal"><div class="sn">04</div><div class="si">&#128218;</div><h3>日本語学習支援</h3>
        <ul class="mlist"><li>日本語学習機会の提供</li><li>生活情報の提供</li><li>地域社会への適応支援</li></ul></div>
    </div>

    <h3 class="rso-h3 reveal">登録支援機関へ委託するメリット</h3>
    <div class="grid2">
      <div class="rso-merit reveal"><h4>企業の負担を大幅に軽減</h4><p>外国人材受入れに必要な支援業務を専門家へ委託することで、企業様は本業に集中することができます。</p></div>
      <div class="rso-merit reveal"><h4>法令遵守の徹底</h4><p>出入国在留管理庁が定める支援基準に基づき、適切な支援を実施いたします。</p></div>
      <div class="rso-merit reveal"><h4>定着率向上</h4><p>外国人材が安心して生活できる環境を整えることで、離職リスクを低減し、長期的な定着につなげます。</p></div>
      <div class="rso-merit reveal"><h4>トラブルの未然防止</h4><p>定期的なフォローと相談対応により、職場や生活上の問題を早期に把握し、迅速に対応します。</p></div>
    </div>
  </div>
</section>
EOF

# BIGLIGHTの解決策: 特定技能採用の流れ (8 bước) + サポート内容 + câu kết
cat > "$P/tokutei-solution.html" <<'EOF'
<section class="sec">
  <div class="wrap">
    <div class="sec-head reveal"><div class="en">Our Solution</div><h2>BIGLIGHTの解決策</h2><p>お問い合わせから入社後のフォローまで、特定技能採用をワンストップでご支援します。</p></div>
    <h3 class="rso-h3 reveal">特定技能採用の流れ</h3>
    <div class="tkflow reveal">
      <div class="tkstep"><div class="tknum">1</div><div class="tkbody"><h4>お問い合わせ</h4><p>まずはお気軽にご相談ください。採用のお悩みを伺います。</p></div></div>
      <div class="tkstep"><div class="tknum">2</div><div class="tkbody"><h4>ヒアリング</h4><p>必要な人材像・業務内容・条件を丁寧にヒアリングします。</p></div></div>
      <div class="tkstep"><div class="tknum">3</div><div class="tkbody"><h4>候補者のご紹介</h4><p>経験・日本語力・専門性を考慮した最適な人材をご提案します。</p></div></div>
      <div class="tkstep"><div class="tknum">4</div><div class="tkbody"><h4>面接</h4><p>企業様と候補者の面接を実施。通訳・日程調整もサポートします。</p></div></div>
      <div class="tkstep"><div class="tknum">5</div><div class="tkbody"><h4>内定</h4><p>双方合意のうえ内定。雇用条件・入社時期を確定します。</p></div></div>
      <div class="tkstep"><div class="tknum">6</div><div class="tkbody"><h4>在留資格手続き</h4><p>在留資格の申請・変更手続きを専門スタッフが代行します。</p></div></div>
      <div class="tkstep"><div class="tknum">7</div><div class="tkbody"><h4>入社・定着支援</h4><p>入社後も定期訪問・面談でフォローし、長期定着を支えます。</p></div></div>
    </div>

    <div class="reveal" style="text-align:center;margin-top:26px"><a class="btn-outline" href="/flow/">サービス共通のご利用の流れ &rsaquo;</a></div>

    <h3 class="rso-h3 reveal">BIGLIGHTのサポート内容</h3>
    <div class="rso-check reveal">
      <span>特定技能人材の募集・選考</span>
      <span>面接調整・通訳対応</span>
      <span>在留資格関連サポート</span>
      <span>住居確保支援</span>
      <span>空港送迎</span>
      <span>生活オリエンテーション</span>
      <span>定期面談</span>
      <span>行政手続き同行</span>
      <span>日本語学習支援</span>
      <span>24時間相談対応</span>
      <span>転職・退職時サポート</span>
    </div>

    <p class="rso-closing reveal">外国人材の採用から定着まで、BIGLIGHTが責任を持ってサポートいたします。<br>まずはお気軽にご相談ください。</p>
  </div>
</section>
EOF

# link chéo ở trang /flow/ sang flow chi tiết của từng dịch vụ
cat > "$P/flow-link.html" <<'EOF'
<section class="sec" style="background:var(--bg);padding-top:0">
  <div class="wrap" style="text-align:center">
    <p style="color:var(--muted);font-size:14px;margin-bottom:16px">サービスごとの詳しい採用の流れもご覧いただけます。</p>
    <a class="btn-outline" href="/service/tokutei-ginou/">特定技能採用の流れ &rsaquo;</a>
  </div>
</section>
EOF

# Privacy: bọc nội dung thành trang
{
  echo '<section class="sec privacy"><div class="wrap">'
  echo '  <div class="sec-head reveal"><div class="en">Privacy Policy</div><h2>プライバシーポリシー</h2></div>'
  echo '  <div class="pbox reveal">'
  cat "$P/privacy-body.html"
  echo '  </div>'
  echo '</div></section>'
} > "$P/privacy-page.html"

# ---------- 3) Hàm dựng trang ----------
emit_head(){ cat <<EOF
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="index, follow">
<title>$1</title>
<meta name="description" content="$2">
<link rel="canonical" href="https://biglight.jp$3">
<meta property="og:type" content="website">
<meta property="og:site_name" content="BIGLIGHT株式会社">
<meta property="og:title" content="$1">
<meta property="og:description" content="$2">
<meta property="og:url" content="https://biglight.jp$3">
<meta property="og:image" content="https://biglight.jp/assets/hero-fallback.jpg">
<meta property="og:locale" content="ja_JP">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Parisienne&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
EOF
}

JSONLD=""; CRUMB=""
crumb(){ # $1 name, $2 path
  CRUMB='<nav class="crumb" aria-label="パンくずリスト"><a href="/">ホーム</a> ＞ <span>'"$1"'</span></nav>'
  JSONLD='<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"ホーム","item":"https://biglight.jp/"},{"@type":"ListItem","position":2,"name":"'"$1"'","item":"https://biglight.jp'"$2"'"}]}</script>'
}

build(){
  local OUT="$1" TITLE="$2" DESC="$3" PG="$4"; shift 4
  {
    emit_head "$TITLE" "$DESC" "$PG"
    [ -n "$JSONLD" ] && printf '%s\n' "$JSONLD"
    echo '</head>'
    echo '<body>'
    cat "$P/topmatter.html"
    [ -n "$CRUMB" ] && printf '%s\n' "$CRUMB"
    for f in "$@"; do cat "$P/$f"; echo; done
    cat "$P/footer.html"
    cat "$P/modal-privacy.html"
    cat "$P/modal-download.html"
    echo '<script src="/assets/main.js"></script>'
    echo '</body>'
    echo '</html>'
  } > "$OUT"
  # đường dẫn asset + link chéo
  sed -i -e 's|="assets/|="/assets/|g' \
         -e 's|href="#contact"|href="/contact/"|g' \
         -e 's|href="#">お問い合わせ|href="/contact/">お問い合わせ|g' \
         -e 's|href="#">お知らせ一覧|href="/news/">お知らせ一覧|g' "$OUT"
  # heading đầu tiên -> h1 (chỉ khi trang chưa có h1, vd trang chủ hero đã có sẵn)
  if ! grep -q '<h1' "$OUT"; then
    sed -i '0,/<h2/{s/<h2/<h1/}' "$OUT"
    sed -i '0,/<\/h2>/{s/<\/h2>/<\/h1>/}' "$OUT"
  fi
}

# ----- Next navigation: gợi ý trang tiếp theo (UX + internal linking) -----
nn(){ local out="$1"; shift
  { echo '<section class="sec nextnav"><div class="wrap">'
    echo '  <div class="sec-head reveal"><div class="en">Next Step</div><h2>次に見る</h2></div>'
    echo '  <div class="nn-grid">'
    while [ "$#" -ge 3 ]; do
      printf '    <a class="nn-card reveal" href="%s"><span class="nn-title">%s</span><span class="nn-desc">%s</span><span class="nn-go">詳しく見る &rsaquo;</span></a>\n' "$1" "$2" "$3"; shift 3
    done
    echo '  </div>'
    echo '</div></section>'
  } > "$P/$out"
}
nn nn-home.html \
  /service/tokutei-ginou/ "特定技能 採用サービス" "即戦力の特定技能人材を採用" \
  /case/ "導入事例" "採用成功の事例を見る" \
  /about/ "会社概要" "BIGLIGHTについて知る"
nn nn-tokutei.html \
  /service/jinzai-shoukai/ "技人国 人材紹介" "専門・高度人材をご紹介" \
  /service/teichaku/ "定着・生活支援" "入社後の定着をサポート" \
  /case/ "導入事例" "採用成功の事例を見る"
nn nn-jinzai.html \
  /service/tokutei-ginou/ "特定技能 採用サービス" "即戦力の特定技能人材を採用" \
  /service/teichaku/ "定着・生活支援" "入社後の定着をサポート" \
  /flow/ "導入の流れ" "ご相談から入社までの流れ"
nn nn-teichaku.html \
  /service/tokutei-ginou/ "特定技能 採用サービス" "即戦力の特定技能人材を採用" \
  /service/jinzai-shoukai/ "技人国 人材紹介" "専門・高度人材をご紹介" \
  /case/ "導入事例" "採用成功の事例を見る"
nn nn-flow.html \
  /case/ "導入事例" "採用成功の事例を見る" \
  /service/tokutei-ginou/ "特定技能 採用サービス" "即戦力の特定技能人材を採用" \
  /faq/ "よくあるご質問" "採用前の疑問を解決"
nn nn-case.html \
  /flow/ "導入の流れ" "ご相談から入社までの流れ" \
  /service/tokutei-ginou/ "特定技能 採用サービス" "即戦力の特定技能人材を採用" \
  /contact/ "お問い合わせ" "無料でご相談ください"
nn nn-about.html \
  /service/tokutei-ginou/ "特定技能 採用サービス" "即戦力の特定技能人材を採用" \
  /case/ "導入事例" "採用成功の事例を見る" \
  /recruit/ "採用情報" "一緒に働く仲間を募集"
nn nn-recruit.html \
  /about/ "会社概要" "BIGLIGHTについて知る" \
  /news/ "お知らせ" "最新情報・HR Magazine" \
  /contact/ "お問い合わせ" "無料でご相談ください"
nn nn-faq.html \
  /service/tokutei-ginou/ "特定技能 採用サービス" "即戦力の特定技能人材を採用" \
  /flow/ "導入の流れ" "ご相談から入社までの流れ" \
  /contact/ "お問い合わせ" "無料でご相談ください"
nn nn-news.html \
  /service/tokutei-ginou/ "特定技能 採用サービス" "即戦力の特定技能人材を採用" \
  /about/ "会社概要" "BIGLIGHTについて知る" \
  /case/ "導入事例" "採用成功の事例を見る"

# ---------- 4) Tạo các trang ----------
# HOME (Organization + WebSite JSON-LD)
JSONLD='<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"BIGLIGHT株式会社","alternateName":"ビッグライト","url":"https://biglight.jp/","logo":"https://biglight.jp/assets/logo.png","email":"admin@biglight.jp","telephone":"+81-52-908-7944","address":{"@type":"PostalAddress","postalCode":"462-0007","addressRegion":"愛知県","addressLocality":"名古屋市北区","streetAddress":"如意一丁目112 A","addressCountry":"JP"},"areaServed":"JP","description":"特定技能・技人国の外国人材を、採用から定着までワンストップでご支援する登録支援機関。"}</script>'
CRUMB=""
build index.html \
  "BIGLIGHT株式会社｜特定技能・技人国の外国人材紹介・定着支援【名古屋】" \
  "BIGLIGHT株式会社は、特定技能・技人国の外国人材を、採用から定着までワンストップでご紹介。完全成功報酬・最長1年保証、登録支援機関として名古屋・東海エリアの企業様を伴走支援します。" \
  "/" \
  hero.html issues.html solband.html home-service.html strength.html stats.html news.html cta.html nn-home.html

# ABOUT
crumb "会社概要" "/about/"
build about/index.html \
  "会社概要・代表メッセージ・沿革｜BIGLIGHT株式会社" \
  "BIGLIGHT株式会社の理念・代表メッセージ・沿革・会社概要をご紹介します。外国人材と企業をつなぐ架け橋として、採用から定着まで伴走します。" \
  "/about/" \
  mv.html message.html history.html company.html nn-about.html

# SERVICE: 特定技能
crumb "特定技能 採用サービス" "/service/tokutei-ginou/"
build service/tokutei-ginou/index.html \
  "特定技能 採用サービス｜BIGLIGHT株式会社" \
  "特定技能外国人材の採用をワンストップで。制度の仕組み（育成就労→特定技能1号→2号）、企業様のメリット、対応分野までBIGLIGHTがご支援します。" \
  "/service/tokutei-ginou/" \
  intro-tokutei.html w-tokutei.html tokutei-rso.html tokutei-solution.html cta.html nn-tokutei.html

# SERVICE: 技人国
crumb "技人国 人材紹介" "/service/jinzai-shoukai/"
build service/jinzai-shoukai/index.html \
  "技人国 人材紹介サービス｜BIGLIGHT株式会社" \
  "技術・人文知識・国際業務（技人国）の高度・専門人材をご紹介。エンジニア・設計・品質管理・通訳など、高精度マッチングで最適な人材をお繋ぎします。" \
  "/service/jinzai-shoukai/" \
  jinzai-body.html cta.html nn-jinzai.html

# SERVICE: 定着支援
crumb "定着・生活支援" "/service/teichaku/"
build service/teichaku/index.html \
  "定着・生活支援｜BIGLIGHT株式会社" \
  "在留資格手続き、寮・生活サポート、入社後フォローまで。外国人材が長く活躍できる定着支援で、企業様の「続かない」を解決します。" \
  "/service/teichaku/" \
  intro-teichaku.html soldetail.html cta.html nn-teichaku.html

# FLOW
crumb "導入の流れ" "/flow/"
build flow/index.html \
  "ご利用の流れ｜BIGLIGHT株式会社" \
  "ご相談から入社後の定着支援まで、5つのステップでわかりやすくご案内します。外国人材採用の流れはBIGLIGHTにお任せください。" \
  "/flow/" \
  flow.html flow-link.html cta.html nn-flow.html

# CASE
crumb "導入事例" "/case/"
build case/index.html \
  "導入事例｜BIGLIGHT株式会社" \
  "製造業・建設業など、BIGLIGHTがご支援した外国人材採用の導入事例をご紹介。人手不足の解消や売上成長につながった企業様の声を掲載しています。" \
  "/case/" \
  case.html cta.html nn-case.html

# RECRUIT
crumb "採用情報" "/recruit/"
build recruit/index.html \
  "採用情報・先輩の声｜BIGLIGHT株式会社" \
  "BIGLIGHTで一緒に働く仲間を募集しています。会社文化、募集要項、先輩社員インタビューを掲載。若く国際的なチームで成長できる環境です。" \
  "/recruit/" \
  recruit-hero.html culture.html recruit-detail.html senpai.html nn-recruit.html

# FAQ (FAQPage JSON-LD)
crumb "よくある質問" "/faq/"
JSONLD="$JSONLD"'<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"技能実習と特定技能の違いは何ですか？","acceptedAnswer":{"@type":"Answer","text":"技能実習は技能・知識を学ぶことを目的とした制度、特定技能は人手不足分野で即戦力となる外国人材を受け入れる制度です。現在は育成就労から特定技能へステップアップできる仕組みへ移行しています。"}},{"@type":"Question","name":"特定技能外国人を採用するにはどのくらい時間がかかりますか？","acceptedAnswer":{"@type":"Answer","text":"国内在住者は約1〜3ヶ月、海外からの採用は約3〜6ヶ月が一般的です。職種や在留資格の状況により異なります。"}},{"@type":"Question","name":"日本語能力はどの程度ありますか？","acceptedAnswer":{"@type":"Answer","text":"特定技能外国人は日本語試験および技能試験に合格した人材で、日常業務に必要なコミュニケーション能力を有しています。"}},{"@type":"Question","name":"どのような業種で採用できますか？","acceptedAnswer":{"@type":"Answer","text":"製造業・建設業・食品製造業・外食業など、特定技能制度で認められている分野で採用が可能です。"}},{"@type":"Question","name":"特定技能外国人は何年間働くことができますか？","acceptedAnswer":{"@type":"Answer","text":"特定技能1号は最長5年間就労可能で、要件を満たせば特定技能2号へ移行できます。"}},{"@type":"Question","name":"採用後の生活サポートは必要ですか？","acceptedAnswer":{"@type":"Answer","text":"受け入れ企業には支援義務があります。BIGLIGHTでは生活支援や各種手続きもサポートします。"}},{"@type":"Question","name":"まずは相談だけでも可能ですか？","acceptedAnswer":{"@type":"Answer","text":"もちろん可能です。人材不足や採用計画に関するご相談だけでもお気軽にお問い合わせください。"}}]}</script>'
build faq/index.html \
  "よくあるご質問｜BIGLIGHT株式会社" \
  "特定技能・外国人材採用に関するよくあるご質問にお答えします。採用期間、日本語能力、対応業種、生活サポート、転職の可否などを掲載。" \
  "/faq/" \
  faq.html cta.html nn-faq.html

# NEWS
crumb "お知らせ" "/news/"
build news/index.html \
  "お知らせ・HR Magazine｜BIGLIGHT株式会社" \
  "BIGLIGHTからのお知らせや、外国人材採用に役立つ情報（HR Magazine）をお届けします。" \
  "/news/" \
  news.html cta.html nn-news.html

# CONTACT
crumb "お問い合わせ" "/contact/"
build contact/index.html \
  "お問い合わせ・無料相談｜BIGLIGHT株式会社" \
  "外国人材採用のご相談・資料請求はこちら。最短即日でご返信します。お電話（052-908-7944）でもお気軽にどうぞ。" \
  "/contact/" \
  contact.html company.html

# PRIVACY
crumb "プライバシーポリシー" "/privacy/"
build privacy/index.html \
  "プライバシーポリシー｜BIGLIGHT株式会社" \
  "BIGLIGHT株式会社の個人情報保護方針（プライバシーポリシー）です。" \
  "/privacy/" \
  privacy-page.html

# ---------- 5) 404 ----------
JSONLD=""; CRUMB=""
build 404.html \
  "ページが見つかりません｜BIGLIGHT株式会社" \
  "お探しのページは見つかりませんでした。" \
  "/404.html" \
  intro-404.html 2>/dev/null || true

# ---------- 6) sitemap.xml + robots.txt ----------
TODAY="2026-06-21"
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  for u in "/" "/about/" "/service/tokutei-ginou/" "/service/jinzai-shoukai/" "/service/teichaku/" "/flow/" "/case/" "/recruit/" "/faq/" "/news/" "/contact/" "/privacy/"; do
    pr="0.7"; [ "$u" = "/" ] && pr="1.0"
    echo "  <url><loc>https://biglight.jp${u}</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>${pr}</priority></url>"
  done
  echo '</urlset>'
} > sitemap.xml

cat > robots.txt <<'EOF'
User-agent: *
Allow: /

Sitemap: https://biglight.jp/sitemap.xml
EOF

echo "BUILD DONE"
