import React, { HTMLAttributes, ReactNode } from 'react'

import styles from './layout.module.scss'

// Inspiration:
// https://loicmahieu.github.io/react-styled-flexboxgrid/demo/index.html
// https://github.com/roylee0704/react-flexbox-grid
// Change default values in layout.module.scss

type ViewPortSizeType = 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type ColumnSizeType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | boolean
type OffsetType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

enum RowAttributes {
    'start',
    'center',
    'end',
    'top',
    'middle',
    'bottom',
    'around',
    'between',
    'reverse',
}
enum ColAttributes {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
    xsOffset = 'xsOffset',
    smOffset = 'smOffset',
    mdOffset = 'mdOffset',
    lgOffset = 'lgOffset',
    xlOffset = 'xlOffset',
}

export interface LayoutProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode
    className?: string
}

const classes = (...arr: String[]) => arr.filter((c) => c).join(' ');

// creates an object that contains children and classnames to help create the layout components
function createProps(props: LayoutProps, classNames: String[]) {
    const childrenAndProps: any = {}
    Object.keys(props)
        // Col and Row Props will get added as styles to the className
        // the div has no knowdlege of what these props do
        .filter(
            (key) =>
                key === 'children' || (!(key in ColAttributes) && !(key in RowAttributes) && key),
        )
        .forEach((key: keyof LayoutProps) => {
            childrenAndProps[key] = props[key]
        })

    const className = classes(...classNames)
    return { ...childrenAndProps, className }
}

export interface ContainerProps extends LayoutProps {
    debug?: boolean
    fluid?: boolean
}

export function Container({ fluid, className, debug = false, ...props }: ContainerProps) {
    const containerClass = fluid ? styles['container-fluid'] : styles.container
    const debugClass = debug && styles.debug
    const classNames = [className, containerClass, debugClass]
    return React.createElement('div', createProps(props, classNames))
}

export interface RowProps extends LayoutProps {
    reverse?: boolean
    start?: ViewPortSizeType
    center?: ViewPortSizeType
    end?: ViewPortSizeType
    top?: ViewPortSizeType
    middle?: ViewPortSizeType
    bottom?: ViewPortSizeType
    around?: ViewPortSizeType
    between?: ViewPortSizeType
}

export function Row({ ...props }: RowProps) {
    const rowKeys = ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between']
    const getRowClassNames = (p: RowProps) => {
        const modificators = [props.className, styles.row]

        for (let i = 0; i < rowKeys.length; i += 1) {
            const key = rowKeys[i]
            const value = p[key as keyof RowProps]
            if (value) {
                modificators.push(styles[`${key}-${value}`])
            }
        }

        if (p.reverse) {
            modificators.push(styles.reverse)
        }

        return modificators
    }

    return React.createElement('div', createProps(props, getRowClassNames(props)))
}

export interface ColProps extends LayoutProps {
    xl?: ColumnSizeType
    lg?: ColumnSizeType
    md?: ColumnSizeType
    sm?: ColumnSizeType
    xs?: ColumnSizeType
    xlOffset?: OffsetType
    lgOffset?: OffsetType
    mdOffset?: OffsetType
    smOffset?: OffsetType
    xsOffset?: OffsetType
    first?: ViewPortSizeType
    last?: ViewPortSizeType
}

export function Col({ ...props }: ColProps) {
    const classMap: { [key in ColAttributes]: string } = {
        xs: 'col-xs',
        sm: 'col-sm',
        md: 'col-md',
        lg: 'col-lg',
        xl: 'col-xl',
        xsOffset: 'col-xs-offset',
        smOffset: 'col-sm-offset',
        mdOffset: 'col-md-offset',
        lgOffset: 'col-lg-offset',
        xlOffset: 'col-xl-offset',
    }

    const getColClassNames = (p: ColProps) => {
        const extraClasses = []

        if (p.className) {
            extraClasses.push(props.className)
        }

        if (p.first) {
            extraClasses.push(styles[`first-${p.first}`])
        }

        if (p.last) {
            extraClasses.push(styles[`last-${p.last}`])
        }

        const getStyle = (key: keyof ColProps & ColAttributes) => {
            if (Number.isInteger(p[key])) {
                return `${classMap[key]}-${p[key]}`
            }
            if (p[key]) {
                return classMap[key]
            }
            return `${classMap[key]}-hidden`
        }

        return Object.keys(props)
            .filter((key: keyof ColProps & ColAttributes) => key in ColAttributes && classMap[key])
            .map((key: keyof ColProps & ColAttributes) => styles[getStyle(key)])
            .concat(extraClasses)
    }

    return React.createElement('div', createProps(props, getColClassNames(props)))
}

export default {Container, Row, Col}