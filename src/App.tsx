import { useState, useEffect } from "react";
import "./App.css";

// ==========================================
// TYPES
// ==========================================
interface Feature {
  icon: string;
  color: string;
  title: string;
  description: string;
  tags: string[];
}

interface Achievement {
  icon: string;
  title: string;
  desc: string;
  tag: string;
}

interface EventItem {
  emoji: string;
  name: string;
  target: string;
  description: string;
  timing: string;
  highlight: boolean;
  cta: string;
}

interface FAQItem {
  q: string;
  a: string;
}

// ==========================================
// DATA
// ==========================================
const FEATURES: Feature[] = [
  {
    icon: "💻",
    color: "#22d3ee",
    title: "テクノロジーを極める",
    description:
      "プログラミング・AI・ロボティクス・IoTなど最先端の技術を、手を動かしながら本気で学ぶ。知識だけでなく、実際に動くものを作る力を身につける。",
    tags: ["プログラミング", "AI", "ロボット", "IoT"],
  },
  {
    icon: "🎨",
    color: "#f59e0b",
    title: "デザインを極める",
    description:
      "UX/UIデザイン・プロダクトデザイン・グラフィックなど、伝わるものを作る力を養う。「見た目」だけでなく「体験」をデザインする視点を育てる。",
    tags: ["UX/UI", "プロダクト", "グラフィック", "空間"],
  },
  {
    icon: "🤝",
    color: "#10b981",
    title: "本物の企業と働く",
    description:
      "NHK、コクヨ、大阪万博...。在学中から有名企業との共創プロジェクトに挑戦できる。教科書の外で、本物の仕事に向き合う経験が積める。",
    tags: ["企業コラボ", "プロジェクト", "社会実装"],
  },
  {
    icon: "🌱",
    color: "#8b5cf6",
    title: "起業家精神を育む",
    description:
      "「自分のアイデアで世界を変えたい」という想いを、実践的なビジネス教育で育てる。リアルな課題に向き合い、社会に価値を生み出す力を鍛える。",
    tags: ["起業家教育", "ビジネス", "アントレプレナー"],
  },
  {
    icon: "🏡",
    color: "#ef4444",
    title: "全寮制で人間力UP",
    description:
      "24時間を仲間と共に過ごす寮生活。料理当番・掃除・ルール作り...すべてが自分たちで決める、本当の「自立」の訓練。仲間と笑い、ぶつかりながら、一生モノの絆ができる。",
    tags: ["全寮制", "コミュニティ", "自律"],
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    icon: "📺",
    title: "NHK Eテレ キャラクターデザイン",
    desc: "「マッシュアップ・ビジネス」のキャラクターを1年生が担当。全国に放映された。",
    tag: "2024年",
  },
  {
    icon: "🏟️",
    title: "大阪・関西万博 空間デザイン",
    desc: "徳島県ゾーン「未来エリア」の空間デザインとコンテンツ制作を学生が担当。",
    tag: "2025年",
  },
  {
    icon: "🏆",
    title: "全国高専プログラミングコンテスト受賞",
    desc: "NICT賞・さくらインターネット企業賞を受賞。防災アプリ「まもるん」が高評価。",
    tag: "2024年",
  },
  {
    icon: "🌏",
    title: "アジア最大級デザインアワード受賞",
    desc: "Golden Pin Design Award（台湾）でMark Winnerを受賞。アジアに存在感を示した。",
    tag: "2025年",
  },
  {
    icon: "📓",
    title: "コクヨと「キャンパスノート」共同開発",
    desc: "学生がコクヨと協力し、全国発売のキャンパスノートを共同開発・設計した。",
    tag: "2026年",
  },
  {
    icon: "🤖",
    title: "FIRST Robotics Competition 受賞",
    desc: "ハワイ地区大会でRookie Inspiration Award賞を受賞。世界大会に挑んだ。",
    tag: "2024年",
  },
];

const EVENTS: EventItem[] = [
  {
    emoji: "☀️",
    name: "サマースクール",
    target: "中学3年生対象",
    description:
      "3泊4日の「探究コース」と1泊2日の「発見コース」。本物の授業・寮生活・神山の空気を体験しよう。",
    timing: "2026年夏（8月予定）",
    highlight: true,
    cta: "サマースクールを見る",
  },
  {
    emoji: "🏫",
    name: "オープンキャンパス",
    target: "中学2・3年生対象",
    description:
      "キャンパスを1日かけて体験。授業・寮・神山を「まるごと」見られる唯一のチャンス。",
    timing: "2026年春〜夏（複数回開催）",
    highlight: false,
    cta: "オープンキャンパスを見る",
  },
  {
    emoji: "❄️",
    name: "ウィンタースクール",
    target: "全国の中高生対象",
    description:
      "無料で参加できる2ヶ月間のオンラインプログラム。デジタルモノづくりを自宅から体験しよう。",
    timing: "2026年冬（12月〜）",
    highlight: false,
    cta: "詳細を見る",
  },
];

