// 特定技能ガイド /guide/tokutei-ginou/ (CEO 2026-11-01): 24 trang A4 ngang, ít chữ, mỗi trang 1 câu hỏi + 1 sơ đồ. Cùng thiết kế 会社案内.
// Một nguồn, hai hình thức: trang web này + PDF /assets/biglight-tokutei-guide.pdf (deploy-new.yml in trang này bằng Chrome).
// Chỉ gửi bằng link: không vào menu, noindex + ngoài sitemap (seo.cjs NOINDEX). Không ghi số tiền (xem 料金リンク).
// Nguồn: 制度概要 (令和8年9月29日更新) + 運用要領 (令和8年10月). Rà lại trước 2027-04-01 (育成就労・2号 B1 có hiệu lực).
const TG_CSS = `<style>
.tg-root0{--ln:#e0e0e0;--ink:#202020;--ink2:#444;--grey:#737373;--navy:#0b3d91;--blue:#1e6fd6;--gold:#f5a623;--gold-l:#ffcb05;--gold-d:#c47d00;--tn:#eaf1fb;--tg:#fff5e0;padding:56px 0 120px}
.tg-bar{padding-bottom:40px;border-bottom:1px solid var(--ln);margin-bottom:40px}
.tg-stack{display:grid;gap:32px}
.tg-sh{position:relative;width:100%;aspect-ratio:1200/848;overflow:hidden;border:1px solid var(--ln);background:#fff}
.tg-pg{width:1200px;height:848px;position:absolute;left:0;top:0;transform-origin:0 0;transform:scale(var(--tg-s,1));padding:48px 72px;overflow:hidden;color:var(--ink);font-size:17px;line-height:1.7;background:#fff}
.tg-pg *{min-width:0;box-sizing:border-box}
.tg-pg ul{list-style:none;margin:0;padding:0}.tg-pg p{margin:0}.tg-pg em{font-style:normal}
.tg-dots{display:flex;gap:14px}.tg-dots i{width:7px;height:7px;border-radius:50%;display:block}
.tg-dots i:nth-child(1){background:var(--gold-l)}.tg-dots i:nth-child(2){background:var(--gold)}.tg-dots i:nth-child(3){background:var(--blue)}.tg-dots i:nth-child(4){background:var(--navy)}
.tg-pn{position:absolute;left:72px;right:72px;bottom:26px;display:flex;justify-content:space-between;align-items:center;font:500 10.5px/1 Roboto,sans-serif;letter-spacing:.16em;color:var(--grey)}
.tg-rail{display:flex;gap:8px;font-size:12.5px;font-weight:700;letter-spacing:.08em;line-height:1;margin-bottom:22px}
.tg-rail span{padding:8px 14px;border-radius:16px;background:#f3f3f3;color:#9a9a9a}.tg-rail span.on{background:var(--navy);color:#fff}
.tg-pg h2.tg-q{font-size:34px;font-weight:700;letter-spacing:.04em;line-height:1.4;margin:0}.tg-q0{margin-top:6px!important}
.tg-a{font-size:19px;color:var(--ink2);letter-spacing:.03em;margin-top:8px!important}.tg-a b{color:var(--navy)}
.tg-body{margin-top:26px}
.tg-note{font-size:13px;color:var(--grey);margin-top:14px!important;line-height:1.7}
.tg-c{width:44px;height:44px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font:700 17px/1 Roboto,sans-serif;flex:none}
.tg-res{margin-top:26px;background:var(--navy);color:#fff;border-radius:8px;text-align:center;font-size:21px;font-weight:700;letter-spacing:.05em;padding:20px}
.tg-res2{background:var(--tn);color:var(--navy);font-size:18px;padding:16px;margin-top:20px}
.tg-3c{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:20px}
.tg-3c span{background:#f5f6f8;border-radius:8px;padding:12px 18px;font-size:17px;font-weight:700;display:flex;gap:14px;align-items:center}
.tg-3c b{font-size:13px;color:var(--navy);letter-spacing:.06em}
/* cover */
.tg-logo{display:flex;align-items:center;gap:16px;position:relative;z-index:1}.tg-logo img{height:80px;width:auto}.tg-logo img.tg-lw{height:27px}
.tg-logo-s{gap:12px}.tg-logo-s img{height:52px}.tg-logo-s img.tg-lw{height:18px}
.tg-pg h2.tg-big{font-size:62px;font-weight:700;letter-spacing:.05em;line-height:1.4;margin:112px 0 0;position:relative;z-index:1}
.tg-sub{font-size:21px;color:var(--ink2);margin:14px 0 30px;letter-spacing:.06em;position:relative;z-index:1}
.tg-cover>.tg-dots{gap:24px}.tg-cover>.tg-dots i{width:9px;height:9px}
.tg-asof{position:absolute;left:72px;right:600px;bottom:64px;border-top:1px solid var(--ln);padding-top:20px;font-size:14px;color:var(--ink2);letter-spacing:.05em}
.tg-asof b{display:block;font-size:16px;color:var(--ink)}
.tg-strips{position:absolute;right:0;top:0;width:560px;height:848px;overflow:hidden}
.tg-strips i{position:absolute;width:240px;display:block;clip-path:polygon(110px 0,100% 0,calc(100% - 110px) 100%,0 100%)}
.tg-strips i:nth-child(1){left:70px;top:-40px;height:620px;background:var(--gold)}.tg-strips i:nth-child(2){left:230px;top:120px;height:728px;background:var(--blue)}.tg-strips i:nth-child(3){left:390px;top:-40px;height:888px;background:var(--navy)}
.tg-strips span{position:absolute;right:44px;top:72px;writing-mode:vertical-rl;font:500 11px/1 Roboto,sans-serif;letter-spacing:.3em;color:#fff}
/* toc */
.tg-toc{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-top:36px}
.tg-toc>div{background:var(--tn);border-radius:10px;padding:26px 20px;min-height:468px}
.tg-toc b{display:block;font-size:24px;margin-top:16px;letter-spacing:.04em}.tg-toc em{display:block;font-size:15px;font-weight:700;color:var(--navy);line-height:1.6;margin-top:6px;min-height:50px}
.tg-toc ul{margin-top:26px!important;font-size:18px;line-height:2.4;color:var(--ink2)}
.tg-tocb{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}.tg-tocb span{background:#f5f6f8;border-radius:8px;text-align:center;font-weight:700;padding:13px}
/* nums */
.tg-nums{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;margin-top:72px}
.tg-num{white-space:nowrap;font:700 88px/1 Roboto,sans-serif;color:var(--navy)}.tg-num small{font-size:24px;color:var(--gold-d);margin-left:4px;font-family:"Noto Sans JP",sans-serif}
.tg-nums i{display:block;width:40px;height:3px;background:var(--gold);margin:16px 0 12px}.tg-nums p{font-size:17px;color:var(--ink2)}
.tg-nums3{grid-template-columns:repeat(3,1fr);margin-top:40px}
.tg-flow5{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-top:92px}
.tg-flow5>div{background:var(--tn);color:var(--navy);text-align:center;padding:30px 8px;font-size:20px;clip-path:polygon(0 0,calc(100% - 22px) 0,100% 50%,calc(100% - 22px) 100%,0 100%,22px 50%)}
.tg-flow5>div:first-child{clip-path:polygon(0 0,calc(100% - 22px) 0,100% 50%,calc(100% - 22px) 100%,0 100%)}.tg-flow5>div.on{background:var(--navy);color:#fff}
/* stair */
.tg-stair{display:grid;grid-template-columns:1fr 110px 1fr;align-items:end;height:540px}
.tg-st1,.tg-st2{border-radius:12px;padding:26px 32px;display:flex;flex-direction:column;justify-content:flex-end}
.tg-st1{background:var(--tn);height:400px}.tg-st2{background:var(--navy);color:#fff;height:540px}
.tg-sth{font-size:21px;font-weight:700}.tg-sth b{font:700 54px/1.15 Roboto,"Noto Sans JP",sans-serif;margin-left:8px}
.tg-stair dl{display:grid;grid-template-columns:120px 1fr;gap:14px 12px;margin:18px 0 0}.tg-stair dt{font-size:14px;opacity:.72;align-self:center}.tg-stair dd{font-size:23px;font-weight:700;margin:0}
.tg-stup{text-align:center;align-self:center;font-size:15px;font-weight:700;color:var(--gold-d)}.tg-stup:after{content:"→";display:block;font-size:42px;line-height:1.2}
/* compare */
.tg-cmp{display:grid;grid-template-columns:220px repeat(3,1fr);row-gap:0;font-size:18px;text-align:center;border-radius:10px}
.tg-cmp>div{padding:17px 10px;border-bottom:1px solid var(--ln);display:flex;flex-direction:column;justify-content:center;min-height:92px}
.tg-cmp .h{font-weight:700;font-size:19px;border-bottom:0}.tg-cmp .l{text-align:left;font-weight:700;font-size:16px;color:var(--ink2)}
.tg-cmp small{font-size:12.5px;font-weight:400;opacity:.85}.tg-cmp .on{background:var(--tn);font-weight:700;color:var(--navy);border-bottom-color:#d3e1f5}.tg-cmp .h.on{background:var(--navy);color:#fff;border-radius:10px 10px 0 0}
/* fields */
.tg-fields{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.tg-fields span{height:98px;border-radius:8px;display:flex;align-items:center;justify-content:center;text-align:center;font-weight:700;font-size:17px;background:var(--tn);color:var(--navy);padding:6px}
.tg-fields span.f2{background:var(--navy);color:#fff}.tg-fields span.fw{background:#fff;color:var(--grey);border:1.5px dashed #b5b5b5}
.tg-key{display:flex;gap:32px;margin-top:18px;font-size:15px;color:var(--ink2)}.tg-key span{display:flex;gap:8px;align-items:center}.tg-key i{width:16px;height:16px;border-radius:4px;display:block}.k2{background:var(--navy)}.k1{background:var(--tn)}.kw{border:1.5px dashed #b5b5b5}
/* check */
.tg-chk{display:grid;grid-template-columns:repeat(5,1fr);gap:26px;margin-top:10px}
.tg-chk>div{position:relative;background:var(--tn);border-radius:10px;padding:30px 16px;min-height:380px;display:flex;flex-direction:column;align-items:center;text-align:center}
.tg-chk>div:not(:last-child):after{content:"→";position:absolute;right:-22px;top:50%;margin-top:-16px;font-size:20px;color:var(--navy);font-weight:700}
.tg-chk b{font-size:21px;line-height:1.6;margin-top:30px;flex:1}.tg-chk em{font-size:13.5px;color:var(--gold-d);font-weight:700;line-height:1.55}
/* six */
.tg-six{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.tg-six>div{background:var(--tn);border-radius:10px;height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.tg-six b{font-size:26px;color:var(--navy)}.tg-six em{font-size:15px;color:var(--ink2)}
/* pillars */
.tg-rf{background:var(--navy);color:#fff;text-align:center;font-weight:700;font-size:21px;padding:13px;clip-path:polygon(4% 0,96% 0,100% 100%,0 100%)}
.tg-cols{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:12px 0}
.tg-cols>div{background:var(--tn);border-radius:8px;padding:26px 12px;text-align:center;min-height:216px}
.tg-cols b{display:block;font-size:23px;color:var(--navy)}.tg-cols em{display:block;font-size:15.5px;color:var(--ink2);margin-top:12px;line-height:1.6}
.tg-bs{background:var(--tg);border-radius:8px;text-align:center;font-weight:700;font-size:19px;padding:12px}.tg-bs small{display:block;font-size:13.5px;font-weight:400;color:var(--ink2)}
/* tree */
.tg-tree{display:grid;grid-template-columns:150px 1fr;gap:40px;align-items:center}
.tg-root{background:var(--navy);color:#fff;border-radius:50%;width:150px;height:150px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px;position:relative}
.tg-root:after{content:"→";position:absolute;right:-32px;color:var(--navy);font-size:24px}
.tg-brs{display:grid;gap:16px}.tg-br{display:grid;grid-template-columns:178px 1fr;gap:12px;background:var(--tn);border-radius:10px;padding:14px}
.tg-bh{font-weight:700;font-size:20px;color:var(--navy);align-self:center;padding-left:8px}
.tg-lv{display:grid;gap:8px}.tg-lv span{background:#fff;border-radius:6px;padding:17px 18px;font-size:18px;font-weight:700;display:flex;justify-content:space-between;align-items:center}.tg-lv em{font-size:13.5px;color:var(--gold-d)}
/* lane */
.tg-lane{display:grid;grid-template-columns:68px 112px 112px 146px 188px 142px 142px 86px;grid-template-rows:254px 254px;gap:16px 8px;margin-top:10px}
.tg-who{display:flex;align-items:center;justify-content:center;text-align:center;font-weight:700;font-size:16px;color:#fff;background:var(--navy);border-radius:8px;line-height:1.5;grid-column:1}.tg-who.a{grid-row:1}.tg-who.b{grid-row:2}
.tg-m,.tg-s,.tg-n{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-radius:8px;font-size:16px;font-weight:700;line-height:1.55;padding:8px 6px}
.tg-m{grid-row:1/3;background:#f3f5f8}.tg-m.on{background:var(--gold);color:var(--ink);font-size:19px}
.tg-s{background:var(--tn);color:var(--navy);font-size:17px}.tg-s b{font-size:18px}.tg-s em{font-size:12.5px;font-weight:400;color:var(--ink2);margin-top:6px}.tg-n{background:#f3f5f8}
.tg-s.a,.tg-n.a{grid-row:1}.tg-s.b,.tg-n.b{grid-row:2}
.c1{grid-column:2}.c2{grid-column:3}.c3{grid-column:4}.c4{grid-column:5}.c5{grid-column:6}.c6{grid-column:7}.c7{grid-column:8}
/* ox */
.tg-ox{display:grid;grid-template-columns:1fr 1fr;gap:24px}.tg-ox>div{border-radius:10px;padding:28px 34px;min-height:540px}
.tg-ox .o{background:var(--tn)}.tg-ox .x{background:#fdf0ec}
.tg-oh{display:flex;align-items:center;gap:12px;font-size:21px;font-weight:700}.tg-oh i{font:700 34px/1 Roboto,sans-serif;color:var(--navy)}.x .tg-oh i{color:#c0392b}
.tg-ox li{font-size:21px;padding:19px 0;border-bottom:1px solid rgba(0,0,0,.08);line-height:1.5}.tg-ox li:last-child{border-bottom:0}
/* docs */
.tg-docs{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.tg-docs>div{background:var(--tn);border-radius:10px;padding:36px 18px;min-height:340px;text-align:center}
.tg-docs b{display:block;font-size:29px;color:var(--navy)}.tg-docs em{display:block;font-size:18px;color:var(--ink2);margin-top:28px;line-height:1.7}
.tg-who2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px}.tg-who2>div{background:var(--tg);border-radius:8px;padding:30px 28px}.tg-who2 b{display:block;font-size:22px}.tg-who2 span{font-size:18px;color:var(--ink2)}
/* cost */
.tg-cost{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
.tg-ch{background:var(--navy);color:#fff;font-weight:700;font-size:18px;text-align:center;padding:26px 16px;clip-path:polygon(0 0,calc(100% - 18px) 0,100% 50%,calc(100% - 18px) 100%,0 100%,18px 50%)}
.tg-cost>div:first-child .tg-ch{clip-path:polygon(0 0,calc(100% - 18px) 0,100% 50%,calc(100% - 18px) 100%,0 100%)}
.tg-cost ul{padding:12px 16px 0 10px!important}.tg-cost li{background:#f3f5f8;border-radius:6px;padding:26px 12px;margin-bottom:12px;font-size:18px;font-weight:700;text-align:center;line-height:1.5}
/* time */
.tg-tl{display:grid;grid-template-columns:.8fr 1.1fr 1.1fr 1fr;gap:0}
.tg-tl span{background:var(--navy);color:#fff;font-weight:700;text-align:center;padding:20px 18px;font-size:19px;clip-path:polygon(0 0,calc(100% - 16px) 0,100% 50%,calc(100% - 16px) 100%,0 100%,16px 50%)}
.tg-tl span:first-child{clip-path:polygon(0 0,calc(100% - 16px) 0,100% 50%,calc(100% - 16px) 100%,0 100%)}
.tg-tc{display:grid;grid-template-columns:.8fr 1.1fr 1.1fr 1fr;gap:12px;margin-top:16px}
.tg-tc p{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:var(--tn);border-radius:8px;padding:13px 12px;margin-bottom:10px!important;font-size:17.5px;font-weight:700;line-height:1.4;min-height:100px}
.tg-tc p b{width:34px;height:34px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font:700 14px/1 Roboto,sans-serif;flex:none}
.tg-tc small{width:100%;font-size:13px;font-weight:400;color:var(--ink2);padding-left:44px;margin-top:-6px}
/* tri */
.tg-tri{display:grid;grid-template-columns:460px 1fr;gap:32px;align-items:center}.tg-tri svg{width:100%;height:auto;display:block}
.tg-two{display:grid;gap:16px}.tg-two>div{background:#f3f5f8;border-radius:10px;padding:28px 30px}.tg-two .on{background:var(--tn)}.tg-two b{font-size:21px;color:var(--navy)}.tg-two li{font-size:18px;padding:7px 0}
/* cal */
.tg-ms{display:grid;grid-template-columns:120px repeat(12,1fr);text-align:center;font-size:14.5px;font-weight:700;color:var(--ink2);padding-bottom:10px;border-bottom:1px solid var(--ln)}
.tg-cr{display:grid;grid-template-columns:120px 1fr;align-items:center;height:108px;border-bottom:1px solid var(--ln)}.tg-cr>b{font-size:19px}
.tg-gt{display:grid;grid-template-columns:repeat(12,1fr);align-items:center;height:56px}
.tg-gt u{text-decoration:none;background:var(--navy);color:#fff;border-radius:6px;font-size:14.5px;font-weight:700;text-align:center;line-height:56px;white-space:nowrap}
.tg-gt s{text-decoration:none;width:26px;height:26px;border-radius:50%;background:var(--gold);display:block;justify-self:center}
.tg-gt em{background:var(--tn);color:var(--navy);border-radius:6px;font-size:16px;font-weight:700;text-align:center;line-height:56px}
/* ng */
.tg-ng{display:grid;grid-template-columns:420px 1fr;gap:40px;align-items:end}
.tg-ngl{background:#fdf0ec;border-radius:10px;padding:26px 30px;min-height:500px}.tg-ngl b{font-size:21px;color:#c0392b}.tg-ngl li{font-size:19.5px;padding:18px 0;border-bottom:1px solid rgba(0,0,0,.08)}.tg-ngl li:last-child{border-bottom:0}
.tg-lad{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;align-items:end}
.tg-lad>div{border-radius:10px 10px 0 0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;font-size:20px;color:#fff;padding:8px}
.tg-lad .s1{height:190px;background:var(--gold);color:var(--ink)}.tg-lad .s2{height:340px;background:#e0701e}.tg-lad .s3{height:500px;background:#c0392b}.tg-lad em{font-size:15px;margin-top:8px}
/* year */
.tg-yb{display:grid;grid-template-columns:repeat(5,1fr) 1.7fr;text-align:center;font-size:15px;font-weight:700;color:var(--ink2);padding-bottom:10px}.tg-yb b{color:var(--navy)}
.tg-y1{display:grid;grid-template-columns:5fr 1.7fr;position:relative;height:170px}
.tg-y1>div{display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:28px;font-weight:700;background:var(--tn);color:var(--navy);border-radius:10px 0 0 10px}
.tg-y1>div.on{background:var(--navy);color:#fff;border-radius:0 10px 10px 0}.tg-y1 small{font-size:14px;font-weight:400}
.tg-y1 i{position:absolute;left:calc(5/6.7*100% - 74px);top:-13px;width:148px;background:var(--gold);color:var(--ink);text-align:center;border-radius:14px;font-style:normal;font-size:13.5px;font-weight:700;padding:3px;z-index:1}
.tg-yc{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:26px}.tg-yc>div{background:#f3f5f8;border-radius:10px;padding:30px 34px}.tg-yc .on{background:var(--tn)}.tg-yc b{font-size:21px;color:var(--navy)}.tg-yc li{font-size:20px;padding:8px 0}
/* ring */
.tg-ring{display:grid;grid-template-columns:1fr 210px 1fr;grid-template-rows:262px 262px;gap:18px 26px;align-items:center;margin-top:8px}
.tg-ring>div:not(.tg-core){background:var(--tn);border-radius:12px;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.tg-ring b{font-size:30px;color:var(--navy);letter-spacing:.08em}.tg-ring em{font-size:18px;color:var(--ink2);margin-top:6px}
.tg-ring .a{grid-area:1/1}.tg-ring .b{grid-area:1/3}.tg-ring .c{grid-area:2/1}.tg-ring .d{grid-area:2/3}
.tg-core{grid-area:1/2/3/3;align-self:center;justify-self:center;width:190px;height:190px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:700;letter-spacing:.1em}
/* faq */
.tg-faq{display:grid;grid-template-columns:1fr 1fr;gap:18px}.tg-faq>div{background:#f3f5f8;border-radius:10px;padding:26px 30px;min-height:208px}
.tg-fq,.tg-fa{display:grid;grid-template-columns:32px 1fr;gap:6px;align-items:baseline}.tg-fq{font-size:21px;font-weight:700}.tg-fa{font-size:19px;color:var(--ink2);margin-top:12px;line-height:1.7}
.tg-fq b,.tg-fa b{font:700 20px/1 Roboto,sans-serif;color:var(--navy)}.tg-fa b{color:var(--gold-d)}
/* biglight */
.tg-bl{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:30px}.tg-bl>div{background:var(--tn);border-radius:10px;padding:24px;min-height:270px}
.tg-bl b{display:block;font-size:21px;margin-top:14px;color:var(--navy)}.tg-bl em{display:block;font-size:16px;line-height:1.8;color:var(--ink2);margin-top:8px}
/* contact */
.tg-cbox{border:1px solid var(--ink);padding:42px 52px;display:grid;grid-template-columns:1fr auto;align-items:center;gap:40px;margin-top:32px}
.tg-en{font:700 48px/1.2 Roboto,sans-serif;letter-spacing:.1em;text-transform:uppercase}.tg-cbox p{font-size:17px;color:var(--ink2);margin-top:8px!important}
.tg-circ{width:44px;height:44px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px}
.tg-ctel{display:grid;grid-template-columns:1fr 300px;gap:40px;margin-top:36px;align-items:center}.tg-tel{font:700 52px/1 Roboto,sans-serif}.tg-ctel p{font-size:15px;color:var(--ink2);line-height:2;margin-top:12px!important}
.tg-qr{display:grid;grid-template-columns:132px 1fr;gap:16px;align-items:center}.tg-qr img{width:132px;height:132px}.tg-qr p{margin:0!important;font-size:12.5px}.tg-qr p b{display:block;color:var(--navy);font:500 11px/1.6 Roboto,sans-serif;letter-spacing:.1em}
.tg-src{position:absolute;left:72px;right:72px;bottom:58px;border-top:1px solid var(--ln);padding-top:14px;font-size:12px;line-height:1.8;color:var(--grey)}
@media (max-width:700px){.tg-root0{padding:32px 0 80px}.tg-stack{gap:16px}}
@media print{
  @page{size:A4 landscape;margin:0}
  html,body,main{background:#fff!important;margin:0!important;padding:0!important}
  body>*:not(main),main>*:not(.tg-root0),.tg-bar,.ckb{display:none!important}
  .tg-root0{padding:0!important;margin:0!important}.tg-root0>.wrap{max-width:none;padding:0;margin:0}
  .tg-stack{display:block}
  .tg-sh{width:297mm;height:210mm;aspect-ratio:auto;border:0;break-inside:avoid;break-after:page;page-break-after:always}
  .tg-sh:last-child{break-after:auto;page-break-after:auto}
  .tg-pg{position:relative;transform:scale(.93543)!important}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
}
</style>`;
const TG_JS = `<script>(function(){var st=document.querySelector('.tg-stack');if(!st)return;function fit(){var w=st.clientWidth;if(!w)return;st.style.setProperty('--tg-s',Math.min(1,w/1200));}fit();addEventListener('resize',fit);if(window.ResizeObserver)new ResizeObserver(fit).observe(st);})();</script>`;

