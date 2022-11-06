/// <reference types="react" />
export declare type TProps = React.CSSProperties & {
    rollingTime?: number;
    onRoll?: (value: TValue) => void;
    defaultValue?: TValue;
    size?: number;
    faces?: string[];
    disabled?: boolean;
    cheatValue?: TValue;
    faceBg?: string;
    placement?: string;
    sound?: string;
    triggers?: string[];
};
export declare type TValue = 1 | 2 | 3 | 4 | 5 | 6;
export declare type TKeyValuePair = {
    [key: string]: string;
};
export declare type TSingleFace = {
    className: string;
    style: TKeyValuePair;
    children: JSX.Element | null;
};
export declare type TValueClassMap = {
    [key in TValue]: string;
};
export declare type TFaceTransformMap = {
    [key in TValue]: (translate: number) => TKeyValuePair;
};
export declare type TDefaultFaceGrid = {
    [key in TValue]: number[];
};
