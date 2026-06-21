#!/usr/bin/env bash
# Generator: tách biglight-demo.html thành site nhiều trang chuẩn SEO.
set -e
cd "$(dirname "$0")"
SRC=biglight-demo.html
P=_partials
mkdir -p "$P" service/tokutei-ginou service/jinzai-shoukai service/teichaku flow case about recruit faq news contact privacy

# ---------- 1) Tách fragment từ file gốc ----------
ex(){ sed -n "$1,$2p" "$SRC" > "$P/$3"; }
ex 646 659  preloader.html
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
ex 1509 1524 contact.html
ex 1526 1587 modal-privacy.html
ex 1711 1736 modal-download.html
ex 1535 1585 privacy-body.html

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
  <h6>会社情報</h6>
  <a href="/about/#mv">理念（Mission / Vision）</a>
  <a href="/about/#message">代表メッセージ</a>
  <a href="/#strength">選ばれる理由</a>
  <a href="/about/#history">沿革</a>
  <a href="/about/#company">会社概要</a>
  <h6>サービス</h6>
  <a href="/service/tokutei-ginou/">特定技能 採用サービス</a>
  <a href="/service/jinzai-shoukai/">技人国 人材紹介</a>
  <a href="/service/teichaku/">定着・生活支援</a>
  <a href="/flow/">導入の流れ</a>
  <a href="/case/">導入事例</a>
  <a href="/faq/">よくある質問</a>
  <a href="/news/">お知らせ</a>
  <h6>採用情報</h6>
  <a href="/recruit/">採用トップ</a>
  <a href="/recruit/#culture">会社文化</a>
  <a href="/recruit/#senpai">先輩の声</a>
  <h6>お問い合わせ</h6>
  <a href="/contact/">無料相談</a>
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
intro intro-tokutei.html "Service" "特定技能 採用サービス" "製造・建設・介護・外食など人手不足の現場へ。即戦力となる特定技能外国人材を、募集から採用・入社・定着までワンストップでご支援します。"
intro intro-jinzai.html  "Service" "技人国 人材紹介サービス" "技術・人文知識・国際業務（技人国）など、専門・高度人材をご紹介。高精度マッチングで企業様に最適な人材をお繋ぎします。"
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

# ---------- 4) Tạo các trang ----------
# HOME (Organization + WebSite JSON-LD)
JSONLD='<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"BIGLIGHT株式会社","alternateName":"ビッグライト","url":"https://biglight.jp/","logo":"https://biglight.jp/assets/logo.png","email":"admin@biglight.jp","telephone":"+81-52-908-7944","address":{"@type":"PostalAddress","postalCode":"462-0007","addressRegion":"愛知県","addressLocality":"名古屋市北区","streetAddress":"如意一丁目112 A","addressCountry":"JP"},"areaServed":"JP","description":"特定技能・技人国の外国人材を、採用から定着までワンストップでご支援する登録支援機関。"}</script>'
CRUMB=""
build index.html \
  "BIGLIGHT株式会社｜特定技能・技人国の外国人材紹介・定着支援【名古屋】" \
  "BIGLIGHT株式会社は、特定技能・技人国の外国人材を、採用から定着までワンストップでご紹介。完全成功報酬・最長1年保証、登録支援機関として名古屋・東海エリアの企業様を伴走支援します。" \
  "/" \
  hero.html issues.html solband.html home-service.html strength.html stats.html news.html cta.html

# ABOUT
crumb "会社概要" "/about/"
build about/index.html \
  "会社概要・代表メッセージ・沿革｜BIGLIGHT株式会社" \
  "BIGLIGHT株式会社の理念・代表メッセージ・沿革・会社概要をご紹介します。外国人材と企業をつなぐ架け橋として、採用から定着まで伴走します。" \
  "/about/" \
  mv.html message.html history.html company.html

# SERVICE: 特定技能
crumb "特定技能 採用サービス" "/service/tokutei-ginou/"
build service/tokutei-ginou/index.html \
  "特定技能 採用サービス｜BIGLIGHT株式会社" \
  "特定技能外国人材の採用をワンストップで。制度の仕組み（育成就労→特定技能1号→2号）、企業様のメリット、対応分野までBIGLIGHTがご支援します。" \
  "/service/tokutei-ginou/" \
  intro-tokutei.html w-tokutei.html cta.html

