export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: string;
  date: string;
  featured: boolean;
  readMinutes: number;
  sourcePath: string;
  audio?: {
    title: string;
    src: string;
    duration?: string;
  }[];
  video?: {
    title: string;
    src?: string;
    youtubeId?: string;
    poster?: string;
  };
  body: string[];
};

export const categories: Category[] = [
  {
    slug: "china-history",
    name: "中国历史",
    description: "从朝代更替、制度演变到人物命运，梳理中国历史的长线脉络。",
    image: "/images/qinshihuang.jpg"
  },
  {
    slug: "world-history",
    name: "世界历史",
    description: "把中国与世界放在同一张时间表上，理解文明之间的差异与回响。",
    image: "/images/chunqiu-greece.jpg"
  },
  {
    slug: "historical-figures",
    name: "历史人物",
    description: "帝王、名将与关键人物的选择，常常决定一个时代的走向。",
    image: "/images/hanxin.jpg"
  },
  {
    slug: "major-events",
    name: "历史大事",
    description: "战争、变局与转折点，适合用故事方式重新进入现场。",
    image: "/images/chibi.jpg"
  },
  {
    slug: "history-encyclopedia",
    name: "历史百科",
    description: "把制度、生活方式和冷知识讲清楚，让历史更接近日常经验。",
    image: "/images/ancient-commerce.jpg"
  },
  {
    slug: "city-history",
    name: "城市历史",
    description: "每座城市都有自己的时间层，山川、港口与移民共同塑造它。",
    image: "/images/fuzhou.jpg"
  }
];

