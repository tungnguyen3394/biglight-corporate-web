// Bước SEO cho bản xuất: URL sạch, canonical, OGP, dữ liệu cấu trúc (JSON-LD), lazy-load ảnh, sitemap, robots, 404.
// Gọi từ build.cjs: require('./seo.cjs')(pages, {OUT, SITE, news, ARTICLES})
const fs = require('fs'); const path = require('path');

const ORG = {
  '@type': ['Organization', 'EmploymentAgency'],
  '@id': 'https://biglight.jp/#org',
  name: 'BIGLIGHT株式会社',
  alternateName: ['BIGLIGHT', 'ビッグライト'],
  url: 'https://biglight.jp/',
  logo: 'https://biglight.jp/img/logo.png',
  image: 'https://biglight.jp/img/ogp.jpg',
  telephone: '+81-52-908-7944',
  faxNumber: '+81-52-908-7267',
  foundingDate: '2021-08-12',
  address: { '@type': 'PostalAddress', postalCode: '462-0007', addressRegion: '愛知県', addressLocality: '名古屋市北区', streetAddress: '如意一丁目112 A', addressCountry: 'JP' },
  areaServed: ['JP'],
  knowsAbout: ['特定技能', '技術・人文知識・国際業務', '登録支援機関', '外国人材紹介'],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: '有料職業紹介事業許可番号 23-ユ-302414' },
    { '@type': 'EducationalOccupationalCredential', name: '登録支援機関登録番号 21登-006596' },
  ],
  subOrganization: { '@type': 'Organization', name: 'BIGLIGHT HR JOINT STOCK COMPANY', address: { '@type': 'PostalAddress', addressLocality: 'Ho Chi Minh City', addressCountry: 'VN' } },
};
const WEBSITE = { '@type': 'WebSite', '@id': 'https://biglight.jp/#website', url: 'https://biglight.jp/', name: 'BIGLIGHT株式会社', inLanguage: 'ja', publisher: { '@id': 'https://biglight.jp/#org' } };

// tên hiển thị cho breadcrumb theo đoạn URL
const CRUMB = {
  about: '私たちについて', message: '代表メッセージ', company: '会社概要', sdgs: 'SDGsへの取り組み', strength: '選ばれる理由',
  service: '事業内容', 'tokutei-ginou': '特定技能 採用支援', engineer: '技人国 人材紹介', field: '対応分野',
  kogyo: '工業製品製造業', kensetsu: '建設業', inshoku: '飲食料品製造業', gaishoku: '外食業',
  product: 'アプリ', news: 'お知らせ', recruit: '採用情報', contact: 'お問い合わせ', download: '資料ダウンロード', case: '導入事例',
};


