import {
  ResolvedDurationFormatOptions,
  DurationInput,
  DurationFormatOptions as _DurationFormatOptions,
} from './types';

declare global {
  export namespace Intl {
    interface DurationFormatOptions extends _DurationFormatOptions {}

    interface DurationFormat {
      format(duration: DurationInput): string;
      resolvedOptions(): ResolvedDurationFormatOptions;
    }

    interface DurationFormatConstructor {
      new (
        locales?: string | string[],
        options?: DurationFormatOptions
      ): DurationFormat;
      (
        locales?: string | string[],
        options?: DurationFormatOptions
      ): DurationFormat;
      supportedLocalesOf(
        locales: string | string[],
        options?: DurationFormatOptions
      ): string[];
      readonly prototype: DurationFormat;
    }

    var DurationFormat: DurationFormatConstructor;
  }
}
