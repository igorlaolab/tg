/**
 * Utility function to combine classnames
 * Replacement for classNames function from SDK v2 which is not available in v3
 * 
 * @param classes - Class names to be combined
 * @returns Combined class names string
 */
export function classNames(...classes: Array<string | undefined | null | false>): string {
    return classes.filter(Boolean).join(' ');
} 