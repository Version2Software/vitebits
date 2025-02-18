import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('v2-button')
export class V2Button extends LitElement {

    @property({ type: String }) label = 'Click me';
    @property({ type: String }) variant: 'primary' | 'secondary' | 'danger' = 'primary';
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) loading = false;

    // Styles
    static styles = css`
    :host {
      display: inline-block;
        --v2-button-font-size: 1rem;
    }

    .v2-button {
      font-family: system-ui, sans-serif;
      //font-size: 1rem;
      font-size: var(--v2-button-font-size);
      font-weight: 500;
      padding-block: 0.75rem;
      padding-inline: 1.5rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      position: relative;
      overflow: hidden;
    }

    .v2-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .v2-button--primary {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: white;
      box-shadow: 0 4px 6px -1px rgb(99 102 241 / 0.2);
    }

    .v2-button--primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 8px -1px rgb(99 102 241 / 0.3);
    }

    .v2-button--secondary {
      background: white;
      color: #4f46e5;
      border: 2px solid #e0e7ff;
      box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.06);
    }

    .v2-button--secondary:hover:not(:disabled) {
      border-color: #c7d2fe;
      background: #f5f7ff;
    }

    .v2-button--danger {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      box-shadow: 0 4px 6px -1px rgb(239 68 68 / 0.2);
    }

    .v2-button--danger:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 8px -1px rgb(239 68 68 / 0.3);
    }

    .v2-button.loading {
      color: transparent;
    }

    .loading-spinner {
      position: absolute;
      inset-block-start: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%);
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid rgb(255 255 255 / 0.3);
      border-radius: 50%;
      border-block-start-color: white;
      animation: spin 0.8s linear infinite;
      display: none;
    }

    .loading .loading-spinner {
      display: block;
    }

    @keyframes spin {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    /* Active state */
    .v2-button:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: none;
    }
  `;

    render() {
        const classes = {
            'v2-button': true,
            [`v2-button--${this.variant}`]: true,
            'loading': this.loading
        };

        const className = Object.entries(classes)
            .filter(([, value]) => value)
            .map(([key]) => key)
            .join(' ');

        return html`
      <button
        class=${className}
        ?disabled=${this.disabled || this.loading}
        @click=${this._handleClick}
      >
        ${this.label}
        <span class="loading-spinner"></span>
      </button>
    `;
    }

    private _handleClick(e: MouseEvent) {
        const event = new CustomEvent('v2-click', {
            detail: { originalEvent: e },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'v2-button': V2Button;
    }
}
