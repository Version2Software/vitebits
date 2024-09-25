// src/ProjectTwo.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('project-two')
export class ProjectTwo extends LitElement {
    @property({ type: String }) name: string = 'world';

    static styles = css`
    div {
      border: 2px solid blue;
      padding: 20px;
    }
  `;

    render() {
        return html`<div>Hello, ${this.name}</div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'project-two': ProjectTwo;
    }
}
