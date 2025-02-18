import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './v2-button';

@customElement('v2-converter')
export class V2Converter extends LitElement {
    @state() private miles = '';
    @state() private kilometers = '0.00';

    static styles = css`
        :host {
            display: block;
            font-family: system-ui, sans-serif;
            max-width: 400px;
            margin-block: 0;
            margin-inline: auto;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
            background: white;
        }

        .form-row {
            display: flex;
            align-items: center;
            margin-block-end: 1rem;
            gap: 0.5rem;
        }

        label {
            min-inline-size: 100px;
            font-weight: 500;
        }

        input {
            padding-block: 0.5rem;
            padding-inline: 0.5rem;
            border: 2px solid #e0e7ff;
            border-radius: 0.25rem;
            font-size: 1rem;
            inline-size: 150px;
        }

        input:focus {
            outline: none;
            border-color: #6366f1;
        }

        .result {
            font-size: 1rem;
            font-weight: 500;
            color: #4f46e5;
        }

        .button-container {
            display: flex;
            justify-content: center;
            margin-block-start: 1.5rem;
        }
    `;

    private handleConvert() {
        if (this.miles) {
            const milesNum = parseFloat(this.miles);
            if (!isNaN(milesNum)) {
                // Convert and round to 2 decimal places
                this.kilometers = (milesNum * 1.60934).toFixed(2);
            }
        }
    }

    private handleInput(e: Event) {
        const input = e.target as HTMLInputElement;
        // Only allow numbers and decimal point
        const sanitizedValue = input.value.replace(/[^\d.]/g, '');

        // Ensure only one decimal point
        const decimalCount = (sanitizedValue.match(/\./g) || []).length;
        if (decimalCount > 1) {
            const parts = sanitizedValue.split('.');
            this.miles = parts[0] + '.' + parts.slice(1).join('');
        } else {
            this.miles = sanitizedValue;
        }
    }

    private handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleConvert();
        }
    }

    render() {
        return html`
      <div class="form-row">
        <label for="miles">Miles:</label>
        <input 
          type="text"
          id="miles"
          .value=${this.miles}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
          placeholder="Enter miles"
          aria-label="Miles input"
        >
      </div>
      <div class="form-row">
        <label>Kilometers:</label>
        <span class="result" role="status" aria-live="polite">
          ${this.kilometers}
        </span>
      </div>
      <div class="button-container">
        <v2-button
          label="Convert"
          @v2-click=${this.handleConvert}
        ></v2-button>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'v2-converter': V2Converter;
    }
}
