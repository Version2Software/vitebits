// src/ProjectOne.js

class ProjectOne extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create the container for the component
        const wrapper = document.createElement('div');
        wrapper.style.border = '2px solid red';
        wrapper.style.padding = '20px';

        // Create the content of the component
        const name = this.getAttribute('name') || 'world';
        wrapper.innerHTML = `Hello, ${name}`;

        // Append the wrapper to the shadow DOM
        this.shadowRoot.appendChild(wrapper);
    }

    static get observedAttributes() {
        return ['name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'name' && oldValue !== newValue) {
            this.shadowRoot.querySelector('div').innerHTML = `Hello, ${newValue}`;
        }
    }
}

// Define the custom element
customElements.define('project-one', ProjectOne);
