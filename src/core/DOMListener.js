import {capitalize} from "./utils"

/* eslint-disable require-jsdoc */
export class DOMListener {
    constructor($root, listeners = []) {
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(
                    `Method ${method} is not imlemented in ${this.name || ''} Component`
                )
            }
            console.log(method)
            this.$root.on(listener, this[method].bind(this))
        })
    }

    removeDOMListeners() {
    }
}


function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}