// Tiêu đề + mô tả cho Google (mô tả 80〜120 ký tự, có từ khoá 特定技能・技人国・名古屋・登録支援機関)
const OG_HOME = {
  title: 'BIGLIGHT（ビッグライト）株式会社',
  desc: '設立5年目のスタートアップ企業。BIGLIGHT株式会社は、日本で働く多国籍の人材を支え、日本企業へのご紹介から入社後の定着までを一貫してサポートする人材サービス会社です。',
};
const META = {
  '': ['BIGLIGHT株式会社｜特定技能・技人国の外国人材紹介・登録支援機関【名古屋】', 'BIGLIGHT株式会社は、特定技能・技人国の外国人材を採用から定着までワンストップで支援する名古屋の登録支援機関です。完全成功報酬・最長1年保証。製造・建設・食品・外食分野の採用に強みがあります。'],
  'about/': ['私たちについて（ミッション・ビジョン・バリュー）｜BIGLIGHT株式会社', '「日本の成長を、もっとグローバルに。」をミッションに、名古屋から外国人材と日本企業をつなぐBIGLIGHTの理念と、全員が大切にする5つの価値観 F.I.R.S.T. をご紹介します。'],
  'about/message/': ['代表メッセージ｜BIGLIGHT株式会社', '代表取締役 グエン・タン・トゥンからのご挨拶。ベトナム出身の代表が、外国人材と日本企業の架け橋として、採用前のご相談から入社後の定着まで伴走するBIGLIGHTの想いをお伝えします。'],
  'about/company/': ['会社概要・沿革｜BIGLIGHT株式会社（名古屋市北区）', 'BIGLIGHT株式会社の会社概要と沿革。愛知県名古屋市北区の有料職業紹介事業者（23-ユ-302414）・登録支援機関（21登-006596）です。ベトナム・ホーチミン市に子会社があります。'],
  'about/sdgs/': ['SDGsへの取り組み｜BIGLIGHT株式会社', '外国人材と企業をつなぐ事業を通じて、働きがいと経済成長、不平等の是正、デジタル化による環境負荷の低減に取り組む、BIGLIGHT株式会社のSDGsへの取り組みをご紹介します。'],
  'about/strength/': ['選ばれる理由・実績｜BIGLIGHT株式会社', '高精度マッチング、完全成功報酬×最長1年保証、採用から定着までワンストップ。人材紹介実績500名以上・取引企業80社以上・定着率90%。BIGLIGHTが選ばれる3つの理由です。'],
  'service/': ['事業内容｜特定技能・技人国の外国人材紹介｜BIGLIGHT株式会社', '名古屋の登録支援機関BIGLIGHTの事業内容。特定技能外国人の採用支援と、技術・人文知識・国際業務（技人国）の人材紹介を、完全成功報酬・最長1年保証でご提供します。'],
  'service/tokutei-ginou/': ['特定技能の採用支援・登録支援機関｜BIGLIGHT株式会社（名古屋）', '特定技能とは？1号・2号の違いや技能実習・育成就労との制度比較から、採用、在留資格の手続き、義務的支援10項目の代行まで。名古屋の登録支援機関BIGLIGHTが一貫してご支援します。'],
  'service/engineer/': ['技人国（技術・人文知識・国際業務）の人材紹介｜BIGLIGHT株式会社', '技術・人文知識・国際業務（技人国）ビザの要件・在留期間・特定技能との違いを解説。エンジニア、機械設計、通訳・翻訳、貿易事務などの専門人材を完全成功報酬でご紹介します。'],
  'case/': ['導入事例｜特定技能の採用・定着支援の事例｜BIGLIGHT株式会社', '愛知県の溶接・鉄骨加工会社、東京都の内装仕上げ工事会社など、特定技能外国人の採用から定着までをBIGLIGHTがご支援した企業様の事例と、ご担当者様の声をご紹介します。'],
  'product/': ['アプリ（BIGLIGHT ポータル・アカデミー・JOB）｜BIGLIGHT株式会社', '企業と外国人材の手続き・連絡をひとつにまとめる「BIGLIGHT ポータル」、特定技能試験対策の「アカデミー」、特定技能専門の求人サイト「JOB」。App Store・Google Playで配信中です。'],
  'news/': ['お知らせ・HR Magazine｜外国人採用コラム｜BIGLIGHT株式会社', 'BIGLIGHTからのお知らせと、特定技能・外国人採用に役立つHR Magazine。制度改正の最新情報、分野別の採用ノウハウ、定着支援の実務をわかりやすく解説します。'],
  'recruit/': ['採用情報｜外国人材と企業をつなぐ仕事｜BIGLIGHT株式会社（名古屋）', '外国人材と日本企業をつなぐ仕事を、BIGLIGHTで。法人営業・ルート営業・外国人管理支援スタッフを名古屋本社で募集しています。会社文化、先輩の声、募集要項をご紹介します。'],
  'contact/': ['お問い合わせ・無料相談｜BIGLIGHT株式会社', '特定技能・技人国の外国人材採用、登録支援機関への支援委託のご相談はこちら。採用人数や時期が未定でも無料でご相談いただけます。TEL 052-908-7944（平日9:00〜18:00）'],
  'download/': ['会社資料ダウンロード｜BIGLIGHT株式会社', 'BIGLIGHTのサービス内容・料金体系・支援の流れ・導入事例をまとめた会社資料（PDF）を無料でダウンロードいただけます。特定技能・技人国の外国人材採用をご検討中の企業様へ。'],
};
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const strip = (h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

module.exports = function seo(pages, { OUT, SITE, ARTICLES, WEBP = {} }) {
  const webp = (x) => { for (const [a, b] of Object.entries(WEBP)) x = x.split(a).join(b); return x; };
  const ver = {};
  for (const f of ['css/site.css', 'js/site.js']) { const p = path.join(OUT, f); const c = webp(fs.readFileSync(p, 'utf8')); fs.writeFileSync(p, c); ver[f] = require('crypto').createHash('md5').update(c).digest('hex').slice(0, 8); }
  const urls = [];
  for (const [f, raw] of Object.entries(pages)) {
    let html = raw;
    if (f === '404.html') { html = html.replace('<!--SEO-->', '<meta name="robots" content="noindex">'); fs.writeFileSync(path.join(OUT, f), html); continue; }
    const dir = f.replace(/index\.html$/, '');
    const url = SITE + '/' + dir;
    let title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || 'BIGLIGHT株式会社';
    let desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    if (META[dir]) [title, desc] = META[dir];
    else if (desc.length < 70) { const lead = (html.match(/<p class="lead16">([\s\S]*?)<\/p>/) || [])[1]; if (lead) { const d = strip(lead); desc = d.length > 120 ? d.slice(0, 118) + '…' : d; } }
    html = html.replace(/<title>[^<]*<\/title>/, '<title>' + esc(title) + '</title>').replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + esc(desc) + '">');
    const slug = (dir.match(/^news\/([^/]+)\/$/) || [])[1];
    const art = slug && ARTICLES[slug];
    const ogImg = art ? `${SITE}/img/${art.img}` : `${SITE}/img/ogp.jpg`;
    // Link Preview (LINE / Slack / Facebook…): trang chủ dùng kiểu Guidable — tên công ty + câu giới thiệu
    const [ogT, ogD] = dir === '' ? [OG_HOME.title, OG_HOME.desc] : [title, desc];

    html = webp(html).replace('__CSSV__', ver['css/site.css']).replace('__JSV__', ver['js/site.js']);
    // link ngoài → tab mới
    html = html.replace(/<a ([^>]*?)href="(https?:\/\/(?!(?:new\.)?biglight\.jp)[^"]+)"(?![^>]*target=)/g, '<a $1href="$2" target="_blank" rel="noopener"');
    // 1) URL sạch: ".../index.html" → ".../"
    html = html.replace(/(href=")([^"#]*?)index\.html(#[^"]*)?"/g, (m, a, p, h) => `${a}${p || './'}${h || ''}"`);

    // 2) JSON-LD
    const graph = [ORG, WEBSITE];
    const segs = dir.split('/').filter(Boolean);
    const page = { '@type': art ? 'Article' : 'WebPage', '@id': url + '#page', url, name: title, description: desc, inLanguage: 'ja', isPartOf: { '@id': 'https://biglight.jp/#website' }, publisher: { '@id': 'https://biglight.jp/#org' } };
    if (art) Object.assign(page, { headline: art.title, image: ogImg, datePublished: art.date.replace(/\./g, '-'), author: { '@type': 'Organization', name: 'BIGLIGHT編集部' }, mainEntityOfPage: url });
    graph.push(page);
    if (segs.length) {
      const items = [{ '@type': 'ListItem', position: 1, name: 'ホーム', item: SITE + '/' }];
      let acc = '';
      segs.forEach((s, i) => {
        acc += s + '/';
        if (s === 'field') return; // /service/field/ không có trang riêng
        const name = i === segs.length - 1 ? (art ? art.title : (CRUMB[s] || title.split('｜')[0])) : (CRUMB[s] || s);
        items.push({ '@type': 'ListItem', position: items.length + 1, name, item: SITE + '/' + acc });
      });
      graph.push({ '@type': 'BreadcrumbList', itemListElement: items });
    }
    // FAQ có trên trang → FAQPage
    const qa = [...html.matchAll(/<details><summary><b>Q<\/b><span>([\s\S]*?)<\/span><i><\/i><\/summary><div class="ans"><b>A<\/b><div>([\s\S]*?)<\/div><\/div><\/details>/g)];
    if (qa.length) graph.push({ '@type': 'FAQPage', mainEntity: qa.map(([, q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });
    const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });

    // 3) thẻ head
    const head = [
      `<link rel="canonical" href="${url}">`,
      `<meta property="og:site_name" content="BIGLIGHT株式会社">`,
      `<meta property="og:type" content="${art ? 'article' : (dir ? 'website' : 'website')}">`,
      `<meta property="og:title" content="${esc(ogT)}">`,
      `<meta property="og:description" content="${esc(ogD)}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:image" content="${ogImg}">`,
      `<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">`,
      `<meta property="og:locale" content="ja_JP">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="format-detection" content="telephone=no">`,
      `<script type="application/ld+json">${ld.replace(/</g, '\\u003c')}</script>`,
    ].join('\n');
    html = html.replace('<!--SEO-->', head);

    // 4) ảnh ngoài màn hình đầu: lazy-load + decode async (ảnh hero giữ tải ngay)
    const heroEnd = html.indexOf('</section>', html.indexOf('<section class="hero">'));
    html = html.replace(/<img (?![^>]*loading=)/g, (m, off) => (html.indexOf('<section class="hero">') >= 0 && off < heroEnd) ? '<img decoding="async" ' : '<img loading="lazy" decoding="async" ');

    fs.mkdirSync(path.dirname(path.join(OUT, f)), { recursive: true });
    fs.writeFileSync(path.join(OUT, f), html);
    urls.push({ loc: url, pri: dir === '' ? '1.0' : (segs.length === 1 ? '0.8' : '0.6'), lastmod: art ? art.date.replace(/\./g, '-') : new Date().toISOString().slice(0, 10) });
  }

  // 5) sitemap + robots (bản chính thức; bản xem trước bị chặn bằng X-Robots-Tag ở Caddy)
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.pri}</priority></url>`).join('\n') + `\n</urlset>\n`);
  fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  return urls.length;
};
