import { ReactChild } from 'react';
import { TValueClassMap, TFaceTransformMap, TDefaultFaceGrid } from './_types';
export declare const valueClassMap: TValueClassMap;
export declare const faceTransformMap: TFaceTransformMap;
export declare const defaultFaceGrid: TDefaultFaceGrid;
export declare const faceClasses: string[];
export declare const times: (counter: number, callback: (index: number) => ReactChild) => ReactChild[];