export const posts: Post[] = [
  {
    slug: "chunqiu-greece-parallel-worlds",
    title: "东周与希腊：同一时代的不同答案",
    subtitle: "分封制、城邦制与文明选择",
    excerpt: "当周天子在洛邑失去权威，地中海的城邦正热烈讨论公共事务。同一时间段，不同文明给出了完全不同的政治答案。",
    category: "world-history",
    tags: ["东周", "希腊", "中外史", "制度"],
    image: "/images/chunqiu-greece.jpg",
    date: "2026-05-01",
    featured: true,
    readMinutes: 8,
    sourcePath: "中外史/春秋希腊/中外史-东周-原文案.txt",
    audio: [
      {
        title: "东周与希腊：睡前音频",
        src: "/media/audio/chunqiu-greece-1.mp3"
      }
    ],
    video: {
      title: "睡前历史视频样片",
      youtubeId: "dQw4w9WgXcQ",
      poster: "/images/chunqiu-greece.jpg"
    },
    body: [
      "今晚我们先把时间线拉到公元前一千年前后。中国的西周王朝和地中海的希腊世界，正好站在同一个历史窗口，却走向了两种完全不同的政治剧本。",
      "周武王灭商之后，面对辽阔的新王朝，选择把土地分给亲族和功臣。周公旦去了鲁国，姜子牙去了齐国，宗室子弟分封到晋、燕等地。它像一个庞大的家族企业，总部靠血缘和礼乐维系秩序。",
      "这套制度在周初很管用。周天子是名义上的董事长，诸侯是分公司经理。但时间一久，地方掌握了土地、军队和人口，总部的威信慢慢下降。周幽王之后，周王室东迁，天子的权威变成象征。",
      "与此同时，希腊世界并没有走向大一统。雅典、斯巴达等城邦各自为政，一个重视公民辩论，一个强调军事纪律。它们常常竞争，甚至彼此开战，却也在竞争中催生了哲学、民主与艺术。",
      "把两边放在一起看，历史就不再是一条孤立的线。东周的问题是大一统秩序如何崩解，希腊的问题是小共同体如何组织公共生活。不同地理、制度与观念，让文明写出了完全不同的答案。"
    ]
  },
  {
    slug: "battle-of-chibi",
    title: "赤壁之战：一场火烧掉曹操的统一梦",
    subtitle: "孙刘联盟与三国格局的成形",
    excerpt: "建安十三年，曹操南下，孙刘联手，长江上的一场大火改变了东亚历史的走向。",
    category: "major-events",
    tags: ["三国", "赤壁", "曹操", "孙刘联盟"],
    image: "/images/chibi.jpg",
    date: "2026-05-02",
    featured: true,
    readMinutes: 10,
    sourcePath: "历史大事/赤壁之战/赤壁之战文案.txt",
    audio: [
      {
        title: "赤壁之战 第 1 段",
        src: "/media/audio/chibi-1.mp3"
      }
    ],
    video: {
      title: "赤壁之战视频预留",
      youtubeId: "dQw4w9WgXcQ",
      poster: "/images/chibi.jpg"
    },
    body: [
      "三国时期有一场火，烧掉了曹操一统天下的巨大想象，也把天下三分的格局推到了历史舞台中央。那就是赤壁之战。",
      "建安十三年，曹操已经平定北方，收编荆州水军，声势达到巅峰。他对外号称八十万大军，哪怕实际兵力少得多，这个数字也足够让南方震动。",
      "荆州刘琮投降后，刘备被迫南撤。长坂坡的混乱让刘备几乎失去立足之地，也让江东意识到，如果曹操继续推进，孙权的江东基业同样难保。",
      "鲁肃看清了局面。他不是只看到曹军的数量，而是看到北方军队不习水战、远征疲惫、水土不服这些隐藏弱点。于是，联刘抗曹成为江东最关键的选择。",
      "赤壁真正精彩的地方，不只是火攻本身，而是战前每一个人的判断。曹操的自信、孙权的犹疑、鲁肃的清醒、诸葛亮的游说、周瑜的决断，共同把历史推向了那个燃烧的夜晚。"
    ]
  },
  {
    slug: "world-war-one-old-europe",
    title: "第一次世界大战：旧欧洲如何把自己点燃",
    subtitle: "王室亲戚、联盟体系与火药桶",
    excerpt: "1914 年的欧洲像一个装满炸药的密室。萨拉热窝的枪声，击穿的不只是王储，也击穿了旧时代的幻觉。",
    category: "major-events",
    tags: ["一战", "欧洲", "现代史"],
    image: "/images/wwi.jpg",
    date: "2026-05-03",
    featured: false,
    readMinutes: 9,
    sourcePath: "历史大事/一战/一战-原文稿.txt",
    body: [
      "1914 年的欧洲，表面上是文明繁荣的美好年代，背后却像一间装满火药的密室。各国王室彼此联姻，很多君主甚至是亲戚，但亲戚关系挡不住国家利益。",
      "英国是老牌海上霸主，控制大片殖民地和金融秩序。德国则是后起的工业强国，工厂、军舰和野心一起膨胀。旧秩序不愿让位，新强国不愿继续排队。",
      "联盟体系把欧洲变成一张绷紧的网。奥匈、德国、俄国、法国、英国，每个国家都以为自己是在自保，结果却把局部冲突变成了连锁爆炸。",
      "萨拉热窝的枪声只是导火索。真正的火药，是民族主义、帝国竞争、军备竞赛和大国误判。大家都以为战争会很快结束，最后却被堑壕、机枪和毒气拖进了漫长黑夜。",
      "第一次世界大战让四个帝国倒下，也让现代世界从废墟中爬出。它提醒我们，历史上的大灾难，常常不是因为没人聪明，而是因为太多人同时相信自己不会输。"
    ]
  },
  {
    slug: "fuzhou-city-history",
    title: "福州：一座带着海风与闽越记忆的城市",
    subtitle: "从昙石山、冶城到侯官",
    excerpt: "福州的历史不是从高楼开始，而是从贝丘、海风、山地部族和闽越王城开始。",
    category: "city-history",
    tags: ["福州", "城市史", "闽越", "福建"],
    image: "/images/fuzhou.jpg",
    date: "2026-05-04",
    featured: true,
    readMinutes: 8,
    sourcePath: "城市/福州/福州文案.txt",
    body: [
      "要讲福州的历史，时间得先拨回远古的新石器时代。那时的福州还没有高楼和街巷，闽江口附近是山林、海浪和湿润的风。",
      "昙石山遗址像一份原始生活档案。贝丘告诉我们，早期福州人靠海而生，捕鱼、吃贝、制作陶器，在山与海之间形成自己的生活方式。",
      "到了战国末期，越族后裔南迁，与本地部族融合，形成闽越族。福州附近的冶城，成为这段历史的重要坐标。它不一定像中原都城那样宏伟，却带着山海之间的独立气质。",
      "秦汉大一统的浪潮最终来到这里。汉武帝解决闽越问题后，福州周边开始更深地进入中央王朝的郡县秩序。东汉侯官县的设置，标志着福州正式进入行政建制的历史。",
      "所以，福州不是一夜之间成为有福之州的。它的底色来自海洋、山地、移民和制度变迁，也来自一次次被纳入更大历史版图的转折。"
    ]
  },
  {
    slug: "hanxin-from-poverty-to-general",
    title: "韩信：从淮阴少年到兵仙",
    subtitle: "忍耐、天才与命运的急转弯",
    excerpt: "韩信的一生有最卑微的忍耐，也有最锋利的军事天才。他的崛起与结局，都是秦末汉初最深的命运寓言。",
    category: "historical-figures",
    tags: ["韩信", "楚汉", "名将", "兵仙"],
    image: "/images/hanxin.jpg",
    date: "2026-05-05",
    featured: true,
    readMinutes: 9,
    sourcePath: "名将/韩信/韩信-原文稿.txt",
    audio: [
      {
        title: "韩信 第 1 段",
        src: "/media/audio/hanxin-1.mp3"
      }
    ],
    body: [
      "在中华两千年的名将谱系里，能被称为兵仙的人，只有韩信。他是极端矛盾的集合体：战场上近乎神明，生活里却曾落魄到受人白眼。",
      "秦末天下大乱，陈胜吴广起义之后，旧贵族、草莽豪杰和地方势力纷纷抬头。就在这样的时代里，淮阴街头有一个背着长剑的穷少年，他叫韩信。",
      "在乡人眼中，韩信很不合时宜。他不肯种田，也不做小买卖，整天读兵书、想战阵。别人看到的是一个吃不上饭的穷人，他自己看到的却是天下大势。",
      "漂母分饭，是韩信人生里少有的温情；胯下之辱，则是他忍耐力的极端体现。一个真正能改变战局的人，往往先要吞下常人无法承受的屈辱。",
      "后来韩信被刘邦重用，明修栈道、暗度陈仓，破赵、灭齐、垓下定局。他用军事天才决定了楚汉胜负，也用自己的结局证明，功高震主四个字从来不是空话。"
    ]
  },
  {
    slug: "qinshihuang-empire",
    title: "秦始皇：把天下拧成一个帝国的人",
    subtitle: "统一、制度与帝国代价",
    excerpt: "秦始皇的意义不只在于灭六国，更在于他把分裂的天下重新改造成一套帝国制度。",
    category: "china-history",
    tags: ["秦始皇", "秦朝", "大一统", "帝国"],
    image: "/images/qinshihuang.jpg",
    date: "2026-05-06",
    featured: false,
    readMinutes: 7,
    sourcePath: "中国历史人物-帝王/秦始皇/秦始皇文案.txt",
    body: [
      "秦始皇最震撼后世的地方，不只是他消灭六国，而是他把长期分裂的天下，重新拧成一套可以运行的帝国机器。",
      "统一文字、度量衡、车轨，推行郡县制，修驰道，北击匈奴，南取百越。这些政策把地域、经济和行政秩序连接起来，让中国历史从诸侯时代转入帝国时代。",
      "但秦的速度太快，力量太硬。徭役、刑罚和高压治理，让一个刚刚完成统一的国家迅速积累怨气。帝国制度成形了，秦王朝本身却没有足够时间消化它。",
      "秦始皇的矛盾就在这里。他既是旧秩序的终结者，也是新秩序的开端。他建造了一座后世不断继承的制度框架，却也把秦朝推向了沉重的代价。",
      "所以评价秦始皇，不能只问他残酷不残酷，也不能只问他伟大不伟大。更关键的问题是：一个庞大国家要如何被组织起来，而这种组织又需要付出什么。"
    ]
  },
  {
    slug: "sui-tang-world-context",
    title: "隋唐与世界：东亚秩序的高光时刻",
    subtitle: "当长安连接草原、海路与欧亚大陆",
    excerpt: "隋唐不是孤立的中国故事。把它放进世界时间表，才能看见长安、丝路、草原和海洋贸易的巨大能量。",
    category: "world-history",
    tags: ["隋唐", "中外史", "长安", "丝绸之路"],
    image: "/images/suitang-world.jpg",
    date: "2026-05-07",
    featured: false,
    readMinutes: 8,
    sourcePath: "中外史/隋唐时期中外史/隋唐中外史-原文稿.txt",
    body: [
      "隋唐的历史如果只放在中国内部看，会看到统一、科举、府兵、开元盛世和安史之乱。但如果把镜头拉远，就会发现它同时也是欧亚大陆秩序变化的一部分。",
      "隋朝重新统一南北，唐朝把这种统一推向更开放、更有组织的帝国形态。长安不仅是政治中心，也是文化、商旅、宗教和信息的交汇点。",
      "草原上的突厥、吐蕃的兴起、中亚绿洲城市的贸易网络，以及更远处的拜占庭、波斯和阿拉伯世界，都与唐朝处在同一张历史网里。",
      "这就是中外史的价值。它不是简单比较谁更强，而是让我们看到，同一时代的不同文明如何互相影响、互相借力，也互相改变。",
      "隋唐的开放感，来自强大的制度整合能力，也来自对外部世界的吸收。它的高光，不只是长安城的灯火，也是欧亚大陆上流动的人、货物和观念。"
    ]
  },
  {
    slug: "ancient-commerce",
    title: "古代人如何经商：没有手机支付的生意经",
    subtitle: "契约、信用、行会与市井生活",
    excerpt: "古代商业并不只是摆摊叫卖。货币、契约、信用、牙人和行会，共同支撑起一套复杂的交易世界。",
    category: "history-encyclopedia",
    tags: ["商业史", "古代生活", "经济", "市井"],
    image: "/images/ancient-commerce.jpg",
    date: "2026-05-08",
    featured: false,
    readMinutes: 7,
    sourcePath: "历史百科/古代如何经商/经商-原文稿.txt",
    body: [
      "一提到古代经商，很多人会想到街边小贩、茶楼酒肆和挑着担子的货郎。但真正的古代商业，远比这些画面复杂。",
      "没有手机支付，并不意味着交易粗糙。古人有铜钱、银两、票号，也有契约、账簿和中间人。一次大宗买卖背后，往往需要信用、见证和长期关系。",
      "市集有时间和地点的规定，城市商业区也受官府管理。到了商品经济更活跃的时期，商帮、行会和牙人逐渐发挥作用，把远方货物、资金和信息连接起来。",
      "商业改变的不只是钱袋子，也改变人的生活方式。茶、盐、布匹、瓷器、书籍和药材的流通，让普通人的日常越来越依赖市场。",
      "理解古代商业，其实是在理解一个社会如何交换资源、建立信用，并在制度限制中寻找空间。它让历史从宫廷和战场，回到烟火气十足的街巷。"
    ]
  }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getPostsByCategory(slug: string) {
  return posts.filter((post) => post.category === slug);
}

export function getFeaturedPosts() {
  return posts.filter((post) => post.featured);
}

export function getLatestPosts(limit = 6) {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
