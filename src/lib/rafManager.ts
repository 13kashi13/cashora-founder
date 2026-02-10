/**
 * Centralized RAF Manager
 * Ensures only ONE requestAnimationFrame loop runs at runtime
 * Prevents flickering caused by multiple competing RAF loops
 */

type RAFCallback = (time: number, delta: number) => void;

class RAFManager {
  private callbacks: Map<string, RAFCallback> = new Map();
  private rafId: number | null = null;
  private lastTime: number = 0;
  private isRunning: boolean = false;

  /**
   * Register a callback to be called on every frame
   * @param id Unique identifier for this callback
   * @param callback Function to call each frame
   */
  register(id: string, callback: RAFCallback): void {
    this.callbacks.set(id, callback);
    
    // Start the loop if not already running
    if (!this.isRunning) {
      this.start();
    }
  }

  /**
   * Unregister a callback
   * @param id Unique identifier of the callback to remove
   */
  unregister(id: string): void {
    this.callbacks.delete(id);
    
    // Stop the loop if no callbacks remain
    if (this.callbacks.size === 0) {
      this.stop();
    }
  }

  /**
   * Start the RAF loop
   */
  private start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  /**
   * Stop the RAF loop
   */
  private stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.isRunning = false;
  }

  /**
   * Main RAF loop - calls all registered callbacks
   */
  private loop = (time: number): void => {
    const delta = time - this.lastTime;
    this.lastTime = time;

    // Call all registered callbacks
    this.callbacks.forEach((callback) => {
      try {
        callback(time, delta);
      } catch (error) {
        console.error('RAF callback error:', error);
      }
    });

    // Continue the loop
    this.rafId = requestAnimationFrame(this.loop);
  };

  /**
   * Get the number of active callbacks
   */
  getCallbackCount(): number {
    return this.callbacks.size;
  }

  /**
   * Check if the loop is running
   */
  isActive(): boolean {
    return this.isRunning;
  }
}

// Export singleton instance
export const rafManager = new RAFManager();

// Debug helper (only in development)
if (import.meta.env.DEV) {
  (window as any).__rafManager = rafManager;
}
