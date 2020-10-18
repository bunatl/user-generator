export type Actions =
    | { type: "lower" | "upper" }
    | { type: "number"; num: string }
