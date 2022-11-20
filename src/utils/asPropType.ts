export type AsProp<
T extends React.ElementType,
// eslint-disable-next-line @typescript-eslint/ban-types
ComponentProps = {},
Exceptions extends string = ''
> = {
// eslint-disable-next-line react/require-default-props
as?: T,
} & ComponentProps & Omit<React.ComponentPropsWithoutRef<T>, keyof ComponentProps | Exceptions>