const FAQS: FAQItem[] = [
  {
    q: "入学するのにプログラミング経験は必要ですか？",
    a: "必要ありません。入学前にコードを書いたことがない生徒がほとんどです。大切なのは「テクノロジーやデザインで何かを変えたい」という好奇心と熱意です。",
  },
  {
    q: "入試は学力（偏差値）重視ですか？",
    a: "神山まるごと高専の入試はマッチング重視です。学力テストだけでなく、自分の考えや想いを伝える課題レポートや面接を重視しています。「学校との相性」を大切にした選抜を行っています。",
  },
  {
    q: "卒業後の進路は？大学に行けますか？",
    a: "高専卒業後は大学3年次に編入できます（多くの先輩が国立大学・有名私立大学に編入）。就職の道もあり、高専卒は企業からの需要が非常に高い。さらにKMCでは「起業」という選択肢も力強くサポートします。",
  },
  {
    q: "学費はどのくらいかかりますか？",
    a: "私立高専のため学費は一般的な私立高校より高めですが、奨学金・給付金制度が充実しています。詳細は公式サイトの「学費・奨学金」ページをご確認ください。経済状況で諦めないよう、個別相談も受け付けています。",
  },
  {
    q: "全寮制ですか？親元を離れることが不安です…",
    a: "基本的には全寮制です（4・5年生は別の寮になります）。最初は不安でも、同じ志を持つ仲間たちと過ごす中で「ここに来て良かった」と感じる生徒がほとんど。入学後のサポート体制も充実しています。",
  },
  {
    q: "どんな生徒が向いていますか？",
    a: "「なんか面白いことがしたい」「テクノロジーで世の中を変えたい」「普通の高校では物足りない」と感じているあなたへ。完成されたスキルより、挑戦する姿勢と好奇心を大切にしています。",
  },
];

