class rMoreItems extends HTMLElement {
    constructor() {
        super()

        this.isExpanded = false

        this.handleTrigger = this.handleTrigger.bind(this)
    }

    connectedCallback() {
        requestAnimationFrame(() => {
            this.moreText = this.dataset.moreText
            this.lessText = this.dataset.lessText

            this.triggers = this.querySelectorAll('[r-more-items-trigger]')
            this.target = this.querySelector('[r-more-items-target]')

            if (this.hasAttribute('r-more-items-self-target')) {
                this.target = this
            }

            if (this.triggers.length && this.target) {
                for (const trigger of this.triggers) {
                    trigger.addEventListener('click', this.handleTrigger)
                }
            }
        })
    }

    handleTrigger() {
        if (!this.triggerEvent(this.isExpanded ? 'rMoreItems.before.collapse' : 'rMoreItems.before.expand')) {
            return
        }

        this.isExpanded = !this.isExpanded

        for (const trigger of this.triggers) {
            const triggerText = trigger.querySelector('[r-more-items-trigger-text]')

            trigger.classList.toggle('is-expanded', this.isExpanded)

            if (triggerText) {
                triggerText.innerHTML = ( this.isExpanded ? this.lessText : this.moreText )
            }
        }

        this.target.classList.toggle('is-expanded', this.isExpanded)

        this.triggerEvent(this.isExpanded ? 'rMoreItems.after.expand' : 'rMoreItems.after.collapse')
    }

    triggerEvent(name) {
        if (!name) {
            return false
        }

        const event = new CustomEvent(name, {
            detail: this,
            cancelable: true
        })

        return this.dispatchEvent(event)
    }
}

customElements.define('r-more-items', rMoreItems)

module.exports.rMoreItems = rMoreItems;