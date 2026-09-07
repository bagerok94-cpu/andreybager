import type {
  AboutContent,
  ContactContent,
  HeroContent,
  MusicContent,
  NavItem,
  PortfolioContent,
  ProjectContent,
  ServicesContent,
  SiteSettings,
  ToolsContent,
} from '@/types';

export const siteSettings: SiteSettings = {
  title: 'ANDREY BAGER — WEB DESIGNER / AI / AUTOMATION',
  description: 'Digital solutions, web design, AI and automation.',
  author: 'ANDREY BAGER',
  defaultLocale: 'ru',
};

export const navigation: readonly NavItem[] = [
  { label: 'Главная', href: '/', desktop: false, mobile: true },
  { label: 'Обо мне', href: '/about', desktop: true, mobile: true },
  { label: 'Портфолио', href: '/portfolio', desktop: true, mobile: true },
  { label: 'Что я делаю', href: '/services', desktop: true, mobile: false },
  { label: 'Инструменты', href: '/tools', desktop: true, mobile: false },
  { label: 'Контакты', href: '/contact', desktop: true, mobile: true },
  { label: 'Моя музыка', shortLabel: 'Музыка', href: '/music', desktop: true, mobile: true },
];

export const heroContent: HeroContent = {
  nameLines: ['ANDREY', 'BAGER'],
  taglineLines: ['Создаю digital-решения,', 'которые приносят'],
  taglineAccent: 'результат.',
  avatarMonogram: 'AB',
  avatarStatus: 'Status',
  avatarRole: 'Available',
};

export const aboutContent: AboutContent = {
  title: 'ОБО МНЕ',
  name: 'ANDREY BAGER',
  role: 'WEB DESIGNER / AI / AUTOMATION',
  closedDescLines: ['Веб-дизайнер и специалист', 'по AI и автоматизации.'],
  closedSub: 'Создаю современные цифровые решения.',
  badge: '8+ лет в дизайне',
  openLead:
    'Создаю сайты и цифровые решения, которые помогают бизнесу выглядеть профессионально и работать эффективнее.',
  pillars: [
    {
      number: '01 / ДИЗАЙН',
      text: 'Веб-дизайн, интерфейсы и цифровые продукты.',
    },
    {
      number: '02 / РАЗРАБОТКА',
      text: 'Создание и запуск сайтов.',
    },
    {
      number: '03 / AI & AUTOMATION',
      text: 'AI-инструменты, Telegram-боты и автоматизация процессов.',
    },
  ],
  ctaLabel: 'ПОДРОБНЕЕ ОБО МНЕ ↗',
  ctaHref: '/about',
};

export const portfolioContent: PortfolioContent = {
  title: 'ПОРТФОЛИО',
  previewDescLines: ['Мои последние работы', 'и кейсы.'],
  previewBadge: 'Кейсы и проекты',
  openLead:
    'Здесь собраны проекты, над которыми я работал: сайты, интерфейсы и цифровые решения.',
  status: 'В разработке',
  footerBadge: 'Разработка и релизы',
  ctaLabel: 'СМОТРЕТЬ ПОРТФОЛИО ↗',
  ctaHref: '/portfolio',
};

export const servicesContent: ServicesContent = {
  title: 'ЧТО Я ДЕЛАЮ',
  previewDescLines: ['Дизайн, сайты, AI', 'и автоматизация бизнеса.'],
  previewBadge: 'Услуги под ключ',
  items: [
    {
      id: 'web-design',
      number: '01',
      title: 'ВЕБ-ДИЗАЙН И САЙТЫ',
      description: 'Современные сайты и продающие страницы.',
    },
    {
      id: 'tilda',
      number: '02',
      title: 'TILDA РАЗРАБОТКА',
      description: 'Верстка, Zero Block, адаптация и запуск.',
    },
    {
      id: 'ui-ux',
      number: '03',
      title: 'UI / UX ДИЗАЙН',
      description: 'Проектирование удобных цифровых интерфейсов.',
    },
    {
      id: 'ai-automation',
      number: '04',
      title: 'AI И АВТОМАТИЗАЦИЯ',
      description: 'AI-инструменты и автоматизация рутинных процессов.',
    },
    {
      id: 'telegram-bots',
      number: '05',
      title: 'TELEGRAM-БОТЫ',
      description: 'Разработка ботов и интеграций для бизнеса.',
    },
  ],
  footerBadge: '5 направлений работы',
  ctaLabel: 'ВСЕ УСЛУГИ ↗',
  ctaHref: '/services',
};

export const toolsContent: ToolsContent = {
  title: 'ИНСТРУМЕНТЫ',
  previewDescLines: ['Инструменты, которые я использую', 'в работе.'],
  previewBadge: 'Стек и софт',
  items: [
    { id: 'figma', name: 'Figma', description: 'Дизайн интерфейсов' },
    { id: 'tilda', name: 'Tilda', description: 'Создание сайтов' },
    { id: 'vscode', name: 'VS Code', description: 'Разработка' },
    { id: 'photoshop', name: 'Photoshop', description: 'Графика и обработка' },
    { id: 'illustrator', name: 'Illustrator', description: 'Векторная графика' },
    { id: 'ai-tools', name: 'AI Tools', description: 'AI для задач и генерации' },
    { id: 'telegram-api', name: 'Telegram API', description: 'Боты и интеграции' },
    { id: 'python', name: 'Python', description: 'Автоматизация и скрипты' },
    { id: 'automation', name: 'Automation', description: 'Автоматизация процессов' },
  ],
  footerBadge: '9 ключевых инструментов',
  ctaLabel: 'ВСЕ ИНСТРУМЕНТЫ ↗',
  ctaHref: '/tools',
};

export const contactContent: ContactContent = {
  title: 'КОНТАКТЫ',
  previewDescLines: ['Связаться со мной', 'удобнее всего в Telegram.'],
  previewBadge: 'Открыт к предложениям',
  channels: [
    {
      label: 'TELEGRAM',
      value: '@andrey_bager_web',
      href: 'https://t.me/andrey_bager_web',
      ctaLabel: 'НАПИСАТЬ В TELEGRAM ↗',
    },
    {
      label: 'EMAIL',
      value: 'andrey.bager.web@gmail.com',
      href: 'mailto:andrey.bager.web@gmail.com',
      ctaLabel: 'НАПИСАТЬ НА ПОЧТУ ↗',
    },
  ],
  openLead: 'Есть задача или идея? Расскажите о ней — обсудим.',
  footerBadge: 'Прямой контакт',
  ctaLabel: 'ОБСУДИТЬ ПРОЕКТ ↗',
  ctaHref: '/contact',
};

export const projectContent: ProjectContent = {
  title: 'ГОТОВ К ПРОЕКТУ?',
  previewDescLines: ['Есть идея?', 'Давайте обсудим.'],
  previewBadge: 'Сотрудничество',
  openLead:
    'Расскажите, что хотите создать. Вместе определим задачу и найдём решение.',
  steps: [
    { step: '01', title: 'Обсудим задачу' },
    { step: '02', title: 'Определим решение' },
    { step: '03', title: 'Запустим проект' },
  ],
  footerBadge: 'Старт за 1-2 дня',
  ctaLabel: 'ОБСУДИТЬ ПРОЕКТ ↗',
  ctaHref: '/contact',
};

export const musicContent: MusicContent = {
  title: 'МОЯ МУЗЫКА',
  previewDesc: 'Мои треки и музыка.',
  ctaLabel: 'СЛУШАТЬ МУЗЫКУ ↗',
  ctaHref: '/music',
};
