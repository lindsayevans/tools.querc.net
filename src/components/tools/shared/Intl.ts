export const SUPPORTED_TIME_ZONES =
  'supportedValuesOf' in Intl
    ? (Intl as any).supportedValuesOf('timeZone')
    : [];

export const BCP_47 = [
  'ar',
  'ar-SA',
  'cs',
  'cs-CZ',
  'da',
  'da-DK',
  'de',
  'de-DE',
  'el',
  'el-GR',
  'en',
  'en-AU',
  'en-GB',
  'en-IE',
  'en-US',
  'en-ZA',
  'es',
  'es-ES',
  'es-MX',
  'fi',
  'fi-FI',
  'fr',
  'fr-CA',
  'fr-FR',
  'he',
  'he-IL',
  'hi',
  'hi-IN',
  'hu',
  'hu-HU',
  'id',
  'id-ID',
  'it',
  'it-IT',
  'ja',
  'ja-JP',
  'ko',
  'ko-KR',
  'nl',
  'nl-BE',
  'nl-NL',
  'no',
  'no-NO',
  'pl',
  'pl-PL',
  'pt',
  'pt-BR',
  'pt-PT',
  'ro',
  'ro-RO',
  'ru',
  'ru-RU',
  'sk',
  'sk-SK',
  'sv',
  'sv-SE',
  'th',
  'th-TH',
  'tr',
  'tr-TR',
  'zh',
  'zh-CN',
  'zh-HK',
  'zh-TW',
];
