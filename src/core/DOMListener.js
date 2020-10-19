/* eslint-disable require-jsdoc */
export class DOMListener {
    constructor($root, listeners = []) {
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
console.log(this.listeners)
    }

    removeDOMListeners() {
    }
}