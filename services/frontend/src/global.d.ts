type Nullable<Type> = Type | null | undefined;
interface DataRes<T> {
  data?: T;
  status?: number;
}

interface ListRes<T> {
  data?: {
    items?: T[];
    range?: Range;
    nextPage?: string;
  };
  status?: number;
}

interface OptionType<T = unknown> {
  value?: T;
  label?: string;
}

interface Range {
  count?: number;
  limit?: number;
  offset?: number;
}

type TCurrentRoles =
  | 'admin'
  | 'neworghrbp'
  | 'manager'
  | 'management'
  | undefined;

interface Res<T> {
  data: T;
}
