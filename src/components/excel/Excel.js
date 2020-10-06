export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.components = options.components || [] // значит чсто по умолчанию будет пустым массивом
    }

}