module.exports = function guide({ page, pageHead, pill, PDF_URL }) {
  const r = '../../';
  const AS_OF = '令和8年11月時点';
  const dots = '<span class="tg-dots"><i></i><i></i><i></i><i></i></span>';
  const STEPS = ['知る', '確かめる', '採用する', '受け入れる', '長く働く'];
  let no = 0;
  const sheet = (cls, inner) => { no += 1; const id = String(no).padStart(2, '0'); return `<div class="tg-sh" id="p${id}"><div class="tg-pg${cls ? ' ' + cls : ''}">${inner}</div></div>`; };
  const foot = (t) => `<div class="tg-pn"><span>${String(no + 1).padStart(2, '0')}</span>${dots}<span>${t}</span></div>`;
  const rail = (i) => i < 0 ? '' : `<div class="tg-rail">${STEPS.map((s, k) => `<span class="${k === i ? 'on' : ''}">${s}</span>`).join('')}</div>`;
  // Trang chuẩn: thanh 5 bước + câu hỏi + 1 dòng trả lời + sơ đồ
  const pg = (i, q, a, body) => sheet('', `${rail(i)}<h2 class="tg-q">${q}</h2>${a ? `<p class="tg-a">${a}</p>` : ''}<div class="tg-body">${body}</div>${foot('特定技能ガイド')}`);
  const faq = (items) => `<div class="tg-faq">${items.map(([q, a]) => `<div><div class="tg-fq"><b>Q</b>${q}</div><div class="tg-fa"><b>A</b>${a}</div></div>`).join('')}</div>`;

  const sheets = [
    // 表紙
    sheet('tg-cover', `
      <div class="tg-logo"><img src="${r}img/mark.png" alt="" width="1014" height="971"><img class="tg-lw" src="${r}img/wordmark.png" alt="BIGLIGHT株式会社" width="1014" height="175"></div>
      <h2 class="tg-big">特定技能ガイド</h2>
      <div class="tg-sub">はじめての外国人採用を、図でわかりやすく。</div>
      ${dots}
      <div class="tg-asof"><b>企業のご担当者さま向け</b>${AS_OF}　BIGLIGHT株式会社</div>
      <div class="tg-strips" aria-hidden="true"><i></i><i></i><i></i><span>SPECIFIED SKILLED WORKER GUIDE</span></div>`),

    // もくじ
    sheet('', `
      <h2 class="tg-q tg-q0">5つのステップで、全体がわかります。</h2>
      <p class="tg-a">気になる問いから読んでも大丈夫です。</p>
      <div class="tg-toc">
        <div><span class="tg-c">1</span><b>知る</b><em>特定技能って何？</em><ul><li>制度の基本</li><li>他の制度との違い</li><li>19の分野</li></ul></div>
        <div><span class="tg-c">2</span><b>確かめる</b><em>うちは受け入れられる？</em><ul><li>5つのチェック</li><li>本人の条件</li><li>会社の基準</li></ul></div>
        <div><span class="tg-c">3</span><b>採用する</b><em>どうやって採用する？</em><ul><li>人の探し方</li><li>入社までの流れ</li><li>契約・書類・費用</li></ul></div>
        <div><span class="tg-c">4</span><b>受け入れる</b><em>入社後は何をする？</em><ul><li>支援10項目</li><li>自社か委託か</li><li>届出と注意点</li></ul></div>
        <div><span class="tg-c">5</span><b>長く働く</b><em>定着と将来は？</em><ul><li>5年後の道</li><li>定着のポイント</li></ul></div>
      </div>
      <div class="tg-tocb"><span>よくある質問</span><span>BIGLIGHTにできること</span></div>
      ${foot('特定技能ガイド')}`),

    // 3分で
    sheet('', `
      <h2 class="tg-q tg-q0">3分でわかる特定技能</h2>
      <p class="tg-a">人手不足の分野で、<b>即戦力の外国人</b>を雇用できる在留資格です。</p>
      <div class="tg-nums">
        <div><div class="tg-num">19<small>分野</small></div><i></i><p>受け入れできる分野</p></div>
        <div><div class="tg-num">5<small>年</small></div><i></i><p>1号で働ける通算期間</p></div>
        <div><div class="tg-num">10<small>項目</small></div><i></i><p>会社が行う支援</p></div>
        <div><div class="tg-num">44.4<small>万人</small></div><i></i><p>日本で働く特定技能の人数</p></div>
      </div>
      <div class="tg-flow5">
        <div><b>知る</b></div><div><b>確かめる</b></div><div><b>採用する</b></div><div><b>受け入れる</b></div><div class="on"><b>長く働く</b></div>
      </div>
      <p class="tg-note">※1号の通算期間は、相当の理由があると認められる場合は6年まで。人数は令和8年6月末・速報値（1号＋2号）。</p>
      ${foot('特定技能ガイド')}`),

    // 1 制度
    pg(0, '特定技能って、どんな制度？', '1号で働き、試験を経て2号へ。段階的に長く働ける制度です。', `
      <div class="tg-stair">
        <div class="tg-st1">
          <div class="tg-sth">特定技能<b>1号</b></div>
          <dl><dt>働ける期間</dt><dd>通算5年まで</dd><dt>日本語</dt><dd>A2.2相当以上</dd><dt>家族の帯同</dt><dd>基本的に不可</dd><dt>会社の支援</dt><dd>必要</dd></dl>
        </div>
        <div class="tg-stup"><span>試験など</span></div>
        <div class="tg-st2">
          <div class="tg-sth">特定技能<b>2号</b></div>
          <dl><dt>働ける期間</dt><dd>更新の上限なし</dd><dt>日本語</dt><dd>B1相当以上</dd><dt>家族の帯同</dt><dd>要件を満たせば可</dd><dt>会社の支援</dt><dd>不要</dd></dl>
        </div>
      </div>
      <p class="tg-note">※2号の日本語要件は、令和9年4月1日から施行予定。</p>`),

    // 2 比較
    pg(0, '技能実習・育成就労と何が違う？', '特定技能は「育てる」ではなく、「即戦力を雇う」制度です。', `
      <div class="tg-cmp">
        <div class="h"></div><div class="h">技能実習</div><div class="h">育成就労<small>令和9年4月開始</small></div><div class="h on">特定技能1号</div>
        <div class="l">在留できる期間</div><div>最長5年</div><div>通算3年</div><div class="on">通算5年</div>
        <div class="l">入国時の試験</div><div>なし</div><div>なし</div><div class="on">技能・日本語</div>
        <div class="l">本人の意向での転職</div><div>原則不可</div><div>条件つきで可</div><div class="on">同じ業務区分などで可</div>
        <div class="l">受入れ人数の枠</div><div>あり</div><div>あり</div><div class="on">なし<small>介護・建設を除く</small></div>
        <div class="l">サポートする機関</div><div>監理団体</div><div>監理支援機関</div><div class="on">登録支援機関</div>
      </div>`),

    // 3 分野
    pg(0, 'どの仕事で受け入れられる？', '1号は19分野。そのうち11分野は2号まで進めます。', `
      <div class="tg-fields">
        <span>介護</span><span class="f2">ビルクリーニング</span><span>リネンサプライ</span><span class="f2">工業製品製造業</span><span class="f2">建設</span>
        <span class="f2">造船・舶用工業</span><span class="f2">自動車整備</span><span class="f2">航空</span><span class="f2">宿泊</span><span>自動車運送業</span>
        <span>鉄道</span><span class="fw">物流倉庫</span><span class="f2">農業</span><span class="f2">漁業</span><span class="f2">飲食料品製造業</span>
        <span class="f2">外食業</span><span>林業</span><span>木材産業</span><span class="fw">資源循環</span>
      </div>
      <div class="tg-key"><span><i class="k2"></i>2号まで進める分野</span><span><i class="k1"></i>1号のみ</span><span><i class="kw"></i>準備が整い次第、運用開始</span></div>
      <p class="tg-note">※工業製品製造業の2号は、機械金属加工・電気電子機器組立て・金属表面処理の業務区分のみ。</p>`),

    // 4 チェック
    pg(1, 'うちの会社は受け入れられる？', '5つの質問に答えるだけで、見通しが立ちます。', `
      <div class="tg-chk">
        <div><span class="tg-c">1</span><b>仕事は19分野に<br>入っている？</b><em>いいえ → 他の在留資格を検討</em></div>
        <div><span class="tg-c">2</span><b>業務区分に<br>当てはまる？</b><em>いいえ → 業務内容を確認</em></div>
        <div><span class="tg-c">3</span><b>給与は日本人と<br>同等以上？</b><em>いいえ → 賃金を見直す</em></div>
        <div><span class="tg-c">4</span><b>5年以内に<br>法令違反なし？</b><em>いいえ → 専門家に相談</em></div>
        <div><span class="tg-c">5</span><b>支援する体制は<br>ある？</b><em>いいえ → 登録支援機関に委託</em></div>
      </div>
      <div class="tg-res">すべて「はい」なら、受け入れを検討できます。</div>`),

    // 5 本人
    pg(1, 'どんな人を採用できる？', '基本の条件は、この6つです。', `
      <div class="tg-six">
        <div><b>18歳以上</b></div>
        <div><b>技能試験に合格</b><em>分野・業務区分ごと</em></div>
        <div><b>日本語試験に合格</b><em>A2.2相当以上</em></div>
        <div><b>健康状態が良好</b><em>健康診断で確認</em></div>
        <div><b>1号が通算5年未満</b></div>
        <div><b>保証金・違約金なし</b><em>本国での契約も含む</em></div>
      </div>
      <div class="tg-res tg-res2">技能実習2号を良好に修了した人は、試験が免除されます。</div>
      <p class="tg-note">※介護、自動車運送業（タクシー・バス）、鉄道（運輸係員）は別途要件があります。</p>`),

    // 6 会社
    pg(1, '会社に求められる基準は？', '4つの柱と、分野の協議会への加入が土台です。', `
      <div class="tg-pil">
        <div class="tg-rf">受け入れの基準</div>
        <div class="tg-cols">
          <div><b>雇用契約</b><em>報酬は日本人と<br>同等以上</em></div>
          <div><b>会社</b><em>5年以内に出入国・<br>労働法令の違反なし</em></div>
          <div><b>支援体制</b><em>本人が理解できる<br>言語で支援できる</em></div>
          <div><b>支援計画</b><em>生活オリエンテーション<br>などを含む</em></div>
        </div>
        <div class="tg-bs">分野ごとの協議会に加入<small>建設・工業製品製造業は登録法人にも加入</small></div>
      </div>
      <div class="tg-3c"><span><b>雇用形態</b>フルタイムのみ</span><span><b>派遣</b>農業・漁業のみ</span><span><b>人数枠</b>介護・建設のみ</span></div>`),

    // 7 人材
    pg(2, '人はどこから探す？', '国内にいる人か、海外にいる人か。入口は2つです。', `
      <div class="tg-tree">
        <div class="tg-root">採用したい</div>
        <div class="tg-brs">
          <div class="tg-br"><div class="tg-bh">日本国内にいる人</div><div class="tg-lv"><span>技能実習2号の修了者<em>試験免除</em></span><span>留学生など<em>試験に合格</em></span><span>特定技能で働いている人<em>転職</em></span></div></div>
          <div class="tg-br"><div class="tg-bh">海外にいる人</div><div class="tg-lv"><span>技能実習2号を修了して帰国した人<em>試験免除</em></span><span>海外の試験に合格した人<em>試験に合格</em></span></div></div>
        </div>
      </div>
      <div class="tg-3c"><span><b>探し方 1</b>自社で直接募集</span><span><b>探し方 2</b>職業紹介事業者に依頼</span><span><b>探し方 3</b>ハローワーク（国内の人）</span></div>`),

    // 8 流れ
    pg(2, '採用から入社まで、何をする？', '国内でも海外でも、違うのは真ん中の申請だけです。', `
      <div class="tg-lane">
        <div class="tg-who a">海外<br>の人</div><div class="tg-who b">国内<br>の人</div>
        <div class="tg-m c1">試験に合格</div>
        <div class="tg-m c2">雇用契約</div>
        <div class="tg-m c3">事前ガイダンス<br>健康診断</div>
        <div class="tg-s a c4"><b>在留資格認定<br>証明書</b><em>会社の職員等が代理申請</em></div>
        <div class="tg-s b c4"><b>在留資格<br>変更許可</b><em>本人申請が原則</em></div>
        <div class="tg-n a c5">査証を取得<br>入国</div>
        <div class="tg-n b c5">在留カード<br>受け取り</div>
        <div class="tg-m c6">生活オリエン<br>住民登録<br>給与口座</div>
        <div class="tg-m c7 on">就労<br>開始</div>
      </div>
      <p class="tg-note">※技能実習2号を良好に修了した人は、試験が免除されます。</p>`),

    // 9 契約
    pg(2, '雇用契約で気をつけることは？', '基本は「日本人と同じ」。お金の扱いに注意します。', `
      <div class="tg-ox">
        <div class="o"><div class="tg-oh"><i>○</i>必ず守ること</div><ul>
          <li>報酬は日本人と同等以上</li><li>労働時間は通常の労働者と同等</li><li>教育訓練・福利厚生で差別しない</li><li>一時帰国の希望には有給休暇で対応</li><li>帰国費用を本人が払えないときは会社が負担</li></ul></div>
        <div class="x"><div class="tg-oh"><i>×</i>してはいけないこと</div><ul>
          <li>保証金を取る</li><li>違約金を定める</li><li>帰国費用を給与から積み立てて管理する</li><li>パスポート・在留カードを預かる</li><li>支援の費用を本人に負担させる</li></ul></div>
      </div>`),

    // 10 書類
    pg(2, '書類は何を、誰が出す？', '書類は4つのグループ。申請先は地方出入国在留管理局です。', `
      <div class="tg-docs">
        <div><b>本人</b><em>申請書・試験の合格証・<br>健康診断の結果</em></div>
        <div><b>会社</b><em>会社の概要・<br>納税や社会保険の資料</em></div>
        <div><b>契約・計画</b><em>雇用契約書・<br>雇用条件書・<br>1号の支援計画</em></div>
        <div><b>分野</b><em>分野ごとの<br>誓約書など</em></div>
      </div>
      <div class="tg-who2">
        <div><b>初めて受け入れる会社</b><span>申請の前に、協力確認書を市区町村へ提出</span></div>
        <div><b>海外から採用するとき</b><span>国によって、本国側の手続きが必要</span></div>
      </div>`),

    // 11 費用
    pg(2, '費用はどんなものがかかる？', 'かかる時期で分けると、全体が見えます。', `
      <div class="tg-cost">
        <div><div class="tg-ch">採用するとき</div><ul><li>人材紹介料</li><li>在留資格の手続き費用</li><li>健康診断</li></ul></div>
        <div><div class="tg-ch">入社するとき</div><ul><li>渡航費（海外の場合）</li><li>住まいの準備</li><li>分野の協議会など</li></ul></div>
        <div><div class="tg-ch">毎月</div><ul><li>給与・社会保険</li><li>登録支援機関の委託料</li></ul></div>
        <div><div class="tg-ch">更新のとき</div><ul><li>在留期間の<br>更新手続き費用</li></ul></div>
      </div>
      <div class="tg-res tg-res2">金額は、担当者からお送りする料金のご案内でご確認いただけます。</div>
      <p class="tg-note">※分野や採用ルートにより、必要な費用は異なります。</p>`),

    // 12 支援
    pg(3, '入社前後の支援10項目とは？', '1号の人には、来日前から離職時まで10項目の支援が必要です。', `
      <div class="tg-time">
        <div class="tg-tl"><span>申請の前</span><span>入国・入社のとき</span><span>働いている間</span><span>離職・帰国のとき</span></div>
        <div class="tg-tc">
          <div><p><b>1</b>事前ガイダンス</p></div>
          <div><p><b>2</b>空港などの送迎</p><p><b>3</b>住まい・生活の契約</p><p><b>4</b>生活オリエンテーション</p><p><b>5</b>公的手続きへの同行</p></div>
          <div><p><b>6</b>日本語学習の機会</p><p><b>7</b>相談・苦情の対応</p><p><b>8</b>日本人との交流</p><p><b>10</b>定期面談<small>3か月に1回以上</small></p></div>
          <div><p><b>9</b>転職の支援<small>会社都合の場合</small></p><p><b>2</b>空港への送迎</p></div>
        </div>
      </div>`),

    // 13 委託
    pg(3, '支援は自社？ 登録支援機関？', '全部を委託すれば、「支援体制あり」として扱われます。', `
      <div class="tg-tri">
        <svg viewBox="0 0 460 400" role="img" aria-label="会社、本人、登録支援機関の関係"><defs><marker id="tg-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#0b3d91"/></marker></defs>
          <g stroke="#0b3d91" stroke-width="1.5" fill="none"><path d="M205 100L92 276" marker-start="url(#tg-ar)" marker-end="url(#tg-ar)"/><path d="M255 100L368 276" marker-end="url(#tg-ar)"/><path d="M322 310H138" marker-end="url(#tg-ar)"/></g>
          <g font-family="Noto Sans JP,sans-serif" text-anchor="middle"><circle cx="230" cy="64" r="56" fill="#0b3d91"/><text x="230" y="71" fill="#fff" font-size="20" font-weight="700">会社</text><circle cx="72" cy="310" r="56" fill="#fff" stroke="#0b3d91" stroke-width="1.5"/><text x="72" y="317" fill="#202020" font-size="20" font-weight="700">本人</text><circle cx="388" cy="310" r="60" fill="#fff5e0" stroke="#f5a623" stroke-width="1.5"/><text x="388" y="304" fill="#202020" font-size="17" font-weight="700">登録</text><text x="388" y="328" fill="#202020" font-size="17" font-weight="700">支援機関</text><text x="104" y="172" fill="#444" font-size="15">雇用契約</text><text x="362" y="172" fill="#444" font-size="15">支援の委託</text><text x="230" y="298" fill="#444" font-size="15">10項目の支援</text></g>
        </svg>
        <div class="tg-two">
          <div><b>自社で行う</b><ul><li>過去2年の受入れ実績、または生活相談の経験</li><li>支援責任者と担当者を選ぶ</li><li>本人が理解できる言語で対応</li></ul></div>
          <div class="on"><b>全部を委託する</b><ul><li>支援体制の基準を満たす</li><li>委託先は再委託できない</li><li>雇用と届出の責任は会社に残る</li></ul></div>
        </div>
      </div>`),

    // 14 届出
    pg(3, '届出はいつ、何を出す？', '年に1回の定期届出と、変更があったときの随時届出です。', `
      <div class="tg-cal">
        <div class="tg-ms"><i></i><span>4月</span><span>5月</span><span>6月</span><span>7月</span><span>8月</span><span>9月</span><span>10月</span><span>11月</span><span>12月</span><span>1月</span><span>2月</span><span>3月</span></div>
        <div class="tg-cr"><b>定期届出</b><div class="tg-gt"><u style="grid-column:1/3">前年度分を提出</u></div></div>
        <div class="tg-cr"><b>定期面談</b><div class="tg-gt"><s style="grid-column:3"></s><s style="grid-column:6"></s><s style="grid-column:9"></s><s style="grid-column:12"></s></div></div>
        <div class="tg-cr"><b>随時届出</b><div class="tg-gt"><em style="grid-column:1/13">契約・支援計画・委託の変更や終了があったら、14日以内</em></div></div>
      </div>
      <div class="tg-res tg-res2">支援を全部委託している場合、定期届出は会社と登録支援機関の連名で行います。</div>
      <p class="tg-note">※定期面談の月は一例です。3か月に1回以上、本人と上司それぞれに行います。</p>`),

    // 15 NG
    pg(3, 'ルールを守らないとどうなる？', '重い場合は、5年間受け入れができなくなります。', `
      <div class="tg-ng">
        <div class="tg-ngl"><b>特に注意</b><ul><li>届出をしない・虚偽の届出</li><li>報酬を低くする・支払わない</li><li>支援を実施しない</li><li>不法就労をさせる</li><li>会社の責任で行方不明者を出す</li></ul></div>
        <div class="tg-lad"><div class="s1"><b>指導・助言</b></div><div class="s2"><b>改善命令</b></div><div class="s3"><b>欠格事由</b><em>5年間 受入れ不可</em></div></div>
      </div>
      <p class="tg-note">※届出の不履行や虚偽の届出は、罰則の対象にもなります。</p>`),

    // 16 5年後
    pg(4, '5年後はどうなる？', '2号に進めば、更新の上限なく働き続けられます。', `
      <div class="tg-yr">
        <div class="tg-yb"><span>1年目</span><span>2年目</span><span>3年目</span><span>4年目</span><span>5年目</span><b>6年目以降</b></div>
        <div class="tg-y1"><div>特定技能1号<small>通算5年まで</small></div><i>2号の試験など</i><div class="on">特定技能2号<small>更新の上限なし</small></div></div>
        <div class="tg-yc">
          <div><b>1号の間</b><ul><li>会社の支援が必要</li><li>家族の帯同は基本的に不可</li></ul></div>
          <div class="on"><b>2号になると</b><ul><li>会社の支援は不要</li><li>配偶者・子の帯同が可能</li></ul></div>
        </div>
      </div>
      <p class="tg-note">※2号に進めるのは11分野。技能水準は試験等で確認、日本語はB1相当以上（令和9年4月1日から施行予定）。</p>`),

    // 17 定着
    pg(4, '長く働いてもらうには？', '大切なのは、4つの「安心」をつくることです。', `
      <div class="tg-ring">
        <div class="a"><b>ことば</b><em>日本語を学べる機会</em></div>
        <div class="b"><b>くらし</b><em>住まいと生活の相談先</em></div>
        <div class="tg-core">定着</div>
        <div class="c"><b>しごと</b><em>上司との定期面談</em></div>
        <div class="d"><b>みらい</b><em>2号という目標</em></div>
      </div>`),

    // FAQ
    pg(-1, 'よくある質問 1', '', faq([
      ['パートやアルバイトで雇えますか？', 'いいえ。フルタイムのみです（原則 週5日以上・年217日以上、週30時間以上）。'],
      ['派遣で受け入れられますか？', '農業と漁業のみ可能です。'],
      ['何人まで受け入れられますか？', '原則、人数枠はありません。介護と建設には枠があります。'],
      ['給与はいくらにすればいいですか？', '同じ業務の日本人と同等以上にします。'],
      ['社会保険には入りますか？', 'はい。日本人と同じく、法令に沿って加入します。'],
      ['本人が転職することはありますか？', 'あります。同じ業務区分などで転職できます。'],
    ])),
    pg(-1, 'よくある質問 2', '', faq([
      ['登録支援機関への委託は必須ですか？', 'いいえ。基準を満たせば自社で支援できます。'],
      ['どのくらいの日本語力ですか？', '1号はA2.2相当以上。JLPTのN4以上などで確認します。'],
      ['家族を呼べますか？', '1号は基本的に不可。2号は要件を満たせば配偶者と子が可能です。'],
      ['留学生を採用できますか？', '技能試験と日本語試験に合格すれば、変更申請ができます。'],
      ['途中で退職したら？', '雇用契約の終了を14日以内に届け出ます。'],
      ['育成就労とは？', '令和9年4月に始まる制度です。技能を育て、特定技能1号へつなぎます。'],
    ])),

    // BIGLIGHT
    sheet('', `
      <h2 class="tg-q tg-q0">BIGLIGHTにできること</h2>
      <p class="tg-a">採用の前から定着まで、ひとつの窓口でご支援します。</p>
      <div class="tg-bl">
        <div><span class="tg-c">1</span><b>知る・確かめる</b><em>無料相談<br>受け入れの確認</em></div>
        <div><span class="tg-c">2</span><b>採用する</b><em>人材のご紹介<br>在留資格手続きのサポート</em></div>
        <div><span class="tg-c">3</span><b>受け入れる</b><em>義務的支援10項目<br>母国語での相談</em></div>
        <div><span class="tg-c">4</span><b>長く働く</b><em>定期面談<br>日本語学習アプリ</em></div>
      </div>
      <div class="tg-nums tg-nums3">
        <div><div class="tg-num">19<small>分野</small></div><i></i><p>特定技能 対応分野</p></div>
        <div><div class="tg-num">500<small>+</small></div><i></i><p>人材紹介実績（名）</p></div>
        <div><div class="tg-num">80<small>+</small></div><i></i><p>取引企業（社）</p></div>
      </div>
      <p class="tg-note">※人材紹介実績・取引企業数は2026年6月時点。有料職業紹介事業 23-ユ-302414／登録支援機関 21登-006596</p>
      ${foot('特定技能ガイド')}`),

    // お問い合わせ
    sheet('', `
      <div class="tg-logo tg-logo-s"><img src="${r}img/mark.png" alt="" width="1014" height="971"><img class="tg-lw" src="${r}img/wordmark.png" alt="BIGLIGHT株式会社" width="1014" height="175"></div>
      <div class="tg-cbox"><div><div class="tg-en">Contact</div><p>人数や時期が未定でも大丈夫です。まずはお気軽にご相談ください。</p></div><span class="tg-circ">→</span></div>
      <div class="tg-ctel">
        <div><div class="tg-tel">052-908-7944</div><p>平日 9:00–18:00<br><b>BIGLIGHT株式会社</b>　〒462-0007 愛知県名古屋市北区如意一丁目112 A</p></div>
        <div class="tg-qr"><img src="${r}img/qr-contact.svg" alt="QRコード（biglight.jp/contact/）" width="132" height="132"><p><b>WEB FORM</b>biglight.jp/contact/</p></div>
      </div>
      <div class="tg-src">本資料は${AS_OF}の制度をもとにした一般的なご案内です。分野ごとの要件や最新の情報は、出入国在留管理庁・分野所管省庁の公表資料をご確認ください。<br>参考：出入国在留管理庁「外国人労働者に関する制度概要」（令和8年9月29日更新）、「特定技能外国人受入れに関する運用要領」（令和8年10月）</div>
      ${foot('© BIGLIGHT株式会社')}`),
  ];





  return page({ root: r, title: '特定技能ガイド｜BIGLIGHT株式会社', desc: 'はじめて特定技能の外国人を採用する企業のご担当者さま向けガイド。', body: `
${pageHead('Guide', '特定技能ガイド')}
${TG_CSS}
<section class="tg-root0"><div class="wrap">
  <div class="tg-bar">${pill('PDFをダウンロード', PDF_URL)}</div>
  <div class="tg-stack">${sheets.join('\n')}</div>
</div></section>
${TG_JS}` });
};
module.exports.TG_CSS = TG_CSS;
module.exports.TG_JS = TG_JS;
