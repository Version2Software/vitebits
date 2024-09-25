// src/TimerComponent.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('timer-component')
export class TimerComponent extends LitElement {
    @property({ type: Number }) duration: number = 30; // default 30 minutes
    @state() private remainingTime: number = this.duration * 60; // time in seconds
    @state() private isRunning: boolean = false;
    @state() private isPaused: boolean = false;
    private timerInterval: number | undefined;

    static styles = css`
    div {
      border: 1px solid gray;
      padding: 20px;
      display: inline-block;
    }
    button {
      margin: 5px;
    }
  `;

    // Ensure that the remaining time is updated when duration changes
    willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('duration') && !this.isRunning) {
            this.remainingTime = this.duration * 60;
        }
    }

    private formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    private startStopTimer() {
        if (this.isRunning) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }

    private startTimer() {
        this.isRunning = true;
        this.isPaused = false;
        this.timerInterval = window.setInterval(() => {
            if (!this.isPaused && this.remainingTime > 0) {
                this.remainingTime -= 1;
            } else if (this.remainingTime === 0) {
                this.stopTimer();
            }
        }, 1000);
    }

    private stopTimer() {
        this.isRunning = false;
        window.clearInterval(this.timerInterval);
        this.remainingTime = this.duration * 60;
    }

    private pauseResumeTimer() {
        if (this.isPaused) {
            this.isPaused = false;
        } else {
            this.isPaused = true;
        }
    }

    render() {
        return html`
      <div>
        <h2>Time Remaining: ${this.formatTime(this.remainingTime)}</h2>
        <button @click="${this.startStopTimer}">
          ${this.isRunning ? 'Stop' : 'Start'}
        </button>
        ${this.isRunning
            ? html`<button @click="${this.pauseResumeTimer}">
              ${this.isPaused ? 'Resume' : 'Pause'}
            </button>`
            : nothing}
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'timer-component': TimerComponent;
    }
}
