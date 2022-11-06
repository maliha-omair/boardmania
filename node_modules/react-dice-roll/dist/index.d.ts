import * as React from 'react';
import './styles.scss';
import { TValue } from './_types';
declare type TDiceRef = {
    rollDice: (value: TValue) => void;
};
declare const Dice: React.ForwardRefExoticComponent<React.CSSProperties & {
    rollingTime?: number | undefined;
    onRoll?: ((value: TValue) => void) | undefined;
    defaultValue?: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
    size?: number | undefined;
    faces?: string[] | undefined;
    disabled?: boolean | undefined;
    cheatValue?: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
    faceBg?: string | undefined;
    placement?: string | undefined;
    sound?: string | undefined;
    triggers?: string[] | undefined;
} & React.RefAttributes<TDiceRef>>;
export default Dice;