// ==========================================
// HEADER
// ==========================================
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container">
        <div className="site-header__inner">
          <a href="#top" className="site-header__logo" onClick={closeMenu}>
            <span className="logo-badge">KMC</span>
            <span className="logo-name">神山まるごと高専</span>
          </a>

          <nav
            className={`site-nav${menuOpen ? " is-open" : ""}`}
            aria-label="メインナビゲーション"
          >
            <a href="#about" className="site-nav__link" onClick={closeMenu}>
              学校について
            </a>
            <a href="#features" className="site-nav__link" onClick={closeMenu}>
              特長
            </a>
            <a
              href="#achievements"
              className="site-nav__link"
              onClick={closeMenu}
            >
              実績
            </a>
            <a href="#events" className="site-nav__link" onClick={closeMenu}>
              体験する
            </a>
          </nav>

          <a
            href="https://kamiyama.ac.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm header-cta"
          >
            公式サイトへ →
          </a>

          <button
            className={`hamburger${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

// ==========================================
// HERO
// ==========================================
function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__gradient" />
        <div className="hero__grid" />
      </div>
      <div className="container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            徳島県神山町&nbsp;&nbsp;·&nbsp;&nbsp;2023年開校&nbsp;&nbsp;·&nbsp;&nbsp;私立5年制高等専門学校
          </div>

          <h1 className="hero__heading">
            テクノロジー<span className="hero__x">×</span>デザインで、
            <br />
            <em className="hero__em">人間の未来を変える。</em>
          </h1>

          <p className="hero__sub">
            神山まるごと高専は、テクノロジーとデザインの力で社会課題を解決する
            <span className="pc-only">
              <br />
            </span>
            「次世代の起業家・クリエイター」を育てる、全く新しい5年制の学校です。
          </p>

          <div className="hero__actions">
            <a href="#events" className="btn btn-primary btn-lg">
              🏫 体験イベントを見る
            </a>
            <a href="#about" className="btn btn-ghost btn-lg">
              学校について知る →
            </a>
          </div>

          <div className="hero__stats">
            {(
              [
                { label: "開校", value: "2023年" },
                { label: "課程", value: "5年制" },
                { label: "生活スタイル", value: "全寮制" },
                { label: "所在地", value: "徳島県神山町" },
              ] as const
            ).map((stat, i) => (
              <div key={i} className="hero__stat">
                <div className="hero__stat-value">{stat.value}</div>
                <div className="hero__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// ABOUT
// ==========================================
function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">ABOUT</div>
          <h2 className="section-title">神山まるごと高専って？</h2>
          <p className="section-desc">
            普通の高校でも、普通の高専でもない。
            <br />
            「テクノロジー×デザイン×起業家精神」を軸に、
            <br />
            社会を変える人材を育てる、全く新しい学校。
          </p>
        </div>

        <div className="about__grid">
          <div className="about__card">
            <div className="about__card-icon" aria-hidden="true">
              🎓
            </div>
            <h3 className="about__card-title">5年間で専門家レベルへ</h3>
            <p className="about__card-desc">
              高等専門学校（高専）は中学卒業後に入学する5年制の学校。大学の専門課程に相当する深い学びを、10代のうちから身につけることができます。
            </p>
          </div>
          <div className="about__card">
            <div className="about__card-icon" aria-hidden="true">
              ⚡
            </div>
            <h3 className="about__card-title">テクノロジー×デザイン</h3>
            <p className="about__card-desc">
              プログラミングだけでも、デザインだけでもない。両方を掛け合わせることで、「作れる×伝わる」を実現できる人材を育てます。
            </p>
          </div>
          <div className="about__card">
            <div className="about__card-icon" aria-hidden="true">
              🚀
            </div>
            <h3 className="about__card-title">起業家を育てる教育</h3>
            <p className="about__card-desc">
              在学中から企業とコラボし、リアルな課題に取り組む。「社会を変える」というビジョンを持った若者を育てることが、この学校の使命です。
            </p>
          </div>
        </div>

        <div className="about__location">
          <div className="about__location-text">
            <div className="section-tag">LOCATION</div>
            <h3 className="about__location-title">なぜ、神山町なのか？</h3>
            <p>
              徳島県の山間にある人口約5,000人の小さな町・神山町。そこはなんと、東京のIT企業がサテライトオフィスを構えるイノベーションの聖地。自然と最先端テクノロジーが共存するこの場所だからこそ、「人間の未来を変える」学びが生まれます。
            </p>
            <ul className="about__location-points" aria-label="神山町の特徴">
              <li>🌿 山と川に囲まれた豊かな自然</li>
              <li>💡 IT企業が集まるサテライトオフィスの聖地</li>
              <li>🏘️ 地域ぐるみで高専を支える「まるごと」な環境</li>
            </ul>
          </div>
          <div className="about__location-visual" aria-hidden="true">
            <div className="location-card">
              <div className="location-pin">📍</div>
              <div className="location-name">神山町</div>
              <div className="location-pref">徳島県 名西郡</div>
              <div className="location-divider" />
              <div className="location-tags">
                <span>🌿 自然</span>
                <span>💻 IT</span>
                <span>🏘️ 地域</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// FEATURES
// ==========================================
function Features() {
  return (
    <section id="features" className="section features">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">FEATURES</div>
          <h2 className="section-title">
            神山まるごと高専の
            <br className="sp-only" />
            5つの特長
          </h2>
          <p className="section-desc">
            他の学校にはない、KMCだけの学び方がある。
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="feature-card"
              style={
                { "--feature-accent": feature.color } as React.CSSProperties
              }
            >
              <div className="feature-card__icon" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__desc">{feature.description}</p>
              <div className="feature-card__tags" aria-label="関連キーワード">
                {feature.tags.map((tag, j) => (
                  <span key={j} className="feature-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// ACHIEVEMENTS
// ==========================================
function Achievements() {
  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">ACHIEVEMENTS</div>
          <h2 className="section-title">
            在校生が残してきた、
            <br />
            リアルな実績。
          </h2>
          <p className="section-desc">
            教科書の外で、本物の仕事をする。
            <br />
            1年生から社会に価値を届けられる環境がここにある。
          </p>
        </div>

        <div className="achievements__grid">
          {ACHIEVEMENTS.map((item, i) => (
            <div key={i} className="achievement-card">
              <div className="achievement-card__tag">{item.tag}</div>
              <div className="achievement-card__icon" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="achievement-card__title">{item.title}</h3>
              <p className="achievement-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SCHOOL LIFE
// ==========================================
function SchoolLife() {
  return (
    <section id="life" className="section school-life">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">SCHOOL LIFE</div>
          <h2 className="section-title">神山での毎日</h2>
          <p className="section-desc">
            学校は教室だけじゃない。神山での生活丸ごとが学びの場。
          </p>
        </div>

        <div className="life__grid">
          <div className="life-card life-card--large">
            <div className="life-card__visual">
              <div className="life-visual" aria-hidden="true">
                🏠
              </div>
            </div>
            <div className="life-card__content">
              <h3 className="life-card__title">全寮制の生活</h3>
              <p className="life-card__desc">
                学校のすぐそばの寮で、クラスメートと24時間を共に過ごす。料理当番・掃除・ルール作り...すべてが自分たちで決める、本当の「自立」の訓練。仲間と笑い、ぶつかり合いながら、一生モノの絆ができる。
              </p>
            </div>
          </div>

          <div className="life-card">
            <div className="life-card__visual">
              <div className="life-visual" aria-hidden="true">
                🎉
              </div>
            </div>
            <div className="life-card__content">
              <h3 className="life-card__title">まるごと祭（文化祭）</h3>
              <p className="life-card__desc">
                年に一度の文化祭「まるごと祭」。公式アプリ開発、伝統行事の復活...技術力とアイデアで、神山町を盛り上げる。2024年は2,500人が来場！
              </p>
            </div>
          </div>

          <div className="life-card">
            <div className="life-card__visual">
              <div className="life-visual" aria-hidden="true">
                🌿
              </div>
            </div>
            <div className="life-card__content">
              <h3 className="life-card__title">神山町という環境</h3>
              <p className="life-card__desc">
                山と川に囲まれた豊かな自然。東京から移住したクリエイターや起業家が集まる異色の農村。この独特な空気の中で、新しいアイデアが生まれる。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// EVENTS
// ==========================================
function Events() {
  return (
    <section id="events" className="section events">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">EVENTS</div>
          <h2 className="section-title">まず、体験してみよう。</h2>
          <p className="section-desc">
            百聞は一見にしかず。
            <br />
            神山まるごと高専のリアルを、自分の目で確かめて。
          </p>
        </div>

        <div className="events__grid">
          {EVENTS.map((event, i) => (
            <div
              key={i}
              className={`event-card${event.highlight ? " event-card--highlight" : ""}`}
            >
              {event.highlight && (
                <div className="event-card__badge">🔥 中学3年生におすすめ</div>
              )}
              <div className="event-card__emoji" aria-hidden="true">
                {event.emoji}
              </div>
              <div className="event-card__target">{event.target}</div>
              <h3 className="event-card__name">{event.name}</h3>
              <p className="event-card__desc">{event.description}</p>
              <div className="event-card__timing">📅 {event.timing}</div>
              <a
                href="https://kamiyama.ac.jp"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${event.highlight ? "btn-primary" : "btn-outline"} btn-block`}
              >
                {event.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// FAQ
// ==========================================
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">FAQ</div>
          <h2 className="section-title">よくある質問</h2>
          <p className="section-desc">
            中学生・保護者の方からよく寄せられる質問にお答えします。
          </p>
        </div>

        <div className="faq__list">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`faq-item${openIndex === i ? " is-open" : ""}`}
            >
              <button
                className="faq-item__question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span>Q. {item.q}</span>
                <span className="faq-item__icon" aria-hidden="true">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                className="faq-item__answer"
                role="region"
                aria-labelledby={`faq-question-${i}`}
              >
                <p>A.&nbsp;{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CTA SECTION
// ==========================================
function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-section__inner">
          <p className="cta-section__kicker">FOR 中学3年生へ</p>
          <h2 className="cta-section__title">
            未来は、
            <br />
            自分でつくれる。
          </h2>
          <p className="cta-section__desc">
            神山まるごと高専で、テクノロジーとデザインの力で
            <br />
            「人間の未来を変える」挑戦を始めよう。
          </p>
          <div className="cta-section__actions">
            <a
              href="https://kamiyama.ac.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-xl"
            >
              公式サイトで詳しく見る →
            </a>
          </div>
          <p className="cta-section__note">
            ※ 入試情報・学費・奨学金の詳細は
            <a
              href="https://kamiyama.ac.jp"
              target="_blank"
              rel="noopener noreferrer"
            >
              公式サイト
            </a>
            でご確認ください
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// FOOTER
// ==========================================
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__inner">
          <div className="site-footer__logo">
            <span className="logo-badge">KMC</span>
            <div>
              <div className="site-footer__name">神山まるごと高等専門学校</div>
              <div className="site-footer__sub">
                Kamiyama Marugo College of Technology
              </div>
            </div>
          </div>
          <nav
            className="site-footer__links"
            aria-label="フッターナビゲーション"
          >
            <a
              href="https://kamiyama.ac.jp"
              target="_blank"
              rel="noopener noreferrer"
            >
              公式サイト
            </a>
            <a
              href="https://kamiyama.ac.jp/admissions/"
              target="_blank"
              rel="noopener noreferrer"
            >
              入試情報
            </a>
            <a
              href="https://kamiyama.ac.jp/curriculum/"
              target="_blank"
              rel="noopener noreferrer"
            >
              カリキュラム
            </a>
          </nav>
        </div>
        <p className="site-footer__copy">
          ※
          このページは神山まるごと高専の紹介を目的として作成されました。最新情報は
          <a
            href="https://kamiyama.ac.jp"
            target="_blank"
            rel="noopener noreferrer"
          >
            公式サイト
          </a>
          でご確認ください。
        </p>
      </div>
    </footer>
  );
}

// ==========================================
// APP
// ==========================================
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Achievements />
        <SchoolLife />
        <Events />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