# SERVICE: 技人国
crumb "技人国 人材紹介" "/service/jinzai-shoukai/"
build service/jinzai-shoukai/index.html \
  "技人国 人材紹介サービス｜BIGLIGHT株式会社" \
  "技術・人文知識・国際業務（技人国）の高度・専門人材をご紹介。エンジニア・設計・品質管理・通訳など、高精度マッチングで最適な人材をお繋ぎします。" \
  "/service/jinzai-shoukai/" \
  intro-jinzai.html w-jinzai.html cta.html

# SERVICE: 定着支援
crumb "定着・生活支援" "/service/teichaku/"
build service/teichaku/index.html \
  "定着・生活支援｜BIGLIGHT株式会社" \
  "在留資格手続き、寮・生活サポート、入社後フォローまで。外国人材が長く活躍できる定着支援で、企業様の「続かない」を解決します。" \
  "/service/teichaku/" \
  intro-teichaku.html soldetail.html cta.html

# FLOW
crumb "導入の流れ" "/flow/"
build flow/index.html \
  "ご利用の流れ｜BIGLIGHT株式会社" \
  "ご相談から入社後の定着支援まで、5つのステップでわかりやすくご案内します。外国人材採用の流れはBIGLIGHTにお任せください。" \
  "/flow/" \
  flow.html cta.html

# CASE
crumb "導入事例" "/case/"
build case/index.html \
  "導入事例｜BIGLIGHT株式会社" \
  "製造業・建設業など、BIGLIGHTがご支援した外国人材採用の導入事例をご紹介。人手不足の解消や売上成長につながった企業様の声を掲載しています。" \
  "/case/" \
  case.html cta.html

# RECRUIT
crumb "採用情報" "/recruit/"
build recruit/index.html \
  "採用情報・先輩の声｜BIGLIGHT株式会社" \
  "BIGLIGHTで一緒に働く仲間を募集しています。会社文化、募集要項、先輩社員インタビューを掲載。若く国際的なチームで成長できる環境です。" \
  "/recruit/" \
  recruit-hero.html culture.html recruit-detail.html senpai.html

# FAQ (FAQPage JSON-LD)
crumb "よくある質問" "/faq/"
JSONLD="$JSONLD"'<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"技能実習と特定技能の違いは何ですか？","acceptedAnswer":{"@type":"Answer","text":"技能実習は技能・知識を学ぶことを目的とした制度、特定技能は人手不足分野で即戦力となる外国人材を受け入れる制度です。現在は育成就労から特定技能へステップアップできる仕組みへ移行しています。"}},{"@type":"Question","name":"特定技能外国人を採用するにはどのくらい時間がかかりますか？","acceptedAnswer":{"@type":"Answer","text":"国内在住者は約1〜3ヶ月、海外からの採用は約3〜6ヶ月が一般的です。職種や在留資格の状況により異なります。"}},{"@type":"Question","name":"日本語能力はどの程度ありますか？","acceptedAnswer":{"@type":"Answer","text":"特定技能外国人は日本語試験および技能試験に合格した人材で、日常業務に必要なコミュニケーション能力を有しています。"}},{"@type":"Question","name":"どのような業種で採用できますか？","acceptedAnswer":{"@type":"Answer","text":"製造業・建設業・食品製造業・外食業など、特定技能制度で認められている分野で採用が可能です。"}},{"@type":"Question","name":"特定技能外国人は何年間働くことができますか？","acceptedAnswer":{"@type":"Answer","text":"特定技能1号は最長5年間就労可能で、要件を満たせば特定技能2号へ移行できます。"}},{"@type":"Question","name":"採用後の生活サポートは必要ですか？","acceptedAnswer":{"@type":"Answer","text":"受け入れ企業には支援義務があります。BIGLIGHTでは生活支援や各種手続きもサポートします。"}},{"@type":"Question","name":"まずは相談だけでも可能ですか？","acceptedAnswer":{"@type":"Answer","text":"もちろん可能です。人材不足や採用計画に関するご相談だけでもお気軽にお問い合わせください。"}}]}</script>'
build faq/index.html \
  "よくあるご質問｜BIGLIGHT株式会社" \
  "特定技能・外国人材採用に関するよくあるご質問にお答えします。採用期間、日本語能力、対応業種、生活サポート、転職の可否などを掲載。" \
  "/faq/" \
  faq.html cta.html

# NEWS
crumb "お知らせ" "/news/"
build news/index.html \
  "お知らせ・HR Magazine｜BIGLIGHT株式会社" \
  "BIGLIGHTからのお知らせや、外国人材採用に役立つ情報（HR Magazine）をお届けします。" \
  "/news/" \
  news.html cta.html

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
