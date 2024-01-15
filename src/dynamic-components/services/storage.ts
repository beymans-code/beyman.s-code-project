/**
 * Agrega un item encriptado al localStorage.
 * @param name - Nombre.
 * @param value - Valor.
 */
export function addItem(name: any, value: any): void {
    if (typeof window === 'undefined') {
        return;
    }
    localStorage?.setItem(name, btoa(JSON.stringify(value)))
}

/**
 * Obtiene el item del localStorage.
 * @param name - Nombre.
 * @returns Valor | undefined.
 */
export function getItem(name: string) {
    if (typeof window === 'undefined') {
        return undefined
    }
    let val: any = `${localStorage?.getItem(name)}`
    if (val === 'null') {
        val = undefined;
    }
    const value = val !== undefined ? JSON.parse(atob(val)) : undefined;
    return value;
}

/**
 * Elimina un item del localStorage.
 * @param name - Nombre.
 */
export function removeItem(name: string) {
    if (typeof window === 'undefined') {
        return;
    }
    localStorage?.removeItem(name)
}

/**
 * Reinicia el localStorage.
 */
export function clearItems() {
    if (typeof window === 'undefined') {
        return;
    }
    localStorage?.clear()
}

/**
 * Clona un objeto evitando los valores por referencia.
 * @param object - Objeto a clonar.
 * @returns Objeto clonado.
 */
export function clone(object: any): any {
    return JSON.parse(JSON.stringify(object))
}